# Composant Container

> Limite la largeur maximale du contenu et le centre, assurant une lisibilité optimale sur les grands écrans.

## Import
```tsx
import { Container } from '@dsfrkit/react'
import type { ContainerProps } from '@dsfrkit/react'
```

## Usage recommandé
Limite la largeur maximale du contenu et le centre, assurant une lisibilité optimale sur les grands écrans.

## Props et types
```ts
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}
```

## Storybook
Rubrique : `Layout/Container`
