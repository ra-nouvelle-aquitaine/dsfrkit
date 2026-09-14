# Composant Card

> Conteneur cliquable regroupant des informations hétérogènes (image, texte, actions) liées à un même sujet.

## Import
```tsx
import { Card, CardBody, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle, cardVariants } from '@dsfrkit/react'
import type { CardProps } from '@dsfrkit/react'
```

## Usage recommandé
Conteneur cliquable regroupant des informations hétérogènes (image, texte, actions) liées à un même sujet.

## Documentation et exemples
Variants de la carte DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/carte

Les cartes DSFR n'ont pas de border-radius et utilisent des bordures fines

Composant Card DSFR

@example
```tsx
<Card>
  <CardHeader>
    <CardTitle>Titre de la carte</CardTitle>
    <CardDescription>Description de la carte</CardDescription>
  </CardHeader>
  <CardContent>
    Contenu de la carte
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

En-tête de carte DSFR (pour l'image ou les badges, et très souvent les titres/descriptions)

Zone d'image de carte DSFR (`.fr-card__img`).

C'est le composant prévu par le DSFR pour porter une photographie : l'image
occupe toute la largeur de la carte dans un rapport 16/9 et est recadrée en
`cover`. La Tuile, elle, ne prévoit qu'une vignette carrée de 80 px destinée
aux pictogrammes.

Corps de carte DSFR
Conforme DSFR : padding latéral 16px, vertical 16px haut / 32px bas

Description de carte DSFR

Contenu de carte DSFR (alias de CardBody pour compatibilité)

Pied de carte DSFR — aligné sur le bas du body avec le bon padding

## Props et types
```ts
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}
```

## Storybook
Rubrique : `Data Display/Card`
