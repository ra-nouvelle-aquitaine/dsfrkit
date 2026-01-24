import { CloseIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '@dsfrkit/icons'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Variants du bandeau d'information DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information
 */
const noticeVariants = cva('relative w-full py-4 px-6 flex items-start gap-4', {
  variants: {
    variant: {
      // DSFR: bordure gauche 4px + fond sémantique (même logique qu'Alert)
      info: 'border-l-4 border-l-info bg-info-background text-foreground',
      success: 'border-l-4 border-l-success bg-success-background text-foreground',
      warning: 'border-l-4 border-l-warning bg-warning-background text-foreground',
      error: 'border-l-4 border-l-destructive bg-destructive-background text-foreground',
      neutral: 'border-l-4 border-l-border-contrast bg-accent text-accent-foreground',
      // Variante "weather" DSFR — fond neutre
      weather: 'bg-muted text-foreground border-b border-border',
    },
    closable: {
      true: 'pr-12',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'info',
    closable: false,
  },
})

const noticeIconVariants = cva('flex-shrink-0 mt-0.5', {
  variants: {
    variant: {
      info: 'text-info',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-destructive',
      neutral: 'text-muted-foreground',
      weather: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

export interface NoticeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof noticeVariants> {
  /**
   * Titre du bandeau (optionnel, accepte du texte ou un noeud React)
   */
  title?: React.ReactNode
  /**
   * Callback appelé lors de la fermeture
   */
  onClose?: () => void
  /**
   * Icône personnalisée
   */
  icon?: React.ReactNode
  /**
   * Masquer l'icône par défaut
   */
  hideIcon?: boolean
}

/**
 * Icônes par défaut selon le variant
 */
const defaultIcons: Record<string, React.ReactNode> = {
  info: <InfoIcon className="h-6 w-6" aria-hidden="true" />,
  success: <SuccessIcon className="h-6 w-6" aria-hidden="true" />,
  warning: <WarningIcon className="h-6 w-6" aria-hidden="true" />,
  error: <ErrorIcon className="h-6 w-6" aria-hidden="true" />,
  neutral: <InfoIcon className="h-6 w-6" aria-hidden="true" />,
}

/**
 * Composant Notice (Bandeau d'information) DSFR
 *
 * Affiche un message important en haut de page ou dans une section.
 *
 * @example
 * ```tsx
 * // Bandeau d'information simple
 * <Notice variant="info">
 *   Cette fonctionnalité est en cours de déploiement.
 * </Notice>
 *
 * // Avec titre et fermeture
 * <Notice
 *   variant="warning"
 *   title="Maintenance prévue"
 *   closable
 *   onClose={() => console.log('fermé')}
 * >
 *   Le service sera indisponible dimanche de 2h à 6h.
 * </Notice>
 * ```
 */
const Notice = React.forwardRef<HTMLDivElement, NoticeProps>(
  (
    {
      className,
      variant = 'info',
      closable,
      title,
      onClose,
      icon,
      hideIcon = false,
      children,
      ...props
    },
    ref
  ) => {
    const displayIcon = icon ?? (variant ? defaultIcons[variant] : null)

    return (
      <div
        ref={ref}
        role="status"
        className={cn(noticeVariants({ variant, closable, className }))}
        {...props}
      >
        {!hideIcon && displayIcon && (
          <span className={cn(noticeIconVariants({ variant }))}>{displayIcon}</span>
        )}
        <div className="flex-1 min-w-0">
          {title && <div className="font-semibold text-base mb-1">{title}</div>}
          <div className="text-sm">{children}</div>
        </div>
        {closable && onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'absolute right-4 top-4 p-1 rounded-md',
              'hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current',
              'transition-colors'
            )}
            aria-label="Fermer"
          >
            <CloseIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>
    )
  }
)

Notice.displayName = 'Notice'

export { Notice, noticeVariants }
