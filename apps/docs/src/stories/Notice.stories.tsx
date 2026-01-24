import { Notice } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Notice',
  component: Notice,
  parameters: {
    docs: {
      description: {
        component: `Bandeau d'information prioritaire affiché tout en haut de la page, traversant toute la largeur de l'écran (Above the fold).

**Quand l'utiliser ?** Pour des alertes globales et critiques s'appliquant à l'ensemble du site ou de l'application (ex: "Maintenance technique prévue demain de 8h à 10h", "Déclaration d'impôts terminée très prochainement !"). Utilisation très rare localement (on lui préferera \`Alert\`).
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'neutral'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'info' } },
    },
    closable: {
      control: 'boolean',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    title: { control: 'text', table: { type: { summary: 'string' } } },
    children: { control: 'text', table: { type: { summary: 'ReactNode' } } },
  },
} satisfies Meta<typeof Notice>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'Le service sera indisponible le 25 décembre.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Succès',
    children: 'Votre dossier a été transmis avec succès.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Attention',
    children: 'Votre session expire dans 5 minutes.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Erreur',
    children: 'Le fichier dépasse la taille maximale autorisée.',
  },
}

export const Closable: Story = {
  args: {
    variant: 'info',
    closable: true,
    children: 'Cette notice peut être fermée.',
  },
}
