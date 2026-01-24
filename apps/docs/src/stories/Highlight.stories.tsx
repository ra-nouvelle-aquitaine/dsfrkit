import { Box, Highlight } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Typography/Highlight',
  component: Highlight,
  parameters: {
    docs: {
      description: {
        component: `Mise en valeur d'un texte court ou d'une citation dans le flux de lecture.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    accent: {
      control: 'select',
      options: [
        'default',
        'green-tilleul-verveine',
        'green-bourgeon',
        'green-emeraude',
        'green-menthe',
        'green-archipel',
        'blue-ecume',
        'blue-cumulus',
        'purple-glycine',
        'pink-macaron',
        'pink-tuile',
        'yellow-tournesol',
        'yellow-moutarde',
        'orange-terre-battue',
        'brown-cafe-creme',
        'brown-caramel',
        'brown-opera',
        'beige-gris-galet',
      ],
      description: "Couleur d'accentuation (bordure gauche) de la mise en exergue.",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
    },
    children: { control: 'text', table: { type: { summary: 'ReactNode' } } },
  },
} satisfies Meta<typeof Highlight>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    children: "Cette phrase mérite d'être mise en lumière dans le contexte de la page.",
  },
}

export const Small: Story = {
  args: { size: 'sm', children: 'Une note courte mise en exergue.' },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Une mise en exergue de grande taille pour les citations importantes.',
  },
}

const ACCENTS = [
  'green-tilleul-verveine',
  'green-bourgeon',
  'green-emeraude',
  'green-menthe',
  'green-archipel',
  'blue-ecume',
  'blue-cumulus',
  'purple-glycine',
  'pink-macaron',
  'pink-tuile',
  'yellow-tournesol',
  'yellow-moutarde',
  'orange-terre-battue',
  'brown-cafe-creme',
  'brown-caramel',
  'brown-opera',
  'beige-gris-galet',
] as const

export const AllAccents: Story = {
  name: 'Toutes les Accentuations (DSFR)',
  render: () => (
    <Box className="space-y-4">
      <Highlight accent="default">Défaut (border-l-primary)</Highlight>
      {ACCENTS.map((accent) => (
        <Highlight key={accent} accent={accent}>
          Accentuation : {accent}
        </Highlight>
      ))}
    </Box>
  ),
}
