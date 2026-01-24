import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Variants de l'input DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie
 *
 * L'input DSFR a un border-radius en haut seulement et une bordure inférieure épaisse
 */
const inputVariants = cva(
  // Base DSFR : fond adaptatif, bordure inférieure
  'flex w-full rounded-none border-0 text-base leading-6 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:italic focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        // Default : fond adaptatif, bordure inférieure grise
        default:
          'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.border-contrast)] focus:shadow-[inset_0_-2px_0_0_theme(colors.ring)]',
        // Error : bordure inférieure rouge
        error:
          'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.destructive.DEFAULT)] focus:shadow-[inset_0_-2px_0_0_theme(colors.destructive.DEFAULT)]',
        // Success : bordure inférieure verte
        success:
          'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.success.DEFAULT)] focus:shadow-[inset_0_-2px_0_0_theme(colors.success.DEFAULT)]',
        // Info : bordure inférieure bleue
        info: 'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.info.DEFAULT)] focus:shadow-[inset_0_-2px_0_0_theme(colors.info.DEFAULT)]',
        // Warning : bordure inférieure orange
        warning:
          'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.warning.DEFAULT)] focus:shadow-[inset_0_-2px_0_0_theme(colors.warning.DEFAULT)]',
      },
      inputSize: {
        // SM : hauteur 32px
        sm: 'h-8 px-4 py-1 text-sm',
        // MD : hauteur 40px (défaut DSFR)
        md: 'h-10 px-4 py-2',
        // LG : hauteur 48px
        lg: 'h-12 px-4 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  success?: string
  info?: string
  warning?: string
  hint?: string
  /** Icône à afficher dans le champ */
  icon?: React.ReactNode
  /** Élément d'action (ex: bouton) à afficher dans le champ */
  addon?: React.ReactNode
  /** Bouton d'action à accoler au champ de saisie (supprime l'arrondi de jonction) */
  action?: React.ReactNode
  /** Position de l'icône ou de l'addon ('start' par défaut, 'end' inversera) */
  position?: 'start' | 'end'
}

import { EyeIcon, EyeOffIcon } from '@dsfrkit/icons'

function SuccessIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z"
      />
    </svg>
  )
}

function WarningIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12.866 3L22.3923 19.5C22.6684 19.9782 22.5045 20.5901 22.0263 20.8661C21.8744 20.9539 21.7011 21 21.5263 21H2.47373C1.92144 21 1.47373 20.5523 1.47373 20C1.47373 19.8251 1.5198 19.6518 1.60769 19.5L11.134 3C11.41 2.52179 12.0219 2.35786 12.5001 2.63397C12.6513 2.72108 12.7788 2.84861 12.866 3ZM11 16V18H13V16H11ZM11 9V14H13V9H11Z"
      />
    </svg>
  )
}

function SystemInfoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19.5,2.5h-15c-1.1,0-2,0.9-2,2v15c0,1.1,0.9,2,2,2h15c1.1,0,2-0.9,2-2v-15C21.5,3.4,20.6,2.5,19.5,2.5z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z"
      />
    </svg>
  )
}

function SystemErrorIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17.5,2.5h-11L1,12l5.5,9.5h11L23,12L17.5,2.5z M16.2,14.8l-1.4,1.4L12,13.4l-2.8,2.8l-1.4-1.4l2.8-2.8L7.8,9.2l1.4-1.4l2.8,2.8l2.8-2.8l1.4,1.4L13.4,12L16.2,14.8z"
      />
    </svg>
  )
}

/**
 * Composant Input DSFR
 *
 * @example
 * ```tsx
 * // Avec icône
 * <Input
 *   label="Rechercher un utilisateur"
 *   icon={<SearchIcon />}
 *   position="start"
 * />
 *
 * // Avec bouton d'action
 * <Input
 *   label="Nom de domaine"
 *   addon={<Button variant="ghost">Vérifier</Button>}
 *   position="end"
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      error,
      success,
      info,
      warning,
      hint,
      icon,
      addon,
      action,
      position = 'end',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const inputOrGeneratedId = inputId
    const errorId = `${inputOrGeneratedId}-error`
    const successId = `${inputOrGeneratedId}-success`
    const infoId = `${inputOrGeneratedId}-info`
    const warningId = `${inputOrGeneratedId}-warning`
    const hintId = `${inputOrGeneratedId}-hint`

    // Calcul du padding nécessaire pour éviter le chevauchement du texte
    // Padding par défaut (cva) : px-4
    const hasElementAtStart = position === 'start' && (icon || addon)
    const hasElementAtEnd = position === 'end' && (icon || addon)

    const isError = !!error
    const isSuccess = !!success && !isError
    const isWarning = !!warning && !isError && !isSuccess
    const isInfo = !!info && !isError && !isSuccess && !isWarning

    const inputStateVariant = isError
      ? 'error'
      : isSuccess
        ? 'success'
        : isWarning
          ? 'warning'
          : isInfo
            ? 'info'
            : variant

    return (
      <div
        className={cn(
          'w-full space-y-2 relative transition-colors',
          (isError || isSuccess || isWarning || isInfo) && 'pl-4 -ml-[18px] border-l-2',
          isError
            ? 'border-l-destructive'
            : isSuccess
              ? 'border-l-success'
              : isWarning
                ? 'border-l-warning'
                : isInfo
                  ? 'border-l-info'
                  : ''
        )}
      >
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {hint && !isError && !isSuccess && !isWarning && !isInfo && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}

        <div className={cn('flex items-stretch', action ? 'flex-row' : 'flex-col')}>
          {action && position === 'start' && (
            <div className="flex-none [&>button]:h-full [&>button]:border-r-0">{action}</div>
          )}

          <div className="relative flex items-center flex-1">
            {hasElementAtStart && (
              <div
                className={cn(
                  'absolute left-3 flex h-full items-center justify-center',
                  icon ? 'pointer-events-none text-muted-foreground' : 'pointer-events-auto'
                )}
              >
                {icon || addon}
              </div>
            )}

            <input
              id={inputId}
              className={cn(
                inputVariants({ variant: inputStateVariant, inputSize, className }),
                hasElementAtStart && 'pl-10',
                hasElementAtEnd && 'pr-10'
              )}
              ref={ref}
              aria-invalid={isError ? 'true' : 'false'}
              aria-describedby={
                isError
                  ? errorId
                  : isSuccess
                    ? successId
                    : isWarning
                      ? warningId
                      : isInfo
                        ? infoId
                        : hint
                          ? hintId
                          : undefined
              }
              {...props}
            />

            {hasElementAtEnd && (
              <div
                className={cn(
                  'absolute right-3 flex h-full items-center justify-center',
                  icon ? 'pointer-events-none text-muted-foreground' : 'pointer-events-auto'
                )}
              >
                {icon || addon}
              </div>
            )}
          </div>

          {action && (!position || position === 'end') && (
            <div className="flex-none [&>button]:h-full [&>button]:border-l-0">{action}</div>
          )}
        </div>

        {isError && (
          <p id={errorId} className="text-sm text-error font-medium flex items-center space-x-1">
            <SystemErrorIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}

        {isSuccess && (
          <p
            id={successId}
            className="text-sm text-success font-medium flex items-center space-x-1"
          >
            <SuccessIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{success}</span>
          </p>
        )}

        {isWarning && (
          <p
            id={warningId}
            className="text-sm text-warning font-medium flex items-center space-x-1"
          >
            <WarningIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{warning}</span>
          </p>
        )}

        {isInfo && (
          <p id={infoId} className="text-sm text-info font-medium flex items-center space-x-1">
            <SystemInfoIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{info}</span>
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

/**
 * Composant Textarea DSFR
 * Même style que l'input avec border-radius en haut et bordure inférieure
 */
const textareaVariants = cva(
  // Base DSFR : fond adaptatif, bordure inférieure
  'flex min-h-[120px] w-full rounded-none border-0 text-base leading-6 transition-colors placeholder:text-muted-foreground placeholder:italic focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-y',
  {
    variants: {
      variant: {
        // Default : fond adaptatif, bordure inférieure grise
        default:
          'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.border-contrast)] focus:shadow-[inset_0_-2px_0_0_theme(colors.ring)]',
        // Error : bordure inférieure rouge
        error:
          'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.destructive.DEFAULT)] focus:shadow-[inset_0_-2px_0_0_theme(colors.destructive.DEFAULT)]',
        // Success : bordure inférieure verte
        success:
          'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.success.DEFAULT)] focus:shadow-[inset_0_-2px_0_0_theme(colors.success.DEFAULT)]',
        // Info : bordure inférieure bleue
        info: 'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.info.DEFAULT)] focus:shadow-[inset_0_-2px_0_0_theme(colors.info.DEFAULT)]',
        // Warning : bordure inférieure orange
        warning:
          'bg-muted text-foreground shadow-[inset_0_-2px_0_0_theme(colors.warning.DEFAULT)] focus:shadow-[inset_0_-2px_0_0_theme(colors.warning.DEFAULT)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string
  error?: string
  success?: string
  info?: string
  warning?: string
  hint?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, label, error, success, info, warning, hint, id, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id || generatedId
    const inputOrGeneratedId = textareaId
    const errorId = `${inputOrGeneratedId}-error`
    const successId = `${inputOrGeneratedId}-success`
    const infoId = `${inputOrGeneratedId}-info`
    const warningId = `${inputOrGeneratedId}-warning`
    const hintId = `${inputOrGeneratedId}-hint`

    const isError = !!error
    const isSuccess = !!success && !isError
    const isWarning = !!warning && !isError && !isSuccess
    const isInfo = !!info && !isError && !isSuccess && !isWarning

    const inputStateVariant = isError
      ? 'error'
      : isSuccess
        ? 'success'
        : isWarning
          ? 'warning'
          : isInfo
            ? 'info'
            : variant

    return (
      <div
        className={cn(
          'w-full space-y-2 relative transition-colors',
          (isError || isSuccess || isWarning || isInfo) && 'pl-4 -ml-[18px] border-l-2',
          isError
            ? 'border-l-destructive'
            : isSuccess
              ? 'border-l-success'
              : isWarning
                ? 'border-l-warning'
                : isInfo
                  ? 'border-l-info'
                  : ''
        )}
      >
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {hint && !isError && !isSuccess && !isWarning && !isInfo && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}

        <textarea
          id={textareaId}
          className={cn(textareaVariants({ variant: inputStateVariant, className }), 'px-4 py-2')}
          ref={ref}
          aria-invalid={isError ? 'true' : 'false'}
          aria-describedby={
            isError
              ? errorId
              : isSuccess
                ? successId
                : isWarning
                  ? warningId
                  : isInfo
                    ? infoId
                    : hint
                      ? hintId
                      : undefined
          }
          {...props}
        />

        {isError && (
          <p id={errorId} className="text-sm text-error font-medium flex items-center space-x-1">
            <SystemErrorIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}

        {isSuccess && (
          <p
            id={successId}
            className="text-sm text-success font-medium flex items-center space-x-1"
          >
            <SuccessIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{success}</span>
          </p>
        )}

        {isWarning && (
          <p
            id={warningId}
            className="text-sm text-warning font-medium flex items-center space-x-1"
          >
            <WarningIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{warning}</span>
          </p>
        )}

        {isInfo && (
          <p id={infoId} className="text-sm text-info font-medium flex items-center space-x-1">
            <SystemInfoIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{info}</span>
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

/**
 * Composant PasswordInput DSFR
 * Champ mot de passe avec bouton "Afficher/Masquer" intégré
 */
const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant, inputSize, label, error, success, info, warning, hint, id, ...props },
    ref
  ) => {
    const generatedId = React.useId()
    const inputId = id || generatedId
    const inputOrGeneratedId = inputId
    const errorId = `${inputOrGeneratedId}-error`
    const successId = `${inputOrGeneratedId}-success`
    const infoId = `${inputOrGeneratedId}-info`
    const warningId = `${inputOrGeneratedId}-warning`
    const hintId = `${inputOrGeneratedId}-hint`
    const [showPassword, setShowPassword] = React.useState(false)

    const isError = !!error
    const isSuccess = !!success && !isError
    const isWarning = !!warning && !isError && !isSuccess
    const isInfo = !!info && !isError && !isSuccess && !isWarning

    const inputStateVariant = isError
      ? 'error'
      : isSuccess
        ? 'success'
        : isWarning
          ? 'warning'
          : isInfo
            ? 'info'
            : variant

    return (
      <div
        className={cn(
          'w-full space-y-2 relative transition-colors',
          (isError || isSuccess || isWarning || isInfo) && 'pl-4 -ml-[18px] border-l-2',
          isError
            ? 'border-l-destructive'
            : isSuccess
              ? 'border-l-success'
              : isWarning
                ? 'border-l-warning'
                : isInfo
                  ? 'border-l-info'
                  : ''
        )}
      >
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-foreground">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {hint && !isError && !isSuccess && !isWarning && !isInfo && (
          <p id={hintId} className="text-sm text-muted-foreground">
            {hint}
          </p>
        )}

        <div className="relative">
          <input
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              inputVariants({ variant: inputStateVariant, inputSize }),
              'pr-24', // Padding for the button
              className
            )}
            ref={ref}
            aria-invalid={isError ? 'true' : 'false'}
            aria-describedby={
              isError
                ? errorId
                : isSuccess
                  ? successId
                  : isWarning
                    ? warningId
                    : isInfo
                      ? infoId
                      : hint
                        ? hintId
                        : undefined
            }
            {...props}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-none text-primary hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-controls={inputId}
            title={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            <span className="sr-only">{showPassword ? 'Masquer' : 'Afficher'}</span>
            {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
          </button>
        </div>

        {isError && (
          <p id={errorId} className="text-sm text-error font-medium flex items-center space-x-1">
            <SystemErrorIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}

        {isSuccess && (
          <p
            id={successId}
            className="text-sm text-success font-medium flex items-center space-x-1"
          >
            <SuccessIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{success}</span>
          </p>
        )}

        {isWarning && (
          <p
            id={warningId}
            className="text-sm text-warning font-medium flex items-center space-x-1"
          >
            <WarningIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{warning}</span>
          </p>
        )}

        {isInfo && (
          <p id={infoId} className="text-sm text-info font-medium flex items-center space-x-1">
            <SystemInfoIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{info}</span>
          </p>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export { Input, inputVariants, PasswordInput, Textarea, textareaVariants }

/**
 * @example
 * ```tsx
 * <Input label="Nom" placeholder="Saisissez votre nom" />
 * <Textarea label="Message" rows={4} />
 * <PasswordInput label="Mot de passe" />
 * ```
 */
