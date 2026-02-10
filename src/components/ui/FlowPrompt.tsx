import { useState } from 'react';
import type { FlowCard, TranslationWord, LabelFormCard, GrammarExercise, LabelBadge } from '@/types';
import '../FlowScreen.css';

interface FlowPromptProps {
  card: FlowCard;
  cardKey: string;
  contextTranslation?: string;
}

// ── Badge CSS class by label type ──

function badgeClassName(label: LabelBadge): string {
  if (label.type === 'gender' && label.gender) {
    return `fp-badge--gender-${label.gender}`;
  }
  const map: Record<string, string> = {
    case: 'fp-badge--case',
    number: 'fp-badge--number',
    person: 'fp-badge--person',
    articleType: 'fp-badge--article-type',
    tense: 'fp-badge--tense',
  };
  return map[label.type] ?? 'fp-badge--default';
}

// ── Gender CSS class from gender string ──

const genderClassMap: Record<string, string> = {
  masculine: 'fp-gender-m',
  feminine: 'fp-gender-f',
  neuter: 'fp-gender-n',
};

// ── Translation prompt ──

function TranslationPrompt({ word, direction }: { word: TranslationWord; direction: 'de_to_en' | 'en_to_de' }) {
  const isDeToEn = direction === 'de_to_en';
  const prompt = isDeToEn ? word.german : word.english.split(' / ')[0];

  const genderClass = word.noun ? genderClassMap[word.noun.gender] : undefined;

  return (
    <>
      <div className="fp-hero">{prompt}</div>
      <div className="fp-meta">
        <span>{word.partOfSpeech}</span>
        {word.noun && (
          <>
            <span className="fp-dot">&middot;</span>
            <span className={`fp-gender-label ${genderClass}`}>{word.noun.gender}</span>
          </>
        )}
      </div>
    </>
  );
}

// ── Label-to-form prompt ──

function LabelFormPrompt({ card, contextTranslation }: { card: LabelFormCard; contextTranslation?: string }) {
  return (
    <>
      <div className="fp-badge-row">
        {card.labels.map(label => (
          <span key={label.label} className={`fp-badge ${badgeClassName(label)}`}>
            {label.label}
          </span>
        ))}
      </div>
      {card.context && (
        <div className="fp-context-word">
          {card.context}
          {contextTranslation && (
            <>
              <span className="fp-dot">&middot;</span>
              <span>{contextTranslation}</span>
            </>
          )}
        </div>
      )}
    </>
  );
}

// ── Grammar prompt ──

function GrammarPrompt({ exercise }: { exercise: GrammarExercise }) {
  const [showHint, setShowHint] = useState(false);

  const bracketMatch = exercise.sentence.match(/\[([^|]+)\|([^\]]+)\]/);
  const category = bracketMatch ? bracketMatch[1] : null;
  const examples = bracketMatch ? bracketMatch[2] : null;
  const sentenceClean = exercise.sentence.replace(/\[([^\]]+)\]/g, '').trim();
  const hintText = exercise.hint;

  // Gender-rule format: "___ [Category|Examples]"
  if (category && examples && sentenceClean === '___') {
    return (
      <>
        <div className="fp-grammar-hero">{category}</div>
        <div className="fp-grammar-examples">{examples}</div>
        {hintText && (
          <button onClick={() => setShowHint(!showHint)} className="fp-hint-btn">
            {showHint ? hintText : 'hint?'}
          </button>
        )}
      </>
    );
  }

  // General fill-blank
  const parts = exercise.sentence.split('___');
  const cleanPart = (s: string) => s.replace(/\[([^\]]+)\]/g, '').trim();
  const bracketHint = exercise.sentence.match(/\[([^\]]+)\]/);
  const parsedHint = bracketHint ? bracketHint[1].replace('|', ' \u2014 ') : hintText;

  return (
    <>
      <div className="fp-fill-blank">
        {parts.map((part, i) => (
          <span key={i}>
            {cleanPart(part)}
            {i < parts.length - 1 && (
              <span className="fp-blank">
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            )}
          </span>
        ))}
      </div>
      {parsedHint && (
        <button onClick={() => setShowHint(!showHint)} className="fp-hint-btn">
          {showHint ? parsedHint : 'hint?'}
        </button>
      )}
    </>
  );
}

// ── Main dispatcher ──

export function FlowPrompt({ card, cardKey, contextTranslation }: FlowPromptProps) {
  return (
    <div key={cardKey} className="fp-wrapper">
      {card.source === 'translation' && (
        <TranslationPrompt word={card.item} direction={card.direction} />
      )}
      {card.source === 'label-to-form' && (
        <LabelFormPrompt card={card.item} contextTranslation={contextTranslation} />
      )}
      {card.source === 'grammar' && (
        <GrammarPrompt exercise={card.exercise} />
      )}
    </div>
  );
}
