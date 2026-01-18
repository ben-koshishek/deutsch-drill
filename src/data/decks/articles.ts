import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ DEFINITE ARTICLES ============
export const definiteArticleCards: LabelFormCard[] = [
  // Nominative
  { id: "def-m-nom", answer: "der", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Der Mann ist hier.", english: "The man is here." }]},
  { id: "def-f-nom", answer: "die", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Die Frau lacht.", english: "The woman laughs." }]},
  { id: "def-n-nom", answer: "das", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Kind spielt.", english: "The child plays." }]},
  { id: "def-pl-nom", answer: "die", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "NOMINATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Die Kinder spielen.", english: "The children play." }]},
  // Accusative
  { id: "def-m-acc", answer: "den", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich sehe den Mann.", english: "I see the man." }]},
  { id: "def-f-acc", answer: "die", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich sehe die Frau.", english: "I see the woman." }]},
  { id: "def-n-acc", answer: "das", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich sehe das Kind.", english: "I see the child." }]},
  { id: "def-pl-acc", answer: "die", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "ACCUSATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Ich sehe die Kinder.", english: "I see the children." }]},
  // Dative
  { id: "def-m-dat", answer: "dem", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich helfe dem Mann.", english: "I help the man." }]},
  { id: "def-f-dat", answer: "der", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich helfe der Frau.", english: "I help the woman." }]},
  { id: "def-n-dat", answer: "dem", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich helfe dem Kind.", english: "I help the child." }]},
  { id: "def-pl-dat", answer: "den", labels: [{ label: "DEFINITE", type: "articleType" }, { label: "DATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Ich helfe den Kindern.", english: "I help the children." }]},
];

// ============ INDEFINITE ARTICLES ============
export const indefiniteArticleCards: LabelFormCard[] = [
  // Nominative
  { id: "indef-m-nom", answer: "ein", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ein Mann steht dort.", english: "A man is standing there." }]},
  { id: "indef-f-nom", answer: "eine", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Eine Frau singt.", english: "A woman is singing." }]},
  { id: "indef-n-nom", answer: "ein", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ein Kind lacht.", english: "A child is laughing." }]},
  // Accusative
  { id: "indef-m-acc", answer: "einen", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich sehe einen Mann.", english: "I see a man." }]},
  { id: "indef-f-acc", answer: "eine", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich sehe eine Frau.", english: "I see a woman." }]},
  { id: "indef-n-acc", answer: "ein", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich sehe ein Kind.", english: "I see a child." }]},
  // Dative
  { id: "indef-m-dat", answer: "einem", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich helfe einem Mann.", english: "I help a man." }]},
  { id: "indef-f-dat", answer: "einer", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich helfe einer Frau.", english: "I help a woman." }]},
  { id: "indef-n-dat", answer: "einem", labels: [{ label: "INDEFINITE", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich helfe einem Kind.", english: "I help a child." }]},
];

// ============ CHEATSHEETS ============
export const definiteArticlesCheatsheet: DeckCheatsheet = {
  title: "Definite Articles (the)",
  tables: [
    {
      rows: [
        ["", "Masc.", "Fem.", "Neut.", "Plural"],
        ["NOM", "der", "die", "das", "die"],
        ["ACC", "den", "die", "das", "die"],
        ["DAT", "dem", "der", "dem", "den"],
        ["GEN", "des", "der", "des", "der"],
      ],
    },
  ],
};

export const indefiniteArticlesCheatsheet: DeckCheatsheet = {
  title: "Indefinite Articles (a/an)",
  tables: [
    {
      rows: [
        ["", "Masc.", "Fem.", "Neut."],
        ["NOM", "ein", "ein|e", "ein"],
        ["ACC", "ein|en", "ein|e", "ein"],
        ["DAT", "ein|em", "ein|er", "ein|em"],
        ["GEN", "ein|es", "ein|er", "ein|es"],
      ],
    },
  ],
  notes: [
    "No plural form — use kein- for negation (keine Bücher)",
  ],
};
