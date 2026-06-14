import { Box, ScrollArea, ScrollBar, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof ScrollArea> = {
  title: 'Layout/ScrollArea',
  component: ScrollArea,
  parameters: {
    docs: {
      description: {
        component: `Un conteneur défilant qui personnalise l'apparence des barres de défilement pour s'intégrer parfaitement au DSFR. 
        Contrairement au défilement natif du navigateur, \`ScrollArea\` offre une apparence unifiée sur tous les systèmes d'exploitation (Windows, macOS, Linux).`,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-none border border-border">
      <Box className="p-4">
        <Text weight="bold" className="mb-4 block">
          Régions de France
        </Text>
        {[
          'Auvergne-Rhône-Alpes',
          'Bourgogne-Franche-Comté',
          'Bretagne',
          'Centre-Val de Loire',
          'Corse',
          'Grand Est',
          'Hauts-de-France',
          'Île-de-France',
          'Normandie',
          'Nouvelle-Aquitaine',
          'Occitanie',
          'Pays de la Loire',
          "Provence-Alpes-Côte d'Azur",
          'Guadeloupe',
          'Martinique',
          'Guyane',
          'La Réunion',
          'Mayotte',
        ].map((region) => (
          <Box key={region} className="mb-2">
            <Text size="2">{region}</Text>
          </Box>
        ))}
      </Box>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-none border border-border">
      <Box className="flex w-max p-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <Box
            key={i}
            className="flex h-24 w-24 items-center justify-center bg-muted mr-4 border border-border"
          >
            <Text weight="bold">Item {i + 1}</Text>
          </Box>
        ))}
      </Box>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  ),
}

export const Both: Story = {
  render: () => (
    <ScrollArea className="h-72 w-96 rounded-none border border-border">
      <Box className="p-4 w-[600px]">
        <Text weight="bold" className="mb-4 block">
          Tableau large
        </Text>
        <Text className="mb-4">
          Faites défiler horizontalement et verticalement pour voir le contenu complet.
        </Text>
        {Array.from({ length: 15 }).map((_, i) => (
          <Box key={i} className="flex mb-4 items-center">
            {Array.from({ length: 10 }).map((_, j) => (
              <Box
                key={j}
                className="flex h-12 w-32 items-center justify-center bg-muted mr-2 border border-border"
              >
                <Text size="2">
                  L{i + 1}-C{j + 1}
                </Text>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  ),
}
