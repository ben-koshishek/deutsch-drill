import { useEffect, useRef } from 'react'

interface DrillFeedbackProps {
  correct: boolean
  userAnswer: string
  correctAnswer: string
  onContinue: () => void
}

export function DrillFeedback({
  correct,
  userAnswer,
  correctAnswer,
  onContinue,
}: DrillFeedbackProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    containerRef.current?.focus()

    // Auto-continue after 600ms if correct
    if (correct) {
      const timeout = setTimeout(onContinue, 600)
      return () => clearTimeout(timeout)
    }

    // Only listen for keypress on incorrect
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onContinue()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onContinue, correct])

  // Correct: brief success flash - full height
  if (correct) {
    return (
      <div className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-3xl border-2 border-success-400/40 bg-gradient-to-b from-success-400/10 to-grey-900 shadow-2xl">
        <div className="flex flex-1 flex-col items-center justify-center">
          {/* Success indicator */}
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-success-400/20 ring-4 ring-success-400/30">
            <svg className="h-10 w-10 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* The answer */}
          <p className="text-center text-8xl font-bold tracking-tight text-white lg:text-9xl">{correctAnswer}</p>
        </div>
      </div>
    )
  }

  // Incorrect: full height card
  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col overflow-hidden rounded-3xl border-2 border-destructive-400/30 bg-grey-900 shadow-2xl outline-none"
    >
      {/* Red accent bar at top */}
      <div className="h-1.5 bg-gradient-to-r from-destructive-500 via-destructive-400 to-destructive-500" />

      {/* Content - fills space */}
      <div className="flex flex-1 flex-col items-center justify-center px-12">
        {/* Label */}
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-destructive-400">
          Correct answer
        </p>

        {/* The answer - hero */}
        <p className="mb-8 text-center text-8xl font-bold tracking-tight text-white lg:text-9xl">
          {correctAnswer}
        </p>

        {/* What user typed */}
        {userAnswer && (
          <div className="inline-flex items-center gap-3 rounded-full bg-grey-800/80 px-5 py-2.5">
            <span className="text-sm text-grey-400">You typed</span>
            <span className="text-base font-medium text-grey-300 line-through decoration-destructive-400/60 decoration-2">
              {userAnswer}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-grey-800 bg-grey-800/40 px-16 py-4">
        <p className="text-center text-sm text-grey-500">
          Press{' '}
          <kbd className="mx-1 rounded-md border border-grey-600 bg-grey-700 px-2.5 py-1 font-mono text-xs font-medium text-grey-300 shadow-sm">
            Enter
          </kbd>
          {' '}to continue
        </p>
      </div>
    </div>
  )
}
