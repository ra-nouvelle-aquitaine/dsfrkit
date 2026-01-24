/**
 * Thème DSFR — Variables CSS pour Tailwind
 *
 * Les variables DSFR natives (--background-default-grey, --text-default-grey, etc.)
 * sont importées depuis dsfr-variables.css (généré par sync:dsfr).
 * Ce fichier ne fait que mapper ces variables vers des noms Tailwind sémantiques.
 *
 * Le dark mode est géré entièrement en CSS via les sélecteurs
 * .dark / [data-theme="dark"] / [data-fr-theme="dark"]
 * définis dans dsfr-variables.css.
 *
 * @see https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-de-l-identite-de-l-etat/couleurs-palette
 */

export type ThemeVariables = Record<string, string>

/**
 * Variables CSS à utiliser dans Tailwind
 */
export const cssVariables = {
  background: {
    DEFAULT: 'var(--background-default-grey)',
    hover: 'var(--background-default-grey-hover)',
    active: 'var(--background-default-grey-active)',
    alt: 'var(--background-alt-grey)',
    contrast: 'var(--background-contrast-grey)',
    elevated: 'var(--background-raised-grey)',
    'open-blue-france': 'var(--background-open-blue-france)',
  },
  foreground: {
    DEFAULT: 'var(--text-default-grey)',
    title: 'var(--text-title-grey)',
    muted: 'var(--text-mention-grey)',
    disabled: 'var(--text-disabled-grey)',
    inverted: 'var(--text-inverted-grey)',
  },
  border: {
    DEFAULT: 'var(--border-default-grey)',
    contrast: 'var(--border-contrast-grey)',
    active: 'var(--border-active-blue-france)',
  },
  primary: {
    DEFAULT: 'var(--background-action-high-blue-france)',
    foreground: 'var(--text-inverted-blue-france)',
    hover: 'var(--background-action-high-blue-france-hover)',
    active: 'var(--background-action-high-blue-france-active)',
  },
  secondary: {
    DEFAULT: 'var(--red-marianne-425-625)',
    foreground: 'var(--text-inverted-grey)',
    hover: 'var(--red-marianne-425-625-hover)',
    active: 'var(--red-marianne-425-625-active)',
  },
  info: {
    DEFAULT: 'var(--info-425-625)',
    background: 'var(--info-950-100)',
  },
  success: {
    DEFAULT: 'var(--success-425-625)',
    background: 'var(--success-950-100)',
  },
  warning: {
    DEFAULT: 'var(--warning-425-625)',
    background: 'var(--warning-950-100)',
  },
  destructive: {
    DEFAULT: 'var(--error-425-625)',
    background: 'var(--error-950-100)',
  },
  focus: {
    DEFAULT: 'var(--blue-france-sun-113-625)',
    offset: 'var(--background-default-grey)',
  },
  card: {
    DEFAULT: 'var(--background-default-grey)',
    foreground: 'var(--text-default-grey)',
  },
  popover: {
    DEFAULT: 'var(--background-raised-grey)',
    foreground: 'var(--text-default-grey)',
  },
  input: 'var(--border-default-grey)',
} as const
