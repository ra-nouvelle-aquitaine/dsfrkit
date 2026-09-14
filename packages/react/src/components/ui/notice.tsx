'use client'

import { cva } from 'class-variance-authority'
import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

/*
 * Icônes officielles du DSFR (dist/icons), reprises telles quelles pour que le
 * bandeau garde exactement la silhouette des pictogrammes `fr-notice__title::before`.
 */
function DsfrIcon({ path, ...props }: React.ComponentProps<'svg'> & { path: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d={path} />
    </svg>
  )
}

const iconPaths = {
  info: 'M19.5,2.5h-15c-1.1,0-2,0.9-2,2v15c0,1.1,0.9,2,2,2h15c1.1,0,2-0.9,2-2v-15C21.5,3.4,20.6,2.5,19.5,2.5z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z',
  warning:
    'm12.866 3 9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0ZM11 16v2h2v-2h-2Zm0-7v5h2V9h-2Z',
  alert:
    'M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Zm1 13h-2v2h2v-2Zm0-8h-2v6h2V7Z',
  heavyShowers:
    'M13 18v5h-2v-5H9v3H7v-3.252a8 8 0 1 1 9.458-10.65A5.5 5.5 0 1 1 17.5 18H17v3.001h-2v-3h-2Z',
  typhoon:
    'm17.654 1.7-2.782 2.533a9.137 9.137 0 0 1 3.49 1.973c3.512 3.2 3.512 8.388 0 11.588-2.592 2.36-6.598 3.862-12.016 4.506l2.782-2.533a9.138 9.138 0 0 1-3.49-1.973c-3.512-3.2-3.533-8.37 0-11.588C8.23 3.846 12.237 2.344 17.655 1.7ZM12 8c-2.485 0-4.5 1.79-4.5 4s2.015 4 4.5 4 4.5-1.79 4.5-4-2.015-4-4.5-4Z',
  kidnapping:
    'M15.5 2.5h6a1 1 0 0 1 1 1v12l-7-13ZM12.867 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.475a1 1 0 0 1-.866-1.5L11.135 3a1 1 0 0 1 1.732 0ZM11 16v2h2v-2h-2Zm0-7v5h2V9h-2Z',
  attack:
    'm12.867 3 9.526 16.5a1 1 0 0 1-.866 1.5H2.475a1 1 0 0 1-.866-1.5L11.135 3a1 1 0 0 1 1.732 0Zm-8.66 16h15.588L12 5.5 4.207 19ZM12 8l4 7H8l4-7Z',
  success:
    'M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z',
  externalLink:
    'M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6Zm11-3v8h-2V6.413l-7.793 7.794-1.414-1.414L17.585 5H13V3h8Z',
  close:
    'm12 10.6 4.95-4.96 1.4 1.4L13.42 12l4.96 4.95-1.4 1.4L12 13.42l-4.95 4.96-1.4-1.4L10.58 12 5.63 7.05l1.4-1.4z',
} as const

export type NoticeVariant =
  | 'neutral'
  | 'info'
  | 'warning'
  | 'alert'
  | 'weather-orange'
  | 'weather-red'
  | 'weather-purple'
  | 'witness'
  | 'kidnapping'
  | 'attack'
  | 'cyberattack'
  /** @deprecated Utiliser `alert`, nom DSFR du bandeau d'alerte. */
  | 'error'
  /** @deprecated Utiliser `weather-orange` (ou `weather-red` / `weather-purple`). */
  | 'weather'
  /** @deprecated Le DSFR ne propose pas de bandeau de succès : préférer `Alert`. */
  | 'success'

type CanonicalVariant = Exclude<NoticeVariant, 'error' | 'weather'>

const variantAliases: Partial<Record<NoticeVariant, CanonicalVariant>> = {
  error: 'alert',
  weather: 'weather-orange',
}

/**
 * Variants du bandeau d'information DSFR (`fr-notice`)
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information
 *
 * - Bandeaux « génériques » (info, warning, alert) : fond contrasté, texte coloré.
 * - Vigilance météo (weather-*) : orange sur fond contrasté, rouge et violet en aplat.
 * - Alertes « Vigipirate » (witness, kidnapping, attack, cyberattack) : aplat
 *   avec liseré supérieur de 6px et titre en capitales.
 */
const noticeVariants = cva('relative w-full py-4', {
  variants: {
    variant: {
      neutral:
        'bg-[var(--background-contrast-grey)] text-[var(--text-title-grey)] [--notice-hover:var(--background-contrast-grey-hover)] [--notice-active:var(--background-contrast-grey-active)]',
      info: 'bg-[var(--background-contrast-info)] text-[var(--text-default-info)] [--notice-hover:var(--background-contrast-info-hover)] [--notice-active:var(--background-contrast-info-active)]',
      warning:
        'bg-[var(--background-contrast-warning)] text-[var(--text-default-warning)] [--notice-hover:var(--background-contrast-warning-hover)] [--notice-active:var(--background-contrast-warning-active)]',
      alert:
        'bg-[var(--background-contrast-error)] text-[var(--text-default-error)] [--notice-hover:var(--background-contrast-error-hover)] [--notice-active:var(--background-contrast-error-active)]',
      'weather-orange':
        'bg-[var(--background-contrast-warning)] text-[var(--text-default-warning)] [--notice-hover:var(--background-contrast-warning-hover)] [--notice-active:var(--background-contrast-warning-active)]',
      'weather-red': 'bg-[var(--background-flat-error)] text-[var(--text-inverted-grey)]',
      'weather-purple':
        'bg-[var(--background-flat-purple-glycine)] text-[var(--text-inverted-grey)]',
      witness:
        'bg-[var(--background-flat-grey)] text-[var(--text-inverted-grey)] [--notice-bar:var(--border-plain-error)]',
      kidnapping:
        'bg-[var(--background-flat-error)] text-[var(--text-inverted-grey)] [--notice-bar:var(--border-plain-grey)]',
      attack:
        'bg-[var(--background-flat-error)] text-[var(--text-inverted-grey)] [--notice-bar:var(--border-plain-grey)]',
      cyberattack:
        'bg-[var(--background-flat-grey)] text-[var(--text-inverted-grey)] [--notice-bar:var(--border-plain-info)]',
      success:
        'bg-[var(--background-contrast-success)] text-[var(--text-default-success)] [--notice-hover:var(--background-contrast-success-hover)] [--notice-active:var(--background-contrast-success-active)]',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
})

/** Alertes à liseré supérieur : titre en capitales, bandeau légèrement plus haut. */
const barVariants = new Set<CanonicalVariant>(['witness', 'kidnapping', 'attack', 'cyberattack'])

/**
 * Bouton « Masquer le message » : transparent sur les bandeaux contrastés,
 * plein (action-high) sur les bandeaux en aplat, comme `fr-btn--close` du DSFR.
 */
const closeButtonVariants: Partial<Record<CanonicalVariant, string>> = {
  'weather-red':
    'bg-[var(--background-action-high-error)] hover:bg-[var(--background-action-high-error-hover)] active:bg-[var(--background-action-high-error-active)]',
  'weather-purple':
    'bg-[var(--background-action-high-purple-glycine)] hover:bg-[var(--background-action-high-purple-glycine-hover)] active:bg-[var(--background-action-high-purple-glycine-active)]',
  witness:
    'bg-[var(--background-action-high-grey)] hover:bg-[var(--background-action-high-grey-hover)] active:bg-[var(--background-action-high-grey-active)]',
  kidnapping:
    'bg-[var(--background-action-high-error)] hover:bg-[var(--background-action-high-error-hover)] active:bg-[var(--background-action-high-error-active)]',
  attack:
    'bg-[var(--background-action-high-error)] hover:bg-[var(--background-action-high-error-hover)] active:bg-[var(--background-action-high-error-active)]',
  cyberattack:
    'bg-[var(--background-action-high-grey)] hover:bg-[var(--background-action-high-grey-hover)] active:bg-[var(--background-action-high-grey-active)]',
}

const defaultIconPaths: Partial<Record<CanonicalVariant, string>> = {
  info: iconPaths.info,
  warning: iconPaths.warning,
  alert: iconPaths.alert,
  'weather-orange': iconPaths.heavyShowers,
  'weather-red': iconPaths.heavyShowers,
  'weather-purple': iconPaths.typhoon,
  witness: iconPaths.warning,
  kidnapping: iconPaths.kidnapping,
  attack: iconPaths.attack,
  cyberattack: iconPaths.warning,
  success: iconPaths.success,
}

export interface NoticeLink {
  /** Intitulé du lien de consultation */
  label: React.ReactNode
  /** Destination du lien */
  href: string
  /**
   * Ouvre le lien dans un nouvel onglet (`target="_blank"`, `rel="noopener external"`)
   * et annonce « nouvelle fenêtre » dans l'attribut `title`, comme le DSFR.
   */
  external?: boolean
}

export interface NoticeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Type de bandeau. Sans type, le bandeau est neutre (fond gris, sans icône).
   * @default 'info'
   */
  variant?: NoticeVariant
  /** Titre du bandeau, en gras. Obligatoire dans le DSFR. */
  title?: React.ReactNode
  /** Description (`fr-notice__desc`), affichée à la suite du titre. */
  children?: React.ReactNode
  /** Lien de consultation (`fr-notice__link`), affiché après la description. */
  link?: NoticeLink
  /** Affiche le bouton « Masquer le message ». */
  closable?: boolean
  /** Callback appelé lors de la fermeture. */
  onClose?: () => void
  /** Libellé du bouton de fermeture. @default 'Masquer le message' */
  closeLabel?: string
  /** Icône personnalisée, à la place de l'icône du type. */
  icon?: React.ReactNode
  /** Masque l'icône (`fr-notice--no-icon`). */
  hideIcon?: boolean
}

/**
 * Composant Notice (Bandeau d'information importante) DSFR
 *
 * Bandeau pleine largeur affiché sous l'en-tête pour une information
 * importante et temporaire. Le contenu est aligné sur le conteneur de page.
 *
 * @example
 * ```tsx
 * <Notice title="Maintenance prévue">
 *   Le service sera indisponible dimanche de 2h à 6h.
 * </Notice>
 *
 * <Notice
 *   variant="weather-red"
 *   title="Vigilance rouge"
 *   link={{ label: 'Voir la carte de vigilance', href: 'https://vigilance.meteofrance.fr', external: true }}
 *   closable
 * >
 *   Orages violents attendus sur le département.
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
      link,
      onClose,
      closeLabel = 'Masquer le message',
      icon,
      hideIcon = false,
      children,
      ...props
    },
    ref
  ) => {
    const [dismissed, setDismissed] = React.useState(false)
    const resolved: CanonicalVariant = variantAliases[variant] ?? (variant as CanonicalVariant)
    const hasBar = barVariants.has(resolved)
    const iconPath = defaultIconPaths[resolved]

    if (dismissed) return null

    const handleClose = () => {
      setDismissed(true)
      onClose?.()
    }

    const displayIcon = hideIcon
      ? null
      : (icon ??
        (iconPath ? <DsfrIcon path={iconPath} className="size-full" aria-hidden="true" /> : null))

    return (
      <div
        ref={ref}
        className={cn(
          noticeVariants({ variant: resolved }),
          hasBar &&
            'bg-[image:linear-gradient(0deg,var(--notice-bar),var(--notice-bar))] bg-[length:100%_0.375rem] bg-no-repeat pt-[1.375rem]',
          className
        )}
        {...props}
      >
        <div className="fr-container">
          <div className="relative flex flex-row items-start justify-between">
            {/* <div> et non <p> comme le DSFR : titre et description acceptent du contenu
                en blocs (<p>, listes) sans imbrication invalide ni échec d'hydratation. */}
            <div className="m-0 text-sm leading-6 md:text-base">
              {title && (
                <div className={cn('mr-1 block font-bold sm:inline', hasBar && 'uppercase')}>
                  {displayIcon && (
                    <span
                      className="mr-2 inline-block size-6 [&>svg]:size-6"
                      style={{ verticalAlign: 'calc((0.75em - 1.5rem) * 0.5)' }}
                      aria-hidden="true"
                    >
                      {displayIcon}
                    </span>
                  )}
                  {title}
                </div>
              )}{' '}
              {children && <div className="mr-1 block sm:inline">{children}</div>}{' '}
              {link && (
                <RouterAnchor
                  href={link.href}
                  className="text-inherit underline underline-offset-2 hover:decoration-2"
                  {...(link.external
                    ? {
                        target: '_blank',
                        rel: 'noopener external',
                        title: `${typeof link.label === 'string' ? link.label : 'Lien'} - nouvelle fenêtre`,
                      }
                    : {})}
                >
                  {link.label}
                  {link.external && (
                    <DsfrIcon
                      path={iconPaths.externalLink}
                      className="ml-1 inline-block size-4"
                      style={{ verticalAlign: 'calc((0.75em - 1rem) * 0.5)' }}
                      aria-hidden="true"
                    />
                  )}
                </RouterAnchor>
              )}
            </div>
            {closable && (
              <button
                type="button"
                onClick={handleClose}
                title={closeLabel}
                className={cn(
                  '-mt-1 ml-1 flex size-8 shrink-0 items-center justify-center text-inherit md:ml-4',
                  'transition-colors motion-reduce:transition-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  closeButtonVariants[resolved] ??
                    'bg-transparent hover:bg-[var(--notice-hover)] active:bg-[var(--notice-active)]'
                )}
              >
                <DsfrIcon path={iconPaths.close} className="size-4" aria-hidden="true" />
                <span className="sr-only">{closeLabel}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

Notice.displayName = 'Notice'

export { Notice, noticeVariants }
