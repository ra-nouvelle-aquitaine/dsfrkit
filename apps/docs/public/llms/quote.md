# Composant Quote

> Mise en forme spécifique pour rapporter les propos d'une personne avec citation de la source.

## Import
```tsx
import { Quote } from '@dsfrkit/react'
import type { QuoteProps } from '@dsfrkit/react'
```

## Usage recommandé
Mise en forme spécifique pour rapporter les propos d'une personne avec citation de la source.

## Props et types
```ts
export interface QuoteProps extends React.HTMLAttributes<HTMLElement> {
  /** Texte de la citation */
  children: React.ReactNode
  /** Auteur de la citation */
  author?: string
  /** URL de référence pour l'attribut cite de blockquote */
  cite?: string
  /** Liste d'éléments de source (titre, date, etc.) */
  sourceItems?: QuoteSourceItem[]
  /** URL optionnelle d'une image (portrait de l'auteur) */
  imageUrl?: string
  /** Texte alternatif de l'image */
  imageAlt?: string
}
```

## Storybook
Rubrique : `Typography/Quote`
