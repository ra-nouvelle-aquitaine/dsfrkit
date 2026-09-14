'use client'

import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

/**
 * Pied de page DSFR — `fr-footer`
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pied-de-page
 *
 * Structure et typographie officielles :
 * - `FooterTop` (facultatif) : bandeau gris de catégories de liens, 12px ;
 * - `FooterBody` : bloc-marque à gauche, `FooterContent` à droite (description 14px
 *   et liens institutionnels en gras 14px) ;
 * - `FooterBottom` : liens obligatoires séparés par des filets et mention de licence, 12px.
 */

/** Liens institutionnels que le DSFR fait figurer dans tout pied de page. */
export const footerInstitutionalLinks: FooterContentLink[] = [
  { label: 'info.gouv.fr', href: 'https://info.gouv.fr', external: true },
  { label: 'service-public.gouv.fr', href: 'https://service-public.gouv.fr', external: true },
  { label: 'legifrance.gouv.fr', href: 'https://legifrance.gouv.fr', external: true },
  { label: 'data.gouv.fr', href: 'https://data.gouv.fr', external: true },
]

function ExternalLinkIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6Zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8Z"
      />
    </svg>
  )
}

/** Liens du pied de page : soulignés au survol seulement, comme `--underline-idle-width: 0`. */
const footerLinkClasses =
  '[&_a]:no-underline [&_a]:underline-offset-2 [&_a:hover]:underline [&_a]:font-[inherit] [&_a]:text-[length:inherit] [&_a]:leading-[inherit]'

/** Chaque enfant qui n'est pas déjà un `<li>` est placé dans un élément de liste. */
function toListItems(children: React.ReactNode, className?: string) {
  return React.Children.map(children, (child) => {
    if (child === null || child === undefined || child === false) return null
    if (React.isValidElement(child) && child.type === 'li') return child
    return <li className={className}>{child}</li>
  })
}

/** Vrai si des `FooterLinks` figurent parmi les enfants, fragments compris. */
function containsFooterLinks(children: React.ReactNode): boolean {
  return React.Children.toArray(children).some((child) => {
    if (!React.isValidElement<{ children?: React.ReactNode }>(child)) return false
    if (child.type === React.Fragment) return containsFooterLinks(child.props.children)
    return (child.type as { displayName?: string }).displayName === 'FooterLinks'
  })
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Conteneur principal du Footer DSFR. Porte `id="footer"` par défaut, cible du
 * lien d'évitement « Aller au pied de page » de `SkipLinks` (remplaçable via `id`).
 *
 * @example
 * ```tsx
 * <Footer>
 *   <FooterBody>
 *     <FooterBrand logo={<Logo size="lg" />} href="/" />
 *     <FooterContent description="Texte de présentation du service." />
 *   </FooterBody>
 *   <FooterBottom copyright={<>Sauf mention contraire, les contenus de ce site sont proposés sous licence etalab-2.0</>}>
 *     <FooterLegalLinks>
 *       <a href="/plan-du-site">Plan du site</a>
 *       <a href="/accessibilite">Accessibilité : partiellement conforme</a>
 *       <a href="/mentions-legales">Mentions légales</a>
 *     </FooterLegalLinks>
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
 * Bandeau supérieur facultatif (`fr-footer__top`) : fond gris et colonnes de
 * `FooterLinks`, typiquement un plan du site condensé.
 */
const FooterTop = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('-mt-[1.875rem] mb-6 bg-background-alt pb-5 pt-8 md:mb-8', className)}
      {...props}
    >
      <div className="fr-container grid grid-cols-1 gap-x-4 sm:grid-cols-4 md:grid-cols-6 lg:gap-x-6">
        {children}
      </div>
    </div>
  )
)

FooterTop.displayName = 'FooterTop'

/**
 * Corps principal du Footer : bloc-marque et contenu.
 */
const FooterBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('fr-container mb-4 flex flex-row flex-wrap items-center md:mb-6', className)}
      {...props}
    />
  )
)

FooterBody.displayName = 'FooterBody'

export interface FooterBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Bloc-marque (en général `<Logo size="lg" />`)
   */
  logo?: React.ReactNode
  /**
   * Logo opérateur facultatif, affiché à droite du bloc-marque
   */
  operatorLogo?: React.ReactNode
  /**
   * @deprecated Placer la description dans `FooterContent` (`description`), à droite du bloc-marque.
   */
  description?: string
  /**
   * URL de destination du logo
   */
  href?: string
  /**
   * Attribut `title` du lien, ex. « Retour à l’accueil du site - Nom de l’entité »
   */
  linkTitle?: string
}

/**
 * Zone de marque du Footer
 */
const FooterBrand = React.forwardRef<HTMLDivElement, FooterBrandProps>(
  (
    { className, logo, operatorLogo, description, href = '/', linkTitle, children, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-4 md:mr-4 md:self-start', className)}
      {...props}
    >
      <div className="flex flex-row items-center">
        {logo && (
          <RouterAnchor
            href={href}
            title={linkTitle}
            className="-m-4 flex-shrink-0 p-4 hover:bg-background-hover md:-m-5 md:p-5"
          >
            {logo}
          </RouterAnchor>
        )}
        {operatorLogo && <div className="ml-6 flex md:ml-8">{operatorLogo}</div>}
        {children}
      </div>
      {description && <p className="m-0 text-sm leading-6 text-foreground">{description}</p>}
    </div>
  )
)

FooterBrand.displayName = 'FooterBrand'

export interface FooterContentLink {
  label: React.ReactNode
  href: string
  /** Ouvre le lien dans une nouvelle fenêtre (annoncé dans `title`). */
  external?: boolean
}

export interface FooterContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Texte de présentation du site (`fr-footer__content-desc`, 14px). */
  description?: React.ReactNode
  /**
   * Liens en gras sous la description. Par défaut, sans enfants, les liens
   * institutionnels (`footerInstitutionalLinks`) ; `false` pour n'en afficher aucun.
   */
  links?: FooterContentLink[] | false
}

/**
 * Zone de contenu du Footer, à droite du bloc-marque à partir de `lg`.
 *
 * Composition 1.2 toujours prise en charge : des `FooterLinks` placés ici sont
 * disposés en colonnes espacées. Pour suivre le DSFR, préférer `FooterTop`.
 */
const FooterContent = React.forwardRef<HTMLDivElement, FooterContentProps>(
  ({ className, description, links, children, ...props }, ref) => {
    const hasChildren = React.Children.count(children) > 0
    const resolvedLinks = links ?? (hasChildren ? false : footerInstitutionalLinks)

    if (containsFooterLinks(children)) {
      return (
        <div
          ref={ref}
          className={cn(
            'mt-6 basis-full lg:mt-0 lg:ml-8 lg:flex-1 lg:basis-0 lg:self-start',
            className
          )}
          {...props}
        >
          {description && (
            <p className="m-0 mb-6 w-full text-sm leading-6 text-foreground">{description}</p>
          )}
          <div
            data-footer-columns=""
            className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-4"
          >
            {children}
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mt-6 flex basis-full flex-wrap md:ml-auto lg:mt-0 lg:max-w-[36.75rem] lg:basis-1/2',
          className
        )}
        {...props}
      >
        {description && (
          <p className="m-0 w-full text-sm leading-6 text-foreground">{description}</p>
        )}
        {resolvedLinks && resolvedLinks.length > 0 && (
          <ul
            className={cn(
              '-mb-2 mt-4 flex list-none flex-row flex-wrap self-center p-0 text-sm font-bold leading-6 md:mt-2',
              '[&_a]:text-foreground',
              footerLinkClasses
            )}
          >
            {resolvedLinks.map((link) => (
              <li key={link.href} className="my-2 mr-5 last:mr-0 sm:mr-6">
                <RouterAnchor
                  href={link.href}
                  {...(link.external
                    ? {
                        target: '_blank',
                        rel: 'noopener external',
                        title: `${typeof link.label === 'string' ? link.label : 'Lien'} - nouvelle fenêtre`,
                      }
                    : {})}
                >
                  {link.label}
                  {link.external && (
                    <ExternalLinkIcon
                      className="ml-1 inline-block size-4 align-[-0.125rem]"
                      aria-hidden="true"
                    />
                  )}
                </RouterAnchor>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    )
  }
)

FooterContent.displayName = 'FooterContent'

export interface FooterLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Titre de la catégorie de liens
   */
  title?: string
  /**
   * Niveau du titre de catégorie. @default 'h3'
   */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Catégorie de liens (`fr-footer__top-cat` + `fr-footer__top-list`), à placer
 * dans `FooterTop`. Chaque enfant est rendu dans un élément de liste.
 */
const FooterLinks = React.forwardRef<HTMLDivElement, FooterLinksProps>(
  ({ className, title, titleAs: Title = 'h3', children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col', className)} {...props}>
      {title && (
        <Title className="m-0 mb-3 text-xs font-bold leading-5 text-foreground-title">
          {title}
        </Title>
      )}
      <ul
        className={cn(
          'm-0 list-none p-0 text-xs leading-5 [&_a]:text-foreground',
          footerLinkClasses
        )}
      >
        {toListItems(children, 'mb-3')}
      </ul>
    </div>
  )
)

FooterLinks.displayName = 'FooterLinks'

export interface FooterBottomProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Mention de licence (`fr-footer__bottom-copy`), ex. « Sauf mention explicite
   * de propriété intellectuelle détenue par des tiers, les contenus de ce site
   * sont proposés sous licence etalab-2.0 ».
   */
  copyright?: React.ReactNode
}

/**
 * Zone inférieure du Footer : liens obligatoires et mention de licence.
 */
const FooterBottom = React.forwardRef<HTMLDivElement, FooterBottomProps>(
  ({ className, copyright, children, ...props }, ref) => (
    <div ref={ref} className={cn('fr-container', className)} {...props}>
      <div className="mt-4 flex flex-row flex-wrap items-center text-xs leading-5 text-muted-foreground shadow-[inset_0_1px_0_0_var(--border-default-grey)]">
        {children}
        {copyright && (
          <div
            className={cn(
              'mb-4 mt-2 text-xs leading-5 text-muted-foreground [&_a]:text-inherit [&_a]:underline [&_a]:underline-offset-2'
            )}
          >
            {typeof copyright === 'string' ? <p className="m-0">{copyright}</p> : copyright}
          </div>
        )}
      </div>
    </div>
  )
)

FooterBottom.displayName = 'FooterBottom'

/**
 * Liens obligatoires du pied de page (plan du site, accessibilité, mentions
 * légales, données personnelles, gestion des cookies), séparés par des filets.
 */
const FooterLegalLinks = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn(
          'm-0 flex w-full list-none flex-wrap items-center p-0 py-2 text-xs leading-5',
          '[&_a]:text-muted-foreground [&_button]:text-muted-foreground [&_button]:text-xs [&_button]:leading-5 [&_button:hover]:underline',
          footerLinkClasses,
          className
        )}
        {...props}
      >
        {toListItems(
          children,
          cn(
            'mt-2 inline-flex items-center',
            // Filet vertical de 1rem entre deux liens (`fr-footer__bottom-item::before`).
            "[&:not(:first-child)]:before:mx-1 [&:not(:first-child)]:before:inline-block [&:not(:first-child)]:before:h-4 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-border [&:not(:first-child)]:before:content-['']",
            'md:[&:not(:first-child)]:before:mx-3'
          )
        )}
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
  FooterTop,
}
