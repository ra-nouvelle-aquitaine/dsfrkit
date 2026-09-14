# Composant Tag

> Étiquette représentant un mot-clé ou une catégorie, statique, navigable ou sélectionnable selon le mode.

## Import
```tsx
import { Tag } from '@dsfrkit/react'
import type { TagProps } from '@dsfrkit/react'
```

## Usage recommandé
Étiquette représentant un mot-clé ou une catégorie, statique, navigable ou sélectionnable selon le mode.

**Quand l'utiliser ?** Pour des filtres de listes, des catégories d'articles ou la suppression d'options multiples. Le `Badge` exprime plutôt un statut.

## Documentation et exemples
Tag DSFR — catégoriser, filtrer ou sélectionner du contenu.

@example
// Statique
<Tag>Catégorie</Tag>
<Tag variant="info">Info</Tag>

// Lien cliquable
<Tag clickable href="/page">Voir plus</Tag>

// Sélectionnable (checkbox)
<Tag pressable onSelectedChange={(v) => console.log(v)}>Filtre</Tag>

// Supprimable
<Tag dismissible onDismiss={() => setVisible(false)}>Actif</Tag>

## Props et types
```ts
export type TagProps = {
  variant?: TagVariant
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
  className?: string
  children?: React.ReactNode
} & TagMode &
  Omit<React.HTMLAttributes<HTMLElement>, 'onClick'>
```

## Storybook
Rubrique : `Data Display/Tag`
