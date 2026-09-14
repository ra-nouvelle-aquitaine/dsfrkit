# Composant Select

> Menu déroulant pour la sélection d'une option parmi une liste fermée.

## Import
```tsx
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue } from '@dsfrkit/react'
import type { SelectTriggerProps } from '@dsfrkit/react'
```

## Usage recommandé
Menu déroulant pour la sélection d'une option parmi une liste fermée.

**Quand l'utiliser ?** Typiquement au sein des formulaires HTML ou applicatifs standards où une valeur précise doit être sélectionnée par l'utilisateur parmi une liste d'états (ex: Civilite, Département).

**Alternatives :** Pour déclencher des *actions* applicatives (Dupliquer, Supprimer, Mettre en veille) depuis un bouton menu, utilisez plutôt `DropdownMenu`.

## Documentation et exemples
Composant Select DSFR
Utilise Radix UI Select pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liste-deroulante

## Props et types
```ts
export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectTriggerVariants> {}
```

## Storybook
Rubrique : `Inputs/Select`
