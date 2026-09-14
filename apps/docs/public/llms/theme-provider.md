# Utilitaire ThemeProvider

> Provider pour la gestion du thème clair/sombre

## Import
```tsx
import { ThemeProvider, useTheme, useThemeOptional } from '@dsfrkit/react'
import type { ResolvedTheme, Theme, ThemeProviderProps, ThemeProviderState } from '@dsfrkit/react'
```

## Documentation et exemples
Provider pour la gestion du thème clair/sombre

@example
```tsx
// Dans votre layout racine
import { ThemeProvider, ThemeScript } from '@dsfrkit/react/providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Hook pour accéder au contexte de thème

@example
```tsx
function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      Thème actuel: {resolvedTheme}
    </button>
  )
}
```

Hook optionnel qui ne throw pas si utilisé hors du provider
Retourne les valeurs par défaut si pas de provider

## Props et types
```ts
export type ResolvedTheme = 'light' | 'dark'

export type Theme = 'light' | 'dark' | 'system'

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
```
