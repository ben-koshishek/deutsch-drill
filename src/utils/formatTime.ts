/**
 * Format milliseconds as a readable time string
 * - Under 1 minute: "45.2" (seconds.tenths)
 * - Over 1 minute: "1:23.4" (minutes:seconds.tenths)
 */
export function formatTime(ms: number): string {
  const totalSeconds = ms / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return seconds.toFixed(1);
  }

  const wholeSeconds = Math.floor(seconds);
  const tenths = Math.floor((seconds - wholeSeconds) * 10);
  return `${minutes}:${wholeSeconds.toString().padStart(2, '0')}.${tenths}`;
}
