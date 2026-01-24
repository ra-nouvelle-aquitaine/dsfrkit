'use client'

import * as React from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

export interface ThemeProviderProps {
  children: React.ReactNode
  /**
   * Thème par défaut
   * @default 'system'
   */
  defaultTheme?: Theme
  /**
   * Clé de stockage localStorage
   * @default 'dsfrkit-theme'
   */
  storageKey?: string
  /**
   * Attribut à appliquer sur l'élément html
   * @default 'class'
   */
  attribute?: 'class' | 'data-theme'
  /**
   * Désactiver la persistance localStorage
   * @default false
   */
  disableTransitionOnChange?: boolean
}

export interface ThemeProviderState {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(undefined)

const MEDIA_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light'
}

function applyTheme(
  theme: ResolvedTheme,
  attribute: 'class' | 'data-theme',
  disableTransition?: boolean
) {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  // Désactiver les transitions temporairement pour éviter le flash
  if (disableTransition) {
    root.style.setProperty('--transition-duration', '0s')
  }

  // Retirer les anciens attributs
  root.classList.remove('light', 'dark')
  root.removeAttribute('data-theme')
  root.removeAttribute('data-fr-theme')

  // Appliquer le nouveau thème
  if (attribute === 'class') {
    root.classList.add(theme)
  } else {
    root.setAttribute('data-theme', theme)
  }

  // Toujours mettre data-fr-theme pour activer les variables DSFR scheme.css
  root.setAttribute('data-fr-theme', theme)

  // Réactiver les transitions
  if (disableTransition) {
    // Force reflow
    void root.offsetHeight
    root.style.removeProperty('--transition-duration')
  }
}

/**
 * Provider pour la gestion du thème clair/sombre
 *
 * @example
 * ```tsx
 * // Dans votre layout racine
 * import { ThemeProvider, ThemeScript } from '@dsfrkit/react/providers'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <ThemeScript />
 *       </head>
 *       <body>
 *         <ThemeProvider>
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'dsfrkit-theme',
  attribute = 'class',
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme
    try {
      const stored = localStorage.getItem(storageKey)
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        return stored
      }
    } catch {
      // Ignorer les erreurs localStorage (SSR, iframe, etc.)
    }
    return defaultTheme
  })

  const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>(() => {
    if (theme === 'system') {
      return getSystemTheme()
    }
    return theme
  })

  // Appliquer le thème au montage et lors des changements
  React.useEffect(() => {
    const resolved = theme === 'system' ? getSystemTheme() : theme
    setResolvedTheme(resolved)
    applyTheme(resolved, attribute, disableTransitionOnChange)
  }, [theme, attribute, disableTransitionOnChange])

  // Écouter les changements de préférence système
  React.useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia(MEDIA_QUERY)

    const handler = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? 'dark' : 'light'
      setResolvedTheme(resolved)
      applyTheme(resolved, attribute, disableTransitionOnChange)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme, attribute, disableTransitionOnChange])

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, newTheme)
      } catch {
        // Ignorer les erreurs localStorage
      }
      setThemeState(newTheme)
    },
    [storageKey]
  )

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  )

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

/**
 * Hook pour accéder au contexte de thème
 *
 * @example
 * ```tsx
 * function ThemeToggle() {
 *   const { theme, setTheme, resolvedTheme } = useTheme()
 *
 *   return (
 *     <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
 *       Thème actuel: {resolvedTheme}
 *     </button>
 *   )
 * }
 * ```
 */
export function useTheme(): ThemeProviderState {
  const context = React.useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

/**
 * Hook optionnel qui ne throw pas si utilisé hors du provider
 * Retourne les valeurs par défaut si pas de provider
 */
export function useThemeOptional(): ThemeProviderState {
  const context = React.useContext(ThemeProviderContext)
  if (context === undefined) {
    return {
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: () => {
        console.warn('useTheme: No ThemeProvider found, setTheme is a no-op')
      },
    }
  }
  return context
}
