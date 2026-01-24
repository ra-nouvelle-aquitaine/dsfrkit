# Composant Notice

## Import
```tsx
import { Notice } from '@dsfrkit/react'
```

## Documentation et Usages
Variants du bandeau d'information DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information

Composant Notice (Bandeau d'information) DSFR
Affiche un message important en haut de page ou dans une section.
@example
```tsx
// Bandeau d'information simple
<Notice variant="info">
Cette fonctionnalité est en cours de déploiement.
</Notice>
// Avec titre et fermeture
<Notice
variant="warning"
title="Maintenance prévue"
closable
onClose={() => console.log('fermé')}
>
Le service sera indisponible dimanche de 2h à 6h.
</Notice>
```
