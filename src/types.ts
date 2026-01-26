// ============ Part of Speech ============
export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'pronoun'
  | 'article'
  | 'numeral'
  | 'interjection'
  | 'particle';

// ============ Grammar Types ============
export type Gender = 'masculine' | 'feminine' | 'neuter';
export type GrammaticalCase = 'nominative' | 'accusative' | 'dative' | 'genitive';
export type GrammaticalNumber = 'singular' | 'plural';
export type Formality = 'formal' | 'informal';
export type VerbAuxiliary = 'haben' | 'sein';

// ============ Noun-specific ============
export interface NounInfo {
  gender: Gender;                    // der/die/das
  plural?: string;                   // die Bücher
  genitiveSingular?: string;         // des Buches
}

// ============ Verb-specific ============
export interface VerbInfo {
  auxiliary: VerbAuxiliary;          // haben or sein for Perfekt
  pastParticiple?: string;           // gemacht, gegangen
  preterite?: string;                // machte, ging (3rd person singular)
  presentThirdPerson?: string;       // macht, geht
  separablePrefix?: string;          // "an" for "ankommen"
  isReflexive?: boolean;             // sich freuen
  conjugationPattern?: 'regular' | 'irregular' | 'mixed';
}

// ============ Adjective-specific ============
export interface AdjectiveInfo {
  comparative?: string;              // größer
  superlative?: string;              // am größten
  predicativeOnly?: boolean;         // can only be used predicatively
}

// ============ Preposition-specific ============
export interface PrepositionInfo {
  case: GrammaticalCase | GrammaticalCase[];  // accusative, dative, or Wechselpräposition
}

// ============ Pronoun-specific ============
export interface PronounInfo {
  case?: GrammaticalCase;
  number?: GrammaticalNumber;
  formality?: Formality;
  person?: 1 | 2 | 3;
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

// ============ Main Word Type ============
export interface Word {
  id: string;
  german: string;
  english: string;                   // can include alternatives: "big / large"

  // Part of speech
  partOfSpeech: PartOfSpeech;

  // Type-specific grammar info (use the one matching partOfSpeech)
  noun?: NounInfo;
  verb?: VerbInfo;
  adjective?: AdjectiveInfo;
  preposition?: PrepositionInfo;
  pronoun?: PronounInfo;

  // Examples (at least one recommended)
  examples: Example[];

  // Additional info
  synonyms?: string[];               // German synonyms
  antonyms?: string[];               // German antonyms
  notes?: string;                    // Usage notes, register, etc.
  frequency?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';  // CEFR level
  tags?: string[];                   // Custom tags for filtering

  // Multi-meaning support (for words with context-dependent meanings)
  meanings?: WordMeaning[];
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
