import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `Conteneur cliquable regroupant des informations hétérogènes (image, texte, actions) liées à un même sujet.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'shadow', 'ghost', 'outlined'],
      description: 'Variante visuelle de la carte, agissant sur sa bordure, son fond ou son ombre.',
    },
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Titre de la carte</CardTitle>
        <CardDescription>Description de la carte</CardDescription>
      </CardHeader>
      <CardContent>
        <Text as="p">Contenu de la carte avec du texte d'exemple.</Text>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Bordered: Story = {
  render: (args) => (
    <Card {...args} variant="bordered" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Carte avec bordure</CardTitle>
        <CardDescription>Bordure bleue France</CardDescription>
      </CardHeader>
      <CardContent>
        <Text as="p">Cette carte a une bordure mise en évidence.</Text>
      </CardContent>
    </Card>
  ),
}

export const Shadow: Story = {
  render: (args) => (
    <Card {...args} variant="shadow" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Carte avec ombre</CardTitle>
        <CardDescription>Avec une ombre prononcée</CardDescription>
      </CardHeader>
      <CardContent>
        <Text as="p">Cette carte a une ombre plus importante pour se démarquer.</Text>
      </CardContent>
    </Card>
  ),
}

export const Ghost: Story = {
  render: (args) => (
    <Card {...args} variant="ghost" className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Carte sans bordure</CardTitle>
      </CardHeader>
      <CardContent>
        <Text as="p">Cette carte n'a pas de bordure visible.</Text>
      </CardContent>
    </Card>
  ),
}
