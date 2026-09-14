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
  (
    {
      className,
      label,
      hint,
      error,
      success,
      containerClassName,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const inputOrGeneratedId = inputId
    const hasError = Boolean(error)
    const hasSuccess = Boolean(success) && !hasError
    const hintId = `${inputOrGeneratedId}-hint`
    const errorId = `${inputOrGeneratedId}-error`
    const successId = `${inputOrGeneratedId}-success`
    const describedBy = [
      ariaDescribedBy,
      hint ? hintId : undefined,
      hasError ? errorId : undefined,
      hasSuccess ? successId : undefined,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <div className={cn('fr-upload-group flex flex-col', containerClassName)}>
        {/* Label */}
        <label htmlFor={inputId} className="text-base leading-6 text-foreground-title">
          {label}
          {props.required && (
            <span className="ml-1 text-destructive" aria-hidden="true">
              *
            </span>
          )}
          {hint && (
            <span id={hintId} className="mt-3 block text-xs leading-5 text-muted-foreground">
              {hint}
            </span>
          )}
        </label>

        {/* Input file */}
        <input
          ref={ref}
          id={inputId}
          type="file"
          className={cn(
            // .fr-upload laisse le bouton natif du navigateur ; on lui applique
            // ici l'habillage d'un bouton tertiaire DSFR au gabarit `sm`
            // (fond transparent, filet interne 1px, texte Bleu France,
            // 14/24, hauteur 32px, retrait 4px/12px, sans rayon).
            'mt-4 inline-flex w-full text-sm leading-6 text-foreground',
            'file:mr-2 file:min-h-8 file:cursor-pointer file:appearance-none file:rounded-none',
            'file:border-0 file:bg-transparent file:px-3 file:py-1',
            'file:font-medium file:text-sm file:leading-6 file:text-primary',
            'file:shadow-[inset_0_0_0_1px_theme(colors.border)]',
            'file:transition-colors hover:file:bg-background-contrast',
            className
          )}
          aria-invalid={hasError ? 'true' : undefined}
          aria-describedby={describedBy || undefined}
          {...props}
        />

        {/* Error */}
        {hasError && (
          <p id={errorId} className="mt-2 text-xs text-destructive leading-5" role="alert">
            <span className="font-bold">Erreur — </span>
            {error}
          </p>
        )}

        {/* Success */}
        {hasSuccess && (
          <p id={successId} className="mt-2 text-xs text-success leading-5" role="status">
            {success}
          </p>
        )}
      </div>
    )
  }
)

Upload.displayName = 'Upload'

export { Upload }
