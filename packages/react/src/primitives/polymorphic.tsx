'use client'

import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

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

/**
 * Composant de base polymorphique pour les liens
 * Utilisé comme base pour Link, NavLink, BreadcrumbLink, etc.
 */
export interface PolymorphicLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    PolymorphicProps {}

export const PolymorphicLink = React.forwardRef<HTMLAnchorElement, PolymorphicLinkProps>(
  ({ asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'a'
    return <Comp ref={ref} {...props} />
  }
)

PolymorphicLink.displayName = 'PolymorphicLink'

/**
 * Composant de base polymorphique pour les boutons
 * Utilisé comme base pour Button, IconButton, etc.
 */
export interface PolymorphicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PolymorphicProps {}

export const PolymorphicButton = React.forwardRef<HTMLButtonElement, PolymorphicButtonProps>(
  ({ asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} type={asChild ? undefined : type} {...props} />
  }
)

PolymorphicButton.displayName = 'PolymorphicButton'

export { Slot }
