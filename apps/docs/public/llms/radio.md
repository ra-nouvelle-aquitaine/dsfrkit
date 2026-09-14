# Composant RadioGroup

> Bouton radio de sélection unique.

## Import
```tsx
import { RadioGroup, RadioGroupItem, radioVariants } from '@dsfrkit/react'
import type { RadioGroupItemProps } from '@dsfrkit/react'
```

## Usage recommandé
Bouton radio de sélection unique. L'utilisateur doit choisir une et une seule option parmi plusieurs.

**Quand l'utiliser ?** Pour des choix mutuellement exclusifs ayant peu d'options (ex: "Oui / Non", "Particulier / Professionnel").

**Alternatives :** Pour de très nombreuses options exclusives, préférez une liste déroulante (`Select`). Pour permettre des choix multiples, utilisez `Checkbox`.

## Documentation et exemples
Composant Radio DSFR
Utilise Radix UI Radio Group pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bouton-radio

@example
```tsx
<RadioGroup defaultValue="1">
  <RadioGroupItem value="1" label="Option 1" hint="Détails" />
  <RadioGroupItem value="2" label="Option 2" />
</RadioGroup>

// Radio riche avec pictogramme (fr-radio-rich)
<RadioGroup defaultValue="mairie">
  <RadioGroupItem
    value="mairie"
    label="En mairie"
    pictogram={<Artwork name="buildings/city-hall" size={56} />}
  />
</RadioGroup>
```

## Props et types
```ts
export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof radioVariants> {
  /** Label du radio */
  label?: string
  /** Texte d'aide */
  hint?: string
  /**
   * Pictogramme décoratif (ex. `<Artwork name="buildings/city-hall" />`).
   * Active la présentation « riche » du DSFR (`fr-radio-rich`) : l'option
   * devient une carte bordée, pictogramme à droite. Le pictogramme est masqué
   * des technologies d'assistance ; le libellé reste le nom accessible.
   */
  pictogram?: React.ReactNode
}
```

## Storybook
Rubrique : `Inputs/Radio`
