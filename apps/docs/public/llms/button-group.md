# Composant ButtonGroup

> Regroupe plusieurs actions connexes de manière visuellement cohérente.

## Import
```tsx
import { ButtonGroup, ButtonGroupItem, buttonGroupItemVariants, buttonGroupVariants } from '@dsfrkit/react'
import type { ButtonGroupItemProps, ButtonGroupMultipleProps, ButtonGroupProps, ButtonGroupSingleProps } from '@dsfrkit/react'
```

## Usage recommandé
Regroupe plusieurs actions connexes de manière visuellement cohérente.

## Documentation et exemples
Contrôle segmenté DSFR — fr-segmented
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/controle-segmente

Structure DSFR : le groupe a un fond neutre, l'élément actif a une bordure inset primary.

Composant ButtonGroup / Contrôle segmenté DSFR

@example
```tsx
<ButtonGroup type="single" defaultValue="carte">
  <ButtonGroupItem value="carte">Carte</ButtonGroupItem>
  <ButtonGroupItem value="liste">Liste</ButtonGroupItem>
  <ButtonGroupItem value="tableau">Tableau</ButtonGroupItem>
</ButtonGroup>
```

## Props et types
```ts
export interface ButtonGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> {}

export interface ButtonGroupMultipleProps extends ButtonGroupBaseProps {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type ButtonGroupProps = ButtonGroupSingleProps | ButtonGroupMultipleProps

export interface ButtonGroupSingleProps extends ButtonGroupBaseProps {
  type: 'single'
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}
```

## Storybook
Rubrique : `Inputs/ButtonGroup`
