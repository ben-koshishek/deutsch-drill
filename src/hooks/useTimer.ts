import { useState, useRef, useCallback, useEffect } from 'react'

export function useTimer() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  const start = useCallback(() => {
    if (isRunning) return
    startTimeRef.current = Date.now() - elapsedMs
    setIsRunning(true)
  }, [isRunning, elapsedMs])

  const stop = useCallback(() => {
    setIsRunning(false)
  }, [])

  const reset = useCallback(() => {
    setElapsedMs(0)
    setIsRunning(false)
    startTimeRef.current = null
  }, [])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        if (startTimeRef.current !== null) {
          setElapsedMs(Date.now() - startTimeRef.current)
        }
      }, 100)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  const formatTime = useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }, [])

  return {
    elapsedMs,
    isRunning,
    formatted: formatTime(elapsedMs),
    start,
    stop,
    reset,
    formatTime,
  }
}
