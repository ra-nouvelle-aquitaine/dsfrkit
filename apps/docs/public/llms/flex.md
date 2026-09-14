# Composant Flex

> Conteneur basé sur Flexbox.

## Import
```tsx
import { Flex } from '@dsfrkit/react'
import type { FlexProps } from '@dsfrkit/react'
```

## Usage recommandé
Conteneur basé sur Flexbox. Utilisé pour aligner des éléments horizontalement ou verticalement avec une répartition de l'espace contrôlée.

**Quand l'utiliser ?** Privilégiez `Flex` pour des alignements simples à une seule dimension (une ligne ou une colonne), centrer des éléments, ou gérer des composants de navigation et des barres d'outils.

**Alternative :** Pour des mises en page réactives en deux dimensions (lignes ET colonnes simultanément), utilisez plutôt `Grid`.

## Props et types
```ts
export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
}
```

## Storybook
Rubrique : `Layout/Flex`
