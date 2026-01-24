'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'

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

const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
  ({ className, label, hint, error, success, containerClassName, id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const inputOrGeneratedId = inputId
    const hasError = Boolean(error)
    const hasSuccess = Boolean(success) && !hasError

    return (
      <div className={cn('fr-upload-group flex flex-col gap-1', containerClassName)}>
        {/* Label */}
        <label htmlFor={inputId} className="text-sm font-bold leading-6 text-foreground-title">
          {label}
          {props.required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
        </label>

        {/* Hint */}
        {hint && <p className="text-sm text-muted-foreground leading-5">{hint}</p>}

        {/* Input file */}
        <input
          ref={ref}
          id={inputId}
          type="file"
          className={cn(
            // Base DSFR file input styles
            'w-full text-sm text-foreground',
            'file:mr-4 file:py-1.5 file:px-4',
            'file:border-0 file:font-medium file:text-sm',
            'file:bg-background-contrast file:text-foreground file:cursor-pointer',
            'file:hover:bg-muted',
            'file:transition-colors',
            // State borders
            hasError && 'border-b-2 border-b-destructive',
            hasSuccess && 'border-b-2 border-b-success',
            className
          )}
          aria-describedby={
            [
              hint ? `${inputOrGeneratedId}-hint` : null,
              error ? `${inputOrGeneratedId}-error` : null,
              success ? `${inputOrGeneratedId}-success` : null,
            ]
              .filter(Boolean)
              .join(' ') || undefined
          }
          {...props}
        />

        {/* Error */}
        {hasError && (
          <p
            id={`${inputOrGeneratedId}-error`}
            className="text-sm text-destructive leading-5"
            role="alert"
          >
            <span className="font-bold">Erreur — </span>
            {error}
          </p>
        )}

        {/* Success */}
        {hasSuccess && (
          <p id={`${inputOrGeneratedId}-success`} className="text-sm text-success leading-5">
            {success}
          </p>
        )}
      </div>
    )
  }
)

Upload.displayName = 'Upload'

export { Upload }
