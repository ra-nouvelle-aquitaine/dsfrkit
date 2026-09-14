# Composant SkipLinks

> Liens d'évitement au début du document améliorant grandement l'accessibilité pour la navigation au clavier.

## Import
```tsx
import { SkipLinks } from '@dsfrkit/react'
import type { SkipLink, SkipLinksProps } from '@dsfrkit/react'
```

## Usage recommandé
Liens d'évitement au début du document améliorant grandement l'accessibilité pour la navigation au clavier.

## Documentation et exemples
Composant SkipLinks (Liens d'évitement) DSFR

Permet aux utilisateurs de clavier de naviguer rapidement vers les zones principales.
Les liens sont visibles uniquement au focus.

@example
```tsx
// Avec les liens par défaut
<SkipLinks />

// Avec des liens personnalisés
<SkipLinks
  links={[
    { targetId: 'main', label: 'Aller au contenu principal' },
    { targetId: 'search', label: 'Aller à la recherche' },
  ]}
/>
```

## Props et types
```ts
export interface SkipLink {
  /**
   * ID de l'élément cible (sans le #)
   */
  targetId: string
  /**
   * Libellé du lien
   */
  label: string
}

export interface SkipLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Liste des liens d'évitement
   */
  links?: SkipLink[]
}
```

## Storybook
Rubrique : `Navigation/SkipLinks`
