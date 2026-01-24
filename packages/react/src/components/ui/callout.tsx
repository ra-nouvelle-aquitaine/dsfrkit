import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Callout DSFR ("Mise en avant")
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-avant
 *
 * Bloc de mise en avant avec bordure gauche épaisse colorée et fond adaptatif.
 * Utilisé pour mettre en valeur une information clé.
 */

const calloutVariants = cva(
  // Base DSFR : bordure gauche épaisse (4px), pas de border-radius, fond adaptatif
  'relative w-full border-l-[4px] transition-colors',
  {
    variants: {
      accent: {
        // Default : bordure bleue france, fond alt
        default: 'bg-muted border-l-primary text-foreground',
        // Statuts
        info: 'bg-info-background border-l-info text-info',
        success: 'bg-success-background border-l-success text-success',
        warning: 'bg-warning-background border-l-warning text-warning',
        error: 'bg-destructive-background border-l-destructive text-destructive',
        // Accentuations DSFR
        'green-tilleul-verveine':
          'bg-[var(--background-contrast-green-tilleul-verveine)] border-l-[var(--border-default-green-tilleul-verveine)] text-[var(--text-label-green-tilleul-verveine)]',
        'green-bourgeon':
          'bg-[var(--background-contrast-green-bourgeon)] border-l-[var(--border-default-green-bourgeon)] text-[var(--text-label-green-bourgeon)]',
        'green-emeraude':
          'bg-[var(--background-contrast-green-emeraude)] border-l-[var(--border-default-green-emeraude)] text-[var(--text-label-green-emeraude)]',
        'green-menthe':
          'bg-[var(--background-contrast-green-menthe)] border-l-[var(--border-default-green-menthe)] text-[var(--text-label-green-menthe)]',
        'green-archipel':
          'bg-[var(--background-contrast-green-archipel)] border-l-[var(--border-default-green-archipel)] text-[var(--text-label-green-archipel)]',
        'blue-ecume':
          'bg-[var(--background-contrast-blue-ecume)] border-l-[var(--border-default-blue-ecume)] text-[var(--text-label-blue-ecume)]',
        'blue-cumulus':
          'bg-[var(--background-contrast-blue-cumulus)] border-l-[var(--border-default-blue-cumulus)] text-[var(--text-label-blue-cumulus)]',
        'purple-glycine':
          'bg-[var(--background-contrast-purple-glycine)] border-l-[var(--border-default-purple-glycine)] text-[var(--text-label-purple-glycine)]',
        'pink-macaron':
          'bg-[var(--background-contrast-pink-macaron)] border-l-[var(--border-default-pink-macaron)] text-[var(--text-label-pink-macaron)]',
        'pink-tuile':
          'bg-[var(--background-contrast-pink-tuile)] border-l-[var(--border-default-pink-tuile)] text-[var(--text-label-pink-tuile)]',
        'yellow-tournesol':
          'bg-[var(--background-contrast-yellow-tournesol)] border-l-[var(--border-default-yellow-tournesol)] text-[var(--text-label-yellow-tournesol)]',
        'yellow-moutarde':
          'bg-[var(--background-contrast-yellow-moutarde)] border-l-[var(--border-default-yellow-moutarde)] text-[var(--text-label-yellow-moutarde)]',
        'orange-terre-battue':
          'bg-[var(--background-contrast-orange-terre-battue)] border-l-[var(--border-default-orange-terre-battue)] text-[var(--text-label-orange-terre-battue)]',
        'brown-cafe-creme':
          'bg-[var(--background-contrast-brown-cafe-creme)] border-l-[var(--border-default-brown-cafe-creme)] text-[var(--text-label-brown-cafe-creme)]',
        'brown-caramel':
          'bg-[var(--background-contrast-brown-caramel)] border-l-[var(--border-default-brown-caramel)] text-[var(--text-label-brown-caramel)]',
        'brown-opera':
          'bg-[var(--background-contrast-brown-opera)] border-l-[var(--border-default-brown-opera)] text-[var(--text-label-brown-opera)]',
        'beige-gris-galet':
          'bg-[var(--background-contrast-beige-gris-galet)] border-l-[var(--border-default-beige-gris-galet)] text-[var(--text-label-beige-gris-galet)]',
      },
      size: {
        sm: 'px-3 py-3 text-sm',
        md: 'px-4 py-4 text-base',
        lg: 'px-5 py-5 text-lg',
      },
    },
    defaultVariants: {
      accent: 'default',
      size: 'md',
    },
  }
)

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof calloutVariants> {
  /** Titre optionnel affiché en gras au-dessus du contenu */
  title?: React.ReactNode
  /**
   * Niveau sémantique du titre.
   * Modifie la balise générée (h2-h6, p, div, span) tout en gardant l'apparence visuelle.
   * @default "h3"
   */
  titleMarkup?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span'
  /** Icône optionnelle à afficher avant le titre */
  icon?: React.ReactNode
  /** Composant optionnel de bouton d'action affiché en bas de la mise en avant */
  action?: React.ReactNode
}

const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (
    { className, accent, size, title, titleMarkup = 'h3', icon, action, children, ...props },
    ref
  ) => {
    const TitleTag = titleMarkup

    return (
      <div ref={ref} className={cn(calloutVariants({ accent, size }), className)} {...props}>
        {(icon || title) && (
          <div className="flex items-start gap-2 mb-2">
            {icon && (
              <span className="mt-0.5 shrink-0 text-current" aria-hidden="true">
                {icon}
              </span>
            )}
            {title && (
              <TitleTag className="font-bold text-[1.125em] leading-snug m-0">{title}</TitleTag>
            )}
          </div>
        )}
        {children && <div className="mt-1">{children}</div>}
        {action && <div className="mt-4">{action}</div>}
      </div>
    )
  }
)

Callout.displayName = 'Callout'

export { Callout, calloutVariants }

/**
 * @example
 * ```tsx
 * <Callout title="Attention">
 *   Ceci est une information importante.
 * </Callout>
 * ```
 */
