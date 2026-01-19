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

**DeutschDrill** is a German vocabulary and grammar drilling app. Fast, focused practice with spaced repetition.

**Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Mantine UI, Dexie (IndexedDB)

## Key Files

| Path | Purpose |
|------|---------|
| `src/components/DrillScreen.tsx` | Vocabulary drilling UI + circle tracking |
| `src/components/FillBlankScreen.tsx` | Grammar UI (conjugation + case exercises) |
| `src/components/Dashboard.tsx` | Deck/lesson selection with tab persistence |
| `src/components/CircleCompletionScreen.tsx` | Celebration screen after completing a circle |
| `src/components/ui/GrammarBadges.tsx` | Case/number/formality badges for pronouns |
| `src/components/ui/StreakDots.tsx` | Per-word streak indicator (0-3 dots) |
| `src/components/ui/CircleBadge.tsx` | Circle counter badge in header |
| `src/components/ui/ResetConfirmModal.tsx` | Reset confirmation dialog |
| `src/hooks/useDrill.ts` | Drill state + spacing algorithm |
| `src/hooks/useFillBlank.ts` | Grammar drill state |
| `src/db.ts` | IndexedDB persistence (progress + circles) |
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

### Add a grammar lesson

1. Edit `src/data/grammar.ts`
2. Add to `grammarLessons` array with `exercises`

### Modify theme colors

1. Edit `src/index.css`
2. Update both `:root` (light) and `[data-theme="dark"]` sections
