import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ WISSEN CONJUGATION ============
export const wissenConjugationCards: LabelFormCard[] = [
  // Präsens
  { id: "wissen-ich-pres", answer: "weiß", context: "wissen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich weiß es nicht.", english: "I don't know." }]},
  { id: "wissen-du-pres", answer: "weißt", context: "wissen", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Weißt du das?", english: "Do you know that?" }]},
  { id: "wissen-er-pres", answer: "weiß", context: "wissen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Er weiß die Antwort.", english: "He knows the answer." }]},
  { id: "wissen-wir-pres", answer: "wissen", context: "wissen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir wissen Bescheid.", english: "We know about it." }]},
  { id: "wissen-ihr-pres", answer: "wisst", context: "wissen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wisst ihr das?", english: "Do you (pl.) know that?" }]},
  { id: "wissen-sie-pres", answer: "wissen", context: "wissen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie wissen alles.", english: "They know everything." }]},
  // Präteritum
  { id: "wissen-ich-pret", answer: "wusste", context: "wissen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Ich wusste das nicht.", english: "I didn't know that." }]},
  { id: "wissen-du-pret", answer: "wusstest", context: "wissen", labels: [{ label: "DU", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Wusstest du das?", english: "Did you know that?" }]},
  { id: "wissen-er-pret", answer: "wusste", context: "wissen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Sie wusste die Antwort.", english: "She knew the answer." }]},
  { id: "wissen-wir-pret", answer: "wussten", context: "wissen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Wir wussten nichts davon.", english: "We knew nothing about it." }]},
  { id: "wissen-ihr-pret", answer: "wusstet", context: "wissen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Wusstet ihr Bescheid?", english: "Did you (pl.) know?" }]},
  { id: "wissen-sie-pret", answer: "wussten", context: "wissen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄTERITUM", type: "tense" }], examples: [{ german: "Sie wussten es schon.", english: "They already knew." }]},
  // Konjunktiv II
  { id: "wissen-ich-konj2", answer: "wüsste", context: "wissen", labels: [{ label: "ICH", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Ich wüsste gern mehr.", english: "I would like to know more." }]},
  { id: "wissen-du-konj2", answer: "wüsstest", context: "wissen", labels: [{ label: "DU", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Wenn du das wüsstest!", english: "If you only knew!" }]},
  { id: "wissen-er-konj2", answer: "wüsste", context: "wissen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Er wüsste eine Lösung.", english: "He would know a solution." }]},
  { id: "wissen-wir-konj2", answer: "wüssten", context: "wissen", labels: [{ label: "WIR", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Wir wüssten gern mehr.", english: "We would like to know more." }]},
  { id: "wissen-ihr-konj2", answer: "wüsstet", context: "wissen", labels: [{ label: "IHR", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Wenn ihr das wüsstet!", english: "If you (pl.) only knew!" }]},
  { id: "wissen-sie-konj2", answer: "wüssten", context: "wissen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "KONJUNKTIV II", type: "tense" }], examples: [{ german: "Sie wüssten Bescheid.", english: "They would know." }]},
];

// ============ CHEATSHEET ============
export const wissenConjugationCheatsheet: DeckCheatsheet = {
  title: "wissen — Conjugation",
  tables: [
    {
      rows: [
        ["", "Präsens", "Präteritum", "Konj. II"],
        ["ich", "weiß", "wusst|e", "wüsst|e"],
        ["du", "weiß|t", "wusst|est", "wüsst|est"],
        ["er/sie/es", "weiß", "wusst|e", "wüsst|e"],
        ["wir", "wiss|en", "wusst|en", "wüsst|en"],
        ["ihr", "wiss|t", "wusst|et", "wüsst|et"],
        ["sie/Sie", "wiss|en", "wusst|en", "wüsst|en"],
      ],
    },
  ],
  notes: [
    "Conjugates like a modal in present (stem change wiss→weiß, no ending for ich/er)",
    "Unlike modals, wissen takes accusative objects (Ich weiß die Antwort)",
  ],
};
