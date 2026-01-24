import { addons } from 'storybook/manager-api'
import { dsfrTheme } from './dsfr-theme'
import '@dsfrkit/tokens/theme.css'

addons.setConfig({
  theme: dsfrTheme.light,
})
