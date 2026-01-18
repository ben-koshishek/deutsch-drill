import { formatTime } from '@/utils/formatTime';

interface DeckCardProps {
  title: string;
  subtitle: string;
  isComplete: boolean;
  lastRunTimeMs: number | null;
  lastRunMistakes: number | null;
  onClick?: () => void;
  isPlaceholder?: boolean;
}

export function DeckCard({
  title,
  subtitle,
  isComplete,
  lastRunTimeMs,
  lastRunMistakes,
  onClick,
  isPlaceholder,
}: DeckCardProps) {
  const hasStats = lastRunTimeMs != null;
  const showErrors = lastRunMistakes != null && lastRunMistakes > 0;

  return (
    <button
      type="button"
      className="deck-card"
      data-complete={isComplete || undefined}
      onClick={onClick}
      disabled={isPlaceholder}
    >
      <div className="deck-card-body">
        <div className="deck-card-title-row">
          <span className="deck-card-title">{title}</span>
          {isComplete && (
            <span className="deck-card-done">
              <span className="deck-card-done-dot" />
              done
            </span>
          )}
        </div>

        <div className="deck-card-meta">
          <span>{subtitle}</span>
          {hasStats && (
            <>
              <span className="deck-card-sep">&middot;</span>
              <span>{formatTime(lastRunTimeMs)}</span>
            </>
          )}
          {showErrors && (
            <>
              <span className="deck-card-sep">&middot;</span>
              <span className="deck-card-errors">{lastRunMistakes} err</span>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
