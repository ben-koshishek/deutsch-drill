import type { CSSProperties } from "react";

// Shared table cell styles for grammar reference tables
export const tableStyles = {
  // Header cells
  thMuted: {
    color: "var(--dd-text-muted)",
    padding: "0.5rem",
    fontSize: "1rem",
    fontFamily: "var(--dd-font-mono)",
  } as CSSProperties,

  thCyan: {
    color: "var(--dd-primary)",
    fontWeight: 600,
    textAlign: "center" as const,
    padding: "0.5rem",
    fontSize: "1rem",
    fontFamily: "var(--dd-font-mono)",
  } as CSSProperties,

  thYellow: {
    color: "var(--dd-warning)",
    fontWeight: 600,
    textAlign: "center" as const,
    padding: "0.5rem",
    fontSize: "1rem",
    fontFamily: "var(--dd-font-mono)",
  } as CSSProperties,

  // Data cells
  tdPronoun: {
    color: "var(--dd-primary)",
    fontWeight: 600,
    padding: "0.5rem",
    fontSize: "1rem",
    fontFamily: "var(--dd-font-mono)",
  } as CSSProperties,

  tdPronounNoWrap: {
    color: "var(--dd-primary)",
    fontWeight: 600,
    padding: "0.5rem",
    fontSize: "1rem",
    fontFamily: "var(--dd-font-mono)",
    whiteSpace: "nowrap" as const,
  } as CSSProperties,

  tdCenter: {
    textAlign: "center" as const,
    padding: "0.5rem",
  } as CSSProperties,

  tdCenterNoWrap: {
    textAlign: "center" as const,
    padding: "0.5rem",
    whiteSpace: "nowrap" as const,
  } as CSSProperties,

  // Value badges
  badgeCyan: {
    color: "var(--dd-primary)",
    fontWeight: 600,
    background: "var(--dd-primary-dim)",
    padding: "0.25rem 0.75rem",
    borderRadius: "var(--dd-radius-sm)",
    fontSize: "1rem",
    fontFamily: "var(--dd-font-mono)",
  } as CSSProperties,

  badgeYellow: {
    color: "var(--dd-warning)",
    fontWeight: 600,
    background: "var(--dd-warning-light)",

    padding: "0.25rem 0.75rem",
    borderRadius: "var(--dd-radius-sm)",
    fontSize: "1rem",
    fontFamily: "var(--dd-font-mono)",
  } as CSSProperties,

  // Container
  tableContainer: {
    display: "inline-flex",
    gap: "1.5rem",
    marginBottom: "1rem",
  } as CSSProperties,
};
