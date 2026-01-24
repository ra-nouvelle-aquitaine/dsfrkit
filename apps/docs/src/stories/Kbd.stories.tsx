import { Flex, Kbd, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Typography/Kbd',
  component: Kbd,
  parameters: {
    docs: {
      description: {
        component: `Indique une touche ou une combinaison de touches du clavier.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '⌘ + K',
  },
}

export const ShortcutCombination: Story = {
  render: () => {
    return (
      <Flex align="center" className="gap-2">
        <Text as="span">
          Pour sauvegarder votre travail, appuyez sur <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
        </Text>
        <Text as="span" size="2" className="ml-4 text-foreground-muted">
          (ou <Kbd>⌘</Kbd> + <Kbd>S</Kbd> sur Mac)
        </Text>
      </Flex>
    )
  },
}
