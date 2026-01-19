# DeutschDrill - Technical Architecture

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | React 19 | UI components |
| Language | TypeScript | Type safety |
| Build | Vite | Fast dev server & bundling |
| Styling | Tailwind CSS v4 + Mantine | Utility-first CSS + UI components |
| Database | Dexie (IndexedDB) | Client-side persistence |
| State | React hooks | Local component state |

## Project Structure

```
src/
├── components/
│   ├── Header.tsx                # App header with logo + theme toggle
│   ├── Dashboard.tsx             # Deck/lesson selection with tabs (persisted)
│   ├── DrillScreen.tsx           # Vocabulary drilling UI + circle tracking
│   ├── FillBlankScreen.tsx       # Grammar UI (conjugation + case exercises)
│   ├── CircleCompletionScreen.tsx # Celebration screen after completing a circle
│   └── ui/
│       ├── GrammarBadges.tsx     # Case/number/formality badges
│       ├── StreakDots.tsx        # Per-word streak indicator (0-3)
│       ├── CircleBadge.tsx       # Circle counter badge
│       ├── ResetConfirmModal.tsx # Reset confirmation dialog
│       ├── DeckCard.tsx          # Dashboard deck card
│       ├── DrillInput.tsx        # Styled input for drills
│       ├── ExampleBox.tsx        # Example sentence display
│       └── ProgressBar.tsx       # Progress bar component
├── hooks/
│   ├── useDrill.ts               # Vocabulary drill state + spacing algorithm
│   └── useFillBlank.ts           # Grammar drill state
├── context/
│   └── ThemeContext.tsx          # Light/dark theme state
├── data/
│   ├── decks.ts                  # Vocabulary decks (static data)
│   └── grammar.ts                # Conjugation exercises (static data)
├── db.ts                         # IndexedDB persistence layer
├── types.ts                      # TypeScript interfaces
├── index.css                     # Global styles + theme variables
├── main.tsx                      # App entry point
└── App.tsx                       # View router
```

---

## Core Data Types

```typescript
// Grammatical metadata for pronouns/words
type GrammaticalCase = 'nominative' | 'accusative' | 'dative' | 'genitive';
type GrammaticalNumber = 'singular' | 'plural';
type Formality = 'formal' | 'informal';

interface WordMeta {
  case?: GrammaticalCase;
  number?: GrammaticalNumber;
  formality?: Formality;
}

// Vocabulary
interface Word {
  id: string;
  german: string;              // e.g., "der Tisch" (with article for nouns)
  english: string;
  example?: string;            // German example sentence
  exampleTranslation?: string; // English translation of example
  meta?: WordMeta;             // Grammatical metadata (for badges)
}

interface Deck {
  id: string;
  name: string;
  description: string;
  category: 'sentence-structure' | 'descriptive-words' | 'miscellaneous';
  exerciseType: 'translation' | 'fill-blank' | 'conjugation';
  words: Word[];
}

type DrillDirection = 'de_to_en' | 'en_to_de';

// Grammar
interface GrammarExercise {
  id: string;
  sentence: string;  // Two formats supported:
                     // Conjugation: "ich ___ [sein|to be]"
                     // Case: "Ich sehe ___ [der Mann|the man]"
  answer: string;    // "bin" or "den"
  hint?: string;     // Optional hint
}

interface GrammarLesson {
  id: string;
  name: string;
  description: string;
  exercises: GrammarExercise[];
}
```

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    View Router                           │    │
│  │  - dashboard → Dashboard                                 │    │
│  │  - drill → DrillScreen                                   │    │
│  │  - grammar → FillBlankScreen                             │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DrillScreen / FillBlankScreen                 │
│  ┌────────────────┐    ┌────────────────┐                       │
│  │   useDrill()   │    │ useFillBlank() │                       │
│  │   - picks task │    │   - picks task │                       │
│  │   - submits    │    │   - submits    │                       │
│  │   - tracks     │    │   - tracks     │                       │
│  └───────┬────────┘    └───────┬────────┘                       │
│          │                     │                                 │
│          └──────────┬──────────┘                                 │
│                     ▼                                            │
│          ┌─────────────────────┐                                 │
│          │       db.ts         │                                 │
│          │  - getProgress()    │                                 │
│          │  - setProgress()    │                                 │
│          │  - getDeckProgress()│                                 │
│          └──────────┬──────────┘                                 │
│                     ▼                                            │
│          ┌─────────────────────┐                                 │
│          │      IndexedDB      │                                 │
│          │   (via Dexie.js)    │                                 │
│          └─────────────────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flow Steps

1. **User selects deck/lesson** from Dashboard
2. **Hook initializes**: Loads progress from IndexedDB
3. **Hook picks first task**: Random selection from incomplete items
4. **User types answer** → Presses Enter
5. **Answer validation**: Compare normalized strings
6. **Hook updates state**:
   - Correct: `streak++` (max 3)
   - Wrong: `streak = 0`, add to wrong queue
7. **Persist to IndexedDB**: `setProgress()`
8. **Pick next task**: Using spacing algorithm
9. **Repeat** until all items mastered

---

## Spacing Algorithm

The `useDrill` hook implements a simple spaced repetition algorithm:

```typescript
// Constants
const MASTERY_THRESHOLD = 3;  // 3 correct → mastered
const SPACING_SIZE = min(5, incompleteTasks.length / 2);

// State
wrongQueue: string[]      // Keys of recently wrong tasks
recentlyCorrect: string[] // Keys to avoid (spacing buffer)

// Algorithm
function pickNextTask() {
  // 1. Never show same task twice in a row
  keysToAvoid.add(currentTaskKey);

  // 2. Avoid recently correct (spacing)
  keysToAvoid.addAll(recentlyCorrect);

  // 3. 70% chance to pick from wrong queue
  if (wrongQueue.length > 0 && Math.random() < 0.7) {
    return randomFrom(wrongQueue.filter(k => !keysToAvoid.has(k)));
  }

  // 4. Otherwise, random incomplete task
  return randomFrom(incompleteTasks.filter(k => !keysToAvoid.has(k)));
}
```

### Behavior

| Event | Effect |
|-------|--------|
| Wrong answer | Added to `wrongQueue`, `streak = 0` |
| Correct answer | Removed from `wrongQueue`, added to `recentlyCorrect` |
| 3 correct in row | Removed from drill pool entirely |

---

## Database Schema

Using Dexie.js wrapper for IndexedDB:

```typescript
// Database: "deutschdrill"

// Table: "progress" - tracks streak per word/direction
interface Progress {
  id?: number;                    // Auto-increment primary key
  deckId: string;                 // Deck or lesson ID
  wordId: string;                 // Word or exercise ID
  direction: 'de_to_en' | 'en_to_de';  // Direction (vocab only)
  streak: number;                 // 0-3 consecutive correct
}
// Index: [deckId+wordId+direction] for fast lookups

// Table: "circles" - tracks completed circles per deck
interface CircleCount {
  id?: number;                    // Auto-increment primary key
  deckId: string;                 // Deck ID
  circles: number;                // Number of completed circles
}
// Index: deckId for fast lookups
```

### API

```typescript
// Get streak for specific task
getProgress(deckId, wordId, direction): Promise<number>

// Set streak for specific task
setProgress(deckId, wordId, direction, streak): Promise<void>

// Get all progress for a deck (for dashboard)
getDeckProgress(deckId): Promise<Map<string, number>>

// Reset progress for a deck (keeps circle count)
resetDeckProgress(deckId): Promise<void>

// Get circle count for a deck
getCircleCount(deckId): Promise<number>

// Increment circle count (returns new count)
incrementCircle(deckId): Promise<number>

// Reset circles for a deck
resetCircles(deckId): Promise<void>
```

---

## Answer Matching

### Vocabulary (DrillScreen)

```typescript
function isAnswerCorrect(userAnswer: string, expectedAnswer: string): boolean {
  const normalizedUser = normalize(userAnswer);
  const alternatives = expectedAnswer.split(' / ').map(normalize);
  return alternatives.some(alt => alt === normalizedUser);
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s*\([^)]*\)/g, '')  // Remove "(formal)", "(plural)", etc.
    .replace(/[.,!?;:'"]/g, '')     // Remove punctuation
    .trim();
}
```

**Example**: Answer `"from / out of"` accepts both `"from"` and `"out of"`.

### Grammar (FillBlankScreen)

```typescript
// Exact match after lowercase + trim
normalize(input) === normalize(answer)
```

---

## Theme System

### CSS Variables

```css
/* Light theme (default) */
:root {
  --color-bg: #faf9f6;
  --color-text: #0a0a0a;
  --color-accent: #f6019d;
  /* ... */
}

/* Dark theme (synthwave) */
[data-theme="dark"] {
  --color-bg: #0a0a12;
  --color-text: #f0f0ff;
  --color-accent: #f6019d;
  /* ... */
}
```

### React Context

```typescript
// ThemeContext.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Sets data-theme attribute on <html>
// Persists to localStorage
```

---

## Component Details

### Dashboard.tsx

- Fetches progress for all decks/lessons on mount
- Two tabs: Vocabulary and Grammar (tab selection persisted to localStorage)
- Groups vocabulary decks by category
- Shows completion percentage and circle count per deck
- Category-based color coding (pink/cyan/purple/yellow)
- Keyboard shortcuts: 1 = Vocabulary tab, 2 = Grammar tab

### DrillScreen.tsx

- Uses `useDrill(deck, resetKey)` hook
- Auto-focuses input on task change
- Three states: `idle` → `wrong`/`correct` → (next task)
- Shows example sentence for DE→EN direction
- Displays GrammarBadges for words with meta (case/number/formality)
- Shows StreakDots for current word's streak progress
- Tracks circle completion and shows CircleCompletionScreen
- Reset button restarts current circle (keeps circle count)

### FillBlankScreen.tsx

- Uses `useFillBlank(lesson)` hook
- Handles two exercise types:
  - **Conjugation**: `"pronoun ___ [infinitive|english]"` → verb hint above, pronoun + input inline
  - **Case**: `"sentence ___ [article|english]"` → full sentence with inline input
- Collapsible info panel with conjugation tables or case rules
- Hint mode toggle (English/German/Both) persisted to localStorage
- Tab selection persisted to localStorage

### CircleCompletionScreen.tsx

- Arcade-style celebration screen
- Shows completed circle number
- Options to continue (start next circle) or exit to dashboard

---

## Build Configuration

### Vite (vite.config.ts)

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### TypeScript (tsconfig.app.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Path Aliases

`@/*` maps to `./src/*` for cleaner imports:

```typescript
import { db } from '@/db';
import type { Deck } from '@/types';
```

---

## Performance Considerations

1. **IndexedDB is async** - All DB operations return Promises
2. **Progress cached in state** - Only initial load hits DB
3. **Memoized task lists** - `useMemo` prevents recalculation
4. **No server calls** - Fully client-side, works offline

---

## Testing Strategy

Currently no tests. Recommended approach:

| Layer | Tool | Focus |
|-------|------|-------|
| Unit | Vitest | `normalize()`, `isAnswerCorrect()` |
| Hook | React Testing Library | `useDrill`, `useFillBlank` |
| Component | React Testing Library | Drill screens, Dashboard |
| E2E | Playwright | Full user flows |
