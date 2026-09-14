# Composant Tooltip

> Bulle d'aide affichée au survol (ou focus) qui décrit ou précise la fonction de l'élément ciblé.

## Import
```tsx
import { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from '@dsfrkit/react'
import type { TooltipContentProps } from '@dsfrkit/react'
```

## Usage recommandé
Bulle d'aide affichée au survol (ou focus) qui décrit ou précise la fonction de l'élément ciblé.

## Documentation et exemples
Contenu du Tooltip DSFR — fr-tooltip
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/infobulle

Fond: background-elevated avec ombre (shadow-lg), texte standard

## Props et types
```ts
export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  size?: 'sm' | 'md' | 'lg'
  /**
   * Affiche la flèche du tooltip.
   * @default true
   */
  showArrow?: boolean
}
```

## Storybook
Rubrique : `Utils/Tooltip`
