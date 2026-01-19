interface CircleBadgeProps {
  circle: number;
  size?: 'sm' | 'md';
}

export function CircleBadge({ circle, size = 'md' }: CircleBadgeProps) {
  const sizes = {
    sm: {
      fontSize: '10px',
      padding: '2px 8px',
      iconSize: '10px',
    },
    md: {
      fontSize: '12px',
      padding: '4px 12px',
      iconSize: '12px',
    },
  };

  const { fontSize, padding, iconSize } = sizes[size];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-display)',
        fontSize,
        letterSpacing: '0.05em',
        padding,
        background: 'linear-gradient(180deg, rgba(157, 0, 255, 0.2) 0%, rgba(157, 0, 255, 0.1) 100%)',
        border: '1px solid rgba(157, 0, 255, 0.5)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-neon-purple)',
        boxShadow: `
          0 0 10px rgba(157, 0, 255, 0.2),
          inset 0 0 10px rgba(157, 0, 255, 0.1)
        `,
        textShadow: '0 0 8px rgba(157, 0, 255, 0.5)',
      }}
    >
      <span style={{ fontSize: iconSize }}>◉</span>
      <span>CIRCLE {circle}</span>
    </div>
  );
}
