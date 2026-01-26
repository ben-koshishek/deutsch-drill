import type { CSSProperties } from "react";

// Ghost button base styles
export const ghostButtonBase: CSSProperties = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontFamily: "inherit",
  borderRadius: "var(--radius-md)",
  transition: "all var(--transition-base)",
};

// Back/navigation button
export const backButton: CSSProperties = {
  ...ghostButtonBase,
  color: "var(--color-text-muted)",
  fontSize: "var(--text-md)",
  padding: "var(--space-2) var(--space-3)",
};

export const backButtonHover: CSSProperties = {
  background: "var(--color-bg-secondary)",
  color: "var(--color-text)",
};

// Icon button (reset, etc.)
export const iconButton: CSSProperties = {
  ...ghostButtonBase,
  color: "var(--color-text-subtle)",
  fontSize: "var(--text-sm)",
  border: "1px solid transparent",
  padding: "var(--space-2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const iconButtonDangerHover: CSSProperties = {
  background: "rgba(255, 77, 109, 0.1)",
  borderColor: "rgba(255, 77, 109, 0.3)",
  color: "var(--color-error)",
};

// Helper to apply hover styles
export function applyHoverStyles(
  element: HTMLElement,
  hoverStyles: CSSProperties
): void {
  Object.assign(element.style, hoverStyles);
}

// Helper to reset to base styles
export function resetStyles(
  element: HTMLElement,
  baseStyles: CSSProperties
): void {
  Object.assign(element.style, baseStyles);
}
