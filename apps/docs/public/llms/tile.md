# Composant Tile

> Tuile cliquable (généralement rectangulaire) avec une grande surface d'activation redirigeant vers une autre page.

## Import
```tsx
import { Tile, TileGrid } from '@dsfrkit/react'
import type { TileProps } from '@dsfrkit/react'
```

## Usage recommandé
Tuile cliquable (généralement rectangulaire) avec une grande surface d'activation redirigeant vers une autre page.

## Documentation et exemples
Tuile DSFR

@example
// Tuile simple
<Tile title="Démarches en ligne" description="Effectuez vos démarches" href="/demarches" />

// Tuile avec icône
<Tile title="Contact" icon={<MailIcon />} href="/contact" />

// Tuile horizontale
<Tile variant="horizontal" title="Document" description="Consulter le document" href="#" />

// Tuile téléchargement
<Tile variant="download" title="Formulaire CERFA" detail="PDF – 120 Ko" href="/doc.pdf" />

Grille de tuiles DSFR

## Props et types
```ts
export interface TileProps {
  /** Titre principal de la tuile */
  title: string
  /** Description sous le titre */
  description?: string
  /** Lien de la tuile (rend la tuile cliquable) */
  href?: string
  /** Icône ou image affichée dans la zone supérieure */
  icon?: React.ReactNode
  /** Image affichée dans la zone image (src) */
  imageSrc?: string
  /** Alt de l'image */
  imageAlt?: string
  /** Variante de la tuile */
  variant?: 'default' | 'horizontal' | 'download'
  /** Taille */
  size?: 'sm' | 'md' | 'lg'
  /** Désactiver l'état hover/focus */
  disabled?: boolean
  /** Badge/tag à afficher dans la tuile */
  badge?: React.ReactNode
  /** Détail supplémentaire (type de fichier, poids…) */
  detail?: string
  /** Classes CSS supplémentaires */
  className?: string
  /** Attribut target du lien */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target']
  /** Attribut rel du lien */
  rel?: string
}
```

## Storybook
Rubrique : `Data Display/Tile`
