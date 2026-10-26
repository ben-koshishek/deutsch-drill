import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface DrillProgressProps {
  mastered: number
  total: number
  className?: string
}

export function DrillProgress({ mastered, total, className }: DrillProgressProps) {
  const percent = Math.round((mastered / total) * 100)

  return (
    <div className={cn('w-full space-y-1', className)}>
      <Progress value={percent} />
      <div className="flex justify-between text-xs text-grey-500">
        <span>{mastered} / {total}</span>
        <span>{percent}%</span>
      </div>
    </div>
  )
}
