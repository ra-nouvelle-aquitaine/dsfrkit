import { Upload } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/Upload',
  component: Upload,
  parameters: {
    docs: {
      description: {
        component: `Champ d'envoi et de dépôt (drag & drop) de fichiers ou de documents.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    hint: { control: 'text' },
    error: { control: 'text' },
    success: { control: 'text' },
    id: { control: 'text' },
  },
} satisfies Meta<typeof Upload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Ajouter des fichiers',
    hint: 'Formats acceptés : PDF, DOCX — Taille max : 10 Mo',
    id: 'upload-default',
  },
}

export const Multiple: Story = {
  args: {
    label: 'Documents justificatifs',
    hint: 'Vous pouvez sélectionner plusieurs fichiers',
    multiple: true,
    id: 'upload-multiple',
  },
}

export const WithError: Story = {
  args: {
    label: 'Document obligatoire',
    error: 'Le fichier est trop volumineux. La taille maximale est 10 Mo.',
    id: 'upload-error',
  },
}

export const WithSuccess: Story = {
  args: {
    label: "Pièce d'identité",
    success: 'Fichier importé avec succès.',
    id: 'upload-success',
  },
}

export const Required: Story = {
  args: {
    label: 'Justificatif de domicile',
    required: true,
    id: 'upload-required',
  },
}
