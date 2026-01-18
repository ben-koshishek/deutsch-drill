import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ REFLEXIVE PRONOUNS ============
// Used with reflexive verbs (sich freuen, sich waschen)
// Two cases: accusative and dative
// Key insight: Only ich/du differ between ACC and DAT

export const reflexivePronounCards: LabelFormCard[] = [
  // Accusative
  { id: "refl-ich-acc", answer: "mich", labels: [{ label: "ICH", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich wasche mich.", english: "I wash myself." }] },
  { id: "refl-du-acc", answer: "dich", labels: [{ label: "DU", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Du freust dich.", english: "You are happy." }] },
  { id: "refl-er-acc", answer: "sich", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Er setzt sich hin.", english: "He sits down." }] },
  { id: "refl-wir-acc", answer: "uns", labels: [{ label: "WIR", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Wir freuen uns.", english: "We are happy." }] },
  { id: "refl-ihr-acc", answer: "euch", labels: [{ label: "IHR", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ihr beeilt euch.", english: "You hurry up." }] },
  { id: "refl-sie-pl-acc", answer: "sich", labels: [{ label: "SIE/SIE", type: "person" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Sie treffen sich.", english: "They meet (each other)." }] },

  // Dative
  { id: "refl-ich-dat", answer: "mir", labels: [{ label: "ICH", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich kaufe mir ein Buch.", english: "I buy myself a book." }] },
  { id: "refl-du-dat", answer: "dir", labels: [{ label: "DU", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Du wäschst dir die Hände.", english: "You wash your hands." }] },
  { id: "refl-er-dat", answer: "sich", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Sie kauft sich ein Kleid.", english: "She buys herself a dress." }] },
  { id: "refl-wir-dat", answer: "uns", labels: [{ label: "WIR", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Wir wünschen uns Frieden.", english: "We wish ourselves peace." }] },
  { id: "refl-ihr-dat", answer: "euch", labels: [{ label: "IHR", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ihr macht euch Sorgen.", english: "You worry (yourselves)." }] },
  { id: "refl-sie-pl-dat", answer: "sich", labels: [{ label: "SIE/SIE", type: "person" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Sie nehmen sich Zeit.", english: "They take their time." }] },
];

export const reflexivePronounsCheatsheet: DeckCheatsheet = {
  title: "Reflexive Pronouns",
  tables: [
    {
      rows: [
        ["", "ACC", "DAT"],
        ["ich", "mi|ch", "mi|r"],
        ["du", "di|ch", "di|r"],
        ["er/sie/es", "sich", "sich"],
        ["wir", "uns", "uns"],
        ["ihr", "euch", "euch"],
        ["sie/Sie", "sich", "sich"],
      ],
    },
  ],
  notes: [
    "Only ich and du differ between ACC and DAT",
    "sich is the same for all 3rd person forms and formal Sie",
  ],
};
