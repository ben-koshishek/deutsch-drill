import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  onHome: () => void;
}

export function Header({ onHome }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      style={{
        width: "100%",
        padding: "var(--space-5) var(--space-6)",
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <button
        onClick={onHome}
        style={{
          display: 'flex',
          alignItems: "center",
          gap: "var(--space-3)",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: "var(--space-10)",
            height: "var(--space-10)",
            background: "var(--color-neon-pink)",
            borderRadius: "var(--radius-md)",
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontWeight: 700,
              fontSize: "var(--text-md)",
              fontFamily: "var(--font-body)",
            }}
          >
            D
          </span>
        </div>

        {/* Wordmark */}
        <span
          style={{
            fontSize: "var(--text-xl)",
            fontWeight: 700,
            fontFamily: "var(--font-body)",
            color: "var(--color-text)",
            whiteSpace: "nowrap",
          }}
        >
          Deutsch<span style={{ color: "var(--color-neon-pink)" }}>Drill</span>
        </span>
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        style={{
          width: "var(--space-10)",
          height: "var(--space-10)",
          display: 'flex',
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          background: "var(--color-bg-secondary)",
          cursor: "pointer",
          transition: "all var(--transition-base)",
        }}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-neon-yellow)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "20px", height: "20px" }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-neon-purple)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "20px", height: "20px" }}
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          </svg>
        )}
      </button>
    </header>
  );
}
