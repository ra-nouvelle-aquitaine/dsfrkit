import { Box, Heading, Section, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    docs: {
      description: {
        component: `Conteneur sémantique correspondant à une partie de page, incluant par défaut des espacements verticaux cohérents.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'none'],
      description: "L'espacement vertical (padding) appliqué en haut et en bas de la section",
      table: { type: { summary: "'sm' | 'md' | 'lg' | 'none'" }, defaultValue: { summary: 'md' } },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    asChild: false,
  },
  render: (args) => {
    return (
      <Box className="border border-red-500 border-dashed w-full">
        <Section {...args} className="bg-background-alt text-center">
          <Text>Section de contenu avec du padding (remarquez l'espacement intérieur).</Text>
        </Section>
      </Box>
    )
  },
}

export const LandingStructure: Story = {
  render: () => (
    <Box className="w-full border border-border overflow-hidden rounded-md">
      <Section size="lg" className="bg-primary text-background text-center">
        <Heading as="h1" size="6" className="mb-4 text-inverted">
          Hero Section (lg)
        </Heading>
        <Text as="p" size="4" className="text-inverted max-w-2xl mx-auto">
          Une section avec un espacement vertical très ample, idéale pour l'en-tête principal d'un
          site vitrine.
        </Text>
      </Section>
      <Section size="md" className="bg-background text-foreground text-center">
        <Heading as="h2" size="6" className="mb-4 text-foreground">
          Fonctionnalités Clés (md)
        </Heading>
        <Text as="p" size="3" className="text-foreground max-w-xl mx-auto">
          L'espacement modéré par défaut est pensé pour englober et aérer le contenu informatif
          standard de l'application.
        </Text>
      </Section>
      <Section size="sm" className="bg-background-alt text-foreground text-center">
        <Heading as="h3" size="5" className="mb-4 text-foreground">
          Bandeau ou Footer (sm)
        </Heading>
        <Text as="p" size="2" className="text-foreground">
          L'espacement vertical court convient aux zones secondaires comme une bannière de
          newsletter ou un pied de page dense.
        </Text>
      </Section>
    </Box>
  ),
}
