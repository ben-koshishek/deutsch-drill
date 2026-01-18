/** Number of correct answers in a row needed to master a word/exercise */
export const MASTERY_THRESHOLD = 3;

/** Delay in milliseconds before auto-advancing after a correct answer */
export const AUTO_ADVANCE_DELAY_MS = 400;

/** Timer update interval in milliseconds */
export const TIMER_INTERVAL_MS = 100;

/** Interval for saving run state to IndexedDB (milliseconds) */
export const RUN_STATE_SAVE_INTERVAL_MS = 5000;

/** Probability of picking from wrong queue when it has items (0-1) */
export const WRONG_QUEUE_PROBABILITY = 0.7;

/** Number of cards to wait before showing a correct answer again */
export const DEFAULT_SPACING_SIZE = 5;

/** Category display config — single source of truth for labels and colors */
export const CATEGORY_CONFIG: Record<string, { label: string; color: string }> = {
  verbs: { label: 'Verbs', color: 'var(--dd-category-verbs)' },
  articles: { label: 'Articles', color: 'var(--dd-category-articles)' },
  pronouns: { label: 'Pronouns', color: 'var(--dd-category-pronouns)' },
  prepositions: { label: 'Prepositions', color: 'var(--dd-category-prepositions)' },
  'adjective-endings': { label: 'Adjectives', color: 'var(--dd-category-adjectives)' },
  'verb-valency': { label: 'Verb Valency', color: 'var(--dd-category-verb-valency)' },
};
