import { Trophy, Clock, Target, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { DeckStats } from '@/types'

interface SessionSummaryProps {
  durationMs: number
  mistakeCount: number
  cardsCompleted: number
  deckStats: DeckStats | null
  formatTime: (ms: number) => string
  onRestart: () => void
}

export function SessionSummary({
  durationMs,
  mistakeCount,
  cardsCompleted,
  deckStats,
  formatTime,
  onRestart,
}: SessionSummaryProps) {
  const isNewBestTime = deckStats && deckStats.bestTimeMs === durationMs
  const isNewBestMistakes = deckStats && deckStats.bestMistakes === mistakeCount
  const isPerfect = mistakeCount === 0

  return (
    <Card className="w-full max-w-md">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Trophy icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-500/20">
          <Trophy className="h-12 w-12 text-success-400" />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-grey-50">
            {isPerfect ? 'Perfect!' : 'Complete!'}
          </h2>
          <p className="mt-1 text-grey-400">
            You mastered {cardsCompleted / 2} cards in both directions
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid w-full grid-cols-2 gap-3">
          <div className="flex flex-col items-center gap-1 rounded-lg bg-grey-800/50 p-4">
            <Clock className="h-5 w-5 text-primary-400" />
            <span className="text-2xl font-bold text-grey-50">{formatTime(durationMs)}</span>
            <span className="text-xs text-grey-500">Time</span>
            {isNewBestTime && (
              <span className="mt-1 rounded-full bg-primary-500/20 px-2 py-0.5 text-xs font-medium text-primary-300">
                New Best!
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 rounded-lg bg-grey-800/50 p-4">
            <Target className="h-5 w-5 text-success-400" />
            <span className="text-2xl font-bold text-grey-50">{mistakeCount}</span>
            <span className="text-xs text-grey-500">Mistakes</span>
            {isNewBestMistakes && !isPerfect && (
              <span className="mt-1 rounded-full bg-success-500/20 px-2 py-0.5 text-xs font-medium text-success-300">
                New Best!
              </span>
            )}
            {isPerfect && (
              <span className="mt-1 rounded-full bg-success-500/20 px-2 py-0.5 text-xs font-medium text-success-300">
                Flawless
              </span>
            )}
          </div>
        </div>

        {/* Previous best comparison */}
        {deckStats && deckStats.bestTimeMs && !isNewBestTime && (
          <div className="flex items-center gap-2 text-sm text-grey-500">
            <Zap className="h-4 w-4" />
            <span>Best time: {formatTime(deckStats.bestTimeMs)}</span>
          </div>
        )}

        {/* Action */}
        <Button onClick={onRestart} size="lg" className="w-full">
          Play Again
        </Button>
      </div>
    </Card>
  )
}
