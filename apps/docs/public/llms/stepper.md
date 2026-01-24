# Composant Stepper

## Import
```tsx
import { Stepper } from '@dsfrkit/react'
```

## Documentation et Usages
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
