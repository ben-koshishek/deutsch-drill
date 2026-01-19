interface ResetConfirmModalProps {
  deckName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ResetConfirmModal({
  deckName,
  onConfirm,
  onCancel,
}: ResetConfirmModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 10, 18, 0.9)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg, var(--color-card-bg) 0%, rgba(22, 22, 42, 0.95) 100%)',
          border: '1px solid var(--color-error)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          maxWidth: '400px',
          width: '90%',
          boxShadow: `
            0 0 40px rgba(255, 77, 109, 0.2),
            0 20px 60px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.05)
          `,
          animation: 'modalSlideUp 0.3s ease-out',
        }}
      >
        {/* Warning icon */}
        <div
          style={{
            width: '48px',
            height: '48px',
            margin: '0 auto var(--space-5)',
            borderRadius: '50%',
            background: 'rgba(255, 77, 109, 0.15)',
            border: '2px solid var(--color-error)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 0 20px rgba(255, 77, 109, 0.3)',
          }}
        >
          ⚠
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '14px',
            letterSpacing: '0.1em',
            color: 'var(--color-error)',
            textAlign: 'center',
            margin: '0 0 var(--space-4)',
            textShadow: '0 0 10px var(--color-error-glow)',
          }}
        >
          RESET PROGRESS?
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            margin: '0 0 var(--space-6)',
            lineHeight: 1.5,
          }}
        >
          This will restart the current circle for <strong style={{ color: 'var(--color-text)' }}>{deckName}</strong>.
          Your completed circles will be kept.
        </p>

        {/* Warning badge */}
        <div
          style={{
            background: 'rgba(255, 77, 109, 0.1)',
            border: '1px solid rgba(255, 77, 109, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3) var(--space-4)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'var(--color-error)',
            }}
          >
            THIS CANNOT BE UNDONE
          </span>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
          }}
        >
          <button
            onClick={onCancel}
            style={{
              flex: 1,
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              padding: 'var(--space-3) var(--space-4)',
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-tertiary)';
              e.currentTarget.style.borderColor = 'var(--color-text-subtle)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--color-bg-secondary)';
              e.currentTarget.style.borderColor = 'var(--color-border)';
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              fontFamily: 'var(--font-display)',
              fontSize: '12px',
              letterSpacing: '0.05em',
              padding: 'var(--space-3) var(--space-4)',
              background: 'linear-gradient(180deg, rgba(255, 77, 109, 0.3) 0%, rgba(255, 77, 109, 0.15) 100%)',
              border: '1px solid var(--color-error)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-error)',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(255, 77, 109, 0.2)',
              transition: 'all var(--transition-base)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 77, 109, 0.4)';
              e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 77, 109, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255, 77, 109, 0.3) 0%, rgba(255, 77, 109, 0.15) 100%)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 77, 109, 0.2)';
            }}
          >
            RESET
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
