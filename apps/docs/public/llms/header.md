# Composant Header

> Conteneur principal du Header DSFR.

## Import
```tsx
import { Header, HeaderActions, HeaderBody, HeaderBrand, HeaderMenuButton, HeaderNav } from '@dsfrkit/react'
import type { HeaderBrandProps, HeaderMenuButtonProps, HeaderProps } from '@dsfrkit/react'
```

## Documentation et exemples
Conteneur principal du Header DSFR.
Gère automatiquement le menu burger responsive.

Zone de navigation principale du Header.
À partir de `lg` : affichée en ligne. En dessous : rendue dans le panneau
ouvert par le bouton burger du Header (point de rupture du DSFR).
Accepte des `NavLink`, des entrées de `Navigation` ou une `Navigation` complète
(menus et méga-menus).

## Props et types
```ts
export interface HeaderBrandProps extends React.HTMLAttributes<HTMLDivElement> {
  logo?: React.ReactNode
  serviceTitle?: string
  serviceTagline?: string
  href?: string
}

export interface HeaderMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen?: boolean
  onToggle?: () => void
}

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  serviceTitle?: string
  serviceTagline?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}
```

## Storybook
Rubrique : `Navigation/Header`
