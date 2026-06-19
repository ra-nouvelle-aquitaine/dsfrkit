import {
  Autocomplete,
  type AutocompleteSingleProps,
  Avatar,
  AvatarFallback,
  Box,
  Button,
  Checkbox,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { expect, waitFor, within } from 'storybook/test'

const meta: Meta<typeof Autocomplete> = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  parameters: {
    docs: {
      description: {
        component: `Champ de saisie textuelle avec autocomplétion (Liste déroulante riche / Combobox).
        
Conforme aux recommandations d'ergonomie et d'accessibilité du Système de Design de l'État (DSFR).

**Quand l'utiliser ?**
- Pour guider l'utilisateur dans une longue liste de choix (ex: pays, départements, référentiels métiers).
- Pour proposer des suggestions de recherche tout en autorisant la saisie libre.`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description:
        'Liste des suggestions. Chaque option accepte `value`, `label`, `description`, `disabled`, `group`, `keywords` et des données libres pour `renderOption`.',
      table: { category: 'Suggestions' },
    },
    groups: {
      control: 'object',
      description:
        "Groupes d'options affichés dans l'ascenseur. `value` correspond à `option.group`, `label` est l'en-tête affiché et recherché.",
      table: { category: 'Suggestions' },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message affiché quand aucune suggestion ne correspond à la recherche.',
      table: { category: 'Suggestions', defaultValue: { summary: 'Aucun résultat trouvé.' } },
    },
    loading: {
      control: 'boolean',
      description: 'Affiche un état de chargement dans la liste de suggestions.',
      table: { category: 'Recherche asynchrone', defaultValue: { summary: 'false' } },
    },
    loadingMessage: {
      control: 'text',
      description: 'Message affiché pendant le chargement des suggestions.',
      table: { category: 'Recherche asynchrone', defaultValue: { summary: 'Chargement...' } },
    },
    minSearchLength: {
      control: { type: 'number', min: 0, step: 1 },
      description: "Nombre minimal de caractères requis avant d'afficher les suggestions.",
      table: { category: 'Filtrage', defaultValue: { summary: '0' } },
    },
    minSearchMessage: {
      control: 'text',
      description: "Message affiché tant que `minSearchLength` n'est pas atteint.",
      table: { category: 'Filtrage' },
    },
    filterOption: {
      control: false,
      description:
        'Fonction de filtrage local personnalisée. Reçoit `(option, { query, normalizedQuery })`.',
      table: { category: 'Filtrage' },
    },
    highlightMatches: {
      control: 'boolean',
      description: 'Surligne la portion de texte correspondant à la recherche.',
      table: { category: 'Filtrage', defaultValue: { summary: 'true' } },
    },
    renderOption: {
      control: false,
      description:
        "Fonction de rendu personnalisée d'une suggestion. Voir la story `CustomOptionRender`.",
      table: { category: 'Rendu' },
    },
    onSearchChange: {
      control: false,
      description: 'Callback déclenché à chaque modification du texte recherché.',
      table: { category: 'Événements' },
    },
    onValueChange: {
      control: false,
      description: 'Callback déclenché à la sélection ou modification de la valeur.',
      table: { category: 'Événements' },
    },
  },
  decorators: [
    (Story) => (
      <Box style={{ width: '320px', minHeight: '360px' }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Autocomplete>
// Stories en sélection simple qui répartissent `args` dans le composant : on borne
// explicitement le type pour éviter l'élargissement de l'union discriminée.
type SingleStory = StoryObj<AutocompleteSingleProps>

const countries = [
  { value: 'fr', label: 'France', description: 'Europe' },
  { value: 'be', label: 'Belgique', description: 'Europe' },
  { value: 'de', label: 'Allemagne', description: 'Europe' },
  { value: 'it', label: 'Italie', description: 'Europe' },
  { value: 'es', label: 'Espagne', description: 'Europe' },
  { value: 'ca', label: 'Canada', description: 'Amérique du Nord' },
  { value: 'us', label: 'États-Unis', description: 'Amérique du Nord' },
  { value: 'jp', label: 'Japon', description: 'Asie' },
  { value: 'cn', label: 'Chine', description: 'Asie' },
]

const regionGroups = [
  { value: 'idf', label: 'Île-de-France' },
  { value: 'paca', label: "Provence-Alpes-Côte d'Azur" },
  { value: 'ara', label: 'Auvergne-Rhône-Alpes' },
]

const departments = [
  { value: '75', label: 'Paris (75)', group: 'idf', keywords: ['capitale'] },
  { value: '92', label: 'Hauts-de-Seine (92)', group: 'idf' },
  { value: '93', label: 'Seine-Saint-Denis (93)', group: 'idf' },
  { value: '13', label: 'Bouches-du-Rhône (13)', group: 'paca', keywords: ['marseille'] },
  { value: '83', label: 'Var (83)', group: 'paca', keywords: ['toulon'] },
  { value: '06', label: 'Alpes-Maritimes (06)', group: 'paca', keywords: ['nice'] },
  { value: '69', label: 'Rhône (69)', group: 'ara', keywords: ['lyon'] },
  { value: '38', label: 'Isère (38)', group: 'ara', keywords: ['grenoble'] },
]

export const Default: SingleStory = {
  args: {
    label: 'Sélectionnez un pays',
    placeholder: 'Rechercher un pays...',
    options: countries,
    hint: "Saisissez le nom d'un pays pour filtrer la liste.",
    emptyMessage: 'Aucun pays trouvé.',
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Box className="space-y-4">
        <Autocomplete {...args} value={value} onValueChange={setValue} />
        <Text className="text-sm">
          Valeur sélectionnée :{' '}
          <span className="font-semibold text-primary">{value || 'aucune'}</span>
        </Text>
      </Box>
    )
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const page = within(document.body)
    const input = canvas.getByRole('combobox')

    await step('open and select Espagne', async () => {
      await userEvent.click(input)
      await expect(page.getByText('Espagne')).toBeInTheDocument()
      await userEvent.click(page.getByText('Espagne'))
      await expect(input).toHaveValue('Espagne')
    })

    await step('reopen full list with selection preserved', async () => {
      await userEvent.click(input)
      await expect(page.getByText('France')).toBeInTheDocument()
      await expect(page.getByText('Espagne')).toBeInTheDocument()
      await expect(page.getByText('États-Unis')).toBeInTheDocument()
    })
  },
}

export const GroupedOptions: SingleStory = {
  args: {
    label: 'Département',
    placeholder: 'Rechercher un département...',
    options: departments,
    groups: regionGroups,
    emptyMessage: 'Aucun département trouvé.',
  },
  parameters: {
    docs: {
      description: {
        story:
          "Les suggestions peuvent être regroupées via `option.group`. La prop `groups` permet de contrôler l'ordre et le libellé des en-têtes ; le filtrage par défaut tient aussi compte des `keywords`.",
      },
    },
  },
  render: (args) => {
    const [value, setValue] = useState('')

    return (
      <Box className="space-y-4">
        <Autocomplete {...args} value={value} onValueChange={setValue} />
        <Text className="text-sm">
          Valeur sélectionnée :{' '}
          <span className="font-semibold text-primary">{value || 'aucune'}</span>
        </Text>
      </Box>
    )
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const page = within(document.body)
    const input = canvas.getByRole('combobox')

    await step('open grouped options and filter by keyword', async () => {
      await userEvent.click(input)
      await waitFor(() => expect(page.getByText('Île-de-France')).toBeInTheDocument())
      await expect(page.getAllByRole('option').map((option) => option.textContent)).toEqual([
        'Paris (75)',
        'Hauts-de-Seine (92)',
        'Seine-Saint-Denis (93)',
        'Bouches-du-Rhône (13)',
        'Var (83)',
        'Alpes-Maritimes (06)',
        'Rhône (69)',
        'Isère (38)',
      ])

      await userEvent.type(input, 'ile')
      await waitFor(() => expect(page.getByText('Paris (75)')).toBeInTheDocument())
      await expect(page.getByText('Île-de-France')).toBeInTheDocument()
      await expect(page.queryByText("Provence-Alpes-Côte d'Azur")).not.toBeInTheDocument()
      await expect(page.getAllByRole('option').map((option) => option.textContent)).toEqual([
        'Paris (75)',
        'Hauts-de-Seine (92)',
        'Seine-Saint-Denis (93)',
      ])
    })
  },
}

export const AllowCustomValue: SingleStory = {
  args: {
    label: 'Nom de domaine',
    placeholder: 'Saisissez un domaine (ex: gouv.fr)...',
    options: [
      { value: 'service-public.fr', label: 'service-public.fr', description: 'Portail officiel' },
      {
        value: 'legifrance.gouv.fr',
        label: 'legifrance.gouv.fr',
        description: 'Lois et règlements',
      },
      { value: 'data.gouv.fr', label: 'data.gouv.fr', description: 'Données ouvertes' },
    ],
    hint: 'Vous pouvez sélectionner une suggestion ou saisir votre propre domaine.',
    allowCustomValue: true,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Box className="space-y-4">
        <Autocomplete {...args} value={value} onValueChange={setValue} />
        <Text className="text-sm">
          Valeur : <span className="font-semibold text-primary">{value || 'aucune'}</span>
        </Text>
      </Box>
    )
  },
}

export const ValidationStates: Story = {
  render: () => (
    <Box className="space-y-6">
      <Autocomplete label="Pays (État normal)" options={countries} placeholder="Rechercher..." />
      <Autocomplete
        label="Pays (État d'erreur)"
        options={countries}
        placeholder="Rechercher..."
        error="Le pays choisi n'est pas éligible à ce dispositif."
      />
      <Autocomplete
        label="Pays (État de succès)"
        options={countries}
        placeholder="Rechercher..."
        success="Le pays sélectionné est éligible."
        defaultValue="fr"
      />
      <Autocomplete
        label="Pays (Désactivé)"
        options={countries}
        placeholder="Rechercher..."
        disabled
      />
    </Box>
  ),
}

export const WithinForm: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Le champ caché injecté par la prop `name` transmet la *valeur* de l'option sélectionnée (et non son libellé) lors de la soumission du formulaire. Le bouton « Effacer » (activé par défaut) remet le champ à zéro.",
      },
    },
  },
  render: () => {
    const [submitted, setSubmitted] = useState<string | null>(null)

    return (
      <Box className="space-y-4">
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            setSubmitted(String(data.get('country') ?? ''))
          }}
        >
          <Autocomplete
            label="Sélectionnez un pays"
            placeholder="Rechercher un pays..."
            name="country"
            options={countries}
            hint="La valeur soumise est le code du pays (ex: fr), pas le libellé."
          />
          <Button type="submit">Envoyer</Button>
        </form>
        <Text className="text-sm">
          Valeur soumise :{' '}
          <span className="font-semibold text-primary">
            {submitted === null ? 'aucune soumission' : submitted || 'vide'}
          </span>
        </Text>
      </Box>
    )
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const page = within(document.body)
    const input = canvas.getByRole('combobox')

    await step('select an option and submit the form', async () => {
      await userEvent.click(input)
      await userEvent.click(page.getByText('Canada'))
      await expect(input).toHaveValue('Canada')
      await userEvent.click(canvas.getByRole('button', { name: 'Envoyer' }))
      await expect(canvas.getByText('ca')).toBeInTheDocument()
    })

    await step('clear the selection with the clear button', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Effacer la sélection' }))
      await expect(input).toHaveValue('')
    })
  },
}

export const AsyncSearch: Story = {
  render: () => {
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState<
      { value: string; label: string; description?: string }[]
    >([])
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
      if (!search) {
        setOptions([])
        return
      }

      setLoading(true)
      const timer = setTimeout(() => {
        // Simuler des résultats filtrés depuis l'API
        const filtered = countries.filter((c) =>
          c.label.toLowerCase().includes(search.toLowerCase())
        )
        setOptions(filtered)
        setLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }, [search])

    return (
      <Box className="space-y-4">
        <Autocomplete
          label="Recherche de pays (API asynchrone)"
          placeholder="Commencez à saisir un pays..."
          options={options}
          loading={loading}
          loadingMessage="Recherche en cours..."
          minSearchLength={2}
          minSearchMessage="Saisissez au moins 2 caractères pour lancer la recherche."
          value={value}
          onValueChange={setValue}
          onSearchChange={setSearch}
        />
        <Text className="text-sm">
          Valeur : <span className="font-semibold text-primary">{value || 'aucune'}</span>
        </Text>
      </Box>
    )
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const page = within(document.body)
    const input = canvas.getByRole('combobox')

    await step('trigger async filtering', async () => {
      await userEvent.click(input)
      await userEvent.type(input, 'jap')
      await waitFor(() => expect(page.getByRole('option', { name: /Japon/ })).toBeInTheDocument())
    })
  },
}

export const MultiSelect: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Avec la prop `multiple`, la valeur devient un tableau et les choix sélectionnés s'affichent sous forme de tags supprimables. Le menu reste ouvert entre deux sélections, `Retour arrière` retire le dernier tag lorsque le champ de recherche est vide.",
      },
    },
  },
  render: () => {
    const [values, setValues] = useState<string[]>(['fr', 'be'])

    return (
      <Box className="space-y-4">
        <Autocomplete
          multiple
          label="Sélectionnez plusieurs pays"
          placeholder="Rechercher des pays..."
          options={countries}
          value={values}
          onValueChange={setValues}
          hint="Cliquez sur une suggestion pour l'ajouter, sur la croix d'un tag pour la retirer."
        />
        <Text className="text-sm">
          Valeurs :{' '}
          <span className="font-semibold text-primary">
            {values.length > 0 ? values.join(', ') : 'aucune'}
          </span>
        </Text>
      </Box>
    )
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const page = within(document.body)
    const input = canvas.getByRole('combobox')

    await step('add a third country and keep the menu open', async () => {
      await userEvent.click(input)
      await userEvent.click(page.getByRole('option', { name: /Japon/ }))
      await expect(canvas.getByText('Japon')).toBeInTheDocument()
    })
  },
}

export const Highlighting: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Le texte correspondant à la recherche est surligné dans les suggestions (activé par défaut via `highlightMatches`). La correspondance est insensible aux accents et à la casse, tout en conservant l'orthographe d'origine.",
      },
    },
  },
  args: {
    label: 'Sélectionnez un pays',
    placeholder: 'Essayez « eta » ou « jap »...',
    options: countries,
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox')

    await step('type and check the highlighted match', async () => {
      await userEvent.click(input)
      await userEvent.type(input, 'eta')
      await waitFor(() => expect(document.querySelector('mark')).toBeInTheDocument())
      await expect(document.querySelector('mark')).toHaveTextContent('Éta')
    })
  },
}

const people = [
  { value: 'ada', label: 'Ada Lovelace', email: 'ada.lovelace@gouv.fr' },
  { value: 'alan', label: 'Alan Turing', email: 'alan.turing@gouv.fr' },
  { value: 'grace', label: 'Grace Hopper', email: 'grace.hopper@gouv.fr' },
  { value: 'katherine', label: 'Katherine Johnson', email: 'k.johnson@gouv.fr' },
]

const initials = (label: string) =>
  label
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

export const CustomOptionRender: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "La prop `renderOption` permet de personnaliser entièrement le rendu d'une ligne : avatar, image, e-mail, case à cocher... Les options peuvent porter des données libres (ici `email` et `color`). L'état `selected` est fourni pour afficher un indicateur (ici une case à cocher).",
      },
      // Storybook ne sait pas sérialiser une fonction passée en prop (`renderOption`)
      // et l'afficherait comme `() => {}`. On fournit donc un extrait de code manuel.
      source: {
        code: `const people = [
  { value: 'ada', label: 'Ada Lovelace', email: 'ada.lovelace@gouv.fr' },
  { value: 'grace', label: 'Grace Hopper', email: 'grace.hopper@gouv.fr' },
]

const initials = (label: string) =>
  label
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

function PeoplePicker() {
  const [values, setValues] = useState<string[]>(['ada'])

  return (
    <Autocomplete
      multiple
      label="Assigner des personnes"
      placeholder="Rechercher une personne..."
      options={people}
      value={values}
      onValueChange={setValues}
      renderOption={(option, { selected, highlightedLabel }) => (
        <div className="flex w-full items-center gap-3">
          {/* Checkbox du DS en décoratif : reflète \`selected\`, sans capter clic ni focus */}
          <Checkbox
            checked={selected}
            size="sm"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none shrink-0"
          />
          {/* Avatar du DS : couleur d'accentuation DSFR dérivée des initiales (autoColor) */}
          <Avatar size="sm">
            <AvatarFallback autoColor>{initials(option.label)}</AvatarFallback>
          </Avatar>
          {/* Libellé surligné + e-mail (donnée libre de l'option) */}
          <span className="flex flex-col">
            <span className="text-foreground-title">{highlightedLabel}</span>
            <span className="text-xs text-foreground-muted">{String(option.email)}</span>
          </span>
        </div>
      )}
    />
  )
}`,
      },
    },
  },
  render: () => {
    const [values, setValues] = useState<string[]>(['ada'])

    return (
      <Box className="space-y-4">
        <Autocomplete
          multiple
          label="Assigner des personnes"
          placeholder="Rechercher une personne..."
          options={people}
          value={values}
          onValueChange={setValues}
          renderOption={(option, { selected, highlightedLabel }) => (
            <div className="flex w-full items-center gap-3">
              {/* Checkbox du DS, utilisé en décoratif : il reflète `selected` mais ne
                  capte ni le clic ni le focus (la ligne gère déjà la bascule) */}
              <Checkbox
                checked={selected}
                size="sm"
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none shrink-0"
              />
              {/* Avatar du DS : couleur d'accentuation DSFR dérivée des initiales (autoColor) */}
              <Avatar size="sm">
                <AvatarFallback autoColor>{initials(option.label)}</AvatarFallback>
              </Avatar>
              <span className="flex flex-col">
                <span className="text-foreground-title">{highlightedLabel}</span>
                <span className="text-xs text-foreground-muted">{String(option.email)}</span>
              </span>
            </div>
          )}
        />
        <Text className="text-sm">
          Sélection :{' '}
          <span className="font-semibold text-primary">
            {values.length > 0 ? values.join(', ') : 'aucune'}
          </span>
        </Text>
      </Box>
    )
  },
  play: async ({ canvasElement, userEvent, step }) => {
    const canvas = within(canvasElement)
    const page = within(document.body)
    const input = canvas.getByRole('combobox')

    await step('open and select a person', async () => {
      await userEvent.click(input)
      await userEvent.click(page.getByText('Grace Hopper'))
      await expect(canvas.getByText('Grace Hopper')).toBeInTheDocument()
    })
  },
}
