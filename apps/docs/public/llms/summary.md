# Composant Summary

> Sommaire (fr-summary) : liste numérotée des sections d'une page longue, placée en haut du contenu pour y accéder directement.

## Import
```tsx
import { Summary } from '@dsfrkit/react'
import type { SummaryItem, SummaryProps } from '@dsfrkit/react'
```

## Usage recommandé
Sommaire (`fr-summary`) : liste numérotée des sections d'une page longue, placée en haut du contenu pour y accéder directement.

**Quand l'utiliser ?** Sur une page de contenu dense (fiche pratique, article, mentions légales) comportant plusieurs sections titrées. Les liens pointent vers les ancres des titres (`id`) ; une adresse interne (`/…`) passe par le routeur configuré avec `RouterProvider`.

**Structure :** `items` décrit les entrées ; chaque entrée peut porter des `items` numérotés à sa suite (1.1, 1.2…). Le titre est un `h2` par défaut (`titleAs` pour l'adapter à la hiérarchie de la page).

## Documentation et exemples
Composant Summary (Sommaire) DSFR — `fr-summary`
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/sommaire

Liste numérotée des sections d'une page longue, placée en haut du contenu.
Fond `--background-contrast-grey`, texte 12px, titre en capitales, sous-sections
numérotées à la suite de leur parent (1., 1.1., 1.2.). Les liens pointent vers les
ancres des titres de la page ; une adresse interne (`/…`) passe par le routeur.

@example
```tsx
<Summary
  items={[
    { label: 'Conditions', href: '#conditions' },
    {
      label: 'Démarche',
      href: '#demarche',
      items: [
        { label: 'Documents à fournir', href: '#documents' },
        { label: 'Délais', href: '#delais' },
      ],
    },
    { label: 'Recours', href: '#recours' },
  ]}
/>
```

## Props et types
```ts
export interface SummaryItem {
  /** Intitulé du lien, en général le titre de la section visée. */
  label: React.ReactNode
  /** Ancre de la section (`#identifiant`) ou adresse d'une page. */
  href: string
  /** Sous-sections, numérotées à la suite du parent (1.1, 1.2…). */
  items?: SummaryItem[]
}

export interface SummaryProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Entrées du sommaire, sur un ou plusieurs niveaux. */
  items: SummaryItem[]
  /** Titre du sommaire. @default 'Sommaire' */
  title?: React.ReactNode
  /** Niveau du titre, à adapter à la hiérarchie de la page. @default 'h2' */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}
```

## Storybook
Rubrique : `Navigation/Summary`
