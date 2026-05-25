import { AspectRatio, Box, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof AspectRatio> = {
  title: 'Layout/AspectRatio',
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component: `Affiche du contenu dans un ratio d'aspect spécifique (ex: 16/9, 4/3, 1/1). 
        Très utile pour les images, les vidéos (iframes) et les cartes, afin d'éviter les sauts de mise en page pendant le chargement (Cumulative Layout Shift).`,
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Ratio16_9: Story = {
  name: 'Ratio 16:9',
  render: () => (
    <Box className="w-[400px]">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop"
          alt="Décoratif"
          className="object-cover w-full h-full"
        />
      </AspectRatio>
    </Box>
  ),
}

export const Ratio4_3: Story = {
  name: 'Ratio 4:3',
  render: () => (
    <Box className="w-[400px]">
      <AspectRatio ratio={4 / 3} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop"
          alt="Décoratif"
          className="object-cover w-full h-full"
        />
      </AspectRatio>
    </Box>
  ),
}

export const Ratio1_1: Story = {
  name: 'Ratio 1:1 (Carré)',
  render: () => (
    <Box className="w-[300px]">
      <AspectRatio ratio={1} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop"
          alt="Décoratif"
          className="object-cover w-full h-full"
        />
      </AspectRatio>
    </Box>
  ),
}

export const Ratio21_9: Story = {
  name: 'Ratio 21:9 (Cinéma)',
  render: () => (
    <Box className="w-[600px]">
      <AspectRatio ratio={21 / 9} className="bg-muted">
        <img
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop"
          alt="Décoratif"
          className="object-cover w-full h-full"
        />
      </AspectRatio>
    </Box>
  ),
}

export const WithMapOrIframe: Story = {
  name: 'Avec Iframe (Vidéo/Carte)',
  render: () => (
    <Box className="w-[500px]">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted flex items-center justify-center border border-border"
      >
        <Text>Iframe ou contenu dynamique ici</Text>
      </AspectRatio>
    </Box>
  ),
}
