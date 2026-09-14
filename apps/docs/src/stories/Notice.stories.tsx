import { RiVirusFillIcon } from '@dsfrkit/icons'
import { Notice } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Notice',
  component: Notice,
  parameters: {
    docs: {
      description: {
        component: `Bandeau d'information importante (\`fr-notice\`), affiché en pleine largeur sous l'en-tête. Son contenu s'aligne sur le conteneur de la page.

**Quand l'utiliser ?** Pour une information importante et temporaire qui concerne tout le site : maintenance programmée, vigilance météo, alerte Vigipirate… Pour un message lié à une action de l'utilisateur, préférez \`Alert\`.

**Structure :** un titre en gras (obligatoire), une description facultative (\`children\`) et un lien de consultation facultatif (\`link\`). Le bouton « Masquer le message » s'affiche avec \`closable\`.

**Types :**
- génériques : \`info\` (défaut), \`warning\`, \`alert\` ;
- vigilance météo : \`weather-orange\`, \`weather-red\`, \`weather-purple\` ;
- alertes : \`witness\` (appel à témoins), \`kidnapping\` (alerte enlèvement), \`attack\` (attentat), \`cyberattack\` (cyberattaque).
`,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'info',
        'warning',
        'alert',
        'weather-orange',
        'weather-red',
        'weather-purple',
        'witness',
        'kidnapping',
        'attack',
        'cyberattack',
        'neutral',
      ],
      description: 'Type de bandeau : il fixe les couleurs, l’icône et la présentation.',
      table: { type: { summary: 'NoticeVariant' }, defaultValue: { summary: 'info' } },
    },
    title: {
      control: 'text',
      description: 'Titre du bandeau, en gras.',
      table: { type: { summary: 'ReactNode' } },
    },
    children: {
      control: 'text',
      description:
        'Description affichée à la suite du titre. Accepte du texte ou du contenu en blocs (`<p>`, listes).',
      table: { type: { summary: 'ReactNode' } },
    },
    link: {
      control: 'object',
      description: 'Lien de consultation : `{ label, href, external? }`.',
      table: { type: { summary: 'NoticeLink' } },
    },
    closable: {
      control: 'boolean',
      description: 'Affiche le bouton « Masquer le message ».',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    hideIcon: {
      control: 'boolean',
      description: 'Masque l’icône du type.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Notice>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Titre du bandeau d’information',
    children: 'Texte de description lorem ipsum sit consectetur adipiscing.',
    link: { label: 'Lien de consultation', href: '#' },
    closable: true,
  },
}

export const TitleOnly: Story = {
  name: 'Titre seul',
  args: {
    title: 'Le service sera indisponible le 25 décembre de 8h à 12h.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Maintenance programmée',
    children: 'Le téléservice sera interrompu dimanche de 2h à 6h.',
    closable: true,
  },
}

export const Alert: Story = {
  args: {
    variant: 'alert',
    title: 'Incident en cours',
    children: 'Le dépôt de pièces justificatives est momentanément impossible.',
    link: { label: 'Suivre l’état du service', href: '#' },
  },
}

export const WithoutIcon: Story = {
  name: 'Sans icône',
  args: {
    title: 'Titre du bandeau',
    hideIcon: true,
    closable: true,
  },
}

export const CustomIcon: Story = {
  name: 'Icône personnalisée',
  args: {
    title: 'Campagne de vaccination',
    children: 'Prenez rendez-vous dans le centre le plus proche de chez vous.',
    icon: <RiVirusFillIcon />,
    closable: true,
  },
}

export const WeatherAlerts: Story = {
  name: 'Vigilance météo',
  render: () => (
    <div className="flex flex-col gap-4">
      <Notice
        variant="weather-orange"
        title="Vigilance orange"
        link={{
          label: 'Voir la carte de vigilance',
          href: 'https://vigilance.meteofrance.fr',
          external: true,
        }}
        closable
      >
        Pluie-inondation sur le département.
      </Notice>
      <Notice
        variant="weather-red"
        title="Vigilance rouge"
        link={{
          label: 'Voir la carte de vigilance',
          href: 'https://vigilance.meteofrance.fr',
          external: true,
        }}
        closable
      >
        Orages violents attendus dans la soirée.
      </Notice>
      <Notice
        variant="weather-purple"
        title="Vigilance violette"
        link={{
          label: 'Voir la carte de vigilance',
          href: 'https://vigilance.meteofrance.fr',
          external: true,
        }}
        closable
      >
        Cyclone : confinement obligatoire.
      </Notice>
    </div>
  ),
}

export const EmergencyAlerts: Story = {
  name: 'Alertes (témoins, enlèvement, attentat, cyberattaque)',
  render: () => (
    <div className="flex flex-col gap-4">
      <Notice
        variant="witness"
        title="Appel à témoins"
        link={{ label: 'Lien de consultation', href: '#' }}
        closable
      >
        Texte de description lorem ipsum sit consectetur adipiscing.
      </Notice>
      <Notice
        variant="kidnapping"
        title="Alerte enlèvement"
        link={{ label: 'Lien de consultation', href: '#' }}
        closable
      >
        Texte de description lorem ipsum sit consectetur adipiscing.
      </Notice>
      <Notice
        variant="attack"
        title="Alerte attentat"
        link={{ label: 'Lien de consultation', href: '#' }}
        closable
      >
        Texte de description lorem ipsum sit consectetur adipiscing.
      </Notice>
      <Notice
        variant="cyberattack"
        title="Cyberattaque"
        link={{ label: 'Lien de consultation', href: '#' }}
        closable
      >
        Texte de description lorem ipsum sit consectetur adipiscing.
      </Notice>
    </div>
  ),
}
