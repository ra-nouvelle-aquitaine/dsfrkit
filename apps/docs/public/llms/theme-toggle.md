# Composant ThemeToggle

> Bouton pour alterner entre le thème clair et le thème sombre selon le choix de l'utilisateur.

## Import
```tsx
import { ThemeToggle } from '@dsfrkit/react'
import type { ThemeToggleProps } from '@dsfrkit/react'
```

## Usage recommandé
Bouton pour alterner entre le thème clair et le thème sombre selon le choix de l'utilisateur.

## Documentation et exemples
Composant de sélection du thème (Paramètres d'affichage)
Conforme au DSFR : Bouton ouvrant une modale avec choix du thème (Clair, Sombre, Système)

## Props et types
```ts
export interface ThemeToggleProps extends Omit<ButtonProps, 'icon' | 'iconPosition'> {
  /**
   * Si true, le bouton n'affiche que l'icône, sans le texte.
   */
  iconOnly?: boolean
  /**
   * Affiche une bordure autour du bouton
   */
  withBorder?: boolean
}
```

## Storybook
Rubrique : `Branding/ThemeToggle`
