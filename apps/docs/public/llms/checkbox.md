# Composant Checkbox

## Import
```tsx
import { Checkbox } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Checkbox DSFR
Utilise Radix UI Checkbox pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/case-a-cocher
Le checkbox DSFR a un border-radius de 4px et une bordure bleue france

Checkbox accessible avec label et états
@example
```tsx
<Checkbox label="J'accepte les conditions" />
<Checkbox label="Newsletter" hint="Recevez nos actualités" />
<Checkbox label="Obligatoire" error="Ce champ est requis" variant="error" />
```
