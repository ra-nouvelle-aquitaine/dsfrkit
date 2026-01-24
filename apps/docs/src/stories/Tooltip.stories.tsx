import {
  Button,
  Flex,
  Grid,
  Text,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

/**
 * L'infobulle (tooltip) affiche une information contextuelle au survol ou au focus d'un élément.
 * Elle utilise Radix UI pour l'accessibilité et respecte les conventions DSFR.
 */
const meta = {
  title: 'Utils/Tooltip',
  // On cible TooltipContent car c'est là que vivent les props intéressantes (showArrow, size, side…)
  component: TooltipContent,
  parameters: {
    docs: {
      description: {
        component: `Bulle d'aide affichée au survol (ou focus) qui décrit ou précise la fonction de l'élément ciblé.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  argTypes: {
    showArrow: {
      control: 'boolean',
      description: "Affiche ou masque la flèche pointeur de l'infobulle.",
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du tooltip.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Côté sur lequel le tooltip apparaît.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'top' } },
    },
  },
} satisfies Meta<typeof TooltipContent>

export default meta
type Story = StoryObj<typeof TooltipContent>

export const Default: Story = {
  args: {
    showArrow: true,
    size: 'md',
    side: 'top',
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="tertiary">Survolez-moi</Button>
      </TooltipTrigger>
      <TooltipContent {...args}>
        <Text>Information contextuelle</Text>
      </TooltipContent>
    </Tooltip>
  ),
}

export const SansFlèche: Story = {
  args: {
    showArrow: false,
    size: 'md',
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="tertiary">Sans flèche</Button>
      </TooltipTrigger>
      <TooltipContent {...args}>
        <Text>Tooltip sans flèche</Text>
      </TooltipContent>
    </Tooltip>
  ),
}

export const Tailles: Story = {
  render: () => (
    <Flex align="center" className="gap-8">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary" size="sm">
            SM
          </Button>
        </TooltipTrigger>
        <TooltipContent size="sm">
          <Text>Petit tooltip</Text>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary">MD</Button>
        </TooltipTrigger>
        <TooltipContent size="md">
          <Text>Tooltip medium (défaut)</Text>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="tertiary" size="lg">
            LG
          </Button>
        </TooltipTrigger>
        <TooltipContent size="lg">
          <Text>Grand tooltip avec plus de texte disponible</Text>
        </TooltipContent>
      </Tooltip>
    </Flex>
  ),
}

export const Positions: Story = {
  render: () => (
    <Grid columns="2" className="gap-8 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="tertiary">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <Text>Tooltip en position {side}</Text>
          </TooltipContent>
        </Tooltip>
      ))}
    </Grid>
  ),
}
