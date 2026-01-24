import { Alert } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: {
    docs: {
      description: {
        component: `Affiche un message important ou une notification à l'utilisateur (succès, erreur, info). À utiliser pour capter l'attention sans bloquer la navigation.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'error'],
      description:
        "Définit la couleur et l'icône de l'alerte selon l'état communiqué (info, succès, avertissement, erreur).",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'info' } },
    },
    title: {
      control: 'text',
      description: "Titre optionnel de l'alerte. Si omis, l'alerte aura un format plus compact.",
      table: { type: { summary: 'string' } },
    },
    children: {
      control: 'text',
      description: "Le texte explicatif ou le contenu de l'alerte.",
      table: { type: { summary: 'ReactNode' } },
    },
    closable: {
      control: 'boolean',
      description: "Rend l'alerte refermable en ajoutant un bouton croix.",
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    closeLabel: {
      control: 'text',
      description: "Libellé d'accessibilité pour le bouton de fermeture.",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'Masquer le message' } },
    },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'Défaut',
    children: 'Ceci est une alerte par défaut. Elle est neutre.',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: "Ceci est une alerte d'information. Elle attire l'attention sur un point important.",
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Succès',
    children: 'Votre action a été effectuée avec succès !',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Avertissement',
    children: 'Attention, cette action nécessite votre attention.',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Erreur',
    children: 'Une erreur est survenue lors du traitement de votre demande.',
  },
}

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'Alerte sans titre',
  },
}

export const Closable: Story = {
  args: {
    variant: 'success',
    title: 'Succès',
    children: 'Cette alerte peut être fermée. Cliquez sur la croix en haut à droite.',
    closable: true,
  },
}
