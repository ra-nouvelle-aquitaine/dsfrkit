import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Radio DSFR
 * Utilise Radix UI Radio Group pour l'accessibilité
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio
 *
 * @example
 * ```tsx
 * <RadioGroup defaultValue="1">
 *   <RadioGroupItem value="1" label="Option 1" hint="Détails" />
 *   <RadioGroupItem value="2" label="Option 2" />
 * </RadioGroup>
 * ```
 */

const radioVariants = cva(
  // DSFR : bordure 1px, rond parfait, couleur bleue france par défaut
  'aspect-square rounded-full border ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-background',
  {
    variants: {
      variant: {
        // Default : bordure bleue france
        default:
          'border-primary text-primary focus-visible:ring-primary data-[state=checked]:border-primary',
        // Error : bordure rouge
        error:
          'border-destructive text-destructive focus-visible:ring-destructive data-[state=checked]:border-destructive',
        // Success : bordure verte
        success:
          'border-success text-success focus-visible:ring-success data-[state=checked]:border-success',
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

/* RadioGroup */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn('grid gap-3', className)} {...props} />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/* RadioGroupItem */
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  /** Label du radio */
  label?: string
  /** Texte d'aide */
  hint?: string
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, size, label, hint, id, ...props }, ref) => {
  const generatedId = React.useId()
  const radioId = id || generatedId
  const inputOrGeneratedId = radioId
  const hintId = `${inputOrGeneratedId}-hint`

  const radio = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={radioId}
      className={cn(radioVariants({ variant, size, className }))}
      aria-describedby={hint ? hintId : undefined}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span
          className={cn(
            'rounded-full bg-current',
            size === 'sm' && 'h-2 w-2',
            size === 'md' && 'h-3 w-3',
            !size && 'h-3 w-3'
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )

  if (!label && !hint) {
    return radio
  }

  return (
    <div className="flex items-start gap-3">
      {radio}
      <div className="grid gap-1 leading-none">
        {label && (
          <label
            htmlFor={radioId}
            className="text-sm font-medium text-foreground cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {hint && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}
      </div>
    </div>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem, radioVariants }
