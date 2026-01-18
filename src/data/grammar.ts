import type { GrammarLesson, GrammarExercise } from "../types";

// Verb conjugation data
interface VerbConjugation {
  infinitive: string;
  english: string;
  ich: string;
  du: string;
  er: string; // er/sie/es
  wir: string;
  ihr: string;
  sie: string; // sie/Sie
}

// =============================================================================
// VERB GROUPS
// =============================================================================

const seinHabenVerbs: VerbConjugation[] = [
  {
    infinitive: "sein",
    english: "to be",
    ich: "bin",
    du: "bist",
    er: "ist",
    wir: "sind",
    ihr: "seid",
    sie: "sind",
  },
  {
    infinitive: "haben",
    english: "to have",
    ich: "habe",
    du: "hast",
    er: "hat",
    wir: "haben",
    ihr: "habt",
    sie: "haben",
  },
];

const regularVerbs: VerbConjugation[] = [
  {
    infinitive: "kommen",
    english: "to come",
    ich: "komme",
    du: "kommst",
    er: "kommt",
    wir: "kommen",
    ihr: "kommt",
    sie: "kommen",
  },
  {
    infinitive: "gehen",
    english: "to go",
    ich: "gehe",
    du: "gehst",
    er: "geht",
    wir: "gehen",
    ihr: "geht",
    sie: "gehen",
  },
  {
    infinitive: "machen",
    english: "to do/make",
    ich: "mache",
    du: "machst",
    er: "macht",
    wir: "machen",
    ihr: "macht",
    sie: "machen",
  },
  {
    infinitive: "wohnen",
    english: "to live",
    ich: "wohne",
    du: "wohnst",
    er: "wohnt",
    wir: "wohnen",
    ihr: "wohnt",
    sie: "wohnen",
  },
  {
    infinitive: "spielen",
    english: "to play",
    ich: "spiele",
    du: "spielst",
    er: "spielt",
    wir: "spielen",
    ihr: "spielt",
    sie: "spielen",
  },
  {
    infinitive: "lernen",
    english: "to learn",
    ich: "lerne",
    du: "lernst",
    er: "lernt",
    wir: "lernen",
    ihr: "lernt",
    sie: "lernen",
  },
  {
    infinitive: "trinken",
    english: "to drink",
    ich: "trinke",
    du: "trinkst",
    er: "trinkt",
    wir: "trinken",
    ihr: "trinkt",
    sie: "trinken",
  },
];

const stemChangingEIVerbs: VerbConjugation[] = [
  {
    infinitive: "essen",
    english: "to eat",
    ich: "esse",
    du: "isst",
    er: "isst",
    wir: "essen",
    ihr: "esst",
    sie: "essen",
  },
  {
    infinitive: "lesen",
    english: "to read",
    ich: "lese",
    du: "liest",
    er: "liest",
    wir: "lesen",
    ihr: "lest",
    sie: "lesen",
  },
  {
    infinitive: "sehen",
    english: "to see",
    ich: "sehe",
    du: "siehst",
    er: "sieht",
    wir: "sehen",
    ihr: "seht",
    sie: "sehen",
  },
  {
    infinitive: "sprechen",
    english: "to speak",
    ich: "spreche",
    du: "sprichst",
    er: "spricht",
    wir: "sprechen",
    ihr: "sprecht",
    sie: "sprechen",
  },
  {
    infinitive: "nehmen",
    english: "to take",
    ich: "nehme",
    du: "nimmst",
    er: "nimmt",
    wir: "nehmen",
    ihr: "nehmt",
    sie: "nehmen",
  },
  {
    infinitive: "geben",
    english: "to give",
    ich: "gebe",
    du: "gibst",
    er: "gibt",
    wir: "geben",
    ihr: "gebt",
    sie: "geben",
  },
];

const stemChangingAÄVerbs: VerbConjugation[] = [
  {
    infinitive: "schlafen",
    english: "to sleep",
    ich: "schlafe",
    du: "schläfst",
    er: "schläft",
    wir: "schlafen",
    ihr: "schlaft",
    sie: "schlafen",
  },
  {
    infinitive: "fahren",
    english: "to drive",
    ich: "fahre",
    du: "fährst",
    er: "fährt",
    wir: "fahren",
    ihr: "fahrt",
    sie: "fahren",
  },
];

const modalVerbs: VerbConjugation[] = [
  {
    infinitive: "können",
    english: "can",
    ich: "kann",
    du: "kannst",
    er: "kann",
    wir: "können",
    ihr: "könnt",
    sie: "können",
  },
  {
    infinitive: "müssen",
    english: "must",
    ich: "muss",
    du: "musst",
    er: "muss",
    wir: "müssen",
    ihr: "müsst",
    sie: "müssen",
  },
  {
    infinitive: "wollen",
    english: "to want",
    ich: "will",
    du: "willst",
    er: "will",
    wir: "wollen",
    ihr: "wollt",
    sie: "wollen",
  },
  {
    infinitive: "wissen",
    english: "to know",
    ich: "weiß",
    du: "weißt",
    er: "weiß",
    wir: "wissen",
    ihr: "wisst",
    sie: "wissen",
  },
];

const ierenTenVerbs: VerbConjugation[] = [
  {
    infinitive: "arbeiten",
    english: "to work",
    ich: "arbeite",
    du: "arbeitest",
    er: "arbeitet",
    wir: "arbeiten",
    ihr: "arbeitet",
    sie: "arbeiten",
  },
];

// =============================================================================
// EXERCISE GENERATION
// =============================================================================

type Pronoun = "ich" | "du" | "er" | "wir" | "ihr" | "sie";
const pronouns: Pronoun[] = ["ich", "du", "er", "wir", "ihr", "sie"];

function generateConjugationExercises(
  verbs: VerbConjugation[],
  idPrefix: string
): GrammarExercise[] {
  const exercises: GrammarExercise[] = [];

  for (const verb of verbs) {
    for (const pronoun of pronouns) {
      exercises.push({
        id: `${idPrefix}_${verb.infinitive}_${pronoun}`,
        sentence: `${pronoun} ___ [${verb.infinitive}|${verb.english}]`,
        answer: verb[pronoun],
        hint: `${verb.infinitive} - ${verb.english}`,
      });
    }
  }

  return exercises;
}

// =============================================================================
// CASE/ARTICLE EXERCISES
// =============================================================================

const accusativeExercises: GrammarExercise[] = [
  // Masculine (der → den)
  {
    id: "acc_1",
    sentence: "Ich sehe ___ Mann. [the man - accusative]",
    answer: "den",
    hint: "der → den (masculine accusative)",
  },
  {
    id: "acc_2",
    sentence: "Sie kauft ___ Apfel. [the apple - accusative]",
    answer: "den",
    hint: "der → den (masculine accusative)",
  },
  {
    id: "acc_3",
    sentence: "Wir haben ___ Hund. [the dog - accusative]",
    answer: "den",
    hint: "der → den (masculine accusative)",
  },
  {
    id: "acc_4",
    sentence: "Er liest ___ Brief. [the letter - accusative]",
    answer: "den",
    hint: "der → den (masculine accusative)",
  },
  {
    id: "acc_5",
    sentence: "Ich trinke ___ Kaffee. [the coffee - accusative]",
    answer: "den",
    hint: "der → den (masculine accusative)",
  },
  // Feminine (die → die, no change)
  {
    id: "acc_6",
    sentence: "Ich sehe ___ Frau. [the woman - accusative]",
    answer: "die",
    hint: "die → die (feminine stays the same)",
  },
  {
    id: "acc_7",
    sentence: "Er kauft ___ Zeitung. [the newspaper - accusative]",
    answer: "die",
    hint: "die → die (feminine stays the same)",
  },
  // Neuter (das → das, no change)
  {
    id: "acc_8",
    sentence: "Sie liest ___ Buch. [the book - accusative]",
    answer: "das",
    hint: "das → das (neuter stays the same)",
  },
  {
    id: "acc_9",
    sentence: "Wir essen ___ Brot. [the bread - accusative]",
    answer: "das",
    hint: "das → das (neuter stays the same)",
  },
  // Indefinite articles (ein → einen for masculine)
  {
    id: "acc_10",
    sentence: "Ich habe ___ Bruder. [a brother - accusative]",
    answer: "einen",
    hint: "ein → einen (masculine indefinite accusative)",
  },
  {
    id: "acc_11",
    sentence: "Sie sucht ___ Job. [a job - accusative]",
    answer: "einen",
    hint: "ein → einen (masculine indefinite accusative)",
  },
  {
    id: "acc_12",
    sentence: "Er braucht ___ Computer. [a computer - accusative]",
    answer: "einen",
    hint: "ein → einen (masculine indefinite accusative)",
  },
];

const dativeExercises: GrammarExercise[] = [
  // mit (with) - always dative
  {
    id: "dat_1",
    sentence: "Ich fahre mit ___ Bus. [the bus - dative]",
    answer: "dem",
    hint: "mit + dative: der → dem",
  },
  {
    id: "dat_2",
    sentence: "Sie spricht mit ___ Mann. [the man - dative]",
    answer: "dem",
    hint: "mit + dative: der → dem",
  },
  {
    id: "dat_3",
    sentence: "Wir gehen mit ___ Frau. [the woman - dative]",
    answer: "der",
    hint: "mit + dative: die → der",
  },
  {
    id: "dat_4",
    sentence: "Er spielt mit ___ Kind. [the child - dative]",
    answer: "dem",
    hint: "mit + dative: das → dem",
  },
  // von (from) - always dative
  {
    id: "dat_5",
    sentence: "Das Buch ist von ___ Lehrer. [the teacher - dative]",
    answer: "dem",
    hint: "von + dative: der → dem",
  },
  {
    id: "dat_6",
    sentence: "Ich komme von ___ Arbeit. [the work - dative]",
    answer: "der",
    hint: "von + dative: die → der",
  },
  // bei (at/near) - always dative
  {
    id: "dat_7",
    sentence: "Ich wohne bei ___ Familie. [the family - dative]",
    answer: "der",
    hint: "bei + dative: die → der",
  },
  {
    id: "dat_8",
    sentence: "Er arbeitet bei ___ Firma. [the company - dative]",
    answer: "der",
    hint: "bei + dative: die → der",
  },
  // zu (to) - always dative
  {
    id: "dat_9",
    sentence: "Ich gehe zu ___ Arzt. [the doctor - dative]",
    answer: "dem",
    hint: "zu + dative: der → dem",
  },
  {
    id: "dat_10",
    sentence: "Wir fahren zu ___ Schule. [the school - dative]",
    answer: "der",
    hint: "zu + dative: die → der",
  },
  // aus (from/out of) - always dative
  {
    id: "dat_11",
    sentence: "Er kommt aus ___ Haus. [the house - dative]",
    answer: "dem",
    hint: "aus + dative: das → dem",
  },
  {
    id: "dat_12",
    sentence: "Sie kommt aus ___ Stadt. [the city - dative]",
    answer: "der",
    hint: "aus + dative: die → der",
  },
];

// =============================================================================
// GRAMMAR LESSONS
// =============================================================================

export const grammarLessons: GrammarLesson[] = [
  // Conjugation lessons
  {
    id: "sein-haben",
    name: "sein & haben",
    description: "The two most important German verbs",
    exercises: generateConjugationExercises(seinHabenVerbs, "sh"),
  },
  {
    id: "regular-verbs",
    name: "Regular Verbs",
    description: "Common verbs with standard conjugation patterns",
    exercises: generateConjugationExercises(regularVerbs, "reg"),
  },
  {
    id: "stem-changing-ei",
    name: "Stem-Changing (e→i)",
    description: "Verbs where e changes to i in du/er forms",
    exercises: generateConjugationExercises(stemChangingEIVerbs, "ei"),
  },
  {
    id: "stem-changing-aä",
    name: "Stem-Changing (a→ä)",
    description: "Verbs where a changes to ä in du/er forms",
    exercises: generateConjugationExercises(stemChangingAÄVerbs, "aä"),
  },
  {
    id: "modal-verbs",
    name: "Modal Verbs",
    description: "können, müssen, wollen, wissen",
    exercises: generateConjugationExercises(modalVerbs, "mod"),
  },
  {
    id: "ieren-ten-verbs",
    name: "-ieren & -ten Verbs",
    description: "Verbs with special stem endings",
    exercises: generateConjugationExercises(ierenTenVerbs, "it"),
  },
  // Case/article lessons
  {
    id: "accusative-articles",
    name: "Accusative Articles",
    description: "der→den and ein→einen in accusative case",
    exercises: accusativeExercises,
  },
  {
    id: "dative-prepositions",
    name: "Dative Prepositions",
    description: "mit, von, bei, zu, aus + dative articles",
    exercises: dativeExercises,
  },
];

// Legacy export for backwards compatibility
export const conjugationExercises = [
  ...generateConjugationExercises(seinHabenVerbs, "sh"),
  ...generateConjugationExercises(regularVerbs, "reg"),
  ...generateConjugationExercises(stemChangingEIVerbs, "ei"),
  ...generateConjugationExercises(stemChangingAÄVerbs, "aä"),
  ...generateConjugationExercises(modalVerbs, "mod"),
  ...generateConjugationExercises(ierenTenVerbs, "it"),
];

export function getGrammarLesson(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id);
}
