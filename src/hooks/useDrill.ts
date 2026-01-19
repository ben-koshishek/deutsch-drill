import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Deck, DrillDirection, Word } from '../types';
import { getDeckProgress, setProgress } from '../db';

const MASTERY_THRESHOLD = 3; // 3 correct in a row to master

export interface DrillTask {
  word: Word;
  direction: DrillDirection;
  streak: number;
}

export function useDrill(deck: Deck, resetKey: number = 0) {
  const [progressMap, setProgressMap] = useState<Map<string, number>>(new Map());
  const [currentTask, setCurrentTask] = useState<DrillTask | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wrongQueue, setWrongQueue] = useState<string[]>([]); // keys of recently wrong tasks
  const [recentlyCorrect, setRecentlyCorrect] = useState<string[]>([]); // keys to avoid (spacing)

  // Load progress from DB (re-runs when resetKey changes)
  useEffect(() => {
    setIsLoading(true);
    setCurrentTask(null);
    setWrongQueue([]);
    setRecentlyCorrect([]);
    getDeckProgress(deck.id).then(map => {
      setProgressMap(map);
      setIsLoading(false);
    });
  }, [deck.id, resetKey]);

  // All tasks (word × direction)
  const allTasks = useMemo(() => {
    const tasks: DrillTask[] = [];
    for (const word of deck.words) {
      for (const direction of ['de_to_en', 'en_to_de'] as DrillDirection[]) {
        const key = `${word.id}_${direction}`;
        const streak = progressMap.get(key) ?? 0;
        tasks.push({ word, direction, streak });
      }
    }
    return tasks;
  }, [deck.words, progressMap]);

  // Incomplete tasks (not yet mastered)
  const incompleteTasks = useMemo(() => {
    return allTasks.filter(t => t.streak < MASTERY_THRESHOLD);
  }, [allTasks]);

  const completedCount = allTasks.length - incompleteTasks.length;
  const totalCount = allTasks.length;
  const isFinished = incompleteTasks.length === 0 && !isLoading;

  // How many cards to wait before showing a correct answer again
  const SPACING_SIZE = Math.min(5, Math.floor(incompleteTasks.length / 2));

  // Pick next task - prioritize wrong answers, space out correct ones
  const pickNextTask = useCallback((lastWrongKey?: string, lastCorrectKey?: string) => {
    if (incompleteTasks.length === 0) {
      setCurrentTask(null);
      return;
    }

    // Update wrong queue if we have a new wrong answer
    let queue = wrongQueue;
    if (lastWrongKey) {
      queue = [...wrongQueue.filter(k => k !== lastWrongKey), lastWrongKey];
      setWrongQueue(queue);
    }

    // Update recently correct buffer (keep last SPACING_SIZE items)
    let recent = recentlyCorrect;
    if (lastCorrectKey) {
      recent = [...recentlyCorrect.filter(k => k !== lastCorrectKey), lastCorrectKey].slice(-SPACING_SIZE);
      setRecentlyCorrect(recent);
    }

    const currentKey = currentTask ? `${currentTask.word.id}_${currentTask.direction}` : null;
    const keysToAvoid = new Set([currentKey, ...recent]);

    // 70% chance to pick from wrong queue if it has items
    const availableWrong = queue.filter(k => !keysToAvoid.has(k));
    if (availableWrong.length > 0 && Math.random() < 0.7) {
      const wrongKey = availableWrong[Math.floor(Math.random() * availableWrong.length)];
      const task = incompleteTasks.find(t => `${t.word.id}_${t.direction}` === wrongKey);
      if (task) {
        setCurrentTask(task);
        return;
      }
    }

    // Pick random from incomplete, avoiding recently correct
    const available = incompleteTasks.filter(t => !keysToAvoid.has(`${t.word.id}_${t.direction}`));
    if (available.length === 0) {
      // All tasks are in recently correct, just pick any incomplete
      const fallback = incompleteTasks.filter(t => `${t.word.id}_${t.direction}` !== currentKey);
      if (fallback.length === 0) {
        setCurrentTask(incompleteTasks[0]);
      } else {
        setCurrentTask(fallback[Math.floor(Math.random() * fallback.length)]);
      }
      return;
    }
    setCurrentTask(available[Math.floor(Math.random() * available.length)]);
  }, [incompleteTasks, wrongQueue, recentlyCorrect, currentTask, SPACING_SIZE]);

  // Initialize first task after loading
  useEffect(() => {
    if (!isLoading && incompleteTasks.length > 0 && !currentTask) {
      const idx = Math.floor(Math.random() * incompleteTasks.length);
      setCurrentTask(incompleteTasks[idx]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Submit answer
  const submitAnswer = useCallback(async (isCorrect: boolean) => {
    if (!currentTask) return;

    const key = `${currentTask.word.id}_${currentTask.direction}`;
    const currentStreak = progressMap.get(key) ?? 0;
    const newStreak = isCorrect ? Math.min(currentStreak + 1, MASTERY_THRESHOLD) : 0;

    // Update local state
    setProgressMap(prev => {
      const next = new Map(prev);
      next.set(key, newStreak);
      return next;
    });

    // Persist
    await setProgress(deck.id, currentTask.word.id, currentTask.direction, newStreak);

    // Remove from wrong queue if answered correctly
    if (isCorrect && wrongQueue.includes(key)) {
      setWrongQueue(prev => prev.filter(k => k !== key));
    }

    // Pick next - pass wrong key or correct key for spacing
    setTimeout(() => pickNextTask(
      isCorrect ? undefined : key,  // wrong key
      isCorrect ? key : undefined   // correct key (for spacing)
    ), 0);
  }, [currentTask, progressMap, deck.id, pickNextTask, wrongQueue]);

  return {
    currentTask,
    submitAnswer,
    isLoading,
    isFinished,
    completedCount,
    totalCount,
  };
}
