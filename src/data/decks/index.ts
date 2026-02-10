import type { Deck } from "@/types";

import { definiteArticleCards, indefiniteArticleCards, definiteArticlesCheatsheet, indefiniteArticlesCheatsheet } from "./articles";
import { keinCards, keinCheatsheet } from "./kein";
import { personalPronounCards, possessivePronounCards, personalPronounsCheatsheet, possessivePronounsCheatsheet } from "./pronouns";
import { reflexivePronounCards, reflexivePronounsCheatsheet } from "./reflexive-pronouns";
import { interrogativePronounCards, interrogativePronounsCheatsheet } from "./interrogative-pronouns";
import { demonstrativePronounCards, demonstrativePronounsCheatsheet } from "./demonstrative-pronouns";
import { relativePronounCards, relativePronounsCheatsheet } from "./relative-pronouns";
import { machenConjugationCards, machenConjugationCheatsheet } from "./verbs";
import { seinConjugationCards, seinConjugationCheatsheet } from "./sein";
import { habenConjugationCards, habenConjugationCheatsheet } from "./haben";
import { koennenCards, muessenCards, wollenCards, sollenCards, duerfenCards, moegenCards, koennenCheatsheet, muessenCheatsheet, wollenCheatsheet, sollenCheatsheet, duerfenCheatsheet, moegenCheatsheet } from "./modals";
import { werdenConjugationCards, werdenConjugationCheatsheet } from "./werden";
import { wissenConjugationCards, wissenConjugationCheatsheet } from "./wissen";
import { grossAdjCards, adjEndingsCheatsheet } from "./adjectives";
import { akkusativPrepositionWords, dativPrepositionWords, wechselPrepositionWords, prepositionsCheatsheet } from "./prepositions";

export const decks: Deck[] = [
  // ============ ARTICLES & GENDER ============
  {
    id: "definite-articles",
    name: "der, die, das",
    category: "articles",
    type: "label-to-form",
    cards: definiteArticleCards,
    cheatsheet: definiteArticlesCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
  },
  {
    id: "indefinite-articles",
    name: "ein, eine",
    category: "articles",
    type: "label-to-form",
    cards: indefiniteArticleCards,
    cheatsheet: indefiniteArticlesCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
  },
  {
    id: "kein-articles",
    name: "kein, keine",
    category: "articles",
    type: "label-to-form",
    cards: keinCards,
    cheatsheet: keinCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
  },

  // ============ PRONOUNS ============
  {
    id: "personal-pronouns",
    name: "Personal",
    category: "pronouns",
    type: "label-to-form",
    cards: personalPronounCards,
    cheatsheet: personalPronounsCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
  },
  {
    id: "possessive-pronouns",
    name: "Possessive",
    category: "pronouns",
    type: "label-to-form",
    cards: possessivePronounCards,
    cheatsheet: possessivePronounsCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
  },
  {
    id: "reflexive-pronouns",
    name: "Reflexive",
    category: "pronouns",
    type: "label-to-form",
    cards: reflexivePronounCards,
    cheatsheet: reflexivePronounsCheatsheet,
  },
  {
    id: "interrogative-pronouns",
    name: "Interrogative",
    category: "pronouns",
    type: "label-to-form",
    cards: interrogativePronounCards,
    cheatsheet: interrogativePronounsCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
  },
  {
    id: "demonstrative-pronouns",
    name: "Demonstrative",
    category: "pronouns",
    type: "label-to-form",
    cards: demonstrativePronounCards,
    cheatsheet: demonstrativePronounsCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
  },
  {
    id: "relative-pronouns",
    name: "Relative",
    category: "pronouns",
    type: "label-to-form",
    cards: relativePronounCards,
    cheatsheet: relativePronounsCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
  },

  // ============ VERB CONJUGATION ============
  {
    id: "machen-conjugation",
    name: "Machen",
    category: "verbs",
    type: "label-to-form",
    cards: machenConjugationCards,
    cheatsheet: machenConjugationCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM"] },
    contextTranslation: "to do / to make",
  },
  {
    id: "sein-conjugation",
    name: "Sein",
    category: "verbs",
    type: "label-to-form",
    cards: seinConjugationCards,
    cheatsheet: seinConjugationCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "to be",
  },
  {
    id: "haben-conjugation",
    name: "Haben",
    category: "verbs",
    type: "label-to-form",
    cards: habenConjugationCards,
    cheatsheet: habenConjugationCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "to have",
  },
  {
    id: "koennen-conjugation",
    name: "Können",
    category: "verbs",
    type: "label-to-form",
    cards: koennenCards,
    cheatsheet: koennenCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "can / to be able to",
  },
  {
    id: "muessen-conjugation",
    name: "Müssen",
    category: "verbs",
    type: "label-to-form",
    cards: muessenCards,
    cheatsheet: muessenCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "must / to have to",
  },
  {
    id: "wollen-conjugation",
    name: "Wollen",
    category: "verbs",
    type: "label-to-form",
    cards: wollenCards,
    cheatsheet: wollenCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "to want",
  },
  {
    id: "sollen-conjugation",
    name: "Sollen",
    category: "verbs",
    type: "label-to-form",
    cards: sollenCards,
    cheatsheet: sollenCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "should / to be supposed to",
  },
  {
    id: "duerfen-conjugation",
    name: "Dürfen",
    category: "verbs",
    type: "label-to-form",
    cards: duerfenCards,
    cheatsheet: duerfenCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "may / to be allowed to",
  },
  {
    id: "moegen-conjugation",
    name: "Mögen",
    category: "verbs",
    type: "label-to-form",
    cards: moegenCards,
    cheatsheet: moegenCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "to like",
  },
  {
    id: "werden-conjugation",
    name: "Werden",
    category: "verbs",
    type: "label-to-form",
    cards: werdenConjugationCards,
    cheatsheet: werdenConjugationCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "to become",
  },
  {
    id: "wissen-conjugation",
    name: "Wissen",
    category: "verbs",
    type: "label-to-form",
    cards: wissenConjugationCards,
    cheatsheet: wissenConjugationCheatsheet,
    defaultDisabledFilters: { tense: ["PRÄTERITUM", "KONJUNKTIV II"] },
    contextTranslation: "to know (a fact)",
  },

  // ============ ADJECTIVE ENDINGS ============
  {
    id: "gross-adjective",
    name: "Groß",
    category: "adjective-endings",
    type: "label-to-form",
    cards: grossAdjCards,
    cheatsheet: adjEndingsCheatsheet,
    defaultDisabledFilters: { case: ["GENITIVE"] },
    contextTranslation: "big / tall",
  },

  // ============ VERB VALENCY (placeholders) ============
  {
    id: "accusative-verbs",
    name: "Accusative verbs",
    category: "verb-valency",
    type: "translation",
    words: [],
    placeholder: true,
  },
  {
    id: "dative-verbs",
    name: "Dative verbs",
    category: "verb-valency",
    type: "translation",
    words: [],
    placeholder: true,
  },
  {
    id: "ditransitive-verbs",
    name: "Ditransitive verbs",
    category: "verb-valency",
    type: "translation",
    words: [],
    placeholder: true,
  },

  // ============ PREPOSITIONS ============
  {
    id: "prepositions-akkusativ",
    name: "Akkusativ",
    category: "prepositions",
    type: "translation",
    words: akkusativPrepositionWords,
    cheatsheet: prepositionsCheatsheet,
  },
  {
    id: "prepositions-dativ",
    name: "Dativ",
    category: "prepositions",
    type: "translation",
    words: dativPrepositionWords,
    cheatsheet: prepositionsCheatsheet,
  },
  {
    id: "prepositions-wechsel",
    name: "Wechsel (Akk/Dat)",
    category: "prepositions",
    type: "translation",
    words: wechselPrepositionWords,
    cheatsheet: prepositionsCheatsheet,
  },
];

export function getDeck(id: string): Deck | undefined {
  return decks.find((d) => d.id === id);
}
