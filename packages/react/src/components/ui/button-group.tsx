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
  // Le cadre est fermé sur les quatre côtés, comme `fr-segmented__elements` qui
  // le pose en `inset 0 0 0 1px`. Les trois ombres précédentes — gauche, haut,
  // droite — laissaient le bord bas ouvert, et le groupe se lisait comme une
  // boîte inachevée posée sur la page.
  'inline-flex items-center rounded shadow-[inset_0_0_0_1px_var(--border-default-grey)]',
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
  // Base : texte et fond transparents ; le cadre du groupe porte la séparation visuelle.
  cn(
    'inline-flex items-center justify-center gap-2 rounded font-medium transition-colors motion-reduce:transition-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50 text-foreground',
    // Hover
    'hover:bg-background-hover hover:text-foreground',
    // Actif : le DSFR conserve le fond du groupe et marque la sélection par la bordure et la couleur.
    'data-[state=on]:text-primary',
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

type ButtonGroupContextValue = {
  size?: 'sm' | 'md' | 'lg'
  type?: 'single' | 'multiple'
}
const ButtonGroupContext = React.createContext<ButtonGroupContextValue>({})

interface ButtonGroupBaseProps extends VariantProps<typeof buttonGroupVariants> {
  className?: string
  children?: React.ReactNode
  /** Label du groupe pour l'accessibilité */
  legend?: string
  /** Nom accessible lorsque le groupe n'affiche pas de légende. */
  'aria-label'?: string
  /** Identifiant d'un libellé externe. Prioritaire sur la légende générée. */
  'aria-labelledby'?: string
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
  const {
    className,
    size,
    legend,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  } = props
  const legendId = React.useId()

  const contextValue = React.useMemo(
    () => ({ size: size ?? 'md', type: props.type }),
    [size, props.type]
  )

  const inner = (
    <ButtonGroupContext.Provider value={contextValue}>
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(buttonGroupVariants({ size, className }))}
        role={props.type === 'single' ? 'radiogroup' : 'group'}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? (legend ? legendId : undefined)}
        {...(rest as React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>)}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ButtonGroupContext.Provider>
  )

  if (legend) {
    return (
      <fieldset className="border-0 p-0 m-0">
        <legend
          id={legendId}
          className={cn(
            'mb-3 text-base leading-6 text-foreground-title',
            size === 'sm' && 'text-sm'
          )}
        >
          {legend}
        </legend>
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
>(({ className, children, onKeyDown, ...props }, ref) => {
  const context = React.useContext(ButtonGroupContext)

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(event)

      if (
        event.defaultPrevented ||
        context.type !== 'single' ||
        !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)
      ) {
        return
      }

      const origin = event.currentTarget
      const group = origin.parentElement
      if (!group) return

      const items = [
        ...group.querySelectorAll<HTMLButtonElement>('button[role="radio"]:not(:disabled)'),
      ]
      const currentIndex = items.indexOf(origin)

      if (currentIndex < 0 || items.length === 0) return

      const isRtl = getComputedStyle(group).direction === 'rtl'
      let nextIndex = currentIndex

      if (event.key === 'Home') nextIndex = 0
      else if (event.key === 'End') nextIndex = items.length - 1
      else if (event.key === 'ArrowRight') nextIndex += isRtl ? -1 : 1
      else if (event.key === 'ArrowLeft') nextIndex += isRtl ? 1 : -1
      else if (event.key === 'ArrowDown') nextIndex += 1
      else if (event.key === 'ArrowUp') nextIndex -= 1

      nextIndex = (nextIndex + items.length) % items.length
      const nextItem = items[nextIndex]

      // Un groupe de radios sélectionne l'option atteinte par les flèches. On
      // prend en charge le déplacement afin que le focus roving de Radix et
      // `aria-checked` ne puissent jamais diverger.
      event.preventDefault()
      event.stopPropagation()

      if (nextItem && nextItem !== origin) {
        nextItem.focus()
        nextItem.click()
      }
    },
    [context.type, onKeyDown]
  )

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(buttonGroupItemVariants({ size: context.size, className }))}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ButtonGroupItem.displayName = 'ButtonGroupItem'

export { ButtonGroup, ButtonGroupItem, buttonGroupItemVariants, buttonGroupVariants }
