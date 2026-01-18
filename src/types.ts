// ============ Part of Speech ============
export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'preposition' | 'pronoun';

// ============ Grammar Types ============
export type Gender = 'masculine' | 'feminine' | 'neuter';
export type GrammaticalCase = 'nominative' | 'accusative' | 'dative' | 'genitive';

// ============ Noun-specific ============
export interface NounInfo {
  gender: Gender;                    // der/die/das
  plural?: string;                   // die Bücher
  genitiveSingular?: string;         // des Buches
}

// ============ Example Sentence ============
export interface Example {
  german: string;
  english: string;
}

// ============ Multi-meaning support ============
export interface WordMeaning {
  english: string;                           // "in front of"
  context: string;                           // "Spatial position or movement"
  case?: GrammaticalCase | GrammaticalCase[];
  caseRule?: string;                         // "Dative for location, Accusative for movement"
  examples: Example[];
}

// ============ Translation Word (vocabulary drills) ============
export interface TranslationWord {
  id: string;
  german: string;
  english: string;                   // can include alternatives: "big / large"

  partOfSpeech: PartOfSpeech;

  // Only noun info is accessed (for gender display in FlowPrompt)
  noun?: NounInfo;

  // Examples (at least one recommended)
  examples: Example[];

  // Multi-meaning support (for words with context-dependent meanings)
  meanings?: WordMeaning[];
}

// ============ Label-to-form types ============
export type LabelBadgeType = 'gender' | 'case' | 'number' | 'person' | 'articleType' | 'formality' | 'tense';

export interface LabelBadge {
  label: string;
  type: LabelBadgeType;
  gender?: Gender; // for gender-colored badges
}

export interface LabelFormCard {
  id: string;
  answer: string;        // German form to type
  context?: string;      // base word being practiced: "machen", "groß" (not for articles)
  labels: LabelBadge[];  // ALL constraints as badges (gender, case, number, person, tense, articleType)
  examples?: Example[];
}

export type DeckCategory = 'articles' | 'pronouns' | 'verbs' | 'adjective-endings' | 'prepositions' | 'verb-valency';

// ============ Discriminated Deck Union ============
export interface TranslationDeck {
  type: 'translation';
  id: string;
  name: string;
  category: DeckCategory;
  words: TranslationWord[];
  cheatsheet?: DeckCheatsheet;
  placeholder?: boolean;
}

export interface LabelFormDeck {
  type: 'label-to-form';
  id: string;
  name: string;
  category: DeckCategory;
  cards: LabelFormCard[];
  cheatsheet?: DeckCheatsheet;
  placeholder?: boolean;
}

export type Deck = TranslationDeck | LabelFormDeck;

// ============ Helpers ============
/** Get the items array from any deck */
export function deckItems(deck: Deck): Array<TranslationWord | LabelFormCard> {
  return deck.type === 'translation' ? deck.words : deck.cards;
}

/** Get item count for a deck */
export function deckItemCount(deck: Deck): number {
  return deck.type === 'translation' ? deck.words.length : deck.cards.length;
}

/** Number of drill tasks for a deck (translation = words*2, label-to-form = cards) */
export function deckTaskCount(deck: Deck): number {
  return deck.type === 'translation' ? deck.words.length * 2 : deck.cards.length;
}

export type DrillDirection = 'de_to_en' | 'en_to_de';

// Grammar fill-in-the-blank exercises
export interface GrammarExercise {
  id: string;
  sentence: string;       // "Ich ___ nach Hause." (blank marked with ___)
  answer: string;         // "gehe"
  hint?: string;          // "gehen" (infinitive or base form)
}

export interface GrammarLesson {
  type: 'grammar';
  id: string;
  name: string;
  description: string;
  category: DeckCategory;
  exercises: GrammarExercise[];
  cheatsheet?: DeckCheatsheet;
}

// ============ Flow Mode ============
export type FlowCard =
  | { source: 'translation'; deckId: string; item: TranslationWord; direction: DrillDirection }
  | { source: 'label-to-form'; deckId: string; item: LabelFormCard }
  | { source: 'grammar'; lessonId: string; exercise: GrammarExercise };

/** Unique key for a FlowCard matching progress DB key format */
export function flowCardKey(card: FlowCard): string {
  switch (card.source) {
    case 'translation':
      return `${card.item.id}_${card.direction}`;
    case 'label-to-form':
      return `${card.item.id}_en_to_de`;
    case 'grammar':
      return `${card.exercise.id}_de_to_en`;
  }
}

/** Get the deck/lesson ID that owns this card (for DB lookups) */
export function flowCardDeckId(card: FlowCard): string {
  return card.source === 'grammar' ? card.lessonId : card.deckId;
}

// ============ Cheatsheet for Vocabulary Decks ============
export interface CheatsheetTable {
  title?: string;
  rows: string[][];  // First row = headers, rest = data
  // Use | in cell strings to mark stem/ending split: "mach|e" → dim stem + bright ending
}

export interface DeckCheatsheet {
  title: string;
  tables: CheatsheetTable[];
  notes?: string[];
}
