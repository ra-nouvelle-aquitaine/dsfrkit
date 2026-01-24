import { cva } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Tag DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tag
 *
 * Trois modes exclusifs (en plus du tag statique) :
 *  - clickable  : tag rendu comme un lien <a href>
 *  - pressable  : tag sélectionnable (checkbox caché), affiche une coche en overlay
 *  - dismissible: tag supprimable via un bouton ×
 */

// ── Palette de couleurs ─────────────────────────────────────────────────────
// On reprend exactement les mêmes tokens que le Badge DSFR
const variantColors: Record<string, string> = {
  // Statuts sémantiques — mêmes classes utilitaires que Badge (supportent le dark mode via theme.ts)
  default: 'bg-background-contrast text-foreground',
  info: 'bg-info-background text-info',
  success: 'bg-success-background text-success',
  warning: 'bg-warning-background text-warning',
  error: 'bg-destructive-background text-destructive',
  new: 'bg-yellow-tournesol-950 text-yellow-tournesol-main',

  // Accentuations DSFR
  // 'blue-france' tag uses specific variables: open-blue-france for bg and primary text
  'blue-france': 'bg-background-open-blue-france text-primary',
  'green-tilleul-verveine':
    'bg-[var(--background-contrast-green-tilleul-verveine)] text-[var(--text-label-green-tilleul-verveine)]',
  'green-bourgeon':
    'bg-[var(--background-contrast-green-bourgeon)] text-[var(--text-label-green-bourgeon)]',
  'green-emeraude':
    'bg-[var(--background-contrast-green-emeraude)] text-[var(--text-label-green-emeraude)]',
  'green-menthe':
    'bg-[var(--background-contrast-green-menthe)] text-[var(--text-label-green-menthe)]',
  'green-archipel':
    'bg-[var(--background-contrast-green-archipel)] text-[var(--text-label-green-archipel)]',
  'blue-ecume': 'bg-[var(--background-contrast-blue-ecume)] text-[var(--text-label-blue-ecume)]',
  'blue-cumulus':
    'bg-[var(--background-contrast-blue-cumulus)] text-[var(--text-label-blue-cumulus)]',
  'purple-glycine':
    'bg-[var(--background-contrast-purple-glycine)] text-[var(--text-label-purple-glycine)]',
  'pink-macaron':
    'bg-[var(--background-contrast-pink-macaron)] text-[var(--text-label-pink-macaron)]',
  'pink-tuile': 'bg-[var(--background-contrast-pink-tuile)] text-[var(--text-label-pink-tuile)]',
  'yellow-tournesol':
    'bg-[var(--background-contrast-yellow-tournesol)] text-[var(--text-label-yellow-tournesol)]',
  'yellow-moutarde':
    'bg-[var(--background-contrast-yellow-moutarde)] text-[var(--text-label-yellow-moutarde)]',
  'orange-terre-battue':
    'bg-[var(--background-contrast-orange-terre-battue)] text-[var(--text-label-orange-terre-battue)]',
  'brown-cafe-creme':
    'bg-[var(--background-contrast-brown-cafe-creme)] text-[var(--text-label-brown-cafe-creme)]',
  'brown-caramel':
    'bg-[var(--background-contrast-brown-caramel)] text-[var(--text-label-brown-caramel)]',
  'brown-opera': 'bg-[var(--background-contrast-brown-opera)] text-[var(--text-label-brown-opera)]',
  'beige-gris-galet':
    'bg-[var(--background-contrast-beige-gris-galet)] text-[var(--text-label-beige-gris-galet)]',
}

// Couleurs hover (identiques, utilisées quand le tag est interactif)
const variantHoverColors: Record<string, string> = {
  default: 'hover:bg-background-contrast-hover/80',
  info: 'hover:bg-info/20',
  success: 'hover:bg-success/20',
  warning: 'hover:bg-warning/20',
  error: 'hover:bg-destructive/20',
  new: 'hover:bg-yellow-tournesol-975',
  'blue-france': 'hover:bg-blue-france-925',
  'green-tilleul-verveine': 'hover:bg-[var(--background-contrast-green-tilleul-verveine-hover)]',
  'green-bourgeon': 'hover:bg-[var(--background-contrast-green-bourgeon-hover)]',
  'green-emeraude': 'hover:bg-[var(--background-contrast-green-emeraude-hover)]',
  'green-menthe': 'hover:bg-[var(--background-contrast-green-menthe-hover)]',
  'green-archipel': 'hover:bg-[var(--background-contrast-green-archipel-hover)]',
  'blue-ecume': 'hover:bg-[var(--background-contrast-blue-ecume-hover)]',
  'blue-cumulus': 'hover:bg-[var(--background-contrast-blue-cumulus-hover)]',
  'purple-glycine': 'hover:bg-[var(--background-contrast-purple-glycine-hover)]',
  'pink-macaron': 'hover:bg-[var(--background-contrast-pink-macaron-hover)]',
  'pink-tuile': 'hover:bg-[var(--background-contrast-pink-tuile-hover)]',
  'yellow-tournesol': 'hover:bg-[var(--background-contrast-yellow-tournesol-hover)]',
  'yellow-moutarde': 'hover:bg-[var(--background-contrast-yellow-moutarde-hover)]',
  'orange-terre-battue': 'hover:bg-[var(--background-contrast-orange-terre-battue-hover)]',
  'brown-cafe-creme': 'hover:bg-[var(--background-contrast-brown-cafe-creme-hover)]',
  'brown-caramel': 'hover:bg-[var(--background-contrast-brown-caramel-hover)]',
  'brown-opera': 'hover:bg-[var(--background-contrast-brown-opera-hover)]',
  'beige-gris-galet': 'hover:bg-[var(--background-contrast-beige-gris-galet-hover)]',
}

// Couleurs état "sélectionné" (pressable) — action-high de la variante + texte inversé
// Chaque variante utilise ses propres tokens, pas toujours blue-france
const variantSelectedColors: Record<string, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
  info: 'bg-info text-info-foreground hover:bg-info-hover', // Need dsfr-info-main for bg
  success: 'bg-success text-success-foreground hover:bg-success-hover',
  warning: 'bg-warning text-warning-foreground hover:bg-warning-hover',
  error: 'bg-destructive text-destructive-foreground hover:bg-destructive-hover',
  new: 'bg-yellow-tournesol-main text-white hover:bg-yellow-tournesol-main/90',
  'blue-france': 'bg-primary text-primary-foreground hover:bg-primary-hover',
  'green-tilleul-verveine':
    'bg-[var(--background-action-high-green-tilleul-verveine)] text-[var(--text-inverted-green-tilleul-verveine)] hover:bg-[var(--background-action-high-green-tilleul-verveine-hover)]',
  'green-bourgeon':
    'bg-[var(--background-action-high-green-bourgeon)] text-[var(--text-inverted-green-bourgeon)] hover:bg-[var(--background-action-high-green-bourgeon-hover)]',
  'green-emeraude':
    'bg-[var(--background-action-high-green-emeraude)] text-[var(--text-inverted-green-emeraude)] hover:bg-[var(--background-action-high-green-emeraude-hover)]',
  'green-menthe':
    'bg-[var(--background-action-high-green-menthe)] text-[var(--text-inverted-green-menthe)] hover:bg-[var(--background-action-high-green-menthe-hover)]',
  'green-archipel':
    'bg-[var(--background-action-high-green-archipel)] text-[var(--text-inverted-green-archipel)] hover:bg-[var(--background-action-high-green-archipel-hover)]',
  'blue-ecume':
    'bg-[var(--background-action-high-blue-ecume)] text-[var(--text-inverted-blue-ecume)] hover:bg-[var(--background-action-high-blue-ecume-hover)]',
  'blue-cumulus':
    'bg-[var(--background-action-high-blue-cumulus)] text-[var(--text-inverted-blue-cumulus)] hover:bg-[var(--background-action-high-blue-cumulus-hover)]',
  'purple-glycine':
    'bg-[var(--background-action-high-purple-glycine)] text-[var(--text-inverted-purple-glycine)] hover:bg-[var(--background-action-high-purple-glycine-hover)]',
  'pink-macaron':
    'bg-[var(--background-action-high-pink-macaron)] text-[var(--text-inverted-pink-macaron)] hover:bg-[var(--background-action-high-pink-macaron-hover)]',
  'pink-tuile':
    'bg-[var(--background-action-high-pink-tuile)] text-[var(--text-inverted-pink-tuile)] hover:bg-[var(--background-action-high-pink-tuile-hover)]',
  'yellow-tournesol':
    'bg-[var(--background-action-high-yellow-tournesol)] text-[var(--text-inverted-yellow-tournesol)] hover:bg-[var(--background-action-high-yellow-tournesol-hover)]',
  'yellow-moutarde':
    'bg-[var(--background-action-high-yellow-moutarde)] text-[var(--text-inverted-yellow-moutarde)] hover:bg-[var(--background-action-high-yellow-moutarde-hover)]',
  'orange-terre-battue':
    'bg-[var(--background-action-high-orange-terre-battue)] text-[var(--text-inverted-orange-terre-battue)] hover:bg-[var(--background-action-high-orange-terre-battue-hover)]',
  'brown-cafe-creme':
    'bg-[var(--background-action-high-brown-cafe-creme)] text-[var(--text-inverted-brown-cafe-creme)] hover:bg-[var(--background-action-high-brown-cafe-creme-hover)]',
  'brown-caramel':
    'bg-[var(--background-action-high-brown-caramel)] text-[var(--text-inverted-brown-caramel)] hover:bg-[var(--background-action-high-brown-caramel-hover)]',
  'brown-opera':
    'bg-[var(--background-action-high-brown-opera)] text-[var(--text-inverted-brown-opera)] hover:bg-[var(--background-action-high-brown-opera-hover)]',
  'beige-gris-galet':
    'bg-[var(--background-action-high-beige-gris-galet)] text-[var(--text-inverted-beige-gris-galet)] hover:bg-[var(--background-action-high-beige-gris-galet-hover)]',
}

// ── CVA base ────────────────────────────────────────────────────────────────
const tagBase = cva(
  'inline-flex items-center justify-center gap-1 font-medium transition-colors select-none',
  {
    variants: {
      size: {
        // SM : font-size 12px, min-height 24px, padding 2px 8px, border-radius 12px
        sm: 'min-h-6 px-2 py-0.5 text-xs leading-5 rounded-xl',
        // MD : font-size 14px, min-height 32px, padding 4px 12px, border-radius 16px
        md: 'min-h-8 px-3 py-1 text-sm leading-6 rounded-2xl',
        // LG : font-size 16px, min-height 40px, padding 6px 16px, border-radius 20px
        lg: 'min-h-10 px-4 py-1.5 text-base leading-7 rounded-[20px]',
      },
    },
    defaultVariants: { size: 'md' },
  }
)

// ── Types ────────────────────────────────────────────────────────────────────
type TagVariant = keyof typeof variantColors

type TagMode =
  | { clickable: true; href: string; pressable?: never; dismissible?: never }
  | {
      pressable: true
      defaultSelected?: boolean
      onSelectedChange?: (v: boolean) => void
      clickable?: never
      dismissible?: never
    }
  | { dismissible: true; onDismiss?: () => void; clickable?: never; pressable?: never }
  | { clickable?: never; pressable?: never; dismissible?: never }

export type TagProps = {
  variant?: TagVariant
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
} & TagMode &
  Omit<React.HTMLAttributes<HTMLElement>, 'onClick'>

// ── Icône de coche (pressable) ───────────────────────────────────────────────
function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <title>Sélectionné</title>
      <path
        fillRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.42L6.7 12.53l1.41-1.42 2.48 2.48 5.3-5.3 1.41 1.42-6.71 6.71z"
        clipRule="evenodd"
      />
    </svg>
  )
}

// ── Icône × (dismissible) ────────────────────────────────────────────────────
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <title>Supprimer</title>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

// ── Composant ────────────────────────────────────────────────────────────────
/**
 * Tag DSFR — catégoriser, filtrer ou sélectionner du contenu.
 *
 * @example
 * // Statique
 * <Tag>Catégorie</Tag>
 * <Tag variant="info">Info</Tag>
 *
 * // Lien cliquable
 * <Tag clickable href="/page">Voir plus</Tag>
 *
 * // Sélectionnable (checkbox)
 * <Tag pressable onSelectedChange={(v) => console.log(v)}>Filtre</Tag>
 *
 * // Supprimable
 * <Tag dismissible onDismiss={() => setVisible(false)}>Actif</Tag>
 */
const Tag = React.forwardRef<HTMLElement, TagProps>(
  (
    {
      variant = 'default',
      size = 'md',
      icon,
      className,
      children,
      // modes
      clickable,
      pressable,
      dismissible,
      ...rest
    },
    ref
  ) => {
    const generatedId = React.useId()
    const defaultSelected =
      'defaultSelected' in rest
        ? Boolean((rest as { defaultSelected?: boolean }).defaultSelected)
        : false
    const [selected, setSelected] = React.useState(defaultSelected)
    const [visible, setVisible] = React.useState(true)

    // ── Couleurs ──────────────────────────────────────────────────────────
    const resolvedVariant = (variant ?? 'default') as string
    const colors = variantColors[resolvedVariant] ?? variantColors.default
    const hoverColors = variantHoverColors[resolvedVariant] ?? variantHoverColors.default

    const baseClass = cn(tagBase({ size }), colors, className)
    const interactiveClass = cn(baseClass, hoverColors, 'cursor-pointer')

    // ── Mode CLICKABLE (lien) ────────────────────────────────────────────
    if (clickable) {
      const { href, ...aProps } = rest as {
        href: string
      } & React.AnchorHTMLAttributes<HTMLAnchorElement>
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={interactiveClass}
          {...aProps}
        >
          {icon && <span className="-ml-0.5">{icon}</span>}
          {children}
        </a>
      )
    }

    // ── Mode PRESSABLE (checkbox sélectionnable) ─────────────────────────
    if (pressable) {
      const {
        defaultSelected: _defaultSelected,
        onSelectedChange,
        ...spanProps
      } = rest as {
        defaultSelected?: boolean
        onSelectedChange?: (v: boolean) => void
      } & React.HTMLAttributes<HTMLSpanElement>

      const id = generatedId

      const toggle = () => {
        const next = !selected
        setSelected(next)
        onSelectedChange?.(next)
      }

      return (
        <span
          className="relative inline-flex"
          {...(spanProps as React.HTMLAttributes<HTMLSpanElement>)}
        >
          <input
            type="checkbox"
            id={id}
            checked={selected}
            onChange={toggle}
            className="sr-only"
            aria-label={typeof children === 'string' ? children : undefined}
          />
          <label
            htmlFor={id}
            className={cn(
              tagBase({ size }),
              selected
                ? (variantSelectedColors[resolvedVariant] ?? variantSelectedColors.default)
                : colors,
              !selected && hoverColors,
              'cursor-pointer',
              className
            )}
          >
            {icon && <span className="-ml-0.5">{icon}</span>}
            {children}
          </label>

          {/* Indicateur de sélection — petit cercle ✓ en haut à droite */}
          {selected && (
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute -top-1.5 -right-1.5',
                'flex items-center justify-center rounded-full',
                variantSelectedColors[resolvedVariant] ?? variantSelectedColors.default,
                size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
              )}
            >
              <CheckCircleIcon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
            </span>
          )}
        </span>
      )
    }

    // ── Mode DISMISSIBLE (supprimable) ───────────────────────────────────
    if (dismissible) {
      const { onDismiss, ...spanProps } = rest as {
        onDismiss?: () => void
      } & React.HTMLAttributes<HTMLSpanElement>

      if (!visible) return null

      const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation()
        setVisible(false)
        onDismiss?.()
      }

      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn(baseClass, 'pr-1')}
          {...(spanProps as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {icon && <span className="-ml-0.5">{icon}</span>}
          {children}
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              'ml-1 -mr-0.5 flex items-center justify-center',
              'rounded-full p-0.5',
              'hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-current',
              size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
            )}
            aria-label="Supprimer"
          >
            <CloseIcon className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
          </button>
        </span>
      )
    }

    // ── Mode STATIQUE (défaut) ────────────────────────────────────────────
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        className={baseClass}
        {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {icon && <span className="-ml-0.5">{icon}</span>}
        {children}
      </span>
    )
  }
)

Tag.displayName = 'Tag'

export { Tag }
