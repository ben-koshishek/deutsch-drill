import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ DEMONSTRATIVE PRONOUNS (dieser/diese/dieses) ============
// Same endings as definite articles, on dies- stem

export const demonstrativePronounCards: LabelFormCard[] = [
  // Nominative
  { id: "dies-m-nom", answer: "dieser", context: "dieser", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Dieser Mann ist nett.", english: "This man is nice." }]},
  { id: "dies-f-nom", answer: "diese", context: "dieser", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Diese Frau arbeitet hier.", english: "This woman works here." }]},
  { id: "dies-n-nom", answer: "dieses", context: "dieser", labels: [{ label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Dieses Buch ist gut.", english: "This book is good." }]},
  { id: "dies-pl-nom", answer: "diese", context: "dieser", labels: [{ label: "NOMINATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Diese Kinder spielen draußen.", english: "These children play outside." }]},
  // Accusative
  { id: "dies-m-acc", answer: "diesen", context: "dieser", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich kenne diesen Mann.", english: "I know this man." }]},
  { id: "dies-f-acc", answer: "diese", context: "dieser", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich sehe diese Frau.", english: "I see this woman." }]},
  { id: "dies-n-acc", answer: "dieses", context: "dieser", labels: [{ label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich lese dieses Buch.", english: "I read this book." }]},
  { id: "dies-pl-acc", answer: "diese", context: "dieser", labels: [{ label: "ACCUSATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Ich kenne diese Leute.", english: "I know these people." }]},
  // Dative
  { id: "dies-m-dat", answer: "diesem", context: "dieser", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich helfe diesem Mann.", english: "I help this man." }]},
  { id: "dies-f-dat", answer: "dieser", context: "dieser", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich danke dieser Frau.", english: "I thank this woman." }]},
  { id: "dies-n-dat", answer: "diesem", context: "dieser", labels: [{ label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich helfe diesem Kind.", english: "I help this child." }]},
  { id: "dies-pl-dat", answer: "diesen", context: "dieser", labels: [{ label: "DATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Ich helfe diesen Kindern.", english: "I help these children." }]},
  // Genitive
  { id: "dies-m-gen", answer: "dieses", context: "dieser", labels: [{ label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Auto dieses Mannes.", english: "This man's car." }]},
  { id: "dies-f-gen", answer: "dieser", context: "dieser", labels: [{ label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Haus dieser Frau.", english: "This woman's house." }]},
  { id: "dies-n-gen", answer: "dieses", context: "dieser", labels: [{ label: "NEUTER", type: "gender", gender: "neuter" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Die Farbe dieses Autos.", english: "The color of this car." }]},
  { id: "dies-pl-gen", answer: "dieser", context: "dieser", labels: [{ label: "GENITIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Die Eltern dieser Kinder.", english: "These children's parents." }]},
];

// ============ CHEATSHEET ============
export const demonstrativePronounsCheatsheet: DeckCheatsheet = {
  title: "Demonstrative Pronouns (dieser)",
  tables: [
    {
      rows: [
        ["", "Masc.", "Fem.", "Neut.", "Plural"],
        ["NOM", "dies|er", "dies|e", "dies|es", "dies|e"],
        ["ACC", "dies|en", "dies|e", "dies|es", "dies|e"],
        ["DAT", "dies|em", "dies|er", "dies|em", "dies|en"],
        ["GEN", "dies|es", "dies|er", "dies|es", "dies|er"],
      ],
    },
  ],
  notes: [
    "Same endings as definite articles (der/die/das) on the stem dies-",
    "Also used: jeder (every), welcher (which), mancher (some) — same pattern",
  ],
};
