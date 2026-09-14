import { Artwork, Badge, Box, Button, Flex, Heading, Input, Link, Tag, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    docs: {
      description: {
        component: `Conteneur basé sur Flexbox. Utilisé pour aligner des éléments horizontalement ou verticalement avec une répartition de l'espace contrôlée.

**Quand l'utiliser ?** Privilégiez \`Flex\` pour des alignements simples à une seule dimension (une ligne ou une colonne), centrer des éléments, ou gérer des composants de navigation et des barres d'outils.

**Alternative :** Pour des mises en page réactives en deux dimensions (lignes ET colonnes simultanément), utilisez plutôt \`Grid\`.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'col', 'row-reverse', 'col-reverse'],
      description: 'Direction du flux flexbox',
      table: {
        type: { summary: "'row' | 'col' | 'row-reverse' | 'col-reverse'" },
        defaultValue: { summary: 'row' },
      },
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: "Alignement sur l'axe principal",
      table: {
        type: { summary: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'" },
        defaultValue: { summary: 'start' },
      },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: "Alignement sur l'axe transversal",
      table: {
        type: { summary: "'start' | 'center' | 'end' | 'stretch' | 'baseline'" },
        defaultValue: { summary: 'stretch' },
      },
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrap-reverse'],
      description: 'Comportement du passage à la ligne',
      table: {
        type: { summary: "'nowrap' | 'wrap' | 'wrap-reverse'" },
        defaultValue: { summary: 'nowrap' },
      },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: 'row',
    justify: 'start',
    align: 'stretch',
    wrap: 'nowrap',
    asChild: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Terrain de jeu : les blocs ont des hauteurs différentes pour que l'effet de `align` soit visible, et le conteneur est plus large que son contenu pour rendre `justify` lisible. Passez `wrap` à `wrap` en réduisant la fenêtre pour voir le retour à la ligne.",
      },
    },
  },
  render: (args) => (
    <Flex {...args} className="w-full gap-4 border border-border bg-background-alt p-4">
      <Box className="flex min-w-24 items-center justify-center bg-background-open-blue-france px-4 py-2 text-primary">
        1
      </Box>
      <Box className="flex min-w-24 items-center justify-center bg-background-open-blue-france px-4 py-8 text-primary">
        2 (plus haut)
      </Box>
      <Box className="flex min-w-24 items-center justify-center bg-background-open-blue-france px-4 py-4 text-primary">
        3
      </Box>
    </Flex>
  ),
}

/**
 * Actions d'un formulaire : l'action d'abandon à gauche, les actions de
 * progression regroupées à droite. Sur mobile, les boutons s'empilent et
 * l'action principale remonte en premier (`flex-col-reverse`).
 */
export const FormActions: Story = {
  name: 'Barre d’actions de formulaire',
  render: () => (
    <Flex
      justify="between"
      align="center"
      className="w-full max-w-3xl flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row"
    >
      <Button variant="ghost" type="button" className="w-full sm:w-auto">
        Annuler
      </Button>
      <Flex className="w-full flex-col-reverse gap-4 sm:w-auto sm:flex-row">
        <Button variant="secondary" type="button">
          Enregistrer le brouillon
        </Button>
        <Button type="submit">Envoyer ma demande</Button>
      </Flex>
    </Flex>
  ),
}

/**
 * En-tête de bloc : titre et action secondaire aux deux extrémités, alignés
 * sur leur ligne de base pour que le lien ne « flotte » pas face au titre.
 */
export const SectionHeader: Story = {
  name: 'En-tête de section',
  render: () => (
    <Box className="w-full max-w-3xl">
      <Flex justify="between" align="baseline" wrap="wrap" className="gap-x-6 gap-y-2">
        <Heading as="h2" size="4" className="m-0">
          Mes démarches en cours
        </Heading>
        <Link href="#" size="sm">
          Voir toutes mes démarches
        </Link>
      </Flex>
      <Flex direction="col" className="mt-4 gap-2">
        {[
          { label: 'Demande de carte d’identité', status: 'En cours', variant: 'info' as const },
          {
            label: 'Inscription sur les listes électorales',
            status: 'Validée',
            variant: 'success' as const,
          },
          { label: 'Changement d’adresse', status: 'Incomplète', variant: 'warning' as const },
        ].map((item) => (
          <Flex
            key={item.label}
            justify="between"
            align="center"
            className="gap-4 border border-border px-4 py-3"
          >
            <Text className="m-0">{item.label}</Text>
            <Badge variant={item.variant} size="sm" className="shrink-0">
              {item.status}
            </Badge>
          </Flex>
        ))}
      </Flex>
    </Box>
  ),
}

/**
 * Liste de filtres : `wrap="wrap"` renvoie les tags à la ligne au lieu de
 * déborder, et `gap` garde un espacement régulier dans les deux directions.
 */
export const TagList: Story = {
  name: 'Liste de tags qui passe à la ligne',
  render: () => (
    <Box className="w-full max-w-md">
      <Text size="2" className="mb-2 text-muted-foreground">
        Filtrer par thématique
      </Text>
      <Flex wrap="wrap" className="gap-2">
        {[
          'Famille',
          'Logement',
          'Travail',
          'Transports',
          'Santé',
          'Justice',
          'Étranger',
          'Argent et impôts',
          'Loisirs',
        ].map((label, index) => (
          <Tag key={label} pressable defaultSelected={index < 2}>
            {label}
          </Tag>
        ))}
      </Flex>
    </Box>
  ),
}

/**
 * Objet média : un visuel de taille fixe (`shrink-0`) et un texte qui prend
 * la place restante (`flex-1`). Le visuel ne se déforme jamais quand le
 * texte s'allonge.
 */
export const MediaObject: Story = {
  name: 'Pictogramme et texte',
  render: () => (
    <Flex direction="col" className="w-full max-w-2xl gap-6">
      {[
        {
          picto: 'document/national-identity-card',
          title: 'Préparez vos justificatifs',
          text: 'Pièce d’identité, justificatif de domicile de moins de 3 mois et photo d’identité conforme aux normes.',
        },
        {
          picto: 'digital/calendar',
          title: 'Prenez rendez-vous',
          text: 'Choisissez un créneau dans la mairie de votre choix, pas nécessairement celle de votre commune.',
        },
        {
          picto: 'system/success',
          title: 'Retirez votre titre',
          text: 'Vous êtes prévenu par SMS dès que votre titre est disponible.',
        },
      ].map((step) => (
        <Flex key={step.title} align="start" className="gap-4">
          <Artwork name={step.picto} size={64} className="shrink-0" />
          <Box className="flex-1">
            <Heading as="h3" size="2" className="m-0">
              {step.title}
            </Heading>
            <Text className="m-0 mt-1 text-muted-foreground">{step.text}</Text>
          </Box>
        </Flex>
      ))}
    </Flex>
  ),
}

/**
 * Champ et bouton côte à côte : le champ s'étire (`flex-1`), le bouton garde
 * sa largeur, et les deux s'alignent par le bas malgré le libellé du champ.
 */
export const InlineForm: Story = {
  name: 'Champ et bouton alignés',
  render: () => (
    <Flex align="end" className="w-full max-w-xl flex-col gap-4 sm:flex-row">
      <Box className="w-full flex-1">
        <Input label="Code postal" placeholder="Ex. : 75001" inputMode="numeric" />
      </Box>
      <Button type="button" className="w-full sm:w-auto">
        Rechercher
      </Button>
    </Flex>
  ),
}

/**
 * État vide centré sur les deux axes : `direction="col"` avec
 * `align="center"` et `justify="center"` dans une zone de hauteur fixe.
 */
export const EmptyState: Story = {
  name: 'État vide centré',
  render: () => (
    <Flex
      direction="col"
      align="center"
      justify="center"
      className="min-h-80 w-full gap-4 border border-dashed border-border p-8 text-center"
    >
      <Artwork name="digital/search" size={80} />
      <Heading as="h2" size="3" className="m-0">
        Aucun résultat
      </Heading>
      <Text className="m-0 max-w-sm text-muted-foreground">
        Aucune démarche ne correspond à vos filtres. Essayez d’élargir votre recherche.
      </Text>
      <Button variant="secondary" type="button">
        Réinitialiser les filtres
      </Button>
    </Flex>
  ),
}
