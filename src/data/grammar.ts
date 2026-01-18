import type { DeckCheatsheet, GrammarLesson, GrammarExercise } from "../types";

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
// CHEATSHEET
// =============================================================================

const genderRulesCheatsheet: DeckCheatsheet = {
  title: "Gender Rules: der/die/das",
  tables: [
    {
      title: "der (masculine)",
      rows: [
        ["Pattern", "Examples"],
        ["Male persons", "Mann, Vater, Bruder"],
        ["Days, months, seasons", "Montag, Januar, Frühling"],
        ["Weather", "Regen, Schnee, Wind"],
        ["Alcoholic drinks", "Wein, Whisky (not Bier)"],
        ["Car brands", "BMW, Mercedes, Audi"],
      ],
    },
    {
      title: "die (feminine)",
      rows: [
        ["Pattern", "Examples"],
        ["Female persons", "Frau, Mutter, Schwester"],
        ["-ung", "Zeitung, Wohnung, Übung"],
        ["-heit / -keit", "Freiheit, Möglichkeit"],
        ["-schaft", "Freundschaft, Wirtschaft"],
        ["-tion / -ie", "Information, Energie"],
        ["Numbers as nouns", "die Eins, die Zwei"],
      ],
    },
    {
      title: "das (neuter)",
      rows: [
        ["Pattern", "Examples"],
        ["-chen / -lein", "Mädchen, Büchlein"],
        ["Infinitives as nouns", "das Essen, das Lernen"],
        ["-um / -ment", "Museum, Dokument"],
      ],
    },
  ],
};

// =============================================================================
// GRAMMAR LESSONS
// =============================================================================

export const grammarLessons: GrammarLesson[] = [
  {
    type: "grammar",
    id: "gender-rules",
    name: "Gender Rules",
    description: "Learn patterns to predict noun genders. Type der, die, or das.",
    category: "articles",
    exercises: genderRulesExercises,
    cheatsheet: genderRulesCheatsheet,
  },
];

export function getGrammarLesson(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id);
}
