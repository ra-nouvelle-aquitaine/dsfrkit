# Composant Stepper

> Indicateur d'étapes indiquant la progression au travers d'un formulaire fractionné (wizard).

## Import
```tsx
import { Stepper } from '@dsfrkit/react'
import type { StepperProps, StepperStep } from '@dsfrkit/react'
```

## Usage recommandé
Indicateur d'étapes indiquant la progression au travers d'un formulaire fractionné (wizard).

## Documentation et exemples
Composant Stepper (Indicateur d'étapes) DSFR — fr-stepper
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/indicateur-d-etapes

Chaque étape peut avoir sa propre couleur via la prop `variant` dans l'objet step.

@example
```tsx
const steps = [
  { title: 'Informations personnelles', variant: 'success' },
  { title: 'Documents justificatifs', variant: 'error' },
  { title: 'Confirmation' },
]
<Stepper steps={steps} currentStep={3} />
```

## Props et types
```ts
export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[]
  /** Index de l'étape courante (1-indexed comme dans le DSFR officiel) */
  currentStep: number
  /** Titre optionnel de l'étape courante */
  stepLabel?: string
  /** Orientation de la barre de progression (par défaut: horizontal) */
  orientation?: 'horizontal' | 'vertical'
}

export interface StepperStep {
  /** Identifiant stable, recommandé lorsque plusieurs étapes portent le même titre. */
  id?: React.Key
  title: string
  description?: string
  /** Couleur de l'étape une fois complétée (par défaut: 'primary') */
  variant?: 'success' | 'error' | 'warning' | 'info' | 'primary'
}
```

## Storybook
Rubrique : `Navigation/Stepper`
