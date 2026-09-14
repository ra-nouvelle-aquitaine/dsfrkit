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
 *
 * // Radio riche avec pictogramme (fr-radio-rich)
 * <RadioGroup defaultValue="mairie">
 *   <RadioGroupItem
 *     value="mairie"
 *     label="En mairie"
 *     pictogram={<Artwork name="buildings/city-hall" size={56} />}
 *   />
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
          'border-primary text-primary focus-visible:ring-ring data-[state=checked]:border-primary',
        // Error : bordure rouge
        error:
          'border-destructive text-destructive focus-visible:ring-ring data-[state=checked]:border-destructive',
        // Success : bordure verte
        success:
          'border-success text-success focus-visible:ring-ring data-[state=checked]:border-success',
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
  /**
   * Pictogramme décoratif (ex. `<Artwork name="buildings/city-hall" />`).
   * Active la présentation « riche » du DSFR (`fr-radio-rich`) : l'option
   * devient une carte bordée, pictogramme à droite. Le pictogramme est masqué
   * des technologies d'assistance ; le libellé reste le nom accessible.
   */
  pictogram?: React.ReactNode
}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, variant, size, label, hint, pictogram, id, ...props }, ref) => {
  const generatedId = React.useId()
  const radioId = id || generatedId
  const inputOrGeneratedId = radioId
  const hintId = `${inputOrGeneratedId}-hint`
  const isRich = pictogram !== undefined && pictogram !== null
  // Le radio riche du DSFR utilise la petite pastille (1rem).
  const radioSize = isRich ? (size ?? 'sm') : size

  const radio = (
    <RadioGroupPrimitive.Item
      ref={ref}
      id={radioId}
      className={cn(radioVariants({ variant, size: radioSize, className }))}
      // En présentation riche, l'aide est dans le libellé : la décrire en plus la ferait lire deux fois.
      aria-describedby={hint && !isRich ? hintId : undefined}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <span
          className={cn(
            'rounded-full bg-current',
            radioSize === 'sm' && 'h-2 w-2',
            radioSize === 'md' && 'h-3 w-3',
            !radioSize && 'h-3 w-3'
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )

  if (isRich) {
    return (
      <div
        className={cn(
          'group/rich relative flex items-stretch bg-background transition-colors motion-reduce:transition-none',
          '[&:not(:has(:disabled)):hover]:bg-background-hover [&:not(:has(:disabled)):active]:bg-background-active',
          // Cadre 1px gris, bleu une fois l'option cochée ; posé au-dessus des zones internes.
          "after:pointer-events-none after:absolute after:inset-0 after:content-['']",
          'after:shadow-[inset_0_0_0_1px_var(--border-default-grey)]',
          'has-[[data-state=checked]]:after:shadow-[inset_0_0_0_1px_var(--border-active-blue-france)]',
          'has-[:disabled[data-state=checked]]:after:shadow-[inset_0_0_0_1px_var(--text-disabled-grey)]'
        )}
      >
        <span className="absolute left-4 top-1/2 z-[1] flex -translate-y-1/2">{radio}</span>
        <label
          htmlFor={radioId}
          className={cn(
            'flex min-h-[5.5rem] flex-1 cursor-pointer flex-col justify-center py-3 pl-11 pr-4',
            'text-base leading-6 text-foreground',
            // Toute la carte, pictogramme compris, sélectionne l'option.
            "before:absolute before:inset-0 before:content-['']",
            'group-has-[:disabled]/rich:cursor-not-allowed group-has-[:disabled]/rich:text-foreground-disabled'
          )}
        >
          {label}
          {hint && (
            <span
              id={hintId}
              className="text-xs leading-5 text-muted-foreground group-has-[:disabled]/rich:text-foreground-disabled"
            >
              {hint}
            </span>
          )}
        </label>
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none relative flex w-[5.5rem] min-w-[5.5rem] items-center justify-center p-1',
            // Séparateur gris qui s'arrête à 4px des bords, comme `fr-radio-rich__pictogram`.
            "before:absolute before:inset-y-1 before:left-0 before:w-px before:bg-border before:content-['']",
            '[&_img]:max-h-14 [&_img]:max-w-14 [&_svg]:max-h-14 [&_svg]:max-w-14',
            'group-has-[:disabled]/rich:opacity-50 group-has-[:disabled]/rich:grayscale'
          )}
        >
          {pictogram}
        </div>
      </div>
    )
  }

  if (!label && !hint) {
    return radio
  }

  return (
    <div className="flex items-start gap-3">
      {radio}
      <div className="grid gap-1">
        {label && (
          <label
            htmlFor={radioId}
            className="cursor-pointer text-base leading-6 text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem, radioVariants }
