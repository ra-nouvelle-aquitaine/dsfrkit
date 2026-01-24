# Composant Artwork

## Import
```tsx
import { Artwork } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Artwork / Pictogramme DSFR
Affiche un pictogramme officiel du DSFR avec ses 3 couches :
- **decorative** : petits points décoratifs en arrière-plan
- **minor** : éléments secondaires de l'illustration
- **major** : élément principal de l'illustration
@example
```tsx
<Artwork name="environment/sun" size={80} />
<Artwork name="system/error" majorColor="red" />
<Artwork name="health/doctor" size={120} />
```
