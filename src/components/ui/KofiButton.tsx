import { useState, useEffect } from 'react';

const KOFI_USERNAME = 'benkoshishek';

export function KofiButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <>
      <button
        className="header-kofi-btn"
        onClick={() => setOpen(true)}
        aria-label="Support on Ko-fi"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </button>
      {open && (
        <div className="kofi-overlay" onClick={() => setOpen(false)}>
          <div className="kofi-panel" onClick={(e) => e.stopPropagation()}>
            <button className="kofi-close" onClick={() => setOpen(false)}>&times;</button>
            <iframe
              src={`https://ko-fi.com/${KOFI_USERNAME}?hidefeed=true&widget=true&embed=true`}
              className="kofi-iframe"
              title="Ko-fi donation"
            />
            <div className="kofi-profile-link">
              <a href={`https://ko-fi.com/${KOFI_USERNAME}`} target="_blank" rel="noopener noreferrer">
                ko-fi.com/{KOFI_USERNAME}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
