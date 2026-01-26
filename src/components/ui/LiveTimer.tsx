import { formatTime } from '@/utils/formatTime';

interface LiveTimerProps {
  elapsedMs: number;
  bestTimeMs: number | null;
  size?: 'sm' | 'md';
}

type TimerStatus = 'ahead' | 'close' | 'behind' | 'neutral';

function getTimerStatus(elapsedMs: number, bestTimeMs: number | null): TimerStatus {
  if (bestTimeMs === null) return 'neutral';

  const diff = elapsedMs - bestTimeMs;
  if (diff < -2000) return 'ahead'; // More than 2s ahead
  if (diff < 2000) return 'close'; // Within 2s
  return 'behind'; // More than 2s behind
}

const STATUS_COLORS: Record<TimerStatus, { color: string; glow: string }> = {
  ahead: { color: 'var(--color-success)', glow: 'rgba(34, 197, 94, 0.5)' },
  close: { color: 'var(--color-neon-yellow)', glow: 'rgba(249, 197, 78, 0.5)' },
  behind: { color: 'var(--color-error)', glow: 'rgba(239, 68, 68, 0.5)' },
  neutral: { color: 'var(--color-text-muted)', glow: 'none' },
};

export function LiveTimer({ elapsedMs, bestTimeMs, size = 'md' }: LiveTimerProps) {
  const status = getTimerStatus(elapsedMs, bestTimeMs);
  const { color, glow } = STATUS_COLORS[status];

  const sizes = {
    sm: {
      fontSize: 'var(--text-xs)',
      padding: 'var(--space-1) var(--space-2)',
      iconSize: '0.625rem',
    },
    md: {
      fontSize: 'var(--text-sm)',
      padding: 'var(--space-1) var(--space-3)',
      iconSize: '0.75rem',
    },
  };

  const { fontSize, padding, iconSize } = sizes[size];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        fontFamily: 'var(--font-mono)',
        fontSize,
        letterSpacing: '0.02em',
        padding,
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        color,
        boxShadow: glow !== 'none' ? `0 0 10px ${glow}` : 'none',
        transition: 'all var(--transition-base)',
      }}
    >
      <span style={{ fontSize: iconSize }}>⏱</span>
      <span style={{ fontWeight: 600 }}>{formatTime(elapsedMs)}</span>
    </div>
  );
}
