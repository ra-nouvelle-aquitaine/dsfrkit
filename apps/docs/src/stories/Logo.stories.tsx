import { Logo } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Branding/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component: `Affiche le logo République Française officiel.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    showMotto: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    alt: { control: 'text', table: { type: { summary: 'string' } } },
    serviceTitle: {
      control: 'text',
      description: 'Texte institutionnel surligné personnalisable',
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { size: 'md', showMotto: true },
}

export const CustomServiceTitle: Story = {
  args: {
    size: 'lg',
    showMotto: true,
    serviceTitle: 'Ministère\nde la Transition\nÉcologique',
  },
}

export const WithoutMotto: Story = {
  args: { size: 'md', showMotto: false },
}

export const Small: Story = {
  args: { size: 'sm', showMotto: true },
}

export const Large: Story = {
  args: { size: 'lg', showMotto: true },
}
