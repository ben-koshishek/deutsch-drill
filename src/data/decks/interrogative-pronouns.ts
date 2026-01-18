import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ INTERROGATIVE PRONOUNS ============
// Case-based declension for "who" questions: wer/wen/wem/wessen

export const interrogativePronounCards: LabelFormCard[] = [
  { id: "wer", answer: "wer", context: "wer", labels: [{ label: "NOMINATIVE", type: "case" }], examples: [{ german: "Wer ist das?", english: "Who is that?" }, { german: "Wer kommt heute?", english: "Who is coming today?" }] },
  { id: "wen", answer: "wen", context: "wer", labels: [{ label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Wen siehst du?", english: "Whom do you see?" }, { german: "Wen hast du eingeladen?", english: "Whom did you invite?" }] },
  { id: "wem", answer: "wem", context: "wer", labels: [{ label: "DATIVE", type: "case" }], examples: [{ german: "Wem gehört das?", english: "To whom does this belong?" }, { german: "Wem gibst du das Buch?", english: "To whom do you give the book?" }] },
  { id: "wessen", answer: "wessen", context: "wer", labels: [{ label: "GENITIVE", type: "case" }], examples: [{ german: "Wessen Buch ist das?", english: "Whose book is this?" }, { german: "Wessen Auto steht dort?", english: "Whose car is parked there?" }] },
];

export const interrogativePronounsCheatsheet: DeckCheatsheet = {
  title: "Interrogative Pronouns",
  tables: [
    {
      rows: [
        ["NOM", "ACC", "DAT", "GEN"],
        ["wer", "wen", "wem", "wessen"],
      ],
    },
  ],
  notes: [
    "wer = who (subject), wen = whom (direct object), wem = to whom (indirect object), wessen = whose",
  ],
};
