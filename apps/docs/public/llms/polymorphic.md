# Utilitaire PolymorphicButton

> Utilitaire PolymorphicButton de DSFRKit.

## Import
```tsx
import { PolymorphicButton, PolymorphicLink, Slot } from '@dsfrkit/react'
import type { PolymorphicButtonProps, PolymorphicLinkProps, PolymorphicProps } from '@dsfrkit/react'
```

## Props et types
```ts
/**
 * Composant de base polymorphique pour les boutons
 * Utilisé comme base pour Button, IconButton, etc.
 */
export interface PolymorphicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PolymorphicProps {}

/**
 * Composant de base polymorphique pour les liens
 * Utilisé comme base pour Link, NavLink, BreadcrumbLink, etc.
 */
export interface PolymorphicLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    PolymorphicProps {}

/**
 * Props pour les composants polymorphiques
 * Permet d'utiliser `asChild` pour passer le style à un composant enfant
 */
export interface PolymorphicProps {
  /**
   * Si true, le composant délègue son rendu à son enfant unique
   * Utile pour intégrer avec Next.js Link, React Router, TanStack Router, etc.
   */
  asChild?: boolean
}
```
