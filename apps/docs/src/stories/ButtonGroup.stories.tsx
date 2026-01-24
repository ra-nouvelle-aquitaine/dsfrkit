import { ButtonGroup, ButtonGroupItem } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      description: {
        component: `Regroupe plusieurs actions connexes de manière visuellement cohérente.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: 'La taille des boutons du groupe.',
    },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description:
        "Mode de sélection: 'single' (un seul choix actif) ou 'multiple' (plusieurs choix possibles).",
    },
    defaultValue: {
      control: 'text',
      description: 'La/les valeurs sélectionnées par défaut.',
    },
  },
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Single: Story = {
  args: { type: 'single', defaultValue: 'list' },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="list">Liste</ButtonGroupItem>
      <ButtonGroupItem value="grid">Grille</ButtonGroupItem>
      <ButtonGroupItem value="map">Carte</ButtonGroupItem>
    </ButtonGroup>
  ),
}

export const Multiple: Story = {
  args: { type: 'multiple', defaultValue: ['bold'] },
  render: (args) => (
    <ButtonGroup {...args}>
      <ButtonGroupItem value="bold">Gras</ButtonGroupItem>
      <ButtonGroupItem value="italic">Italique</ButtonGroupItem>
      <ButtonGroupItem value="underline">Souligné</ButtonGroupItem>
    </ButtonGroup>
  ),
}
