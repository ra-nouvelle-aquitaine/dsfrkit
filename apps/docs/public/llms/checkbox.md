# Composant Checkbox

> Sélection multiple d'options au sein d'un formulaire.

## Import
```tsx
import { Checkbox, checkboxVariants } from '@dsfrkit/react'
import type { CheckboxProps } from '@dsfrkit/react'
```

## Usage recommandé
Sélection multiple d'options au sein d'un formulaire. L'utilisateur peut cocher aucune, une ou plusieurs cases.

**Quand l'utiliser ?** Pour des questions à choix multiples (ex: "Sélectionnez vos langages préférés").

**Alternatives :** Si l'action a un effet technique direct sans bouton "Enregistrer" à la fin de la page, utilisez plutôt un `Toggle`. Si les choix sont mutuellement exclusifs, utilisez `Radio`.

## Documentation et exemples
Checkbox accessible avec label et états

@example
```tsx
<Checkbox label="J'accepte les conditions" />
<Checkbox label="Newsletter" hint="Recevez nos actualités" />
<Checkbox label="Obligatoire" error="Ce champ est requis" variant="error" />
```

## Props et types
```ts
export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  /** Label du checkbox */
  label?: string
  /** Texte d'aide */
  hint?: string
  /** Message d'erreur */
  error?: string
}
```

## Storybook
Rubrique : `Inputs/Checkbox`
