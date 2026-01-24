# Composant ButtonGroup

## Import
```tsx
import { ButtonGroup } from '@dsfrkit/react'
```

## Documentation et Usages
Contrôle segmenté DSFR — fr-segmented
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/controle-segmente
Structure DSFR : le groupe a un fond neutre, l'élément actif a une bordure inset primary.

Composant ButtonGroup / Contrôle segmenté DSFR
@example
```tsx
<ButtonGroup type="single" defaultValue="carte">
<ButtonGroupItem value="carte">Carte</ButtonGroupItem>
<ButtonGroupItem value="liste">Liste</ButtonGroupItem>
<ButtonGroupItem value="tableau">Tableau</ButtonGroupItem>
</ButtonGroup>
```
