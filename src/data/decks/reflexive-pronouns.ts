import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ REFLEXIVE PRONOUNS ============
// Used with reflexive verbs (sich freuen, sich waschen)
// Two cases: accusative and dative
// Key insight: Only ich/du differ between ACC and DAT

export const reflexivePronounCards: LabelFormCard[] = [
  // Accusative
  { id: "refl-myself-acc", answer: "mich", labels: [{ label: "MYSELF", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich wasche mich.", english: "I wash myself." }] },
  { id: "refl-yourself-acc", answer: "dich", labels: [{ label: "YOURSELF", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Du freust dich.", english: "You are happy." }] },
  { id: "refl-oneself-acc", answer: "sich", labels: [{ label: "ONESELF", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Er setzt sich hin.", english: "He sits down." }] },
  { id: "refl-ourselves-acc", answer: "uns", labels: [{ label: "OURSELVES", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Wir freuen uns.", english: "We are happy." }] },
  { id: "refl-yourselves-acc", answer: "euch", labels: [{ label: "YOURSELVES", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ihr beeilt euch.", english: "You hurry up." }] },
  { id: "refl-themselves-acc", answer: "sich", labels: [{ label: "THEMSELVES", type: "meaning" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Sie treffen sich.", english: "They meet (each other)." }] },

  // Dative
  { id: "refl-myself-dat", answer: "mir", labels: [{ label: "MYSELF", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich kaufe mir ein Buch.", english: "I buy myself a book." }] },
  { id: "refl-yourself-dat", answer: "dir", labels: [{ label: "YOURSELF", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Du wäschst dir die Hände.", english: "You wash your hands." }] },
  { id: "refl-oneself-dat", answer: "sich", labels: [{ label: "ONESELF", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Sie kauft sich ein Kleid.", english: "She buys herself a dress." }] },
  { id: "refl-ourselves-dat", answer: "uns", labels: [{ label: "OURSELVES", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Wir wünschen uns Frieden.", english: "We wish ourselves peace." }] },
  { id: "refl-yourselves-dat", answer: "euch", labels: [{ label: "YOURSELVES", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ihr macht euch Sorgen.", english: "You worry (yourselves)." }] },
  { id: "refl-themselves-dat", answer: "sich", labels: [{ label: "THEMSELVES", type: "meaning" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Sie nehmen sich Zeit.", english: "They take their time." }] },
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
