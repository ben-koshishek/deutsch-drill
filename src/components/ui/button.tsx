import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-grey-950',
          'disabled:pointer-events-none disabled:opacity-50',
          'active:scale-[0.98]',
          // Variants
          variant === 'primary' && [
            'bg-primary-500 text-white',
            'shadow-lg shadow-primary-500/25',
            'hover:bg-primary-400 hover:shadow-xl hover:shadow-primary-500/30',
          ],
          variant === 'secondary' && [
            'bg-grey-800 text-grey-100',
            'border border-grey-700',
            'hover:bg-grey-700',
          ],
          variant === 'ghost' && [
            'text-grey-400',
            'hover:text-grey-100 hover:bg-grey-800',
          ],
          // Sizes
          size === 'sm' && 'h-9 px-4 text-sm rounded-lg',
          size === 'md' && 'h-11 px-5 text-base rounded-xl',
          size === 'lg' && 'h-14 px-8 text-lg rounded-xl',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button }
