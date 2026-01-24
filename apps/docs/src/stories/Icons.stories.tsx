import * as AllIcons from '@dsfrkit/icons'
import {
  Badge,
  Box,
  Button,
  Code,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Range,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useCallback, useMemo, useState } from 'react'

// Extraire les noms d'icônes (exclure les types)
const iconEntries = Object.entries(AllIcons).filter(
  ([, value]) => typeof value === 'function' || (typeof value === 'object' && value !== null)
) as [string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>][]

// Séparer les alias DSFR et les Ri*
const dsfrAliases = iconEntries.filter(([name]) => !name.startsWith('Ri'))
const riIcons = iconEntries.filter(([name]) => name.startsWith('Ri'))

function IconGrid({
  search,
  iconSize,
  iconColor,
  showOnlyLine,
  showOnlyFill,
}: {
  search: string
  iconSize: number
  iconColor: string
  showOnlyLine: boolean
  showOnlyFill: boolean
}) {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = useCallback((name: string) => {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }, [])

  const filteredIcons = useMemo(() => {
    let icons = riIcons

    if (showOnlyLine) {
      icons = icons.filter(([name]) => name.includes('Line'))
    } else if (showOnlyFill) {
      icons = icons.filter(([name]) => name.includes('Fill'))
    }

    if (search.trim()) {
      const query = search.toLowerCase()
      icons = icons.filter(([name]) => name.toLowerCase().includes(query))
    }

    return icons.slice(0, 200)
  }, [search, showOnlyLine, showOnlyFill])

  const totalFiltered = useMemo(() => {
    let icons = riIcons
    if (showOnlyLine) icons = icons.filter(([name]) => name.includes('Line'))
    else if (showOnlyFill) icons = icons.filter(([name]) => name.includes('Fill'))
    if (search.trim()) {
      const query = search.toLowerCase()
      icons = icons.filter(([name]) => name.toLowerCase().includes(query))
    }
    return icons.length
  }, [search, showOnlyLine, showOnlyFill])

  return (
    <Box>
      <Text size="1" className="text-foreground-mention mb-4">
        {totalFiltered} icône{totalFiltered > 1 ? 's' : ''} trouvée{totalFiltered > 1 ? 's' : ''}
        {totalFiltered > 200 && ' (200 premières affichées)'}
      </Text>
      <Grid className="grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2">
        {filteredIcons.map(([name, IconComponent]) => (
          <button
            type="button"
            key={name}
            onClick={() => handleCopy(name)}
            className={`flex flex-col items-center justify-center gap-1.5 py-3 px-1 border border-border rounded cursor-pointer transition-colors ${
              copied === name
                ? 'bg-background-contrast-success'
                : 'bg-background-default hover:bg-background-contrast'
            }`}
            title={`Cliquer pour copier : ${name}`}
          >
            <IconComponent size={iconSize} style={{ color: iconColor }} />
            <Text size="1" className="text-center break-all leading-tight">
              {copied === name ? 'Copié !' : name.replace(/Icon$/, '')}
            </Text>
          </button>
        ))}
      </Grid>
    </Box>
  )
}

function DsfrAliasGrid({ iconSize, iconColor }: { iconSize: number; iconColor: string }) {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = useCallback((name: string) => {
    navigator.clipboard.writeText(name)
    setCopied(name)
    setTimeout(() => setCopied(null), 1500)
  }, [])

  return (
    <Grid className="grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2 mb-8">
      {dsfrAliases.map(([name, IconComponent]) => (
        <button
          type="button"
          key={name}
          onClick={() => handleCopy(name)}
          className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 border-2 border-primary rounded cursor-pointer transition-colors ${
            copied === name
              ? 'bg-background-contrast-success'
              : 'bg-background-default hover:bg-background-contrast'
          }`}
          title={`Cliquer pour copier : ${name}`}
        >
          <IconComponent size={iconSize} style={{ color: iconColor }} />
          <Text size="1" weight="bold" className="text-primary text-center">
            {copied === name ? 'Copié !' : name}
          </Text>
        </button>
      ))}
    </Grid>
  )
}

function IconExplorer() {
  const [search, setSearch] = useState('')
  const [iconSize, setIconSize] = useState(24)
  const [iconColor, setIconColor] = useState('currentColor')
  const [filter, setFilter] = useState<'all' | 'line' | 'fill'>('all')

  return (
    <Container size="lg">
      <Box className="mb-6">
        <Heading as="h3" size="2" className="mb-2">
          Alias DSFR
        </Heading>
        <Text size="2" className="text-foreground-mention mb-4">
          Raccourcis sémantiques pour les icônes les plus utilisées dans le DSFR. Import :{' '}
          <Code>{`import { CloseIcon } from '@dsfrkit/icons'`}</Code>
        </Text>
        <DsfrAliasGrid iconSize={iconSize} iconColor={iconColor} />
      </Box>

      <Heading as="h3" size="2" className="mb-2">
        Toutes les icônes Remixicon{' '}
        <Badge variant="info" size="sm">
          {riIcons.length}
        </Badge>
      </Heading>
      <Text size="2" className="text-foreground-mention mb-4">
        Cliquez sur une icône pour copier son nom d'import.
      </Text>

      <Flex align="center" wrap="wrap" className="gap-4 mb-4">
        <Input
          placeholder="Rechercher une icône..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[250px]"
          inputSize="sm"
        />
        <Flex className="gap-1">
          {(['all', 'line', 'fill'] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'tertiary'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? 'Toutes' : f === 'line' ? 'Line' : 'Fill'}
            </Button>
          ))}
        </Flex>
        <Range
          label="Taille"
          min={16}
          max={48}
          value={[iconSize]}
          onValueChange={(v) => setIconSize(v[0])}
          showValue
          formatValue={(v) => `${v}px`}
          className="w-[160px]"
        />
        <Flex align="center" className="gap-2">
          <Text size="1">Couleur :</Text>
          <input
            type="color"
            aria-label="Couleur de l'icône"
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
            className="w-8 h-8 border-none cursor-pointer"
          />
        </Flex>
      </Flex>

      <IconGrid
        search={search}
        iconSize={iconSize}
        iconColor={iconColor}
        showOnlyLine={filter === 'line'}
        showOnlyFill={filter === 'fill'}
      />
    </Container>
  )
}

const meta = {
  title: 'Branding/Icons',
  component: IconExplorer,
  parameters: {
    docs: {
      description: {
        component: `Explorateur d'icônes **@dsfrkit/icons** — wrapper autour de [Remixicon](https://remixicon.com/) (standard DSFR).

**${riIcons.length} icônes** disponibles + **${dsfrAliases.length} alias DSFR** sémantiques.

\`\`\`tsx
import { CloseIcon, SearchIcon, RiHomeFillIcon } from '@dsfrkit/icons'

// Utilisation (pensez au aria-hidden si décoratif !)
<CloseIcon size={24} aria-hidden="true" />
\`\`\`

Toutes les icônes se terminent par \`Icon\` (convention DSFRKit).
`,
      },
    },
    layout: 'padded',
  },
} satisfies Meta<typeof IconExplorer>

export default meta
export const Default: StoryObj<typeof meta> = {}
