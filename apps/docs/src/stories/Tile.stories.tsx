import { Artwork, Box, Text, Tile, TileGrid } from '@dsfrkit/react'
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite'

const tileArgTypes: ArgTypes = {
  title: {
    control: 'text',
    description: 'Titre principal de la tuile.',
  },
  description: {
    control: 'text',
    description: 'Description affichée sous le titre.',
  },
  href: {
    control: 'text',
    description: 'Lien de la tuile. Rend toute la carte cliquable.',
  },
  variant: {
    control: 'radio',
    description: 'Variante visuelle : `default` (verticale), `horizontal`, `download`.',
    options: ['default', 'horizontal', 'download'],
    table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
  },
  size: {
    control: 'radio',
    description: 'Taille de la tuile.',
    options: ['sm', 'md', 'lg'],
    table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
  },
  detail: {
    control: 'text',
    description: 'Détail supplémentaire (ex: type de fichier, poids…).',
  },
  disabled: {
    control: 'boolean',
    description: "Désactive la tuile (supprime l'interactivité).",
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  imageSrc: {
    control: 'text',
    description: "URL d'une image à afficher dans la zone média.",
  },
  imageAlt: {
    control: 'text',
    description: "Texte alternatif de l'image.",
  },
  icon: {
    control: false,
    description: 'Icône affichée dans la zone média (ReactNode).',
  },
  badge: {
    control: false,
    description: 'Badge ou tag affiché dans le corps de la tuile (ReactNode).',
  },
}

const meta = {
  title: 'Data Display/Tile',
  component: Tile,
  parameters: {
    docs: {
      description: {
        component: `Tuile cliquable (généralement rectangulaire) avec une grande surface d'activation redirigeant vers une autre page.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: tileArgTypes,
} satisfies Meta<typeof Tile>

export default meta
type Story = StoryObj<typeof meta>

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    title: 'Démarche en ligne',
    description: 'Effectuez votre démarche administrative en quelques clics.',
    href: '#',
  },
}

// ── Avec icône ────────────────────────────────────────────────────────────────
export const WithIcon: Story = {
  args: {
    title: "Carte d'identité",
    description: "Demander ou renouveler une carte d'identité.",
    icon: (
      <Text as="span" className="text-4xl">
        🪪
      </Text>
    ),
    href: '#',
  },
}

// ── Avec Artwork (Pictogramme DSFR) ──────────────────────────────────────────
export const WithArtwork: Story = {
  args: {
    title: 'Mes aides',
    description: 'Découvrez les aides auxquelles vous avez droit.',
    icon: <Artwork name="environment/human-cooperation" className="h-16 w-16" />,
    href: '#',
  },
}

// ── Horizontale ───────────────────────────────────────────────────────────────
export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
    title: 'Déclaration de revenus',
    description: 'Accéder à votre espace personnel pour déclarer vos revenus.',
    icon: (
      <Text as="span" className="text-4xl">
        📄
      </Text>
    ),
    href: '#',
  },
}

// ── Téléchargement ────────────────────────────────────────────────────────────
export const Download: Story = {
  args: {
    variant: 'download',
    title: 'Formulaire de demande',
    description: 'Formulaire CERFA n°12345*01',
    detail: 'PDF – 120 Ko',
    href: '#',
  },
}

// ── Désactivée ────────────────────────────────────────────────────────────────
export const Disabled: Story = {
  args: {
    title: 'Service indisponible',
    description: 'Ce service est temporairement indisponible.',
    href: '#',
    disabled: true,
  },
}

// ── Avec image ────────────────────────────────────────────────────────────────
export const WithImage: Story = {
  args: { title: '' },
  render: () => (
    <Box className="flex flex-col gap-6 max-w-sm">
      <Tile
        title="Parc naturel régional"
        description="Découvrez les espaces naturels protégés de votre région."
        imageSrc="https://picsum.photos/seed/nature/400/200"
        imageAlt="Paysage naturel"
        href="#"
      />
      <Tile
        variant="horizontal"
        title="Parc naturel régional"
        description="Découvrez les espaces naturels protégés."
        imageSrc="https://picsum.photos/seed/nature/200/200"
        imageAlt="Paysage naturel"
        href="#"
      />
    </Box>
  ),
}

// ── Tailles ───────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  args: { title: '' },
  render: () => (
    <Box className="flex flex-col gap-4 max-w-sm">
      <Tile size="sm" title="Petite tuile (sm)" description="Taille small." href="#" />
      <Tile
        size="md"
        title="Tuile standard (md)"
        description="Taille medium, taille par défaut."
        href="#"
      />
      <Tile size="lg" title="Grande tuile (lg)" description="Taille large." href="#" />
    </Box>
  ),
}

// ── Grille ────────────────────────────────────────────────────────────────────
export const Grid: Story = {
  args: { title: '' },
  render: () => (
    <TileGrid>
      <Tile title="Impôts" description="Déclarer vos revenus" href="#" />
      <Tile title="Santé" description="Votre espace santé" href="#" />
      <Tile title="Logement" description="Aides au logement" href="#" />
      <Tile title="Emploi" description="Recherche d'emploi" href="#" />
      <Tile title="Retraite" description="Suivi de votre retraite" href="#" />
      <Tile title="Justice" description="Informations juridiques" href="#" />
    </TileGrid>
  ),
}

// ── Grille horizontale ────────────────────────────────────────────────────────
export const GridHorizontal: Story = {
  args: { title: '' },
  render: () => (
    <TileGrid columns={2}>
      <Tile
        variant="horizontal"
        title="Documents administratifs"
        description="Accédez à vos documents"
        icon={
          <Text as="span" className="text-3xl">
            📋
          </Text>
        }
        href="#"
      />
      <Tile
        variant="horizontal"
        title="Paiements en ligne"
        description="Gérez vos paiements"
        icon={
          <Text as="span" className="text-3xl">
            💳
          </Text>
        }
        href="#"
      />
      <Tile
        variant="horizontal"
        title="Rendez-vous"
        description="Prenez un rendez-vous"
        icon={
          <Text as="span" className="text-3xl">
            📅
          </Text>
        }
        href="#"
      />
      <Tile
        variant="horizontal"
        title="Messagerie"
        description="Vos messages officiels"
        icon={
          <Text as="span" className="text-3xl">
            ✉️
          </Text>
        }
        href="#"
      />
    </TileGrid>
  ),
}

// ── Sans lien (statique) ──────────────────────────────────────────────────────
export const Static: Story = {
  args: {
    title: 'Tuile statique',
    description: "Cette tuile n'est pas cliquable (pas de href).",
  },
}
