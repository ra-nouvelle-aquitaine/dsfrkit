# Composant Upload

> Champ d'envoi et de dépôt (drag & drop) de fichiers ou de documents.

## Import
```tsx
import { Upload } from '@dsfrkit/react'
import type { UploadProps } from '@dsfrkit/react'
```

## Usage recommandé
Champ d'envoi et de dépôt (drag & drop) de fichiers ou de documents.

## Props et types
```ts
/**
 * Composant Upload (Téléchargement de fichiers) DSFR — fr-upload-group
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/ajout-de-fichier
 *
 * @example
 * ```tsx
 * <Upload
 *   label="Ajouter des fichiers"
 *   hint="Format acceptés : PDF, DOCX — Taille max : 10 Mo"
 *   id="upload-1"
 * />
 *
 * <Upload
 *   label="Document justificatif"
 *   multiple
 *   error="Le fichier est trop volumineux"
 *   id="upload-2"
 * />
 * ```
 */

export interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label associé au champ */
  label: string
  /** Texte d'aide sous le label */
  hint?: string
  /** Message d'erreur (active l'état d'erreur) */
  error?: string
  /** Message de succès */
  success?: string
  /** Classe du conteneur externe */
  containerClassName?: string
}
```

## Storybook
Rubrique : `Inputs/Upload`
