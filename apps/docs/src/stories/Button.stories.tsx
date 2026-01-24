import { Button } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Inputs/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `Permet d'effectuer une action ou une soumission de formulaire. Ne doit pas être utilisé pour de la simple navigation (utiliser Link).
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: 'Le style visuel principal du bouton défini par le DSFR.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'La taille du bouton.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Force le bouton à occuper 100% de la largeur du conteneur parent.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Affiche un spinner et désactive le clic.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: "Désactive l'interaction avec le bouton.",
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    icon: {
      control: false,
      description:
        "Un élément React (ex: une icône SVG, Remix Icon) à afficher à l'intérieur du bouton.",
    },
    iconPosition: {
      control: 'radio',
      options: ['start', 'end'],
      description: "La position de l'icône par rapport au texte.",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'start' } },
    },
    children: {
      control: false,
      description: 'Le texte ou contenu du bouton.',
    },
    asChild: {
      control: false,
      description:
        'Permet de rendre un composant enfant (ex: un Link Next.js) au lieu de la balise HTML <button>. À utiliser uniquement via le code.',
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    fullWidth: false,
    loading: false,
    disabled: false,
    asChild: false,
    children: 'Valider',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Action secondaire',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Annuler',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Bouton fantôme',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Supprimer',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Petit',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Grand',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Désactivé',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Pleine largeur',
  },
  parameters: {
    layout: 'padded',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Chargement...',
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Avec Icône',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </svg>
    ),
    iconPosition: 'start',
  },
}

export const IconOnly: Story = {
  args: {
    variant: 'tertiary',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </svg>
    ),
    'aria-label': 'Ajouter un élément',
  },
}

export const DisabledVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="tertiary" disabled>
        Tertiary
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="danger" disabled>
        Danger
      </Button>
    </div>
  ),
}

export const LoadingVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" loading>
        Valider
      </Button>
      <Button variant="secondary" loading>
        Annuler
      </Button>
      <Button variant="tertiary" loading>
        Options
      </Button>
    </div>
  ),
}

export const WithIconVariants: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <Button
        variant="primary"
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        }
        iconPosition="start"
      >
        Icône au début
      </Button>
      <Button
        variant="secondary"
        icon={
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
          </svg>
        }
        iconPosition="end"
      >
        Icône à la fin
      </Button>
    </div>
  ),
}

export const AsLink: Story = {
  render: () => (
    <Button asChild variant="primary">
      <a href="https://systeme-de-design.gouv.fr" target="_blank" rel="noreferrer">
        Lien externe (asChild)
      </a>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: `En utilisant \`asChild\`, le composant rend son enfant (ici un \`<a>\`) tout en conservant les styles du bouton.`,
      },
    },
  },
}

export const AsInput: Story = {
  render: () => (
    <Button asChild variant="primary">
      <input type="button" value="Envoyer le formulaire" />
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Utilisation typique dans un formulaire natif avec `input type="button"`.',
      },
    },
  },
}
