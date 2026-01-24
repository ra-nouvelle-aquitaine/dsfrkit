'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Contrôle segmenté DSFR — fr-segmented
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/controle-segmente
 *
 * Structure DSFR : le groupe a un fond neutre, l'élément actif a une bordure inset primary.
 */
const buttonGroupVariants = cva(
  'inline-flex items-center p-1 bg-muted shadow-[inset_1px_1px_0_0_var(--border-default-grey),inset_-1px_0_0_0_var(--border-default-grey)]',
  {
    variants: {
      size: {
        sm: 'min-h-8',
        md: 'min-h-10',
        lg: 'min-h-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const buttonGroupItemVariants = cva(
  // Base : texte, fond transparent (laisse voir le bg-muted du parent), bordure droite entre items
  cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50 text-foreground',
    // Hover
    'hover:bg-background-hover hover:text-foreground',
    // Actif : fond blanc/noir pour se détacher du conteneur, texte primary, bordure inset primary (border-active)
    'data-[state=on]:bg-background-default data-[state=on]:text-primary data-[state=on]:font-bold',
    'data-[state=on]:shadow-[inset_0_0_0_1px_var(--border-active-blue-france)]'
  ),
  {
    variants: {
      size: {
        sm: 'px-3 text-sm min-h-8',
        md: 'px-4 text-base min-h-10',
        lg: 'px-5 text-base min-h-12',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

type ButtonGroupContextValue = { size?: 'sm' | 'md' | 'lg' }
const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({})

interface ButtonGroupBaseProps extends VariantProps<typeof buttonGroupVariants> {
  className?: string
  children?: React.ReactNode
  /** Label du groupe pour l'accessibilité */
  legend?: string
}

export interface ButtonGroupSingleProps extends ButtonGroupBaseProps {
  type: 'single'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export interface ButtonGroupMultipleProps extends ButtonGroupBaseProps {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type ButtonGroupProps = ButtonGroupSingleProps | ButtonGroupMultipleProps

/**
 * Composant ButtonGroup / Contrôle segmenté DSFR
 *
 * @example
 * ```tsx
 * <ButtonGroup type="single" defaultValue="carte">
 *   <ButtonGroupItem value="carte">Carte</ButtonGroupItem>
 *   <ButtonGroupItem value="liste">Liste</ButtonGroupItem>
 *   <ButtonGroupItem value="tableau">Tableau</ButtonGroupItem>
 * </ButtonGroup>
 * ```
 */
const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  const { className, size, legend, children, ...rest } = props

  const contextValue = React.useMemo(() => ({ size: size ?? 'md' }), [size])

  const inner = (
    <ButtonGroupContext.Provider value={contextValue}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(buttonGroupVariants({ size, className }))}
        {...(rest as React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>)}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ButtonGroupContext.Provider>
  )

  if (legend) {
    return (
      <fieldset className="border-0 p-0 m-0">
        <legend className="text-sm font-bold text-foreground-title mb-2">{legend}</legend>
        {inner}
      </fieldset>
    )
  }

  return inner
})

ButtonGroup.displayName = 'ButtonGroup'

export interface ButtonGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {}

const ButtonGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ButtonGroupItemProps
>(({ className, children, ...props }, ref) => {
  const context = React.useContext(ButtonGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(buttonGroupItemVariants({ size: context.size, className }))}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ButtonGroupItem.displayName = 'ButtonGroupItem'

export { ButtonGroup, ButtonGroupItem, buttonGroupItemVariants, buttonGroupVariants }
