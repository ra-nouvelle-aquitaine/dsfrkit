import { create } from 'storybook/theming'

const light = {
  base: 'light' as const,
  // Typography
  fontBase: '"Marianne", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'DSFRKit',
  brandUrl: 'https://github.com/ra-nouvelle-aquitaine/dsfrkit',
  brandTarget: '_self',
  brandImage: '/logo.svg',

  colorPrimary: '#000091',
  colorSecondary: '#666',

  appBg: '#f6f6f6',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e5e5e5',
  appBorderRadius: 0,

  textColor: '#3a3a3a',
  textInverseColor: '#ffffff',

  barTextColor: '#3a3a3a',
  barSelectedColor: '#000091',
  barHoverColor: '#000091',
  barBg: '#ffffff',

  inputBg: '#eeeeee',
  inputBorder: '#3a3a3a',
  inputTextColor: '#3a3a3a',
  inputBorderRadius: 0,
}

const dark = {
  ...light,
  base: 'dark' as const,
  brandImage: '/logo.svg',

  colorPrimary: '#8585f6',
  colorSecondary: '#666',

  appBg: '#1e1e1e',
  appContentBg: '#161616',
  appPreviewBg: '#161616',
  appBorderColor: '#353535',
  appBorderRadius: 0,

  textColor: '#cecece',
  textInverseColor: '#666',

  barTextColor: '#cecece',
  barSelectedColor: '#8585f6',
  barHoverColor: '#8585f6',
  barBg: '#1b1b35',

  inputBg: '#242424',
  inputBorder: '#cecece',
  inputTextColor: '#cecece',
  inputBorderRadius: 0,
}

export const lightVars = create(light)
export const darkVars = create(dark)

export const dsfrTheme = { light: lightVars, dark: darkVars }

export const getPreferredColorScheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return lightVars

  const theme = document.documentElement.getAttribute('data-fr-theme')
  if (theme) {
    return theme === 'dark' ? darkVars : lightVars
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? darkVars : lightVars
}
