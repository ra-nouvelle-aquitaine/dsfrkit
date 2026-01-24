import {
  borderRadius,
  boxShadow,
  colors,
  cssVariables,
  screens,
  spacing,
  typography,
} from '@dsfrkit/tokens'
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

// Convertit les tableaux readonly en tableaux mutables pour Tailwind
const toMutableArray = (arr: readonly string[]): string[] => [...arr]

// Convertit fontSize readonly en format mutable
const toMutableFontSize = (fontSize: typeof typography.fontSize) => {
  const result: Record<string, [string, { lineHeight: string }]> = {}
  for (const [key, value] of Object.entries(fontSize)) {
    result[key] = [
      value[0] as string,
      { lineHeight: (value[1] as { lineHeight: string }).lineHeight },
    ]
  }
  return result
}

/**
 * Preset Tailwind CSS pour le DSFR
 * Étend la configuration Tailwind avec les tokens du design system
 * Supporte le mode clair/sombre via CSS variables
 *
 * @see https://www.systeme-de-design.gouv.fr/fondamentaux/couleurs-palette
 * @see https://www.systeme-de-design.gouv.fr/fondamentaux/typographie
 * @see https://www.systeme-de-design.gouv.fr/fondamentaux/espacement
 * @see https://www.systeme-de-design.gouv.fr/fondamentaux/grille-et-points-de-rupture
 * @see https://www.systeme-de-design.gouv.fr/fondamentaux/systeme-d-ombres-et-d-elevation
 */
const dsfrPreset: Partial<Config> = {
  // Mode sombre via classe 'dark' sur <html>, data-theme="dark" ou data-fr-theme="dark" (DSFR natif)
  darkMode: ['selector', '&:is(.dark, [data-theme="dark"], [data-fr-theme="dark"])'],
  theme: {
    // Breakpoints DSFR (surcharge complète)
    screens,

    extend: {
      colors: {
        // Couleurs principales (statiques)
        'blue-france': colors['blue-france'],
        'red-marianne': colors['red-marianne'],

        // Couleurs sémantiques via CSS variables (thème-aware)
        info: cssVariables.info,
        success: cssVariables.success,
        warning: cssVariables.warning,
        error: cssVariables.destructive,
        destructive: cssVariables.destructive,
        grey: colors.grey,
        // Palette illustrative DSFR
        'green-tilleul-verveine': colors['green-tilleul-verveine'],
        'green-bourgeon': colors['green-bourgeon'],
        'green-emeraude': colors['green-emeraude'],
        'green-menthe': colors['green-menthe'],
        'green-archipel': colors['green-archipel'],
        'blue-ecume': colors['blue-ecume'],
        'blue-cumulus': colors['blue-cumulus'],
        'purple-glycine': colors['purple-glycine'],
        'pink-macaron': colors['pink-macaron'],
        'pink-tuile': colors['pink-tuile'],
        'yellow-tournesol': colors['yellow-tournesol'],
        'yellow-moutarde': colors['yellow-moutarde'],
        'orange-terre-battue': colors['orange-terre-battue'],
        'brown-cafe-creme': colors['brown-cafe-creme'],
        'brown-caramel': colors['brown-caramel'],
        'brown-opera': colors['brown-opera'],
        'beige-gris-galet': colors['beige-gris-galet'],

        background: cssVariables.background,
        foreground: cssVariables.foreground,
        border: cssVariables.border.DEFAULT,
        'border-contrast': cssVariables.border.contrast,
        'border-active': cssVariables.border.active,
        primary: cssVariables.primary,
        secondary: cssVariables.secondary,
        muted: {
          DEFAULT: cssVariables.background.alt,
          foreground: cssVariables.foreground.muted,
        },
        accent: {
          DEFAULT: cssVariables.background.contrast,
          foreground: cssVariables.foreground.DEFAULT,
        },
        ring: cssVariables.focus.DEFAULT,
        card: cssVariables.card,
        popover: cssVariables.popover,
        input: cssVariables.input,
      },

      fontFamily: {
        sans: toMutableArray(typography.fontFamily.marianne),
        serif: toMutableArray(typography.fontFamily.spectral),
        marianne: toMutableArray(typography.fontFamily.marianne),
        spectral: toMutableArray(typography.fontFamily.spectral),
      },

      fontSize: toMutableFontSize(typography.fontSize),
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,

      spacing,
      borderRadius,
      boxShadow,

      // Container pour suivre les breakpoints DSFR
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },

      // Outline DSFR pour le focus
      outlineOffset: {
        focus: '2px',
      },
      outlineWidth: {
        focus: '2px',
      },

      keyframes: {
        'skeleton-wave': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'skeleton-wave': 'skeleton-wave 2s infinite linear',
      },
    },
  },

  plugins: [
    plugin(({ addBase, addComponents, addUtilities, theme }) => {
      // Styles de base DSFR
      addBase({
        // Focus visible DSFR — outline 2px + offset 2px
        '*:focus-visible': {
          outline: `2px solid ${theme('colors.ring')}`,
          outlineOffset: '2px',
        },
        // Suppression du focus visible pour les clics souris
        '*:focus:not(:focus-visible)': {
          outline: 'none',
        },
      })

      // Composants utilitaires DSFR
      addComponents({
        '.fr-container': {
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen sm': {
            maxWidth: '540px',
          },
          '@screen md': {
            maxWidth: '720px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1140px',
          },
        },
        '.fr-grid-row': {
          display: 'flex',
          flexWrap: 'wrap',
          marginLeft: `-${theme('spacing.2')}`,
          marginRight: `-${theme('spacing.2')}`,
        },
        '.fr-col': {
          flex: '0 0 100%',
          maxWidth: '100%',
          paddingLeft: theme('spacing.2'),
          paddingRight: theme('spacing.2'),
        },
        /* Utilitaires globaux DSFR (liens, boutons, textes) */
        '.fr-link': {
          color: theme('colors.primary.DEFAULT'),
          textDecoration: 'underline',
          textDecorationSkipInk: 'auto',
          '&:hover': {
            color: theme('colors.primary.hover'),
          },
        },
        '.fr-btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: theme('spacing.2'),
          fontWeight: theme('fontWeight.medium'),
          transitionProperty: 'color, background-color, border-color, box-shadow',
          transitionTimingFunction: 'ease-in-out',
          transitionDuration: '200ms',
          cursor: 'pointer',
          borderRadius: '0',
          '&:disabled': {
            cursor: 'not-allowed',
            opacity: '0.6',
          },
        },
        '.fr-text': {
          color: theme('colors.foreground.DEFAULT'),
        },
      })

      // Utilities pour les couleurs de décision DSFR
      addUtilities({
        '.text-decision-default': {
          color: colors.decision.text.default.grey,
        },
        '.text-decision-disabled': {
          color: colors.decision.text.disabled.grey,
        },
        '.bg-decision-default': {
          backgroundColor: colors.decision.background.default.grey,
        },
        '.bg-decision-disabled': {
          backgroundColor: colors.decision.background.disabled.grey,
        },

        /* Text / border helpers (DSFR fundamentals) */
        '.text-default': { color: theme('colors.foreground.DEFAULT') },
        '.text-muted': { color: theme('colors.foreground.muted') },
        '.text-inverted': { color: theme('colors.foreground.inverted') },

        '.border-default': { borderColor: theme('colors.border') },
        '.border-contrast': { borderColor: theme('colors.border-contrast') },
        '.border-active': { borderColor: theme('colors.border-active') },

        /* Élévation DSFR */
        '.elevation-raised': { boxShadow: theme('boxShadow.raised') },
        '.elevation-overlap': { boxShadow: theme('boxShadow.overlap') },
        '.elevation-sticky': { boxShadow: theme('boxShadow.sticky') },
        '.elevation-lifted': { boxShadow: theme('boxShadow.lifted') },

        /* Focus DSFR */
        '.focus-dsfr': {
          outline: `2px solid ${theme('colors.ring')}`,
          outlineOffset: '2px',
        },
      })
    }),
  ],
}

export default dsfrPreset

// Export individuel pour usage avancé
export { borderRadius, boxShadow, colors, screens, spacing, typography }
