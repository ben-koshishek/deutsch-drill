import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ SEIN CONJUGATION ============
export const seinConjugationCards: LabelFormCard[] = [
  // Präsens
  { id: "sein-ich-pres", answer: "bin", context: "sein", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich bin müde.", english: "I am tired." }]},
  { id: "sein-du-pres", answer: "bist", context: "sein", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Du bist nett.", english: "You are nice." }]},
  { id: "sein-er-pres", answer: "ist", context: "sein", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Er ist groß.", english: "He is tall." }]},
  { id: "sein-wir-pres", answer: "sind", context: "sein", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir sind hier.", english: "We are here." }]},
  { id: "sein-ihr-pres", answer: "seid", context: "sein", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ihr seid willkommen.", english: "You (pl.) are welcome." }]},
  { id: "sein-sie-pres", answer: "sind", context: "sein", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie sind fertig.", english: "They are done." }]},
  // Präteritum
  { id: "sein-ich-pret", answer: "war", context: "sein", labels: [{ label: "ICH", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ich war gestern dort.", english: "I was there yesterday." }]},
  { id: "sein-du-pret", answer: "warst", context: "sein", labels: [{ label: "DU", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Du warst schnell.", english: "You were fast." }]},
  { id: "sein-er-pret", answer: "war", context: "sein", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Es war kalt.", english: "It was cold." }]},
  { id: "sein-wir-pret", answer: "waren", context: "sein", labels: [{ label: "WIR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Wir waren im Kino.", english: "We were at the cinema." }]},
  { id: "sein-ihr-pret", answer: "wart", context: "sein", labels: [{ label: "IHR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ihr wart laut.", english: "You (pl.) were loud." }]},
  { id: "sein-sie-pret", answer: "waren", context: "sein", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Sie waren glücklich.", english: "They were happy." }]},
  // Konjunktiv II
  { id: "sein-ich-konj2", answer: "wäre", context: "sein", labels: [{ label: "ICH", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Ich wäre gern dabei.", english: "I would like to be there." }]},
  { id: "sein-du-konj2", answer: "wärest", context: "sein", labels: [{ label: "DU", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Du wärest ein guter Lehrer.", english: "You would be a good teacher." }]},
  { id: "sein-er-konj2", answer: "wäre", context: "sein", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Das wäre schön.", english: "That would be nice." }]},
  { id: "sein-wir-konj2", answer: "wären", context: "sein", labels: [{ label: "WIR", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Wir wären froh.", english: "We would be glad." }]},
  { id: "sein-ihr-konj2", answer: "wäret", context: "sein", labels: [{ label: "IHR", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Ihr wäret willkommen.", english: "You (pl.) would be welcome." }]},
  { id: "sein-sie-konj2", answer: "wären", context: "sein", labels: [{ label: "SIE/SIE", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Sie wären überrascht.", english: "They would be surprised." }]},
];

// ============ CHEATSHEET ============
export const seinConjugationCheatsheet: DeckCheatsheet = {
  title: "sein — Conjugation",
  tables: [
    {
      rows: [
        ["", "Präsens", "Präteritum", "Konj. II"],
        ["ich", "bin", "war", "wär|e"],
        ["du", "bi|st", "war|st", "wär|est"],
        ["er/sie/es", "ist", "war", "wär|e"],
        ["wir", "sind", "war|en", "wär|en"],
        ["ihr", "seid", "war|t", "wär|et"],
        ["sie/Sie", "sind", "war|en", "wär|en"],
      ],
    },
  ],
  notes: [
    "Most irregular German verb — must memorize all forms",
  ],
};
