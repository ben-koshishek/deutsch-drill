import { useEffect, useRef, useState } from 'react'
import { useDrill } from '@/hooks/useDrill'
import { useTimer } from '@/hooks/useTimer'
import { Timer } from '@/components/Timer'
import { LivesDisplay } from '@/components/LivesDisplay'
import { DrillProgress } from '@/components/DrillProgress'
import { DrillCard } from '@/components/DrillCard'
import { DrillFeedback } from '@/components/DrillFeedback'
import { Cheatsheet } from '@/components/Cheatsheet'
import { SessionSummary } from '@/components/SessionSummary'
import { GameOverScreen } from '@/components/GameOverScreen'
import { saveSessionResult, getDeckStats } from '@/lib/db'
import { DECK_ID } from '@/lib/constants'
import type { TranslationCard, DeckStats, Cheatsheet as CheatsheetData } from '@/types'

interface DrillScreenProps {
  cards: TranslationCard[]
  deckName: string
  cheatsheet?: CheatsheetData
  onExit: () => void
}

export function DrillScreen({ cards, deckName, cheatsheet, onExit }: DrillScreenProps) {
  const { state, stats, getQuestion, submitAnswer, nextCard, restart } = useDrill(cards)
  const timer = useTimer()
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [deckStats, setDeckStats] = useState<DeckStats | null>(null)
  const [sessionSaved, setSessionSaved] = useState(false)
  const [showCheatsheet, setShowCheatsheet] = useState(false)

  const cheatsheetAvailable =
    Boolean(cheatsheet) && (state.status === 'active' || state.status === 'feedback')

  // Tab opens the cheatsheet; the overlay handles closing itself
  useEffect(() => {
    if (!cheatsheetAvailable) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      e.preventDefault()
      setShowCheatsheet(true)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cheatsheetAvailable])

  useEffect(() => {
    if (state.status === 'active' && !timer.isRunning) {
      timer.start()
    }
  }, [state.status, timer])

  useEffect(() => {
    if (state.status === 'feedback') {
      feedbackRef.current?.focus()
    }
  }, [state.status])

  useEffect(() => {
    if ((state.status === 'complete' || state.status === 'game-over') && !sessionSaved) {
      timer.stop()

      const saveSession = async () => {
        await saveSessionResult({
          deckId: DECK_ID,
          completedAt: new Date(),
          durationMs: timer.elapsedMs,
          mistakeCount: state.mistakeCount,
          cardsCompleted: stats.mastered,
          won: state.status === 'complete',
        })

        const updatedStats = await getDeckStats(DECK_ID)
        setDeckStats(updatedStats)
        setSessionSaved(true)
      }

      saveSession()
    }
  }, [state.status, state.mistakeCount, stats.mastered, timer, sessionSaved])

  const handleRestart = () => {
    restart()
    timer.reset()
    setSessionSaved(false)
    setShowCheatsheet(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b border-grey-800 bg-grey-950/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
          <button
            onClick={onExit}
            className="text-sm font-medium text-grey-400 transition-colors hover:text-grey-200"
          >
            Exit
          </button>
          <h1 className="text-sm font-semibold text-grey-200">{deckName}</h1>
          <div className="flex items-center gap-4">
            <Timer time={timer.formatted} />
            <LivesDisplay lives={state.lives} />
          </div>
        </div>
        <div className="mx-auto max-w-2xl px-4 pb-3">
          <DrillProgress mastered={stats.mastered} total={stats.total} />
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 flex-col p-6">
        {state.status === 'active' && state.currentCard && (
          <div className="flex min-h-0 flex-1 flex-col">
            <DrillCard
              question={getQuestion(state.currentCard)}
              direction={state.currentCard.direction}
              grammar={state.currentCard.card.grammar}
              onSubmit={submitAnswer}
              onOpenCheatsheet={cheatsheet ? () => setShowCheatsheet(true) : undefined}
            />
          </div>
        )}

        {state.status === 'feedback' && state.lastAnswer && (
          <div ref={feedbackRef} tabIndex={-1} className="flex min-h-0 flex-1 flex-col outline-none">
            <DrillFeedback
              correct={state.lastAnswer.correct}
              userAnswer={state.lastAnswer.userAnswer}
              correctAnswer={state.lastAnswer.correctAnswer}
              onContinue={nextCard}
            />
          </div>
        )}

        {state.status === 'complete' && (
          <SessionSummary
            durationMs={timer.elapsedMs}
            mistakeCount={state.mistakeCount}
            cardsCompleted={stats.mastered}
            deckStats={deckStats}
            formatTime={timer.formatTime}
            onRestart={handleRestart}
          />
        )}

        {state.status === 'game-over' && (
          <GameOverScreen
            mistakeCount={state.mistakeCount}
            mastered={stats.mastered}
            total={stats.total}
            onRestart={handleRestart}
          />
        )}
      </main>

      {showCheatsheet && cheatsheet && cheatsheetAvailable && (
        <Cheatsheet cheatsheet={cheatsheet} onClose={() => setShowCheatsheet(false)} />
      )}
    </div>
  )
}
