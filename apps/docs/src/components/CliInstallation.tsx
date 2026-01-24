import {
  Alert,
  Box,
  ButtonGroup,
  ButtonGroupItem,
  Code,
  Heading,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@dsfrkit/react'
import { DocsContext } from '@storybook/addon-docs/blocks'
import { useContext, useState } from 'react'
import { componentDependencies } from './component-deps'

export function CliInstallation() {
  const context = useContext(DocsContext) as { title?: string }
  const [pkgManager, setPkgManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm')

  const title = context?.title || ''
  let componentName = ''
  let rawName = ''

  if (title) {
    const parts = title.split('/')
    const parsedRaw = parts[parts.length - 1]
    if (parsedRaw) {
      rawName = parsedRaw
      componentName = rawName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
    }
  }

  // Fallback iframe url parsing if context is broken
  if (!componentName && typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    // Dans l'iframe Storybook, l'URL est : iframe.html?id=data-display-tag--docs
    const idParam = params.get('id') || ''

    if (idParam.endsWith('--docs')) {
      const partsParam = idParam.replace('--docs', '').split('-')
      // Ex: ['data', 'display', 'tag'] -> on prend le dernier
      const lastPart = partsParam[partsParam.length - 1]
      if (lastPart) {
        componentName = lastPart
        rawName = lastPart
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')
      }
    }
  }

  // Protection anti-crash
  if (!componentName) {
    return (
      <Box className="my-8 p-4 border border-error bg-error-background text-error rounded-lg">
        <Text>
          Impossible de déterminer le nom du composant pour l'installation CLI. Titre : {title}
        </Text>
      </Box>
    )
  }

  if (['introduction', 'installation', 'guides', 'pictograms'].includes(componentName)) {
    return null
  }

  const deps = componentDependencies[componentName] || []
  const depString = deps.length > 0 ? ` ${deps.join(' ')}` : ''

  return (
    <Box className="my-8">
      <Heading as="h3" size="4" className="!mb-4 !mt-8">
        Installation
      </Heading>

      <Tabs defaultValue="cli" className="w-full">
        <TabsList>
          <TabsTrigger value="cli">Approche Shadcn UI</TabsTrigger>
          <TabsTrigger value="npm">Approche Classique</TabsTrigger>
        </TabsList>

        <TabsContent value="cli">
          <Text as="div" className="text-foreground-muted !mb-6 leading-relaxed">
            Copiez localement le code source du composant dans votre projet pour pouvoir le
            personnaliser librement.
          </Text>

          <Box className="shadow-sm">
            <Box className="flex justify-end">
              <ButtonGroup
                type="single"
                value={pkgManager}
                onValueChange={(v) => v && setPkgManager(v as typeof pkgManager)}
              >
                <ButtonGroupItem value="npm">npm</ButtonGroupItem>
                <ButtonGroupItem value="pnpm">pnpm</ButtonGroupItem>
                <ButtonGroupItem value="yarn">yarn</ButtonGroupItem>
                <ButtonGroupItem value="bun">bun</ButtonGroupItem>
              </ButtonGroup>
            </Box>
            <Box className="font-mono text-sm bg-background border border-border p-3">
              <Box className="flex items-center gap-2 text-foreground font-semibold flex-wrap">
                <Text as="span" className="text-primary font-bold select-none">
                  $
                </Text>
                {pkgManager === 'npm' && `npx @dsfrkit/cli add ${componentName}${depString}`}
                {pkgManager === 'pnpm' && `pnpm dlx @dsfrkit/cli add ${componentName}${depString}`}
                {pkgManager === 'yarn' && `yarn dlx @dsfrkit/cli add ${componentName}${depString}`}
                {pkgManager === 'bun' && `bunx @dsfrkit/cli add ${componentName}${depString}`}
              </Box>
            </Box>
          </Box>

          {deps.length > 0 && (
            <Alert variant="info" title="Dépendances internes" className="!mt-6">
              Ce composant est complexe et repose sur des primitives existantes (
              <Code>{deps.join(', ')}</Code>). Le CLI se chargera de copier automatiquement ces
              dépendances dans votre projet.
            </Alert>
          )}
        </TabsContent>

        <TabsContent value="npm">
          <Text as="div" className="text-foreground-muted mb-4 leading-relaxed">
            Installez simplement la bibliothèque globale et importez directement le composant.
          </Text>

          <Box className="p-4 mb-4">
            <Box className="flex items-center justify-between">
              <Text as="div" className="text-foreground-muted text-sm font-semibold">
                1. Installer la librairie globale
              </Text>
              <ButtonGroup
                type="single"
                value={pkgManager}
                onValueChange={(v) => v && setPkgManager(v as typeof pkgManager)}
              >
                <ButtonGroupItem value="npm">npm</ButtonGroupItem>
                <ButtonGroupItem value="pnpm">pnpm</ButtonGroupItem>
                <ButtonGroupItem value="yarn">yarn</ButtonGroupItem>
                <ButtonGroupItem value="bun">bun</ButtonGroupItem>
              </ButtonGroup>
            </Box>

            <Box className="font-mono text-sm bg-background border border-border p-3">
              <Box className="flex items-center gap-2 text-foreground font-semibold flex-wrap">
                <Text as="span" className="text-primary font-bold select-none">
                  $
                </Text>
                {pkgManager === 'npm' && 'npm install @dsfrkit/react @dsfrkit/icons'}
                {pkgManager === 'pnpm' && 'pnpm add @dsfrkit/react @dsfrkit/icons'}
                {pkgManager === 'yarn' && 'yarn add @dsfrkit/react @dsfrkit/icons'}
                {pkgManager === 'bun' && 'bun add @dsfrkit/react @dsfrkit/icons'}
              </Box>
            </Box>
          </Box>

          <Box className="p-4 rounded-lg shadow-sm">
            <Text as="div" className="text-foreground-muted mb-2 text-sm font-semibold">
              2. Importer le composant
            </Text>
            <Box className="font-mono text-sm bg-background border border-border p-3">
              <Box className="flex items-center gap-2 text-foreground font-semibold flex-wrap">
                <Text as="span" className="text-primary font-bold select-none">
                  $
                </Text>
                import {'{'} {rawName} {'}'} from '@dsfrkit/react'
              </Box>
            </Box>
          </Box>
        </TabsContent>
      </Tabs>
    </Box>
  )
}
