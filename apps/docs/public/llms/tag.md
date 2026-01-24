# Composant Tag

## Import
```tsx
import { Tag } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Tag DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tag
Trois modes exclusifs (en plus du tag statique) :
- clickable  : tag rendu comme un lien <a href>
- pressable  : tag sélectionnable (checkbox caché), affiche une coche en overlay
- dismissible: tag supprimable via un bouton ×

Tag DSFR — catégoriser, filtrer ou sélectionner du contenu.
@example
// Statique
<Tag>Catégorie</Tag>
<Tag variant="info">Info</Tag>
// Lien cliquable
<Tag clickable href="/page">Voir plus</Tag>
// Sélectionnable (checkbox)
<Tag pressable onSelectedChange={(v) => console.log(v)}>Filtre</Tag>
// Supprimable
<Tag dismissible onDismiss={() => setVisible(false)}>Actif</Tag>
