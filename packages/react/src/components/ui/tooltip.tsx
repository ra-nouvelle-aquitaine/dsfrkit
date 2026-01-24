'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'
import { cn } from '../../lib/utils'

const TooltipProvider = ({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
)

const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipPortal = TooltipPrimitive.Portal

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  size?: 'sm' | 'md' | 'lg'
  /**
   * Affiche la flèche du tooltip.
   * @default true
   */
  showArrow?: boolean
}

/**
 * Contenu du Tooltip DSFR — fr-tooltip
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/infobulle
 *
 * Fond: background-elevated avec ombre (shadow-lg), texte standard
 */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, sideOffset = 6, size = 'md', showArrow = true, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        // DSFR : fond élevé, ombre, texte par défaut
        // drop-shadow (≠ box-shadow) suit le contour SVG de la flèche → bordure continue autour du tooltip ET de la flèche
        'z-[100] overflow-visible bg-background-elevated text-foreground',
        'shadow-[0_8px_16px_0_rgba(0,0,0,0.1),0_8px_16px_-16px_rgba(0,0,0,0.32)]',
        '[filter:drop-shadow(0_0_0_1px_hsl(var(--border)))]',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2',
        'data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2',
        'data-[side=top]:slide-in-from-bottom-2',
        size === 'sm' && 'px-2 py-1 text-xs max-w-[200px]',
        size === 'md' && 'px-3 py-2 text-sm max-w-[280px]',
        size === 'lg' && 'px-4 py-2 text-base max-w-[360px]',
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <TooltipArrow />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn('fill-background-elevated', className)}
    {...props}
  />
))
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName

/**
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <Button variant="ghost">?</Button>
 *     </TooltipTrigger>
 *     <TooltipContent>
 *       <p>Information utile</p>
 *       <TooltipArrow />
 *     </TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
export { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger }
