import { CloseIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '@dsfrkit/icons'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Variants du bandeau d'information DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information
 */
const noticeVariants = cva('relative flex w-full items-start gap-2 px-4 py-4 lg:px-6', {
  variants: {
    variant: {
      info: 'bg-info-background text-info',
      success: 'bg-success-background text-success',
      warning: 'bg-warning-background text-warning',
      error: 'bg-destructive-background text-destructive',
      neutral: 'bg-background-contrast text-foreground-title',
      weather: 'bg-warning-background text-warning',
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

const noticeIconVariants = cva('flex-shrink-0', {
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
    const [dismissed, setDismissed] = React.useState(false)

    const handleClose = () => {
      setDismissed(true)
      onClose?.()
    }

    if (dismissed) return null

    return (
      <div ref={ref} className={cn(noticeVariants({ variant, closable, className }))} {...props}>
        {!hideIcon && displayIcon && (
          <span className={cn(noticeIconVariants({ variant }))}>{displayIcon}</span>
        )}
        <div className="min-w-0 flex-1 text-sm leading-6">
          {title && <div className="font-bold">{title}</div>}
          <div>{children}</div>
        </div>
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className={cn(
              'absolute right-4 top-3 flex size-8 items-center justify-center',
              'hover:bg-background-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring',
              'transition-colors motion-reduce:transition-none'
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
