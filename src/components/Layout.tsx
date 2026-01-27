import { useTheme } from "../context/ThemeContext";
import type { ReactNode } from "react";
import "./Layout.css";

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neon-yellow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-neon-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

interface LayoutProps {
  children: ReactNode;
  // Dashboard mode
  activeTab?: "vocabulary" | "grammar";
  onTabChange?: (tab: "vocabulary" | "grammar") => void;
  showTabs?: boolean;
  stats?: { practiced: string; mastered: string; wordsLearned: string };
  // Drill mode
  headerLeft?: ReactNode;
  headerCenter?: ReactNode;
  headerRight?: ReactNode;
}

export function Layout({
  children,
  activeTab = "vocabulary",
  onTabChange,
  showTabs = false,
  stats,
  headerLeft,
  headerCenter,
  headerRight,
}: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const isDrillMode = headerLeft || headerCenter || headerRight;

  return (
    <div className="layout">
      <div className="layout__container">
        <div className="glow-card">
          {/* Header inside the card */}
          <header className="layout__header">
            <div className="layout__header-row">
              {isDrillMode ? (
                <>
                  <div className="layout__header-left">
                    {headerLeft}
                  </div>
                  <div className="layout__header-center">
                    {headerCenter}
                  </div>
                  <div className="layout__header-right">
                    {headerRight}
                  </div>
                </>
              ) : (
                <>
                  <div className="layout__header-left">
                    {stats && (
                      <div className="layout__stats">
                        <span className="layout__stat">
                          <span className="layout__stat-value layout__stat-value--cyan">{stats.practiced}</span>
                          <span className="layout__stat-label">practiced</span>
                        </span>
                        <span className="layout__stat-divider" />
                        <span className="layout__stat">
                          <span className="layout__stat-value layout__stat-value--pink">{stats.mastered}</span>
                          <span className="layout__stat-label">mastered</span>
                        </span>
                        <span className="layout__stat-divider" />
                        <span className="layout__stat">
                          <span className="layout__stat-value layout__stat-value--yellow">{stats.wordsLearned}</span>
                          <span className="layout__stat-label">words learned</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Centered tabs */}
                  {showTabs && onTabChange && (
                    <div className="layout__tabs">
                      <button
                        className={`layout__tab ${activeTab === "vocabulary" ? "layout__tab--active" : ""}`}
                        onClick={() => onTabChange("vocabulary")}
                      >
                        Vocabulary
                      </button>
                      <button
                        className={`layout__tab ${activeTab === "grammar" ? "layout__tab--active" : ""}`}
                        onClick={() => onTabChange("grammar")}
                      >
                        Grammar
                      </button>
                    </div>
                  )}

                  <button
                    className="layout__theme-toggle"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                  >
                    {isDark ? <SunIcon /> : <MoonIcon />}
                  </button>
                </>
              )}
            </div>
          </header>

          {/* Main content */}
          <main className="layout__main">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
