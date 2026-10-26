import { useEffect, useState } from 'react'
import { Play, Trophy, Target, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getDeckStats } from '@/lib/db'
import { DECK_ID, INITIAL_LIVES, MASTERY_THRESHOLD } from '@/lib/constants'
import type { DeckStats, TranslationCard } from '@/types'

interface StartScreenProps {
  deckName: string
  cards: TranslationCard[]
  onStart: () => void
}

export function StartScreen({ deckName, cards, onStart }: StartScreenProps) {
  const [stats, setStats] = useState<DeckStats | null>(null)

  useEffect(() => {
    getDeckStats(DECK_ID).then(setStats)
  }, [])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full" style={{ maxWidth: '400px' }}>
        {/* Header - 48px margin below */}
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <div
            className="mx-auto mb-4 flex items-center justify-center rounded-2xl bg-primary-600/20"
            style={{ width: '64px', height: '64px' }}
          >
            <span style={{ fontSize: '32px' }}>🇩🇪</span>
          </div>
          <h1 className="font-bold text-grey-50" style={{ fontSize: '32px', marginBottom: '8px' }}>
            {deckName}
          </h1>
          <p className="text-grey-400" style={{ fontSize: '16px' }}>
            Master all cards in both directions
          </p>
        </div>

        {/* Stats Card - 48px margin below */}
        <Card style={{ padding: '24px', marginBottom: '48px' }}>
          {/* Quick stats grid */}
          <div className="grid grid-cols-3" style={{ gap: '16px', marginBottom: stats && stats.totalAttempts > 0 ? '24px' : '0' }}>
            <div className="text-center">
              <div className="font-bold text-grey-50" style={{ fontSize: '24px' }}>{cards.length}</div>
              <div className="text-grey-500" style={{ fontSize: '12px' }}>Cards</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-grey-50" style={{ fontSize: '24px' }}>{MASTERY_THRESHOLD}x</div>
              <div className="text-grey-500" style={{ fontSize: '12px' }}>To Master</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-grey-50" style={{ fontSize: '24px' }}>{INITIAL_LIVES}</div>
              <div className="text-grey-500" style={{ fontSize: '12px' }}>Lives</div>
            </div>
          </div>

          {/* Previous stats */}
          {stats && stats.totalAttempts > 0 && (
            <>
              <div className="bg-grey-800" style={{ height: '1px', marginBottom: '24px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-grey-400" style={{ gap: '8px' }}>
                    <Trophy style={{ width: '16px', height: '16px' }} className="text-primary-400" />
                    <span style={{ fontSize: '13px' }}>Best Time</span>
                  </div>
                  <span className="font-semibold text-grey-100" style={{ fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>
                    {stats.bestTimeMs ? formatTime(stats.bestTimeMs) : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-grey-400" style={{ gap: '8px' }}>
                    <Target style={{ width: '16px', height: '16px' }} className="text-success-400" />
                    <span style={{ fontSize: '13px' }}>Best Run</span>
                  </div>
                  <span className="font-semibold text-grey-100" style={{ fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>
                    {stats.bestMistakes !== null ? `${stats.bestMistakes} mistakes` : '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-grey-400" style={{ gap: '8px' }}>
                    <Clock style={{ width: '16px', height: '16px' }} className="text-grey-500" />
                    <span style={{ fontSize: '13px' }}>Attempts</span>
                  </div>
                  <span className="font-semibold text-grey-100" style={{ fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>
                    {stats.totalWins}/{stats.totalAttempts} completed
                  </span>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Rules - 32px margin below */}
        <div className="text-grey-400" style={{ fontSize: '14px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p>
            <span className="text-grey-300">→</span> Answer {MASTERY_THRESHOLD}x correct in a row to master each card
          </p>
          <p>
            <span className="text-grey-300">→</span> Wrong answers reset progress and cost a life
          </p>
          <p>
            <span className="text-grey-300">→</span> Type <span className="text-grey-300">a</span> for <span className="text-grey-300">ä</span>, <span className="text-grey-300">o</span> for <span className="text-grey-300">ö</span>, etc.
          </p>
        </div>

        {/* Start Button */}
        <Button onClick={onStart} size="lg" className="w-full" style={{ gap: '8px' }}>
          <Play style={{ width: '20px', height: '20px' }} />
          Start Drill
        </Button>
      </div>
    </div>
  )
}
