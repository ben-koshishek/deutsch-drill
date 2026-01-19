# DeutschDrill - Product Requirements Document

## Product Vision

DeutschDrill is a focused German language learning app that prioritizes **speed and repetition** over gamification. The goal is fast, efficient vocabulary and grammar drilling with spaced repetition principles.

### Problem Statement

Language learners need consistent, focused practice to build vocabulary and grammar skills. Existing apps often prioritize engagement mechanics (streaks, points, animations) over actual learning efficiency.

### Solution

A minimalist drilling app that:
- Gets learners practicing within seconds
- Uses spaced repetition to optimize retention
- Provides immediate, clear feedback
- Tracks progress without distracting gamification

### Target Audience

- **Primary**: Adults learning German (A1-B1 level)
- **Use case**: Daily practice sessions (5-15 minutes)
- **Context**: Self-study, supplementing courses or apps like Duolingo

---

## User Stories

### Core Learning Flow

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US1 | As a learner, I select a topic (vocabulary deck or grammar lesson) and drill until mastery | Dashboard shows all available decks/lessons; clicking one starts a drill session |
| US2 | As a learner, I see my progress (X/Y mastered) and can track completion | Progress bar and counter visible during drill; completion percentage on dashboard |
| US3 | As a learner, words I get wrong come back more often until I learn them | Wrong answers reappear within 2-5 cards; correct answers spaced out |
| US4 | As a learner, I need 3 correct answers in a row to "master" an item | Streak indicator shows 0-3 dots; item removed from queue at 3 |

### Vocabulary Practice

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US5 | I see a German word → I type the English translation (and vice versa) | Prompt shows word; input accepts typed answer |
| US6 | Each word is tested in both directions (DE→EN and EN→DE) | Both directions must be mastered for word to be complete |
| US7 | I see example sentences to understand context | Example shown below German word (DE→EN direction only) |
| US8 | After typing, I press Enter to check, then Enter again to continue | Single key flow; no mouse needed |

### Grammar Practice (Conjugation)

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US9 | I see a pronoun and infinitive verb → I type the conjugated form | Display: infinitive above, pronoun + blank inline |
| US10 | The prompt reads as a natural sentence: "ich ______" | Pronoun and input on same line, reading left-to-right |
| US11 | All common pronouns are practiced | ich, du, er/sie/es, wir, ihr, sie (formal Sie) |

### Grammar Practice (Cases)

| ID | Story | Acceptance Criteria |
|----|-------|---------------------|
| US12 | I see a sentence with blank → I type the correct article | "Ich sehe ___ Mann." → "den" |
| US13 | Case exercises show inline sentence | Sentence + input + noun on same line |
| US14 | Accusative and dative cases are practiced | der→den, die→die, das→das, der→dem, die→der |

---

## UX Principles

### 1. Natural Reading Flow
- Eye movement: left → right, top → bottom
- For conjugation: pronoun and input should be INLINE, reading as one sentence
- Don't make user's eyes jump around the screen

### 2. Keyboard-First Interaction
- Type answer → Enter to check → Enter to continue
- No clicking required during drill sessions
- Input auto-focuses on each new card

### 3. Immediate, Clear Feedback
- **Correct**: Green color, "Correct!" message
- **Wrong**: Red color, show the correct answer prominently
- User must acknowledge wrong answer (Enter) before moving on

### 4. Progress Visibility
- Always show: X / Y mastered
- Progress bar shows percentage complete
- Streak dots (3 dots) show progress toward mastering current word
- Circle counter shows how many times deck has been completed

### 5. Minimal Cognitive Load
- One task at a time
- No distracting animations or sounds
- Clean, focused UI

---

## Features

### MVP (Current)

| Feature | Status | Notes |
|---------|--------|-------|
| Vocabulary drilling | ✅ Done | 12 decks, ~150 words |
| Grammar drilling (conjugation) | ✅ Done | sein/haben, regular verbs |
| Grammar drilling (cases) | ✅ Done | Accusative & dative articles |
| Spaced repetition algorithm | ✅ Done | Basic spacing with wrong-answer priority |
| Progress persistence | ✅ Done | IndexedDB via Dexie |
| Tab persistence | ✅ Done | Remembers vocabulary/grammar tab on refresh |
| Light/dark theme | ✅ Done | Synthwave dark theme |
| Circle completion system | ✅ Done | Infinite replay with circle counter |
| Reset progress button | ✅ Done | Resets current circle, keeps circle count |
| Grammar badges | ✅ Done | Case/number/formality for pronouns |
| Mobile responsive | ⚠️ Partial | Needs testing |

### Future Considerations

| Feature | Priority | Notes |
|---------|----------|-------|
| Audio pronunciation | Medium | Text-to-speech or recordings |
| More vocabulary decks | Medium | Expand to 500+ words |
| More grammar lessons | Medium | Genitive case, two-way prepositions, adjective endings |
| Keyboard shortcuts | Low | Quick navigation |
| Statistics/analytics | Low | Learning curves, time spent |
| Export/import progress | Low | Backup/sync across devices |

---

## Success Metrics

### Learning Effectiveness
- **Mastery rate**: % of items mastered per session
- **Retention**: Performance on previously mastered items
- **Session completion**: % of sessions completed vs abandoned

### Engagement
- **Daily active usage**: Sessions per day
- **Session length**: Average time spent drilling
- **Return rate**: Users returning within 7 days

### UX Quality
- **Time to first answer**: Seconds from app open to first typed answer
- **Error rate**: Typos vs actual wrong answers
- **Feedback clarity**: User understands why answer was wrong

---

## Content Inventory

### Vocabulary Decks

| Deck | Category | Word Count |
|------|----------|------------|
| Common Verbs | Essentials | 20 |
| Common Nouns | Essentials | 15 |
| Common Adjectives | Essentials | 15 |
| Prepositions | Building Blocks | 15 |
| Question Words | Building Blocks | 10 |
| Numbers 1-20 | Basics | 12 |
| Days & Months | Basics | 11 |

### Grammar Lessons

| Lesson | Exercise Count | Content |
|--------|----------------|---------|
| sein & haben | 12 | Irregular conjugations (bin, bist, ist, habe, hast, hat) |
| Regular Verbs | 42 | Standard -e, -st, -t, -en endings |
| Accusative Case | 12 | der→den, die→die, das→das, ein→einen |
| Dative Case | 12 | der→dem, die→der, das→dem with prepositions |

---

## Known Issues

1. **Mobile responsiveness** - Layout needs testing on small screens
2. **No audio** - Pronunciation support missing

---

## Glossary

| Term | Definition |
|------|------------|
| **Deck** | Collection of vocabulary words grouped by theme |
| **Word** | German/English pair with optional example sentence and grammar metadata |
| **Lesson** | Collection of grammar exercises |
| **Exercise** | Single grammar prompt (e.g., conjugate "haben" for "ich") |
| **Mastery** | 3 consecutive correct answers for an item |
| **Streak** | Current count of consecutive correct answers (0-3) |
| **Circle** | One complete pass through all words in a deck |
| **Direction** | DE→EN (translate to English) or EN→DE (translate to German) |
