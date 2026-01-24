# Composant Tile

## Import
```tsx
import { Tile } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Tile (Tuile) DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tuile
Structure DSFR :
- Zone image en haut (optionnelle)
- Corps (titre + description) en bas
- Lien couvre toute la carte (via position absolute)
- Pas de border-radius
- Fond gris clair --background-contrast-grey
Variantes :
- default   : tuile verticale standard
- horizontal : tuile horizontale (image à droite selon DSFR)
- download  : variante teléchargement (icône dédiée)
Tailles :
- md (défaut)
- sm : title + description plus petits
- lg : title + description plus grands

Tuile DSFR
@example
// Tuile simple
<Tile title="Démarches en ligne" description="Effectuez vos démarches" href="/demarches" />
// Tuile avec icône
<Tile title="Contact" icon={<MailIcon />} href="/contact" />
// Tuile horizontale
<Tile variant="horizontal" title="Document" description="Consulter le document" href="#" />
// Tuile téléchargement
<Tile variant="download" title="Formulaire CERFA" detail="PDF – 120 Ko" href="/doc.pdf" />
