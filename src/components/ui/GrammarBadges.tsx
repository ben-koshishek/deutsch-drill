import type { WordMeta, GrammaticalCase, GrammaticalNumber, Formality } from '../../types';

interface GrammarBadgesProps {
  meta?: WordMeta;
  size?: 'sm' | 'md';
}

// Labels for display
const CASE_LABELS: Record<GrammaticalCase, string> = {
  nominative: 'NOMINATIVE',
  accusative: 'ACCUSATIVE',
  dative: 'DATIVE',
  genitive: 'GENITIVE',
};

const NUMBER_LABELS: Record<GrammaticalNumber, string> = {
  singular: 'SINGULAR',
  plural: 'PLURAL',
};

const FORMALITY_LABELS: Record<Formality, string> = {
  formal: 'FORMAL',
  informal: 'INFORMAL',
};

// Color schemes for each badge type - synthwave neon palette
const BADGE_STYLES = {
  case: {
    color: 'var(--color-neon-cyan)',
    glow: 'rgba(45, 226, 230, 0.4)',
    bg: 'rgba(45, 226, 230, 0.12)',
    border: 'rgba(45, 226, 230, 0.4)',
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
} as const;

type BadgeType = keyof typeof BADGE_STYLES;

interface BadgeProps {
  label: string;
  type: BadgeType;
  size: 'sm' | 'md';
}

function Badge({ label, type, size }: BadgeProps) {
  const style = BADGE_STYLES[type];
  const sizeStyles = {
    sm: {
      fontSize: '10px',
      padding: '2px 6px',
      letterSpacing: '0.08em',
    },
    md: {
      fontSize: '11px',
      padding: '3px 8px',
      letterSpacing: '0.1em',
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
        fontWeight: 400,
        letterSpacing,
        textTransform: 'uppercase',
        color: style.color,
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: '4px',
        padding,
        boxShadow: `0 0 8px ${style.glow}, inset 0 0 8px ${style.glow}`,
        textShadow: `0 0 6px ${style.glow}`,
        transition: 'all var(--transition-base)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

export function GrammarBadges({ meta, size = 'md' }: GrammarBadgesProps) {
  if (!meta) return null;

  const badges: { label: string; type: BadgeType }[] = [];

  // Order: case, number, formality (least important)
  if (meta.case) {
    badges.push({ label: CASE_LABELS[meta.case], type: 'case' });
  }
  if (meta.number) {
    badges.push({ label: NUMBER_LABELS[meta.number], type: 'number' });
  }
  if (meta.formality) {
    badges.push({ label: FORMALITY_LABELS[meta.formality], type: 'formality' });
  }

  if (badges.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
        justifyContent: 'center',
        marginTop: 'var(--space-5)',
      }}
    >
      {badges.map(({ label, type }) => (
        <Badge key={`${type}-${label}`} label={label} type={type} size={size} />
      ))}
    </div>
  );
}
