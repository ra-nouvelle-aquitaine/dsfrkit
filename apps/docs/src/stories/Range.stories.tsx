import { Box, Range } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/Range',
  component: Range,
  parameters: {
    docs: {
      description: {
        component: `Curseur de sélection conforme au DSFR permettant de choisir une valeur numérique (ou un intervalle) sur une plage continue. Supporte label, texte d'aide, affichage de la valeur et message d'erreur.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box style={{ width: '320px', maxWidth: '100%' }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    // --- Props custom DSFRKit ---
    label: {
      control: 'text',
      description: 'Label affiché au-dessus du curseur.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'undefined' } },
    },
    hint: {
      control: 'text',
      description: "Texte d'aide affiché sous le label.",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'undefined' } },
    },
    showValue: {
      control: 'boolean',
      description: 'Affiche la valeur actuelle à côté du curseur.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    formatValue: {
      control: false,
      description:
        'Fonction de formatage de la valeur affichée. Reçoit un nombre, retourne une chaîne.',
      table: {
        type: { summary: '(value: number) => string' },
        defaultValue: { summary: 'String' },
      },
    },
    error: {
      control: 'text',
      description: "Message d'erreur affiché sous le curseur. Change le style en destructif.",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'undefined' } },
    },

    // --- Props héritées de Radix Slider ---
    defaultValue: {
      control: 'object',
      description:
        'Valeur initiale du curseur sous forme de tableau (ex: `[50]` ou `[200, 800]` pour un intervalle).',
      table: { type: { summary: 'number[]' }, defaultValue: { summary: '[0]' } },
    },
    value: {
      control: 'object',
      description: 'Valeur contrôlée du curseur (mode contrôlé).',
      table: { type: { summary: 'number[]' }, defaultValue: { summary: 'undefined' } },
    },
    min: {
      control: 'number',
      description: 'Valeur minimale autorisée.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0' } },
    },
    max: {
      control: 'number',
      description: 'Valeur maximale autorisée.',
      table: { type: { summary: 'number' }, defaultValue: { summary: '100' } },
    },
    step: {
      control: 'number',
      description: "Pas d'incrémentation entre chaque valeur.",
      table: { type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le curseur.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du curseur.',
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    onValueChange: {
      control: false,
      description: 'Callback appelé lorsque la valeur change.',
      table: { type: { summary: '(value: number[]) => void' } },
    },

    // --- Masquer les props non pertinentes ---
    className: { table: { disable: true } },
    inverted: { table: { disable: true } },
    name: { table: { disable: true } },
    minStepsBetweenThumbs: { table: { disable: true } },
    onValueCommit: { table: { disable: true } },
  },
} satisfies Meta<typeof Range>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Range label="Volume" defaultValue={[50]} min={0} max={100} step={1} showValue />,
}

export const WithHint: Story = {
  render: () => (
    <Range
      label="Luminosité"
      hint="Ajustez la luminosité de l'écran entre 0 et 100."
      defaultValue={[75]}
      min={0}
      max={100}
      step={1}
      showValue
    />
  ),
}

export const Formatted: Story = {
  render: () => (
    <Range
      label="Pourcentage de complétion"
      hint="Indiquez le pourcentage d'avancement du projet."
      defaultValue={[60]}
      min={0}
      max={100}
      step={5}
      showValue
      formatValue={(v) => `${v} %`}
    />
  ),
}

export const WithMinMax: Story = {
  render: () => (
    <Range
      label="Température souhaitée"
      hint="Sélectionnez une température entre 16°C et 30°C."
      defaultValue={[21]}
      min={16}
      max={30}
      step={1}
      showValue
      formatValue={(v) => `${v}°C`}
    />
  ),
}

export const RangeInterval: Story = {
  name: 'Intervalle (double curseur)',
  render: () => (
    <Range
      label="Fourchette de prix"
      hint="Sélectionnez un budget minimum et maximum."
      defaultValue={[200, 800]}
      min={0}
      max={1000}
      step={50}
      showValue
      formatValue={(v) => `${v} €`}
    />
  ),
}

export const WithError: Story = {
  render: () => (
    <Range
      label="Nombre de participants"
      hint="Entre 1 et 50 participants."
      defaultValue={[0]}
      min={0}
      max={50}
      step={1}
      showValue
      error="Veuillez sélectionner au moins 1 participant."
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <Range
      label="Curseur désactivé"
      hint="Ce curseur n'est pas modifiable."
      defaultValue={[30]}
      min={0}
      max={100}
      step={1}
      showValue
      disabled
    />
  ),
}
