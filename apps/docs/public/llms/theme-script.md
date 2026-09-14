# Utilitaire ThemeScript

> Script inline pour éviter le flash de thème au chargement

## Import
```tsx
import { getThemeScriptContent, ThemeScript } from '@dsfrkit/react'
import type { ThemeScriptProps } from '@dsfrkit/react'
```

## Documentation et exemples
Script inline pour éviter le flash de thème au chargement
Doit être placé dans le <head> AVANT tout CSS ou React

Ce script s'exécute de manière synchrone avant le rendu,
appliquant immédiatement la classe de thème sur <html>

@example
```tsx
// Next.js App Router - app/layout.tsx
import { ThemeScript } from '@dsfrkit/react/providers'

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

@example
```tsx
// Next.js Pages Router - pages/_document.tsx
import { ThemeScript } from '@dsfrkit/react/providers'

export default function Document() {
  return (
    <Html lang="fr" suppressHydrationWarning>
      <Head>
        <ThemeScript />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

Variante du script qui retourne juste le code JS
Utile pour les cas où vous devez injecter le script manuellement

## Props et types
```ts
export interface ThemeScriptProps {
  /**
   * Clé de stockage localStorage (doit correspondre à ThemeProvider)
   * @default 'dsfrkit-theme'
   */
  storageKey?: string
  /**
   * Attribut à appliquer sur l'élément html
   * @default 'class'
   */
  attribute?: 'class' | 'data-theme'
  /**
   * Thème par défaut si aucun n'est stocké
   * @default 'system'
   */
  defaultTheme?: 'light' | 'dark' | 'system'
  /**
   * Utiliser un nonce pour CSP
   */
  nonce?: string
}
```
