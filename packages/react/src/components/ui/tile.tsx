'use client'

import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

/**
 * Composant Tile (Tuile) DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tuile
 *
 * Structure DSFR :
 *  - Zone image en haut (optionnelle)
 *  - Corps (titre + description) en bas
 *  - Lien couvre toute la carte (via position absolute)
 *  - Pas de border-radius
 *  - Fond gris clair --background-contrast-grey
 *
 * Variantes :
 *  - default   : tuile verticale standard
 *  - horizontal : tuile horizontale (image à droite selon DSFR)
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
  md: 'text-lg font-bold leading-7',
  lg: 'text-xl font-bold leading-8',
}

const descriptionSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
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

    // ── Icône download par défaut ─────────────────────────────────────────
    const resolvedIcon = isDownload && !icon ? <DownloadIcon className="w-8 h-8" /> : icon

    // ── Zone image/icône ──────────────────────────────────────────────────
    const hasMedia = !!(resolvedIcon || imageSrc)

    const mediaZone = hasMedia && (
      <div
        className={cn(
          'flex items-center justify-center overflow-hidden',
          // Zone média : fond alt (f6f6f6 en light, #1e1e1e en dark)
          'bg-[var(--background-alt-grey)]',
          isHorizontal
            ? 'w-28 flex-shrink-0 self-stretch border-l border-[var(--border-default-grey)]'
            : 'w-full',
          isHorizontal ? '' : size === 'sm' ? 'h-24' : size === 'lg' ? 'h-40' : 'h-32'
        )}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
        ) : (
          <span
            className={cn(
              'text-[var(--artwork-minor-blue-france)]',
              size === 'sm' ? 'text-3xl' : size === 'lg' ? 'text-5xl' : 'text-4xl'
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
          'flex flex-col flex-1',
          isHorizontal ? 'p-4' : size === 'sm' ? 'p-3' : size === 'lg' ? 'p-6' : 'p-4'
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
              rel={rel}
              className={cn(
                'underline-offset-4 decoration-transparent transition-colors',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]',
                "after:absolute after:inset-0 after:content-['']"
              )}
            >
              {title}
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
          isHorizontal ? 'pr-4 self-center' : 'px-4 pb-4 self-end'
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
        aria-disabled={disabled ? true : undefined}
        className={cn(
          'group/tile relative flex overflow-hidden',
          // --dsfr-background-default : blanc (#fff) en light, sombre (#161616) en dark
          'bg-[var(--background-default-grey)]',
          // --dsfr-border-default : #ddd en light, #353535 en dark
          'border border-[var(--border-default-grey)]',
          isClickable &&
            !disabled && ['transition-colors', 'hover:bg-[var(--background-default-grey-hover)]'],
          disabled && 'opacity-50 cursor-not-allowed',
          isHorizontal ? 'flex-row' : 'flex-col',
          className
        )}
      >
        {/* Horizontal : image/icône à gauche (start), corps au centre, indicateur à droite */}
        {isHorizontal ? (
          <>
            {mediaZone}
            {body}
            {indicator}
          </>
        ) : (
          <>
            {mediaZone}
            {body}
            {indicator}
          </>
        )}
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
