interface StreakDotsProps {
  current: number;
  total?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  isMastered?: boolean;
}

export function StreakDots({
  current,
  total = 3,
  size = "md",
  showLabel = false,
  isMastered = false,
}: StreakDotsProps) {
  const sizeStyles = {
    sm: {
      dot: "0.75rem",
      gap: "var(--space-2)",
      glow: "6px",
      fontSize: "var(--text-xs)",
    },
    md: {
      dot: "1rem",
      gap: "var(--space-3)",
      glow: "10px",
      fontSize: "var(--text-sm)",
    },
    lg: {
      dot: "1.25rem",
      gap: "var(--space-3)",
      glow: "12px",
      fontSize: "var(--text-base)",
    },
  };

  const { dot, gap, glow, fontSize } = sizeStyles[size];
  const mastered = isMastered || current >= total;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: "center",
        gap: "var(--space-3)",
      }}
    >
      <div
        style={{
          display: 'flex',
          gap,
          padding: "var(--space-2)",
          borderRadius: "var(--radius-lg)",
          background: mastered ? "color-mix(in srgb, var(--color-mastery) 10%, transparent)" : "transparent",
          animation: mastered ? "masteryPulse 1.5s ease-in-out" : "none",
          transition: "background var(--transition-base)",
        }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const filled = i < current;
          const isStarred = mastered;

          return (
            <div
              key={i}
              style={{
                width: dot,
                height: dot,
                borderRadius: "50%",
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                fontSize: `calc(${dot} * 0.7)`,
                background: isStarred
                  ? "var(--color-mastery)"
                  : filled
                    ? "var(--color-streak)"
                    : "transparent",
                boxShadow: isStarred
                  ? `0 0 ${glow} var(--color-mastery), 0 0 calc(${glow} * 2) var(--color-mastery-glow)`
                  : filled
                    ? `0 0 ${glow} var(--color-streak)`
                    : "none",
                transition: "all var(--transition-base)",
                animation: isStarred ? "dotPop 0.3s ease-out" : "none",
                animationDelay: isStarred ? `${i * 100}ms` : "0ms",
                border: isStarred
                  ? "none"
                  : filled
                    ? "none"
                    : "2px solid var(--color-text-subtle)",
              }}
            >
              {isStarred && (
                <span style={{ lineHeight: 1, marginTop: "-1px" }}>★</span>
              )}
            </div>
          );
        })}
      </div>
      {showLabel && (
        <span
          style={{
            fontSize,
            color: mastered
              ? "var(--color-mastery)"
              : current > 0
                ? "var(--color-neon-cyan)"
                : "var(--color-text-subtle)",
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            transition: "all var(--transition-base)",
          }}
        >
          {mastered ? "MASTERED" : `${current}/${total}`}
        </span>
      )}
    </div>
  );
}
