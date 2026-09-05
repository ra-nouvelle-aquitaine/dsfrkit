'use client'

import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'

/**
 * Composant Navigation DSFR
 * Prend en charge la navigation principale horizontale (Header) et verticale (SideMenu).
 *
 * Référence visuelle :
 * - SideMenu : https://www.systeme-de-design.gouv.fr/v1.14/storybook/?path=/docs/sidemenu--docs
 * - Navigation : https://www.systeme-de-design.gouv.fr/v1.14/storybook/?path=/docs/navigation--docs
 */

type NavigationContextValue = {
  orientation: 'horizontal' | 'vertical'
  depth: number
}

const NavigationContext = React.createContext<NavigationContextValue>({
  orientation: 'horizontal',
  depth: 0,
})

// ─── Navigation (Root) ───────────────────────────────────────────────

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical'
  title?: string
  'aria-label'?: string
}

const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  (
    { className, orientation = 'horizontal', title, 'aria-label': ariaLabel, children, ...props },
    ref
  ) => {
    const isVertical = orientation === 'vertical'
    const [mobileOpen, setMobileOpen] = React.useState(false)

    const contextValue = React.useMemo(() => ({ orientation, depth: 0 }), [orientation])

    return (
      <NavigationContext.Provider value={contextValue}>
        <nav
          ref={ref}
          aria-label={ariaLabel || (isVertical ? 'Menu latéral' : 'Menu principal')}
          data-orientation={orientation}
          className={cn(
            isVertical
              ? // SideMenu: transparent bg, border-left indicator zone, full width
                'w-full'
              : // Horizontal nav: items in a row, border-bottom on bar
                'w-full border-b border-border',
            className
          )}
          {...props}
        >
          {isVertical ? (
            <div className="w-full">
              {/* Mobile toggle (hidden on md+) */}
              {title && (
                <button
                  type="button"
                  className="md:hidden flex items-center justify-between w-full px-4 py-3 text-base font-bold text-foreground"
                  aria-expanded={mobileOpen}
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
                    className={cn('transition-transform duration-200', mobileOpen && 'rotate-180')}
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              )}

              {/* Content: always visible on md+, toggle on mobile */}
              <div className={cn('w-full', title && !mobileOpen ? 'hidden md:block' : 'block')}>
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
            /* Horizontal: flex row on desktop, toggleable column on mobile */
            <div className="w-full">
              {/* Horizontal Mobile Toggle */}
              <button
                type="button"
                className="md:hidden flex items-center gap-2 px-4 py-4 w-full text-base font-medium text-primary hover:bg-background-alt"
                aria-expanded={mobileOpen}
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

              <ul
                className={cn(
                  'flex flex-col md:flex-row items-stretch m-0 p-0 list-none',
                  mobileOpen ? 'flex border-t border-border' : 'hidden md:flex'
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

const NavigationSection = React.forwardRef<HTMLLIElement, NavigationSectionProps>(
  (
    { className, title, defaultOpen = false, isActive, collapsible = true, children, ...props },
    ref
  ) => {
    const { orientation, depth } = React.useContext(NavigationContext)
    const isVertical = orientation === 'vertical'

    const sectionClasses = cn(
      isVertical
        ? cn(
            'py-3 text-base font-bold text-foreground-title',
            collapsible && 'hover:bg-background-alt',
            depth === 0 ? 'px-4' : 'pl-8 pr-4',
            isActive
              ? 'border-l-[3px] border-primary text-primary bg-background-alt'
              : 'border-l-[3px] border-transparent'
          )
        : cn(
            'px-4 py-4 text-base font-medium text-foreground',
            collapsible && 'hover:bg-background-alt',
            isActive &&
              'text-primary [box-shadow:inset_0_-2px_0_0_var(--border-active-blue-france)]'
          )
    )

    const content = (
      <ul className="m-0 p-0 list-none">
        <NavigationContext.Provider value={{ orientation, depth: depth + 1 }}>
          {children}
        </NavigationContext.Provider>
      </ul>
    )

    if (!collapsible) {
      return (
        <li ref={ref} className={cn('list-none', className)} {...props}>
          <div className={cn('flex items-center w-full', sectionClasses)}>{title}</div>
          <div
            className={cn(
              isVertical
                ? ''
                : 'md:absolute md:top-full md:left-0 md:z-50 md:min-w-[12rem] md:bg-background md:shadow-lg md:border md:border-border md:py-1'
            )}
          >
            {content}
          </div>
        </li>
      )
    }

    return (
      <li ref={ref} className={cn('list-none', className)} {...props}>
        <CollapsiblePrimitive.Root defaultOpen={defaultOpen}>
          <CollapsiblePrimitive.Trigger
            className={cn(
              'flex items-center justify-between w-full cursor-pointer transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
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
              className="shrink-0 ml-3 transition-transform duration-200 [[data-state=open]>&]:rotate-180"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </CollapsiblePrimitive.Trigger>

          <CollapsiblePrimitive.Content
            className={cn(
              'overflow-hidden',
              isVertical
                ? ''
                : 'md:absolute md:top-full md:left-0 md:z-50 md:min-w-[12rem] md:bg-background md:shadow-lg md:border md:border-border md:py-1'
            )}
          >
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
  ({ className, isActive, href, children, icon, iconPosition = 'start', ...props }, ref) => {
    const { orientation, depth } = React.useContext(NavigationContext)
    const isVertical = orientation === 'vertical'

    return (
      <li className="list-none flex">
        <RouterAnchor
          ref={ref}
          href={href}
          aria-current={isActive ? 'page' : undefined}
          className={cn(
            'flex items-center gap-2 w-full h-full transition-colors no-underline',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
            isVertical
              ? cn(
                  'py-3 text-base text-foreground',
                  'hover:bg-background-alt',
                  // Indentation based on depth
                  depth === 0 ? 'px-4' : 'pl-8 pr-4',
                  // Active: left blue border + blue text + contrast bg
                  isActive
                    ? 'border-l-[3px] border-primary text-primary font-bold bg-background-alt'
                    : 'border-l-[3px] border-transparent'
                )
              : cn(
                  // Horizontal link
                  depth === 0 ? 'px-4 py-4 text-base font-medium' : 'px-4 py-3 text-sm',
                  'text-foreground hover:bg-background-alt',
                  // Active: bottom underline on desktop (inset shadow, sharp edges), left border on mobile
                  isActive &&
                    depth === 0 && [
                      'text-primary font-bold',
                      // Desktop: bottom underline
                      'md:[box-shadow:inset_0_-2px_0_0_var(--border-active-blue-france)]',
                      // Mobile: left border (won't span full width like box-shadow does)
                      'border-l-[3px] border-primary md:border-l-0',
                    ],
                  isActive && depth > 0 && 'text-primary font-bold bg-background-alt'
                ),
            className
          )}
          {...props}
        >
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
        </RouterAnchor>
      </li>
    )
  }
)
NavigationItem.displayName = 'NavigationItem'

export { Navigation, NavigationItem, NavigationSection }

/**
 * @example
 * ```tsx
 * <Navigation>
 *   <NavItem href="/">Accueil</NavItem>
 *   <NavItem href="/about">À propos</NavItem>
 * </Navigation>
 * ```
 */
