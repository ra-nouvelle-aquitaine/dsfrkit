import { Box, ButtonGroup, ButtonGroupItem, Code, Heading, Text } from '@dsfrkit/react'
import { Highlight, type Language, themes } from 'prism-react-renderer'
import { useState } from 'react'

const CodeBlock = ({ code, language = 'tsx' }: { code: string; language?: Language }) => (
  <Box className="bg-background-contrast border border-border p-4 rounded-lg overflow-x-auto my-4 text-sm font-mono leading-relaxed">
    <Highlight theme={themes.vsDark} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
        <pre
          className={className}
          style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: 0 }}
        >
          {tokens.map((line: any[], i: number) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token: any, key: number) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </Box>
)

export function InstallationGuide() {
  const [pkgManager, setPkgManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm')

  return (
    <Box className="space-y-12 mt-4">
      {/* SECTION HAUTE : Architecture & Terminal interactif */}
      <Box className="grid md:grid-cols-2 gap-8 items-start">
        <Box className="space-y-6">
          <Box>
            <Heading as="h3" size="4" className="mb-2 flex items-center gap-2">
              <Text as="span" className="text-primary font-bold">
                1.
              </Text>{' '}
              Le choix de l'adoption (NPM ou CLI)
            </Heading>
            <Text className="text-foreground-muted mb-3">
              <Text as="strong" className="font-bold text-foreground">
                L'approche CLI (Recommandée façon Shadcn UI)
              </Text>{' '}
              : DSFRKit copie le code source des composants directement dans votre projet (ex:{' '}
              <Code variant="outline">src/components/ui</Code>).{' '}
              <Text as="strong" className="font-bold text-foreground">
                Vous êtes propriétaire du code
              </Text>{' '}
              et pouvez le modifier librement selon vos besoins spécifiques métiers.
            </Text>
            <Text className="text-foreground-muted">
              <Text as="strong" className="font-bold text-foreground">
                L'approche Classique (Package NPM)
              </Text>{' '}
              : L'approche CLI{' '}
              <Text as="strong" className="font-bold text-foreground">
                n'est absolument pas obligatoire
              </Text>{' '}
              ! Vous pouvez très bien utiliser DSFRKit comme une dépendance traditionnelle et
              importer directement les primitives depuis{' '}
              <Code variant="outline">@dsfrkit/react</Code> pour prototyper extrêmement vite
              (recommandé pour des tests ou des POCs courts).
            </Text>
          </Box>
          <Box>
            <Heading as="h3" size="4" className="mb-2 flex items-center gap-2">
              <Text as="span" className="text-primary font-bold">
                2.
              </Text>{' '}
              L'accessibilité avec Radix UI
            </Heading>
            <Text className="text-foreground-muted">
              Tous nos composants complexes reposent sur les primitives Radix. Cela garantit une
              conformité parfaite aux standards WAI-ARIA, une navigation au clavier native et une
              excellente gestion du focus, sans perturber le rendu visuel.
            </Text>
          </Box>
          <Box>
            <Heading as="h3" size="4" className="mb-2 flex items-center gap-2">
              <Text as="span" className="text-primary font-bold">
                3.
              </Text>{' '}
              Le style Tailwind & DSFR
            </Heading>
            <Text className="text-foreground-muted">
              Le design graphique est appliqué avec Tailwind CSS via notre plugin de configuration
              dédié <Code variant="outline">@dsfrkit/config</Code>. Les classes utilitaires mappent
              parfaitement avec les variables CSS et les tokens de design officiels du Système de
              Design de l'État.
            </Text>
          </Box>
        </Box>

        {/* Le beau panel Terminal */}
        <Box className="bg-background-contrast border border-border p-6 font-mono text-sm overflow-x-auto h-full rounded-lg shadow-sm">
          <Box className="mb-6 flex justify-end">
            <ButtonGroup
              type="single"
              value={pkgManager}
              onValueChange={(v) => v && setPkgManager(v as 'npm' | 'pnpm' | 'yarn' | 'bun')}
            >
              <ButtonGroupItem value="npm">npm</ButtonGroupItem>
              <ButtonGroupItem value="pnpm">pnpm</ButtonGroupItem>
              <ButtonGroupItem value="yarn">yarn</ButtonGroupItem>
              <ButtonGroupItem value="bun">bun</ButtonGroupItem>
            </ButtonGroup>
          </Box>
          <Box className="mb-6 pb-6 border-b border-border">
            <Heading as="h3" size="3" className="font-sans mb-4 text-foreground">
              1. Initialisez votre projet (Tailwind/Tokens)
            </Heading>
            <Box className="flex items-center gap-2 text-foreground font-semibold">
              <Text as="span" className="text-primary">
                $
              </Text>
              {pkgManager === 'npm' && 'npx @dsfrkit/cli init'}
              {pkgManager === 'pnpm' && 'pnpm dlx @dsfrkit/cli init'}
              {pkgManager === 'yarn' && 'yarn dlx @dsfrkit/cli init'}
              {pkgManager === 'bun' && 'bunx @dsfrkit/cli init'}
            </Box>
          </Box>
          <Box className="mb-6 py-6 border-b border-border">
            <Heading as="h3" size="3" className="font-sans mb-4 mt-8 text-foreground">
              2. Ajoutez le composant de votre choix
            </Heading>
            <Box className="flex items-center gap-2 text-foreground font-semibold">
              <Text as="span" className="text-primary">
                $
              </Text>
              {pkgManager === 'npm' && 'npx @dsfrkit/cli add button alert'}
              {pkgManager === 'pnpm' && 'pnpm dlx @dsfrkit/cli add button alert'}
              {pkgManager === 'yarn' && 'yarn dlx @dsfrkit/cli add button alert'}
              {pkgManager === 'bun' && 'bunx @dsfrkit/cli add button alert'}
            </Box>
          </Box>
          <Box className="mb-6 py-6 border-b border-border">
            <Heading as="h3" size="3" className="font-sans mb-4 text-foreground">
              3. Configurez votre CSS global
            </Heading>
            <Box className="text-sm font-mono leading-relaxed overflow-x-auto">
              <Highlight
                theme={themes.vsDark}
                language="css"
                code={`/* src/index.css */\n@import '@dsfrkit/tokens/theme.css';\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  * {\n    @apply border-border;\n  }\n  body {\n    @apply bg-background text-foreground font-marianne antialiased;\n  }\n}`}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
                  <pre
                    className={className}
                    style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: 0 }}
                  >
                    {tokens.map((line: any[], i: number) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token: any, key: number) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </Box>
          </Box>

          <Box className="pt-4">
            <Heading as="h3" size="3" className="font-sans mb-4 text-foreground">
              4. Importez et utilisez depuis votre propre dossier
            </Heading>
            <Box className="text-sm font-mono leading-relaxed overflow-x-auto">
              <Highlight
                theme={themes.vsDark}
                language="tsx"
                code={
                  'import { Button } from "@/components/ui/button"\n\nexport default function Page() {\n  return (\n    <Button variant="primary">\n      Soumettre\n    </Button>\n  )\n}'
                }
              >
                {({ className, style, tokens, getLineProps, getTokenProps }: any) => (
                  <pre
                    className={className}
                    style={{ ...style, backgroundColor: 'transparent', margin: 0, padding: 0 }}
                  >
                    {tokens.map((line: any[], i: number) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token: any, key: number) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* SECTION BASSE : Fichiers manquants (Provider) */}
      <Box className="space-y-6 pt-8 border-t border-border">
        <Heading as="h3" size="4">
          Dernière étape : Ajouter le ThemeProvider
        </Heading>
        <Text className="text-foreground-muted">
          Puisque DSFRKit délègue l'exécution à Tailwind et Radix, un seul point d'entrée contextuel
          est nécessaire au sommet de votre arbre React pour synchroniser les thèmes (Clair/Sombre)
          du DSFR.
        </Text>
        <CodeBlock
          code={`// src/main.tsx ou src/App.tsx\nimport { ThemeProvider } from '@dsfrkit/react'\n\nfunction App() {\n  return (\n    <ThemeProvider defaultTheme="system">\n      <MyApp />\n    </ThemeProvider>\n  )\n}`}
        />
      </Box>
    </Box>
  )
}

export function RoutingGuide() {
  return (
    <Box className="space-y-6 mt-4">
      <Heading as="h3" size="4">
        RouterProvider (Recommandé)
      </Heading>
      <Text className="text-foreground-muted mb-4 block">
        Pour un confort de développement maximal et éviter de répéter des balises, enregistrez votre
        librairie de routage de façon globale directement dans l'arbre React à la racine ! Tous les
        composants DSFRKit se comporteront alors comme des liens natifs de votre framework.
      </Text>

      <Heading as="h4" size="3" className="mt-6">
        Exemple 1 : React Router
      </Heading>
      <Text className="text-foreground-muted text-sm block">
        Fournissez le convertisseur <Code>linkPropsAdapter</Code> pour mapper la prop interne{' '}
        <Code>href</Code> en <Code>to</Code>.
      </Text>
      <CodeBlock
        code={`import { RouterProvider, ThemeProvider } from '@dsfrkit/react'\nimport { Link as RouterLink } from 'react-router-dom'\n\nfunction App() {\n  return (\n    <RouterProvider\n      Link={RouterLink}\n      linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}\n    >\n      <ThemeProvider>\n        <MyApp />\n      </ThemeProvider>\n    </RouterProvider>\n  )\n}`}
      />

      <Heading as="h4" size="3" className="mt-6">
        Exemple 2 : TanStack Router
      </Heading>
      <CodeBlock
        code={`import { RouterProvider as DSFRRouterProvider } from '@dsfrkit/react'\nimport { Link as TanStackLink } from '@tanstack/react-router'\n\nfunction App() {\n  return (\n    <DSFRRouterProvider\n      Link={TanStackLink}\n      linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}\n    >\n      {/* ... */}\n    </DSFRRouterProvider>\n  )\n}`}
      />

      <Heading as="h4" size="3" className="mt-6">
        Exemple 3 : Next.js
      </Heading>
      <Text className="text-foreground-muted text-sm block">
        Next.js utilise la prop <Code>href</Code> par défaut, vous n'avez donc pas besoin
        d'adaptateur.
      </Text>
      <CodeBlock
        code={`'use client'\nimport { RouterProvider } from '@dsfrkit/react'\nimport NextLink from 'next/link'\n\nexport function Providers({ children }) {\n  return (\n    <RouterProvider Link={NextLink}>\n      {/* ... */}\n    </RouterProvider>\n  )\n}`}
      />

      <Heading as="h3" size="4" className="mt-8">
        Alternative locale : Pattern{' '}
        <Text as="span" className="font-mono text-primary">
          asChild
        </Text>
      </Heading>
      <Text className="text-foreground-muted block">
        Si vous ne souhaitez pas de configuration globale, tous nos composants de lien acceptent la
        prop <Code>asChild</Code> qui délègue le rendu explicitement au composant enfant :
      </Text>
      <CodeBlock
        code={`import { Link } from '@dsfrkit/react'\nimport { Link as RouterLink } from 'react-router-dom'\n\n<Link asChild>\n  <RouterLink to="/about">À propos</RouterLink>\n</Link>`}
      />
    </Box>
  )
}
