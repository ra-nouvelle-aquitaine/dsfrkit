import { NavLink } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/NavLink',
  component: NavLink,
  parameters: {
    docs: {
      description: {
        component: `Lien spécifiquement conçu pour la navigation principale (menu).
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'header', 'side', 'footer'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    isActive: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    href: { control: 'text', table: { type: { summary: 'string' } } },
    children: { control: 'text', table: { type: { summary: 'ReactNode' } } },
  },
} satisfies Meta<typeof NavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { href: '#', children: 'Accueil' },
}

export const Active: Story = {
  args: { href: '#', children: 'Page active', isActive: true },
}

export const HeaderVariant: Story = {
  args: { href: '#', variant: 'header', children: 'Navigation header' },
}

export const SideVariant: Story = {
  args: { href: '#', variant: 'side', children: 'Menu latéral' },
}
