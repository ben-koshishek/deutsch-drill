import { useEffect, useState } from 'react';

interface CircleCompletionScreenProps {
  circleNumber: number;
  deckName: string;
  onContinue: () => void;
  onExit: () => void;
}

export function CircleCompletionScreen({
  circleNumber,
  deckName,
  onContinue,
  onExit,
}: CircleCompletionScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Staggered reveal
    const t1 = setTimeout(() => setShowContent(true), 300);
    const t2 = setTimeout(() => setShowButtons(true), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {/* Animated background rays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            conic-gradient(
              from 0deg at 50% 50%,
              rgba(246, 1, 157, 0.1) 0deg,
              transparent 30deg,
              rgba(45, 226, 230, 0.1) 60deg,
              transparent 90deg,
              rgba(249, 197, 78, 0.1) 120deg,
              transparent 150deg,
              rgba(246, 1, 157, 0.1) 180deg,
              transparent 210deg,
              rgba(45, 226, 230, 0.1) 240deg,
              transparent 270deg,
              rgba(249, 197, 78, 0.1) 300deg,
              transparent 330deg,
              rgba(246, 1, 157, 0.1) 360deg
            )
          `,
          animation: 'spinSlow 20s linear infinite',
          opacity: 0.6,
        }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 50% at 50% 45%, rgba(249, 197, 78, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(246, 1, 157, 0.08) 0%, transparent 70%)
          `,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          opacity: showContent ? 1 : 0,
          transform: showContent ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* "CIRCLE COMPLETE" header */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(12px, 3vw, 16px)',
            letterSpacing: '0.3em',
            color: 'var(--color-neon-cyan)',
            textShadow: `
              0 0 10px var(--color-neon-cyan-glow),
              0 0 20px var(--color-neon-cyan-glow)
            `,
            marginBottom: 'var(--space-4)',
            animation: showContent ? 'pulseGlow 2s ease-in-out infinite' : 'none',
          }}
        >
          CIRCLE COMPLETE
        </div>

        {/* Big circle number */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 20vw, 160px)',
            fontWeight: 400,
            lineHeight: 1,
            color: 'var(--color-neon-yellow)',
            textShadow: `
              0 0 20px rgba(249, 197, 78, 0.8),
              0 0 40px rgba(249, 197, 78, 0.6),
              0 0 60px rgba(249, 197, 78, 0.4),
              0 0 80px rgba(249, 197, 78, 0.2)
            `,
            marginBottom: 'var(--space-2)',
            animation: showContent ? 'numberPop 0.6s ease-out' : 'none',
          }}
        >
          {circleNumber}
        </div>

        {/* Deck name */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-8)',
          }}
        >
          {deckName}
        </div>

        {/* Trophy row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {Array.from({ length: Math.min(circleNumber, 5) }).map((_, i) => (
            <div
              key={i}
              style={{
                fontSize: '32px',
                animation: `trophyBounce 0.5s ease-out ${i * 0.1}s both`,
                filter: i === circleNumber - 1
                  ? 'drop-shadow(0 0 10px rgba(249, 197, 78, 0.8))'
                  : 'none',
              }}
            >
              {i < circleNumber ? '★' : '☆'}
            </div>
          ))}
          {circleNumber > 5 && (
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                color: 'var(--color-neon-yellow)',
                alignSelf: 'center',
              }}
            >
              +{circleNumber - 5}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease-out',
          }}
        >
          <button
            onClick={onContinue}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '14px',
              letterSpacing: '0.1em',
              padding: 'var(--space-4) var(--space-8)',
              background: 'linear-gradient(180deg, rgba(249, 197, 78, 0.2) 0%, rgba(249, 197, 78, 0.1) 100%)',
              border: '2px solid var(--color-neon-yellow)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-neon-yellow)',
              cursor: 'pointer',
              boxShadow: `
                0 0 20px rgba(249, 197, 78, 0.3),
                inset 0 0 20px rgba(249, 197, 78, 0.1)
              `,
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(249, 197, 78, 0.3)';
              e.currentTarget.style.boxShadow = '0 0 30px rgba(249, 197, 78, 0.5), inset 0 0 30px rgba(249, 197, 78, 0.2)';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, rgba(249, 197, 78, 0.2) 0%, rgba(249, 197, 78, 0.1) 100%)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(249, 197, 78, 0.3), inset 0 0 20px rgba(249, 197, 78, 0.1)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            START CIRCLE {circleNumber + 1}
          </button>

          <button
            onClick={onExit}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              padding: 'var(--space-3) var(--space-6)',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-text-subtle)';
              e.currentTarget.style.color = 'var(--color-text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.color = 'var(--color-text-muted)';
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes numberPop {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes trophyBounce {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
