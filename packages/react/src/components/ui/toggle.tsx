import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Toggle (Interrupteur) DSFR
 * Utilise Radix UI Switch pour l'accessibilité
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur
 */

const toggleVariants = cva(
  'peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-primary bg-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none',
  {
    variants: {
      variant: {
        // En DSFR, le toggle n'a qu'un seul style visuel d'activation (bleu), les états (succès/erreur) s'affichent via des messages textes.
        default:
          'data-[state=unchecked]:bg-transparent data-[state=checked]:bg-primary focus-visible:ring-ring',
      },
      size: {
        sm: 'h-5 w-9',
        md: 'h-6 w-10',
        lg: 'h-7 w-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

const toggleThumbVariants = cva(
  'pointer-events-none block rounded-full border border-primary bg-background ring-0 transition-transform motion-reduce:transition-none',
  {
    variants: {
      size: {
        sm: 'h-5 w-5 data-[state=checked]:translate-x-4 data-[state=unchecked]:-ml-1 data-[state=unchecked]:translate-x-0',
        md: 'h-6 w-6 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        lg: 'h-7 w-7 data-[state=checked]:translate-x-7 data-[state=unchecked]:-ml-1 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  /** Label du toggle */
  label?: string
  /** Texte d'aide */
  hint?: string
  /** Message d'erreur DSFR */
  error?: string
  /** Message de succès DSFR */
  success?: string
  /** Afficher le label à gauche ou à droite du toggle (défaut: right) */
  labelPosition?: 'left' | 'right'
}

/**
 * Toggle (Interrupteur) accessible avec label et gestion d'erreurs
 *
 * @example
 * ```tsx
 * <Toggle label="Notifications" />
 * <Toggle label="Mode sombre" hint="Activer le thème sombre" />
 * <Toggle label="Bluetooth" error="Impossible d'activer le Bluetooth" />
 * ```
 */
const Toggle = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      label,
      hint,
      error,
      success,
      labelPosition = 'right',
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const toggleId = id || generatedId
    const inputOrGeneratedId = toggleId
    const hintId = `${inputOrGeneratedId}-hint`
    const errorId = `${inputOrGeneratedId}-error`
    const successId = `${inputOrGeneratedId}-success`

    const stateDescriptionId = error ? errorId : success ? successId : undefined
    const describedBy = [ariaDescribedBy, hint ? hintId : undefined, stateDescriptionId]
      .filter(Boolean)
      .join(' ')

    const toggle = (
      <SwitchPrimitive.Root
        ref={ref}
        id={toggleId}
        className={cn(toggleVariants({ variant, size, className }))}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      >
        <SwitchPrimitive.Thumb className={cn(toggleThumbVariants({ size }), 'group relative')}>
          {/* Icône check visible uniquement quand activé (data-state est sur le Thumb) */}
          <svg
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={cn(
              'absolute inset-0 m-auto transition-opacity duration-150',
              size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-3.5 h-3.5' : 'w-3 h-3',
              // Invisible au repos, visible quand le thumb est coché
              'opacity-0 group-data-[state=checked]:opacity-100'
            )}
          >
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            />
          </svg>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    )

    if (!label && !hint && !error && !success) {
      return toggle
    }

    const labelContent = (
      <div className="grid gap-1">
        {label && (
          <label
            htmlFor={toggleId}
            className={cn(
              'font-medium text-foreground cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              // text + line-height adaptés à la taille du toggle
              size === 'sm'
                ? 'text-sm leading-5'
                : size === 'lg'
                  ? 'text-base leading-7'
                  : 'text-base leading-6'
            )}
          >
            {label}
          </label>
        )}
        {hint && (
          <p id={hintId} className="mt-2 text-xs leading-5 text-muted-foreground">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className="mt-2 text-xs leading-5 text-destructive" role="alert">
            {error}
          </p>
        )}
        {!error && success && (
          <p id={successId} className="mt-2 text-xs leading-5 text-success" role="status">
            {success}
          </p>
        )}
      </div>
    )

    return (
      <div className="flex items-start gap-3">
        {labelPosition === 'left' && labelContent}
        <div className="mt-0.5">{toggle}</div>
        {labelPosition === 'right' && labelContent}
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'

export { Toggle, toggleVariants }
