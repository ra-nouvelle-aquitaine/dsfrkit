import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Tabs DSFR
 * Utilise Radix UI Tabs pour l'accessibilité
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/onglet
 *
 * Les onglets DSFR ont une bordure inférieure (horizontal) ou latérale (vertical) et un style spécifique pour l'onglet actif.
 * Radix UI place `data-orientation="horizontal|vertical"` sur chaque élément – les classes Tailwind
 * `data-[orientation=*]:` permettent d'adapter le layout sans JS supplémentaire.
 */

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Root ref={ref} className={cn(className)} {...props} />
))
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'flex gap-1 p-0',
      // ── Horizontal (défaut) ──────────────────────────────────────────────
      'data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-nowrap data-[orientation=horizontal]:items-end data-[orientation=horizontal]:justify-start',
      'data-[orientation=horizontal]:w-full data-[orientation=horizontal]:overflow-x-auto',
      'data-[orientation=horizontal]:px-4',
      'data-[orientation=horizontal]:shadow-[inset_0_-1px_0_0_var(--border-default-grey)]',
      // ── Vertical ────────────────────────────────────────────────────────
      'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-start',
      'data-[orientation=vertical]:py-4 data-[orientation=vertical]:border-r data-[orientation=vertical]:border-[var(--border-default-grey)]',
      // Masquer scrollbar
      '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // ── Base commune ────────────────────────────────────────────────────
      'inline-flex items-center whitespace-nowrap px-4 py-2 text-base font-medium transition-colors shrink-0',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-france-sun-113-625)] focus-visible:ring-offset-2 focus-visible:z-10',
      'disabled:pointer-events-none disabled:opacity-50',

      // ── Horizontal ──────────────────────────────────────────────────────
      'data-[orientation=horizontal]:justify-center data-[orientation=horizontal]:min-h-[48px]',
      'data-[orientation=horizontal]:border-x data-[orientation=horizontal]:border-t-2 data-[orientation=horizontal]:border-b-0 data-[orientation=horizontal]:border-transparent',
      'data-[orientation=horizontal]:bg-[var(--background-action-low-blue-france)]',
      'data-[orientation=horizontal]:text-[var(--text-action-high-grey)]',
      'data-[orientation=horizontal]:hover:bg-[var(--background-action-low-blue-france-hover)]',
      // Actif horizontal
      'data-[orientation=horizontal]:data-[state=active]:bg-background',
      'data-[orientation=horizontal]:data-[state=active]:text-[var(--text-active-blue-france)]',
      'data-[orientation=horizontal]:data-[state=active]:font-bold',
      'data-[orientation=horizontal]:data-[state=active]:border-x-[var(--border-default-grey)]',
      'data-[orientation=horizontal]:data-[state=active]:border-t-[var(--border-active-blue-france)]',
      // Le shadow de bg-background masque la bordure de TabsList
      'data-[orientation=horizontal]:data-[state=active]:shadow-[0_1px_0_0_var(--background-default-grey)]',

      // ── Vertical ────────────────────────────────────────────────────────
      'data-[orientation=vertical]:justify-start data-[orientation=vertical]:min-h-[44px]',
      'data-[orientation=vertical]:border-y data-[orientation=vertical]:border-l-2 data-[orientation=vertical]:border-r-0 data-[orientation=vertical]:border-transparent',
      'data-[orientation=vertical]:bg-[var(--background-action-low-blue-france)]',
      'data-[orientation=vertical]:text-[var(--text-action-high-grey)]',
      'data-[orientation=vertical]:hover:bg-[var(--background-action-low-blue-france-hover)]',
      // Actif vertical
      'data-[orientation=vertical]:data-[state=active]:-mr-[1px]',
      'data-[orientation=vertical]:data-[state=active]:bg-background',
      'data-[orientation=vertical]:data-[state=active]:text-[var(--text-active-blue-france)]',
      'data-[orientation=vertical]:data-[state=active]:font-bold',
      'data-[orientation=vertical]:data-[state=active]:border-y-[var(--border-default-grey)]',
      'data-[orientation=vertical]:data-[state=active]:border-l-[var(--border-active-blue-france)]',
      'data-[orientation=vertical]:data-[state=active]:shadow-[1px_0_0_0_var(--background-default-grey)]',

      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-france-sun-113-625)] focus-visible:ring-offset-2',
      'p-4 md:p-8 border-b border-x border-border',
      'data-[orientation=vertical]:border data-[orientation=vertical]:border-l-0 data-[orientation=vertical]:border-[var(--border-default-grey)]',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsContent, TabsList, TabsTrigger }
