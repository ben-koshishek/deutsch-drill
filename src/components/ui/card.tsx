import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-grey-800 bg-grey-900 p-6 shadow-xl',
        className
      )}
      {...props}
    />
  )
}
