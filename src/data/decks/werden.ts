import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ WERDEN CONJUGATION ============
export const werdenConjugationCards: LabelFormCard[] = [
  // Präsens
  { id: "werden-ich-pres", answer: "werde", context: "werden", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich werde Arzt.", english: "I am becoming a doctor." }]},
  { id: "werden-du-pres", answer: "wirst", context: "werden", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Du wirst müde.", english: "You are getting tired." }]},
  { id: "werden-er-pres", answer: "wird", context: "werden", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Es wird kalt.", english: "It is getting cold." }]},
  { id: "werden-wir-pres", answer: "werden", context: "werden", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir werden älter.", english: "We are getting older." }]},
  { id: "werden-ihr-pres", answer: "werdet", context: "werden", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ihr werdet besser.", english: "You (pl.) are getting better." }]},
  { id: "werden-sie-pres", answer: "werden", context: "werden", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie werden reich.", english: "They are becoming rich." }]},
  // Präteritum
  { id: "werden-ich-pret", answer: "wurde", context: "werden", labels: [{ label: "ICH", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ich wurde krank.", english: "I became sick." }]},
  { id: "werden-du-pret", answer: "wurdest", context: "werden", labels: [{ label: "DU", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Du wurdest rot.", english: "You turned red." }]},
  { id: "werden-er-pret", answer: "wurde", context: "werden", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Er wurde Lehrer.", english: "He became a teacher." }]},
  { id: "werden-wir-pret", answer: "wurden", context: "werden", labels: [{ label: "WIR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Wir wurden Freunde.", english: "We became friends." }]},
  { id: "werden-ihr-pret", answer: "wurdet", context: "werden", labels: [{ label: "IHR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ihr wurdet laut.", english: "You (pl.) got loud." }]},
  { id: "werden-sie-pret", answer: "wurden", context: "werden", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Sie wurden müde.", english: "They got tired." }]},
  // Konjunktiv II
  { id: "werden-ich-konj2", answer: "würde", context: "werden", labels: [{ label: "ICH", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Ich würde gern kommen.", english: "I would like to come." }]},
  { id: "werden-du-konj2", answer: "würdest", context: "werden", labels: [{ label: "DU", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Du würdest das verstehen.", english: "You would understand that." }]},
  { id: "werden-er-konj2", answer: "würde", context: "werden", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Er würde helfen.", english: "He would help." }]},
  { id: "werden-wir-konj2", answer: "würden", context: "werden", labels: [{ label: "WIR", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Wir würden mitkommen.", english: "We would come along." }]},
  { id: "werden-ihr-konj2", answer: "würdet", context: "werden", labels: [{ label: "IHR", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Ihr würdet das mögen.", english: "You (pl.) would like that." }]},
  { id: "werden-sie-konj2", answer: "würden", context: "werden", labels: [{ label: "SIE/SIE", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Sie würden zustimmen.", english: "They would agree." }]},
];

// ============ CHEATSHEET ============
export const werdenConjugationCheatsheet: DeckCheatsheet = {
  title: "werden — Conjugation",
  tables: [
    {
      rows: [
        ["", "Präsens", "Präteritum", "Konj. II"],
        ["ich", "werd|e", "wurd|e", "würd|e"],
        ["du", "wir|st", "wurd|est", "würd|est"],
        ["er/sie/es", "wir|d", "wurd|e", "würd|e"],
        ["wir", "werd|en", "wurd|en", "würd|en"],
        ["ihr", "werd|et", "wurd|et", "würd|et"],
        ["sie/Sie", "werd|en", "wurd|en", "würd|en"],
      ],
    },
  ],
  notes: [
    "Also used as auxiliary for future (ich werde machen) and passive (es wird gemacht)",
    "Konj. II (würde) is the standard way to form subjunctive for most verbs",
  ],
};
