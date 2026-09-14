# Composant Follow

> Lettre d'information et réseaux sociaux (fr-follow) : bandeau bleu clair placé en bas de page, avant le pied de page, qui invite à suivre l'actualité du site.

## Import
```tsx
import { Follow, FollowDescription, FollowNewsletter, FollowNewsletterForm, FollowSocial, FollowSocialLink, FollowTitle } from '@dsfrkit/react'
import type { FollowNewsletterFormProps, FollowNewsletterProps, FollowSocialLinkProps, FollowSocialNetwork, FollowSocialProps, FollowTitleProps } from '@dsfrkit/react'
```

## Usage recommandé
Lettre d'information et réseaux sociaux (`fr-follow`) : bandeau bleu clair placé en bas de page, avant le pied de page, qui invite à suivre l'actualité du site.

**Composition :**
- `FollowNewsletter` — titre, accroche et action : un bouton vers une page d'inscription, ou `FollowNewsletterForm` pour s'inscrire directement ;
- `FollowSocial` — liste de `FollowSocialLink` (`network="facebook" | "twitter-x" | "linkedin" | …`), ouverts dans une nouvelle fenêtre.

Les deux blocs côte à côte occupent 8 et 4 colonnes, séparés par un filet. Seul, un bloc prend toute la largeur avec l'accroche à gauche et l'action à droite.

**Titre des réseaux sociaux :** `FollowSocial` ajoute « Suivez-nous sur les réseaux sociaux » quand ses enfants sont des `FollowSocialLink` (`title` pour le changer, `title={null}` pour le retirer). Une composition libre (titre et boutons fournis en enfants, comme en 1.2) est rendue telle quelle.

## Documentation et exemples
 Titre d'un bloc, au style `fr-h5`.

 Texte d'accroche de la lettre d'information (`fr-text--sm`).

Bloc « Lettre d'information ». Passez `title` / `description` et placez
l'action (`FollowNewsletterForm` ou un simple `Button`) en enfant.

Formulaire d'inscription à la lettre d'information : champ courriel accolé
au bouton (empilés sur mobile), mention légale et messages d'état.

Bloc « Réseaux sociaux ». Placez les `FollowSocialLink` en enfants directs
(ou un tableau) : chacun est rendu dans un élément de liste.

Lien vers un réseau social : bouton icône bleu France sans fond, ouvert
dans une nouvelle fenêtre et annoncé comme tel.

## Props et types
```ts
export interface FollowNewsletterFormProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Libellé du champ, masqué visuellement comme dans le DSFR. */
  label?: string
  /** Texte indicatif du champ. Par défaut : le libellé. */
  placeholder?: string
  /** Intitulé du bouton. @default "S'abonner" */
  buttonLabel?: string
  /** Attribut `title` du bouton. @default 'S‘abonner à notre lettre d’information' */
  buttonTitle?: string
  /** Mention légale sous le champ. Passez `null` pour la masquer. */
  hint?: React.ReactNode
  /** Message d'erreur (adresse invalide…). */
  error?: string
  /** Message de confirmation (inscription réussie…). */
  success?: string
  /** Valeur contrôlée du champ. */
  value?: string
  /** Valeur initiale du champ (non contrôlé). */
  defaultValue?: string
  /** Changement de la valeur du champ. */
  onValueChange?: (value: string) => void
  /** Soumission du formulaire, avec l'adresse saisie. */
  onSubmit?: (email: string, event: React.FormEvent<HTMLFormElement>) => void
  /** Désactive le champ et le bouton. */
  disabled?: boolean
}

export interface FollowNewsletterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Titre du bloc (rendu avec `FollowTitle`). */
  title?: React.ReactNode
  /** Niveau du titre. @default 'h2' */
  titleAs?: FollowTitleProps['as']
  /** Texte d'accroche (rendu avec `FollowDescription`). */
  description?: React.ReactNode
}

export interface FollowSocialLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Réseau social : fixe l'icône et le nom accessible par défaut. */
  network: FollowSocialNetwork
  /** Adresse de la page de l'organisation sur ce réseau. */
  href: string
  /** Nom accessible du lien. Par défaut, le nom du réseau. */
  label?: string
  /** Taille du bouton : 40px (md) ou 48px (lg). @default 'md' */
  size?: 'md' | 'lg'
}

export type FollowSocialNetwork = keyof typeof socialNetworks

export interface FollowSocialProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Titre du bloc (`null` pour le masquer). @default 'Suivez-nous sur les réseaux sociaux' */
  title?: React.ReactNode
  /** Niveau du titre. @default 'h2' */
  titleAs?: FollowTitleProps['as']
}

export interface FollowTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Niveau de titre, à adapter à la hiérarchie de la page. @default 'h2' */
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
```

## Storybook
Rubrique : `Branding/Follow`
