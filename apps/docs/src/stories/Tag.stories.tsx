import { Box, Flex, Heading, Tag, Text } from '@dsfrkit/react'
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

// Défini séparément pour typer les props des branches du discriminated union (clickable, pressable, dismissible)
const tagArgTypes: ArgTypes = {
  variant: {
    control: 'select',
    description:
      'Couleur et sémantique du tag. Les variantes `info`, `success`, `warning`, `error` suivent les tokens DSFR des badges.',
    options: [
      'default',
      'info',
      'success',
      'warning',
      'error',
      'blue-france',
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
    table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
  },
  size: {
    control: 'radio',
    description: 'Taille du tag : `sm` (24px) ou `md` (32px, défaut) ou `lg` (40px).',
    options: ['sm', 'md', 'lg'],
    table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
  },
  children: {
    control: 'text',
    description: "Contenu affiché à l'intérieur du tag.",
  },
  clickable: {
    control: 'boolean',
    description:
      'Rend le tag cliquable sous forme de lien `<a>`. Nécessite la prop `href`. Exclusif avec `pressable` et `dismissible`.',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  href: {
    control: 'text',
    description: 'URL de destination quand `clickable` est activé.',
    if: { arg: 'clickable', truthy: true },
    table: { type: { summary: 'string' } },
  },
  pressable: {
    control: 'boolean',
    description:
      'Rend le tag sélectionnable (checkbox cachée). Un indicateur ✓ apparaît en haut à droite quand sélectionné. Exclusif avec `clickable` et `dismissible`.',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  defaultSelected: {
    control: 'boolean',
    description: 'État sélectionné initial (uniquement avec `pressable`).',
    if: { arg: 'pressable', truthy: true },
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  dismissible: {
    control: 'boolean',
    description:
      'Affiche un bouton × permettant de supprimer/masquer le tag. Exclusif avec `clickable` et `pressable`.',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  icon: {
    control: false,
    description: 'Icône affichée avant le texte (ReactNode).',
  },
}

const meta = {
  title: 'Data Display/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: `Composant interactif (Action ou Lien) représentant un mot-clé, un filtre ou une catégorie cliquable.

**Quand l'utiliser ?** Pour des filtres de listes, des catégories d'articles ou la suppression d'options multiples. Contrairement au \`Badge\`, le \`Tag\` doit *toujours* être lié à une interaction utilisateur (clic de filtre, suivi de lien, ou suppression de filtres combinés).`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: tagArgTypes,
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

// ── Statique ─────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: { children: 'Tag' },
}

export const Info: Story = {
  args: { variant: 'info', children: 'Information' },
}

export const Success: Story = {
  args: { variant: 'success', children: 'Actif' },
}

export const Warning: Story = {
  args: { variant: 'warning', children: 'Attention' },
}

export const ErrorTag: Story = {
  args: { variant: 'error', children: 'Urgent' },
}

export const BlueFrance: Story = {
  args: { variant: 'blue-france', children: 'Officiel' },
}

// ── Clickable (lien) ──────────────────────────────────────────────────────────
export const Clickable: Story = {
  render: () => (
    <Flex wrap="wrap" className="gap-2">
      <Tag clickable href="#">
        Par défaut
      </Tag>
      <Tag clickable href="#" variant="info">
        Information
      </Tag>
      <Tag clickable href="#" variant="success">
        Succès
      </Tag>
      <Tag clickable href="#" variant="warning">
        Attention
      </Tag>
      <Tag clickable href="#" variant="error">
        Erreur
      </Tag>
    </Flex>
  ),
}

// ── Pressable (sélectionnable) ────────────────────────────────────────────────
export const Pressable: Story = {
  render: () => (
    <Flex wrap="wrap" className="gap-4">
      <Tag pressable>Non sélectionné</Tag>
      <Tag pressable defaultSelected>
        Sélectionné
      </Tag>
      <Tag pressable variant="info">
        Info filtrée
      </Tag>
    </Flex>
  ),
}

// ── Dismissible (supprimable) ─────────────────────────────────────────────────
export const Dismissible: Story = {
  render: () => (
    <Flex wrap="wrap" className="gap-2">
      <Tag dismissible>Par défaut</Tag>
      <Tag dismissible variant="info">
        Information
      </Tag>
      <Tag dismissible variant="success">
        Succès
      </Tag>
      <Tag dismissible variant="warning">
        Attention
      </Tag>
      <Tag dismissible variant="error">
        Erreur
      </Tag>
    </Flex>
  ),
}

// ── Sizes ─────────────────────────────────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <Flex align="center" className="gap-2">
      <Tag size="sm">Petit (sm)</Tag>
      <Tag size="md">Moyen (md)</Tag>
      <Tag size="lg">Grand (lg)</Tag>
    </Flex>
  ),
}

// ── Toutes les variantes ───────────────────────────────────────────────────────
export const AllVariants: Story = {
  render: () => (
    <Flex wrap="wrap" className="gap-2">
      <Tag>Par défaut</Tag>
      <Tag variant="info">Info</Tag>
      <Tag variant="success">Succès</Tag>
      <Tag variant="warning">Attention</Tag>
      <Tag variant="error">Erreur</Tag>
      <Tag variant="blue-france">Blue France</Tag>
    </Flex>
  ),
}

// ── Accentuations ─────────────────────────────────────────────────────────────
const ACCENTS = [
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

export const AllAccents: Story = {
  render: () => (
    <Flex wrap="wrap" className="gap-2 max-w-2xl">
      {ACCENTS.map((accent) => (
        <Tag key={accent} variant={accent}>
          {accent}
        </Tag>
      ))}
    </Flex>
  ),
}

// ── Exemple : filtres actifs ──────────────────────────────────────────────────
export const FilterExample: Story = {
  render: function FilterExampleRender() {
    const [filters, setFilters] = React.useState(['Paris', 'Lyon', 'Marseille', 'Toulouse'])

    return (
      <Box className="space-y-4">
        <Text size="2" className="text-grey-700">
          Filtres actifs :
        </Text>
        <Flex wrap="wrap" className="gap-2">
          {filters.map((filter) => (
            <Tag
              key={filter}
              variant="blue-france"
              dismissible
              onDismiss={() => setFilters(filters.filter((f) => f !== filter))}
            >
              {filter}
            </Tag>
          ))}
          {filters.length === 0 && (
            <Text as="span" size="2" className="text-grey-500">
              Aucun filtre actif
            </Text>
          )}
        </Flex>
      </Box>
    )
  },
}

// ── Exemple : sélection multiple ─────────────────────────────────────────────
export const SelectableExample: Story = {
  render: function SelectableExampleRender() {
    const options = ['React', 'Vue', 'Angular', 'Svelte']
    const [selected, setSelected] = React.useState<string[]>(['React'])

    return (
      <Box className="space-y-4">
        <Text size="2" className="text-grey-700">
          Sélectionnez vos frameworks (pressable) :
        </Text>
        <Flex wrap="wrap" className="gap-4">
          {options.map((opt) => (
            <Tag
              key={opt}
              pressable
              defaultSelected={selected.includes(opt)}
              onSelectedChange={(v) =>
                setSelected((prev) => (v ? [...prev, opt] : prev.filter((s) => s !== opt)))
              }
            >
              {opt}
            </Tag>
          ))}
        </Flex>
        <Text size="2" className="text-grey-500">
          Sélection : {selected.join(', ') || 'Aucune'}
        </Text>
      </Box>
    )
  },
}

// ── Exemple : catégories dans une carte ────────────────────────────────────────
export const CategoriesExample: Story = {
  render: () => (
    <Box className="p-4 border border-grey-200 rounded-lg max-w-sm">
      <Heading as="h3" size="1" className="mb-2">
        Démarche administrative en ligne
      </Heading>
      <Flex wrap="wrap" className="gap-2 mb-3">
        <Tag variant="info" size="sm">
          Service public
        </Tag>
        <Tag variant="success" size="sm">
          En ligne
        </Tag>
        <Tag size="sm">Gratuit</Tag>
      </Flex>
      <Text size="2" className="text-grey-700">
        Effectuez vos démarches administratives depuis chez vous.
      </Text>
    </Box>
  ),
}
