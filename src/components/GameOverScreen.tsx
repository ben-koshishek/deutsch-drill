import { HeartCrack, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface GameOverScreenProps {
  mistakeCount: number
  mastered: number
  total: number
  onRestart: () => void
}

export function GameOverScreen({
  mistakeCount,
  mastered,
  total,
  onRestart,
}: GameOverScreenProps) {
  const progressPercent = Math.round((mastered / total) * 100)

  return (
    <Card className="w-full max-w-md">
      <div className="flex flex-col items-center gap-6 text-center">
        {/* Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive-500/20">
          <HeartCrack className="h-12 w-12 text-destructive-400" />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-grey-50">Game Over</h2>
          <p className="mt-1 text-grey-400">You ran out of lives</p>
        </div>

        {/* Progress */}
        <div className="w-full space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-grey-400">Progress</span>
            <span className="text-grey-300">{mastered} / {total} mastered</span>
          </div>
          <Progress value={progressPercent} />
        </div>

        {/* Stats */}
        <div className="text-sm text-grey-500">
          {mistakeCount} mistakes made
        </div>

        {/* Action */}
        <Button onClick={onRestart} size="lg" className="w-full gap-2">
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </Card>
  )
}
