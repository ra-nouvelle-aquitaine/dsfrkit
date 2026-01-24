'use client'

import * as React from 'react'

/**
 * Hook pour détecter les media queries
 *
 * @example
 * ```tsx
 * function Component() {
 *   const isMobile = useMediaQuery('(max-width: 768px)')
 *   const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
 *
 *   return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
 * }
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query)

    // Mettre à jour l'état initial côté client
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * Hook pour détecter si on est sur mobile
 */
export function useIsMobile(breakpoint = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint}px)`)
}

/**
 * Hook pour détecter si on est sur tablette
 */
export function useIsTablet(minBreakpoint = 768, maxBreakpoint = 1024): boolean {
  return useMediaQuery(`(min-width: ${minBreakpoint}px) and (max-width: ${maxBreakpoint}px)`)
}

/**
 * Hook pour détecter si on est sur desktop
 */
export function useIsDesktop(breakpoint = 1024): boolean {
  return useMediaQuery(`(min-width: ${breakpoint}px)`)
}

/**
 * Hook pour détecter la préférence de réduction de mouvement
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * Hook pour détecter la préférence de contraste élevé
 */
export function usePrefersHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: more)')
}
