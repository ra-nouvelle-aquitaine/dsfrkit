# Composant Section

> Conteneur sémantique correspondant à une partie de page, incluant par défaut des espacements verticaux cohérents.

## Import
```tsx
import { Section } from '@dsfrkit/react'
import type { SectionProps } from '@dsfrkit/react'
```

## Usage recommandé
Conteneur sémantique correspondant à une partie de page, incluant par défaut des espacements verticaux cohérents.

## Props et types
```ts
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg' | 'none'
}
```

## Storybook
Rubrique : `Layout/Section`
