# Composant Translate

> Menu ou bouton de choix de langue du site.

## Import
```tsx
import { Translate } from '@dsfrkit/react'
import type { TranslateLanguage, TranslateProps } from '@dsfrkit/react'
```

## Usage recommandé
Menu ou bouton de choix de langue du site.

## Props et types
```ts
/**
 * Composant Translate (Sélection de langue) DSFR — fr-translate
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/selecteur-de-langue
 *
 * @example
 * ```tsx
 * <Translate
 *   currentLanguage="FR"
 *   languages={[
 *     { code: 'fr', label: 'Français', nativeLabel: 'FR' },
 *     { code: 'en', label: 'English', nativeLabel: 'EN' },
 *     { code: 'de', label: 'Deutsch', nativeLabel: 'DE' },
 *   ]}
 *   onLanguageChange={(code) => console.log(code)}
 * />
 * ```
 */

export interface TranslateLanguage {
  code: string
  label: string
  nativeLabel: string
  href?: string
}

export interface TranslateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Code de la langue courante */
  currentLanguage: string
  /** Liste des langues disponibles */
  languages: TranslateLanguage[]
  /** Callback lors du changement de langue */
  onLanguageChange?: (code: string) => void
}
```

## Storybook
Rubrique : `Branding/Translate`
