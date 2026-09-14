'use client'

import {
  RiBlueskyFillIcon,
  RiFacebookCircleFillIcon,
  RiGithubFillIcon,
  RiInstagramFillIcon,
  RiLinkedinBoxFillIcon,
  RiMastodonFillIcon,
  RiSnapchatFillIcon,
  RiTelegramFillIcon,
  RiThreadsFillIcon,
  RiTwitchFillIcon,
  RiTwitterFillIcon,
  RiTwitterXFillIcon,
  RiVimeoFillIcon,
  RiYoutubeFillIcon,
} from '@dsfrkit/icons'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Composant Follow (Lettre d'information et réseaux sociaux) DSFR — `fr-follow`
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lettre-d-information-et-reseaux-sociaux
 *
 * - Fond `--background-alt-blue-france`, contenu aligné sur le conteneur de page.
 * - Lettre d'information et réseaux sociaux côte à côte (8 / 4 colonnes à partir de `md`),
 *   séparés par un filet `--border-default-blue-france` ; empilés sur mobile.
 * - Seul, un bloc occupe toute la largeur : texte à gauche, action à droite.
 */

type FollowContextValue = { split: boolean }

const FollowContext = React.createContext<FollowContextValue>({ split: false })

/** Enfants à plat : fragments dépliés, valeurs vides retirées. */
function flattenChildren(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).flatMap((child) =>
    React.isValidElement<{ children?: React.ReactNode }>(child) && child.type === React.Fragment
      ? flattenChildren(child.props.children)
      : [child]
  )
}

const isFollowBlock = (child: React.ReactNode) => {
  if (!React.isValidElement(child)) return false
  const name = (child.type as { displayName?: string }).displayName
  return name === 'FollowNewsletter' || name === 'FollowSocial'
}

const Follow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const blocks = React.Children.toArray(children).filter(isFollowBlock).length
    const contextValue = React.useMemo(() => ({ split: blocks > 1 }), [blocks])

    return (
      <div
        ref={ref}
        className={cn('w-full bg-background-alt-blue-france py-6 md:py-8', className)}
        {...props}
      >
        <div className="fr-container">
          <div
            className={cn(
              'flex flex-col md:flex-row',
              // Filet de séparation : horizontal sur mobile, vertical à partir de md.
              '[&>*:not(:first-child)]:mt-6 [&>*:not(:first-child)]:pt-6',
              '[&>*:not(:first-child)]:shadow-[0_-1px_0_0_var(--border-default-blue-france)]',
              'md:[&>*:not(:first-child)]:mt-0 md:[&>*:not(:first-child)]:pl-[8.3333%] md:[&>*:not(:first-child)]:pt-0',
              'md:[&>*:not(:first-child)]:shadow-[-1px_0_0_0_var(--border-default-blue-france)]',
              'md:[&>*:not(:last-child)]:pr-[8.3333%]'
            )}
          >
            <FollowContext.Provider value={contextValue}>{children}</FollowContext.Provider>
          </div>
        </div>
      </div>
    )
  }
)
Follow.displayName = 'Follow'

export interface FollowTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Niveau de titre, à adapter à la hiérarchie de la page. @default 'h2' */
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/** Titre d'un bloc, au style `fr-h5`. */
const FollowTitle = React.forwardRef<HTMLHeadingElement, FollowTitleProps>(
  ({ as: Comp = 'h2', className, ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        'm-0 mb-2 text-xl font-bold leading-7 text-foreground-title md:text-[1.375rem]',
        className
      )}
      {...props}
    />
  )
)
FollowTitle.displayName = 'FollowTitle'

/** Texte d'accroche de la lettre d'information (`fr-text--sm`). */
const FollowDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('m-0 mb-4 text-sm leading-6 text-foreground', className)} {...props} />
))
FollowDescription.displayName = 'FollowDescription'

export interface FollowNewsletterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Titre du bloc (rendu avec `FollowTitle`). */
  title?: React.ReactNode
  /** Niveau du titre. @default 'h2' */
  titleAs?: FollowTitleProps['as']
  /** Texte d'accroche (rendu avec `FollowDescription`). */
  description?: React.ReactNode
}

/**
 * Bloc « Lettre d'information ». Passez `title` / `description` et placez
 * l'action (`FollowNewsletterForm` ou un simple `Button`) en enfant.
 */
const FollowNewsletter = React.forwardRef<HTMLDivElement, FollowNewsletterProps>(
  ({ className, title, titleAs, description, children, ...props }, ref) => {
    const { split } = React.useContext(FollowContext)
    const hasIntro = title !== undefined || description !== undefined

    return (
      <div ref={ref} className={cn('w-full', split && 'md:w-8/12', className)} {...props}>
        <div
          className={cn(
            'flex h-full flex-col items-start md:justify-center',
            // Seul dans le bandeau : accroche à gauche, action à droite.
            !split &&
              hasIntro &&
              'md:flex-row md:items-center md:justify-between md:[&>*]:max-w-[50%] md:[&>:first-child]:pr-3 md:[&>:last-child]:pl-3 md:[&_p]:mb-0'
          )}
        >
          {hasIntro ? (
            <>
              <div>
                {title !== undefined && <FollowTitle as={titleAs}>{title}</FollowTitle>}
                {description !== undefined && <FollowDescription>{description}</FollowDescription>}
              </div>
              <div className="w-full">{children}</div>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    )
  }
)
FollowNewsletter.displayName = 'FollowNewsletter'

export interface FollowNewsletterFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Libellé du champ, masqué visuellement comme dans le DSFR. */
  label?: string
  /** Texte indicatif du champ. Par défaut : le libellé. */
  placeholder?: string
  /** Intitulé du bouton. @default "S'abonner" */
  buttonLabel?: string
  /** Attribut `title` du bouton. @default 'S‘abonner à notre lettre d’information' */
  buttonTitle?: string
  /** Mention légale sous le champ. Passez `null` pour la masquer. */
  hint?: React.ReactNode
  /** Message d'erreur (adresse invalide…). */
  error?: string
  /** Message de confirmation (inscription réussie…). */
  success?: string
  /** Valeur contrôlée du champ. */
  value?: string
  /** Valeur initiale du champ (non contrôlé). */
  defaultValue?: string
  /** Changement de la valeur du champ. */
  onValueChange?: (value: string) => void
  /** Soumission du formulaire, avec l'adresse saisie. */
  onSubmit?: (email: string, event: React.FormEvent<HTMLFormElement>) => void
  /** Désactive le champ et le bouton. */
  disabled?: boolean
}

const DEFAULT_NEWSLETTER_HINT =
  'En renseignant votre adresse électronique, vous acceptez de recevoir nos actualités par courriel. Vous pouvez vous désinscrire à tout moment à l’aide des liens de désinscription ou en nous contactant.'

/**
 * Formulaire d'inscription à la lettre d'information : champ courriel accolé
 * au bouton (empilés sur mobile), mention légale et messages d'état.
 */
const FollowNewsletterForm = React.forwardRef<HTMLFormElement, FollowNewsletterFormProps>(
  (
    {
      className,
      label = 'Votre adresse électronique (ex. : nom@example.com)',
      placeholder,
      buttonLabel = "S'abonner",
      buttonTitle = 'S‘abonner à notre lettre d’information',
      hint = DEFAULT_NEWSLETTER_HINT,
      error,
      success,
      value,
      defaultValue,
      onValueChange,
      onSubmit,
      disabled,
      ...props
    },
    ref
  ) => {
    const id = React.useId()
    const inputId = `${id}-email`
    const hintId = `${id}-hint`
    const messagesId = `${id}-messages`
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      if (!onSubmit) return
      event.preventDefault()
      onSubmit(inputRef.current?.value ?? '', event)
    }

    return (
      <form
        ref={ref}
        noValidate
        className={cn('w-full', className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="mb-4 sm:mb-2">
          <label htmlFor={inputId} className="sr-only">
            {label}
          </label>
          <div className="flex max-w-[37.5rem] flex-col sm:flex-row">
            <input
              ref={inputRef}
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              title={label}
              placeholder={placeholder ?? label}
              value={value}
              defaultValue={defaultValue}
              onChange={(event) => onValueChange?.(event.target.value)}
              disabled={disabled}
              aria-invalid={error ? true : undefined}
              aria-describedby={[hint !== null ? hintId : undefined, messagesId]
                .filter(Boolean)
                .join(' ')}
              className={cn(
                'mb-4 h-10 w-full min-w-0 flex-1 rounded-t rounded-b-none border-0 bg-background px-4 py-2 text-base leading-6 text-foreground sm:mb-0 sm:rounded-tr-none',
                'placeholder:italic placeholder:text-muted-foreground',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-60',
                error
                  ? 'shadow-[inset_0_-2px_0_0_var(--border-plain-error)]'
                  : success
                    ? 'shadow-[inset_0_-2px_0_0_var(--border-plain-success)]'
                    : 'shadow-[inset_0_-2px_0_0_var(--border-plain-grey)]'
              )}
            />
            <button
              type="submit"
              title={buttonTitle}
              disabled={disabled}
              className={cn(
                'inline-flex min-h-10 w-full shrink-0 cursor-pointer items-center justify-center px-4 py-2 text-base font-medium leading-6 sm:w-auto sm:rounded-tr',
                'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'disabled:cursor-not-allowed disabled:bg-background-contrast disabled:text-foreground-disabled'
              )}
            >
              {buttonLabel}
            </button>
          </div>
          <div id={messagesId} aria-live="polite">
            {error && (
              <p className="m-0 mt-4 flex items-start gap-1 text-xs leading-5 text-error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M17.5,2.5h-11L1,12l5.5,9.5h11L23,12L17.5,2.5z M16.2,14.8l-1.4,1.4L12,13.4l-2.8,2.8l-1.4-1.4l2.8-2.8L7.8,9.2l1.4-1.4l2.8,2.8l2.8-2.8l1.4,1.4L13.4,12L16.2,14.8z"
                  />
                </svg>
                <span>{error}</span>
              </p>
            )}
            {!error && success && (
              <p className="m-0 mt-4 flex items-start gap-1 text-xs leading-5 text-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="mt-0.5 size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm-.997-6 7.07-7.071-1.413-1.414-5.657 5.657-2.829-2.829-1.414 1.414L11.003 16Z"
                  />
                </svg>
                <span>{success}</span>
              </p>
            )}
          </div>
        </div>
        {hint !== null && (
          <p id={hintId} className="m-0 mt-4 text-xs leading-5 text-muted-foreground md:mt-2">
            {hint}
          </p>
        )}
      </form>
    )
  }
)
FollowNewsletterForm.displayName = 'FollowNewsletterForm'

export interface FollowSocialProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Titre du bloc (`null` pour le masquer). @default 'Suivez-nous sur les réseaux sociaux' */
  title?: React.ReactNode
  /** Niveau du titre. @default 'h2' */
  titleAs?: FollowTitleProps['as']
}

/**
 * Bloc « Réseaux sociaux ». Placez les `FollowSocialLink` en enfants directs
 * (ou un tableau) : chacun est rendu dans un élément de liste.
 */
const FollowSocial = React.forwardRef<HTMLDivElement, FollowSocialProps>(
  ({ className, title, titleAs, children, ...props }, ref) => {
    const { split } = React.useContext(FollowContext)
    const items = flattenChildren(children)
    // Titre par défaut et liste seulement pour la composition 1.3 : des
    // `FollowSocialLink` en enfants, ou `title` / `titleAs` explicites. Toute autre
    // composition (1.2 : titre et boutons fournis en enfants) est rendue telle quelle.
    const isLinkList =
      title !== undefined ||
      titleAs !== undefined ||
      (items.length > 0 &&
        items.every(
          (child) =>
            React.isValidElement(child) &&
            (child.type as { displayName?: string }).displayName === 'FollowSocialLink'
        ))

    return (
      <div ref={ref} className={cn('w-full', split && 'md:w-4/12', className)} {...props}>
        <div
          className={cn(
            'flex h-full flex-col items-start md:justify-center',
            // Seul dans le bandeau : titre à gauche, liens à droite.
            !split && 'md:flex-row md:items-center md:justify-between md:[&>h2]:mb-0 md:[&>h3]:mb-0'
          )}
        >
          {isLinkList ? (
            <>
              {title !== null && (
                <FollowTitle as={titleAs} className="mb-3">
                  {title ?? (
                    <>
                      Suivez-nous
                      <br /> sur les réseaux sociaux
                    </>
                  )}
                </FollowTitle>
              )}
              <ul className="-mx-2 -mb-4 m-0 flex list-none flex-wrap p-0">
                {items.map((child, index) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: les clés des enfants dépliés depuis des fragments peuvent se répéter ; l'ordre des liens est fixe.
                    key={index}
                    className="inline-flex max-w-full flex-wrap"
                  >
                    {child}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    )
  }
)
FollowSocial.displayName = 'FollowSocial'

const TiktokIcon = (props: React.ComponentProps<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19.666 3C20.4 3 21 3.58 21 4.297v15.406C21 20.42 20.4 21 19.666 21H4.328C3.594 21 3 20.42 3 19.703V4.297C3 3.58 3.593 3 4.329 3Zm-5.114 2h-2.009l-.02 9.774c0 1.2-1.061 2.144-2.263 2.144-1.2 0-2.174-.972-2.174-2.171 0-1.199.974-2.17 2.174-2.17.09 0 .176.015.264.026v-2.096c-.088-.006-.175-.014-.264-.014A4.257 4.257 0 0 0 6 14.747 4.257 4.257 0 0 0 10.26 19a4.257 4.257 0 0 0 4.261-4.253V8.992a3.745 3.745 0 0 0 3.477 1.672H18v-2.33A3.739 3.739 0 0 1 14.552 5Z"
    />
  </svg>
)

const DailymotionIcon = (props: React.ComponentProps<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.634 4.734V18.84h-2.83v-1.274h-.037c-.561.932-1.552 1.398-2.974 1.398-.98 0-1.848-.233-2.607-.7a4.709 4.709 0 0 1-1.755-1.908c-.412-.806-.619-1.711-.619-2.714 0-.98.21-1.873.628-2.68a4.792 4.792 0 0 1 1.755-1.908c.753-.466 1.6-.699 2.545-.699a4.31 4.31 0 0 1 1.585.278c.472.185.917.487 1.335.905V5.379l2.974-.645Zm-5.339 6.398c-.705 0-1.299.236-1.783.708-.483.471-.725 1.066-.725 1.783 0 .752.236 1.368.707 1.845.472.478 1.066.717 1.783.717.729 0 1.335-.245 1.819-.735.483-.49.725-1.099.725-1.827a2.52 2.52 0 0 0-.322-1.255 2.352 2.352 0 0 0-.905-.905 2.579 2.579 0 0 0-1.299-.331Z"
    />
  </svg>
)

const socialNetworks = {
  bluesky: { label: 'Bluesky', Icon: RiBlueskyFillIcon },
  dailymotion: { label: 'Dailymotion', Icon: DailymotionIcon },
  facebook: { label: 'Facebook', Icon: RiFacebookCircleFillIcon },
  github: { label: 'GitHub', Icon: RiGithubFillIcon },
  instagram: { label: 'Instagram', Icon: RiInstagramFillIcon },
  linkedin: { label: 'LinkedIn', Icon: RiLinkedinBoxFillIcon },
  mastodon: { label: 'Mastodon', Icon: RiMastodonFillIcon },
  snapchat: { label: 'Snapchat', Icon: RiSnapchatFillIcon },
  telegram: { label: 'Telegram', Icon: RiTelegramFillIcon },
  threads: { label: 'Threads', Icon: RiThreadsFillIcon },
  tiktok: { label: 'TikTok', Icon: TiktokIcon },
  twitch: { label: 'Twitch', Icon: RiTwitchFillIcon },
  twitter: { label: 'Twitter', Icon: RiTwitterFillIcon },
  'twitter-x': { label: 'X (anciennement Twitter)', Icon: RiTwitterXFillIcon },
  vimeo: { label: 'Vimeo', Icon: RiVimeoFillIcon },
  youtube: { label: 'YouTube', Icon: RiYoutubeFillIcon },
} satisfies Record<string, { label: string; Icon: React.ElementType }>

export type FollowSocialNetwork = keyof typeof socialNetworks

export interface FollowSocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Réseau social : fixe l'icône et le nom accessible par défaut. */
  network: FollowSocialNetwork
  /** Adresse de la page de l'organisation sur ce réseau. */
  href: string
  /** Nom accessible du lien. Par défaut, le nom du réseau. */
  label?: string
  /** Taille du bouton : 40px (md) ou 48px (lg). @default 'md' */
  size?: 'md' | 'lg'
}

/**
 * Lien vers un réseau social : bouton icône bleu France sans fond, ouvert
 * dans une nouvelle fenêtre et annoncé comme tel.
 */
const FollowSocialLink = React.forwardRef<HTMLAnchorElement, FollowSocialLinkProps>(
  ({ className, network, label, size = 'md', title, ...props }, ref) => {
    const { label: networkLabel, Icon } = socialNetworks[network]
    const name = label ?? networkLabel

    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener external"
        title={title ?? `${name} - nouvelle fenêtre`}
        className={cn(
          'mx-2 mb-4 inline-flex shrink-0 items-center justify-center text-primary transition-colors motion-reduce:transition-none',
          'hover:bg-[var(--background-alt-blue-france-hover)] active:bg-[var(--background-alt-blue-france-active)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          size === 'lg' ? 'size-12 [&>svg]:size-8' : 'size-10 [&>svg]:size-6',
          className
        )}
        {...props}
      >
        <Icon aria-hidden="true" />
        <span className="sr-only">{name}</span>
      </a>
    )
  }
)
FollowSocialLink.displayName = 'FollowSocialLink'

export {
  Follow,
  FollowDescription,
  FollowNewsletter,
  FollowNewsletterForm,
  FollowSocial,
  FollowSocialLink,
  FollowTitle,
}
