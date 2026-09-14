# Composant Modal

> Fenêtre de dialogue qui se superpose au contenu principal.

## Import
```tsx
import { Modal, ModalClose, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalOverlay, ModalPortal, ModalTitle, ModalTrigger } from '@dsfrkit/react'
import type { ModalContentProps } from '@dsfrkit/react'
```

## Usage recommandé
Fenêtre de dialogue qui se superpose au contenu principal. Utile pour interrompre l'utilisateur en centrant son attention sur une vue restreinte.

**Quand l'utiliser ?** Pour afficher des formulaires supplémentaires ou des détails d'éléments sans avoir à quitter la page courante au sein du contexte de l'application.

**Alternatives :** Utilisez `AlertDialog` pour obliger explicitement l'utilisateur à confimer des actions destuctives (ex: Suppression), et `Sheet` (Tiroir) pour afficher de très longs menus ou de lourds panneaux de filtres complexes (qui défileraient mal sur une modale centrale).

## Documentation et exemples
Composant Modal (Dialog) DSFR
Utilise Radix UI Dialog pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/modale

## Props et types
```ts
export interface ModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalContentVariants> {}
```

## Storybook
Rubrique : `Utils/Modal`
