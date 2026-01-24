import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Checkbox DSFR
 * Utilise Radix UI Checkbox pour l'accessibilité
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/case-a-cocher
 *
 * Le checkbox DSFR a un border-radius de 4px et une bordure bleue france
 */

const checkboxVariants = cva(
  // Base DSFR : border-radius 4px, bordure bleue france
  'peer shrink-0 rounded border bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-foreground-inverted transition-colors',
  {
    variants: {
      variant: {
        // Default : bordure bleue france
        default: 'border-primary data-[state=checked]:bg-primary focus-visible:ring-primary',
        // Error : bordure rouge
        error: 'border-error data-[state=checked]:bg-error focus-visible:ring-error',
        // Success : bordure verte
        success: 'border-success data-[state=checked]:bg-success focus-visible:ring-success',
      },
      size: {
        // SM : 16px (1rem)
        sm: 'h-4 w-4',
        // MD : 24px (1.5rem) - défaut DSFR
        md: 'h-6 w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  /** Label du checkbox */
  label?: string
  /** Texte d'aide */
  hint?: string
  /** Message d'erreur */
  error?: string
}

/**
 * Checkbox accessible avec label et états
 *
 * @example
 * ```tsx
 * <Checkbox label="J'accepte les conditions" />
 * <Checkbox label="Newsletter" hint="Recevez nos actualités" />
 * <Checkbox label="Obligatoire" error="Ce champ est requis" variant="error" />
 * ```
 */
const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, variant, size, label, hint, error, id, ...props }, ref) => {
    const generatedId = React.useId()
    const checkboxId = id || generatedId
    const inputOrGeneratedId = checkboxId
    const hintId = `${inputOrGeneratedId}-hint`
    const errorId = `${inputOrGeneratedId}-error`

    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(checkboxVariants({ variant: error ? 'error' : variant, size, className }))}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              size === 'sm' && 'h-3 w-3',
              size === 'md' && 'h-4 w-4',
              !size && 'h-4 w-4'
            )}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )

    if (!label && !hint && !error) {
      return checkbox
    }

    return (
      <div
        className={cn(
          'flex gap-3',
          size === 'sm' && 'items-center',
          size === 'md' && 'items-start',
          !size && 'items-start'
        )}
      >
        {checkbox}
        <div className="grid gap-1 leading-none">
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium text-foreground cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
          {hint && !error && (
            <p id={hintId} className="text-sm text-muted-foreground">
              {hint}
            </p>
          )}
          {error && (
            <p id={errorId} className="text-sm text-error font-medium">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox, checkboxVariants }
