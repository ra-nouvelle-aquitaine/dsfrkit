import { Quote } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Typography/Quote',
  component: Quote,
  parameters: {
    docs: {
      description: {
        component: `Mise en forme spécifique pour rapporter les propos d'une personne avec citation de la source.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Le texte principal de la citation.',
    },
    author: {
      control: 'text',
      description: "L'auteur de la citation.",
    },
    cite: {
      control: 'text',
      description: "L'URL de la source (pour l'attribut cite de la balise blockquote).",
      table: { type: { summary: 'string' } },
    },
    imageUrl: {
      control: 'text',
      description: "L'URL de l'image (portrait de l'auteur, illustration).",
      table: { type: { summary: 'string' } },
    },
    imageAlt: {
      control: 'text',
      description: "Le texte alternatif (pour l'accessibilité).",
      table: { type: { summary: 'string' } },
    },
    sourceItems: {
      control: 'object',
      description:
        "Tableau d'objets { label: string, cite?: boolean, href?: string } pour afficher les détails.",
      table: { type: { summary: 'QuoteSourceItem[]' } },
    },
  },
} satisfies Meta<typeof Quote>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Le numérique doit être au service de chaque citoyen.',
    author: 'Gouvernement français',
    sourceItems: [{ label: 'Stratégie nationale pour le numérique', cite: true }],
  },
}

export const WithMultipleSources: Story = {
  args: {
    children:
      "La République assure l'égalité devant la loi de tous les citoyens sans distinction d'origine, de race ou de religion.",
    author: 'Constitution de la Ve République',
    cite: 'https://www.legifrance.gouv.fr',
    sourceItems: [
      { label: 'Article premier', cite: true, href: 'https://www.legifrance.gouv.fr' },
      { label: '4 octobre 1958' },
    ],
  },
}

export const WithImage: Story = {
  args: {
    children: "Comprendre, c'est transformer la réalité.",
    author: 'Jean Piaget',
    sourceItems: [{ label: "La Psychologie de l'intelligence", cite: true }, { label: '1947' }],
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/6/60/Jean_Piaget_in_Ann_Arbor_%28cropped%29.png',
    imageAlt: 'Portrait de Jean Piaget',
  },
}

export const Simple: Story = {
  args: {
    children: 'Citation courte sans attribution.',
  },
}
