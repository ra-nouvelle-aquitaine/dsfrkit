import * as AccordionPrimitive from '@radix-ui/react-accordion'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Accordion DSFR
 * Utilise Radix UI Accordion pour l'accessibilité
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon
 *
 * Styles DSFR (`fr-accordion`) :
 * - Bordure séparatrice entre chaque item (border-bottom)
 * - Premier item avec bordure en haut
 * - Titre : texte --text-action-high-blue-france, padding 0.75rem 1rem ; une fois ouvert,
 *   fond --background-open-blue-france (et ses déclinaisons -hover / -active)
 * - Contenu : texte --text-default-grey, padding 1rem 1rem 1.5rem
 * - Chevron bleu france, rotation 180° à l'ouverture
 */

import type {
  AccordionMultipleProps as RadixMultipleProps,
  AccordionSingleProps as RadixSingleProps,
} from '@radix-ui/react-accordion'

type AccordionSingleProps = Omit<RadixSingleProps, 'type'> & {
  type?: 'single'
}

type AccordionMultipleProps = Omit<RadixMultipleProps, 'type'> & {
  type: 'multiple'
}

type AccordionProps = AccordionSingleProps | AccordionMultipleProps

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>((props, ref) => {
  // If it's explicitly 'multiple'
  if (props.type === 'multiple') {
    const { className, type, ...rest } = props
    return (
      <AccordionPrimitive.Root
        ref={ref}
        type="multiple"
        className={cn('border-t border-border', className)}
        {...(rest as Omit<RadixMultipleProps, 'type'>)}
      />
    )
  }

  // Default is 'single'
  const { className, type, collapsible = true, ...rest } = props as AccordionSingleProps
  return (
    <AccordionPrimitive.Root
      ref={ref}
      type="single"
      collapsible={collapsible}
      className={cn('border-t border-border', className)}
      {...(rest as Omit<RadixSingleProps, 'type' | 'collapsible'>)}
    />
  )
})
Accordion.displayName = 'Accordion'

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-border', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex m-0">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between min-h-12 py-3 px-4 text-left',
        'text-base leading-6 font-medium text-primary',
        'transition-colors motion-reduce:transition-none cursor-pointer bg-transparent',
        'hover:bg-background-hover active:bg-background-active',
        // Section ouverte : le DSFR teinte le titre en bleu (`[aria-expanded=true]`)
        'data-[state=open]:bg-background-open-blue-france',
        'data-[state=open]:hover:bg-background-open-blue-france-hover',
        'data-[state=open]:active:bg-background-open-blue-france-active',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        '[&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4 shrink-0 ml-4 text-primary transition-transform duration-300 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base leading-6 text-foreground bg-background transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn('px-4 pt-4 pb-6', className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }

/**
 * Exemple d'utilisation :
 *
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>
 *       Contenu de la section 1
 *     </AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Section 2</AccordionTrigger>
 *     <AccordionContent>
 *       Contenu de la section 2
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
