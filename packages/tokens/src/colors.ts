/**
 * Palette de couleurs du Système de Design de l'État français (DSFR)
 * Source: https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-de-l-identite-de-l-etat/couleurs-palette
 */

export const colors = {
  // Bleu France (couleur principale)
  'blue-france': {
    975: '#f5f5fe', // blue-france-975-75 (light)
    950: '#ececfe', // blue-france-950-100 (light)
    925: '#e3e3fd', // blue-france-925-125 (light)
    625: '#8585f6', // blue-france-sun-113-625 (dark)
    main: '#6a6af4', // blue-france-main-525
    sun: '#000091', // blue-france-sun-113-625 (light)
    200: '#313178', // blue-france-850-200 (dark)
    100: '#21213f', // blue-france-950-100 (dark)
    75: '#1b1b35', // blue-france-975-75 (dark)
  },

  // Rouge Marianne
  'red-marianne': {
    975: '#fef4f4', // red-marianne-975-75 (light)
    950: '#fee9e9', // red-marianne-950-100 (light)
    625: '#f95c5e', // red-marianne-425-625 (dark)
    425: '#c9191e', // red-marianne-425-625 (light)
    main: '#e1000f', // red-marianne-main-472
    200: '#5e2a2b', // red-marianne-850-200 (dark)
    100: '#331f1f', // red-marianne-950-100 (dark)
    75: '#2b1919', // red-marianne-975-75 (dark)
  },

  // Gris (échelle DSFR — grades hauts = clair, grades bas = foncé)
  grey: {
    1000: '#ffffff', // grey-1000-50 (light)
    975: '#f6f6f6', // grey-975-75 (light)
    950: '#eeeeee', // grey-950-100 (light)
    925: '#e5e5e5', // grey-925-125 (light)
    900: '#dddddd', // grey-900-175 (light)
    850: '#cecece', // approx grey-850
    625: '#929292', // grey-625-425 (light)
    425: '#666666', // grey-425-625 (light)
    200: '#3a3a3a', // grey-200-850 (light)
    50: '#161616', // grey-50-1000 (light)
    0: '#000000',
  },

  // Info
  info: {
    950: '#e8edff', // info-950-100 (light)
    975: '#e8edff', // info-975-75 (light, approx)
    625: '#518fff', // info-425-625 (dark)
    425: '#0063cb', // info-425-625 (light)
  },

  // Success (vert)
  success: {
    950: '#b8fec9', // success-950-100 (light)
    625: '#27a658', // success-425-625 (dark)
    425: '#18753c', // success-425-625 (light)
  },

  // Warning (orange)
  warning: {
    950: '#ffe9e6', // warning-950-100 (light)
    625: '#fc5d00', // warning-425-625 (dark)
    425: '#b34000', // warning-425-625 (light)
  },

  // Error
  error: {
    950: '#ffe9e9', // error-950-100 (light)
    625: '#ff5655', // error-425-625 (dark)
    425: '#ce0500', // error-425-625 (light)
  },

  // Palette illustrative DSFR
  // Source: https://www.systeme-de-design.gouv.fr/fondamentaux/couleurs-palette
  'green-tilleul-verveine': {
    975: '#fef7da',
    950: '#fceeac',
    main: '#66673d',
    sun: '#b7a73f',
  },
  'green-bourgeon': {
    975: '#e6feda',
    950: '#c9fbac',
    main: '#447049',
    sun: '#68a532',
  },
  'green-emeraude': {
    975: '#dafaef',
    950: '#c3fad5',
    main: '#297254',
    sun: '#00a95f',
  },
  'green-menthe': {
    975: '#d2f9f0',
    950: '#bafaee',
    main: '#37635f',
    sun: '#009081',
  },
  'green-archipel': {
    975: '#d2f7f4',
    950: '#a5f2ec',
    main: '#006a6f',
    sun: '#009099',
  },
  'blue-ecume': {
    975: '#e9edfe',
    950: '#dee5fd',
    main: '#2f4077',
    sun: '#465f9d',
  },
  'blue-cumulus': {
    975: '#f3f6fe',
    950: '#e6eefe',
    main: '#3558a2',
    sun: '#417dc4',
  },
  'purple-glycine': {
    975: '#fee7fc',
    950: '#fddcfc',
    main: '#6e445a',
    sun: '#a558a0',
  },
  'pink-macaron': {
    975: '#fee9e7',
    950: '#fddede',
    main: '#8d533e',
    sun: '#e18b76',
  },
  'pink-tuile': {
    975: '#fee9e6',
    950: '#fddede',
    main: '#a94645',
    sun: '#ce614a',
  },
  'yellow-tournesol': {
    975: '#fef6e3',
    950: '#feecc2',
    main: '#716043',
    sun: '#c8aa39',
  },
  'yellow-moutarde': {
    975: '#fef6e3',
    950: '#feecc2',
    main: '#695240',
    sun: '#c3992a',
  },
  'orange-terre-battue': {
    975: '#fee9e5',
    950: '#fddede',
    main: '#755348',
    sun: '#e4794a',
  },
  'brown-cafe-creme': {
    975: '#f7ece4',
    950: '#f7e1cb',
    main: '#685c48',
    sun: '#d1b781',
  },
  'brown-caramel': {
    975: '#f7ece4',
    950: '#f7e1cb',
    main: '#845d48',
    sun: '#c08c65',
  },
  'brown-opera': {
    975: '#f7ece4',
    950: '#f7e1cb',
    main: '#745b47',
    sun: '#bd987a',
  },
  'beige-gris-galet': {
    975: '#f3ede5',
    950: '#ede4d5',
    main: '#6a6156',
    sun: '#aea397',
  },

  // Couleurs décision (valeurs light, correspondant aux tokens DSFR officiels)
  decision: {
    background: {
      default: {
        grey: '#ffffff', // grey-1000-50
      },
      alt: {
        grey: '#f6f6f6', // grey-975-75
        'blue-france': '#f5f5fe', // blue-france-975-75
        'red-marianne': '#fef4f4', // red-marianne-975-75
      },
      contrast: {
        grey: '#eeeeee', // grey-950-100
        'blue-france': '#ececfe', // blue-france-950-100
        'red-marianne': '#fee9e9', // red-marianne-950-100
      },
      disabled: {
        grey: '#e5e5e5', // grey-925-125
      },
    },
    border: {
      default: {
        grey: '#dddddd', // grey-900-175
      },
      contrast: {
        grey: '#929292', // grey-625-425
      },
      active: {
        'blue-france': '#000091', // blue-france-sun-113-625
      },
      disabled: {
        grey: '#e5e5e5', // grey-925-125
      },
    },
    text: {
      default: {
        grey: '#3a3a3a', // grey-200-850
      },
      title: {
        grey: '#161616', // grey-50-1000
      },
      mention: {
        grey: '#666666', // grey-425-625
      },
      disabled: {
        grey: '#929292', // grey-625-425
      },
      inverted: {
        grey: '#ffffff', // grey-1000-50
      },
      'action-high': {
        'blue-france': '#000091', // blue-france-sun-113-625
        'red-marianne': '#c9191e', // red-marianne-425-625
      },
    },
  },
} as const

export type Colors = typeof colors
