import * as React from 'react'
import { cn } from '../../lib/utils'

export interface SkipLink {
  /**
   * ID de l'élément cible (sans le #)
   */
  targetId: string
  /**
   * Libellé du lien
   */
  label: string
}

export interface SkipLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Liste des liens d'évitement
   */
  links?: SkipLink[]
}

const defaultLinks: SkipLink[] = [
  { targetId: 'main-content', label: 'Aller au contenu' },
  { targetId: 'main-navigation', label: 'Aller à la navigation' },
  { targetId: 'footer', label: 'Aller au pied de page' },
]

/**
 * Composant SkipLinks (Liens d'évitement) DSFR
 *
 * Permet aux utilisateurs de clavier de naviguer rapidement vers les zones principales.
 * Les liens sont visibles uniquement au focus.
 *
 * @example
 * ```tsx
 * // Avec les liens par défaut
 * <SkipLinks />
 *
 * // Avec des liens personnalisés
 * <SkipLinks
 *   links={[
 *     { targetId: 'main', label: 'Aller au contenu principal' },
 *     { targetId: 'search', label: 'Aller à la recherche' },
 *   ]}
 * />
 * ```
 */
const SkipLinks = React.forwardRef<HTMLDivElement, SkipLinksProps>(
  ({ className, links = defaultLinks, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'absolute top-0 z-[9999] w-full -translate-y-full bg-background-contrast py-4 opacity-0 focus-within:relative focus-within:translate-y-0 focus-within:opacity-100 md:py-3',
          className
        )}
        {...props}
      >
        <ul className="fr-container flex list-none flex-col gap-4 p-0 md:flex-row md:flex-wrap md:gap-x-4 md:gap-y-0">
          {links.map((link) => (
            <li key={link.targetId}>
              <a
                href={`#${link.targetId}`}
                className={cn(
                  'block text-base font-medium leading-6 text-primary underline',
                  'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

SkipLinks.displayName = 'SkipLinks'

export { SkipLinks }
