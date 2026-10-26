import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimerProps {
  time: string
  className?: string
}

export function Timer({ time, className }: TimerProps) {
  return (
    <div className={cn('flex items-center gap-2 text-grey-400', className)}>
      <Clock className="h-4 w-4" />
      <span className="font-mono text-sm tabular-nums">{time}</span>
    </div>
  )
}
