import { useState } from 'react';
import type { WordMeaning, GrammaticalCase } from '../../types';

// ============ Case Badge Styling ============
const CASE_COLORS = {
  nominative: {
    color: 'var(--color-neon-cyan)',
    bg: 'rgba(45, 226, 230, 0.15)',
    border: 'rgba(45, 226, 230, 0.5)',
    glow: 'rgba(45, 226, 230, 0.4)',
  },
  accusative: {
    color: 'var(--color-neon-pink)',
    bg: 'rgba(246, 1, 157, 0.15)',
    border: 'rgba(246, 1, 157, 0.5)',
    glow: 'rgba(246, 1, 157, 0.4)',
  },
  dative: {
    color: 'var(--color-neon-yellow)',
    bg: 'rgba(249, 197, 78, 0.15)',
    border: 'rgba(249, 197, 78, 0.5)',
    glow: 'rgba(249, 197, 78, 0.4)',
  },
  genitive: {
    color: 'var(--color-neon-purple)',
    bg: 'rgba(157, 0, 255, 0.15)',
    border: 'rgba(157, 0, 255, 0.5)',
    glow: 'rgba(157, 0, 255, 0.4)',
  },
} as const;

const CASE_ABBREV: Record<GrammaticalCase, string> = {
  nominative: 'NOM',
  accusative: 'ACC',
  dative: 'DAT',
  genitive: 'GEN',
};

// ============ Helper Components ============
function CaseBadge({ caseValue }: { caseValue: GrammaticalCase }) {
  const style = CASE_COLORS[caseValue];
  return (
    <span
      style={{
        fontSize: 'var(--text-sm)',
        fontWeight: 700,
        fontFamily: 'var(--font-display)',
        letterSpacing: '0.08em',
        color: style.color,
        background: style.bg,
        border: `2px solid ${style.border}`,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-2) var(--space-3)',
        textShadow: `0 0 8px ${style.glow}`,
        boxShadow: `0 0 12px ${style.glow}, inset 0 0 8px ${style.glow}`,
      }}
    >
      {CASE_ABBREV[caseValue]}
    </span>
  );
}

function CaseBadges({ cases }: { cases: GrammaticalCase | GrammaticalCase[] | undefined }) {
  if (!cases) return null;

  const caseArray = Array.isArray(cases) ? cases : [cases];

  return (
    <span style={{ display: 'inline-flex', gap: 'var(--space-2)', flexShrink: 0 }}>
      {caseArray.map((c) => (
        <CaseBadge key={c} caseValue={c} />
      ))}
    </span>
  );
}

// ============ Meaning Row ============
interface MeaningRowProps {
  meaning: WordMeaning;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

function MeaningRow({ meaning, isSelected, onClick, index }: MeaningRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)',
        width: '100%',
        padding: 'var(--space-4) var(--space-5)',
        background: isSelected
          ? 'linear-gradient(135deg, rgba(45, 226, 230, 0.1) 0%, rgba(246, 1, 157, 0.08) 100%)'
          : 'transparent',
        border: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: isSelected ? 'var(--radius-md)' : '0',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {/* Index number */}
      <span
        style={{
          color: 'var(--color-neon-cyan)',
          fontSize: 'var(--text-base)',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          opacity: 0.5,
          minWidth: 'var(--space-6)',
        }}
      >
        {index + 1}.
      </span>

      {/* English meaning - LARGE and prominent */}
      <span
        style={{
          color: 'var(--color-text)',
          fontSize: 'var(--text-xl)',
          fontWeight: 700,
          fontFamily: 'var(--font-body)',
          minWidth: '7.5rem',
          textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
        }}
      >
        {meaning.english}
      </span>

      {/* Context - readable size */}
      <span
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-md)',
          fontFamily: 'var(--font-body)',
          flex: 1,
          opacity: 0.8,
        }}
      >
        {meaning.context}
      </span>

      {/* Case badges */}
      <CaseBadges cases={meaning.case} />

      {/* Expand indicator */}
      <span
        style={{
          color: 'var(--color-text-subtle)',
          fontSize: 'var(--text-lg)',
          transition: 'transform 0.2s ease',
          transform: isSelected ? 'rotate(90deg)' : 'rotate(0)',
          opacity: 0.5,
        }}
      >
        ›
      </span>
    </button>
  );
}

// ============ Expanded Details ============
interface MeaningDetailsProps {
  meaning: WordMeaning;
}

function MeaningDetails({ meaning }: MeaningDetailsProps) {
  return (
    <div
      style={{
        padding: 'var(--space-5) var(--space-6) var(--space-6) 4rem',
        background: 'linear-gradient(180deg, rgba(45, 226, 230, 0.04) 0%, rgba(157, 0, 255, 0.02) 100%)',
        borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        marginBottom: 'var(--space-2)',
        borderLeft: '3px solid var(--color-neon-cyan)',
        marginLeft: 'var(--space-5)',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      {/* Case rule */}
      {meaning.caseRule && (
        <p
          style={{
            color: 'var(--color-neon-yellow)',
            fontSize: 'var(--text-md)',
            fontFamily: 'var(--font-body)',
            margin: '0 0 var(--space-4) 0',
            fontStyle: 'italic',
            opacity: 0.9,
          }}
        >
          💡 {meaning.caseRule}
        </p>
      )}

      {/* Examples */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {meaning.examples.map((example, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span
              style={{
                color: 'var(--color-text)',
                fontSize: 'var(--text-lg)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
              }}
            >
              {example.german}
            </span>
            <span
              style={{
                color: 'var(--color-text-subtle)',
                fontSize: 'var(--text-md)',
                fontFamily: 'var(--font-body)',
              }}
            >
              {example.english}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Main Component ============
interface MeaningsCardProps {
  meanings: WordMeaning[];
  onHide?: () => void;
}

export function MeaningsCard({ meanings, onHide }: MeaningsCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleRowClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(22, 22, 42, 0.95) 0%, rgba(10, 10, 20, 0.98) 100%)',
        border: '1px solid rgba(45, 226, 230, 0.2)',
        borderRadius: 'var(--radius-xl)',
        padding: '0',
        width: '100%',
        maxWidth: '50rem',
        margin: '0 auto',
        marginTop: 'var(--space-6)',
        animation: 'fadeIn 0.3s ease-out',
        boxShadow: `
          0 4px 24px rgba(0, 0, 0, 0.4),
          0 0 40px rgba(45, 226, 230, 0.05),
          inset 0 1px 0 rgba(255, 255, 255, 0.05)
        `,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(45, 226, 230, 0.03)',
        }}
      >
        <span
          style={{
            color: 'var(--color-neon-cyan)',
            fontSize: 'var(--text-sm)',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textShadow: '0 0 10px rgba(45, 226, 230, 0.5)',
          }}
        >
          {meanings.length} {meanings.length === 1 ? 'meaning' : 'meanings'}
        </span>
        {onHide ? (
          <button
            type="button"
            onClick={onHide}
            style={{
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-body)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-2) var(--space-3)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            Hide
          </button>
        ) : (
          <span
            style={{
              color: 'var(--color-text-subtle)',
              fontSize: 'var(--text-base)',
              fontFamily: 'var(--font-body)',
              opacity: 0.6,
            }}
          >
            tap to expand
          </span>
        )}
      </div>

      {/* Meaning rows */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {meanings.map((meaning, idx) => (
          <div key={idx}>
            <MeaningRow
              meaning={meaning}
              isSelected={selectedIndex === idx}
              onClick={() => handleRowClick(idx)}
              index={idx}
            />
            {selectedIndex === idx && <MeaningDetails meaning={meaning} />}
          </div>
        ))}
      </div>
    </div>
  );
}
