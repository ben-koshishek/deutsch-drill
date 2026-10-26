import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Base
        'flex h-14 w-full rounded-xl border-2 bg-grey-950 px-5 text-lg text-white',
        // Border
        'border-grey-700',
        // Placeholder
        'placeholder:text-grey-500',
        // Transitions
        'transition-all duration-200',
        // Hover
        'hover:border-grey-600',
        // Focus
        'focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20',
        // Disabled
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
