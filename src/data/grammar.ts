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
// DER/DIE/DAS (NOUN GENDER RULES) EXERCISES
// =============================================================================

// Each exercise shows a category/rule with examples, user answers der/die/das
const genderRulesExercises: GrammarExercise[] = [
  // DER rules
  {
    id: "gender_male_persons",
    sentence: "___ [Male persons|Mann, Vater, Bruder, Sohn, Onkel]",
    answer: "der",
    hint: "Male people are masculine",
  },
  {
    id: "gender_days",
    sentence: "___ [Days of week|Montag, Dienstag, Mittwoch, Freitag]",
    answer: "der",
    hint: "Days are masculine",
  },
  {
    id: "gender_months",
    sentence: "___ [Months|Januar, Februar, März, April, Mai]",
    answer: "der",
    hint: "Months are masculine",
  },
  {
    id: "gender_seasons",
    sentence: "___ [Seasons|Frühling, Sommer, Herbst, Winter]",
    answer: "der",
    hint: "Seasons are masculine",
  },
  {
    id: "gender_weather",
    sentence: "___ [Weather|Regen, Schnee, Wind, Nebel, Sturm]",
    answer: "der",
    hint: "Weather phenomena are masculine",
  },
  {
    id: "gender_alcohol",
    sentence: "___ [Alcoholic drinks|Wein, Whisky, Wodka, Rum]",
    answer: "der",
    hint: "Alcoholic drinks are masculine (except das Bier)",
  },
  {
    id: "gender_car_brands",
    sentence: "___ [Car brands|BMW, Mercedes, Audi, Volkswagen]",
    answer: "der",
    hint: "Car brands are masculine",
  },

  // DIE rules
  {
    id: "gender_female_persons",
    sentence: "___ [Female persons|Frau, Mutter, Schwester, Tochter]",
    answer: "die",
    hint: "Female people are feminine",
  },
  {
    id: "gender_ung",
    sentence: "___ [Words ending in -ung|Zeitung, Wohnung, Übung, Lösung]",
    answer: "die",
    hint: "-ung endings are always feminine",
  },
  {
    id: "gender_heit",
    sentence: "___ [Words ending in -heit|Freiheit, Gesundheit, Wahrheit]",
    answer: "die",
    hint: "-heit endings are always feminine",
  },
  {
    id: "gender_keit",
    sentence: "___ [Words ending in -keit|Möglichkeit, Schwierigkeit, Fähigkeit]",
    answer: "die",
    hint: "-keit endings are always feminine",
  },
  {
    id: "gender_schaft",
    sentence: "___ [Words ending in -schaft|Freundschaft, Wirtschaft, Wissenschaft]",
    answer: "die",
    hint: "-schaft endings are always feminine",
  },
  {
    id: "gender_tion",
    sentence: "___ [Words ending in -tion|Information, Nation, Situation]",
    answer: "die",
    hint: "-tion endings are always feminine",
  },
  {
    id: "gender_ie",
    sentence: "___ [Words ending in -ie|Energie, Fantasie, Demokratie]",
    answer: "die",
    hint: "-ie endings are always feminine",
  },
  {
    id: "gender_numbers",
    sentence: "___ [Numbers as nouns|Eins, Zwei, Drei, Vier]",
    answer: "die",
    hint: "Numbers used as nouns are feminine",
  },

  // DAS rules
  {
    id: "gender_chen",
    sentence: "___ [Diminutives -chen|Mädchen, Brötchen, Kätzchen, Häuschen]",
    answer: "das",
    hint: "-chen diminutives are always neuter",
  },
  {
    id: "gender_lein",
    sentence: "___ [Diminutives -lein|Büchlein, Fräulein, Männlein]",
    answer: "das",
    hint: "-lein diminutives are always neuter",
  },
  {
    id: "gender_infinitives",
    sentence: "___ [Infinitives as nouns|Essen, Trinken, Leben, Lernen]",
    answer: "das",
    hint: "Infinitives used as nouns are neuter",
  },
  {
    id: "gender_um",
    sentence: "___ [Words ending in -um|Museum, Zentrum, Datum, Studium]",
    answer: "das",
    hint: "-um endings are neuter",
  },
  {
    id: "gender_ment",
    sentence: "___ [Words ending in -ment|Instrument, Dokument, Experiment]",
    answer: "das",
    hint: "-ment endings are neuter",
  },
  {
    id: "gender_metals",
    sentence: "___ [Metals|Gold, Silber, Eisen, Kupfer]",
    answer: "das",
    hint: "Metals are neuter",
  },
  {
    id: "gender_colors",
    sentence: "___ [Colors as nouns|Blau, Grün, Rot, Gelb]",
    answer: "das",
    hint: "Colors used as nouns are neuter",
  },
  {
    id: "gender_letters",
    sentence: "___ [Letters|A, B, C, D]",
    answer: "das",
    hint: "Letters of the alphabet are neuter",
  },
];

// =============================================================================
// CASE/ARTICLE EXERCISES
// =============================================================================

const accusativeExercises: GrammarExercise[] = [
  // Masculine (der → den)
  { id: "acc_1", sentence: "Ich sehe ___ [der Mann|the man]", answer: "den", hint: "der → den" },
  { id: "acc_2", sentence: "Sie kauft ___ [der Apfel|the apple]", answer: "den", hint: "der → den" },
  { id: "acc_3", sentence: "Wir haben ___ [der Hund|the dog]", answer: "den", hint: "der → den" },
  { id: "acc_4", sentence: "Er liest ___ [der Brief|the letter]", answer: "den", hint: "der → den" },
  { id: "acc_5", sentence: "Ich trinke ___ [der Kaffee|the coffee]", answer: "den", hint: "der → den" },
  // Feminine (die → die)
  { id: "acc_6", sentence: "Ich sehe ___ [die Frau|the woman]", answer: "die", hint: "die → die" },
  { id: "acc_7", sentence: "Er kauft ___ [die Zeitung|the newspaper]", answer: "die", hint: "die → die" },
  // Neuter (das → das)
  { id: "acc_8", sentence: "Sie liest ___ [das Buch|the book]", answer: "das", hint: "das → das" },
  { id: "acc_9", sentence: "Wir essen ___ [das Brot|the bread]", answer: "das", hint: "das → das" },
  // Indefinite (ein → einen)
  { id: "acc_10", sentence: "Ich habe ___ [ein Bruder|a brother]", answer: "einen", hint: "ein → einen" },
  { id: "acc_11", sentence: "Sie sucht ___ [ein Job|a job]", answer: "einen", hint: "ein → einen" },
  { id: "acc_12", sentence: "Er braucht ___ [ein Computer|a computer]", answer: "einen", hint: "ein → einen" },
];

const dativeExercises: GrammarExercise[] = [
  // mit (with) - always dative
  { id: "dat_1", sentence: "Ich fahre mit ___ [der Bus|the bus]", answer: "dem", hint: "der → dem" },
  { id: "dat_2", sentence: "Sie spricht mit ___ [der Mann|the man]", answer: "dem", hint: "der → dem" },
  { id: "dat_3", sentence: "Wir gehen mit ___ [die Frau|the woman]", answer: "der", hint: "die → der" },
  { id: "dat_4", sentence: "Er spielt mit ___ [das Kind|the child]", answer: "dem", hint: "das → dem" },
  // von (from) - always dative
  { id: "dat_5", sentence: "Das Buch ist von ___ [der Lehrer|the teacher]", answer: "dem", hint: "der → dem" },
  { id: "dat_6", sentence: "Ich komme von ___ [die Arbeit|the work]", answer: "der", hint: "die → der" },
  // bei (at/near) - always dative
  { id: "dat_7", sentence: "Ich wohne bei ___ [die Familie|the family]", answer: "der", hint: "die → der" },
  { id: "dat_8", sentence: "Er arbeitet bei ___ [die Firma|the company]", answer: "der", hint: "die → der" },
  // zu (to) - always dative
  { id: "dat_9", sentence: "Ich gehe zu ___ [der Arzt|the doctor]", answer: "dem", hint: "der → dem" },
  { id: "dat_10", sentence: "Wir fahren zu ___ [die Schule|the school]", answer: "der", hint: "die → der" },
  // aus (from/out of) - always dative
  { id: "dat_11", sentence: "Er kommt aus ___ [das Haus|the house]", answer: "dem", hint: "das → dem" },
  { id: "dat_12", sentence: "Sie kommt aus ___ [die Stadt|the city]", answer: "der", hint: "die → der" },
];

// =============================================================================
// GRAMMAR LESSONS
// =============================================================================

export const grammarLessons: GrammarLesson[] = [
  // Gender rules
  {
    id: "gender-rules",
    name: "der/die/das Rules",
    description: "Learn patterns to predict noun genders. Type der, die, or das.",
    exercises: genderRulesExercises,
  },
  // Case exercises
  {
    id: "accusative-articles",
    name: "Accusative Case",
    description: "Fill in the correct article (der→den, die→die, das→das)",
    exercises: accusativeExercises,
  },
  {
    id: "dative-prepositions",
    name: "Dative Case",
    description: "Fill in the correct article (der→dem, die→der, das→dem)",
    exercises: dativeExercises,
  },
  // Conjugation
  {
    id: "sein-haben",
    name: "sein & haben",
    description: "The two most important irregular verbs - memorize these conjugations:",
    exercises: generateConjugationExercises(seinHabenVerbs, "sh"),
  },
  {
    id: "regular-verbs",
    name: "Regular Verbs",
    description: "Regular verbs follow standard endings based on the pronoun:",
    exercises: generateConjugationExercises(regularVerbs, "reg"),
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
