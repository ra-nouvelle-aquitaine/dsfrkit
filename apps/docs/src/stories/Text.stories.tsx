import { Box, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    docs: {
      description: {
        component: `Composant standard de base pour l'affichage de la grande majorité des textes, paragraphes, mentions ou labels.

**Quand l'utiliser ?** Pour tout texte continu dans les interfaces. Sémantiquement, il rendra une balise \`p\` (paragraphe) ou \`span\` (texte en ligne) afin de respecter la sémantique HTML sans casser l'accessibilité.

**Alternative :** Surtout, ne l'utilisez jamais pour faire des titres simulés avec un texte gros et gras. Pour concevoir la hiérarchie logique et titrer la page, utilisez impérativement le composant \`Heading\`.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label'],
      description: 'Balise HTML de rendu',
      table: {
        type: { summary: "'p' | 'span' | 'div' | 'label'" },
        defaultValue: { summary: 'p' },
      },
    },
    size: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      description: 'Taille normalisée du texte',
      table: { type: { summary: "'1' - '9'" }, defaultValue: { summary: '3' } },
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'bold'],
      description: 'Graisse',
      table: {
        type: { summary: "'light' | 'regular' | 'medium' | 'bold'" },
        defaultValue: { summary: 'regular' },
      },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    as: 'p',
    size: '3',
    weight: 'regular',
    children:
      "Le texte est le fondement de la transmission de connaissances. En utilisant dsfrkit, nous garantissons l'accessibilité pour tous les usagers.",
  },
}

export const RichParagraphs: Story = {
  render: () => {
    return (
      <Box className="max-w-2xl space-y-4">
        <Text as="p" size="3" className="leading-relaxed">
          Le Système de Design de l'État permet de créer des sites internet et des applications web
          qui assurent une expérience utilisateur fluide, cohérente et accessible pour l'ensemble
          des usagers des services publics numériques.
        </Text>
        <Text as="p" size="2" className="text-foreground-muted">
          Veuillez noter que ces typographies sont calibrées pour respecter le contraste minimum
          ratio de 4.5:1 exigé par le RGAA.
        </Text>
      </Box>
    )
  },
}
