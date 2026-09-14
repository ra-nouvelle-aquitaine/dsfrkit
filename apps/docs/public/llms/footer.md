# Composant Footer

> Pied de page DSFR (fr-footer).

## Import
```tsx
import { Footer, FooterBody, FooterBottom, FooterBrand, FooterContent, FooterLegalLinks, FooterLinks, FooterTop, footerInstitutionalLinks } from '@dsfrkit/react'
import type { FooterBottomProps, FooterBrandProps, FooterContentLink, FooterContentProps, FooterLinksProps, FooterProps } from '@dsfrkit/react'
```

## Usage recommandé
Pied de page DSFR (`fr-footer`).

**Typographie :** les tailles réduites sont celles du DSFR — 14px pour la description et les liens institutionnels, 12px pour les catégories du bandeau supérieur, les liens obligatoires et la mention de licence. Le bloc-marque, lui, est grand (`<Logo size="lg" />`).

**Composition :**
- `FooterTop` (facultatif) — bandeau gris de `FooterLinks` (catégories de liens) ;
- `FooterBody` — `FooterBrand` à gauche, `FooterContent` à droite. Sans enfants, `FooterContent` affiche les liens institutionnels obligatoires (info.gouv.fr, service-public.gouv.fr, legifrance.gouv.fr, data.gouv.fr) ;
- `FooterBottom` — `FooterLegalLinks` (plan du site, accessibilité, mentions légales, données personnelles, gestion des cookies) et `copyright` pour la mention de licence.

Les liens ne sont soulignés qu'au survol, comme dans le DSFR.

**Liens d'évitement :** `Footer` porte `id="footer"` par défaut, cible de « Aller au pied de page » dans `SkipLinks`.

**Composition 1.2 :** des `FooterLinks` placés dans `FooterContent` restent affichés en colonnes espacées ; préférez `FooterTop` pour suivre le DSFR.

## Documentation et exemples
 Liens institutionnels que le DSFR fait figurer dans tout pied de page.

Conteneur principal du Footer DSFR. Porte `id="footer"` par défaut, cible du
lien d'évitement « Aller au pied de page » de `SkipLinks` (remplaçable via `id`).

@example
```tsx
<Footer>
  <FooterBody>
    <FooterBrand logo={<Logo size="lg" />} href="/" />
    <FooterContent description="Texte de présentation du service." />
  </FooterBody>
  <FooterBottom copyright={<>Sauf mention contraire, les contenus de ce site sont proposés sous licence etalab-2.0</>}>
    <FooterLegalLinks>
      <a href="/plan-du-site">Plan du site</a>
      <a href="/accessibilite">Accessibilité : partiellement conforme</a>
      <a href="/mentions-legales">Mentions légales</a>
    </FooterLegalLinks>
  </FooterBottom>
</Footer>
```

Bandeau supérieur facultatif (`fr-footer__top`) : fond gris et colonnes de
`FooterLinks`, typiquement un plan du site condensé.

Corps principal du Footer : bloc-marque et contenu.

Zone de marque du Footer

Zone de contenu du Footer, à droite du bloc-marque à partir de `lg`.

Composition 1.2 toujours prise en charge : des `FooterLinks` placés ici sont
disposés en colonnes espacées. Pour suivre le DSFR, préférer `FooterTop`.

Catégorie de liens (`fr-footer__top-cat` + `fr-footer__top-list`), à placer
dans `FooterTop`. Chaque enfant est rendu dans un élément de liste.

Zone inférieure du Footer : liens obligatoires et mention de licence.

Liens obligatoires du pied de page (plan du site, accessibilité, mentions
légales, données personnelles, gestion des cookies), séparés par des filets.

## Props et types
```ts
export interface FooterBottomProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Mention de licence (`fr-footer__bottom-copy`), ex. « Sauf mention explicite
   * de propriété intellectuelle détenue par des tiers, les contenus de ce site
   * sont proposés sous licence etalab-2.0 ».
   */
  copyright?: React.ReactNode
}

export interface FooterBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Bloc-marque (en général `<Logo size="lg" />`)
   */
  logo?: React.ReactNode
  /**
   * Logo opérateur facultatif, affiché à droite du bloc-marque
   */
  operatorLogo?: React.ReactNode
  /**
   * @deprecated Placer la description dans `FooterContent` (`description`), à droite du bloc-marque.
   */
  description?: string
  /**
   * URL de destination du logo
   */
  href?: string
  /**
   * Attribut `title` du lien, ex. « Retour à l’accueil du site - Nom de l’entité »
   */
  linkTitle?: string
}

export interface FooterContentLink {
  label: React.ReactNode
  href: string
  /** Ouvre le lien dans une nouvelle fenêtre (annoncé dans `title`). */
  external?: boolean
}

export interface FooterContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Texte de présentation du site (`fr-footer__content-desc`, 14px). */
  description?: React.ReactNode
  /**
   * Liens en gras sous la description. Par défaut, sans enfants, les liens
   * institutionnels (`footerInstitutionalLinks`) ; `false` pour n'en afficher aucun.
   */
  links?: FooterContentLink[] | false
}

export interface FooterLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Titre de la catégorie de liens
   */
  title?: string
  /**
   * Niveau du titre de catégorie. @default 'h3'
   */
  titleAs?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}
```

## Storybook
Rubrique : `Navigation/Footer`
