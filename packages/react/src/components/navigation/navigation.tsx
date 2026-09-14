'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

/**
 * Composant Navigation DSFR
 * Prend en charge la navigation principale horizontale (Header) et verticale (SideMenu).
 *
 * Navigation principale (`fr-nav`) :
 * - `NavigationItem` : lien direct (`fr-nav__link`) ;
 * - `NavigationMenu` : bouton qui déroule une liste de liens (`fr-nav__btn` + `fr-menu`) ;
 * - `NavigationMegaMenu` : bouton qui ouvre un panneau pleine largeur avec bouton
 *   « Fermer », accroche éditoriale et catégories de liens (`fr-mega-menu`).
 *
 * Un seul menu est ouvert à la fois. Il se ferme avec Échap (le focus revient sur
 * son bouton), au clic en dehors de la navigation, quand le focus la quitte ou
 * quand un de ses liens est activé. Sous le point de rupture `lg`, les entrées
 * s'empilent et les menus se déroulent sous leur bouton, comme dans le DSFR.
 *
 * Référence visuelle :
 * - SideMenu : https://www.systeme-de-design.gouv.fr/v1.15/storybook/?path=/docs/sidemenu--docs
 * - Navigation : https://www.systeme-de-design.gouv.fr/v1.15/storybook/?path=/docs/navigation--docs
 */

type NavigationContextValue = {
  orientation: 'horizontal' | 'vertical'
  depth: number
  /** Identifiant du menu ouvert (navigation horizontale). */
  openMenu: string | null
  setOpenMenu: (id: string | null) => void
  /** Type de panneau dans lequel se trouve l'élément. */
  panel: 'menu' | 'mega-menu' | null
  /** Vrai sous une `Navigation`, qui coordonne l'ouverture des menus. */
  hasRoot: boolean
}

const NavigationContext = React.createContext<NavigationContextValue>({
  orientation: 'horizontal',
  depth: 0,
  openMenu: null,
  setOpenMenu: () => {},
  panel: null,
  hasRoot: false,
})

/**
 * Indique que la navigation est rendue dans le panneau du `Header`, qui gère
 * déjà l'ouverture sur mobile : la navigation n'affiche pas son propre bouton.
 */
export const HeaderNavigationContext = React.createContext(false)

// ─── Styles partagés (navigation horizontale) ────────────────────────

/** `fr-nav__item` : filets entre les entrées sur mobile, alignement en ligne à partir de lg. */
const navItemClasses = cn(
  'relative flex list-none flex-col items-stretch',
  '[&:not(:last-child)]:shadow-[inset_0_-1px_0_0_var(--border-default-grey)]',
  'lg:static lg:items-start lg:[&:not(:last-child)]:shadow-none'
)

/** `fr-nav__link` / `fr-nav__btn` de premier niveau. */
const navTopLinkClasses = cn(
  'relative flex h-full w-full items-center justify-between px-4 py-3 text-left no-underline',
  'text-base font-bold leading-6 text-[var(--text-action-high-grey)]',
  'cursor-pointer bg-transparent transition-colors motion-reduce:transition-none',
  'hover:bg-background-hover active:bg-background-active',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
  'lg:min-h-14 lg:w-auto lg:p-4 lg:text-sm lg:font-normal',
  // Page ou rubrique courante : texte bleu et trait (vertical sur mobile, souligné à partir de lg).
  'data-[active=true]:text-[var(--text-active-blue-france)]',
  "data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-1/2 data-[active=true]:before:-mt-3 data-[active=true]:before:h-6 data-[active=true]:before:w-0.5 data-[active=true]:before:bg-[var(--background-active-blue-france)] data-[active=true]:before:content-['']",
  'lg:data-[active=true]:before:bottom-0 lg:data-[active=true]:before:top-auto lg:data-[active=true]:before:mt-0 lg:data-[active=true]:before:h-0.5 lg:data-[active=true]:before:w-full'
)

/** Bouton d'ouverture : fond bleu clair une fois ouvert (`fr-nav__btn[aria-expanded=true]`). */
const navButtonClasses = cn(
  'lg:justify-start',
  'aria-expanded:bg-background-open-blue-france aria-expanded:text-primary',
  'aria-expanded:hover:bg-background-open-blue-france-hover aria-expanded:active:bg-background-open-blue-france-active'
)

/** Liens dans un menu ou un méga-menu : graisse normale, trait vertical pour la page courante. */
const navPanelLinkClasses = cn(
  'relative flex w-full items-center px-4 py-3 text-left no-underline',
  'text-base font-normal leading-6 text-[var(--text-action-high-grey)] lg:text-sm',
  'transition-colors motion-reduce:transition-none',
  'hover:bg-background-hover active:bg-background-active lg:hover:bg-background-overlap-hover',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
  'data-[active=true]:text-[var(--text-active-blue-france)]',
  "data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:top-1/2 data-[active=true]:before:-mt-3 data-[active=true]:before:h-6 data-[active=true]:before:w-0.5 data-[active=true]:before:bg-[var(--background-active-blue-france)] data-[active=true]:before:content-['']"
)

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(
        'ml-2 size-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none',
        '[[aria-expanded=true]>&]:-rotate-180',
        className
      )}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
      />
    </svg>
  )
}

// ─── Navigation (Root) ───────────────────────────────────────────────

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical'
  title?: string
  'aria-label'?: string
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  (
    {
      className,
      orientation = 'horizontal',
      title,
      'aria-label': ariaLabel,
      children,
      onBlur,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === 'vertical'
    const inHeader = React.useContext(HeaderNavigationContext)
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const [openMenu, setOpenMenu] = React.useState<string | null>(null)
    const mobileContentId = React.useId()
    const mobileButtonRef = React.useRef<HTMLButtonElement>(null)
    const navRef = React.useRef<HTMLElement | null>(null)

    const setRefs = React.useCallback(
      (node: HTMLElement | null) => {
        navRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      },
      [ref]
    )

    React.useEffect(() => {
      if (!mobileOpen) return

      const handleEscape = (event: KeyboardEvent) => {
        // Échap ferme d'abord le menu ouvert, puis le panneau mobile.
        if (event.key === 'Escape' && !event.defaultPrevented) {
          setMobileOpen(false)
          mobileButtonRef.current?.focus()
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [mobileOpen])

    React.useEffect(() => {
      if (!openMenu) return

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Escape') return
        // Échap referme d'abord le menu : les panneaux parents (Header) ignorent l'événement consommé.
        event.preventDefault()
        setOpenMenu(null)
        document.getElementById(`${openMenu}-button`)?.focus()
      }
      const handlePointerDown = (event: PointerEvent) => {
        if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null)
      }

      // Phase de capture : le menu traite Échap avant les écouteurs du Header.
      document.addEventListener('keydown', handleKeyDown, true)
      document.addEventListener('pointerdown', handlePointerDown)
      return () => {
        document.removeEventListener('keydown', handleKeyDown, true)
        document.removeEventListener('pointerdown', handlePointerDown)
      }
    }, [openMenu])

    const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
      onBlur?.(event)
      // Le focus part vers un élément hors de la navigation : on referme le menu.
      // (`relatedTarget` est nul lors d'un clic sur une zone non focalisable du panneau.)
      const next = event.relatedTarget as Node | null
      if (openMenu && next && !event.currentTarget.contains(next)) setOpenMenu(null)
    }

    const contextValue = React.useMemo(
      () => ({ orientation, depth: 0, openMenu, setOpenMenu, panel: null, hasRoot: true }),
      [orientation, openMenu]
    )

    return (
      <NavigationContext.Provider value={contextValue}>
        <nav
          ref={setRefs}
          // Menu principal de l'en-tête : cible du lien d'évitement « Aller à la navigation ».
          id={inHeader && !isVertical ? 'main-navigation' : undefined}
          aria-label={ariaLabel || (isVertical ? 'Menu latéral' : 'Menu principal')}
          data-orientation={orientation}
          className={cn(
            'w-full',
            !isVertical && 'relative',
            !isVertical &&
              !inHeader &&
              'lg:shadow-[inset_0_1px_0_0_var(--border-default-grey),inset_0_-1px_0_0_var(--border-default-grey)]',
            className
          )}
          onBlur={handleBlur}
          {...props}
        >
          {isVertical ? (
            <div className="w-full">
              {/* Mobile toggle (hidden on md+) */}
              {title && (
                <button
                  ref={mobileButtonRef}
                  type="button"
                  className="md:hidden flex items-center justify-between w-full px-4 py-3 text-base font-bold text-foreground"
                  aria-expanded={mobileOpen}
                  aria-controls={mobileContentId}
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  {title}
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
                    className={cn(
                      'transition-transform duration-200 motion-reduce:transition-none',
                      mobileOpen && 'rotate-180'
                    )}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              )}

              {/* Content: always visible on md+, toggle on mobile */}
              <div
                id={mobileContentId}
                className={cn('w-full', title && !mobileOpen ? 'hidden md:block' : 'block')}
              >
                {/* Title (desktop) */}
                {title && (
                  <p className="hidden md:block px-4 py-3 text-lg font-bold text-foreground-title">
                    {title}
                  </p>
                )}
                <ul className="m-0 p-0 list-none">{children}</ul>
              </div>
            </div>
          ) : (
            <div className="w-full">
              {/* Bouton d'ouverture sur mobile, sauf dans le Header qui a déjà le sien */}
              {!inHeader && (
                <button
                  ref={mobileButtonRef}
                  type="button"
                  className="lg:hidden flex items-center gap-2 px-4 py-4 w-full text-base font-medium text-primary hover:bg-background-alt"
                  aria-expanded={mobileOpen}
                  aria-controls={mobileContentId}
                  onClick={() => setMobileOpen(!mobileOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {mobileOpen ? (
                      <path d="M18 6 6 18M6 6l12 12" />
                    ) : (
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                  <span className="flex-1 text-left">{title || 'Menu'}</span>
                </button>
              )}

              <ul
                id={mobileContentId}
                className={cn(
                  'm-0 list-none flex-col p-0 lg:flex-row lg:flex-nowrap',
                  // De 2 à 4 entrées, le DSFR les espace de 1.25rem.
                  'lg:[&>*:first-child:nth-last-child(-n+4)~*]:ml-5',
                  inHeader || mobileOpen ? 'flex' : 'hidden lg:flex',
                  mobileOpen && !inHeader && 'border-t border-border lg:border-t-0'
                )}
              >
                {children}
              </ul>
            </div>
          )}
        </nav>
      </NavigationContext.Provider>
    )
  }
)
Navigation.displayName = 'Navigation'

// ─── Menu déroulant (fr-menu) ────────────────────────────────────────

export interface NavigationMenuProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Intitulé du bouton d'ouverture. */
  title: React.ReactNode
  /** La page courante appartient à ce menu (`aria-current` sur le bouton). */
  isActive?: boolean
}

function useMenuState() {
  const rootContext = React.useContext(NavigationContext)
  const id = React.useId()
  // Hors d'une `Navigation` (ex. entrée posée seule dans `HeaderNav`), le menu gère son propre état.
  const [localOpenMenu, setLocalOpenMenu] = React.useState<string | null>(null)
  const context = React.useMemo(
    () =>
      rootContext.hasRoot
        ? rootContext
        : { ...rootContext, openMenu: localOpenMenu, setOpenMenu: setLocalOpenMenu },
    [rootContext, localOpenMenu]
  )
  const open = context.openMenu === id

  return {
    context,
    id,
    open,
    toggle: () => context.setOpenMenu(open ? null : id),
    close: () => context.setOpenMenu(null),
  }
}

/**
 * Entrée de navigation qui déroule une liste de liens (`fr-menu`).
 * Placez des `NavigationItem` en enfants.
 */
const NavigationMenu = React.forwardRef<HTMLLIElement, NavigationMenuProps>(
  ({ className, title, isActive, children, ...props }, ref) => {
    const { context, id, open, toggle } = useMenuState()
    const panelContext = React.useMemo(() => ({ ...context, panel: 'menu' as const }), [context])

    return (
      <li ref={ref} className={cn(navItemClasses, className)} {...props}>
        <button
          id={`${id}-button`}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          aria-current={isActive ? 'true' : undefined}
          data-active={isActive || undefined}
          onClick={toggle}
          className={cn(navTopLinkClasses, navButtonClasses)}
        >
          {title}
          <ChevronIcon />
        </button>
        <div
          id={`${id}-panel`}
          hidden={!open}
          className={cn(
            '-mx-4 -my-1 px-4 py-1',
            'lg:pointer-events-none lg:absolute lg:top-full lg:z-[1000] lg:m-0 lg:p-0',
            'lg:[filter:drop-shadow(var(--overlap-shadow))]'
          )}
        >
          <ul
            className={cn(
              'm-0 list-none px-4 pb-4',
              'lg:pointer-events-auto lg:mb-8 lg:w-80 lg:p-0',
              // Fond « overlap » avec le filet bleu de 1px en haut du panneau.
              'lg:bg-background-overlap lg:bg-[linear-gradient(0deg,var(--background-open-blue-france),var(--background-open-blue-france))] lg:bg-[length:100%_1px] lg:bg-no-repeat',
              // Filets gris entre les liens, en retrait de 1rem.
              'lg:[&>li:not(:first-child)>a]:shadow-[0_calc(-1rem-1px)_0_-1rem_var(--border-default-grey)]'
            )}
          >
            <NavigationContext.Provider value={panelContext}>{children}</NavigationContext.Provider>
          </ul>
        </div>
      </li>
    )
  }
)
NavigationMenu.displayName = 'NavigationMenu'

// ─── Méga-menu (fr-mega-menu) ────────────────────────────────────────

export interface NavigationMegaMenuLeader {
  /** Titre éditorialisé de la rubrique. */
  title: React.ReactNode
  /** Niveau du titre. @default 'h4' */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  /** Texte d'accroche. */
  description?: React.ReactNode
  /** Lien vers la rubrique, ex. « Voir toute la rubrique ». */
  link?: { label: React.ReactNode; href: string }
}

export interface NavigationMegaMenuProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Intitulé du bouton d'ouverture. */
  title: React.ReactNode
  /** La page courante appartient à ce méga-menu. */
  isActive?: boolean
  /** Accroche éditoriale affichée au-dessus des catégories. */
  leader?: NavigationMegaMenuLeader
  /** Libellé du bouton de fermeture. @default 'Fermer' */
  closeLabel?: string
}

/**
 * Entrée de navigation qui ouvre un méga-menu : panneau pleine largeur avec
 * bouton « Fermer », accroche facultative et `NavigationMegaMenuCategory`.
 */
const NavigationMegaMenu = React.forwardRef<HTMLLIElement, NavigationMegaMenuProps>(
  ({ className, title, isActive, leader, closeLabel = 'Fermer', children, ...props }, ref) => {
    const { context, id, open, toggle, close } = useMenuState()
    const panelContext = React.useMemo(
      () => ({ ...context, panel: 'mega-menu' as const }),
      [context]
    )
    const LeaderTitle = leader?.titleAs ?? 'h4'

    const handleClose = () => {
      close()
      document.getElementById(`${id}-button`)?.focus()
    }

    return (
      <li ref={ref} className={cn(navItemClasses, className)} {...props}>
        <button
          id={`${id}-button`}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          aria-current={isActive ? 'true' : undefined}
          data-active={isActive || undefined}
          onClick={toggle}
          className={cn(navTopLinkClasses, navButtonClasses)}
        >
          {title}
          <ChevronIcon />
        </button>
        <div
          id={`${id}-panel`}
          hidden={!open}
          tabIndex={-1}
          className={cn(
            'outline-none',
            'lg:absolute lg:inset-x-0 lg:top-full lg:z-[1000] lg:bg-background-overlap lg:pb-6',
            'lg:[filter:drop-shadow(var(--overlap-shadow))]',
            "lg:before:absolute lg:before:inset-x-0 lg:before:top-0 lg:before:h-px lg:before:bg-[var(--border-open-blue-france)] lg:before:content-['']"
          )}
        >
          <div className="px-4 pt-2 lg:px-6 lg:pt-4">
            <div className="hidden lg:flex lg:justify-end">
              <button
                type="button"
                aria-controls={`${id}-panel`}
                title={closeLabel}
                onClick={handleClose}
                className={cn(
                  'inline-flex min-h-8 items-center gap-2 px-3 py-1 text-sm font-medium leading-6 text-primary',
                  'transition-colors motion-reduce:transition-none hover:bg-background-overlap-hover active:bg-background-active',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
              >
                {closeLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="m12 10.6 4.95-4.96 1.4 1.4L13.42 12l4.96 4.95-1.4 1.4L12 13.42l-4.95 4.96-1.4-1.4L10.58 12 5.63 7.05l1.4-1.4z"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
              {leader && (
                <div className="pb-4 pt-2 lg:col-span-12 lg:mb-6 lg:w-8/12 lg:p-0">
                  <LeaderTitle className="m-0 mb-2 text-[1.375rem] font-bold leading-7 text-foreground-title lg:text-2xl lg:leading-8">
                    {leader.title}
                  </LeaderTitle>
                  {leader.description && (
                    <p className="m-0 mb-2 text-sm leading-6 text-foreground">
                      {leader.description}
                    </p>
                  )}
                  {leader.link && (
                    <RouterAnchor
                      href={leader.link.href}
                      onClick={close}
                      className="inline-flex items-center gap-1 text-sm leading-6 text-primary underline underline-offset-2 hover:decoration-2"
                    >
                      {leader.link.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                        />
                      </svg>
                    </RouterAnchor>
                  )}
                </div>
              )}
              <NavigationContext.Provider value={panelContext}>
                {children}
              </NavigationContext.Provider>
            </div>
          </div>
        </div>
      </li>
    )
  }
)
NavigationMegaMenu.displayName = 'NavigationMegaMenu'

export interface NavigationMegaMenuCategoryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nom de la catégorie. */
  title: React.ReactNode
  /** Lien de la catégorie. Sans lien, le nom est affiché en texte. */
  href?: string
  /** Niveau du titre de catégorie. @default 'h5' */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

/**
 * Colonne de liens d'un méga-menu (`fr-mega-menu__category` + `fr-mega-menu__list`).
 */
const NavigationMegaMenuCategory = React.forwardRef<
  HTMLDivElement,
  NavigationMegaMenuCategoryProps
>(({ className, title, href, titleAs: Title = 'h5', children, ...props }, ref) => {
  const { setOpenMenu } = React.useContext(NavigationContext)

  return (
    <div ref={ref} className={cn('lg:col-span-3', className)} {...props}>
      <Title className="m-0 text-base leading-6 lg:text-sm lg:shadow-[0_calc(1rem+1px)_0_-1rem_var(--border-default-grey)]">
        {href ? (
          <RouterAnchor
            href={href}
            onClick={() => setOpenMenu(null)}
            className={cn(navPanelLinkClasses, 'font-bold')}
          >
            {title}
          </RouterAnchor>
        ) : (
          <span className="flex w-full px-4 py-3 font-bold text-foreground-title">{title}</span>
        )}
      </Title>
      <ul className="relative m-0 list-none p-0 pb-4 shadow-[0_1px_0_0_var(--border-default-grey)] lg:shadow-none">
        {children}
      </ul>
    </div>
  )
})
NavigationMegaMenuCategory.displayName = 'NavigationMegaMenuCategory'

// ─── NavigationSection (Collapsible group) ───────────────────────────

export interface NavigationSectionProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string
  defaultOpen?: boolean
  isActive?: boolean
  /**
   * Si faux, la section est toujours ouverte et n'a pas de chevron de repli.
   * @default true
   */
  collapsible?: boolean
}

/**
 * Groupe de liens. En orientation verticale (menu latéral), section repliable ;
 * en orientation horizontale, équivalent de `NavigationMenu`.
 */
const NavigationSection = React.forwardRef<HTMLLIElement, NavigationSectionProps>(
  (
    { className, title, defaultOpen = false, isActive, collapsible = true, children, ...props },
    ref
  ) => {
    const navigationContext = React.useContext(NavigationContext)
    const { orientation, depth } = navigationContext
    const isVertical = orientation === 'vertical'

    if (!isVertical) {
      return (
        <NavigationMenu
          ref={ref}
          title={title}
          isActive={isActive}
          className={className}
          {...props}
        >
          {children}
        </NavigationMenu>
      )
    }

    const sectionClasses = cn(
      'py-3 text-base font-bold text-foreground-title',
      collapsible && 'hover:bg-background-alt',
      depth === 0 ? 'px-4' : 'pl-8 pr-4',
      isActive
        ? 'border-l-[3px] border-primary text-primary bg-background-alt'
        : 'border-l-[3px] border-transparent'
    )

    const content = (
      <ul className="m-0 p-0 list-none">
        <NavigationContext.Provider value={{ ...navigationContext, depth: depth + 1 }}>
          {children}
        </NavigationContext.Provider>
      </ul>
    )

    if (!collapsible) {
      return (
        <li ref={ref} className={cn('relative list-none', className)} {...props}>
          <div className={cn('flex items-center w-full', sectionClasses)}>{title}</div>
          <div>{content}</div>
        </li>
      )
    }

    return (
      <li ref={ref} className={cn('relative list-none', className)} {...props}>
        <CollapsiblePrimitive.Root defaultOpen={defaultOpen}>
          <CollapsiblePrimitive.Trigger
            className={cn(
              'flex items-center justify-between w-full cursor-pointer transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
              sectionClasses
            )}
          >
            {title}
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
              className="shrink-0 ml-3 transition-transform duration-200 motion-reduce:transition-none [[data-state=open]>&]:rotate-180"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </CollapsiblePrimitive.Trigger>

          <CollapsiblePrimitive.Content className="overflow-hidden">
            {content}
          </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
      </li>
    )
  }
)
NavigationSection.displayName = 'NavigationSection'

// ─── NavigationItem (Link) ───────────────────────────────────────────

export interface NavigationItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  /**
   * L'icône à afficher dans l'élément (ex: `<RemixIcon />`)
   */
  icon?: React.ReactNode
  /**
   * La position de l'icône ('start' ou 'end'). Par défaut: 'start'
   */
  iconPosition?: 'start' | 'end'
}

const NavigationItem = React.forwardRef<HTMLAnchorElement, NavigationItemProps>(
  (
    { className, isActive, href, children, icon, iconPosition = 'start', onClick, ...props },
    ref
  ) => {
    const { orientation, depth, panel, setOpenMenu } = React.useContext(NavigationContext)
    const isVertical = orientation === 'vertical'

    const content = (
      <>
        {icon && iconPosition === 'start' && (
          <span className="flex-shrink-0 flex items-center justify-center" aria-hidden="true">
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'end' && (
          <span className="flex-shrink-0 flex items-center justify-center" aria-hidden="true">
            {icon}
          </span>
        )}
      </>
    )

    if (isVertical) {
      return (
        <li className="list-none flex">
          <RouterAnchor
            ref={ref}
            href={href}
            aria-current={isActive ? 'page' : undefined}
            onClick={onClick}
            className={cn(
              'flex items-center gap-2 w-full h-full transition-colors no-underline',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
              'py-3 text-base text-foreground',
              'hover:bg-background-alt',
              // Indentation based on depth
              depth === 0 ? 'px-4' : 'pl-8 pr-4',
              // Active: left blue border + blue text + contrast bg
              isActive
                ? 'border-l-[3px] border-primary text-primary font-bold bg-background-alt'
                : 'border-l-[3px] border-transparent',
              className
            )}
            {...props}
          >
            {content}
          </RouterAnchor>
        </li>
      )
    }

    const inPanel = panel !== null

    return (
      <li className={inPanel ? 'list-none' : navItemClasses}>
        <RouterAnchor
          ref={ref}
          href={href}
          aria-current={isActive ? 'page' : undefined}
          data-active={isActive || undefined}
          onClick={(event) => {
            onClick?.(event)
            // Activer un lien d'un menu referme ce menu.
            if (inPanel) setOpenMenu(null)
          }}
          className={cn(
            inPanel ? navPanelLinkClasses : navTopLinkClasses,
            icon && 'justify-start gap-2',
            className
          )}
          {...props}
        >
          {content}
        </RouterAnchor>
      </li>
    )
  }
)
NavigationItem.displayName = 'NavigationItem'

export {
  Navigation,
  NavigationItem,
  NavigationMegaMenu,
  NavigationMegaMenuCategory,
  NavigationMenu,
  NavigationSection,
}

/**
 * @example
 * ```tsx
 * <Navigation aria-label="Menu principal">
 *   <NavigationItem href="/" isActive>Accueil</NavigationItem>
 *   <NavigationMenu title="Démarches">
 *     <NavigationItem href="/demarches/identite">Carte d'identité</NavigationItem>
 *     <NavigationItem href="/demarches/passeport">Passeport</NavigationItem>
 *   </NavigationMenu>
 *   <NavigationMegaMenu
 *     title="Thématiques"
 *     leader={{
 *       title: 'Toutes les thématiques',
 *       description: 'Retrouvez les démarches classées par thème.',
 *       link: { label: 'Voir toute la rubrique', href: '/thematiques' },
 *     }}
 *   >
 *     <NavigationMegaMenuCategory title="Famille" href="/famille">
 *       <NavigationItem href="/famille/naissance">Naissance</NavigationItem>
 *     </NavigationMegaMenuCategory>
 *   </NavigationMegaMenu>
 * </Navigation>
 * ```
 */
