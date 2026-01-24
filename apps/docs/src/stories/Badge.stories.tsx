import { Badge, Box, Flex, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `Met en évidence une caractéristique visuelle ou un état (ex: "Nouveau", "En cours", "Succès").

**Quand l'utiliser ?** Pour afficher un simple indicateur visuel (statut métier) **strictement non conventionnel et non cliquable**.

**Alternative :** S'il s'agit d'un filtre interactif ou d'un lien catégoriel cliquable, utilisez obligatoirement un \`Tag\`.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'info',
        'success',
        'warning',
        'error',
        'primary',
        'secondary',
        'new',
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
      ],
      description: 'Détermine la couleur sémantique du badge selon la charte DSFR.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: "Taille du badge : 'sm' (petit) ou 'md' (moyen/défaut).",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    children: {
      control: 'text',
      description: 'Le texte affiché dans le badge.',
    },
    icon: {
      control: false,
      description:
        "Un élément React (généralement un SVG) affiché à gauche du texte. Remplace l'icône par défaut.",
    },
    noIcon: {
      control: 'boolean',
      description: "Permet de masquer l'icône par défaut associée au statut du badge.",
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: 'Badge',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Information',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Validé',
  },
}

export const SuccessNoIcon: Story = {
  args: {
    variant: 'success',
    noIcon: true,
    children: 'Validé sans icône',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'En attente',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Erreur',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primaire',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondaire',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Petit',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Moyen',
  },
}

export const AllVariants: Story = {
  render: () => (
    <Flex wrap="wrap" className="gap-2">
      <Badge>Par défaut</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Succès</Badge>
      <Badge variant="warning">Attention</Badge>
      <Badge variant="error">Erreur</Badge>
      <Badge variant="primary">Primaire</Badge>
      <Badge variant="secondary">Secondaire</Badge>
    </Flex>
  ),
}

export const AllAccents: Story = {
  render: () => (
    <Flex wrap="wrap" className="gap-2 max-w-2xl">
      <Badge variant="green-tilleul-verveine">Tilleul Verveine</Badge>
      <Badge variant="green-bourgeon">Bourgeon</Badge>
      <Badge variant="green-emeraude">Émeraude</Badge>
      <Badge variant="green-menthe">Menthe</Badge>
      <Badge variant="green-archipel">Archipel</Badge>
      <Badge variant="blue-ecume">Écume</Badge>
      <Badge variant="blue-cumulus">Cumulus</Badge>
      <Badge variant="purple-glycine">Glycine</Badge>
      <Badge variant="pink-macaron">Macaron</Badge>
      <Badge variant="pink-tuile">Tuile</Badge>
      <Badge variant="yellow-tournesol">Tournesol</Badge>
      <Badge variant="yellow-moutarde">Moutarde</Badge>
      <Badge variant="orange-terre-battue">Terre Battue</Badge>
      <Badge variant="brown-cafe-creme">Café Crème</Badge>
      <Badge variant="brown-caramel">Caramel</Badge>
      <Badge variant="brown-opera">Opéra</Badge>
      <Badge variant="beige-gris-galet">Gris Galet</Badge>
    </Flex>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <Flex align="center" className="gap-2">
      <Badge size="sm">Petit</Badge>
      <Badge size="md">Moyen</Badge>
    </Flex>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Badge
      variant="success"
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      }
    >
      Vérifié
    </Badge>
  ),
}

export const StatusExamples: Story = {
  render: () => (
    <Box className="space-y-4">
      <Flex align="center" className="gap-2">
        <Text as="span" size="2" className="text-grey-700 w-32">
          Demande :
        </Text>
        <Badge variant="warning">En cours de traitement</Badge>
      </Flex>
      <Flex align="center" className="gap-2">
        <Text as="span" size="2" className="text-grey-700 w-32">
          Dossier :
        </Text>
        <Badge variant="success">Validé</Badge>
      </Flex>
      <Flex align="center" className="gap-2">
        <Text as="span" size="2" className="text-grey-700 w-32">
          Paiement :
        </Text>
        <Badge variant="error">Rejeté</Badge>
      </Flex>
      <Flex align="center" className="gap-2">
        <Text as="span" size="2" className="text-grey-700 w-32">
          Version :
        </Text>
        <Badge variant="info">1.0.0</Badge>
      </Flex>
    </Box>
  ),
}
