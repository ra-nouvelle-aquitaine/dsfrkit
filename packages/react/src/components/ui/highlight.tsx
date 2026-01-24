import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Highlight (Mise en exergue) DSFR — fr-highlight
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-exergue
 *
 * Bloc textuel mis en valeur par une bordure gauche et une couleur de fond légère.
 * À ne pas confondre avec Callout (Mise en avant) qui cible les informations critiques.
 *
 * @example
 * ```tsx
 * <Highlight>
 *   Cette phrase mérite d'être mise en lumière dans le contexte de la page.
 * </Highlight>
 * ```
 */

const highlightVariants = cva('fr-highlight border-l-[4px] pl-6 py-1 my-4', {
  variants: {
    accent: {
      default: 'border-l-primary',
      // Accentuations DSFR
      'green-tilleul-verveine': 'border-l-[var(--border-default-green-tilleul-verveine)]',
      'green-bourgeon': 'border-l-[var(--border-default-green-bourgeon)]',
      'green-emeraude': 'border-l-[var(--border-default-green-emeraude)]',
      'green-menthe': 'border-l-[var(--border-default-green-menthe)]',
      'green-archipel': 'border-l-[var(--border-default-green-archipel)]',
      'blue-ecume': 'border-l-[var(--border-default-blue-ecume)]',
      'blue-cumulus': 'border-l-[var(--border-default-blue-cumulus)]',
      'purple-glycine': 'border-l-[var(--border-default-purple-glycine)]',
      'pink-macaron': 'border-l-[var(--border-default-pink-macaron)]',
      'pink-tuile': 'border-l-[var(--border-default-pink-tuile)]',
      'yellow-tournesol': 'border-l-[var(--border-default-yellow-tournesol)]',
      'yellow-moutarde': 'border-l-[var(--border-default-yellow-moutarde)]',
      'orange-terre-battue': 'border-l-[var(--border-default-orange-terre-battue)]',
      'brown-cafe-creme': 'border-l-[var(--border-default-brown-cafe-creme)]',
      'brown-caramel': 'border-l-[var(--border-default-brown-caramel)]',
      'brown-opera': 'border-l-[var(--border-default-brown-opera)]',
      'beige-gris-galet': 'border-l-[var(--border-default-beige-gris-galet)]',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    accent: 'default',
    size: 'md',
  },
})

export interface HighlightProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof highlightVariants> {}

const Highlight = React.forwardRef<HTMLDivElement, HighlightProps>(
  ({ className, accent, size, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(highlightVariants({ accent, size }), className)} {...props}>
        <p className="text-foreground leading-7">{children}</p>
      </div>
    )
  }
)

Highlight.displayName = 'Highlight'

export { Highlight }
