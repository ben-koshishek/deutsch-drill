// Grammatical metadata for pronouns and other words
export type GrammaticalCase = 'nominative' | 'accusative' | 'dative' | 'genitive';
export type GrammaticalNumber = 'singular' | 'plural';
export type Formality = 'formal' | 'informal';

export interface WordMeta {
  case?: GrammaticalCase;
  number?: GrammaticalNumber;
  formality?: Formality;
}

export interface Word {
  id: string;
  german: string;
  english: string;
  example?: string;            // German example sentence
  exampleTranslation?: string; // English translation of the example
  meta?: WordMeta;             // Grammatical metadata for badges
}

export type DeckCategory = 'sentence-structure' | 'descriptive-words' | 'miscellaneous';

export interface Deck {
  id: string;
  name: string;
  description: string;
  category: DeckCategory;
  exerciseType: 'translation' | 'fill-blank' | 'conjugation';
  words: Word[];
}

export type DrillDirection = 'de_to_en' | 'en_to_de';

// Session state (not persisted between sessions)
export interface SessionWord {
  word: Word;
  direction: DrillDirection;
  weight: number;      // 1 = normal, 3 = hot, 5 = very hot
  errorCount: number;
  correctCount: number;
}

// Stats persisted for reference
export interface SessionStats {
  id?: number;
  deckId: string;
  timestamp: number;
  totalAnswers: number;
  correctAnswers: number;
  problemWords: string[];  // word IDs with most errors
}

// Grammar fill-in-the-blank exercises
export interface GrammarExercise {
  id: string;
  sentence: string;       // "Ich ___ nach Hause." (blank marked with ___)
  answer: string;         // "gehe"
  hint?: string;          // "gehen" (infinitive or base form)
}

export interface GrammarLesson {
  id: string;
  name: string;
  description: string;
  exercises: GrammarExercise[];
}
