import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Text, TextInput, Button } from '@mantine/core';
import type { Deck, GrammarLesson, FlowCard, DeckCheatsheet, FilterState } from '../types';
import { flowCardKey, flowCardDeckId } from '../types';
import { useFlow } from '../hooks/useFlow';
import { useTimer } from '../hooks/useTimer';
import { normalize } from '@/utils/normalize';
import { formatTime } from '@/utils/formatTime';
import { extractFilterableLabels, buildDefaultFilters, isAllSelected } from '@/utils/flowFilters';
import { AUTO_ADVANCE_DELAY_MS, MASTERY_THRESHOLD, CATEGORY_CONFIG } from '@/constants';
import { updateLastRun } from '@/db';
import type { UpdateLastRunResult } from '@/db';
import { FlowPrompt } from './ui/FlowPrompt';
import { CheatsheetPanel } from './ui/CheatsheetPanel';
import { FlowFilters } from './ui/FlowFilters';
import { AppHeader } from './AppHeader';
import { KofiButton } from './ui/KofiButton';
import { ThemeToggle } from './ui/ThemeToggle';
import { trackDeckStarted, trackDeckCompleted } from '@/analytics';
import './FlowScreen.css';

type FlowSource = Deck | GrammarLesson;

interface FlowScreenProps {
  sources: FlowSource[];
  onExit: () => void;
}

function isAnswerCorrect(card: FlowCard, userInput: string): boolean {
  const normalized = normalize(userInput);
  if (!normalized) return false;

  switch (card.source) {
    case 'translation': {
      const word = card.item;
      const expected = card.direction === 'de_to_en' ? word.english : word.german;
      const alternatives = expected.split(' / ').map(normalize);
      if (alternatives.some(alt => alt === normalized)) return true;
      if (word.meanings) {
        for (const meaning of word.meanings) {
          if (normalize(meaning.english) === normalized) return true;
        }
      }
      return false;
    }
    case 'label-to-form':
      return normalized === normalize(card.item.answer);
    case 'grammar':
      return normalized === normalize(card.exercise.answer);
  }
}

function getExpectedAnswer(card: FlowCard): string {
  switch (card.source) {
    case 'translation':
      return card.direction === 'de_to_en' ? card.item.english : card.item.german;
    case 'label-to-form':
      return card.item.answer;
    case 'grammar':
      return card.exercise.answer;
  }
}

function getPlaceholder(card: FlowCard): string {
  switch (card.source) {
    case 'translation':
      return card.direction === 'de_to_en' ? 'translate to English...' : 'translate to German...';
    case 'label-to-form':
      return 'type the correct form...';
    case 'grammar':
      return card.exercise.sentence.includes('___') ? 'fill in the blank...' : 'type answer...';
  }
}

function getCheatsheet(card: FlowCard, sources: FlowSource[]): DeckCheatsheet | undefined {
  const sourceId = flowCardDeckId(card);
  return sources.find(s => s.id === sourceId)?.cheatsheet;
}

function getExample(card: FlowCard): { german: string; english: string } | null {
  if (card.source === 'translation' && card.item.examples.length > 0) {
    return card.item.examples[0];
  }
  if (card.source === 'label-to-form' && card.item.examples && card.item.examples.length > 0) {
    return card.item.examples[0];
  }
  return null;
}

export function FlowScreen({ sources, onExit }: FlowScreenProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevCardKeyRef = useRef<string | null>(null);

  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong' | 'retype'>('idle');
  const [shouldAutoAdvance, setShouldAutoAdvance] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [cheatsheetOpen, setCheatsheetOpen] = useState(false);

  const timer = useTimer();
  const [timerStarted, setTimerStarted] = useState(false);
  const mistakeCountRef = useRef(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [lastRunResult, setLastRunResult] = useState<UpdateLastRunResult | null>(null);
  const savedRunRef = useRef(false);

  // Filter system
  const filterableLabels = useMemo(() => extractFilterableLabels(sources), [sources]);
  const hasFilters = filterableLabels.size > 0;
  const [filters, setFilters] = useState<FilterState>(() => buildDefaultFilters(filterableLabels, sources));
  const [filtersOpen, setFiltersOpen] = useState(() => {
    try { return localStorage.getItem('dd-filters-open') !== 'closed'; }
    catch { return true; }
  });
  const filtersActive = hasFilters && !isAllSelected(filters, filterableLabels);

  const {
    currentCard,
    currentStreak,
    submitAnswer,
    isFinished,
    completedCount,
    totalCount,
    accuracy,
    totalAnswered,
  } = useFlow(sources, filtersActive ? filters : undefined);

  const cardKey = currentCard ? flowCardKey(currentCard) : null;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const deckTitle = sources.length === 1
    ? `${CATEGORY_CONFIG[sources[0].category]?.label ?? sources[0].category} · ${sources[0].name}`
    : `${sources.length} decks mixed`;
  const categoryColor = sources.length === 1
    ? CATEGORY_CONFIG[sources[0].category]?.color
    : undefined;

  // Analytics: track deck start once
  const sourceIds = useMemo(() => sources.map(s => s.id), [sources]);
  const startTrackedRef = useRef(false);
  useEffect(() => {
    if (!startTrackedRef.current && totalCount > 0) {
      startTrackedRef.current = true;
      trackDeckStarted(sourceIds, totalCount);
    }
  }, [sourceIds, totalCount]);

  const cheatsheet = useMemo(() => {
    if (!currentCard || sources.length > 1) return undefined;
    return getCheatsheet(currentCard, sources);
  }, [currentCard, sources]);

  // Focus input on card change
  // Focus input when card changes
  // State resets (input, status, cheatsheet) are handled by submit callers
  useEffect(() => {
    if (currentCard && prevCardKeyRef.current !== cardKey) {
      prevCardKeyRef.current = cardKey;
      inputRef.current?.focus();
    }
  }, [currentCard, cardKey]);

  const handleFlowFinished = useCallback(() => {
    if (showSummary) return;
    timer.stop();
    setShowSummary(true);
    trackDeckCompleted(sourceIds, accuracy, timer.elapsedMs, mistakeCountRef.current);
    if (sources.length === 1 && !savedRunRef.current) {
      savedRunRef.current = true;
      updateLastRun(sources[0].id, timer.elapsedMs, mistakeCountRef.current)
        .then(setLastRunResult)
        .catch(err => console.error('Failed to save last run:', err));
    }
  }, [showSummary, timer, sources, sourceIds, accuracy]);

  // Stable refs for auto-advance callback (avoids timer-induced re-renders cancelling the timeout)
  const handleFlowFinishedRef = useRef(handleFlowFinished);
  const submitAnswerRef = useRef(submitAnswer);
  useEffect(() => {
    handleFlowFinishedRef.current = handleFlowFinished;
    submitAnswerRef.current = submitAnswer;
  });

  // Auto-advance after correct
  useEffect(() => {
    if (shouldAutoAdvance) {
      const t = setTimeout(async () => {
        const finished = await submitAnswerRef.current(true);
        setShouldAutoAdvance(false);
        setInput('');
        setStatus('idle');
        setCheatsheetOpen(false);
        if (finished) handleFlowFinishedRef.current();
      }, AUTO_ADVANCE_DELAY_MS);
      return () => clearTimeout(t);
    }
  }, [shouldAutoAdvance]);

  const handleStop = useCallback(() => {
    timer.stop();
    setShowSummary(true);
  }, [timer]);

  const handleContinue = useCallback(() => {
    setShowSummary(false);
    if (!timer.isRunning && timerStarted) timer.start();
    inputRef.current?.focus();
  }, [timer, timerStarted]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab → toggle cheatsheet
      if (e.key === 'Tab') {
        if (cheatsheet && !showSummary) {
          e.preventDefault();
          setCheatsheetOpen(prev => !prev);
        }
        return;
      }

      // Escape → close cheatsheet, exit summary, or stop drill
      if (e.key === 'Escape') {
        e.preventDefault();
        if (cheatsheetOpen) { setCheatsheetOpen(false); inputRef.current?.focus(); }
        else if (showSummary) onExit();
        else { timer.stop(); setShowSummary(true); }
        return;
      }

      // Enter on summary → continue or exit
      if (e.key === 'Enter' && showSummary) {
        e.preventDefault();
        if (!isFinished) handleContinue();
        else onExit();
        return;
      }

      // Enter/Space when wrong → retype mode
      if ((e.key === 'Enter' || e.key === ' ') && status === 'wrong') {
        e.preventDefault();
        setInput('');
        setStatus('retype');
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, onExit, showSummary, timer, cheatsheet, cheatsheetOpen, isFinished, handleContinue]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCard) return;

    if (status === 'wrong') {
      setInput('');
      setStatus('retype');
      setTimeout(() => inputRef.current?.focus(), 0);
      return;
    }

    if (status === 'retype') {
      if (isAnswerCorrect(currentCard, input)) {
        submitAnswer(false);
        setInput('');
        setStatus('idle');
        setCheatsheetOpen(false);
      }
      return;
    }

    if (status === 'correct') {
      setShouldAutoAdvance(false);
      const finished = await submitAnswer(true);
      setInput('');
      setStatus('idle');
      setCheatsheetOpen(false);
      if (finished) handleFlowFinished();
      return;
    }

    if (!timerStarted) {
      timer.start();
      setTimerStarted(true);
    }

    const correct = isAnswerCorrect(currentCard, input);
    setStatus(correct ? 'correct' : 'wrong');

    if (correct) {
      setShouldAutoAdvance(true);
    } else {
      mistakeCountRef.current += 1;
      setMistakeCount(mistakeCountRef.current);
    }
  };

  // Drill-only computed values
  const displayStreak = currentCard
    ? (status === 'correct'
        ? Math.min(currentStreak + 1, MASTERY_THRESHOLD)
        : status === 'wrong' ? 0 : currentStreak)
    : 0;
  const displayValue = currentCard && status === 'wrong' ? getExpectedAnswer(currentCard) : input;
  const example = currentCard && (status === 'correct' || status === 'wrong') ? getExample(currentCard) : null;

  const inputBorderColor =
    status === 'correct' ? 'var(--dd-success)' :
    status === 'wrong' ? 'var(--dd-error)' :
    status === 'retype' ? 'var(--dd-warning)' :
    undefined;

  const inputColor =
    status === 'correct' ? 'var(--dd-success)' :
    status === 'wrong' ? 'var(--dd-error)' :
    'var(--dd-text)';

  const inputBg =
    status === 'correct' ? 'var(--dd-success-light)' :
    status === 'wrong' ? 'var(--dd-error-light)' :
    'transparent';

  // Summary data
  const prev = lastRunResult;
  const timeDelta = prev?.previousTime != null ? timer.elapsedMs - prev.previousTime : null;
  const mistakeDelta = prev?.previousMistakes != null ? mistakeCount - prev.previousMistakes : null;
  const canContinue = !isFinished;

  return (
    <div className="flow-page">
      {/* ── Header ── */}
      <AppHeader
        onBrandClick={onExit}
        left={
          <span
            className="header-context"
            style={categoryColor ? { color: categoryColor } : undefined}
          >
            {deckTitle}
          </span>
        }
        right={
          <>
            <div className="header-stats-group">
              <span className="header-stat">
                <span className="header-stat-label">done </span>
                {completedCount}/{totalCount}
              </span>
              {totalAnswered > 0 && (
                <span className="header-stat">
                  <span className="header-stat-label">acc </span>
                  {accuracy}%
                </span>
              )}
              <span className="header-stat">
                <span className="header-stat-label">time </span>
                {formatTime(timer.elapsedMs)}
              </span>
            </div>
            <span className="header-separator" />
            <div className="header-icon-group">
              {hasFilters && !showSummary && (
                <button
                  className={`header-filter-btn${filtersOpen || filtersActive ? ' header-filter-btn--active' : ''}`}
                  onClick={() => setFiltersOpen(prev => {
                    const next = !prev;
                    try { localStorage.setItem('dd-filters-open', next ? 'open' : 'closed'); }
                    catch { /* private browsing or full storage */ }
                    return next;
                  })}
                  aria-label="Toggle filters"
                  aria-expanded={filtersOpen}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              )}
              <KofiButton />
              <ThemeToggle />

              {!showSummary && (
                <button
                  className="header-close-btn"
                  onClick={handleStop}
                  aria-label="Stop drill"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                    <line x1="12" y1="2" x2="12" y2="12" />
                  </svg>
                </button>
              )}
            </div>
          </>
        }
        progress={progress}
        progressLabel={`${completedCount} of ${totalCount} mastered`}
        progressColor={categoryColor}
      />

      {/* ── Filters ── */}
      {hasFilters && filtersOpen && !showSummary && (
        <FlowFilters
          filterableLabels={filterableLabels}
          filters={filters}
          onFilterChange={setFilters}
        />
      )}

      {/* ── Content ── */}
      {showSummary ? (
        <div className="flow-center">
          <div className="flow-summary" role="dialog" aria-label={isFinished ? 'Run complete' : 'Run paused'}>
            <Text fw={700} size="xl" tt="uppercase" lts="0.05em"
              c={isFinished ? 'var(--dd-success)' : 'var(--dd-text)'}>
              {isFinished ? 'complete' : 'paused'}
            </Text>

            <hr className="flow-divider" />

            <div className="flow-summary-rows">
              <SummaryRow label="mastered" value={`${completedCount}/${totalCount}`}
                color={completedCount === totalCount ? 'var(--dd-success)' : 'var(--dd-text)'} />
              <SummaryRow label="accuracy" value={`${accuracy}%`}
                color={accuracy >= 90 ? 'var(--dd-success)' : accuracy >= 70 ? 'var(--dd-warning)' : 'var(--dd-error)'} />
              <SummaryRow label="time" value={formatTime(timer.elapsedMs)}
                delta={timeDelta != null ? formatDelta(timeDelta, formatTime) : undefined}
                deltaColor={timeDelta != null ? (timeDelta <= 0 ? 'var(--dd-success)' : 'var(--dd-error)') : undefined} />
              <SummaryRow label="mistakes" value={String(mistakeCount)}
                color={mistakeCount === 0 ? 'var(--dd-success)' : 'var(--dd-error)'}
                delta={mistakeDelta != null ? (mistakeDelta <= 0 ? String(mistakeDelta) : `+${mistakeDelta}`) : undefined}
                deltaColor={mistakeDelta != null ? (mistakeDelta <= 0 ? 'var(--dd-success)' : 'var(--dd-error)') : undefined} />
            </div>

            <hr className="flow-divider" />

            <div className="flow-summary-actions">
              <Button variant="subtle" size="md" onClick={onExit} autoFocus={!canContinue}
                c="var(--dd-text-muted)">
                exit <span className="flow-kbd-hint">[esc]</span>
              </Button>
              {canContinue && (
                <Button color="brand" size="md" onClick={handleContinue} autoFocus>
                  continue <span className="flow-kbd-hint">[enter]</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : !currentCard ? (
        <div className="flow-center">
          <Text size="md" c="var(--dd-text-subtle)">loading...</Text>
        </div>
      ) : (
        <>
          <div className="flow-drill">
            <div className="flow-prompt-zone">
              <FlowPrompt card={currentCard} cardKey={cardKey!} />
            </div>

            <div className="flow-response-zone">
              {/* Input + status hint */}
              <div className="flow-input-group">
                <form onSubmit={handleSubmit} className="flow-form">
                  <TextInput
                    ref={inputRef}
                    variant="unstyled"
                    classNames={{ input: 'flow-input' }}
                    value={displayValue}
                    onChange={(e) => { if (status === 'idle' || status === 'retype') setInput(e.currentTarget.value); }}
                    placeholder={status === 'retype' ? 'retype correct answer...' : (currentCard ? getPlaceholder(currentCard) : 'type answer...')}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    spellCheck={false}
                    readOnly={status === 'correct' || status === 'wrong'}
                    autoFocus
                    styles={{
                      input: {
                        borderColor: inputBorderColor,
                        color: inputColor,
                        background: inputBg,
                        caretColor: status === 'retype' ? 'var(--dd-warning)' : 'var(--dd-primary)',
                        animation: status === 'wrong' ? 'shake 0.3s ease-out' : undefined,
                      },
                    }}
                  />
                </form>

                {status === 'wrong' && (
                  <Text className="flow-status-hint">
                    press enter to retype
                  </Text>
                )}
                {status === 'retype' && currentCard && (
                  <Text className="flow-retype-hint">
                    type: {getExpectedAnswer(currentCard)}
                  </Text>
                )}
              </div>

              {/* Streak + example + cheatsheet hint */}
              <div className="flow-feedback-group">
                <div className="flow-streak" role="img" aria-label={`Streak: ${displayStreak} of ${MASTERY_THRESHOLD} correct`}>
                  {Array.from({ length: MASTERY_THRESHOLD }).map((_, i) => {
                    const filled = i < displayStreak;
                    const mastered = displayStreak >= MASTERY_THRESHOLD;
                    const state = mastered ? 'mastered' : filled ? 'filled' : undefined;
                    return (
                      <div
                        key={i}
                        className="flow-streak-dot"
                        data-state={state}
                        style={mastered ? { animationDelay: `${i * 100}ms` } : undefined}
                      />
                    );
                  })}
                  <span className="flow-streak-count">
                    {displayStreak}/{MASTERY_THRESHOLD}
                  </span>
                </div>

                {example && (
                  <div className="flow-example">
                    <Text className="flow-example-de">
                      {example.german}
                    </Text>
                    <Text className="flow-example-en">
                      {example.english}
                    </Text>
                  </div>
                )}

                {cheatsheet && (
                  <button className="flow-cheatsheet-hint" onClick={() => setCheatsheetOpen(true)}>
                    cheatsheet <kbd className="flow-cheatsheet-kbd">tab</kbd>
                  </button>
                )}
              </div>
            </div>
          </div>

          {cheatsheet && (
            <CheatsheetPanel cheatsheet={cheatsheet} title={deckTitle} open={cheatsheetOpen} onClose={() => setCheatsheetOpen(false)} filters={filtersActive ? filters : undefined} filterableLabels={filtersActive ? filterableLabels : undefined} />
          )}
        </>
      )}
    </div>
  );
}

// ─── Summary row ───

function SummaryRow({ label, value, color, delta, deltaColor }: {
  label: string;
  value: string;
  color?: string;
  delta?: string;
  deltaColor?: string;
}) {
  return (
    <div className="flow-summary-row">
      <Text size="md" c="var(--dd-text-subtle)">{label}</Text>
      <div className="flow-summary-row-values">
        <Text size="md" fw={600} c={color ?? 'var(--dd-text)'} className="flow-tabular-nums">
          {value}
        </Text>
        {delta != null && (
          <Text size="sm" c={deltaColor} className="flow-tabular-nums">
            {delta}
          </Text>
        )}
      </div>
    </div>
  );
}

function formatDelta(delta: number, fmt: (ms: number) => string): string {
  const sign = delta < 0 ? '-' : '+';
  return `${sign}${fmt(Math.abs(delta))}`;
}
