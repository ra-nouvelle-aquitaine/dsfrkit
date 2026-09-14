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

/** Icône `fr--error-fill` du DSFR, portée par les messages d'erreur (`fr-message--error`). */
function ErrorFillIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17.5,2.5h-11L1,12l5.5,9.5h11L23,12L17.5,2.5z M16.2,14.8l-1.4,1.4L12,13.4l-2.8,2.8l-1.4-1.4l2.8-2.8L7.8,9.2l1.4-1.4l2.8,2.8l2.8-2.8l1.4,1.4L13.4,12L16.2,14.8z"
      />
    </svg>
  )
}

const checkboxVariants = cva(
  // Base DSFR : border-radius 4px, bordure bleue france
  'peer shrink-0 rounded border bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-foreground-inverted transition-colors',
  {
    variants: {
      variant: {
        // Default : bordure bleue france
        default: 'border-primary data-[state=checked]:bg-primary focus-visible:ring-ring',
        // Error : bordure rouge
        error: 'border-error data-[state=checked]:bg-error focus-visible:ring-ring',
        // Success : bordure verte
        success: 'border-success data-[state=checked]:bg-success focus-visible:ring-ring',
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
  (
    {
      className,
      variant,
      size,
      label,
      hint,
      error,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const checkboxId = id || generatedId
    const inputOrGeneratedId = checkboxId
    const hintId = `${inputOrGeneratedId}-hint`
    const errorId = `${inputOrGeneratedId}-error`
    const describedBy = [ariaDescribedBy, hint ? hintId : undefined, error ? errorId : undefined]
      .filter(Boolean)
      .join(' ')

    const checkbox = (
      <CheckboxPrimitive.Root
        ref={ref}
        id={checkboxId}
        className={cn(checkboxVariants({ variant: error ? 'error' : variant, size, className }))}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy || undefined}
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
      // Structure `fr-checkbox-group` : la barre d'erreur longe tout le groupe et
      // le message d'erreur repart sous la case, aligné à gauche, icône en tête.
      <div
        className={cn(
          'relative',
          error && 'before:absolute before:inset-y-0 before:-left-3 before:w-0.5 before:bg-error'
        )}
      >
        <div
          className={cn(
            'flex gap-2',
            size === 'sm' && 'items-center',
            size === 'md' && 'items-start',
            !size && 'items-start'
          )}
        >
          {checkbox}
          <div className="grid">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  'cursor-pointer text-base leading-6 peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  error ? 'text-error' : 'text-foreground'
                )}
              >
                {label}
              </label>
            )}
            {hint && (
              <p id={hintId} className="text-xs leading-5 text-muted-foreground">
                {hint}
              </p>
            )}
          </div>
        </div>
        {error && (
          <p
            id={errorId}
            className="mt-4 flex items-start gap-1 text-xs leading-5 text-error"
            role="alert"
          >
            <ErrorFillIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export { Checkbox, checkboxVariants }
