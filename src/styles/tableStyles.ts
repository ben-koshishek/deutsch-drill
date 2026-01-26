import type { CSSProperties } from "react";

// Shared table cell styles for grammar reference tables
export const tableStyles = {
  // Header cells
  thMuted: {
    color: "var(--color-text-muted)",
    padding: "var(--space-2)",
    fontSize: "var(--text-lg)",
  } as CSSProperties,

  thCyan: {
    color: "var(--color-neon-cyan)",
    fontWeight: 600,
    textAlign: "center" as const,
    padding: "var(--space-2)",
    fontSize: "var(--text-lg)",
  } as CSSProperties,

  thYellow: {
    color: "var(--color-neon-yellow)",
    fontWeight: 600,
    textAlign: "center" as const,
    padding: "var(--space-2)",
    fontSize: "var(--text-lg)",
  } as CSSProperties,

  // Data cells
  tdPronoun: {
    color: "var(--color-primary)",
    fontWeight: 600,
    padding: "var(--space-2)",
    fontSize: "var(--text-lg)",
  } as CSSProperties,

  tdPronounNoWrap: {
    color: "var(--color-primary)",
    fontWeight: 600,
    padding: "var(--space-2)",
    fontSize: "var(--text-lg)",
    whiteSpace: "nowrap" as const,
  } as CSSProperties,

  tdCenter: {
    textAlign: "center" as const,
    padding: "var(--space-2)",
  } as CSSProperties,

  tdCenterNoWrap: {
    textAlign: "center" as const,
    padding: "var(--space-2)",
    whiteSpace: "nowrap" as const,
  } as CSSProperties,

  // Value badges
  badgeCyan: {
    color: "var(--color-neon-cyan)",
    fontWeight: 700,
    background: "rgba(45, 226, 230, 0.15)",
    padding: "4px 12px",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--text-lg)",
  } as CSSProperties,

  badgeYellow: {
    color: "var(--color-neon-yellow)",
    fontWeight: 700,
    background: "rgba(249, 197, 78, 0.15)",
    padding: "4px 12px",
    borderRadius: "var(--radius-sm)",
    fontSize: "var(--text-lg)",
  } as CSSProperties,

  // Container
  tableContainer: {
    display: "inline-flex",
    gap: "var(--space-6)",
    marginBottom: "var(--space-4)",
  } as CSSProperties,
};
