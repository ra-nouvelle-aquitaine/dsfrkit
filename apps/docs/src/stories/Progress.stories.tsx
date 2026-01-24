import { Box, Progress, type ProgressProps, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'

const meta = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    docs: {
      description: {
        component: `Barre de progression indiquant l'état d'avancement d'une tâche (téléchargement, formulaire en plusieurs étapes).
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    'aria-label': 'Progression de la tâche',
  },
  argTypes: {
    value: {
      table: { type: { summary: 'number' } },
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: "Valeur d'avancement entre 0 et 100",
    },
    animationDuration: {
      table: { type: { summary: 'number' } },
      control: 'number',
      description: "Durée de l'animation CSS de transition (en millisecondes)",
    },
    variant: {
      table: { type: { summary: 'string' }, defaultValue: { summary: 'primary' } },
      control: 'select',
      options: [
        'primary',
        'error',
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
      description: 'Couleurs et intentions',
    },
    size: {
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
      control: 'radio',
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Taille de la barre',
    },
  },
} satisfies Meta<ProgressProps>

export default meta
type Story = StoryObj<ProgressProps>

export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => <Progress {...args} className="w-[300px]" />,
}

export const Animated: Story = {
  render: (args) => {
    const [progress, setProgress] = useState(13)

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])

    return <Progress {...args} value={progress} className="w-[300px]" />
  },
}

export const CustomAnimationSpeed: Story = {
  args: {
    value: 80,
    animationDuration: 2000,
  },
  render: (args) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
      setProgress(args.value || 80)
    }, [args.value])

    return (
      <Box className="w-[300px] space-y-2">
        <Text as="p" size="2" className="text-foreground-muted">
          Animation lente ({args.animationDuration}ms)
        </Text>
        <Progress {...args} value={progress} />
      </Box>
    )
  },
}

export const SuccessVariant: Story = {
  args: {
    value: 100,
    variant: 'success',
  },
  render: (args) => (
    <Box className="w-[300px] space-y-2">
      <Box className="flex justify-between text-sm font-medium">
        <Text as="span">Installation terminée</Text>
        <Text as="span" className="text-success">
          100%
        </Text>
      </Box>
      <Progress {...args} className="w-full" />
    </Box>
  ),
}

const ACCENTS = [
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

export const AllVariants: Story = {
  render: () => (
    <Box className="w-[400px] space-y-3">
      <Box className="space-y-1">
        <Text as="span" size="1" weight="medium">
          primary
        </Text>
        <Progress aria-label="Progression indicative" value={70} variant="primary" />
      </Box>
      <Box className="space-y-1">
        <Text as="span" size="1" weight="medium">
          success
        </Text>
        <Progress aria-label="Progression indicative" value={100} variant="success" />
      </Box>
      <Box className="space-y-1">
        <Text as="span" size="1" weight="medium">
          error
        </Text>
        <Progress aria-label="Progression indicative" value={40} variant="error" />
      </Box>
      <Box className="space-y-1">
        <Text as="span" size="1" weight="medium">
          warning
        </Text>
        <Progress aria-label="Progression indicative" value={60} variant="warning" />
      </Box>
      <Box className="space-y-1">
        <Text as="span" size="1" weight="medium">
          info
        </Text>
        <Progress aria-label="Progression indicative" value={80} variant="info" />
      </Box>
    </Box>
  ),
}

export const AllAccents: Story = {
  render: () => (
    <Box className="w-[400px] space-y-3">
      {ACCENTS.map((accent) => (
        <Box key={accent} className="space-y-1">
          <Text as="span" size="1" weight="medium">
            {accent}
          </Text>
          <Progress aria-label="Progression indicative" value={65} variant={accent} />
        </Box>
      ))}
    </Box>
  ),
}
