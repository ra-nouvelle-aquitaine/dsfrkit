import { Code, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Typography/Code',
  component: Code,
  parameters: {
    docs: {
      description: {
        component: `Affiche un extrait de code ou une commande dans le flux de texte.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'ghost'],
      description: 'Apparence visuelle du bloc de code en ligne',
      table: {
        type: { summary: "'solid' | 'soft' | 'outline' | 'ghost'" },
        defaultValue: { summary: 'soft' },
      },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'soft',
    asChild: false,
    children: 'console.log("Hello DSFRKit")',
  },
}

export const InlineExamples: Story = {
  render: () => {
    return (
      <Text as="p" size="3" className="leading-loose">
        Pour démarrer le projet, ouvrez votre terminal et tapez{' '}
        <Code variant="outline">npm install</Code>. Ensuite, lancez le serveur de développement avec
        la commande <Code variant="solid">npm run dev</Code>. Les erreurs s'afficheront dans la
        balise <Code variant="soft">console.error</Code>.
      </Text>
    )
  },
}
