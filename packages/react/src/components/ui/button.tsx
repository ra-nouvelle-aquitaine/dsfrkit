import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Variants du bouton DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton
 */
const buttonVariants = cva(
  // Classes de base - DSFR n'utilise pas de border-radius.
  // `cursor-pointer` est explicite : Tailwind v4 a retiré de son preflight la
  // règle qui posait la main sur les boutons, et `.fr-btn` du DSFR la porte.
  'inline-flex cursor-pointer items-center justify-center gap-2 font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-background-contrast disabled:text-foreground-disabled disabled:shadow-none',
  {
    variants: {
      variant: {
        // Bouton primaire - fond bleu france
        primary:
          'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
        // Bouton secondaire DSFR - bordure bleu france, fond transparent, survol fond bleu très clair
        secondary:
          'bg-transparent text-primary shadow-[inset_0_0_0_1px_currentColor] hover:bg-background-open-blue-france active:bg-background-open-blue-france/80',
        // Bouton tertiaire DSFR - bordure grise, fond transparent
        tertiary:
          'bg-transparent text-primary ring-1 ring-inset ring-border hover:bg-background-contrast active:bg-background-contrast/80',
        // Bouton tertiaire sans contour (ghost) - sans bordure
        ghost: 'bg-transparent text-primary hover:bg-muted active:bg-background-contrast',
        // Variantes sémantiques
        destructive: 'bg-destructive text-foreground-inverted hover:opacity-90 active:opacity-80',
        danger: 'bg-destructive text-foreground-inverted hover:opacity-90 active:opacity-80',
        success: 'bg-success text-foreground-inverted hover:opacity-90 active:opacity-80',
        warning: 'bg-warning text-foreground-inverted hover:opacity-90 active:opacity-80',
        // Bouton lien
        link: 'bg-transparent text-primary underline underline-offset-4 hover:text-primary-hover',
      },
      size: {
        // Tailles DSFR officielles
        sm: 'min-h-8 py-1 px-3 text-sm leading-6',
        md: 'min-h-10 py-2 px-4 text-base leading-6',
        lg: 'min-h-12 py-3 px-6 text-lg leading-6',
      },
      fullWidth: {
        true: 'w-full flex',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Si true, rend le composant enfant au lieu d'un bouton
   * Utile pour l'intégration avec les routeurs (Next.js, React Router, etc.)
   */
  asChild?: boolean
  /**
   * L'icône à afficher dans le bouton (ex: `<RemixIcon />`)
   */
  icon?: React.ReactNode
  /**
   * La position de l'icône ('start' ou 'end'). Par défaut: 'start'
   */
  iconPosition?: 'start' | 'end'
  /**
   * Si true, affiche un spinner de chargement et désactive le bouton
   */
  loading?: boolean
}

/**
 * Composant Button DSFR
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      icon,
      iconPosition = 'start',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isActuallyDisabled = disabled || loading

    const actualIcon = loading ? (
      <svg
        className="animate-spin h-5 w-5 text-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    ) : (
      icon
    )

    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, fullWidth, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isActuallyDisabled}
        {...props}
      >
        {actualIcon && iconPosition === 'start' && (
          <span className="flex-shrink-0 flex items-center justify-center" aria-hidden="true">
            {actualIcon}
          </span>
        )}
        {children}
        {actualIcon && iconPosition === 'end' && (
          <span className="flex-shrink-0 flex items-center justify-center" aria-hidden="true">
            {actualIcon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
