import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface BrutalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'white'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isGhost?: boolean
}

export const BrutalButton = forwardRef<HTMLButtonElement, BrutalButtonProps>(
  ({ className, variant = 'primary', size = 'md', isGhost = false, children, ...props }, ref) => {
    const baseStyles = 'font-bold transition-all duration-300 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variantStyles = {
      primary: cn(
        'bg-primary-500 text-white hover:bg-primary-600',
        isGhost && 'bg-transparent border-primary-500 text-primary-500 hover:bg-primary-50'
      ),
      secondary: cn(
        'bg-secondary-500 text-black hover:bg-secondary-600',
        isGhost && 'bg-transparent border-secondary-500 text-secondary-500 hover:bg-secondary-50'
      ),
      accent: cn(
        'bg-accent-500 text-white hover:bg-accent-600',
        isGhost && 'bg-transparent border-accent-500 text-accent-500 hover:bg-accent-50'
      ),
      white: cn(
        'bg-white text-foreground hover:bg-gray-50',
        isGhost && 'bg-transparent border-white text-white hover:bg-white/10'
      ),
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm brutal-shadow',
      md: 'px-4 py-2 text-base brutal-shadow',
      lg: 'px-6 py-3 text-lg brutal-shadow',
      xl: 'px-8 py-4 text-xl brutal-shadow',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

BrutalButton.displayName = 'BrutalButton' 