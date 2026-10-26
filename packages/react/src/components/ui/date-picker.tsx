'use client'

import { RiCalendarLineIcon } from '@dsfrkit/icons'
import * as React from 'react'
import type { DateRange, Matcher } from 'react-day-picker'
// Locale de react-day-picker : traduit aussi les libellés accessibles (« Aujourd'hui », mois suivant…)
import { fr } from 'react-day-picker/locale'
import { Button } from './button'
import { Calendar, type CalendarProps } from './calendar'
import { Input, type InputProps } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type { DateRange } from 'react-day-picker'

/** Erreur de validation détectée sur la saisie au clavier. */
export type DatePickerError = 'invalid' | 'incomplete' | 'beforeMin' | 'afterMax' | 'rangeOrder'

/** Informations transmises avec chaque changement de valeur. */
export interface DatePickerChangeDetails {
  /** Texte saisi dans le champ, tel quel. */
  inputValue: string
  /** Erreur de validation de la saisie, `undefined` si la saisie est vide ou valide. */
  error?: DatePickerError
}

interface DatePickerBaseProps
  extends Omit<
    InputProps,
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'type'
    | 'icon'
    | 'addon'
    | 'action'
    | 'position'
    | 'inputOverlay'
    | 'min'
    | 'max'
  > {
  /** Première date sélectionnable (incluse). */
  minDate?: Date
  /** Dernière date sélectionnable (incluse). */
  maxDate?: Date
  /**
   * Affichage du titre du calendrier : libellé simple ou menus déroulants mois / année
   * (`dropdown`, utile pour une date de naissance).
   */
  captionLayout?: CalendarProps['captionLayout']
  /** Nombre de mois affichés côte à côte dans le calendrier (1 par défaut). */
  numberOfMonths?: number
  /** Libellé accessible du bouton qui ouvre le calendrier et de la fenêtre du calendrier. */
  calendarLabel?: string
  /**
   * Messages d'erreur affichés après la sortie du champ quand la saisie est invalide.
   * Ignorés quand la prop `error` est fournie : elle est toujours prioritaire.
   */
  errorMessages?: Partial<Record<DatePickerError, string>>
}

export interface DatePickerSingleProps extends DatePickerBaseProps {
  /** Sélection d'une seule date (par défaut). */
  mode?: 'single'
  /**
   * Date sélectionnée (mode contrôlé) ; `undefined` ou `null` pour un champ vide.
   * Une saisie invalide vaut déjà `undefined` : pour vider le texte affiché, remonter le
   * composant (nouvelle `key`).
   */
  value?: Date | null
  /** Date initiale (mode non contrôlé). */
  defaultValue?: Date
  /**
   * Appelé à chaque saisie ou sélection dans le calendrier. Reçoit `undefined` tant que
   * le texte saisi n'est pas une date valide ; `details.error` en donne la raison.
   */
  onValueChange?: (value: Date | undefined, details: DatePickerChangeDetails) => void
}

export interface DatePickerRangeProps extends DatePickerBaseProps {
  /** Sélection d'une plage de dates (« du … au … »). */
  mode: 'range'
  /**
   * Plage sélectionnée (mode contrôlé) ; `undefined` ou `null` pour un champ vide.
   * Une saisie invalide ou incomplète vaut déjà `undefined` : pour vider le texte affiché,
   * remonter le composant (nouvelle `key`).
   */
  value?: DateRange | null
  /** Plage initiale (mode non contrôlé). */
  defaultValue?: DateRange
  /**
   * Appelé à chaque saisie ou sélection dans le calendrier. Reçoit `undefined` tant que
   * la plage n'est pas complète et valide ; `details.error` en donne la raison.
   */
  onValueChange?: (value: DateRange | undefined, details: DatePickerChangeDetails) => void
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps

/** Séparateur inséré entre les deux dates d'une plage. */
const RANGE_SEPARATOR = ' – '
const DATE_PATTERN = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
/** Séparateurs acceptés à la saisie d'une plage : tirets ou « au ». */
const RANGE_SPLIT_PATTERN = /\s*(?:–|—|-|\bau\b)\s*/
/** Découpe une saisie de plage en « première date + séparateur » et « suite ». */
const RANGE_HEAD_PATTERN = /^(.*?(?:–|—|-|\bau\b)\s*)(.*)$/

const pad = (value: number) => String(value).padStart(2, '0')

const formatDate = (date: Date) =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`

/** Une plage commencée se termine par le séparateur : la date de fin est attendue. */
const formatRange = (range: DateRange | undefined) => {
  if (!range?.from) return ''
  return `${formatDate(range.from)}${RANGE_SEPARATOR}${range.to ? formatDate(range.to) : ''}`
}

/** Clé numérique d'un jour (AAAAMMJJ), pour comparer des dates sans tenir compte de l'heure. */
const toDayKey = (date: Date) => date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()

/** Lit une date JJ/MM/AAAA (J/M/AAAA accepté) ; `undefined` si elle n'existe pas (31/02…). */
const parseDate = (text: string): Date | undefined => {
  const match = DATE_PATTERN.exec(text.trim())
  if (!match) return undefined

  const day = Number(match[1])
  const month = Number(match[2])
  const year = Number(match[3])
  const date = new Date(year, month - 1, day)

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : undefined
}

const getBoundsError = (
  date: Date,
  minDate?: Date,
  maxDate?: Date
): DatePickerError | undefined => {
  if (minDate && toDayKey(date) < toDayKey(minDate)) return 'beforeMin'
  if (maxDate && toDayKey(date) > toDayKey(maxDate)) return 'afterMax'
  return undefined
}

/**
 * Résultat de la lecture du texte : `value` est la valeur transmise (complète et valide),
 * `draft` ce qui a pu être lu, affiché dans le calendrier même quand la saisie est en erreur.
 */
interface Parsed<T> {
  value: T | undefined
  draft: T | undefined
  error?: DatePickerError
}

const parseSingleText = (text: string, minDate?: Date, maxDate?: Date): Parsed<Date> => {
  if (!text.trim()) return { value: undefined, draft: undefined }

  const date = parseDate(text)
  if (!date) return { value: undefined, draft: undefined, error: 'invalid' }

  const error = getBoundsError(date, minDate, maxDate)
  return error ? { value: undefined, draft: date, error } : { value: date, draft: date }
}

const parseRangeText = (text: string, minDate?: Date, maxDate?: Date): Parsed<DateRange> => {
  if (!text.trim()) return { value: undefined, draft: undefined }

  const parts = text.trim().split(RANGE_SPLIT_PATTERN).filter(Boolean)
  const from = parts.length <= 2 ? parseDate(parts[0]) : undefined
  const to = parts[1] !== undefined ? parseDate(parts[1]) : undefined
  if (!from || (parts[1] !== undefined && !to)) {
    return { value: undefined, draft: from ? { from, to: undefined } : undefined, error: 'invalid' }
  }

  const draft: DateRange = { from, to }
  const error =
    getBoundsError(from, minDate, maxDate) ??
    (to ? getBoundsError(to, minDate, maxDate) : undefined) ??
    (to && toDayKey(to) < toDayKey(from) ? 'rangeOrder' : undefined) ??
    (to ? undefined : 'incomplete')

  return error ? { value: undefined, draft, error } : { value: draft, draft }
}

/**
 * Complète la saisie au fil de la frappe : `/` après le jour et le mois, séparateur après
 * la première date d'une plage. N'agit que sur un caractère tapé en fin de champ, pour
 * laisser libres la suppression et la correction au milieu du texte. Permet la saisie au
 * clavier numérique des mobiles, qui n'a pas de touche `/`.
 */
const autoFormat = (previous: string, next: string, isRange: boolean) => {
  if (next.length !== previous.length + 1 || !next.startsWith(previous)) return next

  const typed = next.slice(-1)
  // Une barre tapée juste après une barre insérée automatiquement est ignorée
  if (typed === '/' && previous.endsWith('/')) return previous
  if (!/\d/.test(typed)) return next

  const head = isRange ? RANGE_HEAD_PATTERN.exec(next) : null
  // Date de début complète (saisie ou choisie au calendrier) suivie d'un chiffre : la date
  // de fin commence, le séparateur s'insère avant ce chiffre
  if (isRange && !head && DATE_PATTERN.test(previous.trim())) {
    return `${previous.trim()}${RANGE_SEPARATOR}${typed}`
  }

  const segment = head ? head[2] : next
  if (/^\d{2}$/.test(segment) || /^\d{1,2}\/\d{2}$/.test(segment)) return `${next}/`
  if (isRange && !head && DATE_PATTERN.test(segment)) return `${next}${RANGE_SEPARATOR}`

  return next
}

const getDefaultErrorMessage = (
  error: DatePickerError,
  isRange: boolean,
  minDate?: Date,
  maxDate?: Date
) => {
  switch (error) {
    case 'beforeMin':
      return `La date doit être postérieure ou égale au ${minDate ? formatDate(minDate) : ''}.`
    case 'afterMax':
      return `La date doit être antérieure ou égale au ${maxDate ? formatDate(maxDate) : ''}.`
    case 'rangeOrder':
      return 'La date de fin doit être postérieure à la date de début.'
    case 'incomplete':
      return 'Renseignez la date de fin de la période. Exemple\u00a0: 01/09/2026 – 15/09/2026'
    default:
      return isRange
        ? 'La période doit respecter le format JJ/MM/AAAA – JJ/MM/AAAA. Exemple\u00a0: 01/09/2026 – 15/09/2026'
        : 'La date doit respecter le format JJ/MM/AAAA. Exemple\u00a0: 14/07/1990'
  }
}

const getValueKey = (value: Date | DateRange | null | undefined, isRange: boolean) => {
  if (!value) return ''
  if (!isRange) return String(toDayKey(value as Date))

  const range = value as DateRange
  return `${range.from ? toDayKey(range.from) : ''}-${range.to ? toDayKey(range.to) : ''}`
}

/**
 * Sélecteur de date DSFR : champ de saisie au format JJ/MM/AAAA et calendrier dans une
 * fenêtre, pour une date ou une plage de dates.
 *
 * La saisie au clavier est complétée au fil de la frappe (barres, séparateur de plage),
 * lue et validée (format, date existante, bornes `minDate` / `maxDate`, ordre de la plage).
 * Le message d'erreur s'affiche à la sortie du champ ; la prop `error` reste prioritaire.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   label="Date de naissance"
 *   captionLayout="dropdown"
 *   minDate={new Date(1900, 0, 1)}
 *   maxDate={new Date()}
 *   value={birthDate}
 *   onValueChange={setBirthDate}
 * />
 *
 * <DatePicker mode="range" label="Période de congés" value={range} onValueChange={setRange} />
 * ```
 */
const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>((rawProps, ref) => {
  const {
    mode = 'single',
    value: valueProp,
    defaultValue,
    onValueChange,
    minDate,
    maxDate,
    captionLayout = 'label',
    numberOfMonths = 1,
    calendarLabel,
    errorMessages,
    hint,
    error: errorProp,
    disabled,
    readOnly,
    onBlur,
    ...inputProps
  } = rawProps as DatePickerBaseProps & {
    mode?: 'single' | 'range'
    value?: Date | DateRange | null
    defaultValue?: Date | DateRange
    onValueChange?: (value: Date | DateRange | undefined, details: DatePickerChangeDetails) => void
  }

  const isRange = mode === 'range'
  // `value={undefined}` reste contrôlé : un état React qui passe d'une date à `undefined`
  // vide le champ
  const isControlled = 'value' in rawProps

  const [localValue, setLocalValue] = React.useState<Date | DateRange | undefined>(defaultValue)
  const activeValue = isControlled ? (valueProp ?? undefined) : localValue

  const toText = React.useCallback(
    (value: Date | DateRange | undefined) =>
      isRange
        ? formatRange(value as DateRange | undefined)
        : value
          ? formatDate(value as Date)
          : '',
    [isRange]
  )

  const parseText = React.useCallback(
    (text: string): Parsed<Date> | Parsed<DateRange> =>
      isRange ? parseRangeText(text, minDate, maxDate) : parseSingleText(text, minDate, maxDate),
    [isRange, minDate, maxDate]
  )

  const [text, setText] = React.useState(() => toText(activeValue))
  const [blurred, setBlurred] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const rangeClicksRef = React.useRef(0)

  // Synchronisation du texte quand la valeur change de l'extérieur
  const activeValueKey = getValueKey(activeValue, isRange)
  const textRef = React.useRef(text)
  textRef.current = text
  // biome-ignore lint/correctness/useExhaustiveDependencies: la clé résume la valeur active
  React.useEffect(() => {
    const parsed = parseText(textRef.current)
    if (getValueKey(parsed.value, isRange) !== activeValueKey) {
      setText(toText(activeValue))
    }
  }, [activeValueKey])

  const commit = (
    nextValue: Date | DateRange | undefined,
    nextText: string,
    error?: DatePickerError
  ) => {
    setText(nextText)
    // Le message d'erreur attend la prochaine sortie du champ
    setBlurred(false)
    if (!isControlled) setLocalValue(nextValue)
    onValueChange?.(nextValue, { inputValue: nextText, error })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextText = autoFormat(text, event.target.value, isRange)
    const parsed = parseText(nextText)
    commit(parsed.value, nextText, parsed.error)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setBlurred(true)
    onBlur?.(event)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) rangeClicksRef.current = 0
    setOpen(nextOpen)
  }

  const handleSingleSelect = (date: Date | undefined) => {
    // Un clic sur le jour déjà sélectionné le confirme (react-day-picker transmettrait
    // `undefined` pour le désélectionner)
    if (date) commit(date, formatDate(date))
    setOpen(false)
  }

  const handleRangeSelect = (range: DateRange | undefined, triggerDate: Date) => {
    rangeClicksRef.current += 1
    // Le premier clic commence toujours une nouvelle plage, le second la termine
    const nextRange: DateRange | undefined =
      rangeClicksRef.current === 1 ? { from: triggerDate, to: undefined } : range
    const nextText = formatRange(nextRange)
    const parsed = parseText(nextText)
    commit(parsed.value, nextText, parsed.error)
    if (rangeClicksRef.current >= 2 && nextRange?.from && nextRange.to) setOpen(false)
  }

  const parsedText = parseText(text)
  const validationError = blurred ? parsedText.error : undefined
  const displayedError =
    errorProp ??
    (validationError
      ? (errorMessages?.[validationError] ??
        getDefaultErrorMessage(validationError, isRange, minDate, maxDate))
      : undefined)

  const resolvedCalendarLabel =
    calendarLabel ??
    (isRange ? 'Choisir une période dans le calendrier' : 'Choisir une date dans le calendrier')
  const resolvedHint =
    hint ??
    (isRange ? 'Format attendu\u00a0: JJ/MM/AAAA – JJ/MM/AAAA' : 'Format attendu\u00a0: JJ/MM/AAAA')

  const disabledDays: Matcher[] = []
  if (minDate) disabledDays.push({ before: minDate })
  if (maxDate) disabledDays.push({ after: maxDate })

  // Le calendrier montre ce qui a été lu, y compris une plage commencée
  const selectedSingle = isRange ? undefined : (parsedText.draft as Date | undefined)
  const selectedRange = isRange ? (parsedText.draft as DateRange | undefined) : undefined
  // Sans sélection, le calendrier s'ouvre sur le mois courant ramené dans les bornes
  const today = new Date()
  const boundedToday =
    minDate && toDayKey(today) < toDayKey(minDate)
      ? minDate
      : maxDate && toDayKey(today) > toDayKey(maxDate)
        ? maxDate
        : today
  const defaultMonth = (isRange ? selectedRange?.from : selectedSingle) ?? boundedToday
  const calendarProps = {
    autoFocus: true,
    locale: fr,
    captionLayout,
    numberOfMonths,
    startMonth: minDate,
    endMonth: maxDate,
    defaultMonth,
    disabled: disabledDays,
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <Input
        ref={ref}
        inputMode="numeric"
        autoComplete="off"
        maxLength={isRange ? 25 : 10}
        {...inputProps}
        value={text}
        onChange={handleInputChange}
        onBlur={handleBlur}
        hint={resolvedHint}
        error={displayedError}
        disabled={disabled}
        readOnly={readOnly}
        position="end"
        addon={
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="-mr-2"
              disabled={disabled || readOnly}
              aria-label={resolvedCalendarLabel}
              title={resolvedCalendarLabel}
              icon={<RiCalendarLineIcon aria-hidden="true" />}
            />
          </PopoverTrigger>
        }
      />
      <PopoverContent
        className="w-auto p-0"
        align="end"
        aria-label={resolvedCalendarLabel}
        // Le calendrier place lui-même le focus sur le jour sélectionné ou sur aujourd'hui
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        {isRange ? (
          <Calendar
            {...calendarProps}
            mode="range"
            selected={selectedRange}
            onSelect={handleRangeSelect}
          />
        ) : (
          <Calendar
            {...calendarProps}
            mode="single"
            selected={selectedSingle}
            onSelect={handleSingleSelect}
          />
        )}
      </PopoverContent>
    </Popover>
  )
})
DatePicker.displayName = 'DatePicker'

export { DatePicker }
