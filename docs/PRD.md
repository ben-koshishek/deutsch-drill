# PRD — DeutschDrill

## Goal

Fast, focused German drilling app. Memorize vocabulary and grammar through repetition. Keyboard-first, no fluff.

## Non-goals

- Not a course or lesson planner
- Not a spaced-repetition system (no scheduling across days)
- No accounts, no cloud sync

---

## Exercise Types

### 1. Vocabulary Drill (`translation`)

User sees a word, types the translation. Two directions: German→English and English→German. Both must be mastered.

**Screen**: `DrillScreen` — used by most decks.

### 2. Label-to-Form (`label-to-form`)

User sees grammar labels (gender, case, number, definiteness) and types the correct word form. No translation — pure form recall from labels.

**Screen**: `LabelFormScreen` — used by definite/indefinite article decks.

### 3. Grammar Fill-in-the-Blank (`grammar`)

User sees a prompt and types the correct form. The screen detects the exercise sub-format from the sentence pattern:

- **Gender exercises**: Category name + example nouns. User types `der`, `die`, or `das`.
- **Conjugation exercises**: Pronoun + blank. A clickable hint shows the infinitive (in German, English, or both). User types the conjugated form.
- **Case exercises** (planned): Sentence fragment + blank + noun. Shows the nominative form and `→ ?` hint.
- **Transformation exercises** (planned): Full sentence displayed, user types the transformed version.

**Screen**: `FillBlankScreen` — used by grammar lessons.

---

## Grammar Coverage

### Dimension → Part-of-Speech Map

```text
Dimension    → Affects
───────────────────────────────────────
Gender       → Articles, Adjectives, Nouns
Case         → Articles, Pronouns, Adjectives, Prepositions (governs)
Number       → Articles, Pronouns, Nouns, Verbs, Adjectives
Person       → Pronouns, Verbs
Tense        → Verbs only
```

### Feature Map

| Part of Speech | Finite? | How we drill it | Implemented in |
|---|---|---|---|
| Definite articles (der/die/das) | Yes (12) | label-to-form (all cases) | `definite-articles` deck |
| Indefinite articles (ein/eine) | Yes (9) | label-to-form (all cases) | `indefinite-articles` deck |
| Negative articles (kein/keine) | Yes (16) | label-to-form (all cases) | Planned — same format as article decks |
| Personal pronouns | Yes (21) | translation | `pronouns` deck |
| Possessive pronouns | Yes (49) | translation | `possessive-pronouns` deck |
| Prepositions | Yes (28) | translation | `prepositions` deck |
| Negation words | Yes (10) | translation | `negation` deck |
| Noun gender | Pattern-based | gender rule drill (type der/die/das) | `gender-rules` lesson |
| Adjective endings | Yes (3 types × 16) | label-to-form | `gross-adjective` deck (48 cards) |
| Noun plurals | No (per-noun) | translation (per word) | Planned |
| Verb conjugation | Per-verb (12 forms) | label-to-form | `machen-conjugation` deck (12 cards) |
| Noun case marks | Minor suffixes | — | Out of scope |

### Out-of-Scope Grammar

These topics don't involve memorizing word form tables:

- **Word order** — V2 rule, verb-final in subclauses, TeKaMoLo
- **Mood** — Konjunktiv I/II
- **Voice** — Active/passive
- **Comparison** — Comparative/superlative (could be added later as adjective drill)

---

## Mastery & Progression

- A card is mastered after **3 correct answers in a row** (per direction).
- A drill session ends when all cards in the deck are mastered.
- Incorrect answers reset the streak for that card to 0.

## Lives

- Each drill starts with **3 lives**.
- One life lost per incorrect answer.
- 0 lives = game over. User can retry or exit.

## Timing

- Each drill session is timed.
- On completion, the time and mistake count are compared to the previous run.

---

## Answer Validation

All user input is normalized before comparison: lowercase, strip parentheticals (e.g. "(formal)"), remove punctuation, convert umlauts to ASCII (ä→a, ö→o, ü→u, ß→ss), trim whitespace. Users don't need a German keyboard.

### Vocabulary drills

- If the english field contains `" / "`, each part is an independently accepted answer. Used for interchangeable translations of the same card (e.g. "she / her", "a / an", "his / its").
- If a word has a `meanings` array, each meaning's english text is also accepted.
- Each card tests one specific meaning. Words with distinct meanings are separate cards, not alternatives.

### Grammar exercises

- Single correct answer per exercise, normalized comparison.

---

## Content Inventory

### Vocabulary Decks (`translation`)

| Deck ID | Name | Category | Cards | Cheatsheet |
|---------|------|----------|-------|------------|
| pronouns | Personal Pronouns | sentence-structure | 21 | Yes |
| possessive-pronouns | Possessive Pronouns | sentence-structure | 49 | Yes |
| prepositions | Prepositions | sentence-structure | 28 | Yes |
| conjunctions | Conjunctions | sentence-structure | — | No |
| negation | Negation | sentence-structure | — | No |
| common-adjectives | Adjectives | descriptive-words | — | No |
| time-adverbs | Time Words | descriptive-words | — | No |
| place-adverbs | Place Words | descriptive-words | — | No |
| question-words | Question Words | descriptive-words | — | No |
| numbers | Numbers 1-12 | miscellaneous | — | No |
| days-months | Days & Months | miscellaneous | — | No |
| irregular-verbs | Irregular Verbs | sentence-structure | — | No |

### Label-to-Form Decks (`label-to-form`)

| Deck ID | Name | Cards | Cheatsheet |
|---------|------|-------|------------|
| definite-articles | Definite Articles | 12 | Yes |
| indefinite-articles | Indefinite Articles | 9 | Yes |
| machen-conjugation | machen — Conjugation | 12 | Yes |
| gross-adjective | groß — Adjective Endings | 48 | Yes |

### Grammar Lessons (`grammar`)

| Lesson ID | Name | What it drills | Parts of speech covered |
|-----------|------|----------------|------------------------|
| gender-rules | der/die/das Rules | Noun gender patterns → type der/die/das | Nouns (gender) |
