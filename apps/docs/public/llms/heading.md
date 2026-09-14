# Composant Heading

> Titrage sémantique et visuel pour définir la structure logique de la page (de h1 à h6).

## Import
```tsx
import { Heading } from '@dsfrkit/react'
import type { HeadingProps } from '@dsfrkit/react'
```

## Usage recommandé
Titrage sémantique et visuel pour définir la structure logique de la page (de `h1` à `h6`).

**Quand l'utiliser ?** Dès lors que le texte introduit ou sert de titre à une nouvelle section de contenu. Indispensable pour l'accessibilité (notamment selon les règles RGAA) : les lecteurs d'écran se basent sur les Headings ("as") pour comprendre l'arborescence. Attention, les niveaux de titre doivent toujours se suivre de manière logique et sans saut (ex: un `h3` doit toujours suivre un `h2`).

## Props et types
```ts
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: '1' | '2' | '3' | '4' | '5' | '6'
  weight?: 'light' | 'regular' | 'medium' | 'bold'
  asChild?: boolean
}
```

## Storybook
Rubrique : `Typography/Heading`
