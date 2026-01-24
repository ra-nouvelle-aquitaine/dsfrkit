/**
 * Espacements du Système de Design de l'État français (DSFR)
 * Source: https://www.systeme-de-design.gouv.fr/fondamentaux/espacement
 *
 * Le DSFR utilise une unité de base de 0.25rem (4px) appelée « v ».
 * Les espacements vont de 1v (0.25rem) à 32 (8rem).
 */

export const spacing = {
  0: '0',
  px: '1px',
  '0v': '0',
  '1v': '0.25rem', // 4px
  '1w': '0.5rem', // 8px — alias DSFR
  '2v': '0.5rem', // 8px
  '3v': '0.75rem', // 12px
  '3w': '1rem', // 16px — alias DSFR
  '4v': '1rem', // 16px
  '5v': '1.25rem', // 20px
  '5w': '1.5rem', // 24px — alias DSFR
  '6v': '1.5rem', // 24px
  '7v': '1.75rem', // 28px
  '7w': '2rem', // 32px — alias DSFR
  '8v': '2rem', // 32px
  '9v': '2.25rem', // 36px
  '9w': '2.5rem', // 40px — alias DSFR
  '10v': '2.5rem', // 40px
  '11v': '2.75rem', // 44px
  '12v': '3rem', // 48px
  '14v': '3.5rem', // 56px
  '15v': '3.75rem', // 60px
  '16v': '4rem', // 64px
  // Tailwind-compatible numeric keys
  0.5: '0.125rem', // 2px
  1: '0.25rem', // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  7: '1.75rem', // 28px
  8: '2rem', // 32px
  9: '2.25rem', // 36px
  10: '2.5rem', // 40px
  11: '2.75rem', // 44px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
} as const

export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  full: '9999px',
} as const

/**
 * Ombres et élévations DSFR
 * Source: https://www.systeme-de-design.gouv.fr/fondamentaux/systeme-d-ombres-et-d-elevation
 *
 * Le DSFR définit des niveaux d'élévation via des ombres portées.
 * Les valeurs utilisent des CSS variables pour supporter le thème sombre.
 */
export const boxShadow = {
  none: 'none',
  // Élévation DSFR — raised (cartes, tuiles)
  raised: '0 2px 6px 0 rgba(0, 0, 18, 0.16)',
  // Élévation DSFR — overlap (menus déroulants, tooltips)
  overlap: '0 6px 18px 0 rgba(0, 0, 18, 0.16)',
  // Élévation DSFR — sticky (éléments collants, header)
  sticky: '0 2px 6px 0 rgba(0, 0, 18, 0.16)',
  // Élévation DSFR — lifted (modales, dialogues)
  lifted: '0 12px 32px 0 rgba(0, 0, 18, 0.16)',
  // Focus outline DSFR (2px outline + 2px offset)
  focus:
    '0 0 0 2px var(--dsfr-focus-offset, #ffffff), 0 0 0 4px var(--dsfr-focus-default, #000091)',
  // Compatibilité Tailwind standard
  sm: '0 1px 2px 0 rgba(0, 0, 18, 0.08)',
  DEFAULT: '0 2px 6px 0 rgba(0, 0, 18, 0.16)',
  md: '0 4px 12px 0 rgba(0, 0, 18, 0.16)',
  lg: '0 6px 18px 0 rgba(0, 0, 18, 0.16)',
  xl: '0 12px 32px 0 rgba(0, 0, 18, 0.16)',
  '2xl': '0 16px 48px 0 rgba(0, 0, 18, 0.24)',
} as const

/**
 * Points de rupture DSFR (breakpoints)
 * Source: https://www.systeme-de-design.gouv.fr/fondamentaux/grille-et-points-de-rupture
 */
export const screens = {
  xs: '0',
  sm: '36em', // 576px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '78em', // 1248px
} as const

export type Spacing = typeof spacing
export type BorderRadius = typeof borderRadius
export type BoxShadow = typeof boxShadow
export type Screens = typeof screens
