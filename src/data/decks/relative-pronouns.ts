import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ RELATIVE PRONOUNS ============
// Mostly identical to definite articles, but genitive + dative plural differ

export const relativePronounCards: LabelFormCard[] = [
  // Nominative
  { id: "rel-m-nom", answer: "der", context: "Relativpronomen", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Der Mann, der dort steht.", english: "The man who is standing there." }]},
  { id: "rel-f-nom", answer: "die", context: "Relativpronomen", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Die Frau, die singt.", english: "The woman who is singing." }]},
  { id: "rel-n-nom", answer: "das", context: "Relativpronomen", labels: [{ label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Kind, das spielt.", english: "The child who is playing." }]},
  { id: "rel-pl-nom", answer: "die", context: "Relativpronomen", labels: [{ label: "NOMINATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Die Leute, die kommen.", english: "The people who are coming." }]},
  // Accusative
  { id: "rel-m-acc", answer: "den", context: "Relativpronomen", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Der Mann, den ich sehe.", english: "The man whom I see." }]},
  { id: "rel-f-acc", answer: "die", context: "Relativpronomen", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Die Frau, die ich kenne.", english: "The woman whom I know." }]},
  { id: "rel-n-acc", answer: "das", context: "Relativpronomen", labels: [{ label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Buch, das ich lese.", english: "The book that I am reading." }]},
  { id: "rel-pl-acc", answer: "die", context: "Relativpronomen", labels: [{ label: "ACCUSATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Die Bücher, die ich lese.", english: "The books that I am reading." }]},
  // Dative
  { id: "rel-m-dat", answer: "dem", context: "Relativpronomen", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Der Mann, dem ich helfe.", english: "The man whom I help." }]},
  { id: "rel-f-dat", answer: "der", context: "Relativpronomen", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Die Frau, der ich danke.", english: "The woman whom I thank." }]},
  { id: "rel-n-dat", answer: "dem", context: "Relativpronomen", labels: [{ label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Kind, dem ich helfe.", english: "The child whom I help." }]},
  { id: "rel-pl-dat", answer: "denen", context: "Relativpronomen", labels: [{ label: "DATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Die Leute, denen ich helfe.", english: "The people whom I help." }]},
  // Genitive
  { id: "rel-m-gen", answer: "dessen", context: "Relativpronomen", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Der Mann, dessen Auto dort steht.", english: "The man whose car is parked there." }]},
  { id: "rel-f-gen", answer: "deren", context: "Relativpronomen", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Die Frau, deren Tasche das ist.", english: "The woman whose bag that is." }]},
  { id: "rel-n-gen", answer: "dessen", context: "Relativpronomen", labels: [{ label: "NEUTER", type: "gender", gender: "neuter" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Kind, dessen Eltern kommen.", english: "The child whose parents are coming." }]},
  { id: "rel-pl-gen", answer: "deren", context: "Relativpronomen", labels: [{ label: "GENITIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Die Leute, deren Namen ich vergessen habe.", english: "The people whose names I forgot." }]},
];

// ============ CHEATSHEET ============
export const relativePronounsCheatsheet: DeckCheatsheet = {
  title: "Relative Pronouns",
  tables: [
    {
      rows: [
        ["", "Masc.", "Fem.", "Neut.", "Plural"],
        ["NOM", "der", "die", "das", "die"],
        ["ACC", "den", "die", "das", "die"],
        ["DAT", "dem", "der", "dem", "denen"],
        ["GEN", "dessen", "deren", "dessen", "deren"],
      ],
    },
  ],
  notes: [
    "NOM/ACC = identical to definite articles",
    "DAT plural: denen (not den). GEN: dessen/deren (not des/der)",
    "Gender + number match the noun being referred to, case is determined by role in the relative clause",
  ],
};
