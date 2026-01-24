'use client'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'
import { useRouter } from '../../providers/router-provider'

/**
 * Variants du lien DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien
 */
const linkVariants = cva(
  'inline-flex items-center gap-1 font-medium underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded',
  {
    variants: {
      variant: {
        default: 'text-primary hover:text-primary-hover',
        muted: 'text-muted-foreground hover:text-foreground',
        inverted: 'text-foreground-inverted hover:opacity-80',
        destructive: 'text-destructive hover:opacity-80',
      },
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
      underline: {
        always: 'underline',
        hover: 'no-underline hover:underline',
        none: 'no-underline',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      underline: 'always',
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /**
   * Si true, rend le composant enfant au lieu d'un <a>
   * Utile pour l'intégration avec les routeurs (Next.js, React Router, TanStack Router)
   *
   * @example
   * ```tsx
   * // Avec Next.js Link
   * <Link asChild>
   *   <NextLink href="/about">À propos</NextLink>
   * </Link>
   *
   * // Avec React Router
   * <Link asChild>
   *   <RouterLink to="/about">À propos</RouterLink>
   * </Link>
   *
   * // Avec TanStack Router
   * <Link asChild>
   *   <TanStackLink to="/about">À propos</TanStackLink>
   * </Link>
   * ```
   */
  asChild?: boolean
  /**
   * Si true, ouvre le lien dans un nouvel onglet avec rel="noopener noreferrer"
   */
  external?: boolean
  /**
   * Affiche une icône externe à côté du lien
   */
  showExternalIcon?: boolean
  /**
   * Contrôle le soulignement du lien
   * - `always` : toujours souligné (défaut, recommandé a11y WCAG 1.4.1)
   * - `hover` : souligné au hover uniquement (style DSFR natif)
   * - `none` : jamais souligné
   */
  underline?: 'always' | 'hover' | 'none'
}

/**
 * Composant Link DSFR polymorphique
 *
 * S'intègre avec tous les routeurs React grâce au pattern asChild.
 *
 * @example
 * ```tsx
 * // Lien simple
 * <Link href="/contact">Contact</Link>
 *
 * // Lien externe
 * <Link href="https://gouvernement.fr" external showExternalIcon>
 *   Site du gouvernement
 * </Link>
 *
 * // Avec Next.js
 * <Link asChild>
 *   <NextLink href="/dashboard">Tableau de bord</NextLink>
 * </Link>
 * ```
 */
function ExternalIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15,3 21,3 21,9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      external = false,
      showExternalIcon = false,
      underline,
      children,
      ...props
    },
    ref
  ) => {
    const router = useRouter()
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

    // Priorité : asChild > RouterProvider > <a> natif
    if (asChild) {
      return (
        <Slot
          ref={ref}
          className={cn(linkVariants({ variant, size, underline, className }))}
          {...externalProps}
          {...props}
        >
          {children}
          {showExternalIcon && <ExternalIcon />}
        </Slot>
      )
    }

    if (router && !external) {
      const { href: hrefProp, ...restProps } = props
      const adaptedProps = router.linkPropsAdapter({ href: hrefProp, ...restProps })
      return (
        <router.Link
          ref={ref}
          className={cn(linkVariants({ variant, size, underline, className }))}
          {...adaptedProps}
        >
          {children}
          {showExternalIcon && <ExternalIcon />}
        </router.Link>
      )
    }

    return (
      <a
        ref={ref}
        className={cn(linkVariants({ variant, size, underline, className }))}
        {...externalProps}
        {...props}
      >
        {children}
        {showExternalIcon && <ExternalIcon />}
      </a>
    )
  }
)

Link.displayName = 'Link'

export { Link, linkVariants }
