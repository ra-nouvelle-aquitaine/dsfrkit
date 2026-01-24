'use client'

import * as SliderPrimitive from '@radix-ui/react-slider'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface RangeProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** Label affiché au-dessus */
  label?: string
  /** Texte d'aide sous le label */
  hint?: string
  /** Affiche la valeur courante */
  showValue?: boolean
  /** Formateur pour l'affichage de la valeur */
  formatValue?: (value: number) => string
  /** Message d'erreur */
  error?: string
}

/**
 * Composant Range (Curseur) DSFR — fr-range
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/curseur
 *
 * @example
 * ```tsx
 * <Range label="Budget" min={0} max={100} showValue formatValue={(v) => \`\${v} €\`} />
 * ```
 */
const Range = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, RangeProps>(
  (
    {
      className,
      label,
      hint,
      showValue = false,
      formatValue = (v) => String(v),
      error,
      value,
      defaultValue = [0],
      onValueChange,
      min = 0,
      max = 100,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined
    const [internalValue, setInternalValue] = React.useState<number[]>(
      isControlled ? value : defaultValue
    )
    const inputId = React.useId()
    const hintId = React.useId()
    const errorId = React.useId()

    const handleValueChange = (newValue: number[]) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    const displayValue = isControlled ? value : internalValue

    // Props conditionnelles : soit controlled (value), soit uncontrolled (defaultValue)
    const sliderProps = isControlled ? { value } : { defaultValue }

    return (
      <div
        className={cn(
          'fr-range-group flex w-full flex-col gap-2',
          disabled && 'opacity-50',
          className
        )}
      >
        {label && (
          <label htmlFor={inputId} className="text-sm font-bold text-foreground-title">
            {label}
          </label>
        )}

        {hint && (
          <p id={hintId} className="text-sm text-foreground-muted">
            {hint}
          </p>
        )}

        <div className="flex items-center gap-4">
          <SliderPrimitive.Root
            ref={ref}
            id={inputId}
            className="relative flex min-w-0 flex-1 touch-none select-none items-center h-5"
            onValueChange={handleValueChange}
            min={min}
            max={max}
            disabled={disabled}
            aria-describedby={
              [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined
            }
            {...sliderProps}
            {...props}
          >
            <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-border">
              <SliderPrimitive.Range
                className={cn('absolute h-full bg-primary', error && 'bg-destructive')}
              />
            </SliderPrimitive.Track>
            {displayValue.map((_, index) => (
              <SliderPrimitive.Thumb
                // biome-ignore lint/suspicious/noArrayIndexKey: les curseurs sont positionnels et ne sont jamais réordonnés
                key={index}
                aria-label={label || 'Curseur'}
                className={cn(
                  'block h-5 w-5 rounded-full border-2 bg-background shadow-sm',
                  error ? 'border-destructive' : 'border-primary',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  error ? 'focus-visible:ring-destructive' : 'focus-visible:ring-primary',
                  'disabled:pointer-events-none',
                  'cursor-grab active:cursor-grabbing transition-colors'
                )}
              />
            ))}
          </SliderPrimitive.Root>

          {showValue && (
            <span
              className={cn(
                'min-w-[3rem] text-right text-sm font-medium tabular-nums',
                error ? 'text-destructive' : 'text-foreground'
              )}
            >
              {displayValue.length === 1
                ? formatValue(displayValue[0])
                : `${formatValue(displayValue[0])} – ${formatValue(displayValue[displayValue.length - 1])}`}
            </span>
          )}
        </div>

        <div className="flex justify-between text-xs text-foreground-muted">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>

        {error && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Range.displayName = 'Range'

export { Range }
