import type { DeckCheatsheet, LabelFormCard } from "@/types";

// ============ ADJECTIVE DECLENSION: groß ============
export const grossAdjCards: LabelFormCard[] = [
  // Weak declension (after definite articles)
  // Nominative
  { id: "gross-w-m-nom", answer: "große", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Der große Mann steht dort.", english: "The tall man stands there." }]},
  { id: "gross-w-f-nom", answer: "große", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Die große Frau lacht.", english: "The tall woman laughs." }]},
  { id: "gross-w-n-nom", answer: "große", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Das große Haus ist alt.", english: "The big house is old." }]},
  { id: "gross-w-pl-nom", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Die großen Häuser sind alt.", english: "The big houses are old." }]},
  // Accusative
  { id: "gross-w-m-acc", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe den großen Mann.", english: "I see the tall man." }]},
  { id: "gross-w-f-acc", answer: "große", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe die große Frau.", english: "I see the tall woman." }]},
  { id: "gross-w-n-acc", answer: "große", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe das große Haus.", english: "I see the big house." }]},
  { id: "gross-w-pl-acc", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe die großen Häuser.", english: "I see the big houses." }]},
  // Dative
  { id: "gross-w-m-dat", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe dem großen Mann.", english: "I help the tall man." }]},
  { id: "gross-w-f-dat", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe der großen Frau.", english: "I help the tall woman." }]},
  { id: "gross-w-n-dat", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }], examples: [{ german: "In dem großen Haus wohnen viele.", english: "Many live in the big house." }]},
  { id: "gross-w-pl-dat", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "DATIVE", type: "case" }], examples: [{ german: "In den großen Häusern wohnen viele.", english: "Many live in the big houses." }]},
  // Genitive
  { id: "gross-w-m-gen", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Auto des großen Mannes.", english: "The car of the tall man." }]},
  { id: "gross-w-f-gen", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Buch der großen Frau.", english: "The book of the tall woman." }]},
  { id: "gross-w-n-gen", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Die Tür des großen Hauses.", english: "The door of the big house." }]},
  { id: "gross-w-pl-gen", answer: "großen", context: "groß", labels: [{ label: "WEAK", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Die Türen der großen Häuser.", english: "The doors of the big houses." }]},

  // Mixed declension (after indefinite articles)
  // Nominative
  { id: "gross-m-m-nom", answer: "großer", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ein großer Mann steht dort.", english: "A tall man stands there." }]},
  { id: "gross-m-f-nom", answer: "große", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Eine große Frau lacht.", english: "A tall woman laughs." }]},
  { id: "gross-m-n-nom", answer: "großes", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Ein großes Haus ist dort.", english: "A big house is there." }]},
  { id: "gross-m-pl-nom", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Keine großen Häuser hier.", english: "No big houses here." }]},
  // Accusative
  { id: "gross-m-m-acc", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe einen großen Mann.", english: "I see a tall man." }]},
  { id: "gross-m-f-acc", answer: "große", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe eine große Frau.", english: "I see a tall woman." }]},
  { id: "gross-m-n-acc", answer: "großes", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe ein großes Haus.", english: "I see a big house." }]},
  { id: "gross-m-pl-acc", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe keine großen Häuser.", english: "I see no big houses." }]},
  // Dative
  { id: "gross-m-m-dat", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe einem großen Mann.", english: "I help a tall man." }]},
  { id: "gross-m-f-dat", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Ich helfe einer großen Frau.", english: "I help a tall woman." }]},
  { id: "gross-m-n-dat", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }], examples: [{ german: "In einem großen Haus.", english: "In a big house." }]},
  { id: "gross-m-pl-dat", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "DATIVE", type: "case" }], examples: [{ german: "In keinen großen Häusern.", english: "In no big houses." }]},
  // Genitive
  { id: "gross-m-m-gen", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Auto eines großen Mannes.", english: "The car of a tall man." }]},
  { id: "gross-m-f-gen", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Das Buch einer großen Frau.", english: "The book of a tall woman." }]},
  { id: "gross-m-n-gen", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Die Tür eines großen Hauses.", english: "The door of a big house." }]},
  { id: "gross-m-pl-gen", answer: "großen", context: "groß", labels: [{ label: "MIXED", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Die Türen keiner großen Häuser.", english: "The doors of no big houses." }]},

  // Strong declension (no article)
  // Nominative
  { id: "gross-s-m-nom", answer: "großer", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Großer Mann steht dort.", english: "Tall man stands there." }]},
  { id: "gross-s-f-nom", answer: "große", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Große Freude erfüllt mich.", english: "Great joy fills me." }]},
  { id: "gross-s-n-nom", answer: "großes", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Großes Glück ist selten.", english: "Great luck is rare." }]},
  { id: "gross-s-pl-nom", answer: "große", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "NOMINATIVE", type: "case" }], examples: [{ german: "Große Häuser stehen dort.", english: "Big houses stand there." }]},
  // Accusative
  { id: "gross-s-m-acc", answer: "großen", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich trinke großen Kaffee.", english: "I drink big coffee." }]},
  { id: "gross-s-f-acc", answer: "große", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich habe große Freude.", english: "I have great joy." }]},
  { id: "gross-s-n-acc", answer: "großes", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich habe großes Glück.", english: "I have great luck." }]},
  { id: "gross-s-pl-acc", answer: "große", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "ACCUSATIVE", type: "case" }], examples: [{ german: "Ich sehe große Häuser.", english: "I see big houses." }]},
  // Dative
  { id: "gross-s-m-dat", answer: "großem", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Mit großem Aufwand.", english: "With great effort." }]},
  { id: "gross-s-f-dat", answer: "großer", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Mit großer Freude.", english: "With great joy." }]},
  { id: "gross-s-n-dat", answer: "großem", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "DATIVE", type: "case" }], examples: [{ german: "Mit großem Glück.", english: "With great luck." }]},
  { id: "gross-s-pl-dat", answer: "großen", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "DATIVE", type: "case" }], examples: [{ german: "In großen Mengen.", english: "In large quantities." }]},
  // Genitive
  { id: "gross-s-m-gen", answer: "großen", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "MASCULINE", type: "gender", gender: "masculine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Trotz großen Aufwands.", english: "Despite great effort." }]},
  { id: "gross-s-f-gen", answer: "großer", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "FEMININE", type: "gender", gender: "feminine" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Trotz großer Freude.", english: "Despite great joy." }]},
  { id: "gross-s-n-gen", answer: "großen", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "NEUTER", type: "gender", gender: "neuter" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Trotz großen Glücks.", english: "Despite great luck." }]},
  { id: "gross-s-pl-gen", answer: "großer", context: "groß", labels: [{ label: "STRONG", type: "articleType" }, { label: "PLURAL", type: "number" }, { label: "GENITIVE", type: "case" }], examples: [{ german: "Trotz großer Häuser.", english: "Despite big houses." }]},
];

// ============ CHEATSHEET ============
export const adjEndingsCheatsheet: DeckCheatsheet = {
  title: "Adjective Endings — groß",
  tables: [
    {
      title: "Weak (after der/die/das)",
      rows: [
        ["", "Masc.", "Fem.", "Neut.", "Plural"],
        ["NOM", "-|e", "-|e", "-|e", "-|en"],
        ["ACC", "-|en", "-|e", "-|e", "-|en"],
        ["DAT", "-|en", "-|en", "-|en", "-|en"],
        ["GEN", "-|en", "-|en", "-|en", "-|en"],
      ],
    },
    {
      title: "Mixed (after ein/eine/kein)",
      rows: [
        ["", "Masc.", "Fem.", "Neut.", "Plural"],
        ["NOM", "-|er", "-|e", "-|es", "-|en"],
        ["ACC", "-|en", "-|e", "-|es", "-|en"],
        ["DAT", "-|en", "-|en", "-|en", "-|en"],
        ["GEN", "-|en", "-|en", "-|en", "-|en"],
      ],
    },
    {
      title: "Strong (no article)",
      rows: [
        ["", "Masc.", "Fem.", "Neut.", "Plural"],
        ["NOM", "-|er", "-|e", "-|es", "-|e"],
        ["ACC", "-|en", "-|e", "-|es", "-|e"],
        ["DAT", "-|em", "-|er", "-|em", "-|en"],
        ["GEN", "-|en", "-|er", "-|en", "-|er"],
      ],
    },
  ],
  notes: [
    "Weak: mostly -e (nom) and -en (everything else)",
    "Mixed: like weak except nom masc (-er), nom/acc neut (-es)",
    "Strong: adjective shows gender/case since no article does",
  ],
};
