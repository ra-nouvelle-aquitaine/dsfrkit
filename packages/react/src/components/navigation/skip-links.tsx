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
      <div ref={ref} className={cn('sr-only focus-within:not-sr-only', className)} {...props}>
        <ul className="flex flex-col gap-1 p-2 bg-background shadow-lg absolute top-0 left-0 z-[9999]">
          {links.map((link) => (
            <li key={link.targetId}>
              <a
                href={`#${link.targetId}`}
                className={cn(
                  'block px-4 py-2 text-sm font-medium text-blue-france-main',
                  'hover:underline focus:outline-none focus:ring-2 focus:ring-blue-france-main focus:ring-offset-2',
                  'rounded-md'
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
