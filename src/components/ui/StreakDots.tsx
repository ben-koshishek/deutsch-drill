interface StreakDotsProps {
  current: number;
  total?: number;
  size?: "sm" | "md";
}

export function StreakDots({ current, total = 3, size = "md" }: StreakDotsProps) {
  const sizeStyles = {
    sm: {
      dot: "0.75rem",
      gap: "var(--space-2)",
      glow: "6px",
    },
    md: {
      dot: "0.875rem",
      gap: "var(--space-3)",
      glow: "10px",
    },
  };

  const { dot, gap, glow } = sizeStyles[size];

  return (
    <div style={{ display: "flex", gap, justifyContent: "center" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: dot,
            height: dot,
            borderRadius: "50%",
            background: i < current ? "var(--color-streak)" : "var(--color-border)",
            boxShadow: i < current ? `0 0 ${glow} var(--color-streak)` : "none",
            transition: "background var(--transition-base), box-shadow var(--transition-base)",
          }}
        />
      ))}
    </div>
  );
}
