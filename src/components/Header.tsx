import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onHome: () => void;
}

export function Header({ onHome }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full px-6 py-5 flex justify-between items-center sticky top-0 z-50 bg-[var(--color-bg)]/95 backdrop-blur-sm transition-colors">
      <button
        onClick={onHome}
        className="flex items-center gap-3 group transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {/* Geometric logo mark */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 bg-[var(--color-text)] rounded-[var(--radius-sm)] rotate-0 transition-transform group-hover:rotate-3" />
          <span
            className="absolute inset-0 flex items-center justify-center text-[var(--color-accent)] font-extrabold text-xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            D
          </span>
        </div>

        {/* Wordmark */}
        <div className="flex items-baseline gap-0.5">
          <span
            className="text-xl font-extrabold tracking-tight text-[var(--color-text)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Deutsch
          </span>
          <span
            className="text-xl font-extrabold tracking-tight text-[var(--color-accent)]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Drill
          </span>
        </div>
      </button>

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="w-10 h-10 flex items-center justify-center rounded-[var(--radius-sm)] border-2 border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-200 group"
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          // Sun icon for dark mode (click to go light)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-[var(--color-neon-yellow)] group-hover:text-[var(--color-bg)]"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          // Moon icon for light mode (click to go dark)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-[var(--color-neon-purple)] group-hover:text-[var(--color-bg)]"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>
    </header>
  );
}
