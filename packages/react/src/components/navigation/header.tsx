'use client'

import * as React from 'react'
import { RouterAnchor } from '../../lib/router-anchor'
import { cn } from '../../lib/utils'
import { HeaderNavigationContext } from './navigation'

// ─── Internal context for mobile menu state ──────────────────────────

type HeaderContextValue = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
  mobileMenuId: string
  mobileButtonRef: React.RefObject<HTMLButtonElement>
}

const HeaderContext = React.createContext<HeaderContextValue>({
  mobileOpen: false,
  setMobileOpen: () => {},
  mobileMenuId: '',
  mobileButtonRef: { current: null },
})

// ─── Header ──────────────────────────────────────────────────────────

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  serviceTitle?: string
  serviceTagline?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

/**
 * Conteneur principal du Header DSFR.
 * Gère automatiquement le menu burger responsive.
 */
const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, children, size, ...props }, ref) => {
    const [mobileOpen, setMobileOpen] = React.useState(false)
    const mobileMenuId = React.useId()
    const mobileButtonRef = React.useRef<HTMLButtonElement>(null)

    const contextValue = React.useMemo(
      () => ({ mobileOpen, setMobileOpen, mobileMenuId, mobileButtonRef }),
      [mobileOpen, mobileMenuId]
    )

    return (
      <HeaderContext.Provider value={contextValue}>
        <header
          ref={ref}
          className={cn('w-full bg-background-elevated elevation-raised', className)}
          {...props}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.type === HeaderBody) {
              const element = child as React.ReactElement<{ size?: HeaderProps['size'] }>
              return React.cloneElement(element, {
                size: element.props.size || size,
              })
            }
            return child
          })}
        </header>
      </HeaderContext.Provider>
    )
  }
)

Header.displayName = 'Header'

// ─── HeaderBody ──────────────────────────────────────────────────────

const HeaderBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: HeaderProps['size'] }
>(({ className, size, children, ...props }, ref) => {
  const { mobileOpen, setMobileOpen, mobileMenuId, mobileButtonRef } =
    React.useContext(HeaderContext)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!mobileOpen) return

    const handleEscape = (event: KeyboardEvent) => {
      // Un menu de navigation ouvert consomme Échap en premier.
      if (event.key === 'Escape' && !event.defaultPrevented) {
        setMobileOpen(false)
        mobileButtonRef.current?.focus()
      }
    }
    const handleNavigation = (event: MouseEvent) => {
      if (
        mobileMenuRef.current?.contains(event.target as Node) &&
        (event.target as HTMLElement).closest('a')
      ) {
        setMobileOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('click', handleNavigation)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleNavigation)
    }
  }, [mobileOpen, mobileButtonRef, setMobileOpen])

  // Separate children into nav and non-nav for mobile layout
  const navChildren: React.ReactNode[] = []
  const otherChildren: React.ReactNode[] = []

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childType = child.type as React.ComponentType & { displayName?: string }
      if (childType?.displayName === 'HeaderNav') {
        navChildren.push(child)
      } else {
        otherChildren.push(child)
      }
    } else {
      otherChildren.push(child)
    }
  })

  const hasNav = navChildren.length > 0

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      {/* Top bar: brand + burger + actions */}
      <div
        className={cn('mx-auto flex items-center justify-between gap-4 py-4', {
          'max-w-screen-sm px-4 lg:px-6': size === 'sm',
          'max-w-screen-md px-4 lg:px-6': size === 'md',
          'fr-container': size === 'lg' || !size,
          'max-w-screen-xl px-4 lg:px-6': size === 'xl',
          'max-w-screen-2xl px-4 lg:px-6': size === '2xl',
          'max-w-full px-4 lg:px-6': size === 'full',
        })}
      >
        {otherChildren}
        {/* Burger button — mobile only, shown when there is a HeaderNav */}
        {hasNav && (
          <button
            ref={mobileButtonRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={cn(
              'lg:hidden min-h-10 min-w-10 p-2 text-foreground order-last',
              'hover:bg-background-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Nav area — desktop inline, mobile collapsible below */}
      {hasNav && (
        <div
          ref={mobileMenuRef}
          id={mobileMenuId}
          className={cn(
            'border-t border-border lg:border-t-0 lg:shadow-[0_1px_0_0_var(--border-default-grey),0_-1px_0_0_var(--border-default-grey)]',
            mobileOpen ? 'block' : 'hidden lg:block'
          )}
        >
          <div
            className={cn('mx-auto', {
              'max-w-screen-sm px-4 lg:px-6': size === 'sm',
              'max-w-screen-md px-4 lg:px-6': size === 'md',
              'fr-container': size === 'lg' || !size,
              'max-w-screen-xl px-4 lg:px-6': size === 'xl',
              'max-w-screen-2xl px-4 lg:px-6': size === '2xl',
              'max-w-full px-4 lg:px-6': size === 'full',
            })}
          >
            <HeaderNavigationContext.Provider value={true}>
              {navChildren}
            </HeaderNavigationContext.Provider>
          </div>
        </div>
      )}
    </div>
  )
})

HeaderBody.displayName = 'HeaderBody'

// ─── HeaderBrand ─────────────────────────────────────────────────────

export interface HeaderBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode
  serviceTitle?: string
  serviceTagline?: string
  href?: string
}

const HeaderBrand = React.forwardRef<HTMLDivElement, HeaderBrandProps>(
  ({ className, logo, serviceTitle, serviceTagline, href = '/', ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-4', className)} {...props}>
      {logo && (
        <RouterAnchor
          href={href}
          className="flex-shrink-0 p-2 hover:bg-background-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {logo}
        </RouterAnchor>
      )}
      {(serviceTitle || serviceTagline) && (
        <div className="flex flex-col">
          {serviceTitle && (
            <RouterAnchor
              href={href}
              className="text-lg font-bold text-foreground hover:text-primary"
            >
              {serviceTitle}
            </RouterAnchor>
          )}
          {serviceTagline && (
            <span className="text-sm text-foreground-muted hidden sm:inline">{serviceTagline}</span>
          )}
        </div>
      )}
    </div>
  )
)

HeaderBrand.displayName = 'HeaderBrand'

// ─── HeaderNav ───────────────────────────────────────────────────────

/**
 * Zone de navigation principale du Header.
 * À partir de `lg` : affichée en ligne. En dessous : rendue dans le panneau
 * ouvert par le bouton burger du Header (point de rupture du DSFR).
 * Accepte des `NavLink`, des entrées de `Navigation` ou une `Navigation` complète
 * (menus et méga-menus).
 */
const HeaderNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    const childArray = React.Children.toArray(children)
    const hasNavigation = childArray.some(
      (child) =>
        React.isValidElement(child) &&
        (child.type as { displayName?: string }).displayName === 'Navigation'
    )

    // Une `Navigation` porte déjà son landmark `<nav>` et sa liste : pas de double enveloppe.
    if (hasNavigation) {
      return <>{children}</>
    }

    return (
      <nav
        ref={ref}
        aria-label="Navigation principale"
        className={cn('relative w-full', className)}
        {...props}
      >
        <ul className="flex flex-col lg:flex-row items-stretch lg:items-center gap-0 m-0 p-0 list-none">
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return child

            const childType = child.type as React.ComponentType & { displayName?: string }
            const isNavLink = childType?.displayName === 'NavLink' || childType?.name === 'NavLink'

            const childProps = child.props as Record<string, unknown>
            const patched =
              isNavLink && childProps.variant === undefined
                ? React.cloneElement(child as React.ReactElement<{ variant?: string }>, {
                    variant: 'header',
                  })
                : child

            // Les entrées de Navigation (lien, menu, méga-menu) rendent déjà leur `<li>`.
            const isNavigationEntry = [
              'NavigationItem',
              'NavigationSection',
              'NavigationMenu',
              'NavigationMegaMenu',
            ].includes(childType?.displayName ?? '')

            if (isNavigationEntry) return patched

            return <li className="list-none">{patched}</li>
          })}
        </ul>
      </nav>
    )
  }
)

HeaderNav.displayName = 'HeaderNav'

// ─── HeaderActions ───────────────────────────────────────────────────

const HeaderActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
  )
)

HeaderActions.displayName = 'HeaderActions'

// ─── HeaderMenuButton (kept for backward compatibility) ──────────────

export interface HeaderMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean
  onToggle?: () => void
}

const HeaderMenuButton = React.forwardRef<HTMLButtonElement, HeaderMenuButtonProps>(
  ({ className, isOpen, onToggle, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      className={cn(
        'lg:hidden min-h-10 min-w-10 p-2 text-foreground',
        'hover:bg-background-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      )}
    </button>
  )
)

HeaderMenuButton.displayName = 'HeaderMenuButton'

export { Header, HeaderActions, HeaderBody, HeaderBrand, HeaderMenuButton, HeaderNav }
