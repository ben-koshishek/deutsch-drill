import { Fragment, useEffect, useState, useMemo, useCallback } from "react";
import { decks } from "../data/decks";
import { grammarLessons } from "../data/grammar";
import { getBatchDeckStats, type LastRunRecord } from "../db";
import type { Deck, GrammarLesson, DeckCategory } from "../types";
import { deckTaskCount } from "../types";
import { MASTERY_THRESHOLD, CATEGORY_CONFIG } from "../constants";
import "./Dashboard.css";

interface DashboardProps {
  onSelectDeck: (deck: Deck) => void;
  onSelectLesson: (lesson: GrammarLesson) => void;
  onStartFlow?: (sources: Array<Deck | GrammarLesson>) => void;
  onStatsChange?: (stats: { mastered: string }) => void;
}

type Phase = {
  id: string;
  label: string;
  description: string;
  color: string;
  categories: DeckCategory[];
};

const PHASES: Phase[] = [
  {
    id: 'conjugation',
    label: 'Conjugation',
    description: 'Verbs change form by person and tense: ich mache, du machst, er macht.',
    color: 'var(--dd-category-verbs)',
    categories: ['verbs'],
  },
  {
    id: 'case-forms',
    label: 'Case: Article Forms',
    description: 'der/ein/kein change form by case, gender, and number. Articles carry the main case signal.',
    color: 'var(--dd-category-articles)',
    categories: ['articles'],
  },
  {
    id: 'case-triggers',
    label: 'Case: What Triggers It',
    description: 'Verbs and prepositions each require a specific case. sehen \u2192 accusative, helfen \u2192 dative, mit \u2192 dative.',
    color: 'var(--dd-case)',
    categories: ['verb-valency', 'prepositions'],
  },
  {
    id: 'case-other-words',
    label: 'Case: Pronouns & Adjectives',
    description: 'Pronouns and adjectives change form by case too \u2014 same system as articles, different endings.',
    color: 'var(--dd-category-pronouns)',
    categories: ['pronouns', 'adjective-endings'],
  },
];

type ContentItem =
  | { type: "deck"; deck: Deck }
  | { type: "lesson"; lesson: GrammarLesson };

function groupContentByCategory(): Map<DeckCategory, ContentItem[]> {
  const groups = new Map<DeckCategory, ContentItem[]>();
  for (const cat of Object.keys(CATEGORY_CONFIG) as DeckCategory[]) {
    groups.set(cat, []);
  }
  for (const deck of decks) {
    groups.get(deck.category)!.push({ type: "deck", deck });
  }
  for (const lesson of grammarLessons) {
    groups.get(lesson.category)!.push({ type: "lesson", lesson });
  }
  return groups;
}

export function Dashboard({ onSelectDeck, onSelectLesson, onStartFlow, onStatsChange }: DashboardProps) {
  const [deckProgress, setDeckProgress] = useState<
    Map<string, { completed: number; total: number; wordsLearned: number }>
  >(new Map());
  const [lessonProgress, setLessonProgress] = useState<
    Map<string, { completed: number; total: number }>
  >(new Map());
  const [lastRunsMap, setLastRunsMap] = useState<Map<string, LastRunRecord | null>>(new Map());
  const [focusedPhase, setFocusedPhase] = useState(0);
  const [focusedChip, setFocusedChip] = useState(0);

  const groupedContent = useMemo(() => groupContentByCategory(), []);

  const collectSources = useCallback((categories: DeckCategory[]) => {
    const sources: Array<Deck | GrammarLesson> = [];
    for (const cat of categories) {
      const items = groupedContent.get(cat) ?? [];
      for (const item of items) {
        if (item.type === 'deck') {
          if (!item.deck.placeholder) sources.push(item.deck);
        } else {
          sources.push(item.lesson);
        }
      }
    }
    return sources;
  }, [groupedContent]);

  const handlePracticeAll = useCallback((categories: DeckCategory[]) => {
    if (!onStartFlow) return;
    const sources = collectSources(categories);
    if (sources.length > 0) onStartFlow(sources);
  }, [onStartFlow, collectSources]);

  // Flat list of navigable items per phase (non-placeholder decks/lessons + optional practice-all)
  const phaseNavItems = useMemo(() => {
    return PHASES.map(phase => {
      const items: ContentItem[] = [];
      for (const cat of phase.categories) {
        for (const item of groupedContent.get(cat) ?? []) {
          if (item.type === 'deck' && item.deck.placeholder) continue;
          items.push(item);
        }
      }
      const hasPracticeAll = items.length > 1;
      return { items, hasPracticeAll, totalNav: items.length + (hasPracticeAll ? 1 : 0) };
    });
  }, [groupedContent]);

  // ID of the focused chip (null when practice-all is focused or no items)
  const focusedItemId = useMemo(() => {
    const nav = phaseNavItems[focusedPhase];
    if (focusedChip >= nav.items.length) return null;
    const item = nav.items[focusedChip];
    return item.type === 'deck' ? item.deck.id : item.lesson.id;
  }, [phaseNavItems, focusedPhase, focusedChip]);

  const isPracticeAllFocused = useMemo(() => {
    const nav = phaseNavItems[focusedPhase];
    return nav.hasPracticeAll && focusedChip === nav.items.length;
  }, [phaseNavItems, focusedPhase, focusedChip]);

  useEffect(() => {
    async function loadProgress() {
      try {
        const allIds = [...decks.map(d => d.id), ...grammarLessons.map(l => l.id)];
        const { progress: progressData, lastRuns: runsData } = await getBatchDeckStats(allIds);

        const deckData = new Map<string, { completed: number; total: number; wordsLearned: number }>();
        for (const deck of decks) {
          if (deck.placeholder) {
            deckData.set(deck.id, { completed: 0, total: 0, wordsLearned: 0 });
            continue;
          }
          const progress = progressData.get(deck.id) ?? new Map();
          const total = deckTaskCount(deck);
          let completed = 0;
          for (const streak of progress.values()) {
            if (streak >= MASTERY_THRESHOLD) completed++;
          }
          let wordsLearned = 0;
          if (deck.type === 'translation') {
            for (const word of deck.words) {
              const deToEn = progress.get(`${word.id}_de_to_en`) ?? 0;
              const enToDe = progress.get(`${word.id}_en_to_de`) ?? 0;
              if (deToEn >= MASTERY_THRESHOLD && enToDe >= MASTERY_THRESHOLD) wordsLearned++;
            }
          } else {
            for (const card of deck.cards) {
              const enToDe = progress.get(`${card.id}_en_to_de`) ?? 0;
              if (enToDe >= MASTERY_THRESHOLD) wordsLearned++;
            }
          }
          deckData.set(deck.id, { completed, total, wordsLearned });
        }
        setDeckProgress(deckData);

        const lessonData = new Map<string, { completed: number; total: number }>();
        for (const lesson of grammarLessons) {
          const progress = progressData.get(lesson.id) ?? new Map();
          const total = lesson.exercises.length;
          let completed = 0;
          for (const streak of progress.values()) {
            if (streak >= MASTERY_THRESHOLD) completed++;
          }
          lessonData.set(lesson.id, { completed, total });
        }
        setLessonProgress(lessonData);
        setLastRunsMap(runsData);
      } catch (err) {
        console.error('Failed to load progress data:', err);
      }
    }
    loadProgress();
  }, []);

  const overallStats = useMemo(() => {
    let totalTasks = 0;
    let masteredTasks = 0;
    for (const deck of decks) {
      if (deck.placeholder) continue;
      const progress = deckProgress.get(deck.id);
      if (progress) { masteredTasks += progress.completed; totalTasks += progress.total; }
      else totalTasks += deckTaskCount(deck);
    }
    for (const lesson of grammarLessons) {
      const progress = lessonProgress.get(lesson.id);
      if (progress) { masteredTasks += progress.completed; totalTasks += progress.total; }
      else totalTasks += lesson.exercises.length;
    }
    return { totalTasks, masteredTasks };
  }, [deckProgress, lessonProgress]);

  const categoryProgress = useMemo(() => {
    const result = new Map<DeckCategory, { completedDecks: number; totalDecks: number }>();
    for (const [category, items] of groupedContent.entries()) {
      let completedDecks = 0;
      let totalDecks = 0;
      for (const item of items) {
        if (item.type === 'deck') {
          if (item.deck.placeholder) continue;
          totalDecks++;
          const progress = deckProgress.get(item.deck.id);
          if (progress && progress.completed === progress.total && progress.total > 0) {
            completedDecks++;
          }
        } else {
          totalDecks++;
          const progress = lessonProgress.get(item.lesson.id);
          if (progress && progress.completed === progress.total && progress.total > 0) {
            completedDecks++;
          }
        }
      }
      result.set(category, { completedDecks, totalDecks });
    }
    return result;
  }, [groupedContent, deckProgress, lessonProgress]);

  useEffect(() => {
    onStatsChange?.({ mastered: `${overallStats.masteredTasks}/${overallStats.totalTasks}` });
  }, [overallStats, onStatsChange]);

  const getItemState = useCallback((item: ContentItem): 'complete' | 'started' | 'untouched' => {
    if (item.type === 'deck') {
      const deck = item.deck;
      if (deck.placeholder) return 'untouched';
      const progress = deckProgress.get(deck.id);
      const completed = progress?.completed ?? 0;
      const total = progress?.total ?? deckTaskCount(deck);
      if (completed === total && total > 0) return 'complete';
      if (lastRunsMap.get(deck.id) != null) return 'started';
      return 'untouched';
    } else {
      const lesson = item.lesson;
      const progress = lessonProgress.get(lesson.id);
      const completed = progress?.completed ?? 0;
      const total = progress?.total ?? lesson.exercises.length;
      if (completed === total && total > 0) return 'complete';
      if (lastRunsMap.get(lesson.id) != null) return 'started';
      return 'untouched';
    }
  }, [deckProgress, lessonProgress, lastRunsMap]);

  const handleItemClick = useCallback((item: ContentItem) => {
    if (item.type === 'deck') {
      if (!item.deck.placeholder) onSelectDeck(item.deck);
    } else {
      onSelectLesson(item.lesson);
    }
  }, [onSelectDeck, onSelectLesson]);

  const renderChip = useCallback((item: ContentItem, chipColor?: string) => {
    const state = getItemState(item);
    const isComplete = state === 'complete';
    const isPlaceholder = item.type === 'deck' && item.deck.placeholder === true;
    const name = item.type === 'deck' ? item.deck.name : item.lesson.name;
    const id = item.type === 'deck' ? item.deck.id : item.lesson.id;
    const isChipFocused = id === focusedItemId;

    return (
      <button
        key={id}
        type="button"
        className="deck-chip"
        data-state={state}
        data-chip-focused={isChipFocused || undefined}
        disabled={isPlaceholder}
        onClick={() => handleItemClick(item)}
        style={chipColor ? { '--chip-color': chipColor } as React.CSSProperties : undefined}
      >
        {isComplete && <span className="chip-check">&#10003;</span>}
        {name}
      </button>
    );
  }, [getItemState, handleItemClick, focusedItemId]);

  useEffect(() => {
    function getGridColumns(): number {
      const grid = document.querySelector('.category-section[data-focused] .deck-chips');
      if (!grid) return 1;
      const chips = grid.querySelectorAll('.deck-chip');
      if (chips.length < 2) return 1;
      const firstTop = (chips[0] as HTMLElement).offsetTop;
      let cols = 0;
      for (const chip of chips) {
        if ((chip as HTMLElement).offsetTop === firstTop) cols++;
        else break;
      }
      return cols || 1;
    }

    function handleKeyDown(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      const nav = phaseNavItems[focusedPhase];
      const maxChip = nav.totalNav - 1;

      switch (e.key) {
        case 'Tab': {
          e.preventDefault();
          const dir = e.shiftKey ? -1 : 1;
          setFocusedPhase((focusedPhase + dir + PHASES.length) % PHASES.length);
          setFocusedChip(0);
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (focusedChip > 0) {
            setFocusedChip(focusedChip - 1);
          } else {
            const col = focusedPhase % 2;
            if (col > 0) {
              const prev = focusedPhase - 1;
              setFocusedPhase(prev);
              setFocusedChip(phaseNavItems[prev].totalNav - 1);
            }
          }
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (focusedChip < maxChip) {
            setFocusedChip(focusedChip + 1);
          } else {
            const col = focusedPhase % 2;
            if (col < 1 && focusedPhase + 1 < PHASES.length) {
              setFocusedPhase(focusedPhase + 1);
              setFocusedChip(0);
            }
          }
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          const colsUp = getGridColumns();
          const newUp = focusedChip - colsUp;
          if (newUp >= 0) {
            setFocusedChip(newUp);
          } else {
            const row = Math.floor(focusedPhase / 2);
            if (row > 0) {
              setFocusedPhase(focusedPhase - 2);
              setFocusedChip(0);
            }
          }
          break;
        }
        case 'ArrowDown': {
          e.preventDefault();
          const colsDown = getGridColumns();
          const newDown = focusedChip + colsDown;
          if (newDown <= maxChip) {
            setFocusedChip(newDown);
          } else {
            const below = focusedPhase + 2;
            if (below < PHASES.length) {
              setFocusedPhase(below);
              setFocusedChip(0);
            }
          }
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (isPracticeAllFocused) {
            handlePracticeAll(PHASES[focusedPhase].categories);
          } else if (focusedChip < nav.items.length) {
            handleItemClick(nav.items[focusedChip]);
          }
          break;
        }
        case 'Escape': {
          e.preventDefault();
          setFocusedChip(0);
          break;
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedPhase, focusedChip, phaseNavItems, isPracticeAllFocused, handlePracticeAll, handleItemClick]);

  return (
    <div className="dashboard-categories">
      <a className="how-it-works-link" href="#/how-german-works">
        How German Works &rsaquo;
      </a>

      {PHASES.map((phase, index) => {
        // Aggregate progress across all categories in this phase
        let phaseCompletedDecks = 0;
        let phaseTotalDecks = 0;
        for (const cat of phase.categories) {
          const cp = categoryProgress.get(cat);
          if (cp) {
            phaseCompletedDecks += cp.completedDecks;
            phaseTotalDecks += cp.totalDecks;
          }
        }
        const allDone = phaseCompletedDecks === phaseTotalDecks && phaseTotalDecks > 0;

        // Count practiceable items
        let practiceableCount = 0;
        for (const cat of phase.categories) {
          const items = groupedContent.get(cat) ?? [];
          practiceableCount += items.filter(i => i.type === 'deck' ? !i.deck.placeholder : true).length;
        }
        const canPracticeAll = practiceableCount > 1;
        const hasSubGroups = phase.categories.length > 1;

        return (
          <section
            key={phase.id}
            className="category-section"
            data-focused={index === focusedPhase || undefined}
            style={{
              '--cat-color': phase.color,
              animationDelay: `${index * 80}ms`,
            } as React.CSSProperties}
          >
            <div className="panel-header">
              <div className="category-header">
                <div className="category-dot" style={{ background: phase.color }} />
                <span className="category-label" style={{ color: phase.color }}>
                  {phase.label}
                </span>
                {phaseTotalDecks > 0 && (
                  <span
                    className="category-count"
                    data-done={allDone || undefined}
                  >
                    {phaseCompletedDecks}/{phaseTotalDecks}
                  </span>
                )}
              </div>
              <p className="phase-description">{phase.description}</p>
            </div>

            {hasSubGroups ? (
              phase.categories.map((cat) => {
                const items = groupedContent.get(cat) ?? [];
                if (items.length === 0) return null;
                const config = CATEGORY_CONFIG[cat];

                return (
                  <Fragment key={cat}>
                    <span
                      className="sub-group-label"
                      style={{ color: config.color }}
                    >
                      {config.label}
                    </span>
                    <div className="deck-chips">
                      {items.map((item) => renderChip(item, config.color))}
                    </div>
                  </Fragment>
                );
              })
            ) : (
              <div className="deck-chips">
                {(groupedContent.get(phase.categories[0]) ?? []).map((item) => renderChip(item))}
              </div>
            )}

            {canPracticeAll && (
              <button
                className="practice-all-btn"
                data-chip-focused={(index === focusedPhase && isPracticeAllFocused) || undefined}
                onClick={() => handlePracticeAll(phase.categories)}
              >
                practice all
                <span className="practice-all-arrow">&rsaquo;</span>
              </button>
            )}
          </section>
        );
      })}

      <div className="dashboard-kbd-hint">
        <kbd>Tab</kbd> sections <span className="dashboard-kbd-sep">&middot;</span>
        <kbd>&larr;&rarr;</kbd> decks <span className="dashboard-kbd-sep">&middot;</span>
        <kbd>Enter</kbd> go <span className="dashboard-kbd-sep">&middot;</span>
        <kbd>Esc</kbd> reset
      </div>
    </div>
  );
}
