import { RiUpload2LineIcon, RiUserLineIcon } from '@dsfrkit/icons'
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Box,
  Flex,
  Text,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dsfrkit/react'
import type { Meta } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `Affiche une image de profil, des initiales ou une icône représentant un utilisateur ou une entité.`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: "La taille de l'avatar. Suit les dimensions standards du DSFR.",
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'rounded', 'square'],
      description:
        "La forme de l'avatar (cercle complet, bords arrondis standards, ou carré strict).",
    },
  },
  args: {
    size: 'md',
    shape: 'circle',
  },
} satisfies Meta<typeof Avatar>

export default meta

export const Default = (args: any) => (
  <Avatar {...args}>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)

export const Initials = (args: any) => (
  <Flex className="gap-4">
    <Avatar {...args}>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar {...args}>
      <AvatarFallback autoColor>JD</AvatarFallback>
    </Avatar>
    <Avatar {...args}>
      <AvatarFallback autoColor>AB</AvatarFallback>
    </Avatar>
    <Avatar {...args}>
      <AvatarFallback autoColor>YZ</AvatarFallback>
    </Avatar>
  </Flex>
)

export const ShapesAndSizes = () => (
  <Flex direction="col" className="gap-6">
    <Flex align="end" className="gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </Flex>
    <Flex className="gap-4">
      <Avatar shape="circle">
        <AvatarFallback>C</AvatarFallback>
      </Avatar>
      <Avatar shape="rounded">
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
    </Flex>
  </Flex>
)

export const WithStatus = (args: any) => (
  <Flex className="gap-6">
    <Box className="relative inline-flex">
      <Avatar {...args}>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <AvatarBadge
        variant="success"
        size="dot"
        className="absolute bottom-0 right-0 top-auto translate-x-1/4 translate-y-1/4"
      />
    </Box>
    <Box className="relative inline-flex">
      <Avatar {...args}>
        <AvatarFallback autoColor>MK</AvatarFallback>
      </Avatar>
      <AvatarBadge
        variant="warning"
        size="dot"
        className="absolute bottom-0 right-1 top-auto translate-x-1/4 translate-y-1/4"
      />
    </Box>
    <Box className="relative inline-flex">
      <Avatar {...args}>
        <AvatarFallback autoColor>JL</AvatarFallback>
      </Avatar>
      <AvatarBadge variant="default" count={3} className="absolute top-0 right-0" />
    </Box>
  </Flex>
)

export const Group = (args: any) => (
  <AvatarGroup max={3}>
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?u=1" />
      <AvatarFallback>A1</AvatarFallback>
    </Avatar>
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?u=2" />
      <AvatarFallback>A2</AvatarFallback>
    </Avatar>
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?u=3" />
      <AvatarFallback>A3</AvatarFallback>
    </Avatar>
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?u=4" />
      <AvatarFallback>A4</AvatarFallback>
    </Avatar>
    <Avatar {...args}>
      <AvatarImage src="https://i.pravatar.cc/150?u=5" />
      <AvatarFallback>A5</AvatarFallback>
    </Avatar>
  </AvatarGroup>
)

export const UploadAction = (args: any) => (
  <button className="group relative rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
    <Avatar size="xl" {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>
        <RiUserLineIcon size={32} />
      </AvatarFallback>
    </Avatar>
    <Flex
      align="center"
      justify="center"
      className="absolute inset-0 rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <RiUpload2LineIcon size={24} className="text-white" />
    </Flex>
  </button>
)
UploadAction.storyName = 'Bouton Upload (Custom)'

export const WithTooltip = (args: any) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          <Avatar {...args}>
            <AvatarFallback autoColor>J</AvatarFallback>
          </Avatar>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <Text>Jean Dupont</Text>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)
