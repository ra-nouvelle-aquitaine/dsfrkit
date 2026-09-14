# Composant Autocomplete

> Champ de saisie textuelle avec autocomplétion (Liste déroulante riche / Combobox).

## Import
```tsx
import { Autocomplete } from '@dsfrkit/react'
import type { AutocompleteMultipleProps, AutocompleteOption, AutocompleteOptionFilterState, AutocompleteOptionGroup, AutocompleteOptionRenderState, AutocompleteProps, AutocompleteSingleProps } from '@dsfrkit/react'
```

## Usage recommandé
Champ de saisie textuelle avec autocomplétion (Liste déroulante riche / Combobox).
        
Conforme aux recommandations d'ergonomie et d'accessibilité du Système de Design de l'État (DSFR).

**Quand l'utiliser ?**
- Pour guider l'utilisateur dans une longue liste de choix (ex: pays, départements, référentiels métiers).
- Pour proposer des suggestions de recherche tout en autorisant la saisie libre.

## Props et types
```ts
export interface AutocompleteMultipleProps extends AutocompleteBaseProps {
  /** Mode sélection multiple : la valeur devient un tableau et les choix s'affichent en tags supprimables. */
  multiple: true
  /** Valeurs sélectionnées (mode contrôlé) */
  value?: string[]
  /** Valeurs initiales par défaut (mode non contrôlé) */
  defaultValue?: string[]
  /** Callback déclenché à chaque modification de la sélection */
  onValueChange?: (value: string[]) => void
}

export interface AutocompleteOption {
  value: string
  label: string
  disabled?: boolean
  description?: string
  /** Identifiant du groupe d'options auquel rattacher cette suggestion. */
  group?: string
  /** Termes additionnels pris en compte par le filtrage par défaut. */
  keywords?: string[]
  /**
   * Données libres attachées à l'option (ex: `avatarUrl`, `icon`, `email`...).
   * Exploitables dans `renderOption` pour personnaliser l'affichage d'une ligne.
   */
  [key: string]: unknown
}

/** État transmis à `filterOption` pour personnaliser le filtrage des suggestions. */
export interface AutocompleteOptionFilterState {
  /** Texte saisi par l'utilisateur, sans transformation. */
  query: string
  /** Texte de recherche normalisé (minuscules, sans accents, espaces compactés). */
  normalizedQuery: string
}

/** Groupe d'options affiché dans la liste de suggestions. */
export interface AutocompleteOptionGroup {
  /** Identifiant référencé par `AutocompleteOption.group`. */
  value: string
  /** Libellé affiché en en-tête de groupe. */
  label: React.ReactNode
}

/** État transmis à `renderOption` pour personnaliser l'affichage d'une suggestion. */
export interface AutocompleteOptionRenderState {
  /** L'option est-elle sélectionnée ? */
  selected: boolean
  /** Texte de recherche courant */
  query: string
  /** Libellé prêt à l'emploi, avec la portion recherchée surlignée (selon `highlightMatches`) */
  highlightedLabel: React.ReactNode
}

export type AutocompleteProps = AutocompleteSingleProps | AutocompleteMultipleProps

export interface AutocompleteSingleProps extends AutocompleteBaseProps {
  /** Mode sélection simple (par défaut). */
  multiple?: false
  /** Valeur sélectionnée (mode contrôlé) */
  value?: string
  /** Valeur initiale par défaut (mode non contrôlé) */
  defaultValue?: string
  /** Callback déclenché à la sélection ou modification de la valeur */
  onValueChange?: (value: string) => void
  /**
   * Si vrai, autorise la saisie de valeurs personnalisées non présentes dans les options.
   * Si faux (par défaut), force la sélection d'une option de la liste.
   * Non disponible en mode `multiple`.
   */
  allowCustomValue?: boolean
}
```

## Storybook
Rubrique : `Inputs/Autocomplete`
