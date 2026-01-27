import type { GrammarLesson, GrammarExercise } from "../types";

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
// AKKUSATIV EXERCISES
// =============================================================================

const accusativeExercises: GrammarExercise[] = [
  // ===================
  // DEFINITE ARTICLES
  // ===================

  // Masculine (der → den)
  { id: "akk_def_m_1", sentence: "Ich sehe ___ [der Mann|the man]", answer: "den", hint: "der → den" },
  { id: "akk_def_m_2", sentence: "Sie kauft ___ [der Apfel|the apple]", answer: "den", hint: "der → den" },
  { id: "akk_def_m_3", sentence: "Wir haben ___ [der Hund|the dog]", answer: "den", hint: "der → den" },
  { id: "akk_def_m_4", sentence: "Er sucht ___ [der Schlüssel|the key]", answer: "den", hint: "der → den" },
  { id: "akk_def_m_5", sentence: "Sie findet ___ [der Fehler|the mistake]", answer: "den", hint: "der → den" },
  { id: "akk_def_m_6", sentence: "Ich brauche ___ [der Stift|the pen]", answer: "den", hint: "der → den" },

  // Feminine (die → die)
  { id: "akk_def_f_1", sentence: "Ich sehe ___ [die Frau|the woman]", answer: "die", hint: "die → die" },
  { id: "akk_def_f_2", sentence: "Er kauft ___ [die Zeitung|the newspaper]", answer: "die", hint: "die → die" },
  { id: "akk_def_f_3", sentence: "Wir haben ___ [die Katze|the cat]", answer: "die", hint: "die → die" },
  { id: "akk_def_f_4", sentence: "Sie sucht ___ [die Tasche|the bag]", answer: "die", hint: "die → die" },
  { id: "akk_def_f_5", sentence: "Er findet ___ [die Lösung|the solution]", answer: "die", hint: "die → die" },
  { id: "akk_def_f_6", sentence: "Ich brauche ___ [die Hilfe|the help]", answer: "die", hint: "die → die" },

  // Neuter (das → das)
  { id: "akk_def_n_1", sentence: "Sie liest ___ [das Buch|the book]", answer: "das", hint: "das → das" },
  { id: "akk_def_n_2", sentence: "Wir kaufen ___ [das Auto|the car]", answer: "das", hint: "das → das" },
  { id: "akk_def_n_3", sentence: "Er hat ___ [das Kind|the child]", answer: "das", hint: "das → das" },
  { id: "akk_def_n_4", sentence: "Ich suche ___ [das Handy|the phone]", answer: "das", hint: "das → das" },
  { id: "akk_def_n_5", sentence: "Sie findet ___ [das Geld|the money]", answer: "das", hint: "das → das" },
  { id: "akk_def_n_6", sentence: "Wir brauchen ___ [das Wasser|the water]", answer: "das", hint: "das → das" },

  // Plural (die → die)
  { id: "akk_def_pl_1", sentence: "Ich sehe ___ [die Kinder|the children]", answer: "die", hint: "die → die (pl)" },
  { id: "akk_def_pl_2", sentence: "Er kauft ___ [die Äpfel|the apples]", answer: "die", hint: "die → die (pl)" },
  { id: "akk_def_pl_3", sentence: "Wir haben ___ [die Bücher|the books]", answer: "die", hint: "die → die (pl)" },
  { id: "akk_def_pl_4", sentence: "Sie sucht ___ [die Schuhe|the shoes]", answer: "die", hint: "die → die (pl)" },

  // ===================
  // INDEFINITE ARTICLES
  // ===================

  // Masculine (ein → einen)
  { id: "akk_ind_m_1", sentence: "Ich habe ___ [ein Bruder|a brother]", answer: "einen", hint: "ein → einen" },
  { id: "akk_ind_m_2", sentence: "Sie sucht ___ [ein Job|a job]", answer: "einen", hint: "ein → einen" },
  { id: "akk_ind_m_3", sentence: "Er braucht ___ [ein Computer|a computer]", answer: "einen", hint: "ein → einen" },
  { id: "akk_ind_m_4", sentence: "Wir kaufen ___ [ein Tisch|a table]", answer: "einen", hint: "ein → einen" },
  { id: "akk_ind_m_5", sentence: "Sie findet ___ [ein Platz|a seat]", answer: "einen", hint: "ein → einen" },
  { id: "akk_ind_m_6", sentence: "Ich sehe ___ [ein Vogel|a bird]", answer: "einen", hint: "ein → einen" },

  // Feminine (eine → eine)
  { id: "akk_ind_f_1", sentence: "Er hat ___ [eine Schwester|a sister]", answer: "eine", hint: "eine → eine" },
  { id: "akk_ind_f_2", sentence: "Ich kaufe ___ [eine Lampe|a lamp]", answer: "eine", hint: "eine → eine" },
  { id: "akk_ind_f_3", sentence: "Sie sucht ___ [eine Wohnung|an apartment]", answer: "eine", hint: "eine → eine" },
  { id: "akk_ind_f_4", sentence: "Wir brauchen ___ [eine Pause|a break]", answer: "eine", hint: "eine → eine" },
  { id: "akk_ind_f_5", sentence: "Er findet ___ [eine Idee|an idea]", answer: "eine", hint: "eine → eine" },

  // Neuter (ein → ein)
  { id: "akk_ind_n_1", sentence: "Sie hat ___ [ein Kind|a child]", answer: "ein", hint: "ein → ein" },
  { id: "akk_ind_n_2", sentence: "Ich kaufe ___ [ein Buch|a book]", answer: "ein", hint: "ein → ein" },
  { id: "akk_ind_n_3", sentence: "Er braucht ___ [ein Fahrrad|a bicycle]", answer: "ein", hint: "ein → ein" },
  { id: "akk_ind_n_4", sentence: "Wir suchen ___ [ein Hotel|a hotel]", answer: "ein", hint: "ein → ein" },
  { id: "akk_ind_n_5", sentence: "Sie findet ___ [ein Geschenk|a gift]", answer: "ein", hint: "ein → ein" },

  // ===================
  // NEGATIVE ARTICLES
  // ===================

  // Masculine (kein → keinen)
  { id: "akk_neg_m_1", sentence: "Ich habe ___ [kein Bruder|no brother]", answer: "keinen", hint: "kein → keinen" },
  { id: "akk_neg_m_2", sentence: "Er sieht ___ [kein Fehler|no mistake]", answer: "keinen", hint: "kein → keinen" },
  { id: "akk_neg_m_3", sentence: "Sie findet ___ [kein Platz|no seat]", answer: "keinen", hint: "kein → keinen" },
  { id: "akk_neg_m_4", sentence: "Wir brauchen ___ [kein Arzt|no doctor]", answer: "keinen", hint: "kein → keinen" },

  // Feminine (keine → keine)
  { id: "akk_neg_f_1", sentence: "Ich habe ___ [keine Zeit|no time]", answer: "keine", hint: "keine → keine" },
  { id: "akk_neg_f_2", sentence: "Er findet ___ [keine Lösung|no solution]", answer: "keine", hint: "keine → keine" },
  { id: "akk_neg_f_3", sentence: "Sie braucht ___ [keine Hilfe|no help]", answer: "keine", hint: "keine → keine" },
  { id: "akk_neg_f_4", sentence: "Wir sehen ___ [keine Gefahr|no danger]", answer: "keine", hint: "keine → keine" },

  // Neuter (kein → kein)
  { id: "akk_neg_n_1", sentence: "Ich habe ___ [kein Geld|no money]", answer: "kein", hint: "kein → kein" },
  { id: "akk_neg_n_2", sentence: "Er braucht ___ [kein Auto|no car]", answer: "kein", hint: "kein → kein" },
  { id: "akk_neg_n_3", sentence: "Sie findet ___ [kein Problem|no problem]", answer: "kein", hint: "kein → kein" },
  { id: "akk_neg_n_4", sentence: "Wir haben ___ [kein Zimmer|no room]", answer: "kein", hint: "kein → kein" },

  // Plural (keine → keine)
  { id: "akk_neg_pl_1", sentence: "Ich habe ___ [keine Freunde|no friends]", answer: "keine", hint: "keine → keine (pl)" },
  { id: "akk_neg_pl_2", sentence: "Er sieht ___ [keine Probleme|no problems]", answer: "keine", hint: "keine → keine (pl)" },
  { id: "akk_neg_pl_3", sentence: "Sie findet ___ [keine Fehler|no mistakes]", answer: "keine", hint: "keine → keine (pl)" },
  { id: "akk_neg_pl_4", sentence: "Wir brauchen ___ [keine Bücher|no books]", answer: "keine", hint: "keine → keine (pl)" },
];

// =============================================================================
// DATIV EXERCISES
// =============================================================================

const dativeExercises: GrammarExercise[] = [
  // ===================
  // DEFINITE ARTICLES
  // ===================

  // Masculine (der → dem)
  { id: "dat_def_m_1", sentence: "Ich fahre mit ___ [der Bus|the bus]", answer: "dem", hint: "der → dem" },
  { id: "dat_def_m_2", sentence: "Sie spricht mit ___ [der Mann|the man]", answer: "dem", hint: "der → dem" },
  { id: "dat_def_m_3", sentence: "Ich gehe zu ___ [der Arzt|the doctor]", answer: "dem", hint: "der → dem" },
  { id: "dat_def_m_4", sentence: "Das Buch ist von ___ [der Lehrer|the teacher]", answer: "dem", hint: "der → dem" },
  { id: "dat_def_m_5", sentence: "Er wohnt bei ___ [der Freund|the friend]", answer: "dem", hint: "der → dem" },
  { id: "dat_def_m_6", sentence: "Sie kommt aus ___ [der Park|the park]", answer: "dem", hint: "der → dem" },

  // Feminine (die → der)
  { id: "dat_def_f_1", sentence: "Wir gehen mit ___ [die Frau|the woman]", answer: "der", hint: "die → der" },
  { id: "dat_def_f_2", sentence: "Ich komme von ___ [die Arbeit|the work]", answer: "der", hint: "die → der" },
  { id: "dat_def_f_3", sentence: "Ich wohne bei ___ [die Familie|the family]", answer: "der", hint: "die → der" },
  { id: "dat_def_f_4", sentence: "Wir fahren zu ___ [die Schule|the school]", answer: "der", hint: "die → der" },
  { id: "dat_def_f_5", sentence: "Sie kommt aus ___ [die Stadt|the city]", answer: "der", hint: "die → der" },
  { id: "dat_def_f_6", sentence: "Er arbeitet bei ___ [die Firma|the company]", answer: "der", hint: "die → der" },

  // Neuter (das → dem)
  { id: "dat_def_n_1", sentence: "Er spielt mit ___ [das Kind|the child]", answer: "dem", hint: "das → dem" },
  { id: "dat_def_n_2", sentence: "Er kommt aus ___ [das Haus|the house]", answer: "dem", hint: "das → dem" },
  { id: "dat_def_n_3", sentence: "Ich gehe zu ___ [das Büro|the office]", answer: "dem", hint: "das → dem" },
  { id: "dat_def_n_4", sentence: "Sie wohnt bei ___ [das Hotel|the hotel]", answer: "dem", hint: "das → dem" },
  { id: "dat_def_n_5", sentence: "Wir fahren mit ___ [das Auto|the car]", answer: "dem", hint: "das → dem" },
  { id: "dat_def_n_6", sentence: "Das Geschenk ist von ___ [das Mädchen|the girl]", answer: "dem", hint: "das → dem" },

  // Plural (die → den + n)
  { id: "dat_def_pl_1", sentence: "Ich spiele mit ___ [die Kinder|the children]", answer: "den", hint: "die → den (pl)" },
  { id: "dat_def_pl_2", sentence: "Er kommt von ___ [die Eltern|the parents]", answer: "den", hint: "die → den (pl)" },
  { id: "dat_def_pl_3", sentence: "Sie wohnt bei ___ [die Freunde|the friends]", answer: "den", hint: "die → den (pl)" },
  { id: "dat_def_pl_4", sentence: "Wir fahren zu ___ [die Berge|the mountains]", answer: "den", hint: "die → den (pl)" },

  // ===================
  // INDEFINITE ARTICLES
  // ===================

  // Masculine (ein → einem)
  { id: "dat_ind_m_1", sentence: "Ich fahre mit ___ [ein Freund|a friend]", answer: "einem", hint: "ein → einem" },
  { id: "dat_ind_m_2", sentence: "Sie wohnt bei ___ [ein Onkel|an uncle]", answer: "einem", hint: "ein → einem" },
  { id: "dat_ind_m_3", sentence: "Er geht zu ___ [ein Arzt|a doctor]", answer: "einem", hint: "ein → einem" },
  { id: "dat_ind_m_4", sentence: "Ich komme von ___ [ein Kurs|a course]", answer: "einem", hint: "ein → einem" },
  { id: "dat_ind_m_5", sentence: "Das Paket ist von ___ [ein Kollege|a colleague]", answer: "einem", hint: "ein → einem" },

  // Feminine (eine → einer)
  { id: "dat_ind_f_1", sentence: "Er spricht mit ___ [eine Frau|a woman]", answer: "einer", hint: "eine → einer" },
  { id: "dat_ind_f_2", sentence: "Sie kommt aus ___ [eine Stadt|a city]", answer: "einer", hint: "eine → einer" },
  { id: "dat_ind_f_3", sentence: "Ich wohne bei ___ [eine Familie|a family]", answer: "einer", hint: "eine → einer" },
  { id: "dat_ind_f_4", sentence: "Wir gehen zu ___ [eine Party|a party]", answer: "einer", hint: "eine → einer" },
  { id: "dat_ind_f_5", sentence: "Das Buch ist von ___ [eine Autorin|a female author]", answer: "einer", hint: "eine → einer" },

  // Neuter (ein → einem)
  { id: "dat_ind_n_1", sentence: "Sie spielt mit ___ [ein Kind|a child]", answer: "einem", hint: "ein → einem" },
  { id: "dat_ind_n_2", sentence: "Er kommt aus ___ [ein Dorf|a village]", answer: "einem", hint: "ein → einem" },
  { id: "dat_ind_n_3", sentence: "Ich fahre zu ___ [ein Konzert|a concert]", answer: "einem", hint: "ein → einem" },
  { id: "dat_ind_n_4", sentence: "Wir wohnen bei ___ [ein Hotel|a hotel]", answer: "einem", hint: "ein → einem" },
  { id: "dat_ind_n_5", sentence: "Das Geld ist von ___ [ein Unternehmen|a company]", answer: "einem", hint: "ein → einem" },

  // ===================
  // NEGATIVE ARTICLES
  // ===================

  // Masculine (kein → keinem)
  { id: "dat_neg_m_1", sentence: "Ich fahre mit ___ [kein Bus|no bus]", answer: "keinem", hint: "kein → keinem" },
  { id: "dat_neg_m_2", sentence: "Sie spricht mit ___ [kein Mann|no man]", answer: "keinem", hint: "kein → keinem" },
  { id: "dat_neg_m_3", sentence: "Er wohnt bei ___ [kein Freund|no friend]", answer: "keinem", hint: "kein → keinem" },
  { id: "dat_neg_m_4", sentence: "Ich gehe zu ___ [kein Arzt|no doctor]", answer: "keinem", hint: "kein → keinem" },

  // Feminine (keine → keiner)
  { id: "dat_neg_f_1", sentence: "Er hilft ___ [keine Frau|no woman]", answer: "keiner", hint: "keine → keiner" },
  { id: "dat_neg_f_2", sentence: "Sie kommt aus ___ [keine Stadt|no city]", answer: "keiner", hint: "keine → keiner" },
  { id: "dat_neg_f_3", sentence: "Ich wohne bei ___ [keine Familie|no family]", answer: "keiner", hint: "keine → keiner" },
  { id: "dat_neg_f_4", sentence: "Wir gehen zu ___ [keine Party|no party]", answer: "keiner", hint: "keine → keiner" },

  // Neuter (kein → keinem)
  { id: "dat_neg_n_1", sentence: "Sie spielt mit ___ [kein Kind|no child]", answer: "keinem", hint: "kein → keinem" },
  { id: "dat_neg_n_2", sentence: "Er kommt aus ___ [kein Dorf|no village]", answer: "keinem", hint: "kein → keinem" },
  { id: "dat_neg_n_3", sentence: "Ich fahre zu ___ [kein Konzert|no concert]", answer: "keinem", hint: "kein → keinem" },
  { id: "dat_neg_n_4", sentence: "Das gehört ___ [kein Hotel|no hotel]", answer: "keinem", hint: "kein → keinem" },

  // Plural (keine → keinen)
  { id: "dat_neg_pl_1", sentence: "Ich spiele mit ___ [keine Kinder|no children]", answer: "keinen", hint: "keine → keinen (pl)" },
  { id: "dat_neg_pl_2", sentence: "Er spricht mit ___ [keine Leute|no people]", answer: "keinen", hint: "keine → keinen (pl)" },
  { id: "dat_neg_pl_3", sentence: "Sie wohnt bei ___ [keine Freunde|no friends]", answer: "keinen", hint: "keine → keinen (pl)" },
  { id: "dat_neg_pl_4", sentence: "Wir fahren zu ___ [keine Berge|no mountains]", answer: "keinen", hint: "keine → keinen (pl)" },
];

// =============================================================================
// GRAMMAR LESSONS
// =============================================================================

export const grammarLessons: GrammarLesson[] = [
  {
    id: "gender-rules",
    name: "der/die/das Rules",
    description: "Learn patterns to predict noun genders. Type der, die, or das.",
    exercises: genderRulesExercises,
  },
  {
    id: "accusative-articles",
    name: "Akkusativ Drill",
    description: "der→den, ein→einen, kein→keinen (only masculine changes)",
    exercises: accusativeExercises,
  },
  {
    id: "dative-prepositions",
    name: "Dativ Drill",
    description: "der→dem, die→der, das→dem, die→den (all genders change)",
    exercises: dativeExercises,
  },
];

export function getGrammarLesson(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id);
}
