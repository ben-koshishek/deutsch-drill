import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ HABEN CONJUGATION ============
export const habenConjugationCards: LabelFormCard[] = [
  // Präsens
  { id: "haben-ich-pres", answer: "habe", context: "haben", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich habe Hunger.", english: "I am hungry." }]},
  { id: "haben-du-pres", answer: "hast", context: "haben", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Du hast recht.", english: "You are right." }]},
  { id: "haben-er-pres", answer: "hat", context: "haben", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Er hat ein Auto.", english: "He has a car." }]},
  { id: "haben-wir-pres", answer: "haben", context: "haben", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir haben Zeit.", english: "We have time." }]},
  { id: "haben-ihr-pres", answer: "habt", context: "haben", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ihr habt Glück.", english: "You (pl.) are lucky." }]},
  { id: "haben-sie-pres", answer: "haben", context: "haben", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie haben Kinder.", english: "They have children." }]},
  // Präteritum
  { id: "haben-ich-pret", answer: "hatte", context: "haben", labels: [{ label: "ICH", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ich hatte keine Zeit.", english: "I had no time." }]},
  { id: "haben-du-pret", answer: "hattest", context: "haben", labels: [{ label: "DU", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Du hattest recht.", english: "You were right." }]},
  { id: "haben-er-pret", answer: "hatte", context: "haben", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Sie hatte Angst.", english: "She was afraid." }]},
  { id: "haben-wir-pret", answer: "hatten", context: "haben", labels: [{ label: "WIR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Wir hatten Spaß.", english: "We had fun." }]},
  { id: "haben-ihr-pret", answer: "hattet", context: "haben", labels: [{ label: "IHR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ihr hattet Glück.", english: "You (pl.) were lucky." }]},
  { id: "haben-sie-pret", answer: "hatten", context: "haben", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Sie hatten Hunger.", english: "They were hungry." }]},
  // Konjunktiv II
  { id: "haben-ich-konj2", answer: "hätte", context: "haben", labels: [{ label: "ICH", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Ich hätte gern ein Eis.", english: "I would like an ice cream." }]},
  { id: "haben-du-konj2", answer: "hättest", context: "haben", labels: [{ label: "DU", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Du hättest mehr Zeit.", english: "You would have more time." }]},
  { id: "haben-er-konj2", answer: "hätte", context: "haben", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Er hätte eine Chance.", english: "He would have a chance." }]},
  { id: "haben-wir-konj2", answer: "hätten", context: "haben", labels: [{ label: "WIR", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Wir hätten genug Platz.", english: "We would have enough space." }]},
  { id: "haben-ihr-konj2", answer: "hättet", context: "haben", labels: [{ label: "IHR", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Ihr hättet Spaß.", english: "You (pl.) would have fun." }]},
  { id: "haben-sie-konj2", answer: "hätten", context: "haben", labels: [{ label: "SIE/SIE", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Sie hätten recht.", english: "They would be right." }]},
];

// ============ CHEATSHEET ============
export const habenConjugationCheatsheet: DeckCheatsheet = {
  title: "haben — Conjugation",
  tables: [
    {
      rows: [
        ["", "Präsens", "Präteritum", "Konj. II"],
        ["ich", "hab|e", "hatt|e", "hätt|e"],
        ["du", "ha|st", "hatt|est", "hätt|est"],
        ["er/sie/es", "ha|t", "hatt|e", "hätt|e"],
        ["wir", "hab|en", "hatt|en", "hätt|en"],
        ["ihr", "hab|t", "hatt|et", "hätt|et"],
        ["sie/Sie", "hab|en", "hatt|en", "hätt|en"],
      ],
    },
  ],
  notes: [
    "Irregular in present (du hast, er hat). Präteritum is regular with hatte-stem",
  ],
};
