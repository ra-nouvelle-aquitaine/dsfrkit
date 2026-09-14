# Composant Progress

> Barre de progression indiquant l'état d'avancement d'une tâche (téléchargement, formulaire en plusieurs étapes).

## Import
```tsx
import { Progress } from '@dsfrkit/react'
import type { ProgressProps } from '@dsfrkit/react'
```

## Usage recommandé
Barre de progression indiquant l'état d'avancement d'une tâche (téléchargement, formulaire en plusieurs étapes).

## Props et types
```ts
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  /** Durée de la transition d'animation en millisecondes */
  animationDuration?: number
}
```

## Storybook
Rubrique : `Feedback/Progress`
