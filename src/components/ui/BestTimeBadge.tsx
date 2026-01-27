import { formatTime } from '@/utils/formatTime';

interface BestTimeBadgeProps {
  timeMs: number;
  mistakes?: number;
  size?: 'sm' | 'md';
}

export function BestTimeBadge({ timeMs, mistakes, size = 'md' }: BestTimeBadgeProps) {
  const sizes = {
    sm: {
      fontSize: 'var(--text-xs)',
      padding: 'var(--space-1) var(--space-2)',
      iconSize: '0.625rem',
    },
    md: {
      fontSize: 'var(--text-xs)',
      padding: 'var(--space-1) var(--space-3)',
      iconSize: '0.75rem',
    },
  };

  const { fontSize, padding, iconSize } = sizes[size];
  const showMistakes = mistakes !== undefined;
  const isPerfect = mistakes === 0;

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
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--color-time) 20%, transparent) 0%, color-mix(in srgb, var(--color-time) 10%, transparent) 100%)',
        border: '1px solid color-mix(in srgb, var(--color-time) 50%, transparent)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-time)',
        boxShadow: '0 0 10px var(--color-time-glow), inset 0 0 10px color-mix(in srgb, var(--color-time) 10%, transparent)',
        textShadow: '0 0 8px var(--color-time-glow)',
      }}
    >
      <span style={{ fontSize: iconSize }}>⏱</span>
      <span style={{ fontWeight: 600 }}>{formatTime(timeMs)}</span>
      {showMistakes && (
        <>
          <span style={{ opacity: 0.5 }}>·</span>
          <span
            style={{
              color: isPerfect ? 'var(--color-success)' : 'var(--color-error)',
              textShadow: isPerfect ? '0 0 6px var(--color-success-glow)' : '0 0 6px var(--color-error-glow)',
              fontWeight: 600,
            }}
          >
            {isPerfect ? '✓' : `✗${mistakes}`}
          </span>
        </>
      )}
    </div>
  );
}
