# Composant SkipLinks

## Import
```tsx
import { SkipLinks } from '@dsfrkit/react'
```

## Documentation et Usages
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
