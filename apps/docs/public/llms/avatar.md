# Composant Avatar

> Affiche une image de profil, des initiales ou une icône représentant un utilisateur ou une entité.

## Import
```tsx
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarImage, avatarVariants } from '@dsfrkit/react'
import type { AvatarBadgeProps, AvatarFallbackProps, AvatarProps } from '@dsfrkit/react'
```

## Usage recommandé
Affiche une image de profil, des initiales ou une icône représentant un utilisateur ou une entité.

## Documentation et exemples
Utilisé pour ajouter un statut (en ligne, notifications) sur l'avatar.
C'est un simple wrapper autour du composant Indicator.

## Props et types
```ts
export interface AvatarBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Indicator>, 'children'> {}

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  /** Si true, applique une couleur d'accentuation aléatoire basée sur le text children */
  autoColor?: boolean
}

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}
```

## Storybook
Rubrique : `Data Display/Avatar`
