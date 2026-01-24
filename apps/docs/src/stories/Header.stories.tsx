import { Header, HeaderBody, HeaderBrand, HeaderNav, Logo, NavLink } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Taille du conteneur du corps du header',
    },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => (
    <Header {...args}>
      <HeaderBody>
        <HeaderBrand
          logo={<Logo size="sm" />}
          serviceTitle="Mon Service"
          serviceTagline="Description du service"
          href="/"
        />
        <HeaderNav>
          <NavLink href="#" variant="header" isActive>
            Accueil
          </NavLink>
          <NavLink href="#" variant="header">
            Démarches
          </NavLink>
          <NavLink href="#" variant="header">
            Contact
          </NavLink>
        </HeaderNav>
      </HeaderBody>
    </Header>
  ),
}

export const Large: Story = {
  args: {
    size: 'xl',
  },
  render: (args) => (
    <Header {...args}>
      <HeaderBody>
        <HeaderBrand
          logo={<Logo size="md" />}
          serviceTitle="Ministère de l'Éducation"
          serviceTagline="Liberté, Égalité, Fraternité"
          href="/"
        />
        <HeaderNav>
          <NavLink href="#" variant="header" isActive>
            Accueil
          </NavLink>
          <NavLink href="#" variant="header">
            Établissements
          </NavLink>
          <NavLink href="#" variant="header">
            Diplômes
          </NavLink>
        </HeaderNav>
      </HeaderBody>
    </Header>
  ),
}
