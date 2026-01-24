import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { dsfrTheme } from './dsfr-theme'
import '../src/index.css'
import { ThemeProvider, useTheme } from '@dsfrkit/react'

import {
  DocsContainer as BaseDocsContainer,
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs/blocks'
import { addons } from 'storybook/preview-api'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { CliInstallation } from '../src/components/CliInstallation'

const CustomDocsContainer = (props: React.ComponentProps<typeof BaseDocsContainer>) => {
  const [isDark, setDark] = React.useState(false)

  React.useEffect(() => {
    const channel = addons.getChannel()
    // Initializer and listener
    channel.on(DARK_MODE_EVENT_NAME, setDark)
    return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark)
  }, [])

  const currentTheme = isDark ? dsfrTheme.dark : dsfrTheme.light
  return React.createElement(BaseDocsContainer, { ...props, theme: currentTheme })
}

const ThemeSync = ({
  children,
  isDark,
  viewMode,
}: {
  children: React.ReactNode
  isDark: boolean
  viewMode: string
}) => {
  const { resolvedTheme, setTheme } = useTheme()

  const lastIsDark = React.useRef(isDark)

  React.useEffect(() => {
    // Si isDark n'a pas vraiment changé depuis la dernière fois qu'on l'a observé,
    // c'est que le re-rendu vient d'ailleurs (ex: clic local) et on ne doit pas écraser le state local.
    if (lastIsDark.current === isDark) return

    // Quand Storybook bascule en mode sombre via l'interface globale, on synchronise
    lastIsDark.current = isDark
    const currentAppTheme = resolvedTheme === 'dark'
    if (isDark !== currentAppTheme) {
      setTheme(isDark ? 'dark' : 'light')
    }
  }, [isDark, resolvedTheme, setTheme])

  const isThemeDark = resolvedTheme === 'dark'

  React.useEffect(() => {
    // En mode "Canvas" (story isolée), on met à jour le body
    if (viewMode === 'story') {
      document.body.style.backgroundColor = isThemeDark ? '#161616' : '#ffffff'
    }
  }, [isThemeDark, viewMode])

  // En mode Docs, le body est la page entière, donc on l'isole localement dans un cadre
  if (viewMode === 'docs') {
    return React.createElement(
      'div',
      {
        'data-fr-theme': isThemeDark ? 'dark' : 'light',
        style: {
          backgroundColor: isThemeDark ? '#161616' : '#ffffff',
          color: isThemeDark ? '#cecece' : '#161616',
          padding: '2rem',
          margin: '-1rem',
          borderRadius: '4px',
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      children
    )
  }

  return React.createElement(React.Fragment, null, children)
}

const RealThemeWrapper = ({ children, context }: { children: React.ReactNode; context: any }) => {
  const isDark = useDarkMode()

  return React.createElement(
    ThemeProvider,
    {
      defaultTheme: 'system',
      disableTransitionOnChange: true,
    } as any, // Bypass strict type checking for children in createElement
    React.createElement(ThemeSync, { isDark, viewMode: context.viewMode } as any, children)
  )
}

const ThemeWrapper = ({ children, context }: { children: React.ReactNode; context: any }) => {
  // Bypass storybook-dark-mode useDarkMode crash in Vitest due to duplicate React instances or missing channels
  const isTest = typeof process !== 'undefined' && process.env.NODE_ENV === 'test'

  if (isTest) {
    return React.createElement(
      ThemeProvider,
      {
        defaultTheme: 'light',
        disableTransitionOnChange: true,
      } as any,
      children
    )
  }

  return React.createElement(RealThemeWrapper, { context }, children)
}

const preview: Preview = {
  argTypes: {
    // Masquer globalement les props Radix internes non pertinentes pour la doc
    asChild: { table: { disable: true } },
    dir: { table: { disable: true } },
    forceMount: { table: { disable: true } },
  },
  parameters: {
    backgrounds: {
      disabled: true,
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Installation',
          'Guides',
          'Layout',
          'Typography',
          'Components',
          'Data Display',
          'Navigation',
          'Branding',
        ],
      },
    },
    // ...omitted standard parameters ...
    docs: {
      container: CustomDocsContainer,
      page: () => {
        return React.createElement(
          React.Fragment,
          null,
          React.createElement(Title),
          React.createElement(Subtitle),
          React.createElement(Description),
          React.createElement(CliInstallation),
          React.createElement(Primary),
          React.createElement(Controls),
          React.createElement(Stories)
        )
      },
      source: {
        type: 'dynamic',
        language: 'tsx',
      },
    },
    darkMode: {
      dark: { ...dsfrTheme.dark, brandImage: './logo-dark.svg' },
      light: { ...dsfrTheme.light, brandImage: './logo-light.svg' },
      stylePreview: true,
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
    },
    // ... viewport and controls ...
    viewport: {
      options: {
        xs: { name: 'Phone - Breakpoint XS', styles: { width: '375px', height: '667px' } },
        sm: { name: 'Phablet - Breakpoint SM', styles: { width: '576px', height: '1024px' } },
        md: { name: 'Tablette - Breakpoint MD', styles: { width: '768px', height: '1024px' } },
        lg: {
          name: 'Tablette horizontale - Breakpoint LG',
          styles: { width: '1024px', height: '768px' },
        },
        xl: { name: 'Desktop - Breakpoint XL', styles: { width: '100%', height: '100%' } },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => React.createElement(ThemeWrapper, { context }, React.createElement(Story)),
  ],
}
export default preview
