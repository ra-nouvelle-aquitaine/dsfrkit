import { Box, Flex, Separator, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Separator',
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: `Ligne de séparation horizontale ou verticale permettant de diviser le contenu visuellement et sémantiquement.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      table: { type: { summary: 'string' }, defaultValue: { summary: 'horizontal' } },
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du séparateur',
    },
    decorative: {
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
      control: 'boolean',
      description: "Si true, le séparateur est ignoré par les lecteurs d'écran",
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => {
    if (args.orientation === 'vertical') {
      return (
        <Flex align="center" className="h-5 space-x-4 text-sm">
          <Text as="span">Accueil</Text>
          <Separator {...args} />
          <Text as="span">Actualités</Text>
          <Separator {...args} />
          <Text as="span">Contact</Text>
        </Flex>
      )
    }

    return (
      <Box className="w-[300px]">
        <Text size="2" className="font-medium">
          Titre de section
        </Text>
        <Separator {...args} className="my-4" />
        <Text size="2">Contenu sous le séparateur.</Text>
      </Box>
    )
  },
}

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    decorative: true,
  },
  render: (args) => (
    <Flex align="center" justify="start" className="h-5 space-x-4 text-sm font-medium">
      <Text as="span">Article 1</Text>
      <Separator {...args} />
      <Text as="span">Article 2</Text>
      <Separator {...args} />
      <Text as="span">Article 3</Text>
    </Flex>
  ),
}
