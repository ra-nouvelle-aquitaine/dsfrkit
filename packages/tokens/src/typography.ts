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
    xl: ['1.25rem', { lineHeight: '1.75rem' }], // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }], // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    '5xl': ['3rem', { lineHeight: '1' }], // 48px
    '6xl': ['3.75rem', { lineHeight: '1' }], // 60px
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
