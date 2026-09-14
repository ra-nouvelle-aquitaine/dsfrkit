# Composant Range

> Curseur de sélection conforme au DSFR permettant de choisir une valeur numérique (ou un intervalle) sur une plage continue.

## Import
```tsx
import { Range } from '@dsfrkit/react'
import type { RangeProps } from '@dsfrkit/react'
```

## Usage recommandé
Curseur de sélection conforme au DSFR permettant de choisir une valeur numérique (ou un intervalle) sur une plage continue. Supporte label, texte d'aide, affichage de la valeur et message d'erreur.

## Documentation et exemples
Composant Range (Curseur) DSFR — fr-range
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/curseur

@example
```tsx
<Range label="Budget" min={0} max={100} showValue formatValue={(v) => \`\${v} €\`} />
```

## Props et types
```ts
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
```

## Storybook
Rubrique : `Inputs/Range`
