'use client'

import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Conteneur principal du Footer DSFR
 *
 * @example
 * ```tsx
 * <Footer>
 *   <FooterBody>
 *     <FooterBrand
 *       logo={<img src="/logo.svg" alt="Logo" />}
 *       description="Description du service"
 *     />
 *     <FooterContent>
 *       <FooterLinks title="Liens utiles">
 *         <NavLink href="/mentions-legales" variant="footer">Mentions légales</NavLink>
 *         <NavLink href="/accessibilite" variant="footer">Accessibilité</NavLink>
 *       </FooterLinks>
 *     </FooterContent>
 *   </FooterBody>
 *   <FooterBottom>
 *     <p>© 2024 - Tous droits réservés</p>
 *   </FooterBottom>
 * </Footer>
 * ```
 */
const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'w-full bg-background pt-8 shadow-[inset_0_2px_0_0_var(--border-plain-blue-france),inset_0_-1px_0_0_var(--border-default-grey)]',
          className
        )}
        {...props}
      >
        {children}
      </footer>
    )
  }
)

Footer.displayName = 'Footer'

/**
 * Corps principal du Footer
 */
const FooterBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('fr-container flex flex-col gap-8 pb-4 md:flex-row', className)}
      {...props}
    />
  )
)

FooterBody.displayName = 'FooterBody'

export interface FooterBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Logo ou image de marque
   */
  logo?: React.ReactNode
  /**
   * Description du service
   */
  description?: string
  /**
   * URL de destination du logo
   */
  href?: string
}

/**
 * Zone de marque du Footer
 */
const FooterBrand = React.forwardRef<HTMLDivElement, FooterBrandProps>(
  ({ className, logo, description, href = '/', ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-4 md:max-w-xs', className)} {...props}>
      {logo && (
        <RouterAnchor href={href} className="flex-shrink-0 w-fit">
          {logo}
        </RouterAnchor>
      )}
      {description && <p className="text-sm text-foreground-muted">{description}</p>}
    </div>
  )
)

FooterBrand.displayName = 'FooterBrand'

/**
 * Zone de contenu du Footer (colonnes de liens)
 */
const FooterContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8', className)}
      {...props}
    />
  )
)

FooterContent.displayName = 'FooterContent'

export interface FooterLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Titre de la section de liens
   */
  title?: string
}

/**
 * Groupe de liens dans le Footer
 */
const FooterLinks = React.forwardRef<HTMLDivElement, FooterLinksProps>(
  ({ className, title, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
      {title && <h3 className="mb-2 text-sm font-bold leading-6 text-foreground-title">{title}</h3>}
      <nav aria-label={title || 'Navigation'} className="flex flex-col gap-1 text-sm">
        {children}
      </nav>
    </div>
  )
)

FooterLinks.displayName = 'FooterLinks'

/**
 * Zone inférieure du Footer (copyright, mentions)
 */
const FooterBottom = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 border-t border-border bg-background', className)}
      {...props}
    >
      <div className="fr-container flex flex-col items-start justify-between gap-4 py-2 text-xs leading-5 text-foreground-muted md:flex-row">
        {props.children}
      </div>
    </div>
  )
)

FooterBottom.displayName = 'FooterBottom'

/**
 * Liens légaux dans le Footer (mentions légales, accessibilité, etc.)
 */
const FooterLegalLinks = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(
          'flex flex-wrap items-center gap-y-2 text-xs leading-5 [&>li:not(:first-child)]:ml-2 [&>li:not(:first-child)]:border-l [&>li:not(:first-child)]:border-border [&>li:not(:first-child)]:pl-2',
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child
          if (child.type === 'li') return child

          const key =
            child.key ||
            (typeof child.props.children === 'string' ? child.props.children : undefined)

          return <li key={key}>{child}</li>
        })}
      </ul>
    )
  }
)

FooterLegalLinks.displayName = 'FooterLegalLinks'

export {
  Footer,
  FooterBody,
  FooterBottom,
  FooterBrand,
  FooterContent,
  FooterLegalLinks,
  FooterLinks,
}
