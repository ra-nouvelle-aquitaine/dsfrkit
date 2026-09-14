'use client'

import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

export interface SummaryItem {
  /** Intitulé du lien, en général le titre de la section visée. */
  label: React.ReactNode
  /** Ancre de la section (`#identifiant`) ou adresse d'une page. */
  href: string
  /** Sous-sections, numérotées à la suite du parent (1.1, 1.2…). */
  items?: SummaryItem[]
}

export interface SummaryProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Entrées du sommaire, sur un ou plusieurs niveaux. */
  items: SummaryItem[]
  /** Titre du sommaire. @default 'Sommaire' */
  title?: React.ReactNode
  /** Niveau du titre, à adapter à la hiérarchie de la page. @default 'h2' */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

function SummaryList({ items, prefix }: { items: SummaryItem[]; prefix: string }) {
  return (
    <ol className="m-0 my-2 list-none ps-6">
      {items.map((item, index) => {
        const number = `${prefix}${index + 1}.`

        return (
          <li key={`${number}${item.href}`} className="py-2">
            <RouterAnchor
              href={item.href}
              className={cn(
                'relative inline text-xs leading-5 text-[var(--text-action-high-grey)] no-underline underline-offset-2',
                'hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
              )}
            >
              {/*
               * Numéro suspendu dans le retrait de la liste, comme le `::before`
               * du DSFR. La liste ordonnée porte déjà la position pour les
               * technologies d'assistance : le numéro visuel leur est masqué.
               */}
              <span aria-hidden="true" className="absolute right-full whitespace-nowrap font-bold">
                {number}
                {'\u00a0\u00a0'}
              </span>
              {item.label}
            </RouterAnchor>
            {item.items && item.items.length > 0 && (
              <SummaryList items={item.items} prefix={number} />
            )}
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Composant Summary (Sommaire) DSFR — `fr-summary`
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/sommaire
 *
 * Liste numérotée des sections d'une page longue, placée en haut du contenu.
 * Fond `--background-contrast-grey`, texte 12px, titre en capitales, sous-sections
 * numérotées à la suite de leur parent (1., 1.1., 1.2.). Les liens pointent vers les
 * ancres des titres de la page ; une adresse interne (`/…`) passe par le routeur.
 *
 * @example
 * ```tsx
 * <Summary
 *   items={[
 *     { label: 'Conditions', href: '#conditions' },
 *     {
 *       label: 'Démarche',
 *       href: '#demarche',
 *       items: [
 *         { label: 'Documents à fournir', href: '#documents' },
 *         { label: 'Délais', href: '#delais' },
 *       ],
 *     },
 *     { label: 'Recours', href: '#recours' },
 *   ]}
 * />
 * ```
 */
const Summary = React.forwardRef<HTMLElement, SummaryProps>(
  ({ className, items, title = 'Sommaire', titleAs: Title = 'h2', ...props }, ref) => {
    const titleId = `${React.useId()}-summary-title`

    return (
      <nav
        ref={ref}
        aria-labelledby={titleId}
        className={cn(
          'bg-[var(--background-contrast-grey)] p-6 text-xs leading-5 md:p-8',
          className
        )}
        {...props}
      >
        <Title
          id={titleId}
          className="m-0 mb-2 ps-2 text-xs font-bold uppercase leading-5 text-foreground-title"
        >
          {title}
        </Title>
        <SummaryList items={items} prefix="" />
      </nav>
    )
  }
)
Summary.displayName = 'Summary'

export { Summary }
