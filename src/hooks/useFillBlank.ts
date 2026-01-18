import { useState, useEffect, useCallback, useMemo } from 'react';
import type { GrammarLesson, GrammarExercise } from '../types';
import { getDeckProgress, setProgress } from '../db';

const MASTERY_THRESHOLD = 3;

export interface FillBlankTask {
  exercise: GrammarExercise;
  streak: number;
  history: boolean[]; // Last attempts: true = correct, false = wrong
}

export function useFillBlank(lesson: GrammarLesson) {
  const [progressMap, setProgressMap] = useState<Map<string, number>>(new Map());
  const [historyMap, setHistoryMap] = useState<Map<string, boolean[]>>(new Map());
  const [currentTask, setCurrentTask] = useState<FillBlankTask | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wrongQueue, setWrongQueue] = useState<string[]>([]);
  const [recentlyCorrect, setRecentlyCorrect] = useState<string[]>([]);

  // Load progress from DB (reuse deck progress with lesson id as deck id)
  useEffect(() => {
    getDeckProgress(lesson.id).then(map => {
      setProgressMap(map);
      setIsLoading(false);
    });
  }, [lesson.id]);

  // All tasks
  const allTasks = useMemo(() => {
    return lesson.exercises.map(exercise => ({
      exercise,
      streak: progressMap.get(exercise.id) ?? 0,
      history: historyMap.get(exercise.id) ?? [],
    }));
  }, [lesson.exercises, progressMap, historyMap]);

  // Incomplete tasks
  const incompleteTasks = useMemo(() => {
    return allTasks.filter(t => t.streak < MASTERY_THRESHOLD);
  }, [allTasks]);

  const completedCount = allTasks.length - incompleteTasks.length;
  const totalCount = allTasks.length;
  const isFinished = incompleteTasks.length === 0 && !isLoading;

  const SPACING_SIZE = Math.min(5, Math.floor(incompleteTasks.length / 2));

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

    const currentKey = currentTask?.exercise.id ?? null;
    const keysToAvoid = new Set([currentKey, ...recent]);

    // 70% chance to pick from wrong queue
    const availableWrong = queue.filter(k => !keysToAvoid.has(k));
    if (availableWrong.length > 0 && Math.random() < 0.7) {
      const wrongKey = availableWrong[Math.floor(Math.random() * availableWrong.length)];
      const task = incompleteTasks.find(t => t.exercise.id === wrongKey);
      if (task) {
        setCurrentTask(task);
        return;
      }
    }

    // Pick random from incomplete, avoiding recently correct
    const available = incompleteTasks.filter(t => !keysToAvoid.has(t.exercise.id));
    if (available.length === 0) {
      const fallback = incompleteTasks.filter(t => t.exercise.id !== currentKey);
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
    if (!isLoading && incompleteTasks.length > 0 && !currentTask) {
      const idx = Math.floor(Math.random() * incompleteTasks.length);
      setCurrentTask(incompleteTasks[idx]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Submit answer
  const submitAnswer = useCallback(async (isCorrect: boolean) => {
    if (!currentTask) return;

    const key = currentTask.exercise.id;
    const currentStreak = progressMap.get(key) ?? 0;
    const newStreak = isCorrect ? Math.min(currentStreak + 1, MASTERY_THRESHOLD) : 0;

    // Update progress
    setProgressMap(prev => {
      const next = new Map(prev);
      next.set(key, newStreak);
      return next;
    });

    // Update history (keep last 3)
    setHistoryMap(prev => {
      const next = new Map(prev);
      const existing = prev.get(key) ?? [];
      next.set(key, [...existing, isCorrect].slice(-3));
      return next;
    });

    // Persist (use exercise id as both word id and direction placeholder)
    await setProgress(lesson.id, key, 'de_to_en', newStreak);

    if (isCorrect && wrongQueue.includes(key)) {
      setWrongQueue(prev => prev.filter(k => k !== key));
    }

    setTimeout(() => pickNextTask(
      isCorrect ? undefined : key,
      isCorrect ? key : undefined
    ), 0);
  }, [currentTask, progressMap, lesson.id, pickNextTask, wrongQueue]);

  return {
    currentTask,
    submitAnswer,
    isLoading,
    isFinished,
    completedCount,
    totalCount,
  };
}
