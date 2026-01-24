import { InfoIcon } from '@dsfrkit/icons'
import { Button, Callout, Grid } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const accents = [
  'default',
  'info',
  'success',
  'warning',
  'error',
  'green-tilleul-verveine',
  'green-bourgeon',
  'green-emeraude',
  'green-menthe',
  'green-archipel',
  'blue-ecume',
  'blue-cumulus',
  'purple-glycine',
  'pink-macaron',
  'pink-tuile',
  'yellow-tournesol',
  'yellow-moutarde',
  'orange-terre-battue',
  'brown-cafe-creme',
  'brown-caramel',
  'brown-opera',
  'beige-gris-galet',
] as const

const meta = {
  title: 'Data Display/Callout',
  component: Callout,
  parameters: {
    docs: {
      description: {
        component: `Mise en exergue (mise en avant) d'un contenu important au sein du texte pour attirer l'œil du lecteur.

**Quand l'utiliser ?** Dans le corps d'un article ou d'une documentation pour surligner une astuce technique (\`tip\`), une note importante (\`important\`) ou un fait annexe, sans pour autant qu'il s'agisse d'un message en rapport avec l'état de l'application utilisateur (où l'on préfère l' \`Alert\`).
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    accent: {
      control: 'select',
      options: accents,
      description: "Indique la couleur d'accentuation (statuts ou palette DSFR).",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
    },
    title: {
      control: 'text',
      description: 'Titre principal de la mise en avant.',
    },
    titleMarkup: {
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      description: 'Niveau sémantique du titre HTML généré (gardant la même apparence).',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'h3' } },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de la mise en avant (modifie espacements et corps de texte).',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    children: {
      control: 'text',
      description: 'Contenu explicatif situé en dessous du titre.',
    },
  },
} satisfies Meta<typeof Callout>

export default meta
type Story = StoryObj<typeof Callout>

export const Default: Story = {
  args: {
    accent: 'default',
    size: 'md',
    title: 'À retenir',
    children: 'Cette information mérite une attention particulière dans votre démarche.',
  },
}

export const Info: Story = {
  args: {
    accent: 'info',
    title: 'Information importante',
    children: 'Votre dossier est en cours de traitement. Un accusé de réception vous sera envoyé.',
  },
}

export const Success: Story = {
  args: {
    accent: 'success',
    title: 'Bonne pratique',
    children:
      'Pensez à sauvegarder votre travail régulièrement pour éviter toute perte de données.',
  },
}

export const Warning: Story = {
  args: {
    accent: 'warning',
    title: 'Attention',
    children: 'Cette action est irréversible. Assurez-vous de votre choix avant de continuer.',
  },
}

export const Error: Story = {
  args: {
    accent: 'error',
    title: 'Erreur critique',
    children: 'La connexion au serveur a échoué. Veuillez contacter votre administrateur.',
  },
}

export const WithoutTitle: Story = {
  args: {
    accent: 'default',
    children: 'Cette mise en avant ne comporte pas de titre, uniquement du contenu textuel.',
  },
}

export const CustomTitleMarkup: Story = {
  name: 'Titre sémantique (h4)',
  args: {
    accent: 'default',
    title: 'Titre de niveau h4',
    titleMarkup: 'h4',
    children: "Visuellement identique au h3 par défaut, mais correct pour l'arbre d'accessibilité.",
  },
}

export const CustomIcon: Story = {
  name: 'Icône personnalisée',
  args: {
    accent: 'info',
    title: 'Information',
    icon: <InfoIcon className="w-6 h-6" />,
    children:
      "Vous pouvez injecter n'importe quel composant ReactNode comme icône pour illustrer votre mise en avant.",
  },
}

export const WithAction: Story = {
  name: "Bouton d'action",
  args: {
    accent: 'default',
    title: 'Mise en avant avec action',
    children:
      "Le DSFR recommande souvent de placer un bouton d'action directement à la fin du Callout pour inciter l'utilisateur.",
    action: <Button variant="primary">En savoir plus</Button>,
  },
}

export const CustomSize: Story = {
  name: 'Différentes tailles (Responsive)',
  args: {
    accent: 'success',
    title: 'Mise en avant agrandie',
    size: 'lg',
    children:
      "Le composant Callout a été adapté pour proposer des tailles (sm, md, lg) gérant automatiquement le dimensionnement du texte, de l'espacement et de l'icône.",
    icon: <InfoIcon className="w-[1.2em] h-[1.2em]" />,
  },
}

export const AllAccents: Story = {
  name: 'Toutes les Accentuations (DSFR)',
  parameters: { controls: { disable: true } },
  render: () => (
    <Grid columns="1" className="md:grid-cols-2 gap-4">
      {accents.map((acc) => (
        <Callout key={acc} accent={acc} title={`Callout: ${acc}`}>
          Exemple de mise en avant utilisant l'accentuation <strong>{acc}</strong> et la bordure
          associée.
        </Callout>
      ))}
    </Grid>
  ),
}
