/**
 * Typographie du Système de Design de l'État français (DSFR)
 * Source: https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-de-l-identite-de-l-etat/typographie
 */

export const typography = {
  fontFamily: {
    marianne: [
      'Marianne',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
    spectral: ['Spectral', 'Georgia', 'serif'],
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1.25rem' }], // 12px
    sm: ['0.875rem', { lineHeight: '1.5rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }], // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '2rem' }], // 20px — texte chapô
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    '3xl': ['1.75rem', { lineHeight: '2.25rem' }], // 28px
    '4xl': ['2rem', { lineHeight: '2.5rem' }], // 32px
    '5xl': ['2.5rem', { lineHeight: '3rem' }], // 40px
    '6xl': ['3rem', { lineHeight: '3.5rem' }], // 48px

    // Échelle sémantique des titres DSFR — mobile puis variante desktop (>= md).
    h6: ['1.125rem', { lineHeight: '1.5rem' }],
    'h6-desktop': ['1.25rem', { lineHeight: '1.75rem' }],
    h5: ['1.25rem', { lineHeight: '1.75rem' }],
    'h5-desktop': ['1.375rem', { lineHeight: '1.75rem' }],
    h4: ['1.375rem', { lineHeight: '1.75rem' }],
    'h4-desktop': ['1.5rem', { lineHeight: '2rem' }],
    h3: ['1.5rem', { lineHeight: '2rem' }],
    'h3-desktop': ['1.75rem', { lineHeight: '2.25rem' }],
    h2: ['1.75rem', { lineHeight: '2.25rem' }],
    'h2-desktop': ['2rem', { lineHeight: '2.5rem' }],
    h1: ['2rem', { lineHeight: '2.5rem' }],
    'h1-desktop': ['2.5rem', { lineHeight: '3rem' }],
  },

  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },

  lineHeight: {
    tight: '1.25',
    base: '1.5',
    relaxed: '1.625',
  },
} as const

export type Typography = typeof typography
