# Composant NavLink

> Lien spécifiquement conçu pour la navigation principale (menu).

## Import
```tsx
import { NavLink, navLinkVariants } from '@dsfrkit/react'
import type { NavLinkProps } from '@dsfrkit/react'
```

## Usage recommandé
Lien spécifiquement conçu pour la navigation principale (menu).

## Documentation et exemples
Composant NavLink DSFR polymorphique

Lien de navigation adaptable à différents contextes (header, sidebar, footer).

## Props et types
```ts
export interface NavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof navLinkVariants> {
  /**
   * Si true, rend le composant enfant au lieu d'un <a>
   */
  asChild?: boolean
  /**
   * Indique si le lien est actif (page courante)
   */
  isActive?: boolean
  /**
   * L'icône à afficher dans l'élément (ex: `<RemixIcon />`)
   */
  icon?: React.ReactNode
  /**
   * La position de l'icône ('start' ou 'end'). Par défaut: 'start'
   */
  iconPosition?: 'start' | 'end'
}
```

## Storybook
Rubrique : `Navigation/NavLink`
