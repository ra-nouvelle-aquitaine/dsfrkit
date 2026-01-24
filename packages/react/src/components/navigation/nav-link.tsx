'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'
import { useRouter } from '../../providers/router-provider'

const navLinkVariants = cva(
  'inline-flex items-center gap-2 relative font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
  {
    variants: {
      variant: {
        default: [
          'text-foreground hover:bg-background-contrast',
          'data-[active=true]:text-primary data-[active=true]:border-b-[2px] data-[active=true]:border-primary',
        ],
        header: [
          'text-foreground hover:bg-background-alt',
          'py-3 px-4 md:py-3 md:px-4 md:text-base',
          'data-[active=true]:text-primary data-[active=true]:border-b-[2px] data-[active=true]:border-primary',
        ],
        side: [
          'text-foreground hover:text-primary hover:bg-background-contrast',
          'w-full px-4 py-2',
          'data-[active=true]:text-primary data-[active=true]:bg-background-contrast data-[active=true]:border-l-2 data-[active=true]:border-border-active',
        ],
        footer: ['text-foreground hover:text-primary hover:underline', 'text-xs py-0.5 px-0'],
      },
      size: {
        sm: 'text-sm py-1 px-2',
        md: 'text-base py-2 px-3',
        lg: 'text-lg py-3 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  /**
   * Si true, rend le composant enfant au lieu d'un <a>
   */
  asChild?: boolean
  /**
   * Indique si le lien est actif (page courante)
   */
  isActive?: boolean
  /**
   * L'icône à afficher dans l'élément (ex: `<RemixIcon />`)
   */
  icon?: React.ReactNode
  /**
   * La position de l'icône ('start' ou 'end'). Par défaut: 'start'
   */
  iconPosition?: 'start' | 'end'
}

/**
 * Composant NavLink DSFR polymorphique
 *
 * Lien de navigation adaptable à différents contextes (header, sidebar, footer).
 */
const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isActive,
      icon,
      iconPosition = 'start',
      children,
      ...props
    },
    ref
  ) => {
    const router = useRouter()
    const sharedProps = {
      'data-active': isActive,
      'aria-current': isActive ? ('page' as const) : undefined,
      className: cn('fr-nav__link', navLinkVariants({ variant, size, className })),
    }

    const content = (
      <>
        {icon && iconPosition === 'start' && (
          <span className="flex-shrink-0 flex items-center justify-center" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'end' && (
          <span className="flex-shrink-0 flex items-center justify-center" aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    )

    if (asChild) {
      return (
        <Slot ref={ref} {...sharedProps} {...props}>
          {children}
        </Slot>
      )
    }

    if (router) {
      const { href: hrefProp, ...restProps } = props
      const adaptedProps = router.linkPropsAdapter({ href: hrefProp, ...restProps })
      return (
        <router.Link ref={ref} {...sharedProps} {...adaptedProps}>
          {content}
        </router.Link>
      )
    }

    return (
      <a ref={ref} {...sharedProps} {...props}>
        {content}
      </a>
    )
  }
)

NavLink.displayName = 'NavLink'

export { NavLink, navLinkVariants }
