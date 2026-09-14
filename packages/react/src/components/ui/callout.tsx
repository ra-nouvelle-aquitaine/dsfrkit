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
  'relative mb-6 w-full border-l-4 text-foreground',
  {
    variants: {
      accent: {
        // Default : bordure bleue france, fond alt
        default: 'bg-background-contrast border-l-primary',
        // Statuts
        info: 'bg-info-background border-l-info',
        success: 'bg-success-background border-l-success',
        warning: 'bg-warning-background border-l-warning',
        error: 'bg-destructive-background border-l-destructive',
        // Accentuations DSFR
        'green-tilleul-verveine':
          'bg-[var(--background-contrast-green-tilleul-verveine)] border-l-[var(--border-default-green-tilleul-verveine)]',
        'green-bourgeon':
          'bg-[var(--background-contrast-green-bourgeon)] border-l-[var(--border-default-green-bourgeon)]',
        'green-emeraude':
          'bg-[var(--background-contrast-green-emeraude)] border-l-[var(--border-default-green-emeraude)]',
        'green-menthe':
          'bg-[var(--background-contrast-green-menthe)] border-l-[var(--border-default-green-menthe)]',
        'green-archipel':
          'bg-[var(--background-contrast-green-archipel)] border-l-[var(--border-default-green-archipel)]',
        'blue-ecume':
          'bg-[var(--background-contrast-blue-ecume)] border-l-[var(--border-default-blue-ecume)]',
        'blue-cumulus':
          'bg-[var(--background-contrast-blue-cumulus)] border-l-[var(--border-default-blue-cumulus)]',
        'purple-glycine':
          'bg-[var(--background-contrast-purple-glycine)] border-l-[var(--border-default-purple-glycine)]',
        'pink-macaron':
          'bg-[var(--background-contrast-pink-macaron)] border-l-[var(--border-default-pink-macaron)]',
        'pink-tuile':
          'bg-[var(--background-contrast-pink-tuile)] border-l-[var(--border-default-pink-tuile)]',
        'yellow-tournesol':
          'bg-[var(--background-contrast-yellow-tournesol)] border-l-[var(--border-default-yellow-tournesol)]',
        'yellow-moutarde':
          'bg-[var(--background-contrast-yellow-moutarde)] border-l-[var(--border-default-yellow-moutarde)]',
        'orange-terre-battue':
          'bg-[var(--background-contrast-orange-terre-battue)] border-l-[var(--border-default-orange-terre-battue)]',
        'brown-cafe-creme':
          'bg-[var(--background-contrast-brown-cafe-creme)] border-l-[var(--border-default-brown-cafe-creme)]',
        'brown-caramel':
          'bg-[var(--background-contrast-brown-caramel)] border-l-[var(--border-default-brown-caramel)]',
        'brown-opera':
          'bg-[var(--background-contrast-brown-opera)] border-l-[var(--border-default-brown-opera)]',
        'beige-gris-galet':
          'bg-[var(--background-contrast-beige-gris-galet)] border-l-[var(--border-default-beige-gris-galet)]',
      },
      size: {
        sm: 'p-4 text-base leading-6',
        md: 'p-6 text-lg leading-7 md:px-12 md:py-8',
        lg: 'p-8 text-xl leading-8 md:px-12',
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
    const titleClasses =
      size === 'sm'
        ? 'text-xl leading-7'
        : size === 'lg'
          ? 'text-2xl leading-8'
          : 'text-h4 md:text-h4-desktop'

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
              <TitleTag className={cn('m-0 font-bold text-foreground-title', titleClasses)}>
                {title}
              </TitleTag>
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
