interface HistoryDotsProps {
  history: (boolean | null)[];
  total?: number;
  size?: "sm" | "md" | "lg";
}

export function HistoryDots({ history, total = 5, size = "lg" }: HistoryDotsProps) {
  // Show more dots and use last N entries
  const displayDots = [
    ...history.slice(-total),
    ...Array(Math.max(0, total - history.length)).fill(null),
  ].slice(0, total);

  const sizeStyles = {
    sm: {
      dot: "0.75rem",
      gap: "var(--space-2)",
      glow: "6px",
      glowSpread: "12px",
    },
    md: {
      dot: "1rem",
      gap: "var(--space-3)",
      glow: "8px",
      glowSpread: "16px",
    },
    lg: {
      dot: "1.25rem",
      gap: "var(--space-3)",
      glow: "10px",
      glowSpread: "20px",
    },
  };

  const { dot, gap, glow, glowSpread } = sizeStyles[size];

  // Count recent results for visual feedback
  const recentCorrect = history.slice(-total).filter(r => r === true).length;

  return (
    <div
      style={{
        display: 'flex',
        gap,
        padding: "var(--space-2)",
        borderRadius: "var(--radius-lg)",
        background: recentCorrect >= 3 ? "rgba(57, 255, 20, 0.05)" : "transparent",
        transition: "background var(--transition-base)",
      }}
    >
      {displayDots.map((result, i) => {
        const isLatest = i === history.length - 1 && history.length <= total;
        const isCorrect = result === true;
        const isWrong = result === false;
        const isEmpty = result === null;

        return (
          <div
            key={i}
            style={{
              width: dot,
              height: dot,
              borderRadius: "50%",
              background: isCorrect
                ? "var(--color-success)"
                : isWrong
                  ? "var(--color-error)"
                  : "var(--color-border)",
              boxShadow: isCorrect
                ? `0 0 ${glow} var(--color-success), 0 0 ${glowSpread} var(--color-success-glow)`
                : isWrong
                  ? `0 0 ${glow} var(--color-error), 0 0 ${glowSpread} var(--color-error-glow)`
                  : "inset 0 0 4px rgba(0,0,0,0.3)",
              transition: "all var(--transition-base)",
              animation: isLatest && !isEmpty ? "dotPop 0.3s ease-out" : "none",
              border: isEmpty ? "2px solid var(--color-border)" : "none",
              opacity: isEmpty ? 0.4 : 1,
            }}
          />
        );
      })}
    </div>
  );
}
