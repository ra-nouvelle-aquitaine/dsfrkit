# Composant Box

> Composant conteneur générique servant de brique de base pour la mise en page.

## Import
```tsx
import { Box } from '@dsfrkit/react'
import type { BoxProps } from '@dsfrkit/react'
```

## Usage recommandé
Composant conteneur générique servant de brique de base pour la mise en page. Permet d'appliquer rapidement des espacements ou des couleurs.

## Props et types
```ts
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
}
```

## Storybook
Rubrique : `Layout/Box`
