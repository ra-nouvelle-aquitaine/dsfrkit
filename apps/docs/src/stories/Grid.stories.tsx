import { Box, Flex, Grid } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: `Conteneur basé sur CSS Grid. Utilisé pour construire des grilles complexes et des mises en page réactives en colonnes.

**Quand l'utiliser ?** Privilégiez \`Grid\` (plutôt que \`Flex\`) pour des mises en page à deux dimensions, structurer des listes de cartes (ex: 3 colonnes), ou aligner parfaitement des éléments sur une grille globale, indépendamment du volume de leur contenu individuel.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      description: 'Nombre de colonnes uniformes dans la grille',
      table: { type: { summary: '1-12' }, defaultValue: { summary: '1' } },
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10'],
      description: 'Espacement général (gouttière)',
      table: { type: { summary: '0-10' }, defaultValue: { summary: '0' } },
    },
    gapX: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10'],
      description: 'Espacement horizontal spécifique',
      table: { type: { summary: '0-10' } },
    },
    gapY: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10'],
      description: 'Espacement vertical spécifique',
      table: { type: { summary: '0-10' } },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: '3',
    gap: '4',
    asChild: false,
  },
  render: (args) => {
    return (
      <Grid {...args} className="w-full p-4 border border-border bg-background-alt">
        <Box className="bg-primary text-background p-4 rounded text-center">Boîte 1</Box>
        <Box className="bg-primary text-background p-4 rounded text-center">Boîte 2</Box>
        <Box className="bg-primary text-background p-4 rounded text-center">Boîte 3</Box>
        <Box className="bg-primary text-background p-4 rounded text-center">Boîte 4</Box>
        <Box className="bg-primary text-background p-4 rounded text-center">Boîte 5</Box>
        <Box className="bg-primary text-background p-4 rounded text-center">Boîte 6</Box>
      </Grid>
    )
  },
}

export const DashboardCards: Story = {
  args: {
    columns: '12',
    gap: '4',
  },
  render: (args) => (
    <Grid {...args} className="w-full h-96 p-4 bg-background-alt border border-border">
      <Flex
        align="center"
        justify="center"
        className="col-span-12 md:col-span-8 bg-background border border-border p-6 rounded-lg shadow-sm text-muted-foreground"
      >
        Graphique Principal (8 cols)
      </Flex>
      <Flex
        align="center"
        justify="center"
        className="col-span-12 md:col-span-4 bg-background border border-border p-6 rounded-lg shadow-sm text-muted-foreground"
      >
        Menu Latéral (4 cols)
      </Flex>
      <Flex
        align="center"
        justify="center"
        className="col-span-12 md:col-span-4 bg-background border border-border p-6 rounded-lg shadow-sm text-muted-foreground"
      >
        Statistique A
      </Flex>
      <Flex
        align="center"
        justify="center"
        className="col-span-12 md:col-span-4 bg-background border border-border p-6 rounded-lg shadow-sm text-muted-foreground"
      >
        Statistique B
      </Flex>
      <Flex
        align="center"
        justify="center"
        className="col-span-12 md:col-span-4 bg-background border border-border p-6 rounded-lg shadow-sm text-muted-foreground"
      >
        Statistique C
      </Flex>
    </Grid>
  ),
}
