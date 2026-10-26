import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { INITIAL_LIVES } from '@/lib/constants'

interface LivesDisplayProps {
  lives: number
  className?: string
}

export function LivesDisplay({ lives, className }: LivesDisplayProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
        <Heart
          key={i}
          className={cn(
            'h-5 w-5 transition-all duration-300',
            i < lives
              ? 'fill-destructive-500 text-destructive-500'
              : 'fill-grey-800 text-grey-700'
          )}
        />
      ))}
    </div>
  )
}
