import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ KEIN DECLENSION (negative article) ============
// kein follows ein-pattern but includes plural forms
export const keinCards: LabelFormCard[] = [
  // Nominative
  { id: "kein-m-nom", answer: "kein", labels: [{ label: "KEIN", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Kein Mann war dort.", english: "No man was there." }]},
  { id: "kein-f-nom", answer: "keine", labels: [{ label: "KEIN", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Keine Frau hat das gesagt.", english: "No woman said that." }]},
  { id: "kein-n-nom", answer: "kein", labels: [{ label: "KEIN", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Kein Kind spielt draußen.", english: "No child is playing outside." }]},
  { id: "kein-pl-nom", answer: "keine", labels: [{ label: "KEIN", type: "articleType" }, { label: "NOMINATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Keine Bücher liegen hier.", english: "No books are lying here." }]},
  // Accusative
  { id: "kein-m-acc", answer: "keinen", labels: [{ label: "KEIN", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich habe keinen Bruder.", english: "I have no brother." }]},
  { id: "kein-f-acc", answer: "keine", labels: [{ label: "KEIN", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich habe keine Schwester.", english: "I have no sister." }]},
  { id: "kein-n-acc", answer: "kein", labels: [{ label: "KEIN", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Ich habe kein Geld.", english: "I have no money." }]},
  { id: "kein-pl-acc", answer: "keine", labels: [{ label: "KEIN", type: "articleType" }, { label: "ACCUSATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Ich habe keine Freunde hier.", english: "I have no friends here." }]},
  // Dative
  { id: "kein-m-dat", answer: "keinem", labels: [{ label: "KEIN", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Mit keinem Mann.", english: "With no man." }]},
  { id: "kein-f-dat", answer: "keiner", labels: [{ label: "KEIN", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Mit keiner Frau.", english: "With no woman." }]},
  { id: "kein-n-dat", answer: "keinem", labels: [{ label: "KEIN", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Mit keinem Kind.", english: "With no child." }]},
  { id: "kein-pl-dat", answer: "keinen", labels: [{ label: "KEIN", type: "articleType" }, { label: "DATIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Mit keinen Leuten.", english: "With no people." }]},
  // Genitive
  { id: "kein-m-gen", answer: "keines", labels: [{ label: "KEIN", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Auto keines Mannes.", english: "No man's car." }]},
  { id: "kein-f-gen", answer: "keiner", labels: [{ label: "KEIN", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Haus keiner Frau.", english: "No woman's house." }]},
  { id: "kein-n-gen", answer: "keines", labels: [{ label: "KEIN", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "GENITIVE", type: "case" }, { label: "SINGULAR", type: "number" }], examples: [{ german: "Das Spielzeug keines Kindes.", english: "No child's toy." }]},
  { id: "kein-pl-gen", answer: "keiner", labels: [{ label: "KEIN", type: "articleType" }, { label: "GENITIVE", type: "case" }, { label: "PLURAL", type: "number" }], examples: [{ german: "Die Meinung keiner Leute.", english: "No people's opinion." }]},
];

// ============ CHEATSHEET ============
export const keinCheatsheet: DeckCheatsheet = {
  title: "kein — Negative Article",
  tables: [
    {
      rows: [
        ["", "Masc.", "Fem.", "Neut.", "Plural"],
        ["NOM", "kein", "kein|e", "kein", "kein|e"],
        ["ACC", "kein|en", "kein|e", "kein", "kein|e"],
        ["DAT", "kein|em", "kein|er", "kein|em", "kein|en"],
        ["GEN", "kein|es", "kein|er", "kein|es", "kein|er"],
      ],
    },
  ],
  notes: [
    "kein replaces ein/eine for negation — same endings + plural forms",
    "kein Buch = no book, keine Bücher = no books",
  ],
};
