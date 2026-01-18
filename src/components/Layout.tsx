import type { ReactNode } from 'react';
import { AppHeader } from './AppHeader';
import { KofiButton } from './ui/KofiButton';
import { ThemeToggle } from './ui/ThemeToggle';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  stats?: { mastered: string };
  onHome?: () => void;
}

export function Layout({ children, stats, onHome }: LayoutProps) {
  return (
    <div className="layout">
      <AppHeader
        onBrandClick={onHome}
        right={
          <>
            {stats && (
              <span className="header-stat">
                <span className="header-stat-label">mastered</span>
                {stats.mastered}
              </span>
            )}

            <span className="header-separator" />
            <div className="header-icon-group">
              <KofiButton />
              <ThemeToggle />
              <a className="header-info-link" href="#/how-german-works" aria-label="How German Works">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </a>
            </div>
          </>
        }
      />

      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}
