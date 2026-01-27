import { formatTime } from '@/utils/formatTime';
import { MAX_LIVES } from '@/constants';
import './RunStats.css';

interface RunStatsProps {
  elapsedMs: number;
  mistakes: number;
}

export function RunStats({ elapsedMs, mistakes }: RunStatsProps) {
  const livesRemaining = Math.max(0, MAX_LIVES - mistakes);

  return (
    <div className="run-stats">
      <div className="run-stats__time">
        <span className="run-stats__time-value">{formatTime(elapsedMs)}</span>
      </div>
      <div className="run-stats__divider" />
      <div className="run-stats__lives">
        {[...Array(MAX_LIVES)].map((_, i) => (
          <span
            key={i}
            className={`run-stats__heart ${i < livesRemaining ? 'run-stats__heart--alive' : 'run-stats__heart--dead'}`}
          >
            ♥
          </span>
        ))}
      </div>
    </div>
  );
}
