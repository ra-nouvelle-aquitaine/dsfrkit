import { Flex, ThemeToggle } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Branding/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    docs: {
      description: {
        component: `Bouton pour alterner entre le thème clair et le thème sombre selon le choix de l'utilisateur.`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    iconOnly: {
      control: 'boolean',
      description: "Affiche uniquement l'icône",
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      description: 'Variante visuelle du bouton',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'secondary' } },
    },
    withBorder: {
      control: 'boolean',
      description: 'Affiche la bordure (border-border)',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof ThemeToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'md',
    iconOnly: false,
    variant: 'ghost',
  },
}

export const IconOnly: Story = {
  args: {
    size: 'md',
    iconOnly: true,
    variant: 'ghost',
  },
}

export const Sizes: Story = {
  render: () => (
    <Flex align="center" className="gap-4">
      <ThemeToggle size="sm" />
      <ThemeToggle size="md" />
      <ThemeToggle size="lg" />
    </Flex>
  ),
}
