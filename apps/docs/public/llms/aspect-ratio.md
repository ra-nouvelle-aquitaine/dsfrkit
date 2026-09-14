# Composant AspectRatio

> Affiche du contenu dans un ratio d'aspect spécifique (ex: 16/9, 4/3, 1/1).

## Import
```tsx
import { AspectRatio } from '@dsfrkit/react'
```

## Usage recommandé
Affiche du contenu dans un ratio d'aspect spécifique (ex: 16/9, 4/3, 1/1). 
        Très utile pour les images, les vidéos (iframes) et les cartes, afin d'éviter les sauts de mise en page pendant le chargement (Cumulative Layout Shift).

## Documentation et exemples
Composant AspectRatio
Affiche du contenu dans un ratio d'aspect spécifique (ex: 16/9, 4/3, 1/1).

@example
```tsx
<AspectRatio ratio={16 / 9} className="bg-muted">
  <img src="..." alt="Décoratif" className="object-cover w-full h-full" />
</AspectRatio>
```

## Storybook
Rubrique : `Layout/AspectRatio`
