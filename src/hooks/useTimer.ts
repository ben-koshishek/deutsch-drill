import { useState, useRef, useCallback } from 'react';

interface UseTimerReturn {
  elapsedMs: number;
  isRunning: boolean;
  start: () => void;
  stop: () => number;
  reset: () => void;
}

export function useTimer(): UseTimerReturn {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (isRunning) return;

    startTimeRef.current = Date.now() - elapsedMs;
    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedMs(Date.now() - startTimeRef.current);
      }
    }, 100); // Update every 100ms for smooth display
  }, [isRunning, elapsedMs]);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);

    // Return final elapsed time
    if (startTimeRef.current !== null) {
      const finalTime = Date.now() - startTimeRef.current;
      setElapsedMs(finalTime);
      return finalTime;
    }
    return elapsedMs;
  }, [elapsedMs]);

  const reset = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setElapsedMs(0);
    setIsRunning(false);
    startTimeRef.current = null;
  }, []);

  return { elapsedMs, isRunning, start, stop, reset };
}
