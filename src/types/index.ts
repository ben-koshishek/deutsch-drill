export interface TranslationCard {
  id: string
  german: string
  english: string
  grammar?: {
    case?: 'nominative' | 'accusative' | 'dative' | 'genitive'
    person?: '1st' | '2nd' | '3rd'
    number?: 'singular' | 'plural'
    formality?: 'informal' | 'formal'
  }
}

export type DrillDirection = 'de-en' | 'en-de'

export interface CardProgress {
  cardId: string
  direction: DrillDirection
  correctStreak: number
  mastered: boolean
}

export interface DrillCard {
  card: TranslationCard
  direction: DrillDirection
}

export type DrillStatus = 'active' | 'feedback' | 'complete' | 'game-over'

export interface DrillState {
  cards: TranslationCard[]
  progress: Map<string, CardProgress>
  currentCard: DrillCard | null
  remainingCards: DrillCard[]
  lives: number
  mistakeCount: number
  status: DrillStatus
  lastAnswer: {
    correct: boolean
    userAnswer: string
    correctAnswer: string
  } | null
}

export interface SessionResult {
  id?: number
  deckId: string
  completedAt: Date
  durationMs: number
  mistakeCount: number
  cardsCompleted: number
  won: boolean
}

export interface DeckStats {
  id?: number
  deckId: string
  bestTimeMs: number | null
  bestMistakes: number | null
  totalAttempts: number
  totalWins: number
}

export interface CheatsheetRow {
  label: string
  hint?: string
  cells: string[]
}

export interface CheatsheetTable {
  caption?: string
  columns: string[]
  rows: CheatsheetRow[]
}

export interface Cheatsheet {
  title: string
  tables: CheatsheetTable[]
  notes?: string[]
}

export interface Deck {
  id: string
  name: string
  cards: TranslationCard[]
  cheatsheet?: Cheatsheet
}
