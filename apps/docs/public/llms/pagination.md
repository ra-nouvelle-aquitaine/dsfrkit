# Composant Pagination

> Permet de naviguer entre les différentes pages d'une liste longue.

## Import
```tsx
import { Pagination, PaginationContent, PaginationEllipsis, PaginationFirst, PaginationItem, PaginationLast, PaginationLink, PaginationNext, PaginationPrevious } from '@dsfrkit/react'
import type { PaginationLinkProps, PaginationProps } from '@dsfrkit/react'
```

## Usage recommandé
Permet de naviguer entre les différentes pages d'une liste longue.

## Documentation et exemples
Conteneur de la pagination DSFR

Liste des éléments de pagination

Élément de pagination individuel

Lien de pagination

Bouton première page

Bouton page précédente

Bouton page suivante

Bouton dernière page

Ellipsis pour indiquer des pages masquées

## Props et types
```ts
export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Si true, rend le composant enfant au lieu d'un <a>
   */
  asChild?: boolean
  /**
   * Si true, indique que c'est la page actuelle
   */
  isActive?: boolean
  /**
   * Si true, désactive le lien
   */
  disabled?: boolean
}

export interface PaginationProps extends React.ComponentPropsWithoutRef<'nav'> {
  /**
   * Libellé d'accessibilité pour la navigation
   */
  'aria-label'?: string
}
```

## Storybook
Rubrique : `Navigation/Pagination`
