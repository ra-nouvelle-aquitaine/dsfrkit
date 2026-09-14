# Composant Indicator

> Petite pastille (souvent rouge) pour indiquer la présence d'une ou plusieurs notifications ou éléments non lus.

## Import
```tsx
import { Indicator, indicatorVariants } from '@dsfrkit/react'
import type { IndicatorProps } from '@dsfrkit/react'
```

## Usage recommandé
Petite pastille (souvent rouge) pour indiquer la présence d'une ou plusieurs notifications ou éléments non lus.

## Documentation et exemples
Composant générique permettant d'ajouter une pastille (notification, badge numérique)
sur n'importe quel élément (souvent une icône).

@example
```tsx
<Indicator count={5}>
  <NotificationIcon />
</Indicator>
```

## Props et types
```ts
export interface IndicatorProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof indicatorVariants> {
  /** The element to wrap with the indicator */
  children: React.ReactNode
  /** Number to display inside the indicator (if size is not 'dot') */
  count?: number
  /** Maximum number to display before showing a plus sign (e.g. 99+) */
  max?: number
  /** Whether the indicator is visible */
  show?: boolean
}
```

## Storybook
Rubrique : `Data Display/Indicator`
