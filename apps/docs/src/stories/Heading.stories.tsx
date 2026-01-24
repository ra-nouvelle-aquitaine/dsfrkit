import { Box, Flex, Heading, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    docs: {
      description: {
        component: `Titrage sémantique et visuel pour définir la structure logique de la page (de \`h1\` à \`h6\`).

**Quand l'utiliser ?** Dès lors que le texte introduit ou sert de titre à une nouvelle section de contenu. Indispensable pour l'accessibilité (notamment selon les règles RGAA) : les lecteurs d'écran se basent sur les Headings ("as") pour comprendre l'arborescence. Attention, les niveaux de titre doivent toujours se suivre de manière logique et sans saut (ex: un \`h3\` doit toujours suivre un \`h2\`).
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Balise sémantique HTML utilisée (impacte le SEO)',
      table: {
        type: { summary: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'" },
        defaultValue: { summary: 'h2' },
      },
    },
    size: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6'],
      description: 'Taille visuelle du titre',
      table: { type: { summary: "'1' - '6'" }, defaultValue: { summary: '6' } },
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'bold'],
      description: 'Graisse de la police',
      table: {
        type: { summary: "'light' | 'regular' | 'medium' | 'bold'" },
        defaultValue: { summary: 'bold' },
      },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    as: 'h1',
    size: '6',
    weight: 'bold',
    asChild: false,
    children: 'Le renard brun et rapide saute...',
  },
}

export const Hierarchy: Story = {
  render: () => {
    return (
      <Flex direction="col" className="gap-6 w-full p-8 bg-background-alt border border-border">
        <Heading as="h1" size="6">
          Titre principal de la page (H1)
        </Heading>
        <Box className="space-y-4">
          <Heading as="h2" size="5" className="text-primary">
            Section majeure (H2)
          </Heading>
          <Text as="p">Un peu de contenu texte pour l'introduction de cette section.</Text>
          <Heading as="h3" size="4" weight="medium">
            Sous-section (H3)
          </Heading>
          <Text as="p">Détails spécifiques à la sous-section.</Text>
        </Box>
      </Flex>
    )
  },
}
