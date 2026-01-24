import * as React from 'react'
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
        id="footer"
        className={cn('w-full bg-background-alt border-t border-border', className)}
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
      className={cn('fr-container py-8 md:py-12 flex flex-col md:flex-row gap-8', className)}
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
        <a href={href} className="flex-shrink-0 w-fit">
          {logo}
        </a>
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
      {title && <h3 className="font-semibold text-foreground-title mb-2">{title}</h3>}
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
    <div ref={ref} className={cn('border-t border-border bg-background', className)} {...props}>
      <div className="fr-container py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-muted">
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
        className={cn('flex flex-wrap items-center gap-4 text-sm', className)}
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
