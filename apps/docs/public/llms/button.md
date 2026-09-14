# Composant Button

> Permet d'effectuer une action ou une soumission de formulaire.

## Import
```tsx
import { Button, buttonVariants } from '@dsfrkit/react'
import type { ButtonProps } from '@dsfrkit/react'
```

## Usage recommandé
Permet d'effectuer une action ou une soumission de formulaire. Ne doit pas être utilisé pour de la simple navigation (utiliser Link).

## Documentation et exemples
Variants du bouton DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton

Composant Button DSFR

## Props et types
```ts
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Si true, rend le composant enfant au lieu d'un bouton
   * Utile pour l'intégration avec les routeurs (Next.js, React Router, etc.)
   */
  asChild?: boolean
  /**
   * L'icône à afficher dans le bouton (ex: `<RemixIcon />`)
   */
  icon?: React.ReactNode
  /**
   * La position de l'icône ('start' ou 'end'). Par défaut: 'start'
   */
  iconPosition?: 'start' | 'end'
  /**
   * Si true, affiche un spinner de chargement et désactive le bouton
   */
  loading?: boolean
}
```

## Storybook
Rubrique : `Inputs/Button`
