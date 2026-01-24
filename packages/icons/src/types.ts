import type * as React from 'react'

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /**
   * Taille de l'icône (width et height)
   * @default 24
   */
  size?: number | string
  /**
   * Couleur de l'icône
   * @default 'currentColor'
   */
  color?: string
  /**
   * Épaisseur du trait
   * @default 2
   */
  strokeWidth?: number
  /**
   * Label d'accessibilité
   */
  'aria-label'?: string
}

export type IconComponent = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>
