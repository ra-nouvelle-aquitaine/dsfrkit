# Composant Navigation

> Navigation principale (fr-nav) et menu latéral (fr-sidemenu).

## Import
```tsx
import { Navigation, NavigationItem, NavigationMegaMenu, NavigationMegaMenuCategory, NavigationMenu, NavigationSection } from '@dsfrkit/react'
import type { NavigationItemProps, NavigationMegaMenuCategoryProps, NavigationMegaMenuLeader, NavigationMegaMenuProps, NavigationMenuProps, NavigationProps, NavigationSectionProps } from '@dsfrkit/react'
```

## Usage recommandé
Navigation principale (`fr-nav`) et menu latéral (`fr-sidemenu`).

**Navigation principale** (`orientation="horizontal"`, par défaut) :
- `NavigationItem` — lien direct ; `isActive` pose `aria-current="page"` et le soulignement bleu ;
- `NavigationMenu` — bouton qui déroule une liste de liens (menu) ;
- `NavigationMegaMenu` — bouton qui ouvre un panneau pleine largeur avec bouton « Fermer », accroche éditoriale facultative (`leader`) et colonnes `NavigationMegaMenuCategory`.

Un seul menu est ouvert à la fois. Il se referme avec **Échap** (le focus revient sur son bouton), au clic en dehors, quand le focus quitte la navigation ou quand un lien est activé. Sous le point de rupture `lg` (992px), les entrées s'empilent et les menus se déroulent sous leur bouton ; dans un `Header`, c'est le bouton burger de l'en-tête qui ouvre la navigation.

**Menu latéral** (`orientation="vertical"`) : `NavigationSection` regroupe des liens dans une section repliable.

## Documentation et exemples
Entrée de navigation qui déroule une liste de liens (`fr-menu`).
Placez des `NavigationItem` en enfants.

Entrée de navigation qui ouvre un méga-menu : panneau pleine largeur avec
bouton « Fermer », accroche facultative et `NavigationMegaMenuCategory`.

Colonne de liens d'un méga-menu (`fr-mega-menu__category` + `fr-mega-menu__list`).

Groupe de liens. En orientation verticale (menu latéral), section repliable ;
en orientation horizontale, équivalent de `NavigationMenu`.

## Props et types
```ts
export interface NavigationItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  /**
   * L'icône à afficher dans l'élément (ex: `<RemixIcon />`)
   */
  icon?: React.ReactNode
  /**
   * La position de l'icône ('start' ou 'end'). Par défaut: 'start'
   */
  iconPosition?: 'start' | 'end'
}

export interface NavigationMegaMenuCategoryProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Nom de la catégorie. */
  title: React.ReactNode
  /** Lien de la catégorie. Sans lien, le nom est affiché en texte. */
  href?: string
  /** Niveau du titre de catégorie. @default 'h5' */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

export interface NavigationMegaMenuLeader {
  /** Titre éditorialisé de la rubrique. */
  title: React.ReactNode
  /** Niveau du titre. @default 'h4' */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
  /** Texte d'accroche. */
  description?: React.ReactNode
  /** Lien vers la rubrique, ex. « Voir toute la rubrique ». */
  link?: { label: React.ReactNode; href: string }
}

export interface NavigationMegaMenuProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Intitulé du bouton d'ouverture. */
  title: React.ReactNode
  /** La page courante appartient à ce méga-menu. */
  isActive?: boolean
  /** Accroche éditoriale affichée au-dessus des catégories. */
  leader?: NavigationMegaMenuLeader
  /** Libellé du bouton de fermeture. @default 'Fermer' */
  closeLabel?: string
}

export interface NavigationMenuProps extends Omit<React.HTMLAttributes<HTMLLIElement>, 'title'> {
  /** Intitulé du bouton d'ouverture. */
  title: React.ReactNode
  /** La page courante appartient à ce menu (`aria-current` sur le bouton). */
  isActive?: boolean
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical'
  title?: string
  'aria-label'?: string
}

export interface NavigationSectionProps extends React.HTMLAttributes<HTMLLIElement> {
  title: string
  defaultOpen?: boolean
  isActive?: boolean
  /**
   * Si faux, la section est toujours ouverte et n'a pas de chevron de repli.
   * @default true
   */
  collapsible?: boolean
}
```

## Storybook
Rubrique : `Navigation/Navigation`
