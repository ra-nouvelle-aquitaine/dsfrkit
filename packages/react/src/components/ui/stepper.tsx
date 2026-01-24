import * as React from 'react'
import { cn } from '../../lib/utils'

export interface StepperStep {
  title: string
  description?: string
  /** Couleur de l'étape une fois complétée (par défaut: 'primary') */
  variant?: 'success' | 'error' | 'warning' | 'info' | 'primary'
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[]
  /** Index de l'étape courante (1-indexed comme dans le DSFR officiel) */
  currentStep: number
  /** Titre optionnel de l'étape courante */
  stepLabel?: string
  /** Orientation de la barre de progression (par défaut: horizontal) */
  orientation?: 'horizontal' | 'vertical'
}

const variantColorMap: Record<string, string> = {
  success: 'bg-success',
  error: 'bg-destructive',
  warning: 'bg-warning',
  info: 'bg-info',
  primary: 'bg-primary',
}

/**
 * Composant Stepper (Indicateur d'étapes) DSFR — fr-stepper
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/indicateur-d-etapes
 *
 * Chaque étape peut avoir sa propre couleur via la prop `variant` dans l'objet step.
 *
 * @example
 * ```tsx
 * const steps = [
 *   { title: 'Informations personnelles', variant: 'success' },
 *   { title: 'Documents justificatifs', variant: 'error' },
 *   { title: 'Confirmation' },
 * ]
 * <Stepper steps={steps} currentStep={3} />
 * ```
 */
const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ className, steps, currentStep, stepLabel, orientation = 'horizontal', ...props }, ref) => {
    const total = steps.length
    const current = Math.max(1, Math.min(currentStep, total))
    const currentStepData = steps[current - 1]

    return (
      <div
        ref={ref}
        className={cn(
          'fr-stepper flex gap-3',
          orientation === 'horizontal' ? 'flex-col w-full' : 'flex-row items-stretch',
          className
        )}
        {...props}
      >
        {/* Contenu textuel */}
        <div className={cn('flex flex-col gap-1', orientation === 'vertical' && 'order-2')}>
          {/* En-tête : étape X sur N */}
          <p className="text-sm font-bold text-muted-foreground">
            {stepLabel ?? `Étape ${current} sur ${total}`}
          </p>

          {/* Titre de l'étape courante */}
          {currentStepData && (
            <h2 className="text-xl font-bold text-foreground-title leading-6">
              {currentStepData.title}
            </h2>
          )}

          {/* Description optionnelle */}
          {currentStepData?.description && (
            <p className="text-sm text-muted-foreground">{currentStepData.description}</p>
          )}
        </div>

        {/* Barre de progression segmentée */}
        <div
          className={cn(
            'flex gap-1',
            orientation === 'horizontal'
              ? 'flex-row w-full mt-2'
              : 'flex-col w-2 min-h-[100px] order-1 mt-1 mr-4'
          )}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Étape ${current} sur ${total}`}
        >
          {steps.map((step, idx) => {
            const isCompleted = idx < current - 1
            const isActive = idx === current - 1
            const stepColor = isCompleted
              ? (variantColorMap[step.variant ?? 'primary'] ?? 'bg-primary')
              : isActive
                ? 'bg-primary'
                : 'bg-background-contrast'
            return (
              <div
                key={step.title}
                className={cn(
                  'flex-1 transition-colors',
                  orientation === 'horizontal' ? 'h-2' : 'w-2',
                  stepColor
                )}
                aria-hidden="true"
              />
            )
          })}
        </div>
      </div>
    )
  }
)

Stepper.displayName = 'Stepper'

export { Stepper }
