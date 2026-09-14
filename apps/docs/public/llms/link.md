# Composant Link

> Lien de navigation standard.

## Import
```tsx
import { Link, linkVariants } from '@dsfrkit/react'
import type { LinkProps } from '@dsfrkit/react'
```

## Usage recommandé
Lien de navigation standard. Apparaît souvent dans le corps du texte ou des listes de liens.

## Documentation et exemples
Variants du lien DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien

## Props et types
```ts
export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  /**
   * Si true, rend le composant enfant au lieu d'un <a>
   * Utile pour l'intégration avec les routeurs (Next.js, React Router, TanStack Router)
   *
   * @example
   * ```tsx
   * // Avec Next.js Link
   * <Link asChild>
   *   <NextLink href="/about">À propos</NextLink>
   * </Link>
   *
   * // Avec React Router
   * <Link asChild>
   *   <RouterLink to="/about">À propos</RouterLink>
   * </Link>
   *
   * // Avec TanStack Router
   * <Link asChild>
   *   <TanStackLink to="/about">À propos</TanStackLink>
   * </Link>
   * ```
   */
  asChild?: boolean
  /**
   * Si true, ouvre le lien dans un nouvel onglet avec rel="noopener noreferrer"
   */
  external?: boolean
  /**
   * Affiche une icône externe à côté du lien
   */
  showExternalIcon?: boolean
  /**
   * Contrôle le soulignement du lien
   * - `always` : toujours souligné (défaut, recommandé a11y WCAG 1.4.1)
   * - `hover` : souligné au hover uniquement (style DSFR natif)
   * - `none` : jamais souligné
   */
  underline?: 'always' | 'hover' | 'none'
}
```

## Storybook
Rubrique : `Typography/Link`
