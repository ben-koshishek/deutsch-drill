// ===== CONCEPT COLOR MAP =====
// Maps grammatical term strings (as they appear in cheatsheet tables) to
// their concept CSS variable. Used by CheatsheetPanel to color-code headers,
// row labels, and table titles consistently with drill badges.
//
// To add a new term: add it here (uppercase key).
// To change a concept's color: update the --dd-* variable in theme.css —
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
