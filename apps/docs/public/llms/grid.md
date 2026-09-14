# Composant Grid

> Conteneur basé sur CSS Grid.

## Import
```tsx
import { Grid } from '@dsfrkit/react'
import type { GridProps } from '@dsfrkit/react'
```

## Usage recommandé
Conteneur basé sur CSS Grid. Utilisé pour construire des grilles complexes et des mises en page réactives en colonnes.

**Quand l'utiliser ?** Privilégiez `Grid` (plutôt que `Flex`) pour des mises en page à deux dimensions, structurer des listes de cartes (ex: 3 colonnes), ou aligner parfaitement des éléments sur une grille globale, indépendamment du volume de leur contenu individuel.

## Props et types
```ts
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  columns?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10'
  gapX?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10'
  gapY?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10'
}
```

## Storybook
Rubrique : `Layout/Grid`
