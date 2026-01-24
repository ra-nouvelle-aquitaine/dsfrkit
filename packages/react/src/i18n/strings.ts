import type { DeepPartial, DSFRKitStrings } from './types'

/**
 * Traductions françaises (défaut)
 */
export const frStrings: DSFRKitStrings = {
  pagination: {
    previous: 'Page précédente',
    next: 'Page suivante',
    page: 'Page',
    of: 'sur',
    goToPage: 'Aller à la page',
    first: 'Première page',
    last: 'Dernière page',
  },
  modal: {
    close: 'Fermer',
  },
  table: {
    noData: 'Aucune donnée',
    loading: 'Chargement...',
    sortAsc: 'Trier par ordre croissant',
    sortDesc: 'Trier par ordre décroissant',
    rowsPerPage: 'Lignes par page',
  },
  fileUpload: {
    dropzone: 'Déposez vos fichiers ici ou',
    browse: 'parcourir',
    maxSize: 'Taille maximale :',
    invalidType: 'Type de fichier non accepté',
    uploading: 'Téléversement en cours...',
    remove: 'Supprimer',
  },
  search: {
    placeholder: 'Rechercher',
    clear: 'Effacer',
    submit: 'Rechercher',
    noResults: 'Aucun résultat',
  },
  navigation: {
    menu: 'Menu',
    close: 'Fermer',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    skipToContent: 'Aller au contenu',
    skipToNavigation: 'Aller à la navigation',
  },
  breadcrumb: {
    label: "Fil d'Ariane",
    more: 'Plus de pages',
  },
  common: {
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    required: 'Ce champ est obligatoire',
    optional: 'Facultatif',
    show: 'Afficher',
    hide: 'Masquer',
    expand: 'Développer',
    collapse: 'Réduire',
  },
  theme: {
    light: 'Clair',
    dark: 'Sombre',
    system: 'Système',
    toggleTheme: 'Changer le thème',
  },
}

/**
 * Traductions anglaises
 */
export const enStrings: DSFRKitStrings = {
  pagination: {
    previous: 'Previous page',
    next: 'Next page',
    page: 'Page',
    of: 'of',
    goToPage: 'Go to page',
    first: 'First page',
    last: 'Last page',
  },
  modal: {
    close: 'Close',
  },
  table: {
    noData: 'No data',
    loading: 'Loading...',
    sortAsc: 'Sort ascending',
    sortDesc: 'Sort descending',
    rowsPerPage: 'Rows per page',
  },
  fileUpload: {
    dropzone: 'Drop your files here or',
    browse: 'browse',
    maxSize: 'Maximum size:',
    invalidType: 'Invalid file type',
    uploading: 'Uploading...',
    remove: 'Remove',
  },
  search: {
    placeholder: 'Search',
    clear: 'Clear',
    submit: 'Search',
    noResults: 'No results',
  },
  navigation: {
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to content',
    skipToNavigation: 'Skip to navigation',
  },
  breadcrumb: {
    label: 'Breadcrumb',
    more: 'More pages',
  },
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    required: 'This field is required',
    optional: 'Optional',
    show: 'Show',
    hide: 'Hide',
    expand: 'Expand',
    collapse: 'Collapse',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    toggleTheme: 'Toggle theme',
  },
}

/**
 * Map des locales disponibles
 */
export const localeStrings: Record<string, DSFRKitStrings> = {
  fr: frStrings,
  en: enStrings,
}

/**
 * Fusionne profondément deux objets
 */
function deepMerge(target: DSFRKitStrings, source: DeepPartial<DSFRKitStrings>): DSFRKitStrings {
  const result = { ...target }
  const keys = Object.keys(source) as Array<keyof DSFRKitStrings>

  for (const key of keys) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (
      sourceValue !== undefined &&
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      typeof targetValue === 'object' &&
      targetValue !== null
    ) {
      // @ts-expect-error - Type inference limitation with DeepPartial
      result[key] = { ...targetValue, ...sourceValue }
    }
  }

  return result
}

/**
 * Crée un objet de traductions personnalisé
 * Fusionne les traductions de base avec les surcharges fournies
 *
 * @example
 * ```tsx
 * // Utiliser l'anglais avec une surcharge
 * const strings = createStrings('en', {
 *   modal: { close: 'Dismiss' }
 * })
 * ```
 */
export function createStrings(
  baseLocale = 'fr',
  overrides: DeepPartial<DSFRKitStrings> = {}
): DSFRKitStrings {
  const baseStrings = localeStrings[baseLocale] || frStrings
  return deepMerge(baseStrings, overrides)
}

/**
 * Récupère les traductions pour une locale donnée
 */
export function getStrings(locale: string): DSFRKitStrings {
  return localeStrings[locale] || frStrings
}
