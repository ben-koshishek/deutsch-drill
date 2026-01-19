import { useState } from "react";
import { ProgressBar } from "./ProgressBar";
import { useTheme } from "@/context/ThemeContext";

export interface DeckCardProps {
  title: string;
  subtitle: string;
  progress: number;
  accentColor: string;
  isComplete?: boolean;
  circleCount?: number;
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
  circleCount = 0,
  onClick,
  style,
}: DeckCardProps) {
  const hasCircles = circleCount > 0;
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Trophy gold color for completed state
  const goldColor = "#f9c54e";
  const goldGlow = isDark ? "rgba(249, 197, 78, 0.6)" : "rgba(249, 197, 78, 0.4)";

  // Completed cards get a special "trophy case" treatment
  const completedBorderColor = isDark ? goldColor : "var(--color-success)";

  // RGB values for accent colors
  const getAccentRGB = () => {
    if (accentColor === '#f6019d') return '246,1,157';
    if (accentColor === '#2de2e6') return '45,226,230';
    if (accentColor === '#9d00ff') return '157,0,255';
    if (accentColor === '#f9c54e') return '249,197,78';
    return '246,1,157';
  };
  const accentRGB = getAccentRGB();

  const cardStyle: React.CSSProperties = {
    cursor: "pointer", // Always clickable - can replay circles
    background: isComplete
      ? isDark
        ? `linear-gradient(145deg, rgba(249, 197, 78, 0.12) 0%, var(--color-card-bg) 40%, rgba(249, 197, 78, 0.06) 100%)`
        : `linear-gradient(135deg, rgba(22, 163, 74, 0.06) 0%, var(--color-card-bg) 50%, rgba(22, 163, 74, 0.03) 100%)`
      : isDark
        ? `linear-gradient(145deg, rgba(255,255,255,0.03) 0%, var(--color-card-bg) 20%, rgba(${accentRGB}, 0.06) 100%)`
        : "var(--color-card-bg)",
    border: isComplete
      ? `2px solid ${completedBorderColor}`
      : `1px solid ${isDark ? `rgba(${accentRGB}, 0.25)` : 'var(--color-border)'}`,
    borderTop: isComplete ? `3px solid ${completedBorderColor}` : `3px solid ${accentColor}`,
    borderRadius: "var(--radius-lg)",
    padding: "var(--space-6)",
    transition: "all var(--transition-base)",
    transform: isHovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
    boxShadow: isComplete
      ? isDark
        ? `0 0 25px ${goldGlow}, inset 0 0 30px rgba(249, 197, 78, 0.05), inset 0 1px 0 rgba(255,255,255,0.08)`
        : `0 4px 12px rgba(22, 163, 74, 0.15)`
      : isHovered
        ? `
          0 20px 50px rgba(0,0,0,0.4),
          0 0 30px rgba(${accentRGB}, 0.3),
          inset 0 1px 0 rgba(255,255,255,0.1),
          inset 0 -1px 0 rgba(0,0,0,0.2)
        `
        : isDark
          ? `
            0 4px 20px rgba(0,0,0,0.3),
            0 0 15px rgba(${accentRGB}, 0.15),
            inset 0 1px 0 rgba(255,255,255,0.06),
            inset 0 -1px 0 rgba(0,0,0,0.1)
          `
          : `0 2px 8px rgba(0,0,0,0.08)`,
    position: "relative",
    overflow: "hidden",
    opacity: isComplete && isHovered ? 0.95 : 1,
    ...style,
  };

  // Progress text logic
  const getProgressText = () => {
    if (hasCircles) return `CIRCLE ${circleCount}`;
    if (isComplete) return "COMPLETE";
    if (progress === 0) return "Start learning";
    return `${progress}% mastered`;
  };

  const getProgressTextColor = () => {
    if (hasCircles || isComplete) return isDark ? goldColor : "var(--color-success)";
    if (progress === 0) return "var(--color-text-muted)";
    return accentColor;
  };

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={cardStyle}
    >
      {/* Top highlight edge for depth */}
      {isDark && !isComplete && (
        <div
          style={{
            position: "absolute",
            top: 3,
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 80%, transparent 100%)`,
            pointerEvents: "none",
          }}
        />
      )}

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

      {/* Full border glow on hover */}
      {isHovered && !isComplete && isDark && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            boxShadow: `inset 0 0 20px rgba(${accentRGB}, 0.2), inset 0 0 40px rgba(${accentRGB}, 0.1)`,
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
        {hasCircles && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isDark ? "rgba(157, 0, 255, 0.2)" : "rgba(157, 0, 255, 0.1)",
              border: "1px solid rgba(157, 0, 255, 0.4)",
              borderRadius: "var(--radius-sm)",
              padding: "2px 8px",
              boxShadow: isDark ? "0 0 8px rgba(157, 0, 255, 0.3)" : "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "10px",
                letterSpacing: "0.05em",
                color: "var(--color-neon-purple)",
                textShadow: isDark ? "0 0 6px rgba(157, 0, 255, 0.5)" : "none",
              }}
            >
              ◉ {circleCount}
            </span>
          </div>
        )}
        {isComplete && !hasCircles && (
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
              boxShadow: progress > 0 ? `0 0 ${8 + (progress / 10)}px rgba(${accentRGB}, ${isDark ? 0.3 : 0.15})` : "none",
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
