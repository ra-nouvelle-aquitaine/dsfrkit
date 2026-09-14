# Composant Badge

> Met en évidence une caractéristique visuelle ou un état (ex: "Nouveau", "En cours", "Succès").

## Import
```tsx
import { Badge, badgeVariants } from '@dsfrkit/react'
import type { BadgeProps } from '@dsfrkit/react'
```

## Usage recommandé
Met en évidence une caractéristique visuelle ou un état (ex: "Nouveau", "En cours", "Succès").

**Quand l'utiliser ?** Pour afficher un simple indicateur visuel (statut métier) **strictement non conventionnel et non cliquable**.

**Alternative :** S'il s'agit d'un filtre interactif ou d'un lien catégoriel cliquable, utilisez obligatoirement un `Tag`.

## Documentation et exemples
Composant Badge DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/badge

Badge pour afficher des statuts, des labels ou des compteurs

@example
```tsx
<Badge>Par défaut</Badge>
<Badge variant="success">Validé</Badge>
<Badge variant="error" noIcon>Erreur sans icône</Badge>
<Badge variant="new">Nouveau</Badge>
```

## Props et types
```ts
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Icône optionnelle personnalisée à afficher avant le texte. Remplace l'icône par défaut du statut. */
  icon?: React.ReactNode
  /** Permet de masquer l'icône associée par défaut au statut (Succès, Erreur, Info, Attention, Nouveau) */
  noIcon?: boolean
}
```

## Storybook
Rubrique : `Data Display/Badge`
