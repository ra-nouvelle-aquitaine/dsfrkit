'use client'

import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

/**
 * Composant Tile (Tuile) DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tuile
 *
 * Structure DSFR :
 *  - Pictogramme ou image avant le corps (optionnel)
 *  - Corps (titre + description) en bas
 *  - Lien couvre toute la carte (via position absolute)
 *  - Pas de border-radius
 *  - Fond par défaut et bordure fine
 *
 * Variantes :
 *  - default   : tuile verticale standard
 *  - horizontal : tuile horizontale (média à gauche selon DSFR)
 *  - download  : variante teléchargement (icône dédiée)
 *
 * Tailles :
 *  - md (défaut)
 *  - sm : title + description plus petits
 *  - lg : title + description plus grands
 */

// ── Chevron icon ──────────────────────────────────────────────────────────────
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <title>Accéder</title>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

// ── DownloadIcon ───────────────────────────────────────────────────────────────
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <title>Télécharger</title>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface TileProps {
  /** Titre principal de la tuile */
  title: string
  /** Description sous le titre */
  description?: string
  /** Lien de la tuile (rend la tuile cliquable) */
  href?: string
  /** Icône ou image affichée dans la zone supérieure */
  icon?: React.ReactNode
  /** Image affichée dans la zone image (src) */
  imageSrc?: string
  /** Alt de l'image */
  imageAlt?: string
  /** Variante de la tuile */
  variant?: 'default' | 'horizontal' | 'download'
  /** Taille */
  size?: 'sm' | 'md' | 'lg'
  /** Désactiver l'état hover/focus */
  disabled?: boolean
  /** Badge/tag à afficher dans la tuile */
  badge?: React.ReactNode
  /** Détail supplémentaire (type de fichier, poids…) */
  detail?: string
  /** Classes CSS supplémentaires */
  className?: string
  /** Attribut target du lien */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  /** Attribut rel du lien */
  rel?: string
}

// ── Tailles ────────────────────────────────────────────────────────────────────
const titleSizes = {
  sm: 'text-base font-bold leading-6',
  md: 'text-lg font-bold leading-6 md:text-xl md:leading-7',
  lg: 'text-h4 font-bold',
}

const descriptionSizes = {
  sm: 'text-sm leading-6',
  md: 'text-base leading-6',
  lg: 'text-lg leading-7',
}

// ── Composant principal ────────────────────────────────────────────────────────
/**
 * Tuile DSFR
 *
 * @example
 * // Tuile simple
 * <Tile title="Démarches en ligne" description="Effectuez vos démarches" href="/demarches" />
 *
 * // Tuile avec icône
 * <Tile title="Contact" icon={<MailIcon />} href="/contact" />
 *
 * // Tuile horizontale
 * <Tile variant="horizontal" title="Document" description="Consulter le document" href="#" />
 *
 * // Tuile téléchargement
 * <Tile variant="download" title="Formulaire CERFA" detail="PDF – 120 Ko" href="/doc.pdf" />
 */
const Tile = React.forwardRef<HTMLDivElement, TileProps>(
  (
    {
      title,
      description,
      href,
      icon,
      imageSrc,
      imageAlt = '',
      variant = 'default',
      size = 'md',
      disabled = false,
      badge,
      detail,
      className,
      target,
      rel,
    },
    ref
  ) => {
    const isHorizontal = variant === 'horizontal'
    const isDownload = variant === 'download'
    const isClickable = !!href && !disabled
    const resolvedRel =
      target === '_blank' ? ['noopener', 'noreferrer', rel].filter(Boolean).join(' ') : rel

    // ── Icône download par défaut ─────────────────────────────────────────
    const resolvedIcon = isDownload && !icon ? <DownloadIcon className="w-8 h-8" /> : icon

    // ── Zone image/icône ──────────────────────────────────────────────────
    const hasMedia = !!(resolvedIcon || imageSrc)

    // La tuile horizontale adopte une mise en page dense, propre à dsfrkit :
    // la zone média occupe un panneau pleine hauteur à fleur des bords et la
    // racine ne porte pas de retrait. C'est une adaptation assumée : le DSFR
    // prévoit un retrait de 2rem et un pictogramme de 4rem centré.
    // En vertical, la photographie occupe toute la largeur en tête de tuile,
    // tandis qu'un pictogramme conserve la vignette de 5rem de `.fr-tile__img`.
    const media = {
      sm: { panel: 'w-24', bleed: '-mx-6 -mt-6 mb-6' },
      md: { panel: 'w-28', bleed: '-mx-8 -mt-8 mb-6' },
      lg: { panel: 'w-32', bleed: '-mx-10 -mt-10 mb-6' },
    }[size ?? 'md']

    const mediaZone = hasMedia && (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center overflow-hidden',
          isHorizontal
            ? cn(
                'self-stretch border-r border-border',
                media.panel,
                !imageSrc && 'bg-background-alt'
              )
            : imageSrc
              ? cn('aspect-video w-auto', media.bleed)
              : // .fr-tile__img : vignette de 5rem centrée, marge basse 1.5rem.
                size === 'sm'
                ? 'mb-6 h-14 w-14 self-center'
                : 'mb-6 h-20 w-20 self-center'
        )}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className="h-full w-full object-cover" />
        ) : (
          <span
            className={cn(
              'text-[var(--artwork-minor-blue-france)]',
              // Dans le panneau horizontal, le pictogramme est dimensionné pour
              // l'occuper réellement ; en vertical il garde l'échelle DSFR.
              isHorizontal
                ? size === 'sm'
                  ? 'text-4xl'
                  : size === 'lg'
                    ? 'text-6xl'
                    : 'text-5xl'
                : size === 'sm'
                  ? 'text-3xl'
                  : size === 'lg'
                    ? 'text-5xl'
                    : 'text-4xl'
            )}
          >
            {resolvedIcon}
          </span>
        )}
      </div>
    )

    // ── Corps de la tuile ─────────────────────────────────────────────────
    const body = (
      <div
        className={cn(
          'flex min-w-0 flex-1 flex-col',
          isHorizontal
            ? cn('items-start', size === 'sm' ? 'p-3' : size === 'lg' ? 'p-6' : 'p-4')
            : 'items-center text-center'
        )}
      >
        {badge && <div className="mb-2">{badge}</div>}

        {/* Titre — --dsfr-text-title change selon le thème (noir en light, blanc en dark) */}
        <h3
          className={cn(
            titleSizes[size],
            'text-[var(--text-title-grey)]',
            isClickable &&
              'group-hover/tile:[&>a]:underline group-hover/tile:[&>a]:decoration-[var(--border-active-blue-france)]'
          )}
        >
          {isClickable ? (
            <RouterAnchor
              href={href}
              target={target}
              rel={resolvedRel}
              className={cn(
                'underline-offset-4 decoration-transparent transition-colors',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                "after:absolute after:inset-0 after:content-['']"
              )}
            >
              {title}
              {target === '_blank' && <span className="sr-only"> (nouvelle fenêtre)</span>}
            </RouterAnchor>
          ) : (
            title
          )}
        </h3>

        {description && (
          <p
            className={cn(
              descriptionSizes[size],
              // --dsfr-text-mention : gris (#666 en light, #929292 en dark)
              'mt-2 text-[var(--dsfr-text-mention,var(--text-mention-grey))]'
            )}
          >
            {description}
          </p>
        )}

        {detail && (
          <p className={cn('mt-2 text-xs', 'text-[var(--text-mention-grey)]')}>{detail}</p>
        )}
      </div>
    )

    // ── Indicateur de direction / téléchargement ──────────────────────────
    const indicator = isClickable && (
      <div
        className={cn(
          'flex-shrink-0 flex items-center',
          // --dsfr-blue-france-sun : bleu france adapté light/dark (#000091 → #6a6af4)
          'text-[var(--text-action-high-blue-france)]',
          isHorizontal
            ? cn('self-center', size === 'sm' ? 'pr-3' : size === 'lg' ? 'pr-6' : 'pr-4')
            : 'mt-4 self-end'
        )}
      >
        {isDownload ? (
          <DownloadIcon className="w-5 h-5" />
        ) : (
          <ChevronRightIcon className="w-5 h-5" />
        )}
      </div>
    )

    return (
      <div
        ref={ref}
        className={cn(
          'group/tile relative flex overflow-hidden',
          !isHorizontal && 'p-8 pb-9',
          // --dsfr-background-default : blanc (#fff) en light, sombre (#161616) en dark
          'bg-[var(--background-default-grey)]',
          // --dsfr-border-default : #ddd en light, #353535 en dark
          'border border-[var(--border-default-grey)]',
          isClickable &&
            !disabled && ['transition-colors', 'hover:bg-[var(--background-default-grey-hover)]'],
          disabled && 'opacity-50 cursor-not-allowed',
          !isHorizontal && size === 'sm' && 'p-6 pb-7',
          !isHorizontal && size === 'lg' && 'p-10 pb-11',
          isHorizontal ? 'flex-row items-stretch text-left' : 'flex-col',
          className
        )}
      >
        {mediaZone}
        {body}
        {indicator}
      </div>
    )
  }
)

Tile.displayName = 'Tile'

// ── TileGrid ───────────────────────────────────────────────────────────────────
/**
 * Grille de tuiles DSFR
 */
const TileGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    columns?: 2 | 3 | 4
  }
>(({ className, columns = 3, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'grid gap-4 md:gap-6',
      {
        'grid-cols-1 md:grid-cols-2': columns === 2,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': columns === 3,
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': columns === 4,
      },
      className
    )}
    {...props}
  />
))

TileGrid.displayName = 'TileGrid'

export { Tile, TileGrid }
