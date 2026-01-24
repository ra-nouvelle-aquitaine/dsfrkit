import { Box, Flex, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    docs: {
      description: {
        component: `Conteneur basé sur Flexbox. Utilisé pour aligner des éléments horizontalement ou verticalement avec une répartition de l'espace contrôlée.

**Quand l'utiliser ?** Privilégiez \`Flex\` pour des alignements simples à une seule dimension (une ligne ou une colonne), centrer des éléments, ou gérer des composants de navigation et des barres d'outils.

**Alternative :** Pour des mises en page réactives en deux dimensions (lignes ET colonnes simultanément), utilisez plutôt \`Grid\`.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'col', 'row-reverse', 'col-reverse'],
      description: 'Direction du flux flexbox',
      table: {
        type: { summary: "'row' | 'col' | 'row-reverse' | 'col-reverse'" },
        defaultValue: { summary: 'row' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: "Alignement sur l'axe principal",
      table: {
        type: { summary: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'" },
        defaultValue: { summary: 'start' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: "Alignement sur l'axe transversal",
      table: {
        type: { summary: "'start' | 'center' | 'end' | 'stretch' | 'baseline'" },
        defaultValue: { summary: 'stretch' },
      },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Comportement du passage à la ligne',
      table: {
        type: { summary: "'nowrap' | 'wrap' | 'wrap-reverse'" },
        defaultValue: { summary: 'nowrap' },
      },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    wrap: 'nowrap',
    asChild: false,
  },
  render: (args) => {
    return (
      <Flex {...args} className="gap-4 w-full p-4 border border-border bg-background-alt">
        <Box className="bg-primary text-background p-4 rounded text-center">Un</Box>
        <Box className="bg-primary text-background p-4 rounded text-center">Deux</Box>
        <Box className="bg-primary text-background p-4 rounded text-center">Trois</Box>
      </Flex>
    )
  },
}

export const NavigationBar: Story = {
  render: () => (
    <Flex
      justify="between"
      align="center"
      className="w-full p-4 border-b border-border bg-background"
    >
      <Flex className="gap-4" align="center">
        <Box className="w-8 h-8 bg-primary rounded-full" />
        <Text weight="bold">Mon App DSFR</Text>
      </Flex>
      <Flex className="gap-6 items-center">
        <Text
          size="2"
          weight="medium"
          className="hover:text-primary cursor-pointer transition-colors"
        >
          Accueil
        </Text>
        <Text
          size="2"
          weight="medium"
          className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        >
          Services
        </Text>
        <Text
          size="2"
          weight="medium"
          className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        >
          Contact
        </Text>
      </Flex>
    </Flex>
  ),
}
