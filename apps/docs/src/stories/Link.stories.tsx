import { Link } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Typography/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: `Lien de navigation standard. Apparaît souvent dans le corps du texte ou des listes de liens.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'inverted', 'destructive'],
      description: 'Variante visuelle du lien',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du texte du lien',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    external: {
      control: 'boolean',
      description: 'Si true, ouvre le lien dans un nouvel onglet',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    showExternalIcon: {
      control: 'boolean',
      description: 'Ajoute une icône native pour indiquer la redirection sortante',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    href: {
      control: 'text',
      description: 'URL de destination',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: 'text',
      description: 'Contenu textuel du lien',
      table: { type: { summary: 'ReactNode' } },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    underline: {
      control: 'select',
      options: ['always', 'hover', 'none'],
      description: 'Contrôle le soulignement du lien',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'always' } },
    },
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: '#',
    children: 'Lien par défaut',
    external: false,
    showExternalIcon: false,
    asChild: false,
  },
}

export const Muted: Story = {
  args: { href: '#', variant: 'muted', children: 'Lien atténué' },
}

export const External: Story = {
  args: {
    href: 'https://www.service-public.gouv.fr',
    external: true,
    showExternalIcon: true,
    children: 'Lien externe',
  },
}

export const Small: Story = {
  args: { href: '#', size: 'sm', children: 'Petit lien' },
}

export const Large: Story = {
  args: { href: '#', size: 'lg', children: 'Grand lien' },
}

export const UnderlineStyles: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Link href="#" underline="always">
        Souligné par défaut (accessible)
      </Link>
      <Link href="#" underline="hover">
        Souligné au survol uniquement
      </Link>
      <Link href="#" underline="none">
        Jamais souligné (attention à l'accessibilité)
      </Link>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `Le soulignement transparent ou permanent (\`always\`) est recommandé par le RGAA (Référentiel Général d'Amélioration de l'Accessibilité) pour assurer que les liens soient reconnaissables indépendamment de la couleur de texte.`,
      },
    },
  },
}
