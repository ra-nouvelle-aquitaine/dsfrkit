import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

const indicatorVariants = cva(
  'absolute flex items-center justify-center rounded-full font-medium',
  {
    variants: {
      variant: {
        default: 'bg-destructive text-background',
        success: 'bg-success text-background',
        warning: 'bg-warning text-background',
        info: 'bg-info text-background',

        // Accentuations DSFR
        'green-tilleul-verveine':
          'bg-[var(--background-contrast-green-tilleul-verveine)] text-[var(--text-label-green-tilleul-verveine)]',
        'green-bourgeon':
          'bg-[var(--background-contrast-green-bourgeon)] text-[var(--text-label-green-bourgeon)]',
        'green-emeraude':
          'bg-[var(--background-contrast-green-emeraude)] text-[var(--text-label-green-emeraude)]',
        'green-menthe':
          'bg-[var(--background-contrast-green-menthe)] text-[var(--text-label-green-menthe)]',
        'green-archipel':
          'bg-[var(--background-contrast-green-archipel)] text-[var(--text-label-green-archipel)]',
        'blue-ecume':
          'bg-[var(--background-contrast-blue-ecume)] text-[var(--text-label-blue-ecume)]',
        'blue-cumulus':
          'bg-[var(--background-contrast-blue-cumulus)] text-[var(--text-label-blue-cumulus)]',
        'purple-glycine':
          'bg-[var(--background-contrast-purple-glycine)] text-[var(--text-label-purple-glycine)]',
        'pink-macaron':
          'bg-[var(--background-contrast-pink-macaron)] text-[var(--text-label-pink-macaron)]',
        'pink-tuile':
          'bg-[var(--background-contrast-pink-tuile)] text-[var(--text-label-pink-tuile)]',
        'yellow-tournesol':
          'bg-[var(--background-contrast-yellow-tournesol)] text-[var(--text-label-yellow-tournesol)]',
        'yellow-moutarde':
          'bg-[var(--background-contrast-yellow-moutarde)] text-[var(--text-label-yellow-moutarde)]',
        'orange-terre-battue':
          'bg-[var(--background-contrast-orange-terre-battue)] text-[var(--text-label-orange-terre-battue)]',
        'brown-cafe-creme':
          'bg-[var(--background-contrast-brown-cafe-creme)] text-[var(--text-label-brown-cafe-creme)]',
        'brown-caramel':
          'bg-[var(--background-contrast-brown-caramel)] text-[var(--text-label-brown-caramel)]',
        'brown-opera':
          'bg-[var(--background-contrast-brown-opera)] text-[var(--text-label-brown-opera)]',
        'beige-gris-galet':
          'bg-[var(--background-contrast-beige-gris-galet)] text-[var(--text-label-beige-gris-galet)]',
      },
      size: {
        default: 'h-5 min-w-[1.25rem] px-1 text-xs -top-1 -right-1',
        sm: 'h-3 min-w-[0.75rem] px-0 text-[0.5rem] -top-0.5 -right-0.5',
        dot: 'h-2.5 w-2.5 p-0 -top-0.5 -right-0.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface IndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof indicatorVariants> {
  /** The element to wrap with the indicator */
  children: React.ReactNode
  /** Number to display inside the indicator (if size is not 'dot') */
  count?: number
  /** Maximum number to display before showing a plus sign (e.g. 99+) */
  max?: number
  /** Whether the indicator is visible */
  show?: boolean
}

/**
 * Composant générique permettant d'ajouter une pastille (notification, badge numérique)
 * sur n'importe quel élément (souvent une icône).
 *
 * @example
 * ```tsx
 * <Indicator count={5}>
 *   <NotificationIcon />
 * </Indicator>
 * ```
 */
const Indicator = React.forwardRef<HTMLSpanElement, IndicatorProps>(
  ({ className, variant, size, count, max = 99, show = true, children, ...props }, ref) => {
    if (!show) {
      return <>{children}</>
    }

    const displayCount = count !== undefined && count > max ? `${max}+` : count

    return (
      <span className="relative inline-flex">
        {children}
        <span ref={ref} className={cn(indicatorVariants({ variant, size, className }))} {...props}>
          {size !== 'dot' && displayCount !== undefined ? displayCount : null}
        </span>
      </span>
    )
  }
)
Indicator.displayName = 'Indicator'

export { Indicator, indicatorVariants }
