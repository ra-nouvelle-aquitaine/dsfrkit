import { Box, Heading, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component: `Composant conteneur générique servant de brique de base pour la mise en page. Permet d'appliquer rapidement des espacements ou des couleurs.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    asChild: false,
  },
  render: () => (
    <Box className="bg-primary text-background p-4 rounded text-center">
      Ceci est une Box avec du contenu.
    </Box>
  ),
}

export const CardUsage: Story = {
  render: () => (
    <Box className="bg-background border border-border rounded-lg shadow-sm overflow-hidden w-80">
      <Box className="bg-muted h-32 w-full flex items-center justify-center text-muted-foreground text-sm">
        Zone Image
      </Box>
      <Box className="p-6">
        <Heading as="h3" size="5" className="mb-2">
          Carte Produit
        </Heading>
        <Text as="p" size="2" className="text-muted-foreground">
          La Box est une brique fondamentale idéale pour construire des composants complexes avec un
          contrôle total sur les espacements et les conteneurs internes.
        </Text>
      </Box>
    </Box>
  ),
}
