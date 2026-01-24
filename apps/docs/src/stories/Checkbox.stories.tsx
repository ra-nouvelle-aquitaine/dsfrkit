import { Box, Checkbox, Heading, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

const meta = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: `Sélection multiple d'options au sein d'un formulaire. L'utilisateur peut cocher aucune, une ou plusieurs cases.

**Quand l'utiliser ?** Pour des questions à choix multiples (ex: "Sélectionnez vos langages préférés").

**Alternatives :** Si l'action a un effet technique direct sans bouton "Enregistrer" à la fin de la page, utilisez plutôt un \`Toggle\`. Si les choix sont mutuellement exclusifs, utilisez \`Radio\`.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: "Le style visuel de la case à cocher, indiquant un état de succès ou d'erreur.",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
      description: "La taille de la case à cocher et de son texte d'accompagnement.",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    disabled: {
      control: 'boolean',
      description: "Désactive l'interaction avec le composant.",
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Le texte principal affiché à côté de la case à cocher.',
      table: { type: { summary: 'string' } },
    },
    hint: {
      control: 'text',
      description: "Un texte d'aide ou de précision affiché sous le label.",
      table: { type: { summary: 'string' } },
    },
    error: {
      control: 'text',
      description:
        "Un message d'erreur affiché sous le label (force généralement la variante à 'error' visuellement dans l'utilisation DSFR standard).",
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "J'accepte les conditions générales",
  },
}

export const WithHint: Story = {
  args: {
    label: 'Recevoir la newsletter',
    hint: 'Vous recevrez un email mensuel avec nos actualités',
  },
}

export const WithError: Story = {
  args: {
    label: "J'accepte les conditions d'utilisation",
    error: 'Vous devez accepter les conditions pour continuer',
    variant: 'error',
  },
}

export const Success: Story = {
  args: {
    label: 'Informations vérifiées',
    variant: 'success',
    defaultChecked: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Petit checkbox',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Checkbox moyen (défaut)',
    size: 'md',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Option désactivée',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Option validée (non modifiable)',
    disabled: true,
    defaultChecked: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Accepter cette option',
  },
}

export const AllSizes: Story = {
  render: () => (
    <Box className="space-y-4">
      <Checkbox label="Petit checkbox" size="sm" />
      <Checkbox label="Checkbox moyen (défaut)" size="md" />
    </Box>
  ),
}

export const FormExample: Story = {
  render: function FormExampleRender() {
    const [accepted, setAccepted] = React.useState(false)
    const [newsletter, setNewsletter] = React.useState(false)
    const [notifications, setNotifications] = React.useState(true)

    return (
      <Box className="max-w-md space-y-6">
        <Heading as="h3" size="4" weight="medium" className="text-grey-850">
          Préférences
        </Heading>

        <Box className="space-y-4">
          <Checkbox
            label="Recevoir les notifications par email"
            hint="Soyez informé des mises à jour importantes"
            checked={notifications}
            onCheckedChange={(checked) => setNotifications(checked === true)}
          />

          <Checkbox
            label="S'inscrire à la newsletter"
            hint="Un résumé mensuel de nos actualités"
            checked={newsletter}
            onCheckedChange={(checked) => setNewsletter(checked === true)}
          />

          <Checkbox
            label="J'accepte les conditions générales d'utilisation"
            checked={accepted}
            onCheckedChange={(checked) => setAccepted(checked === true)}
            error={!accepted ? 'Ce champ est obligatoire' : undefined}
            variant={!accepted ? 'error' : 'default'}
          />
        </Box>

        <Box className="text-sm text-grey-500">
          État : {JSON.stringify({ accepted, newsletter, notifications })}
        </Box>
      </Box>
    )
  },
}

export const ChecklistExample: Story = {
  render: function ChecklistExampleRender() {
    const [items, setItems] = React.useState([
      { id: 1, label: "Pièce d'identité", checked: true },
      { id: 2, label: 'Justificatif de domicile', checked: true },
      { id: 3, label: "Photo d'identité", checked: false },
      { id: 4, label: 'Formulaire signé', checked: false },
    ])

    const toggleItem = (id: number) => {
      setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
    }

    const allChecked = items.every((item) => item.checked)
    const someChecked = items.some((item) => item.checked)

    return (
      <Box className="max-w-md space-y-4">
        <Heading as="h3" size="4" weight="medium" className="text-grey-850">
          Documents requis
        </Heading>

        <Box className="p-4 border border-grey-200 rounded-lg space-y-3">
          {items.map((item) => (
            <Checkbox
              key={item.id}
              label={item.label}
              checked={item.checked}
              onCheckedChange={() => toggleItem(item.id)}
              variant={item.checked ? 'success' : 'default'}
            />
          ))}
        </Box>

        <Box className="text-sm">
          {allChecked ? (
            <Text as="span" weight="medium" className="text-success">
              Tous les documents sont fournis
            </Text>
          ) : someChecked ? (
            <Text as="span" weight="medium" className="text-warning">
              {items.filter((i) => i.checked).length}/{items.length} documents fournis
            </Text>
          ) : (
            <Text as="span" weight="medium" className="text-error">
              Aucun document fourni
            </Text>
          )}
        </Box>
      </Box>
    )
  },
}
