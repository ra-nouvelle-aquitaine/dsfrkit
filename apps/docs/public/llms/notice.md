# Composant Notice

> Bandeau d'information importante (fr-notice), affiché en pleine largeur sous l'en-tête.

## Import
```tsx
import { Notice, noticeVariants } from '@dsfrkit/react'
import type { NoticeLink, NoticeProps, NoticeVariant } from '@dsfrkit/react'
```

## Usage recommandé
Bandeau d'information importante (`fr-notice`), affiché en pleine largeur sous l'en-tête. Son contenu s'aligne sur le conteneur de la page.

**Quand l'utiliser ?** Pour une information importante et temporaire qui concerne tout le site : maintenance programmée, vigilance météo, alerte Vigipirate… Pour un message lié à une action de l'utilisateur, préférez `Alert`.

**Structure :** un titre en gras (obligatoire), une description facultative (`children`) et un lien de consultation facultatif (`link`). Le bouton « Masquer le message » s'affiche avec `closable`.

**Types :**
- génériques : `info` (défaut), `warning`, `alert` ;
- vigilance météo : `weather-orange`, `weather-red`, `weather-purple` ;
- alertes : `witness` (appel à témoins), `kidnapping` (alerte enlèvement), `attack` (attentat), `cyberattack` (cyberattaque).

## Documentation et exemples
Variants du bandeau d'information DSFR (`fr-notice`)
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information

- Bandeaux « génériques » (info, warning, alert) : fond contrasté, texte coloré.
- Vigilance météo (weather-*) : orange sur fond contrasté, rouge et violet en aplat.
- Alertes « Vigipirate » (witness, kidnapping, attack, cyberattack) : aplat
  avec liseré supérieur de 6px et titre en capitales.

Composant Notice (Bandeau d'information importante) DSFR

Bandeau pleine largeur affiché sous l'en-tête pour une information
importante et temporaire. Le contenu est aligné sur le conteneur de page.

@example
```tsx
<Notice title="Maintenance prévue">
  Le service sera indisponible dimanche de 2h à 6h.
</Notice>

<Notice
  variant="weather-red"
  title="Vigilance rouge"
  link={{ label: 'Voir la carte de vigilance', href: 'https://vigilance.meteofrance.fr', external: true }}
  closable
>
  Orages violents attendus sur le département.
</Notice>
```

## Props et types
```ts
export interface NoticeLink {
  /** Intitulé du lien de consultation */
  label: React.ReactNode
  /** Destination du lien */
  href: string
  /**
   * Ouvre le lien dans un nouvel onglet (`target="_blank"`, `rel="noopener external"`)
   * et annonce « nouvelle fenêtre » dans l'attribut `title`, comme le DSFR.
   */
  external?: boolean
}

export interface NoticeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Type de bandeau. Sans type, le bandeau est neutre (fond gris, sans icône).
   * @default 'info'
   */
  variant?: NoticeVariant
  /** Titre du bandeau, en gras. Obligatoire dans le DSFR. */
  title?: React.ReactNode
  /** Description (`fr-notice__desc`), affichée à la suite du titre. */
  children?: React.ReactNode
  /** Lien de consultation (`fr-notice__link`), affiché après la description. */
  link?: NoticeLink
  /** Affiche le bouton « Masquer le message ». */
  closable?: boolean
  /** Callback appelé lors de la fermeture. */
  onClose?: () => void
  /** Libellé du bouton de fermeture. @default 'Masquer le message' */
  closeLabel?: string
  /** Icône personnalisée, à la place de l'icône du type. */
  icon?: React.ReactNode
  /** Masque l'icône (`fr-notice--no-icon`). */
  hideIcon?: boolean
}

export type NoticeVariant =
  | 'neutral'
  | 'info'
  | 'warning'
  | 'alert'
  | 'weather-orange'
  | 'weather-red'
  | 'weather-purple'
  | 'witness'
  | 'kidnapping'
  | 'attack'
  | 'cyberattack'
  /** @deprecated Utiliser `alert`, nom DSFR du bandeau d'alerte. */
  | 'error'
  /** @deprecated Utiliser `weather-orange` (ou `weather-red` / `weather-purple`). */
  | 'weather'
  /** @deprecated Le DSFR ne propose pas de bandeau de succès : préférer `Alert`. */
  | 'success'
```

## Storybook
Rubrique : `Feedback/Notice`
