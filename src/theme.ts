import { createTheme } from "@mantine/core";
import type { MantineColorsTuple, CSSVariablesResolver } from "@mantine/core";

// Terminal green scale for Mantine's 10-shade requirement
const brand: MantineColorsTuple = [
  "#f0fdf4",
  "#dcfce7",
  "#bbf7d0",
  "#86efac",
  "#4ade80",
  "#22c55e", // 5 — primary
  "#16a34a", // 6 — hover / light mode primary
  "#15803d",
  "#166534",
  "#14532d",
];

// Zinc neutrals for dark backgrounds
const dark: MantineColorsTuple = [
  "#fafafa",
  "#f5f5f5",
  "#e0e0e0",
  "#cccccc",
  "#999999",
  "#666666",
  "#3a3a3a",
  "#1a1a1a", // 7 — Mantine dark bg
  "#111111",
  "#0a0a0a",
];

const MONO_FONT = "'JetBrains Mono Variable', 'JetBrains Mono', monospace";

export const theme = createTheme({
  primaryColor: "brand",
  colors: { brand, dark },

  // Monospace everywhere
  fontFamily: MONO_FONT,
  fontFamilyMonospace: MONO_FONT,
  headings: {
    fontFamily: MONO_FONT,
    fontWeight: "700",
  },

  // GitHub-style rounded corners
  defaultRadius: "md",
  radius: {
    xs: "0.125rem",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },

  // Subtle shadows
  shadows: {
    xs: "0 1px 2px rgba(0,0,0,0.06)",
    sm: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
    md: "0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
    lg: "0 8px 16px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
    xl: "0 16px 24px rgba(0,0,0,0.1), 0 8px 12px rgba(0,0,0,0.05)",
  },

  components: {
    Button: {
      styles: {
        root: {
          fontWeight: 600,
          textTransform: "uppercase" as const,
          letterSpacing: "0.05em",
          fontSize: "0.875rem",
        },
      },
    },
    Paper: {
      styles: { root: {} },
    },
    TextInput: {},
    Badge: {
      styles: {
        root: {
          fontWeight: 600,
          letterSpacing: "0.04em",
          textTransform: "uppercase" as const,
        },
      },
    },
    SegmentedControl: {},
    ActionIcon: {},
  },
});

// ===== CSS VARIABLES RESOLVER =====
export const resolver: CSSVariablesResolver = () => ({
  variables: {
    "--dd-font-mono": MONO_FONT,
    "--dd-radius": "0.375rem",
    "--dd-radius-sm": "0.25rem",
  },

  dark: {
    // Surfaces — GitHub dark-inspired, more contrast between layers
    "--dd-surface-page": "#010409",
    "--dd-surface-section": "#0d1117",
    "--dd-surface-card": "#161b22",
    "--dd-surface-elevated": "#1c2128",

    // Text
    "--dd-text": "#e6edf3",
    "--dd-text-muted": "#8b949e",
    "--dd-text-subtle": "#484f58",

    // Selection
    "--dd-selection-text": "#000000",

    // Overlay
    "--dd-overlay": "rgba(0, 0, 0, 0.5)",

    // Primary — green
    "--dd-primary": "#3fb950",
    "--dd-primary-dim": "#3fb95040",
    "--dd-primary-glow": "rgba(63, 185, 80, 0.25)",

    // Status
    "--dd-success": "#3fb950",
    "--dd-success-light": "#3fb95015",
    "--dd-error": "#f85149",
    "--dd-error-light": "#f8514915",
    "--dd-warning": "#d29922",
    "--dd-warning-light": "#d2992215",

    // Borders
    "--dd-border": "#30363d",
    "--dd-border-strong": "#484f58",

    // Gender
    "--dd-masculine": "#58a6ff",
    "--dd-masculine-bg": "rgba(88, 166, 255, 0.15)",
    "--dd-masculine-border": "rgba(88, 166, 255, 0.35)",
    "--dd-feminine": "#f778ba",
    "--dd-feminine-bg": "rgba(247, 120, 186, 0.15)",
    "--dd-feminine-border": "rgba(247, 120, 186, 0.35)",
    "--dd-neuter": "#d29922",
    "--dd-neuter-bg": "rgba(210, 153, 34, 0.15)",
    "--dd-neuter-border": "rgba(210, 153, 34, 0.35)",

    // Badge types
    "--dd-case": "#3fb4a5",
    "--dd-case-bg": "rgba(63, 180, 165, 0.15)",
    "--dd-case-border": "rgba(63, 180, 165, 0.35)",
    "--dd-number": "#db6d28",
    "--dd-number-bg": "rgba(219, 109, 40, 0.15)",
    "--dd-number-border": "rgba(219, 109, 40, 0.35)",
    "--dd-person": "#3fb950",
    "--dd-person-bg": "rgba(63, 185, 80, 0.15)",
    "--dd-person-border": "rgba(63, 185, 80, 0.35)",
    "--dd-article-type": "#bc8cff",
    "--dd-article-type-bg": "rgba(188, 140, 255, 0.15)",
    "--dd-article-type-border": "rgba(188, 140, 255, 0.35)",
    "--dd-tense": "#79c0ff",
    "--dd-tense-bg": "rgba(121, 192, 255, 0.15)",
    "--dd-tense-border": "rgba(121, 192, 255, 0.35)",

    // Category accents
    "--dd-category-verbs": "#4ade80",
    "--dd-category-articles": "#60a5fa",
    "--dd-category-pronouns": "#c084fc",
    "--dd-category-prepositions": "#fb923c",
    "--dd-category-adjectives": "#fbbf24",
    "--dd-category-verb-valency": "#f472b6",
  },

  light: {
    // Surfaces — GitHub light
    "--dd-surface-page": "#f6f8fa",
    "--dd-surface-section": "#ffffff",
    "--dd-surface-card": "#ffffff",
    "--dd-surface-elevated": "#f6f8fa",

    // Text
    "--dd-text": "#1f2328",
    "--dd-text-muted": "#656d76",
    "--dd-text-subtle": "#8b949e",

    // Selection
    "--dd-selection-text": "#ffffff",

    // Overlay
    "--dd-overlay": "rgba(0, 0, 0, 0.5)",

    // Primary — darker green for readability
    "--dd-primary": "#1a7f37",
    "--dd-primary-dim": "#1a7f3740",
    "--dd-primary-glow": "rgba(26, 127, 55, 0.2)",

    // Status
    "--dd-success": "#1a7f37",
    "--dd-success-light": "#1a7f3715",
    "--dd-error": "#cf222e",
    "--dd-error-light": "#cf222e15",
    "--dd-warning": "#9a6700",
    "--dd-warning-light": "#9a670015",

    // Borders
    "--dd-border": "#d0d7de",
    "--dd-border-strong": "#afb8c1",

    // Gender
    "--dd-masculine": "#0969da",
    "--dd-masculine-bg": "rgba(9, 105, 218, 0.1)",
    "--dd-masculine-border": "rgba(9, 105, 218, 0.25)",
    "--dd-feminine": "#bf3989",
    "--dd-feminine-bg": "rgba(191, 57, 137, 0.1)",
    "--dd-feminine-border": "rgba(191, 57, 137, 0.25)",
    "--dd-neuter": "#9a6700",
    "--dd-neuter-bg": "rgba(154, 103, 0, 0.1)",
    "--dd-neuter-border": "rgba(154, 103, 0, 0.25)",

    // Badge types
    "--dd-case": "#0d9488",
    "--dd-case-bg": "rgba(13, 148, 136, 0.1)",
    "--dd-case-border": "rgba(13, 148, 136, 0.25)",
    "--dd-number": "#bc4c00",
    "--dd-number-bg": "rgba(188, 76, 0, 0.1)",
    "--dd-number-border": "rgba(188, 76, 0, 0.25)",
    "--dd-person": "#1a7f37",
    "--dd-person-bg": "rgba(26, 127, 55, 0.1)",
    "--dd-person-border": "rgba(26, 127, 55, 0.25)",
    "--dd-article-type": "#8250df",
    "--dd-article-type-bg": "rgba(130, 80, 223, 0.1)",
    "--dd-article-type-border": "rgba(130, 80, 223, 0.25)",
    "--dd-tense": "#0550ae",
    "--dd-tense-bg": "rgba(5, 80, 174, 0.1)",
    "--dd-tense-border": "rgba(5, 80, 174, 0.25)",

    // Category accents
    "--dd-category-verbs": "#16a34a",
    "--dd-category-articles": "#2563eb",
    "--dd-category-pronouns": "#9333ea",
    "--dd-category-prepositions": "#ea580c",
    "--dd-category-adjectives": "#ca8a04",
    "--dd-category-verb-valency": "#db2777",
  },
});

// ===== CONCEPT COLOR MAP =====
// Maps grammatical term strings (as they appear in cheatsheet tables) to
// their concept CSS variable. Used by CheatsheetPanel to color-code headers,
// row labels, and table titles consistently with drill badges.
//
// To add a new term: add it here (uppercase key).
// To change a concept's color: update the --dd-* variable above —
// both badges and cheatsheets update automatically.

const CONCEPT_COLORS: Record<string, string> = {
  // Tense
  'PRÄSENS': 'var(--dd-tense)',
  'PRÄTERITUM': 'var(--dd-tense)',
  'KONJUNKTIV II': 'var(--dd-tense)',
  'Konj. II': 'var(--dd-tense)',
  // Case
  'NOM': 'var(--dd-case)',
  'ACC': 'var(--dd-case)',
  'DAT': 'var(--dd-case)',
  'GEN': 'var(--dd-case)',
  'NOMINATIVE': 'var(--dd-case)',
  'ACCUSATIVE': 'var(--dd-case)',
  'DATIVE': 'var(--dd-case)',
  'GENITIVE': 'var(--dd-case)',
  // Gender
  'MASC.': 'var(--dd-masculine)',
  'FEM.': 'var(--dd-feminine)',
  'NEUT.': 'var(--dd-neuter)',
  // Number
  'PLURAL': 'var(--dd-number)',
  'SINGULAR': 'var(--dd-number)',
  // Person
  'ICH': 'var(--dd-person)',
  'DU': 'var(--dd-person)',
  'ER/SIE/ES': 'var(--dd-person)',
  'WIR': 'var(--dd-person)',
  'IHR': 'var(--dd-person)',
  'SIE/SIE': 'var(--dd-person)',
};

/** Resolve concept color for a cheatsheet cell (header, label, or title).
 *  Returns a CSS `var(--dd-*)` value or null if no concept color applies. */
export function getConceptColor(text: string): string | null {
  const upper = text.trim().toUpperCase();

  // Exact match
  const exact = CONCEPT_COLORS[upper];
  if (exact) return exact;

  // Table title prefix matches (gender rules cheatsheet)
  if (upper.startsWith('DER (')) return 'var(--dd-masculine)';
  if (upper.startsWith('DIE (')) return 'var(--dd-feminine)';
  if (upper.startsWith('DAS (')) return 'var(--dd-neuter)';

  // Adjective table titles
  if (upper.startsWith('WEAK')) return 'var(--dd-article-type)';
  if (upper.startsWith('MIXED')) return 'var(--dd-article-type)';
  if (upper.startsWith('STRONG')) return 'var(--dd-article-type)';

  // Preposition section: two-way
  if (upper.includes('WECHSEL')) return 'var(--dd-case)';

  return null;
}
