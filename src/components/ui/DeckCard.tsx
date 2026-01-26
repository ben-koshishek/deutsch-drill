import { useTheme } from "@/context/ThemeContext";
import { formatTime } from "@/utils/formatTime";
import "./DeckCard.css";

export interface DeckCardProps {
  title: string;
  subtitle: string;
  progress: number;
  accentColor: string;
  isComplete?: boolean;
  bestTimeMs?: number | null;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function DeckCard({
  title,
  subtitle,
  accentColor,
  bestTimeMs = null,
  onClick,
  style,
}: DeckCardProps) {
  const hasBestTime = bestTimeMs !== null;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const classNames = [
    "deck-card",
    isDark && "deck-card--dark",
    hasBestTime && "deck-card--practiced",
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
      <span className="deck-card__subtitle">{subtitle}</span>
      {hasBestTime && (
        <div className="deck-card__time">{formatTime(bestTimeMs)}</div>
      )}
    </article>
  );
}
