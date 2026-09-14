# Composant Tabs

> Système d'onglets pour alterner l'affichage de plusieurs vues ou catégories de contenu sur le même espace.

## Import
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@dsfrkit/react'
```

## Usage recommandé
Système d'onglets pour alterner l'affichage de plusieurs vues ou catégories de contenu sur le même espace.

## Documentation et exemples
Composant Tabs DSFR
Utilise Radix UI Tabs pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/onglet

Les onglets DSFR ont une bordure inférieure (horizontal) ou latérale (vertical) et un style spécifique pour l'onglet actif.
Radix UI place `data-orientation="horizontal|vertical"` sur chaque élément – les classes Tailwind
`data-[orientation=*]:` permettent d'adapter le layout sans JS supplémentaire.

## Storybook
Rubrique : `Navigation/Tabs`
