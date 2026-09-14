# Composant Code

> Affiche un extrait de code ou une commande dans le flux de texte.

## Import
```tsx
import { Code } from '@dsfrkit/react'
import type { CodeProps } from '@dsfrkit/react'
```

## Usage recommandé
Affiche un extrait de code ou une commande dans le flux de texte.

## Props et types
```ts
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
  variant?: 'solid' | 'soft' | 'outline' | 'ghost'
}
```

## Storybook
Rubrique : `Typography/Code`
