# Composant Tabs

## Import
```tsx
import { Tabs } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Tabs DSFR
Utilise Radix UI Tabs pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/onglet
Les onglets DSFR ont une bordure inférieure (horizontal) ou latérale (vertical) et un style spécifique pour l'onglet actif.
Radix UI place `data-orientation="horizontal|vertical"` sur chaque élément – les classes Tailwind
`data-[orientation=*]:` permettent d'adapter le layout sans JS supplémentaire.

Exemple d'utilisation :
```tsx
// Horizontal (défaut)
<Tabs defaultValue="tab1">
<TabsList>
<TabsTrigger value="tab1">Onglet 1</TabsTrigger>
<TabsTrigger value="tab2">Onglet 2</TabsTrigger>
</TabsList>
<TabsContent value="tab1">Contenu 1</TabsContent>
<TabsContent value="tab2">Contenu 2</TabsContent>
</Tabs>
// Vertical
<Tabs defaultValue="tab1" orientation="vertical" className="flex gap-4">
<TabsList>
<TabsTrigger value="tab1">Onglet 1</TabsTrigger>
<TabsTrigger value="tab2">Onglet 2</TabsTrigger>
</TabsList>
<TabsContent value="tab1">Contenu 1</TabsContent>
<TabsContent value="tab2">Contenu 2</TabsContent>
</Tabs>
```
