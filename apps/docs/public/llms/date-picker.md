# Composant DatePicker

> Sélecteur de date : champ de saisie au format JJ/MM/AAAA et calendrier dans une fenêtre, pour une date ou une plage de dates.

## Import
```tsx
import { DatePicker } from '@dsfrkit/react'
import type { DatePickerChangeDetails, DatePickerError, DatePickerProps, DatePickerRangeProps, DatePickerSingleProps, DateRange } from '@dsfrkit/react'
```

## Usage recommandé
Sélecteur de date : champ de saisie au format JJ/MM/AAAA et calendrier dans une fenêtre, pour une date ou une plage de dates.

**Quand l'utiliser ?**
- Pour toute saisie de date : il remplace `<input type="date">`, dont le calendrier natif ne suit pas le DSFR et change selon le navigateur.

**Comportement**
- La saisie au clavier est complétée au fil de la frappe (barres, séparateur de plage) : le clavier numérique des mobiles suffit.
- La saisie est lue et validée : format, date existante, bornes `minDate` / `maxDate`, ordre de la plage. Le message s'affiche à la sortie du champ ; la prop `error` reste prioritaire.
- `onValueChange` reçoit la date (ou la plage) et `{ inputValue, error }` ; la date vaut `undefined` tant que la saisie est incomplète ou invalide.

## Documentation et exemples
Sélecteur de date DSFR : champ de saisie au format JJ/MM/AAAA et calendrier dans une
fenêtre, pour une date ou une plage de dates.

La saisie au clavier est complétée au fil de la frappe (barres, séparateur de plage),
lue et validée (format, date existante, bornes `minDate` / `maxDate`, ordre de la plage).
Le message d'erreur s'affiche à la sortie du champ ; la prop `error` reste prioritaire.

@example
```tsx
<DatePicker
  label="Date de naissance"
  captionLayout="dropdown"
  minDate={new Date(1900, 0, 1)}
  maxDate={new Date()}
  value={birthDate}
  onValueChange={setBirthDate}
/>

<DatePicker mode="range" label="Période de congés" value={range} onValueChange={setRange} />
```

## Props et types
```ts
/** Informations transmises avec chaque changement de valeur. */
export interface DatePickerChangeDetails {
  /** Texte saisi dans le champ, tel quel. */
  inputValue: string
  /** Erreur de validation de la saisie, `undefined` si la saisie est vide ou valide. */
  error?: DatePickerError
}

/** Erreur de validation détectée sur la saisie au clavier. */
export type DatePickerError = 'invalid' | 'incomplete' | 'beforeMin' | 'afterMax' | 'rangeOrder'

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps

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
```

## Storybook
Rubrique : `Inputs/DatePicker`
