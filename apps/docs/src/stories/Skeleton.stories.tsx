import { Box, Flex, Separator, Skeleton } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Skeleton',
  component: Skeleton,
  parameters: {
    docs: {
      description: {
        component: `Emplacement factice affiché pendant un chargement de données (placeholder) pour prévenir l'effet de saut.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'pulse' } },
      description: 'Animation visuelle du Skeleton',
    },
    className: {
      control: 'text',
      description:
        'Classes utilitaires Tailwind pour dimensionner ou ajuster la zone de chargement',
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    animation: 'pulse',
    className: 'w-[250px] h-4 rounded-md',
  },
  render: (args) => <Skeleton {...args} />,
}

export const AvatarAndText: Story = {
  render: () => (
    <Flex align="center" className="gap-4">
      <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
      <Box className="space-y-2">
        <Skeleton className="h-4 w-[250px] rounded-md" />
        <Skeleton className="h-4 w-[200px] rounded-md" />
      </Box>
    </Flex>
  ),
}

export const ArticleLoading: Story = {
  render: () => (
    <Box className="space-y-6 max-w-3xl w-full p-4">
      <Box className="space-y-3">
        <Skeleton className="h-8 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/4 rounded-md" />
      </Box>
      <Separator />
      <Box className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
      </Box>
      <Box className="space-y-3 pt-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-2/3" />
      </Box>
    </Box>
  ),
}
