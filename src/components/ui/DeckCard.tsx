import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { useTheme } from "@/context/ThemeContext";

export interface DeckCardProps {
  title: string;
  subtitle: string;
  progress: number;
  accentColor: string;
  isComplete?: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

// Trophy/Star icon for mastered state
function TrophyStar({ color, glow }: { color: string; glow: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        filter: `drop-shadow(0 0 6px ${glow})`,
      }}
    >
      <path
        d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z"
        fill={color}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DeckCard({
  title,
  subtitle,
  progress,
  accentColor,
  isComplete = false,
  onClick,
  style,
}: DeckCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Trophy gold color for completed state
  const goldColor = "#f9c54e";
  const goldGlow = isDark ? "rgba(249, 197, 78, 0.6)" : "rgba(249, 197, 78, 0.4)";

  // Theme-aware alpha: full intensity on dark, 35% on light
  const getAlpha = (baseAlpha: number) => isDark ? baseAlpha : baseAlpha * 0.35;

  // Glow intensity scales with progress, adjusted for theme
  const glowIntensity = progress > 0 ? getAlpha(0.15 + (progress / 100) * 0.2) : 0;
  const glowColor = `${accentColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')}`;

  // Helper to convert alpha to hex
  const toHex = (alpha: number) => Math.round(alpha * 255).toString(16).padStart(2, '0');

  // Completed cards get a special "trophy case" treatment
  const completedBorderColor = isDark ? goldColor : "var(--color-success)";

  const cardStyle: React.CSSProperties = {
    cursor: isComplete ? "default" : "pointer",
    background: isComplete
      ? isDark
        ? `linear-gradient(135deg, rgba(249, 197, 78, 0.08) 0%, var(--color-card-bg) 50%, rgba(249, 197, 78, 0.05) 100%)`
        : `linear-gradient(135deg, rgba(22, 163, 74, 0.06) 0%, var(--color-card-bg) 50%, rgba(22, 163, 74, 0.03) 100%)`
      : "var(--color-card-bg)",
    border: isComplete
      ? `2px solid ${completedBorderColor}`
      : "1px solid var(--color-border)",
    borderTop: isComplete ? `3px solid ${completedBorderColor}` : `3px solid ${accentColor}`,
    borderRadius: "var(--radius-md)",
    padding: "var(--space-6)",
    transition: "all var(--transition-base)",
    transform: isHovered && !isComplete ? "translateY(-4px)" : "translateY(0)",
    boxShadow: isComplete
      ? isDark
        ? `0 0 25px ${goldGlow}, inset 0 0 30px rgba(249, 197, 78, 0.05)`
        : `0 4px 12px rgba(22, 163, 74, 0.15)`
      : isHovered
        ? `0 8px 30px ${glowColor}, 0 0 15px ${accentColor}${toHex(getAlpha(0.13))}`
        : progress > 0
          ? `0 2px 10px ${glowColor}`
          : "none",
    position: "relative",
    overflow: "hidden",
    opacity: isComplete && isHovered ? 0.95 : 1,
    ...style,
  };

  // Progress text logic
  const getProgressText = () => {
    if (isComplete) return "MASTERED";
    if (progress === 0) return "Start learning";
    return `${progress}% mastered`;
  };

  const getProgressTextColor = () => {
    if (isComplete) return isDark ? goldColor : "var(--color-success)";
    if (progress === 0) return "var(--color-text-muted)";
    return accentColor;
  };

  const handleClick = () => {
    if (!isComplete) {
      onClick();
    }
  };

  return (
    <article
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={cardStyle}
    >
      {/* Diagonal shimmer overlay for completed cards */}
      {isComplete && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 10px,
                  rgba(249, 197, 78, 0.03) 10px,
                  rgba(249, 197, 78, 0.03) 20px
                )`
              : `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 10px,
                  rgba(22, 163, 74, 0.02) 10px,
                  rgba(22, 163, 74, 0.02) 20px
                )`,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--space-2)",
          position: "relative",
        }}
      >
        <h3
          style={{
            color: "var(--color-text)",
            fontSize: "var(--text-lg)",
            fontWeight: 700,
            margin: 0,
            fontFamily: "var(--font-body)",
          }}
        >
          {title}
        </h3>
        {isComplete && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrophyStar
              color={isDark ? goldColor : "var(--color-success)"}
              glow={isDark ? goldGlow : "rgba(22, 163, 74, 0.4)"}
            />
          </div>
        )}
      </div>

      {/* Subtitle */}
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: "var(--text-md)",
          margin: 0,
          marginBottom: "var(--space-4)",
          position: "relative",
        }}
      >
        {subtitle}
      </p>

      {/* Progress bar - solid gold/green for completed */}
      <div
        style={{
          marginBottom: "var(--space-3)",
          position: "relative",
        }}
      >
        {isComplete ? (
          <div
            style={{
              height: 10,
              borderRadius: "var(--radius-lg)",
              background: isDark
                ? `linear-gradient(90deg, ${goldColor} 0%, #ffd700 50%, ${goldColor} 100%)`
                : `linear-gradient(90deg, var(--color-success) 0%, #22c55e 50%, var(--color-success) 100%)`,
              boxShadow: isDark
                ? `0 0 15px ${goldGlow}, inset 0 1px 0 rgba(255,255,255,0.3)`
                : `0 2px 8px rgba(22, 163, 74, 0.3), inset 0 1px 0 rgba(255,255,255,0.4)`,
            }}
          />
        ) : (
          <ProgressBar
            value={progress}
            size="md"
            color="primary"
            style={{
              background: "var(--color-bg-secondary)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              "--color-primary": accentColor,
              boxShadow: progress > 0 ? `0 0 ${8 + (progress / 10)}px ${accentColor}${toHex(getAlpha(0.27))}` : "none",
            } as React.CSSProperties}
          />
        )}
      </div>

      {/* Progress text - styled as badge for completed */}
      {isComplete ? (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            background: isDark
              ? "rgba(249, 197, 78, 0.15)"
              : "rgba(22, 163, 74, 0.1)",
            border: `1px solid ${isDark ? "rgba(249, 197, 78, 0.3)" : "rgba(22, 163, 74, 0.2)"}`,
            borderRadius: "var(--radius-sm)",
            padding: "var(--space-1) var(--space-3)",
            position: "relative",
          }}
        >
          <span
            style={{
              color: getProgressTextColor(),
              fontSize: "var(--text-sm)",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              letterSpacing: "0.05em",
              textShadow: isDark ? `0 0 10px ${goldGlow}` : "none",
            }}
          >
            {getProgressText()}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            style={{ opacity: 0.7 }}
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke={isDark ? goldColor : "var(--color-success)"}
              strokeWidth="2"
            />
            <path
              d="M8 12L11 15L16 9"
              stroke={isDark ? goldColor : "var(--color-success)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : (
        <span
          style={{
            color: getProgressTextColor(),
            fontSize: "var(--text-base)",
            fontWeight: progress > 0 ? 600 : 400,
            position: "relative",
          }}
        >
          {getProgressText()}
        </span>
      )}
    </article>
  );
}
