import type { ReactNode } from 'react';
import type { Word, PartOfSpeech, Gender, GrammaticalCase } from '../../types';

// ============ Badge Styling ============
const BADGE_STYLES = {
  partOfSpeech: {
    color: 'var(--color-text-muted)',
    glow: 'rgba(255, 255, 255, 0.2)',
    bg: 'rgba(255, 255, 255, 0.08)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
  case: {
    color: 'var(--color-neon-cyan)',
    glow: 'rgba(45, 226, 230, 0.4)',
    bg: 'rgba(45, 226, 230, 0.12)',
    border: 'rgba(45, 226, 230, 0.4)',
  },
  gender: {
    masculine: {
      color: 'var(--color-neon-cyan)',
      glow: 'rgba(45, 226, 230, 0.4)',
      bg: 'rgba(45, 226, 230, 0.12)',
      border: 'rgba(45, 226, 230, 0.4)',
    },
    feminine: {
      color: 'var(--color-neon-pink)',
      glow: 'rgba(246, 1, 157, 0.4)',
      bg: 'rgba(246, 1, 157, 0.12)',
      border: 'rgba(246, 1, 157, 0.4)',
    },
    neuter: {
      color: 'var(--color-neon-yellow)',
      glow: 'rgba(249, 197, 78, 0.4)',
      bg: 'rgba(249, 197, 78, 0.12)',
      border: 'rgba(249, 197, 78, 0.4)',
    },
  },
  number: {
    color: 'var(--color-neon-purple)',
    glow: 'rgba(157, 0, 255, 0.4)',
    bg: 'rgba(157, 0, 255, 0.12)',
    border: 'rgba(157, 0, 255, 0.4)',
  },
  formality: {
    color: 'var(--color-neon-yellow)',
    glow: 'rgba(249, 197, 78, 0.4)',
    bg: 'rgba(249, 197, 78, 0.12)',
    border: 'rgba(249, 197, 78, 0.4)',
  },
  frequency: {
    color: 'var(--color-text-subtle)',
    glow: 'transparent',
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.15)',
  },
} as const;

// ============ Labels ============
const POS_LABELS: Record<PartOfSpeech, string> = {
  noun: 'NOUN',
  verb: 'VERB',
  adjective: 'ADJECTIVE',
  adverb: 'ADVERB',
  preposition: 'PREPOSITION',
  conjunction: 'CONJUNCTION',
  pronoun: 'PRONOUN',
  article: 'ARTICLE',
  numeral: 'NUMERAL',
  interjection: 'INTERJECTION',
  particle: 'PARTICLE',
};

const GENDER_LABELS: Record<Gender, string> = {
  masculine: 'MASCULINE',
  feminine: 'FEMININE',
  neuter: 'NEUTER',
};

const CASE_LABELS: Record<GrammaticalCase, string> = {
  nominative: 'NOMINATIVE',
  accusative: 'ACCUSATIVE',
  dative: 'DATIVE',
  genitive: 'GENITIVE',
};

// ============ Badge Component ============
interface BadgeProps {
  label: string;
  style: {
    color: string;
    glow: string;
    bg: string;
    border: string;
  };
  size: 'sm' | 'md';
}

function Badge({ label, style, size }: BadgeProps) {
  const sizeStyles = {
    sm: {
      fontSize: '0.5625rem',
      padding: 'var(--space-1) var(--space-1)',
      letterSpacing: '0.06em',
    },
    md: {
      fontSize: '0.625rem',
      padding: 'var(--space-1) var(--space-2)',
      letterSpacing: '0.08em',
    },
  };

  const { fontSize, padding, letterSpacing } = sizeStyles[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontSize,
        fontWeight: 500,
        letterSpacing,
        textTransform: 'uppercase',
        color: style.color,
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: 'var(--radius-sm)',
        padding,
        boxShadow: style.glow !== 'transparent' ? `0 0 6px ${style.glow}` : 'none',
        textShadow: style.glow !== 'transparent' ? `0 0 4px ${style.glow}` : 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

// ============ Main Component ============
interface WordBadgesProps {
  word: Word;
  size?: 'sm' | 'md';
  showPartOfSpeech?: boolean;
  showGrammar?: boolean;
  showFrequency?: boolean;
}

export function WordBadges({
  word,
  size = 'md',
  showPartOfSpeech = true,
  showGrammar = true,
  showFrequency = false,
}: WordBadgesProps) {
  const badges: ReactNode[] = [];

  // Part of speech
  if (showPartOfSpeech && word.partOfSpeech && POS_LABELS[word.partOfSpeech]) {
    badges.push(
      <Badge
        key="pos"
        label={POS_LABELS[word.partOfSpeech]}
        style={BADGE_STYLES.partOfSpeech}
        size={size}
      />
    );
  }

  // Type-specific badges
  if (showGrammar) {
    // Noun: gender
    if (word.noun?.gender && GENDER_LABELS[word.noun.gender]) {
      badges.push(
        <Badge
          key="gender"
          label={GENDER_LABELS[word.noun.gender]}
          style={BADGE_STYLES.gender[word.noun.gender]}
          size={size}
        />
      );
    }

    // Pronoun: case, number, formality
    if (word.pronoun) {
      if (word.pronoun.case) {
        badges.push(
          <Badge
            key="case"
            label={CASE_LABELS[word.pronoun.case]}
            style={BADGE_STYLES.case}
            size={size}
          />
        );
      }
      if (word.pronoun.number) {
        badges.push(
          <Badge
            key="number"
            label={word.pronoun.number === 'singular' ? 'SINGULAR' : 'PLURAL'}
            style={BADGE_STYLES.number}
            size={size}
          />
        );
      }
      if (word.pronoun.formality) {
        badges.push(
          <Badge
            key="formality"
            label={word.pronoun.formality === 'formal' ? 'FORMAL' : 'INFORMAL'}
            style={BADGE_STYLES.formality}
            size={size}
          />
        );
      }
    }


    // Adjective: show comparative form hint
    if (word.adjective?.comparative) {
      badges.push(
        <Badge
          key="comp"
          label={`→ ${word.adjective.comparative}`}
          style={BADGE_STYLES.partOfSpeech}
          size={size}
        />
      );
    }
  }

  // Frequency / CEFR level
  if (showFrequency && word.frequency) {
    badges.push(
      <Badge
        key="freq"
        label={word.frequency}
        style={BADGE_STYLES.frequency}
        size={size}
      />
    );
  }

  if (badges.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
        justifyContent: 'center',
        marginTop: 'var(--space-4)',
      }}
    >
      {badges}
    </div>
  );
}

// ============ Notes Display ============
interface WordNotesProps {
  word: Word;
}

export function WordNotes({ word }: WordNotesProps) {
  if (!word.notes) return null;

  return (
    <p
      style={{
        color: 'var(--color-text-subtle)',
        fontSize: 'var(--text-sm)',
        fontStyle: 'italic',
        textAlign: 'center',
        margin: 0,
        marginTop: 'var(--space-3)',
        opacity: 0.8,
      }}
    >
      {word.notes}
    </p>
  );
}
