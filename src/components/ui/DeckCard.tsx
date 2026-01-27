import { useTheme } from "@/context/ThemeContext";
import { formatTime } from "@/utils/formatTime";
import "./DeckCard.css";

export interface DeckCardProps {
  title: string;
  subtitle: string;
  progress: number;
  accentColor: string;
  isComplete?: boolean;
  lastRunTimeMs?: number | null;
  lastRunMistakes?: number | null;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function DeckCard({
  title,
  subtitle,
  accentColor,
  lastRunTimeMs = null,
  lastRunMistakes = null,
  onClick,
  style,
}: DeckCardProps) {
  const hasLastRun = lastRunTimeMs !== null;
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isPerfect = lastRunMistakes === 0;

  const classNames = [
    "deck-card",
    isDark && "deck-card--dark",
    hasLastRun && "deck-card--practiced",
    isPerfect && hasLastRun && "deck-card--mastered",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      onClick={onClick}
      className={classNames}
      style={{
        "--accent-color": accentColor,
        ...style,
      } as React.CSSProperties}
    >
      <h3 className="deck-card__title">{title}</h3>

      {/* Bottom stats bar */}
      <div className="deck-card__footer">
        <span className="deck-card__subtitle">{subtitle}</span>

        {hasLastRun && (
          <div className={`deck-card__result ${isPerfect ? 'deck-card__result--perfect' : ''}`}>
            <span className="deck-card__result-time">{formatTime(lastRunTimeMs)}</span>
            {!isPerfect && lastRunMistakes !== null && (
              <span className="deck-card__result-status">
                {lastRunMistakes}×
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
