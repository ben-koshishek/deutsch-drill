import { useEffect, useState } from 'react';
import { formatTime } from '@/utils/formatTime';

interface TimeCompletionScreenProps {
  finalTimeMs: number;
  isNewBest: boolean;
  previousBestMs: number | null;
  itemName: string;
  onTryAgain: () => void;
  onExit: () => void;
}

export function TimeCompletionScreen({
  finalTimeMs,
  isNewBest,
  previousBestMs,
  itemName,
  onTryAgain,
  onExit,
}: TimeCompletionScreenProps) {
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 300);
    const t2 = setTimeout(() => setShowButtons(true), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const timeDelta = previousBestMs !== null ? finalTimeMs - previousBestMs : null;
  const deltaFormatted = timeDelta !== null
    ? `${timeDelta > 0 ? '+' : '-'}${formatTime(Math.abs(timeDelta))}`
    : null;

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
          background: isNewBest
            ? `
              conic-gradient(
                from 0deg at 50% 50%,
                rgba(249, 197, 78, 0.15) 0deg,
                transparent 30deg,
                rgba(45, 226, 230, 0.15) 60deg,
                transparent 90deg,
                rgba(249, 197, 78, 0.15) 120deg,
                transparent 150deg,
                rgba(45, 226, 230, 0.15) 180deg,
                transparent 210deg,
                rgba(249, 197, 78, 0.15) 240deg,
                transparent 270deg,
                rgba(45, 226, 230, 0.15) 300deg,
                transparent 330deg,
                rgba(249, 197, 78, 0.15) 360deg
              )
            `
            : `
              conic-gradient(
                from 0deg at 50% 50%,
                rgba(45, 226, 230, 0.08) 0deg,
                transparent 30deg,
                rgba(157, 0, 255, 0.08) 60deg,
                transparent 90deg,
                rgba(45, 226, 230, 0.08) 120deg,
                transparent 150deg,
                rgba(157, 0, 255, 0.08) 180deg,
                transparent 210deg,
                rgba(45, 226, 230, 0.08) 240deg,
                transparent 270deg,
                rgba(157, 0, 255, 0.08) 300deg,
                transparent 330deg,
                rgba(45, 226, 230, 0.08) 360deg
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
          background: isNewBest
            ? `
              radial-gradient(ellipse 60% 50% at 50% 45%, rgba(249, 197, 78, 0.2) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 50%, rgba(45, 226, 230, 0.1) 0%, transparent 70%)
            `
            : `
              radial-gradient(ellipse 60% 50% at 50% 45%, rgba(45, 226, 230, 0.15) 0%, transparent 60%),
              radial-gradient(ellipse 80% 60% at 50% 50%, rgba(157, 0, 255, 0.08) 0%, transparent 70%)
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
        {/* Header */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.875rem, 4vw, 1.25rem)',
            letterSpacing: '0.3em',
            color: isNewBest ? 'var(--color-neon-yellow)' : 'var(--color-neon-cyan)',
            textShadow: isNewBest
              ? `
                0 0 10px rgba(249, 197, 78, 0.8),
                0 0 20px rgba(249, 197, 78, 0.6)
              `
              : `
                0 0 10px var(--color-neon-cyan-glow),
                0 0 20px var(--color-neon-cyan-glow)
              `,
            marginBottom: 'var(--space-4)',
            animation: showContent ? 'pulseGlow 2s ease-in-out infinite' : 'none',
          }}
        >
          {isNewBest ? 'NEW BEST!' : 'COMPLETE'}
        </div>

        {/* Big time display */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(3.75rem, 18vw, 7.5rem)',
            fontWeight: 700,
            lineHeight: 1,
            color: isNewBest ? 'var(--color-neon-yellow)' : 'var(--color-neon-cyan)',
            textShadow: isNewBest
              ? `
                0 0 20px rgba(249, 197, 78, 0.8),
                0 0 40px rgba(249, 197, 78, 0.6),
                0 0 60px rgba(249, 197, 78, 0.4)
              `
              : `
                0 0 20px rgba(45, 226, 230, 0.8),
                0 0 40px rgba(45, 226, 230, 0.6),
                0 0 60px rgba(45, 226, 230, 0.4)
              `,
            marginBottom: 'var(--space-4)',
            animation: showContent ? 'numberPop 0.6s ease-out' : 'none',
          }}
        >
          {formatTime(finalTimeMs)}
        </div>

        {/* Time delta (if previous best exists) */}
        {deltaFormatted && (
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xl)',
              fontWeight: 600,
              color: timeDelta! < 0
                ? 'var(--color-success)'
                : timeDelta! > 0
                  ? 'var(--color-error)'
                  : 'var(--color-text-muted)',
              marginBottom: 'var(--space-2)',
            }}
          >
            {deltaFormatted}
          </div>
        )}

        {/* Previous best (if exists and not new best) */}
        {previousBestMs !== null && !isNewBest && (
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-md)',
              color: 'var(--color-text-muted)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Best: {formatTime(previousBestMs)}
          </div>
        )}

        {/* Item name */}
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xl)',
            color: 'var(--color-text-muted)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {itemName}
        </div>

        {/* Trophy/timer icon */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-10)',
          }}
        >
          <div
            style={{
              fontSize: 'var(--text-4xl)',
              animation: isNewBest ? 'trophyBounce 0.5s ease-out' : 'none',
              filter: isNewBest
                ? 'drop-shadow(0 0 15px rgba(249, 197, 78, 0.8))'
                : 'drop-shadow(0 0 10px rgba(45, 226, 230, 0.5))',
            }}
          >
            {isNewBest ? '🏆' : '⏱️'}
          </div>
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
            onClick={onTryAgain}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-sm)',
              letterSpacing: '0.1em',
              padding: 'var(--space-4) var(--space-8)',
              background: isNewBest
                ? 'linear-gradient(180deg, rgba(249, 197, 78, 0.2) 0%, rgba(249, 197, 78, 0.1) 100%)'
                : 'linear-gradient(180deg, rgba(45, 226, 230, 0.2) 0%, rgba(45, 226, 230, 0.1) 100%)',
              border: `2px solid ${isNewBest ? 'var(--color-neon-yellow)' : 'var(--color-neon-cyan)'}`,
              borderRadius: 'var(--radius-md)',
              color: isNewBest ? 'var(--color-neon-yellow)' : 'var(--color-neon-cyan)',
              cursor: 'pointer',
              boxShadow: isNewBest
                ? `
                  0 0 20px rgba(249, 197, 78, 0.3),
                  inset 0 0 20px rgba(249, 197, 78, 0.1)
                `
                : `
                  0 0 20px rgba(45, 226, 230, 0.3),
                  inset 0 0 20px rgba(45, 226, 230, 0.1)
                `,
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
              const bg = isNewBest ? 'rgba(249, 197, 78, 0.3)' : 'rgba(45, 226, 230, 0.3)';
              const shadow = isNewBest
                ? '0 0 30px rgba(249, 197, 78, 0.5), inset 0 0 30px rgba(249, 197, 78, 0.2)'
                : '0 0 30px rgba(45, 226, 230, 0.5), inset 0 0 30px rgba(45, 226, 230, 0.2)';
              e.currentTarget.style.background = bg;
              e.currentTarget.style.boxShadow = shadow;
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              const bg = isNewBest
                ? 'linear-gradient(180deg, rgba(249, 197, 78, 0.2) 0%, rgba(249, 197, 78, 0.1) 100%)'
                : 'linear-gradient(180deg, rgba(45, 226, 230, 0.2) 0%, rgba(45, 226, 230, 0.1) 100%)';
              const shadow = isNewBest
                ? '0 0 20px rgba(249, 197, 78, 0.3), inset 0 0 20px rgba(249, 197, 78, 0.1)'
                : '0 0 20px rgba(45, 226, 230, 0.3), inset 0 0 20px rgba(45, 226, 230, 0.1)';
              e.currentTarget.style.background = bg;
              e.currentTarget.style.boxShadow = shadow;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            TRY AGAIN
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
