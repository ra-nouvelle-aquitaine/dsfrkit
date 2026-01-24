import { RiMailLineIcon, RiNotification3LineIcon, RiShoppingCartLineIcon } from '@dsfrkit/icons'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Box,
  Flex,
  Grid,
  Indicator,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Indicator',
  component: Indicator,
  parameters: {
    docs: {
      description: {
        component: `Petite pastille (souvent rouge) pour indiquer la présence d'une ou plusieurs notifications ou éléments non lus.
`,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    count: {
      description: 'Nombre affiché dans la pastille. Ignoré si size="dot".',
      control: { type: 'number' },
      table: { type: { summary: 'number' } },
    },
    max: {
      description: 'Nombre maximum avant de tronquer (ex: 99+).',
      control: { type: 'number' },
      table: { type: { summary: 'number' }, defaultValue: { summary: '99' } },
    },
    show: {
      description: 'Permet de masquer ou afficher la pastille.',
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    size: {
      description: 'Taille de la pastille (default, sm, dot).',
      control: { type: 'select' },
      options: ['default', 'sm', 'dot'],
      table: { type: { summary: 'string' }, defaultValue: { summary: "'default'" } },
    },
    variant: {
      description: "Statut ou couleur d'accentuation DSFR de la pastille.",
      control: { type: 'select' },
      table: { type: { summary: 'string' }, defaultValue: { summary: "'default'" } },
      options: [
        'default',
        'success',
        'warning',
        'info',
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
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Indicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 3,
    children: (
      <Box className="p-2 border border-border rounded">
        <RiNotification3LineIcon size={24} />
      </Box>
    ),
  },
}

export const Dot: Story = {
  args: {
    size: 'dot',
    children: (
      <Box className="p-2 border border-border rounded">
        <RiMailLineIcon size={24} />
      </Box>
    ),
  },
}

export const Overflow: Story = {
  args: {
    count: 150,
    max: 99,
    children: (
      <Box className="p-2 border border-border rounded">
        <RiShoppingCartLineIcon size={24} />
      </Box>
    ),
  },
}

export const Variants = (args: any) => (
  <Flex className="gap-6">
    <Indicator count={1} variant="default" {...args}>
      <Box className="p-2 border border-border rounded">
        <RiNotification3LineIcon size={24} />
      </Box>
    </Indicator>
    <Indicator count={2} variant="success" {...args}>
      <Box className="p-2 border border-border rounded">
        <RiNotification3LineIcon size={24} />
      </Box>
    </Indicator>
    <Indicator count={3} variant="warning" {...args}>
      <Box className="p-2 border border-border rounded">
        <RiNotification3LineIcon size={24} />
      </Box>
    </Indicator>
    <Indicator count={4} variant="info" {...args}>
      <Box className="p-2 border border-border rounded">
        <RiNotification3LineIcon size={24} />
      </Box>
    </Indicator>
  </Flex>
)

const ACCENT_COLORS = [
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

export const Accents = (args: any) => (
  <Grid columns="4" className="gap-8">
    {ACCENT_COLORS.map((accent) => (
      <Flex key={accent} direction="col" align="center" className="gap-2">
        <Indicator count={1} variant={accent} {...args}>
          <Box className="p-2 border border-border rounded">
            <RiNotification3LineIcon size={24} />
          </Box>
        </Indicator>
        <Text as="span" size="1" className="text-foreground-muted truncate w-full text-center">
          {accent}
        </Text>
      </Flex>
    ))}
  </Grid>
)

export const OnAvatar: Story = {
  args: {
    size: 'dot',
    variant: 'success',
    children: (
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    ),
  },
}
