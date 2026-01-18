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
];

// ============ CHEATSHEET ============
export const seinConjugationCheatsheet: DeckCheatsheet = {
  title: "sein — Conjugation",
  tables: [
    {
      rows: [
        ["", "Präsens", "Präteritum"],
        ["ich", "bin", "war"],
        ["du", "bi|st", "war|st"],
        ["er/sie/es", "ist", "war"],
        ["wir", "sind", "war|en"],
        ["ihr", "seid", "war|t"],
        ["sie/Sie", "sind", "war|en"],
      ],
    },
  ],
  notes: [
    "Most irregular German verb — must memorize all forms",
  ],
};
