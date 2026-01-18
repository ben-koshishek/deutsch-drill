import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ VERB CONJUGATION: machen ============
export const machenConjugationCards: LabelFormCard[] = [
  // Präsens
  { id: "machen-ich-pres", answer: "mache", context: "machen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich mache meine Hausaufgaben.", english: "I do my homework." }]},
  { id: "machen-du-pres", answer: "machst", context: "machen", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Du machst das gut.", english: "You do that well." }]},
  { id: "machen-er-pres", answer: "macht", context: "machen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Er macht Sport.", english: "He does sport." }]},
  { id: "machen-wir-pres", answer: "machen", context: "machen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir machen einen Ausflug.", english: "We make a trip." }]},
  { id: "machen-ihr-pres", answer: "macht", context: "machen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ihr macht das richtig.", english: "You (pl.) do that correctly." }]},
  { id: "machen-sie-pres", answer: "machen", context: "machen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie machen Urlaub.", english: "They take vacation." }]},
  // Präteritum
  { id: "machen-ich-pret", answer: "machte", context: "machen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ich machte einen Fehler.", english: "I made a mistake." }]},
  { id: "machen-du-pret", answer: "machtest", context: "machen", labels: [{ label: "DU", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Du machtest das gestern.", english: "You did that yesterday." }]},
  { id: "machen-er-pret", answer: "machte", context: "machen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Sie machte die Tür auf.", english: "She opened the door." }]},
  { id: "machen-wir-pret", answer: "machten", context: "machen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Wir machten eine Pause.", english: "We took a break." }]},
  { id: "machen-ihr-pret", answer: "machtet", context: "machen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ihr machtet das zusammen.", english: "You (pl.) did that together." }]},
  { id: "machen-sie-pret", answer: "machten", context: "machen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Sie machten alles richtig.", english: "They did everything right." }]},
];

// ============ CHEATSHEET ============
export const machenConjugationCheatsheet: DeckCheatsheet = {
  title: "machen — Conjugation",
  tables: [
    {
      rows: [
        ["", "Präsens", "Präteritum"],
        ["ich", "mach|e", "macht|e"],
        ["du", "mach|st", "macht|est"],
        ["er/sie/es", "mach|t", "macht|e"],
        ["wir", "mach|en", "macht|en"],
        ["ihr", "mach|t", "macht|et"],
        ["sie/Sie", "mach|en", "macht|en"],
      ],
    },
  ],
  notes: [
    "Regular verb — stem: mach-, endings follow standard pattern",
  ],
};
