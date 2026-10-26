# German Inflection System — What Changes and How

German encodes meaning into **word forms**. This document maps every part of speech that changes shape, what inputs drive the change, and the exact transformation tables.

---

## 1. Articles — The Main Signal

Articles are the primary carrier of gender + case information.

**Inputs**: `gender` (masc/fem/neut) × `case` (nom/acc/dat/gen) × `number` (sg/pl)

### Definite (`the`)

```text
              MASC        FEM         NEUT        PLURAL
            ─────────   ─────────   ─────────   ─────────
NOM          der         die         das         die
ACC          den         die         das         die
DAT          dem         der         dem         den (+n)
GEN          des (+s)    der         des (+s)    der
```

**What actually changes per case:**

- **NOM → ACC**: only masculine changes (der → den). Rest unchanged.
- **NOM → DAT**: everything changes. masc/neut → dem, fem → der, pl → den.
- **NOM → GEN**: masc/neut → des (noun gains -s/-es), fem/pl → der.

### Indefinite (`a/an`) and `kein` (`no/not a`)

```text
              MASC        FEM         NEUT        PLURAL (kein only)
            ─────────   ─────────   ─────────   ─────────
NOM          ein         eine        ein         keine
ACC          einen       eine        ein         keine
DAT          einem       einer       einem       keinen
GEN          eines       einer       eines       keiner
```

Same pattern as definite. Key difference: masc NOM and neut NOM/ACC have **no ending** — this matters for adjective endings.

---

## 2. Adjective Endings — Gap Filler

Adjectives change endings based on **what article (if any) already signals the gender/case**.

```text
RULE: Gender/case must be signaled ONCE. If the article already signals it,
      the adjective relaxes. If no article, the adjective does all the work.
```

### Weak (after der/die/das — article already signals everything)

```text
              MASC    FEM     NEUT    PLURAL
            ─────── ─────── ─────── ───────
NOM          -e      -e      -e      -en
ACC          -en     -e      -e      -en
DAT          -en     -en     -en     -en
GEN          -en     -en     -en     -en
```

Just **-e** or **-en**. The -e slots: NOM all + ACC fem/neut. Everything else -en.

### Mixed (after ein/eine — article has gaps)

```text
              MASC    FEM     NEUT    PLURAL
            ─────── ─────── ─────── ───────
NOM          -er     -e      -es     -en
ACC          -en     -e      -es     -en
DAT          -en     -en     -en     -en
GEN          -en     -en     -en     -en
```

Same as weak, EXCEPT where `ein` has no ending (masc NOM, neut NOM/ACC) the adjective steps in: **-er**, **-es**.

### Strong (no article — adjective carries everything)

```text
              MASC    FEM     NEUT    PLURAL
            ─────── ─────── ─────── ───────
NOM          -er     -e      -es     -e
ACC          -en     -e      -es     -e
DAT          -em     -er     -em     -en
GEN          -en     -er     -en     -er
```

Looks like the definite article endings mapped onto the adjective.

---

## 3. Nouns — What Changes on the Noun Itself

### 3.1 Plural Formation

No single rule. 7 patterns, learned per noun:

```text
PATTERN       EXAMPLE
─────────     ──────────────────────────
-e            Hund → Hunde
umlaut + -e   Stuhl → Stühle
-er           Kind → Kinder
umlaut + -er  Buch → Bücher
-en / -n      Frau → Frauen
-s            Auto → Autos
no change     Fenster → Fenster
```

**All plurals use `die` regardless of original gender.**

### 3.2 Case Marks on Nouns

Nouns themselves mostly don't change by case. Exceptions:

```text
DATIVE PLURAL:  add -n if the plural doesn't already end in -n or -s
                die Kinder → den Kindern
                die Autos  → den Autos (already -s, no change)

GENITIVE MASC/NEUT SINGULAR: add -s or -es
                der Hund → des Hundes
                das Kind → des Kindes

WEAK MASCULINE NOUNS (n-declension): add -en in ALL cases except NOM
                der Junge → den Jungen, dem Jungen, des Jungen
                der Student → den Studenten, dem Studenten, des Studenten
```

---

## 4. Pronouns — Form Changes by Case

### Personal Pronouns

```text
              NOM      ACC      DAT
            ──────   ──────   ──────
ich           ich      mich     mir
du            du       dich     dir
er            er       ihn      ihm
sie (she)     sie      sie      ihr
es            es       es       ihm
wir           wir      uns      uns
ihr           ihr      euch     euch
sie (they)    sie      sie      ihnen
Sie (formal)  Sie      Sie      Ihnen
```

### Possessive Pronouns

The **stem** is fixed per person. Then decline like `ein`:

```text
ich → mein       wir → unser
du  → dein       ihr → euer
er  → sein       sie (they) → ihr
sie → ihr        Sie → Ihr
es  → sein
```

Apply the same ein-table endings: mein**er**, mein**e**, mein**em**, mein**es**, etc.

---

## 5. Verbs — Conjugation by Person/Number

Verbs change form based on **who** is doing the action (person × number).

### Present Tense

```text
              Regular (machen)    Stem-vowel change (sprechen)
            ──────────────────   ────────────────────────────
ich              mach-e               sprech-e
du               mach-st              sprich-st          ← vowel changes
er/sie/es        mach-t               sprich-t           ← vowel changes
wir              mach-en              sprech-en
ihr              mach-t               sprech-t
sie/Sie          mach-en              sprech-en
```

**Regular endings**: stem + **-e, -st, -t, -en, -t, -en**

**Stem-vowel changes** (e→i, e→ie, a→ä) only affect **du** and **er/sie/es**.

### Irregular: sein, haben

```text
              sein (to be)    haben (to have)
            ──────────────   ────────────────
ich           bin              habe
du            bist             hast
er/sie/es     ist              hat
wir           sind             haben
ihr           seid             habt
sie/Sie       sind             haben
```

---

## Summary: What Changes and What Drives It

```text
WHAT CHANGES          DRIVEN BY                    HOW MANY FORMS
────────────────      ─────────────────────────     ──────────────
Definite article      gender × case × number        16 (4×4, but many overlap)
Indefinite article    gender × case × number        12 (no plural for ein)
Negative article      gender × case × number        16 (kein declines like ein + plural)
Adjective ending      article type × gender × case  3 tables × 16 slots
Noun (plural)         per-noun pattern               7 patterns
Noun (case marks)     case (gen/dat only)            minor suffixes
Personal pronoun      person × case                  27 forms (9×3)
Possessive pronoun    person (stem) + ein-endings    9 stems × ein-table
Verb                  person × number                6 forms per tense
```

---

## Out of Scope (not covered in this document)

These are real German grammar topics but don't involve memorizing word form tables:

- **Word order**: V2 rule, verb-final in subordinate clauses, TeKaMoLo (temporal-kausal-modal-lokal)
- **Mood**: Konjunktiv I (reported speech), Konjunktiv II (hypotheticals, politeness)
- **Voice**: Active vs passive construction (wird + past participle)
- **Comparison**: Adjective comparative/superlative forms (groß → größer → am größten)

These require sentence-level understanding, not form recall from labels.
