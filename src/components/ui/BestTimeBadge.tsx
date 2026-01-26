import { formatTime } from '@/utils/formatTime';

interface BestTimeBadgeProps {
  timeMs: number;
  size?: 'sm' | 'md';
}

export function BestTimeBadge({ timeMs, size = 'md' }: BestTimeBadgeProps) {
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
        background: 'linear-gradient(180deg, rgba(45, 226, 230, 0.2) 0%, rgba(45, 226, 230, 0.1) 100%)',
        border: '1px solid rgba(45, 226, 230, 0.5)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-neon-cyan)',
        boxShadow: `
          0 0 10px rgba(45, 226, 230, 0.2),
          inset 0 0 10px rgba(45, 226, 230, 0.1)
        `,
        textShadow: '0 0 8px rgba(45, 226, 230, 0.5)',
      }}
    >
      <span style={{ fontSize: iconSize }}>⏱</span>
      <span style={{ fontWeight: 600 }}>{formatTime(timeMs)}</span>
    </div>
  );
}
