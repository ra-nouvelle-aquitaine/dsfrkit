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

const alphaColor = (variableName: `--${string}`) =>
  `rgb(from var(${variableName}) r g b / <alpha-value>)`

/**
 * Variables CSS à utiliser dans Tailwind
 */
export const cssVariables = {
  background: {
    DEFAULT: alphaColor('--background-default-grey'),
    hover: alphaColor('--background-default-grey-hover'),
    active: alphaColor('--background-default-grey-active'),
    alt: alphaColor('--background-alt-grey'),
    contrast: alphaColor('--background-contrast-grey'),
    elevated: alphaColor('--background-raised-grey'),
    'open-blue-france': alphaColor('--background-open-blue-france'),
  },
  foreground: {
    DEFAULT: alphaColor('--text-default-grey'),
    title: alphaColor('--text-title-grey'),
    muted: alphaColor('--text-mention-grey'),
    mention: alphaColor('--text-mention-grey'),
    disabled: alphaColor('--text-disabled-grey'),
    inverted: alphaColor('--text-inverted-grey'),
  },
  border: {
    DEFAULT: alphaColor('--border-default-grey'),
    contrast: alphaColor('--border-contrast-grey'),
    active: alphaColor('--border-active-blue-france'),
  },
  primary: {
    DEFAULT: alphaColor('--background-action-high-blue-france'),
    foreground: alphaColor('--text-inverted-blue-france'),
    hover: alphaColor('--background-action-high-blue-france-hover'),
    active: alphaColor('--background-action-high-blue-france-active'),
  },
  secondary: {
    DEFAULT: alphaColor('--red-marianne-425-625'),
    foreground: alphaColor('--text-inverted-grey'),
    hover: alphaColor('--red-marianne-425-625-hover'),
    active: alphaColor('--red-marianne-425-625-active'),
  },
  info: {
    DEFAULT: alphaColor('--info-425-625'),
    foreground: alphaColor('--text-inverted-info'),
    background: alphaColor('--info-950-100'),
    hover: alphaColor('--info-425-625-hover'),
    active: alphaColor('--info-425-625-active'),
    'background-hover': alphaColor('--info-950-100-hover'),
    'background-active': alphaColor('--info-950-100-active'),
  },
  success: {
    DEFAULT: alphaColor('--success-425-625'),
    foreground: alphaColor('--text-inverted-success'),
    background: alphaColor('--success-950-100'),
    hover: alphaColor('--success-425-625-hover'),
    active: alphaColor('--success-425-625-active'),
    'background-hover': alphaColor('--success-950-100-hover'),
    'background-active': alphaColor('--success-950-100-active'),
  },
  warning: {
    DEFAULT: alphaColor('--warning-425-625'),
    foreground: alphaColor('--text-inverted-warning'),
    background: alphaColor('--warning-950-100'),
    hover: alphaColor('--warning-425-625-hover'),
    active: alphaColor('--warning-425-625-active'),
    'background-hover': alphaColor('--warning-950-100-hover'),
    'background-active': alphaColor('--warning-950-100-active'),
  },
  destructive: {
    DEFAULT: alphaColor('--error-425-625'),
    foreground: alphaColor('--text-inverted-error'),
    background: alphaColor('--error-950-100'),
    hover: alphaColor('--error-425-625-hover'),
    active: alphaColor('--error-425-625-active'),
    'background-hover': alphaColor('--error-950-100-hover'),
    'background-active': alphaColor('--error-950-100-active'),
  },
  focus: {
    DEFAULT: alphaColor('--blue-france-sun-113-625'),
    offset: alphaColor('--background-default-grey'),
  },
  card: {
    DEFAULT: alphaColor('--background-default-grey'),
    foreground: alphaColor('--text-default-grey'),
  },
  popover: {
    DEFAULT: alphaColor('--background-raised-grey'),
    foreground: alphaColor('--text-default-grey'),
  },
  input: alphaColor('--border-default-grey'),
} as const
