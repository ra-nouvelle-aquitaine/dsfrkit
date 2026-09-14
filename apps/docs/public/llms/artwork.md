# Composant Artwork

> Pictogrammes officiels du DSFR avec 3 couches personnalisables :

## Import
```tsx
import { Artwork, allPictograms, artworkByName, artworkDark, artworkLight, artworkSystem, artworks, pictogramsByCategory } from '@dsfrkit/react'
import type { ArtworkData, ArtworkProps } from '@dsfrkit/react'
```

## Usage recommandé
Pictogrammes officiels du DSFR avec 3 couches personnalisables :

- **Major** — élément principal de l'illustration (couleur bleu France par défaut : `var(--artwork-major-blue-france)`)
- **Minor** — éléments secondaires (rouge Marianne par défaut : `var(--artwork-minor-red-marianne)`)
- **Decorative** — points décoratifs (`var(--artwork-decorative-blue-france)` par défaut)

Utilisation simple via la prop `name` :

```tsx
<Artwork name="environment/sun" size={80} />
<Artwork name="system/error" majorColor="red" />
<Artwork name="light" />
```

**${allPictograms.length} pictogrammes DSFR** répartis en 10 catégories.

## Documentation et exemples
Composant Artwork / Pictogramme DSFR

Affiche un pictogramme officiel du DSFR avec ses 3 couches :
- **decorative** : petits points décoratifs en arrière-plan
- **minor** : éléments secondaires de l'illustration
- **major** : élément principal de l'illustration

@example
```tsx
<Artwork name="environment/sun" size={80} />
<Artwork name="system/error" majorColor="red" />
<Artwork name="health/doctor" size={120} />
```

 Pictogramme Soleil (thème clair)

 Pictogramme Lune (thème sombre)

 Pictogramme Système (engrenage)

 Liste des pictogrammes de thème

## Props et types
```ts
/**
 * Données SVG d'un pictogramme DSFR.
 * Chaque couche (decorative, minor, major) contient un chemin SVG (path `d`).
 */
export interface ArtworkData {
  /** Nom du pictogramme */
  name: string
  /** Catégorie du pictogramme */
  category: string
  /** Couche décorative (petits points d'arrière-plan) */
  decorative: string
  /** Couche mineure (éléments secondaires) */
  minor: string
  /** Couche majeure (élément principal) */
  major: string
}

export interface ArtworkProps extends React.SVGAttributes<SVGElement> {
  /**
   * Nom du pictogramme au format "catégorie/nom".
   * Ex: "environment/sun", "system/error", "health/doctor"
   */
  name?: string
  /**
   * Données brutes du pictogramme (alternative à `name`).
   * @deprecated Préférer la prop `name` pour une API plus simple.
   */
  artwork?: ArtworkData
  /** Couleur de la couche décorative */
  decorativeColor?: string
  /** Couleur de la couche mineure */
  minorColor?: string
  /** Couleur de la couche majeure */
  majorColor?: string
  /** Opacité de la couche décorative (0-1) */
  decorativeOpacity?: number
  /** Opacité de la couche mineure (0-1) */
  minorOpacity?: number
  /** Taille du pictogramme */
  size?: number | string
  className?: string
}
```

## Storybook
Rubrique : `Branding/Artwork`
