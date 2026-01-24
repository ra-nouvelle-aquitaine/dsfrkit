'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

const progressVariants = cva('relative w-full overflow-hidden bg-background-contrast', {
  variants: {
    variant: {
      primary: '[&>div]:bg-primary',
      error: '[&>div]:bg-destructive',
      success: '[&>div]:bg-success',
      warning: '[&>div]:bg-warning',
      info: '[&>div]:bg-info',

      // Accentuations DSFR
      'green-tilleul-verveine': '[&>div]:bg-[var(--border-default-green-tilleul-verveine)]',
      'green-bourgeon': '[&>div]:bg-[var(--border-default-green-bourgeon)]',
      'green-emeraude': '[&>div]:bg-[var(--border-default-green-emeraude)]',
      'green-menthe': '[&>div]:bg-[var(--border-default-green-menthe)]',
      'green-archipel': '[&>div]:bg-[var(--border-default-green-archipel)]',
      'blue-ecume': '[&>div]:bg-[var(--border-default-blue-ecume)]',
      'blue-cumulus': '[&>div]:bg-[var(--border-default-blue-cumulus)]',
      'purple-glycine': '[&>div]:bg-[var(--border-default-purple-glycine)]',
      'pink-macaron': '[&>div]:bg-[var(--border-default-pink-macaron)]',
      'pink-tuile': '[&>div]:bg-[var(--border-default-pink-tuile)]',
      'yellow-tournesol': '[&>div]:bg-[var(--border-default-yellow-tournesol)]',
      'yellow-moutarde': '[&>div]:bg-[var(--border-default-yellow-moutarde)]',
      'orange-terre-battue': '[&>div]:bg-[var(--border-default-orange-terre-battue)]',
      'brown-cafe-creme': '[&>div]:bg-[var(--border-default-brown-cafe-creme)]',
      'brown-caramel': '[&>div]:bg-[var(--border-default-brown-caramel)]',
      'brown-opera': '[&>div]:bg-[var(--border-default-brown-opera)]',
      'beige-gris-galet': '[&>div]:bg-[var(--border-default-beige-gris-galet)]',
    },
    size: {
      sm: 'h-2',
      default: 'h-4',
      lg: 'h-6',
      xl: 'h-8',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  /** Durée de la transition d'animation en millisecondes */
  animationDuration?: number
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, animationDuration = 500, variant, size, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      tabIndex={-1}
      className={cn(progressVariants({ variant, size, className }))}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          transition: `transform ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
    </ProgressPrimitive.Root>
  )
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
