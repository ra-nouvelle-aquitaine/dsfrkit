import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Badge DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/badge
 */
const badgeVariants = cva(
  // Base DSFR : border-radius 4px, font-weight bold, uppercase.
  // `.fr-badge` tient sur une seule ligne : `white-space: nowrap`, borné à la
  // largeur disponible et tronqué par des points de suspension au-delà. Sans
  // cela, un libellé un peu long — « Correction demandée » — se replie sur deux
  // lignes dans une colonne étroite, et le badge se lit comme un pavé de texte
  // plutôt que comme une étiquette.
  'inline-flex max-w-full items-center overflow-hidden text-ellipsis whitespace-nowrap rounded font-bold uppercase transition-colors',
  {
    variants: {
      variant: {
        // Default : fond gris clair, texte gris foncé (DSFR)
        default: 'bg-background-contrast text-foreground',
        // Info : fond bleu clair, texte bleu (DSFR)
        info: 'bg-info-background text-info',
        // Success : fond vert clair, texte vert (DSFR)
        success: 'bg-success-background text-success',
        // Warning : fond orange clair, texte orange (DSFR)
        warning: 'bg-warning-background text-warning',
        // Error : fond rouge clair, texte rouge (DSFR)
        error: 'bg-destructive-background text-destructive',
        // New : fond jaune, texte jaune foncé
        new: 'bg-yellow-tournesol-950 text-yellow-tournesol-main',
        // Primary : fond bleu france (adaptatif via token sémantique)
        primary: 'bg-primary text-primary-foreground',
        // Secondary : fond rouge marianne (adaptatif via token sémantique)
        secondary: 'bg-secondary text-secondary-foreground',

        // Accentuations DSFR
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
        'blue-ecume':
          'bg-[var(--background-contrast-blue-ecume)] text-[var(--text-label-blue-ecume)]',
        'blue-cumulus':
          'bg-[var(--background-contrast-blue-cumulus)] text-[var(--text-label-blue-cumulus)]',
        'purple-glycine':
          'bg-[var(--background-contrast-purple-glycine)] text-[var(--text-label-purple-glycine)]',
        'pink-macaron':
          'bg-[var(--background-contrast-pink-macaron)] text-[var(--text-label-pink-macaron)]',
        'pink-tuile':
          'bg-[var(--background-contrast-pink-tuile)] text-[var(--text-label-pink-tuile)]',
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
        'brown-opera':
          'bg-[var(--background-contrast-brown-opera)] text-[var(--text-label-brown-opera)]',
        'beige-gris-galet':
          'bg-[var(--background-contrast-beige-gris-galet)] text-[var(--text-label-beige-gris-galet)]',
      },
      size: {
        // SM : font-size 12px, min-height 18px, padding 0 6px
        sm: 'min-h-[1.125rem] px-1.5 text-xs leading-5',
        // MD : font-size 14px, min-height 24px, padding 0 8px
        md: 'min-h-6 px-2 text-sm leading-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

function SystemSuccessIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
      />
    </svg>
  )
}

function SystemWarningIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.866 3L22.3923 19.5C22.6684 19.9782 22.5045 20.5901 22.0263 20.8661C21.8744 20.9539 21.7011 21 21.5263 21H2.47373C1.92144 21 1.47373 20.5523 1.47373 20C1.47373 19.8251 1.5198 19.6518 1.60769 19.5L11.134 3C11.41 2.52179 12.0219 2.35786 12.5001 2.63397C12.6513 2.72108 12.7788 2.84861 12.866 3ZM11 16V18H13V16H11ZM11 9V14H13V9H11Z"
      />
    </svg>
  )
}

function SystemInfoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19.5,2.5h-15c-1.1,0-2,0.9-2,2v15c0,1.1,0.9,2,2,2h15c1.1,0,2-0.9,2-2v-15C21.5,3.4,20.6,2.5,19.5,2.5z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"
      />
    </svg>
  )
}

function SystemErrorIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17.5,2.5h-11L1,12l5.5,9.5h11L23,12L17.5,2.5z M16.2,14.8l-1.4,1.4L12,13.4l-2.8,2.8l-1.4-1.4l2.8-2.8L7.8,9.2l1.4-1.4l2.8,2.8l2.8-2.8l1.4,1.4L13.4,12L16.2,14.8z"
      />
    </svg>
  )
}

// ... existing badgeVariants ...

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Icône optionnelle personnalisée à afficher avant le texte. Remplace l'icône par défaut du statut. */
  icon?: React.ReactNode
  /** Permet de masquer l'icône associée par défaut au statut (Succès, Erreur, Info, Attention, Nouveau) */
  noIcon?: boolean
}

/**
 * Badge pour afficher des statuts, des labels ou des compteurs
 *
 * @example
 * ```tsx
 * <Badge>Par défaut</Badge>
 * <Badge variant="success">Validé</Badge>
 * <Badge variant="error" noIcon>Erreur sans icône</Badge>
 * <Badge variant="new">Nouveau</Badge>
 * ```
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size, icon, noIcon, children, ...props }, ref) => {
    // Default semantic icons for specific variants
    const statusIconMap: Record<string, React.ElementType | undefined> = {
      success: SystemSuccessIcon,
      error: SystemErrorIcon,
      info: SystemInfoIcon,
      warning: SystemWarningIcon,
      new: undefined,
      default: undefined,
      primary: undefined,
      secondary: undefined,
    }
    const DefaultIcon = statusIconMap[variant ?? 'default']

    let iconToRender = null

    if (!noIcon) {
      if (icon) {
        iconToRender = icon
      } else if (DefaultIcon) {
        // Use standard DSFR sizes for badge icons: sm -> 12px (w-3), md -> 16px (w-4)
        const iconSizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
        iconToRender = <DefaultIcon className={iconSizeClass} />
      }
    }

    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props}>
        {iconToRender && <span className="mr-1 -ml-0.5">{iconToRender}</span>}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
