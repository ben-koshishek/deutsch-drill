# CLAUDE.md

Instructions for AI assistants working on this codebase.

## Quick Reference

```bash
pnpm dev      # Start dev server (http://localhost:5173)
pnpm build    # TypeScript check + production build
pnpm lint     # Run ESLint
pnpm preview  # Preview production build
```

## Documentation

- **[PRD.md](./PRD.md)** - Product requirements, user stories, UX principles
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical design, data flow, algorithms

## Project Summary

**DeutschDrill** is a German vocabulary and grammar drilling app. Fast, focused practice.

**Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Mantine UI, Dexie (IndexedDB)

## Key Files

| Path | Purpose |
|------|---------|
| `src/components/DrillScreen.tsx` | Vocabulary drilling UI + timer tracking |
| `src/components/FillBlankScreen.tsx` | Grammar UI (conjugation + case exercises) |
| `src/components/Dashboard.tsx` | Deck/lesson selection with tab persistence |
| `src/components/TimeCompletionScreen.tsx` | Completion screen showing time + best time comparison |
| `src/components/ui/WordBadges.tsx` | Part of speech, grammar info, notes badges |
| `src/components/ui/StreakDots.tsx` | Per-word streak indicator (0-3 dots) |
| `src/components/ui/LiveTimer.tsx` | Running timer display during drills |
| `src/components/ui/BestTimeBadge.tsx` | Best time badge for deck cards |
| `src/components/ui/ResetConfirmModal.tsx` | Reset confirmation dialog |
| `src/hooks/useDrill.ts` | Drill state + spacing algorithm |
| `src/hooks/useFillBlank.ts` | Grammar drill state |
| `src/hooks/useTimer.ts` | Timer hook for speed challenges |
| `src/utils/formatTime.ts` | Format milliseconds as M:SS.s or SS.s |
| `src/db.ts` | IndexedDB persistence (progress + best times) |
| `src/data/decks.ts` | Vocabulary content |
| `src/data/grammar.ts` | Grammar exercises (conjugation + cases) |
| `src/index.css` | Theme variables + global styles |

## Coding Guidelines

### Styling

- Use CSS variables from `index.css` (e.g., `var(--color-text)`, `var(--color-bg)`)
- Support both light and dark themes via `[data-theme="dark"]`
- Use Mantine components with inline style overrides
- Prefer `fontSize` in pixels for consistent sizing

### State Management

- Local state with React hooks (no Redux/Zustand)
- Theme state in `ThemeContext.tsx`
- Progress persisted to IndexedDB via `db.ts`

### Answer Validation

```typescript
// Vocabulary: accepts alternatives separated by " / "
// "from / out of" → accepts "from" OR "out of"
isAnswerCorrect(userAnswer, expectedAnswer)

// Grammar: exact match (lowercase, trimmed)
normalize(input) === normalize(answer)
```

### Grammar Exercise Formats

```typescript
// Conjugation: "pronoun ___ [infinitive|english]"
"ich ___ [sein|to be]"  // answer: "bin"

// Case exercises: "sentence ___ [article|english]"
"Ich sehe ___ [der Mann|the man]"  // answer: "den"
```

### UX Rules

1. **Keyboard-first**: Type → Enter to check → Enter to continue
2. **Auto-focus**: Input focuses on each new task
3. **Clear feedback**: Green = correct, Red = wrong + show answer
4. **Progress visibility**: Always show X/Y mastered + streak dots

## Library Best Practices

### Mantine v8

**Documentation**: https://mantine.dev

**Styling Priority** (highest to lowest):
1. `classNames` prop with CSS modules - best performance
2. `styles` prop with functions - for dynamic values
3. Inline `style` prop - last resort

**Recommended patterns:**
- Use Styles API for inner element customization
- Define component defaults in `theme.components`
- Use static classes (`.mantine-ComponentName-selector`) for external CSS
- Leverage Mantine's CSS variables (`--mantine-*`)

**Anti-patterns to avoid:**
- Inline style objects recreated on every render
- `!important` overrides (use `classNames` instead)
- Ignoring Mantine's built-in CSS variables

### Tailwind CSS v4

**Documentation**: https://tailwindcss.com/docs

**CSS-first configuration:**
- Use `@theme` directive for design tokens (generates utilities + CSS vars)
- Use `:root` only for CSS vars that shouldn't have utility classes
- Import with `@import "tailwindcss"`

**Recommended patterns:**
- Define custom colors in `@theme` block
- Use `--color-*: initial` to replace default palette
- Leverage generated CSS variables: `var(--color-custom-500)`

**Current project note:**
This project uses CSS variables extensively. Tailwind is configured but minimally used.
Decision: Either adopt Tailwind fully or remove it to reduce complexity.

### React 19

**Documentation**: https://react.dev

**New features available:**
- `useActionState` - form submission with automatic pending/error states
- `useOptimistic` - optimistic UI updates
- `useFormStatus` - read form state without prop drilling
- `use()` - read promises/context in render (can be conditional)
- `ref` as prop - no `forwardRef` needed

**When to use new hooks:**
- `useActionState`: forms with server actions or async validation
- `useOptimistic`: show changes before server confirms
- `useFormStatus`: design system buttons inside forms

**Current project note:**
Using traditional `useState` + `useCallback` for forms. Consider `useActionState`
for drill submission flows if complexity increases.

### Dexie (IndexedDB)

**Documentation**: https://dexie.org

**Recommended patterns:**
- Use `useLiveQuery` for reactive data binding
- Index frequently queried fields in schema
- Use transactions for multiple modifications
- Provide fallback value as 3rd arg to `useLiveQuery`

**Query patterns:**

```typescript
// Good: Indexed query
db.progress.where({ deckId }).toArray()

// Good: Compound query
db.progress.where(['deckId', 'wordId']).equals([id, wordId])

// Avoid: Filter in JS after loading all records
db.progress.toArray().then(all => all.filter(...))
```

**Current project status:**
- Clean async/await usage
- Good schema versioning
- Could add batch queries for dashboard (`getBestTimesMap`)

### Framer Motion

**Documentation**: https://motion.dev

**Recommended patterns:**
- Use `motion` components for declarative animations
- Prefer `animate` prop over imperative controls
- Use `AnimatePresence` for exit animations
- Leverage `layout` prop for automatic layout animations

**Performance tips:**
- Use `willChange` for complex animations
- Prefer `transform` and `opacity` properties (GPU-accelerated)
- Use `lazy` motion components for code-splitting

## Path Aliases

`@/*` → `./src/*`

```typescript
import { db } from '@/db';
import type { Deck } from '@/types';
```

## Common Tasks

### Add a vocabulary deck

1. Edit `src/data/decks.ts`
2. Add to `decks` array with unique `id`, `category`, and `words`
3. Each word must have the rich format:

```typescript
{
  id: 'unique-id',
  german: 'das Buch',
  english: 'book',
  partOfSpeech: 'noun',           // Required
  noun: { gender: 'neuter', plural: 'die Bücher' },  // Type-specific
  examples: [{ german: 'Das Buch ist gut.', english: 'The book is good.' }],
  frequency: 'A1',                // CEFR level
  notes: 'Usage notes',           // Optional
  synonyms: ['der Band'],         // Optional
  antonyms: [],                   // Optional
}
```

**Type-specific fields:**
- `noun`: `{ gender, plural, genitiveSingular? }`
- `verb`: `{ auxiliary, pastParticiple?, preterite?, conjugationPattern? }`
- `adjective`: `{ comparative?, superlative? }`
- `preposition`: `{ case }` (single case or array for Wechselpräpositionen)
- `pronoun`: `{ case?, number?, formality?, person? }`

### Add a grammar lesson

1. Edit `src/data/grammar.ts`
2. Add to `grammarLessons` array with `exercises`

### Modify theme colors

1. Edit `src/index.css`
2. Update both `:root` (light) and `[data-theme="dark"]` sections

## Current Codebase Analysis

### Styling Approach

- **Current**: Inline styles dominate (~95% of styling)
- **Mantine**: Used for layout (`Container`, `Stack`) and data (`Table`, `Menu`)
- **Tailwind**: Configured but barely used (<5%)
- **CSS Variables**: Excellent theme system in `index.css`

### Recommendations

The CSS variable system is well-designed for the synthwave theme. Options:

1. **Remove Tailwind** - Simplify dependencies, continue with CSS vars + inline styles
2. **Adopt Tailwind** - Replace inline styles with utility classes
3. **Current state** - Acceptable but adds unused complexity

### React Patterns

- **Using**: `useState`, `useEffect`, `useCallback`, `useRef`, `useMemo`
- **Not using**: `useActionState`, `useOptimistic`, `useFormStatus`
- **Custom hooks**: `useDrill`, `useFillBlank`, `useTimer` (well-structured)

### Dexie Usage

- Clean async/await patterns
- Good schema versioning with migrations
- Opportunity: Add batch queries for dashboard performance
