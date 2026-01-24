'use client'

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../../lib/utils'
import { useRouter } from '../../providers/router-provider'

export interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * Libellé d'accessibilité pour la navigation
   */
  'aria-label'?: string
}

/**
 * Conteneur de la pagination DSFR
 */
const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, 'aria-label': ariaLabel = 'Pagination', ...props }, ref) => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
)
Pagination.displayName = 'Pagination'

/**
 * Liste des éléments de pagination
 */
const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentPropsWithoutRef<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
)
PaginationContent.displayName = 'PaginationContent'

/**
 * Élément de pagination individuel
 */
const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />
)
PaginationItem.displayName = 'PaginationItem'

export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Si true, rend le composant enfant au lieu d'un <a>
   */
  asChild?: boolean
  /**
   * Si true, indique que c'est la page actuelle
   */
  isActive?: boolean
  /**
   * Si true, désactive le lien
   */
  disabled?: boolean
}

/**
 * Lien de pagination
 */
const PaginationLink = React.forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ className, asChild = false, isActive, disabled, children, ...props }, ref) => {
    const router = useRouter()
    const classes = cn(
      'inline-flex h-10 min-w-10 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      isActive ? 'bg-primary text-primary-foreground' : 'text-primary hover:bg-muted',
      disabled && 'pointer-events-none opacity-50',
      className
    )
    const sharedProps = {
      'aria-current': isActive ? ('page' as const) : undefined,
      'aria-disabled': disabled,
    }

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...sharedProps} {...props}>
          {children}
        </Slot>
      )
    }

    if (router) {
      const { href: hrefProp, ...restProps } = props
      const adaptedProps = router.linkPropsAdapter({ href: hrefProp, ...restProps })
      return (
        <router.Link ref={ref} className={classes} {...sharedProps} {...adaptedProps}>
          {children}
        </router.Link>
      )
    }

    return (
      <a ref={ref} className={classes} {...sharedProps} {...props}>
        {children}
      </a>
    )
  }
)
PaginationLink.displayName = 'PaginationLink'

/**
 * Bouton première page
 */
const PaginationFirst = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps & {
    /**
     * Libellé du bouton (défaut: "Première page")
     */
    label?: string
    /**
     * Si true, affiche uniquement l'icône
     */
    iconOnly?: boolean
  }
>(({ className, label = 'Première page', iconOnly = false, asChild, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    asChild={asChild}
    aria-label={label}
    className={cn('gap-1', className)}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m11 17-5-5 5-5" />
      <path d="m18 17-5-5 5-5" />
    </svg>
    {!iconOnly && <span className="hidden sm:inline">{label}</span>}
  </PaginationLink>
))
PaginationFirst.displayName = 'PaginationFirst'

/**
 * Bouton page précédente
 */
const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps & {
    /**
     * Libellé du bouton (défaut: "Page précédente")
     */
    label?: string
    /**
     * Si true, affiche uniquement l'icône
     */
    iconOnly?: boolean
  }
>(({ className, label = 'Page précédente', iconOnly = false, asChild, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    asChild={asChild}
    aria-label={label}
    className={cn('gap-1', className)}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
    {!iconOnly && <span className="hidden sm:inline">{label}</span>}
  </PaginationLink>
))
PaginationPrevious.displayName = 'PaginationPrevious'

/**
 * Bouton page suivante
 */
const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps & {
    /**
     * Libellé du bouton (défaut: "Page suivante")
     */
    label?: string
    /**
     * Si true, affiche uniquement l'icône
     */
    iconOnly?: boolean
  }
>(({ className, label = 'Page suivante', iconOnly = false, asChild, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    asChild={asChild}
    aria-label={label}
    className={cn('gap-1', className)}
    {...props}
  >
    {!iconOnly && <span className="hidden sm:inline">{label}</span>}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  </PaginationLink>
))
PaginationNext.displayName = 'PaginationNext'

/**
 * Bouton dernière page
 */
const PaginationLast = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps & {
    /**
     * Libellé du bouton (défaut: "Dernière page")
     */
    label?: string
    /**
     * Si true, affiche uniquement l'icône
     */
    iconOnly?: boolean
  }
>(({ className, label = 'Dernière page', iconOnly = false, asChild, ...props }, ref) => (
  <PaginationLink
    ref={ref}
    asChild={asChild}
    aria-label={label}
    className={cn('gap-1', className)}
    {...props}
  >
    {!iconOnly && <span className="hidden sm:inline">{label}</span>}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m13 17 5-5-5-5" />
      <path d="m6 17 5-5-5-5" />
    </svg>
  </PaginationLink>
))
PaginationLast.displayName = 'PaginationLast'

/**
 * Ellipsis pour indiquer des pages masquées
 */
const PaginationEllipsis = ({ className, ...props }: React.ComponentPropsWithoutRef<'span'>) => (
  <span className={cn('flex h-10 w-10 items-center justify-center', className)} {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
    <span className="sr-only">Plus de pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

/**
 * Composant Pagination DSFR
 *
 * Navigation entre les pages d'un contenu paginé.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>2</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#">3</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationEllipsis />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
