import { Box, SkipLinks, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/SkipLinks',
  component: SkipLinks,
  parameters: {
    docs: {
      description: {
        component: `Liens d'évitement au début du document améliorant grandement l'accessibilité pour la navigation au clavier.

**Cibles par défaut :**
- \`#main-content\` — à poser sur \`<main id="main-content" tabIndex={-1}>\` ;
- \`#main-navigation\` — posé automatiquement sur la navigation principale de l'en-tête (\`Navigation\` ou \`HeaderNav\` dans un \`Header\`) ;
- \`#footer\` — posé automatiquement par \`Footer\`.

Si une cible n'existe pas dans la page, passez vos propres liens avec \`links\`.
`,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkipLinks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: (args) => (
    <Box>
      <SkipLinks {...args} />
      <Text className="p-4 text-sm text-foreground-muted">
        Utilisez la touche Tab pour voir les liens d'évitement.
      </Text>
    </Box>
  ),
}

export const Custom: Story = {
  args: {
    links: [
      { targetId: 'content', label: 'Aller au contenu' },
      { targetId: 'search', label: 'Aller à la recherche' },
    ],
  },
  render: (args) => (
    <Box>
      <SkipLinks {...args} />
      <Text className="p-4 text-sm text-foreground-muted">
        Utilisez la touche Tab pour voir les liens d'évitement.
      </Text>
    </Box>
  ),
}
