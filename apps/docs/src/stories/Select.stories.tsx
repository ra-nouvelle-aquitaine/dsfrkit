import {
  Box,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `Menu déroulant pour la sélection d'une option parmi une liste fermée.

**Quand l'utiliser ?** Typiquement au sein des formulaires HTML ou applicatifs standards où une valeur précise doit être sélectionnée par l'utilisateur parmi une liste d'états (ex: Civilite, Département).

**Alternatives :** Pour déclencher des *actions* applicatives (Dupliquer, Supprimer, Mettre en veille) depuis un bouton menu, utilisez plutôt \`DropdownMenu\`.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { description: 'Valeur sélectionnée par défaut', control: 'text' },
    value: { description: 'Valeur sélectionnée (contrôlé)', control: 'text' },
    onValueChange: { description: 'Événement déclenché au changement de valeur' },
    disabled: { description: 'Désactive le menu déroulant complet', control: 'boolean' },
    dir: {
      description: 'Direction de lecture (ltr ou rtl)',
      control: 'radio',
      options: ['ltr', 'rtl'],
    },
    name: { description: "Nom de l'input caché généré", control: 'text' },
  },
  decorators: [
    (Story) => (
      <Box style={{ width: '320px' }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez une option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <Box className="space-y-2">
      <Text as="label" size="2" weight="medium" className="block text-grey-850">
        Civilité
      </Text>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez votre civilité" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mme">Madame</SelectItem>
          <SelectItem value="m">Monsieur</SelectItem>
        </SelectContent>
      </Select>
    </Box>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Choisissez un département" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Île-de-France</SelectLabel>
          <SelectItem value="75">Paris (75)</SelectItem>
          <SelectItem value="92">Hauts-de-Seine (92)</SelectItem>
          <SelectItem value="93">Seine-Saint-Denis (93)</SelectItem>
          <SelectItem value="94">Val-de-Marne (94)</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Provence-Alpes-Côte d'Azur</SelectLabel>
          <SelectItem value="13">Bouches-du-Rhône (13)</SelectItem>
          <SelectItem value="83">Var (83)</SelectItem>
          <SelectItem value="06">Alpes-Maritimes (06)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const WithError: Story = {
  render: () => (
    <Box className="space-y-2">
      <Text as="label" size="2" weight="medium" className="block text-grey-850">
        Région{' '}
        <Text as="span" className="text-error-main">
          *
        </Text>
      </Text>
      <Select>
        <SelectTrigger variant="error">
          <SelectValue placeholder="Sélectionnez une région" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="idf">Île-de-France</SelectItem>
          <SelectItem value="paca">Provence-Alpes-Côte d'Azur</SelectItem>
          <SelectItem value="ara">Auvergne-Rhône-Alpes</SelectItem>
        </SelectContent>
      </Select>
      <Text as="p" size="2" weight="medium" className="text-error-main">
        Veuillez sélectionner une région
      </Text>
    </Box>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger>
        <SelectValue placeholder="Sélection désactivée" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Choisissez un statut" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="actif">Actif</SelectItem>
        <SelectItem value="inactif">Inactif</SelectItem>
        <SelectItem value="archive" disabled>
          Archivé (non disponible)
        </SelectItem>
        <SelectItem value="supprime" disabled>
          Supprimé (non disponible)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Prefilled: Story = {
  render: () => (
    <Select defaultValue="fr">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="fr">France</SelectItem>
        <SelectItem value="be">Belgique</SelectItem>
        <SelectItem value="ch">Suisse</SelectItem>
        <SelectItem value="lu">Luxembourg</SelectItem>
        <SelectItem value="mc">Monaco</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Sélectionnez un mois" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="01">Janvier</SelectItem>
        <SelectItem value="02">Février</SelectItem>
        <SelectItem value="03">Mars</SelectItem>
        <SelectItem value="04">Avril</SelectItem>
        <SelectItem value="05">Mai</SelectItem>
        <SelectItem value="06">Juin</SelectItem>
        <SelectItem value="07">Juillet</SelectItem>
        <SelectItem value="08">Août</SelectItem>
        <SelectItem value="09">Septembre</SelectItem>
        <SelectItem value="10">Octobre</SelectItem>
        <SelectItem value="11">Novembre</SelectItem>
        <SelectItem value="12">Décembre</SelectItem>
      </SelectContent>
    </Select>
  ),
}
