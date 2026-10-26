import type { Deck } from '@/types'

export const pronouns = {
  id: 'personal-pronouns',
  name: 'Personal Pronouns',
  cards: [
    { id: 'ich', german: 'ich', english: 'I', grammar: { case: 'nominative', person: '1st', number: 'singular' } },
    { id: 'du', german: 'du', english: 'you', grammar: { case: 'nominative', person: '2nd', number: 'singular', formality: 'informal' } },
    { id: 'er', german: 'er', english: 'he', grammar: { case: 'nominative', person: '3rd', number: 'singular' } },
    { id: 'sie-she', german: 'sie', english: 'she', grammar: { case: 'nominative', person: '3rd', number: 'singular' } },
    { id: 'es', german: 'es', english: 'it', grammar: { case: 'nominative', person: '3rd', number: 'singular' } },
    { id: 'wir', german: 'wir', english: 'we', grammar: { case: 'nominative', person: '1st', number: 'plural' } },
    { id: 'ihr', german: 'ihr', english: 'you', grammar: { case: 'nominative', person: '2nd', number: 'plural', formality: 'informal' } },
    { id: 'sie-they', german: 'sie', english: 'they', grammar: { case: 'nominative', person: '3rd', number: 'plural' } },
    { id: 'Sie', german: 'Sie', english: 'you', grammar: { case: 'nominative', person: '2nd', number: 'singular', formality: 'formal' } },
    { id: 'mich', german: 'mich', english: 'me', grammar: { case: 'accusative', person: '1st', number: 'singular' } },
    { id: 'dich', german: 'dich', english: 'you', grammar: { case: 'accusative', person: '2nd', number: 'singular', formality: 'informal' } },
    { id: 'ihn', german: 'ihn', english: 'him', grammar: { case: 'accusative', person: '3rd', number: 'singular' } },
    { id: 'uns', german: 'uns', english: 'us', grammar: { case: 'accusative', person: '1st', number: 'plural' } },
    { id: 'euch', german: 'euch', english: 'you', grammar: { case: 'accusative', person: '2nd', number: 'plural', formality: 'informal' } },
    { id: 'mir', german: 'mir', english: 'me', grammar: { case: 'dative', person: '1st', number: 'singular' } },
    { id: 'dir', german: 'dir', english: 'you', grammar: { case: 'dative', person: '2nd', number: 'singular', formality: 'informal' } },
    { id: 'ihm', german: 'ihm', english: 'him', grammar: { case: 'dative', person: '3rd', number: 'singular' } },
    { id: 'ihr-dat', german: 'ihr', english: 'her', grammar: { case: 'dative', person: '3rd', number: 'singular' } },
    { id: 'uns-dat', german: 'uns', english: 'us', grammar: { case: 'dative', person: '1st', number: 'plural' } },
    { id: 'euch-dat', german: 'euch', english: 'you', grammar: { case: 'dative', person: '2nd', number: 'plural', formality: 'informal' } },
    { id: 'ihnen', german: 'ihnen', english: 'them', grammar: { case: 'dative', person: '3rd', number: 'plural' } },
  ],
  cheatsheet: {
    title: 'Personal Pronouns',
    tables: [
      {
        columns: ['Nominative', 'Accusative', 'Dative'],
        rows: [
          { label: 'ich', hint: 'I', cells: ['ich', 'mich', 'mir'] },
          { label: 'du', hint: 'you (sg.)', cells: ['du', 'dich', 'dir'] },
          { label: 'er', hint: 'he', cells: ['er', 'ihn', 'ihm'] },
          { label: 'sie', hint: 'she', cells: ['sie', 'sie', 'ihr'] },
          { label: 'es', hint: 'it', cells: ['es', 'es', 'ihm'] },
          { label: 'wir', hint: 'we', cells: ['wir', 'uns', 'uns'] },
          { label: 'ihr', hint: 'you (pl.)', cells: ['ihr', 'euch', 'euch'] },
          { label: 'sie', hint: 'they', cells: ['sie', 'sie', 'ihnen'] },
          { label: 'Sie', hint: 'you (formal)', cells: ['Sie', 'Sie', 'Ihnen'] },
        ],
      },
    ],
    notes: [
      'Formal Sie keeps its capital in every case: Sie, Sie, Ihnen.',
      'er and es share the dative ihm; sie (she) and ihr (you pl.) do not.',
      'Genitive pronouns (meiner, deiner, ...) exist but are rare - not drilled here.',
    ],
  },
} satisfies Deck
