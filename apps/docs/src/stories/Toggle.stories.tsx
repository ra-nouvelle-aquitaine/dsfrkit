import { Box, Heading, Text, Toggle } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

const meta = {
  title: 'Inputs/Toggle',
  component: Toggle,
  parameters: {
    docs: {
      description: {
        component: `Interrupteur à bascule pour changer un état binaire avec un effet de bord visuel ou système immédiat.

**Quand l'utiliser ?** Pour activer/désactiver directement une fonctionnalité (ex: "Mode sombre", "Activer les notifications", "Wi-Fi") SANS nécessiter de bouton "Sauvegarder" / "Soumettre". Mémorise implicitement la préférence utilisateur.

**Alternative :** S'il faut cliquer sur "Soumettre" pour valider le changement d'état à la fin d'un formulaire, utilisez plutôt des boutons \`Radio\` ou une case à cocher \`Checkbox\`.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Le format en taille du toggle.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'md' } },
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description:
        "L'emplacement du composant texte d'accompagnement par rapport à l'interrupteur.",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'right' } },
    },
    disabled: {
      control: 'boolean',
      description: "Désactive toute interaction utilisateur sur l'interrupteur.",
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: "Le libellé explicatif affiché avec l'interrupteur.",
      table: { type: { summary: 'string' } },
    },
    hint: {
      control: 'text',
      description: "Texte additionnel d'aide ou de précision affiché sous l'interrupteur.",
      table: { type: { summary: 'string' } },
    },
    error: {
      control: 'text',
      description:
        "Affiche un message d'erreur rouge sous l'interrupteur et le met visuellement en état d'alerte.",
      table: { type: { summary: 'string' } },
    },
    success: {
      control: 'text',
      description: "Affiche un message de succès vert sous l'interrupteur.",
      table: { type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Activer les notifications',
  },
}

export const WithHint: Story = {
  args: {
    label: 'Mode sombre',
    hint: 'Activer le thème sombre pour réduire la fatigue visuelle',
  },
}

export const LabelLeft: Story = {
  args: {
    label: 'Actif',
    labelPosition: 'left',
  },
}

export const Small: Story = {
  args: {
    label: 'Petit toggle',
    size: 'sm',
  },
}

export const Large: Story = {
  args: {
    label: 'Grand toggle',
    size: 'lg',
  },
}

export const Success: Story = {
  args: {
    label: 'Service activé',
    success: 'Configuration en ligne réussie',
    defaultChecked: true,
  },
}

export const Error: Story = {
  args: {
    label: 'Mode maintenance',
    error: 'Impossible de joindre le serveur de maintenance',
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Option verrouillée',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Option toujours active',
    disabled: true,
    defaultChecked: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Activer cette option',
  },
}

export const AllSizes: Story = {
  render: () => (
    <Box className="space-y-4">
      <Toggle label="Petit" size="sm" />
      <Toggle label="Moyen (défaut)" size="md" />
      <Toggle label="Grand" size="lg" />
    </Box>
  ),
}

export const SettingsExample: Story = {
  render: function SettingsExampleRender() {
    const [settings, setSettings] = React.useState({
      notifications: true,
      emailAlerts: true,
      darkMode: false,
      analytics: true,
      publicProfile: false,
    })

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
    }

    return (
      <Box className="max-w-md space-y-6">
        <Heading as="h3" size="5" weight="medium" className="text-grey-850">
          Paramètres
        </Heading>

        <Box className="space-y-4 divide-y divide-grey-200">
          <Box className="pt-4 first:pt-0">
            <Toggle
              label="Notifications push"
              hint="Recevoir des notifications sur votre appareil"
              checked={settings.notifications}
              onCheckedChange={() => toggleSetting('notifications')}
            />
          </Box>

          <Box className="pt-4">
            <Toggle
              label="Alertes par email"
              hint="Recevoir un email pour les événements importants"
              checked={settings.emailAlerts}
              onCheckedChange={() => toggleSetting('emailAlerts')}
            />
          </Box>

          <Box className="pt-4">
            <Toggle
              label="Mode sombre"
              hint="Utiliser un thème sombre"
              checked={settings.darkMode}
              onCheckedChange={() => toggleSetting('darkMode')}
            />
          </Box>

          <Box className="pt-4">
            <Toggle
              label="Statistiques anonymes"
              hint="Nous aider à améliorer le service"
              checked={settings.analytics}
              onCheckedChange={() => toggleSetting('analytics')}
            />
          </Box>

          <Box className="pt-4">
            <Toggle
              label="Profil public"
              hint="Rendre votre profil visible aux autres utilisateurs"
              checked={settings.publicProfile}
              onCheckedChange={() => toggleSetting('publicProfile')}
            />
          </Box>
        </Box>
      </Box>
    )
  },
}

export const FeatureFlagsExample: Story = {
  render: function FeatureFlagsExampleRender() {
    const [features, setFeatures] = React.useState([
      { id: 'beta', name: 'Mode bêta', enabled: false },
      {
        id: 'experimental',
        name: 'Fonctionnalités expérimentales',
        enabled: false,
        error: 'Cette fonctionnalité est instable',
      },
      {
        id: 'performance',
        name: 'Mode haute performance',
        enabled: true,
        success: 'Mode optimisé actif',
      },
    ])

    const toggleFeature = (id: string) => {
      setFeatures(features.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)))
    }

    return (
      <Box className="max-w-md space-y-4">
        <Heading as="h3" size="4" weight="medium" className="text-grey-850">
          Fonctionnalités avancées
        </Heading>

        <Box className="p-4 border border-grey-200 rounded-lg space-y-4">
          {features.map((feature) => (
            <Toggle
              key={feature.id}
              label={feature.name}
              error={feature.error}
              success={feature.success}
              checked={feature.enabled}
              onCheckedChange={() => toggleFeature(feature.id)}
              labelPosition="left"
            />
          ))}
        </Box>

        <Text as="p" size="2" className="text-grey-500">
          {features.filter((f) => f.enabled).length} fonctionnalité(s) activée(s)
        </Text>
      </Box>
    )
  },
}

export const InlineExample: Story = {
  render: () => (
    <Box className="flex items-center justify-between p-4 border border-grey-200 rounded-lg max-w-md">
      <Box>
        <Text as="p" weight="medium" className="text-grey-850">
          Synchronisation automatique
        </Text>
        <Text as="p" size="2" className="text-grey-500">
          Synchroniser vos données en temps réel
        </Text>
      </Box>
      <Toggle aria-label="Synchronisation automatique" />
    </Box>
  ),
}
