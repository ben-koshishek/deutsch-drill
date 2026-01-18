import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ KÖNNEN (can, to be able to) ============
export const koennenCards: LabelFormCard[] = [
  { id: "koennen-ich", answer: "kann", context: "können", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich kann schwimmen.", english: "I can swim." }]},
  { id: "koennen-du", answer: "kannst", context: "können", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Kannst du mir helfen?", english: "Can you help me?" }]},
  { id: "koennen-er", answer: "kann", context: "können", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Er kann gut kochen.", english: "He can cook well." }]},
  { id: "koennen-wir", answer: "können", context: "können", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir können gehen.", english: "We can go." }]},
  { id: "koennen-ihr", answer: "könnt", context: "können", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Könnt ihr das machen?", english: "Can you (pl.) do that?" }]},
  { id: "koennen-sie", answer: "können", context: "können", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie können Deutsch.", english: "They can speak German." }]},
];

// ============ MÜSSEN (must, to have to) ============
export const muessenCards: LabelFormCard[] = [
  { id: "muessen-ich", answer: "muss", context: "müssen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich muss arbeiten.", english: "I must work." }]},
  { id: "muessen-du", answer: "musst", context: "müssen", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Du musst lernen.", english: "You must study." }]},
  { id: "muessen-er", answer: "muss", context: "müssen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Er muss gehen.", english: "He must go." }]},
  { id: "muessen-wir", answer: "müssen", context: "müssen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir müssen einkaufen.", english: "We must go shopping." }]},
  { id: "muessen-ihr", answer: "müsst", context: "müssen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ihr müsst leise sein.", english: "You (pl.) must be quiet." }]},
  { id: "muessen-sie", answer: "müssen", context: "müssen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie müssen warten.", english: "They must wait." }]},
];

// ============ WOLLEN (to want) ============
export const wollenCards: LabelFormCard[] = [
  { id: "wollen-ich", answer: "will", context: "wollen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich will schlafen.", english: "I want to sleep." }]},
  { id: "wollen-du", answer: "willst", context: "wollen", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Was willst du?", english: "What do you want?" }]},
  { id: "wollen-er", answer: "will", context: "wollen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie will nach Hause.", english: "She wants to go home." }]},
  { id: "wollen-wir", answer: "wollen", context: "wollen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir wollen essen.", english: "We want to eat." }]},
  { id: "wollen-ihr", answer: "wollt", context: "wollen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wollt ihr mitkommen?", english: "Do you (pl.) want to come along?" }]},
  { id: "wollen-sie", answer: "wollen", context: "wollen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie wollen bleiben.", english: "They want to stay." }]},
];

// ============ SOLLEN (should, to be supposed to) ============
export const sollenCards: LabelFormCard[] = [
  { id: "sollen-ich", answer: "soll", context: "sollen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Was soll ich machen?", english: "What should I do?" }]},
  { id: "sollen-du", answer: "sollst", context: "sollen", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Du sollst nicht lügen.", english: "You shall not lie." }]},
  { id: "sollen-er", answer: "soll", context: "sollen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Er soll kommen.", english: "He is supposed to come." }]},
  { id: "sollen-wir", answer: "sollen", context: "sollen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sollen wir gehen?", english: "Should we go?" }]},
  { id: "sollen-ihr", answer: "sollt", context: "sollen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ihr sollt aufpassen.", english: "You (pl.) should pay attention." }]},
  { id: "sollen-sie", answer: "sollen", context: "sollen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie sollen anrufen.", english: "They are supposed to call." }]},
];

// ============ DÜRFEN (may, to be allowed to) ============
export const duerfenCards: LabelFormCard[] = [
  { id: "duerfen-ich", answer: "darf", context: "dürfen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Darf ich fragen?", english: "May I ask?" }]},
  { id: "duerfen-du", answer: "darfst", context: "dürfen", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Du darfst das nicht.", english: "You are not allowed to do that." }]},
  { id: "duerfen-er", answer: "darf", context: "dürfen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Er darf bleiben.", english: "He may stay." }]},
  { id: "duerfen-wir", answer: "dürfen", context: "dürfen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir dürfen nicht rauchen.", english: "We are not allowed to smoke." }]},
  { id: "duerfen-ihr", answer: "dürft", context: "dürfen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ihr dürft gehen.", english: "You (pl.) may go." }]},
  { id: "duerfen-sie", answer: "dürfen", context: "dürfen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie dürfen hier parken.", english: "They may park here." }]},
];

// ============ MÖGEN (to like) ============
export const moegenCards: LabelFormCard[] = [
  { id: "moegen-ich", answer: "mag", context: "mögen", labels: [{ label: "ICH", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Ich mag Schokolade.", english: "I like chocolate." }]},
  { id: "moegen-du", answer: "magst", context: "mögen", labels: [{ label: "DU", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Magst du Kaffee?", english: "Do you like coffee?" }]},
  { id: "moegen-er", answer: "mag", context: "mögen", labels: [{ label: "ER/SIE/ES", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie mag Musik.", english: "She likes music." }]},
  { id: "moegen-wir", answer: "mögen", context: "mögen", labels: [{ label: "WIR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Wir mögen Pizza.", english: "We like pizza." }]},
  { id: "moegen-ihr", answer: "mögt", context: "mögen", labels: [{ label: "IHR", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Mögt ihr Fußball?", english: "Do you (pl.) like football?" }]},
  { id: "moegen-sie", answer: "mögen", context: "mögen", labels: [{ label: "SIE/SIE", type: "person" }, { label: "PRÄSENS", type: "tense" }], examples: [{ german: "Sie mögen das Essen.", english: "They like the food." }]},
];

// ============ CHEATSHEET ============
export const modalVerbsCheatsheet: DeckCheatsheet = {
  title: "Modal Verbs — Präsens",
  tables: [
    {
      rows: [
        ["", "können", "müssen", "wollen", "sollen", "dürfen", "mögen"],
        ["ich", "kann", "muss", "will", "soll", "darf", "mag"],
        ["du", "kann|st", "muss|t", "will|st", "soll|st", "darf|st", "mag|st"],
        ["er/sie/es", "kann", "muss", "will", "soll", "darf", "mag"],
        ["wir", "könn|en", "müss|en", "woll|en", "soll|en", "dürf|en", "mög|en"],
        ["ihr", "könn|t", "müss|t", "woll|t", "soll|t", "dürf|t", "mög|t"],
        ["sie/Sie", "könn|en", "müss|en", "woll|en", "soll|en", "dürf|en", "mög|en"],
      ],
    },
  ],
  notes: [
    "ich and er/sie/es always share the same form (no endings)",
    "Singular loses umlaut: können → kann, müssen → muss, dürfen → darf, mögen → mag",
  ],
};
