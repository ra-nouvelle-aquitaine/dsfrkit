import { Box, Container, Heading, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    docs: {
      description: {
        component: `Limite la largeur maximale du contenu et le centre, assurant une lisibilité optimale sur les grands écrans.
`,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'La taille maximale du conteneur (basée sur les breakpoints Tailwind)',
      table: {
        type: { summary: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'" },
        defaultValue: { summary: 'lg' },
      },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'lg',
    asChild: false,
  },
  render: (args) => {
    return (
      <Box className="bg-background-alt min-h-[200px] w-full py-8">
        <Container
          {...args}
          className="bg-background border border-border p-8 text-center rounded-md"
        >
          Contenu du Container
        </Container>
      </Box>
    )
  },
}

export const ArticleReading: Story = {
  render: () => (
    <Box className="bg-background w-full py-12">
      <Container size="md" className="space-y-6">
        <Heading as="h1" size="6">
          Format optimal de lecture (md)
        </Heading>
        <Text as="p" size="4" className="text-muted-foreground leading-relaxed">
          Le conteneur de taille "md" est parfait pour la lecture de longs textes, car il garantit
          que les lignes ne dépassent pas la largeur de lecture confortable recommandée par les
          normes d'accessibilité (environ 70-80 caractères maximum par ligne).
        </Text>
        <Text as="p" size="4" className="text-muted-foreground leading-relaxed">
          Sur écrans larges, le contenu reste centré. Sur mobile, il touchera naturellement les
          bords de l'écran avec une marge de respiration si un padding lui est appliqué.
        </Text>
      </Container>
    </Box>
  ),
}
