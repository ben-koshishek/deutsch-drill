import { cn } from '@/lib/utils'

interface ProgressProps {
  value: number
  className?: string
}

export function Progress({ value, className }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-grey-800', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-500 ease-out"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  )
}
