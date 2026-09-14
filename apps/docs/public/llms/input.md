# Composant Input

> Champ de saisie texte simple.

## Import
```tsx
import { Input, inputVariants, PasswordInput, Textarea, textareaVariants } from '@dsfrkit/react'
import type { InputProps, TextareaProps } from '@dsfrkit/react'
```

## Usage recommandé
Champ de saisie texte simple. Inclut par défaut les labels, les textes d'aide et l'affichage des erreurs.

## Documentation et exemples
Variants de l'input DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie

L'input DSFR a un border-radius en haut seulement et une bordure inférieure épaisse

Composant Input DSFR

@example
```tsx
// Avec icône
<Input
  label="Rechercher un utilisateur"
  icon={<SearchIcon />}
  position="start"
/>

// Avec bouton d'action
<Input
  label="Nom de domaine"
  addon={<Button variant="ghost">Vérifier</Button>}
  position="end"
/>
```

Composant Textarea DSFR
Même style que l'input avec border-radius en haut et bordure inférieure

## Props et types
```ts
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
  /** Élément décoratif absolu injecté dans la zone de saisie */
  inputOverlay?: React.ReactNode
}

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
```

## Storybook
Rubrique : `Inputs/Input`
