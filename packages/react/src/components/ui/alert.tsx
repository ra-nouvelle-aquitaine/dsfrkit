'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

function SuccessIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
      />
    </svg>
  )
}

function WarningIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.866 3L22.3923 19.5C22.6684 19.9782 22.5045 20.5901 22.0263 20.8661C21.8744 20.9539 21.7011 21 21.5263 21H2.47373C1.92144 21 1.47373 20.5523 1.47373 20C1.47373 19.8251 1.5198 19.6518 1.60769 19.5L11.134 3C11.41 2.52179 12.0219 2.35786 12.5001 2.63397C12.6513 2.72108 12.7788 2.84861 12.866 3ZM11 16V18H13V16H11ZM11 9V14H13V9H11Z"
      />
    </svg>
  )
}

function AlertInfoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19.5,2.5h-15c-1.1,0-2,0.9-2,2v15c0,1.1,0.9,2,2,2h15c1.1,0,2-0.9,2-2v-15C21.5,3.4,20.6,2.5,19.5,2.5z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"
      />
    </svg>
  )
}

function AlertErrorIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17.5,2.5h-11L1,12l5.5,9.5h11L23,12L17.5,2.5z M16.2,14.8l-1.4,1.4L12,13.4l-2.8,2.8l-1.4-1.4l2.8-2.8L7.8,9.2l1.4-1.4l2.8,2.8l2.8-2.8l1.4,1.4L13.4,12L16.2,14.8z"
      />
    </svg>
  )
}

/**
 * Variants de l'alerte DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/alerte
 *
 * L'alerte DSFR a une bordure gauche épaisse colorée et des bordures fines sur les autres côtés
 */
const alertVariants = cva(
  // Base: bordure gauche très épaisse (44px) pour contenir l'icône
  'relative w-full border border-border border-l-[44px] text-foreground transition-all duration-200',
  {
    variants: {
      variant: {
        // Default : variant gris (DSFR base)
        default: 'border-l-border bg-muted',
        // DSFR : bordure gauche colorée + fond coloré léger (utilisant les variables CSS du thème)
        info: 'border-l-info bg-info-background',
        success: 'border-l-success bg-success-background',
        warning: 'border-l-warning bg-warning-background',
        error: 'border-l-destructive bg-destructive-background',
      },
      size: {
        sm: 'py-2 pr-12 pl-4',
        md: 'py-4 pr-12 pl-4',
      },
    },
    defaultVariants: {
      variant: 'info',
      size: 'md',
    },
  }
)

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  /**
   * Titre de l'alerte (accepte du texte ou un noeud React)
   */
  title?: React.ReactNode
  /**
   * Rend l'alerte refermable (ajoute un bouton croix)
   */
  closable?: boolean
  /**
   * Action déclenchée lors de la fermeture
   */
  onClose?: () => void
  /**
   * Libellé du bouton de fermeture pour l'accessibilité
   */
  closeLabel?: string
}

/**
 * Composant Alert DSFR
 *
 * @example
 * ```tsx
 * <Alert variant="success" title="Succès" closable>
 *   Votre action a été effectuée avec succès.
 * </Alert>
 *
 * <Alert variant="error">
 *   Une erreur est survenue.
 * </Alert>
 * ```
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = 'info',
      size,
      title,
      closable,
      onClose,
      closeLabel = 'Masquer le message',
      children,
      ...props
    },
    ref
  ) => {
    const [isClosed, setIsClosed] = React.useState(false)

    if (isClosed) return null

    const handleClose = () => {
      setIsClosed(true)
      onClose?.()
    }

    const Icon = {
      default: null,
      info: AlertInfoIcon,
      success: SuccessIcon,
      warning: WarningIcon,
      error: AlertErrorIcon,
    }[variant ?? 'default']

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant, size }), className)}
        {...props}
      >
        {Icon && (
          <div
            className={cn(
              'absolute left-[-34px]',
              size === 'sm' ? 'top-2' : 'top-4',
              'text-background'
            )}
            aria-hidden="true"
          >
            <Icon className="w-6 h-6" />
          </div>
        )}

        <div className="flex-1">
          {title && (
            <div className="mb-1 font-bold text-lg leading-6 text-foreground-title">{title}</div>
          )}
          <div className="text-base leading-6 text-foreground">{children}</div>
        </div>

        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-foreground p-1 hover:bg-muted"
            title={closeLabel}
            aria-label={closeLabel}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export { Alert, alertVariants }
