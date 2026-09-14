# Composant Text

> Composant standard de base pour l'affichage de la grande majorité des textes, paragraphes, mentions ou labels.

## Import
```tsx
import { Text } from '@dsfrkit/react'
import type { TextProps } from '@dsfrkit/react'
```

## Usage recommandé
Composant standard de base pour l'affichage de la grande majorité des textes, paragraphes, mentions ou labels.

**Quand l'utiliser ?** Pour tout texte continu dans les interfaces. Sémantiquement, il rendra une balise `p` (paragraphe) ou `span` (texte en ligne) afin de respecter la sémantique HTML sans casser l'accessibilité.

**Alternative :** Surtout, ne l'utilisez jamais pour faire des titres simulés avec un texte gros et gras. Pour concevoir la hiérarchie logique et titrer la page, utilisez impérativement le composant `Heading`.

## Props et types
```ts
export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'b' | 'i'
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  weight?: 'light' | 'regular' | 'medium' | 'bold'
  asChild?: boolean
}
```

## Storybook
Rubrique : `Typography/Text`
