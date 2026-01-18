import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { TIMER_INTERVAL_MS } from '@/constants';

interface UseTimerReturn {
  elapsedMs: number;
  isRunning: boolean;
  start: () => void;
  stop: () => number;
  reset: () => void;
  setElapsed: (ms: number) => void;
}

export function useTimer(): UseTimerReturn {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  // Track elapsed in ref to avoid circular dependency in start callback
  const elapsedRef = useRef(elapsedMs);

  // Keep ref in sync with state
  useEffect(() => {
    elapsedRef.current = elapsedMs;
  }, [elapsedMs]);

  // Cleanup interval on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const start = useCallback(() => {
    if (isRunning) return;

    // Use ref to get current elapsed without adding elapsedMs to deps
    startTimeRef.current = Date.now() - elapsedRef.current;
    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedMs(Date.now() - startTimeRef.current);
      }
    }, TIMER_INTERVAL_MS);
  }, [isRunning]);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);

    // Return final elapsed time using ref for accuracy
    if (startTimeRef.current !== null) {
      const finalTime = Date.now() - startTimeRef.current;
      setElapsedMs(finalTime);
      return finalTime;
    }
    return elapsedRef.current;
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setElapsedMs(0);
    setIsRunning(false);
    startTimeRef.current = null;
  }, []);

  const setElapsed = useCallback((ms: number) => {
    setElapsedMs(ms);
  }, []);

  // Memoize return object to prevent unnecessary re-renders in consumers
  return useMemo(() => ({
    elapsedMs,
    isRunning,
    start,
    stop,
    reset,
    setElapsed,
  }), [elapsedMs, isRunning, start, stop, reset, setElapsed]);
}
