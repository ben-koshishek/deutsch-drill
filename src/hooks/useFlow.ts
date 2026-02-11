import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import type { Deck, GrammarLesson, FlowCard, FilterState } from '../types';
import { flowCardKey, flowCardDeckId } from '../types';
import { filterFlowCards } from '@/utils/flowFilters';
import { getDeckProgress, setProgress, resetDeckProgress } from '../db';
import { MASTERY_THRESHOLD, WRONG_QUEUE_PROBABILITY, DEFAULT_SPACING_SIZE } from '@/constants';

export interface FlowTask {
  card: FlowCard;
  streak: number;
}

type FlowSource = Deck | GrammarLesson;

function isGrammarLesson(source: FlowSource): source is GrammarLesson {
  return source.type === 'grammar';
}

/** Build all FlowCards from a set of sources */
function buildFlowCards(sources: FlowSource[]): FlowCard[] {
  const cards: FlowCard[] = [];
  for (const source of sources) {
    if (isGrammarLesson(source)) {
      for (const exercise of source.exercises) {
        cards.push({ source: 'grammar', lessonId: source.id, exercise });
      }
    } else if (source.type === 'translation') {
      for (const word of source.words) {
        cards.push({ source: 'translation', deckId: source.id, item: word, direction: 'de_to_en' });
        cards.push({ source: 'translation', deckId: source.id, item: word, direction: 'en_to_de' });
      }
    } else {
      // label-to-form — single direction
      for (const card of source.cards) {
        cards.push({ source: 'label-to-form', deckId: source.id, item: card });
      }
    }
  }
  return cards;
}

export function useFlow(sources: FlowSource[], filters?: FilterState) {
  const [progressMap, setProgressMap] = useState<Map<string, Map<string, number>>>(new Map());
  const [currentTask, setCurrentTask] = useState<FlowTask | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wrongQueue, setWrongQueue] = useState<string[]>([]);
  const [recentlyCorrect, setRecentlyCorrect] = useState<string[]>([]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctAnswered, setCorrectAnswered] = useState(0);

  const pendingPickRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pendingPickRef.current !== null) {
        cancelAnimationFrame(pendingPickRef.current);
        pendingPickRef.current = null;
      }
    };
  }, []);

  // Stable source IDs for dependency tracking
  const sourceIds = useMemo(() => sources.map(s => s.id).sort().join(','), [sources]);

  // All flow cards from all sources
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const allCardsUnfiltered = useMemo(() => buildFlowCards(sources), [sourceIds]);

  // Stable serialization of filter state for dependency tracking
  const filterKey = useMemo(() => {
    if (!filters || filters.size === 0) return '';
    const parts: string[] = [];
    for (const [type, values] of filters) {
      parts.push(`${type}:${[...values].sort().join(',')}`);
    }
    return parts.sort().join('|');
  }, [filters]);

  // Apply filters to cards (filterKey is a stable serialization of filters)
  const allCards = useMemo(() => {
    if (!filters || filters.size === 0) return allCardsUnfiltered;
    return filterFlowCards(allCardsUnfiltered, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCardsUnfiltered, filterKey]);

  // Load progress from DB for all sources
  useEffect(() => {
    initializedRef.current = false;
    setIsLoading(true);
    setCurrentTask(null);
    setWrongQueue([]);
    setRecentlyCorrect([]);
    setTotalAnswered(0);
    setCorrectAnswered(0);

    const ids = sources.map(s => s.id);
    Promise.all(ids.map(id => getDeckProgress(id).then(map => [id, map] as const)))
      .then(results => {
        const map = new Map<string, Map<string, number>>();
        for (const [id, progress] of results) {
          map.set(id, progress);
        }
        setProgressMap(map);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to load flow progress:', err);
        setProgressMap(new Map());
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceIds]);

  // Reset flow state when filters change (but not on initial mount)
  const prevFilterKeyRef = useRef(filterKey);
  useEffect(() => {
    if (prevFilterKeyRef.current !== filterKey) {
      prevFilterKeyRef.current = filterKey;
      initializedRef.current = false;
      setCurrentTask(null);
      setWrongQueue([]);
      setRecentlyCorrect([]);
      setTotalAnswered(0);
      setCorrectAnswered(0);
    }
  }, [filterKey]);

  // Get streak for a card from the progress maps
  const getStreak = useCallback((card: FlowCard): number => {
    const deckId = flowCardDeckId(card);
    const key = flowCardKey(card);
    return progressMap.get(deckId)?.get(key) ?? 0;
  }, [progressMap]);

  // All tasks with current streaks
  const allTasks = useMemo(() => {
    return allCards.map(card => ({
      card,
      streak: getStreak(card),
    }));
  }, [allCards, getStreak]);

  // Incomplete tasks
  const incompleteTasks = useMemo(() => {
    return allTasks.filter(t => t.streak < MASTERY_THRESHOLD);
  }, [allTasks]);

  const completedCount = allTasks.length - incompleteTasks.length;
  const totalCount = allTasks.length;
  const isFinished = incompleteTasks.length === 0 && !isLoading;
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswered / totalAnswered) * 100) : 100;

  const SPACING_SIZE = Math.min(DEFAULT_SPACING_SIZE, Math.floor(incompleteTasks.length / 2));

  // Pick next task
  const pickNextTask = useCallback((lastWrongKey?: string, lastCorrectKey?: string) => {
    if (incompleteTasks.length === 0) {
      setCurrentTask(null);
      return;
    }

    let queue = wrongQueue;
    if (lastWrongKey) {
      queue = [...wrongQueue.filter(k => k !== lastWrongKey), lastWrongKey];
      setWrongQueue(queue);
    }

    let recent = recentlyCorrect;
    if (lastCorrectKey) {
      recent = [...recentlyCorrect.filter(k => k !== lastCorrectKey), lastCorrectKey].slice(-SPACING_SIZE);
      setRecentlyCorrect(recent);
    }

    const currentKey = currentTask ? flowCardKey(currentTask.card) : null;
    const keysToAvoid = new Set([currentKey, ...recent]);

    // WRONG_QUEUE_PROBABILITY chance to pick from wrong queue
    const availableWrong = queue.filter(k => !keysToAvoid.has(k));
    if (availableWrong.length > 0 && Math.random() < WRONG_QUEUE_PROBABILITY) {
      const wrongKey = availableWrong[Math.floor(Math.random() * availableWrong.length)];
      const task = incompleteTasks.find(t => flowCardKey(t.card) === wrongKey);
      if (task) {
        setCurrentTask(task);
        return;
      }
    }

    // Pick random from incomplete, avoiding recently correct
    const available = incompleteTasks.filter(t => !keysToAvoid.has(flowCardKey(t.card)));
    if (available.length === 0) {
      const fallback = incompleteTasks.filter(t => flowCardKey(t.card) !== currentKey);
      if (fallback.length === 0) {
        setCurrentTask(incompleteTasks[0]);
      } else {
        setCurrentTask(fallback[Math.floor(Math.random() * fallback.length)]);
      }
      return;
    }
    setCurrentTask(available[Math.floor(Math.random() * available.length)]);
  }, [incompleteTasks, wrongQueue, recentlyCorrect, currentTask, SPACING_SIZE]);

  // Initialize first task
  useEffect(() => {
    if (!isLoading && !initializedRef.current && incompleteTasks.length > 0) {
      initializedRef.current = true;
      const idx = Math.floor(Math.random() * incompleteTasks.length);
      setCurrentTask(incompleteTasks[idx]);
    }
  }, [isLoading, incompleteTasks]);

  // Submit answer
  const submitAnswer = useCallback(async (isCorrect: boolean): Promise<boolean> => {
    if (!currentTask) return false;

    const key = flowCardKey(currentTask.card);
    const deckId = flowCardDeckId(currentTask.card);
    const currentStreak = getStreak(currentTask.card);
    const newStreak = isCorrect ? Math.min(currentStreak + 1, MASTERY_THRESHOLD) : 0;

    // Compute synchronously before state updates: will this submission finish the flow?
    const willFinish = newStreak >= MASTERY_THRESHOLD && incompleteTasks.length === 1;

    // Update local progress map
    setProgressMap(prev => {
      const next = new Map(prev);
      const deckMap = new Map(prev.get(deckId) ?? new Map());
      deckMap.set(key, newStreak);
      next.set(deckId, deckMap);
      return next;
    });

    // Update session stats
    setTotalAnswered(prev => prev + 1);
    if (isCorrect) setCorrectAnswered(prev => prev + 1);

    // Persist to DB — extract wordId and direction from the key
    const itemId = key.substring(0, key.lastIndexOf('_'));
    const direction = key.substring(key.lastIndexOf('_') + 1) as 'de_to_en' | 'en_to_de';
    setProgress(deckId, itemId, direction, newStreak).catch(err => {
      console.error('Failed to persist progress:', err);
    });

    // Update wrong queue
    if (isCorrect && wrongQueue.includes(key)) {
      setWrongQueue(prev => prev.filter(k => k !== key));
    }

    // Pick next card after current render cycle
    pendingPickRef.current = requestAnimationFrame(() => {
      pendingPickRef.current = null;
      pickNextTask(
        isCorrect ? undefined : key,
        isCorrect ? key : undefined
      );
    });

    return willFinish;
  }, [currentTask, getStreak, pickNextTask, wrongQueue, incompleteTasks.length]);

  // Reset all progress for current sources
  const resetProgress = useCallback(async () => {
    const ids = sources.map(s => s.id);
    await Promise.all(ids.map(id => resetDeckProgress(id)));

    setProgressMap(new Map());
    setWrongQueue([]);
    setRecentlyCorrect([]);
    setTotalAnswered(0);
    setCorrectAnswered(0);
    initializedRef.current = false;
    setCurrentTask(null);
  }, [sources]);

  return {
    currentCard: currentTask?.card ?? null,
    currentStreak: currentTask ? getStreak(currentTask.card) : 0,
    submitAnswer,
    resetProgress,
    isLoading,
    isFinished,
    completedCount,
    totalCount,
    accuracy,
    totalAnswered,
  };
}
