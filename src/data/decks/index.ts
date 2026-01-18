import type { Deck } from "@/types";

import { definiteArticleCards, indefiniteArticleCards, definiteArticlesCheatsheet, indefiniteArticlesCheatsheet } from "./articles";
import { keinCards, keinCheatsheet } from "./kein";
import { personalPronounCards, possessivePronounCards, personalPronounsCheatsheet, possessivePronounsCheatsheet } from "./pronouns";
import { reflexivePronounCards, reflexivePronounsCheatsheet } from "./reflexive-pronouns";
import { interrogativePronounCards, interrogativePronounsCheatsheet } from "./interrogative-pronouns";
import { machenConjugationCards, machenConjugationCheatsheet } from "./verbs";
import { seinConjugationCards, seinConjugationCheatsheet } from "./sein";
import { habenConjugationCards, habenConjugationCheatsheet } from "./haben";
import { koennenCards, muessenCards, wollenCards, sollenCards, duerfenCards, moegenCards, modalVerbsCheatsheet } from "./modals";
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
  },
  {
    id: "indefinite-articles",
    name: "ein, eine",
    category: "articles",
    type: "label-to-form",
    cards: indefiniteArticleCards,
    cheatsheet: indefiniteArticlesCheatsheet,
  },
  {
    id: "kein-articles",
    name: "kein, keine",
    category: "articles",
    type: "label-to-form",
    cards: keinCards,
    cheatsheet: keinCheatsheet,
  },

  // ============ PRONOUNS ============
  {
    id: "personal-pronouns",
    name: "Personal",
    category: "pronouns",
    type: "label-to-form",
    cards: personalPronounCards,
    cheatsheet: personalPronounsCheatsheet,
  },
  {
    id: "possessive-pronouns",
    name: "Possessive",
    category: "pronouns",
    type: "label-to-form",
    cards: possessivePronounCards,
    cheatsheet: possessivePronounsCheatsheet,
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
  },

  // ============ VERB CONJUGATION ============
  {
    id: "machen-conjugation",
    name: "Machen",
    category: "verbs",
    type: "label-to-form",
    cards: machenConjugationCards,
    cheatsheet: machenConjugationCheatsheet,
  },
  {
    id: "sein-conjugation",
    name: "Sein",
    category: "verbs",
    type: "label-to-form",
    cards: seinConjugationCards,
    cheatsheet: seinConjugationCheatsheet,
  },
  {
    id: "haben-conjugation",
    name: "Haben",
    category: "verbs",
    type: "label-to-form",
    cards: habenConjugationCards,
    cheatsheet: habenConjugationCheatsheet,
  },
  {
    id: "koennen-conjugation",
    name: "Können",
    category: "verbs",
    type: "label-to-form",
    cards: koennenCards,
    cheatsheet: modalVerbsCheatsheet,
  },
  {
    id: "muessen-conjugation",
    name: "Müssen",
    category: "verbs",
    type: "label-to-form",
    cards: muessenCards,
    cheatsheet: modalVerbsCheatsheet,
  },
  {
    id: "wollen-conjugation",
    name: "Wollen",
    category: "verbs",
    type: "label-to-form",
    cards: wollenCards,
    cheatsheet: modalVerbsCheatsheet,
  },
  {
    id: "sollen-conjugation",
    name: "Sollen",
    category: "verbs",
    type: "label-to-form",
    cards: sollenCards,
    cheatsheet: modalVerbsCheatsheet,
  },
  {
    id: "duerfen-conjugation",
    name: "Dürfen",
    category: "verbs",
    type: "label-to-form",
    cards: duerfenCards,
    cheatsheet: modalVerbsCheatsheet,
  },
  {
    id: "moegen-conjugation",
    name: "Mögen",
    category: "verbs",
    type: "label-to-form",
    cards: moegenCards,
    cheatsheet: modalVerbsCheatsheet,
  },

  // ============ ADJECTIVE ENDINGS ============
  {
    id: "gross-adjective",
    name: "Groß",
    category: "adjective-endings",
    type: "label-to-form",
    cards: grossAdjCards,
    cheatsheet: adjEndingsCheatsheet,
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
