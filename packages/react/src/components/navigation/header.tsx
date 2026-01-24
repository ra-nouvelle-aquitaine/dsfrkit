'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

// ─── Internal context for mobile menu state ──────────────────────────

type HeaderContextValue = {
  mobileOpen: boolean
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HeaderContext = React.createContext<HeaderContextValue>({
  mobileOpen: false,
  setMobileOpen: () => {},
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

    const contextValue = React.useMemo(() => ({ mobileOpen, setMobileOpen }), [mobileOpen])

    return (
      <HeaderContext.Provider value={contextValue}>
        <header
          ref={ref}
          className={cn('w-full bg-background-elevated border-b border-border', className)}
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
  const { mobileOpen, setMobileOpen } = React.useContext(HeaderContext)

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
        className={cn('mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 py-4', {
          'max-w-screen-sm': size === 'sm',
          'max-w-screen-md': size === 'md',
          'fr-container': size === 'lg' || !size,
          'max-w-screen-xl': size === 'xl',
          'max-w-screen-2xl': size === '2xl',
          'max-w-full': size === 'full',
        })}
      >
        {otherChildren}
        {/* Burger button — mobile only, shown when there is a HeaderNav */}
        {hasNav && (
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="header-mobile-menu"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className={cn(
              'md:hidden p-2 rounded-md text-foreground order-last',
              'hover:bg-background-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
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
          id="header-mobile-menu"
          className={cn(
            'border-t border-border md:border-t-0 md:shadow-[0_1px_0_0_var(--border-default-grey),0_-1px_0_0_var(--border-default-grey)]',
            mobileOpen ? 'block' : 'hidden md:block'
          )}
        >
          <div
            className={cn('mx-auto px-4 sm:px-6 lg:px-8', {
              'max-w-screen-sm': size === 'sm',
              'max-w-screen-md': size === 'md',
              'fr-container': size === 'lg' || !size,
              'max-w-screen-xl': size === 'xl',
              'max-w-screen-2xl': size === '2xl',
              'max-w-full': size === 'full',
            })}
          >
            {navChildren}
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
        <a
          href={href}
          className="flex-shrink-0 rounded-md p-2 hover:bg-background-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {logo}
        </a>
      )}
      {(serviceTitle || serviceTagline) && (
        <div className="flex flex-col">
          {serviceTitle && (
            <a href={href} className="text-lg font-bold text-foreground hover:text-primary">
              {serviceTitle}
            </a>
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
 * Sur desktop : affichée inline en flex-row.
 * Sur mobile : rendue dans le panneau burger géré par Header.
 */
const HeaderNav = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Navigation principale"
        className={cn('w-full', className)}
        {...props}
      >
        <ul className="flex flex-col md:flex-row items-stretch md:items-center gap-0 m-0 p-0 list-none">
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

            // If child is a Navigation component, render it directly without wrapping in <li>
            const isNavigation =
              childType?.displayName === 'Navigation' ||
              childType?.displayName === 'NavigationItem' ||
              childType?.displayName === 'NavigationSection'

            if (isNavigation) return patched

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
      aria-controls="mobile-menu"
      aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
      className={cn(
        'md:hidden p-2 rounded-md text-foreground',
        'hover:bg-background-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
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
