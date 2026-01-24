# Composant Upload

## Import
```tsx
import { Upload } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Upload (Téléchargement de fichiers) DSFR — fr-upload-group
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/ajout-de-fichier
@example
```tsx
<Upload
label="Ajouter des fichiers"
hint="Format acceptés : PDF, DOCX — Taille max : 10 Mo"
id="upload-1"
/>
<Upload
label="Document justificatif"
multiple
error="Le fichier est trop volumineux"
id="upload-2"
/>
```
