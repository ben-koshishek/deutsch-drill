import type { ReactNode } from 'react';
import './Layout.css';

interface AppHeaderProps {
  onBrandClick?: () => void;
  left?: ReactNode;
  right: ReactNode;
  progress?: number;
  progressLabel?: string;
  progressColor?: string;
}

export function AppHeader({ onBrandClick, left, right, progress, progressLabel, progressColor }: AppHeaderProps) {
  return (
    <header className="layout-header">
      <div className="header-bar">
        <div className="header-bar-left">
          <div className="header-brand-group" onClick={onBrandClick}>
            <img
              src={`${import.meta.env.BASE_URL}duck-green.png`}
              alt=""
              className="header-logo"
            />
            <span className="header-brand">DeutschDrill</span>
          </div>
          {left}
        </div>

        <div className="header-right">
          {right}
        </div>
      </div>

      {progress != null && (
        <div
          className="header-progress-track"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={progressLabel}
        >
          <div
            className="header-progress-fill"
            style={{ width: `${progress}%`, ...(progressColor ? { background: progressColor } : undefined) }}
          />
        </div>
      )}
    </header>
  );
}
