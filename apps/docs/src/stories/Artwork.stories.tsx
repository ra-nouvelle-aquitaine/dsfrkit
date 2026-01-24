import type { ArtworkData } from '@dsfrkit/react'
import {
  Artwork,
  allPictograms,
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Input,
  pictogramsByCategory,
  Range,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

const allNames = ['light', 'dark', 'system', ...allPictograms.map((p) => `${p.category}/${p.name}`)]

const meta = {
  title: 'Branding/Artwork',
  component: Artwork,
  parameters: {
    docs: {
      description: {
        component: `Pictogrammes officiels du DSFR avec 3 couches personnalisables :

- **Major** — élément principal de l'illustration (couleur bleu France par défaut : \`var(--artwork-major-blue-france)\`)
- **Minor** — éléments secondaires (rouge Marianne par défaut : \`var(--artwork-minor-red-marianne)\`)
- **Decorative** — points décoratifs (\`var(--artwork-decorative-blue-france)\` par défaut)

Utilisation simple via la prop \`name\` :

\`\`\`tsx
<Artwork name="environment/sun" size={80} />
<Artwork name="system/error" majorColor="red" />
<Artwork name="light" />
\`\`\`

**${allPictograms.length} pictogrammes DSFR** répartis en 10 catégories.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: allNames,
      description: 'Nom du pictogramme (format "catégorie/nom")',
      table: { type: { summary: 'string' } },
    },
    artwork: {
      table: { disable: true },
    },
    decorativeColor: {
      control: 'text',
      description: 'Couleur de la couche décorative',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--artwork-decorative-blue-france)' },
      },
    },
    minorColor: {
      control: 'text',
      description: 'Couleur de la couche mineure',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--artwork-minor-red-marianne)' },
      },
    },
    majorColor: {
      control: 'text',
      description: 'Couleur de la couche majeure',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'var(--artwork-major-blue-france)' },
      },
    },
    decorativeOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacité de la couche décorative',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0.5' } },
    },
    minorOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Opacité de la couche mineure',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0.6' } },
    },
    size: {
      control: { type: 'range', min: 40, max: 200, step: 10 },
      description: 'Taille du pictogramme (px)',
      table: { type: { summary: 'number' }, defaultValue: { summary: '80' } },
    },
  },
} satisfies Meta<typeof Artwork>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'environment/sun',
    size: 80,
    decorativeColor: 'var(--artwork-decorative-blue-france)',
    minorColor: 'var(--artwork-minor-red-marianne)',
    majorColor: 'var(--artwork-major-blue-france)',
    decorativeOpacity: 0.5,
    minorOpacity: 0.6,
  },
}

export const CouleursPersonnalisees: Story = {
  name: 'Couleurs personnalisées',
  args: {
    name: 'environment/sun',
    size: 120,
    decorativeColor: '#CE614A',
    minorColor: '#C3992A',
    majorColor: '#6A4C93',
    decorativeOpacity: 1,
    minorOpacity: 1,
  },
}

function PictogramCard({ artwork, size }: { artwork: ArtworkData; size: number }) {
  const [copied, setCopied] = useState(false)
  const artworkName = `${artwork.category}/${artwork.name}`

  return (
    <button
      type="button"
      className={`flex flex-col items-center gap-2 p-4 border border-border rounded-lg cursor-pointer transition-colors ${copied ? 'bg-background-contrast' : 'bg-transparent hover:bg-background-contrast/50'}`}
      style={{ width: `${size + 48}px` }}
      onClick={() => {
        navigator.clipboard.writeText(artworkName)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      title={`Cliquer pour copier : ${artworkName}`}
    >
      <Artwork name={artworkName} size={size} />
      <Text size="1" className="text-center break-words">
        {copied ? 'Copié !' : artwork.name}
      </Text>
    </button>
  )
}

function PictogramGallery() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<string>('all')
  const [size, setSize] = useState(64)

  const categories = Object.keys(pictogramsByCategory).sort()

  const filtered =
    category === 'all'
      ? allPictograms.filter(
          (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
        )
      : (pictogramsByCategory[category] || []).filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )

  return (
    <Container size="lg">
      <Flex align="center" wrap="wrap" className="gap-4 mb-6">
        <Input
          placeholder="Rechercher un pictogramme..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[200px]"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes ({allPictograms.length})</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat} ({(pictogramsByCategory[cat] || []).length})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Range
          label="Taille"
          min={40}
          max={120}
          value={[size]}
          onValueChange={(v) => setSize(v[0])}
          showValue
          formatValue={(v) => `${v}px`}
          className="w-[180px]"
        />
      </Flex>

      <Text size="1" className="text-foreground-mention mb-4">
        {filtered.length} pictogramme{filtered.length > 1 ? 's' : ''} — cliquer pour copier le nom
      </Text>

      <Flex wrap="wrap" className="gap-3">
        {filtered.map((art) => (
          <PictogramCard key={`${art.category}-${art.name}`} artwork={art} size={size} />
        ))}
      </Flex>

      {filtered.length === 0 && (
        <Text size="2" className="text-center text-foreground-mention py-8">
          Aucun pictogramme trouvé.
        </Text>
      )}
    </Container>
  )
}

export const Pictogrammes: Story = {
  name: `Pictogrammes DSFR (${allPictograms.length})`,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `Galerie interactive des **${allPictograms.length} pictogrammes officiels du DSFR**.

Cliquez sur un pictogramme pour copier son nom. Utilisation :

\`\`\`tsx
import { Artwork } from '@dsfrkit/react'

<Artwork name="environment/sun" size={80} />
<Artwork name="health/doctor" size={120} />
<Artwork name="system/error" majorColor="red" />
\`\`\``,
      },
    },
  },
  render: () => <PictogramGallery />,
  args: {
    name: 'environment/sun',
  },
}

export const ParCategorie: Story = {
  name: 'Par catégorie',
  parameters: {
    layout: 'padded',
  },
  render: () => (
    <Container size="lg">
      {Object.entries(pictogramsByCategory)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([cat, items]) => (
          <Box key={cat} className="mb-8">
            <Heading as="h3" size="2" className="capitalize mb-4 border-b-2 border-primary pb-2">
              {cat}{' '}
              <Badge variant="info" size="sm">
                {items.length}
              </Badge>
            </Heading>
            <Flex wrap="wrap" className="gap-4">
              {items.map((art) => (
                <Flex key={art.name} direction="col" align="center" className="gap-2">
                  <Artwork name={`${art.category}/${art.name}`} size={64} />
                  <Text size="1" className="text-center max-w-[80px] break-words">
                    {art.name}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Box>
        ))}
    </Container>
  ),
  args: {
    name: 'environment/sun',
  },
}
