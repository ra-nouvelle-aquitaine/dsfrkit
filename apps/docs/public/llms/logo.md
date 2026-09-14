# Composant Logo

> Affiche le logo République Française officiel.

## Import
```tsx
import { Logo, logoVariants, ServiceLogo } from '@dsfrkit/react'
import type { LogoProps, ServiceLogoProps } from '@dsfrkit/react'
```

## Usage recommandé
Affiche le logo République Française officiel.

## Documentation et exemples
Composant Logo DSFR
Affiche le logo officiel de la République Française
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/logo

Utilise les SVG officiels du DSFR (Marianne + devise)
Source : https://github.com/GouvernementFR/dsfr/blob/main/src/dsfr/component/logo/style/_setting.scss

Logo de la République Française

@example
```tsx
<Logo />
<Logo size="lg" />
<Logo size="sm" />
```

## Props et types
```ts
export interface LogoProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof logoVariants> {
  /** Texte alternatif pour l'accessibilité */
  alt?: string
  /** Affiche la devise "Liberté Égalité Fraternité" (défaut : true) */
  showMotto?: boolean
  /** Texte institutionnel à afficher */
  serviceTitle?: React.ReactNode
}

/**
 * Logo de service (à côté du logo République Française)
 */
export interface ServiceLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Nom du service
   */
  serviceName: string
  /**
   * Description ou tagline du service
   */
  serviceTagline?: string
  /**
   * URL du logo du service (optionnel)
   */
  logoUrl?: string
  /**
   * Texte alternatif pour le logo
   */
  logoAlt?: string
}
```

## Storybook
Rubrique : `Branding/Logo`
