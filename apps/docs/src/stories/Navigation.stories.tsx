import {
  RiFileTextLineIcon,
  RiFolder2LineIcon,
  RiHome3LineIcon,
  RiMailLineIcon,
  RiSettings3LineIcon,
} from '@dsfrkit/icons'
import { Box, Navigation, NavigationItem, NavigationSection } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Navigation',
  component: Navigation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      description:
        "Orientation de la navigation. 'horizontal' pour le menu principal (Header), 'vertical' pour un menu latéral (SideMenu/Dashboard).",
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
    title: {
      description:
        "Le titre de la navigation (visible uniquement en orientation 'vertical'). Idéal pour titrer un menu latéral.",
      control: 'text',
    },
  },
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

export const VerticalSideMenu: Story = {
  args: {
    orientation: 'vertical',
    title: 'Titre de rubrique',
  },
  parameters: {
    docs: {
      source: {
        code: `
<Box className="w-80">
  <Navigation orientation="vertical" title="Titre de rubrique">
    <NavigationSection title="Titre du lien 1" defaultOpen isActive>
      <NavigationItem href="#" isActive icon={<RiHome3LineIcon />}>Accueil</NavigationItem>
      <NavigationSection title="Documents" defaultOpen>
        <NavigationItem href="#" icon={<RiFileTextLineIcon />}>Notes de frais</NavigationItem>
        <NavigationItem href="#" icon={<RiFolder2LineIcon />}>Rapports</NavigationItem>
      </NavigationSection>
      <NavigationItem href="#" icon={<RiSettings3LineIcon />}>Paramètres</NavigationItem>
      <NavigationItem href="#" icon={<RiMailLineIcon />}>Contact</NavigationItem>
    </NavigationSection>
  </Navigation>
</Box>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <Box className="w-80">
      <Navigation {...args}>
        <NavigationSection title="Titre du lien 1" defaultOpen isActive>
          <NavigationItem href="#" isActive icon={<RiHome3LineIcon />}>
            Accueil
          </NavigationItem>
          <NavigationSection title="Documents" defaultOpen>
            <NavigationItem href="#" icon={<RiFileTextLineIcon />}>
              Notes de frais
            </NavigationItem>
            <NavigationItem href="#" icon={<RiFolder2LineIcon />}>
              Rapports
            </NavigationItem>
          </NavigationSection>
          <NavigationItem href="#" icon={<RiSettings3LineIcon />}>
            Paramètres
          </NavigationItem>
          <NavigationItem href="#" icon={<RiMailLineIcon />}>
            Contact
          </NavigationItem>
        </NavigationSection>
      </Navigation>
    </Box>
  ),
}

export const HorizontalNav: Story = {
  args: {
    orientation: 'horizontal',
  },
  parameters: {
    docs: {
      source: {
        code: `
<Box className="w-full mt-4 min-h-[300px]">
  <Navigation orientation="horizontal">
    <NavigationItem href="#" isActive icon={<RiHome3LineIcon />}>Accueil</NavigationItem>
    <NavigationSection title="Ressources">
      <NavigationItem href="#" icon={<RiFileTextLineIcon />}>Documentation</NavigationItem>
      <NavigationItem href="#" icon={<RiFolder2LineIcon />}>Tutoriels</NavigationItem>
    </NavigationSection>
    <NavigationItem href="#" icon={<RiMailLineIcon />}>Contact</NavigationItem>
  </Navigation>
</Box>
        `.trim(),
      },
    },
  },
  render: (args) => (
    <Box className="w-full mt-4 min-h-[300px]">
      <Navigation {...args}>
        <NavigationItem href="#" isActive icon={<RiHome3LineIcon />}>
          Accueil
        </NavigationItem>
        <NavigationSection title="Ressources">
          <NavigationItem href="#" icon={<RiFileTextLineIcon />}>
            Documentation
          </NavigationItem>
          <NavigationItem href="#" icon={<RiFolder2LineIcon />}>
            Tutoriels
          </NavigationItem>
        </NavigationSection>
        <NavigationItem href="#" icon={<RiMailLineIcon />}>
          Contact
        </NavigationItem>
      </Navigation>
    </Box>
  ),
}

export const VerticalWithoutTitle: Story = {
  parameters: {
    docs: {
      source: {
        code: `
<Box className="w-80">
  <Navigation orientation="vertical">
    <NavigationItem href="#" isActive>Accueil</NavigationItem>
    <NavigationItem href="#">Services</NavigationItem>
    <NavigationItem href="#">Contact</NavigationItem>
  </Navigation>
</Box>
        `.trim(),
      },
    },
  },
  render: () => (
    <Box className="w-80">
      <Navigation orientation="vertical">
        <NavigationItem href="#" isActive>
          Accueil
        </NavigationItem>
        <NavigationItem href="#">Services</NavigationItem>
        <NavigationItem href="#">Contact</NavigationItem>
      </Navigation>
    </Box>
  ),
}
