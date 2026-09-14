import {
  Button,
  Follow,
  FollowNewsletter,
  FollowNewsletterForm,
  FollowSocial,
  FollowSocialLink,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'

const meta = {
  title: 'Branding/Follow',
  component: Follow,
  parameters: {
    docs: {
      description: {
        component: `Lettre d'information et réseaux sociaux (\`fr-follow\`) : bandeau bleu clair placé en bas de page, avant le pied de page, qui invite à suivre l'actualité du site.

**Composition :**
- \`FollowNewsletter\` — titre, accroche et action : un bouton vers une page d'inscription, ou \`FollowNewsletterForm\` pour s'inscrire directement ;
- \`FollowSocial\` — liste de \`FollowSocialLink\` (\`network="facebook" | "twitter-x" | "linkedin" | …\`), ouverts dans une nouvelle fenêtre.

Les deux blocs côte à côte occupent 8 et 4 colonnes, séparés par un filet. Seul, un bloc prend toute la largeur avec l'accroche à gauche et l'action à droite.

**Titre des réseaux sociaux :** \`FollowSocial\` ajoute « Suivez-nous sur les réseaux sociaux » quand ses enfants sont des \`FollowSocialLink\` (\`title\` pour le changer, \`title={null}\` pour le retirer). Une composition libre (titre et boutons fournis en enfants, comme en 1.2) est rendue telle quelle.
`,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Follow>

export default meta
type Story = StoryObj<typeof meta>

const socialNetworks = [
  { network: 'facebook', href: 'https://www.facebook.com' },
  { network: 'twitter-x', href: 'https://x.com' },
  { network: 'bluesky', href: 'https://bsky.app' },
  { network: 'linkedin', href: 'https://www.linkedin.com' },
  { network: 'instagram', href: 'https://www.instagram.com' },
  { network: 'youtube', href: 'https://www.youtube.com' },
] as const

const socialLinks = (size?: 'md' | 'lg') =>
  socialNetworks.map((item) => (
    <FollowSocialLink key={item.network} network={item.network} href={item.href} size={size} />
  ))

export const Default: Story = {
  name: 'Lettre d’information et réseaux sociaux',
  render: () => (
    <Follow>
      <FollowNewsletter
        title="Abonnez-vous à notre lettre d’information"
        description="Recevez chaque mois les nouveautés du service et les démarches mises en ligne."
      >
        <Button type="button" title="S‘abonner à notre lettre d’information">
          S'abonner
        </Button>
      </FollowNewsletter>
      <FollowSocial>{socialLinks()}</FollowSocial>
    </Follow>
  ),
}

export const WithForm: Story = {
  name: 'Avec formulaire d’inscription',
  render: function WithFormRender() {
    const [error, setError] = React.useState<string>()
    const [success, setSuccess] = React.useState<string>()

    return (
      <Follow>
        <FollowNewsletter
          title="Abonnez-vous à notre lettre d’information"
          description="Recevez chaque mois les nouveautés du service et les démarches mises en ligne."
        >
          <FollowNewsletterForm
            error={error}
            success={success}
            onValueChange={() => {
              setError(undefined)
              setSuccess(undefined)
            }}
            onSubmit={(email) => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError(
                  'Le format de l’adresse électronique est invalide. Exemple : nom@domaine.fr'
                )
                return
              }
              setSuccess('Votre inscription a bien été prise en compte.')
            }}
          />
        </FollowNewsletter>
        <FollowSocial>{socialLinks()}</FollowSocial>
      </Follow>
    )
  },
}

export const NewsletterOnly: Story = {
  name: 'Lettre d’information seule',
  render: () => (
    <Follow>
      <FollowNewsletter
        title="Abonnez-vous à notre lettre d’information"
        description="Recevez chaque mois les nouveautés du service et les démarches mises en ligne."
      >
        <Button type="button" title="S‘abonner à notre lettre d’information">
          S'abonner
        </Button>
      </FollowNewsletter>
    </Follow>
  ),
}

export const NewsletterFormOnly: Story = {
  name: 'Lettre d’information seule avec formulaire',
  render: () => (
    <Follow>
      <FollowNewsletter
        title="Abonnez-vous à notre lettre d’information"
        description="Recevez chaque mois les nouveautés du service et les démarches mises en ligne."
      >
        <FollowNewsletterForm error="Le format de l’adresse électronique est invalide. Exemple : nom@domaine.fr" />
      </FollowNewsletter>
    </Follow>
  ),
}

export const SocialOnly: Story = {
  name: 'Réseaux sociaux seuls',
  render: () => (
    <Follow>
      <FollowSocial>{socialLinks()}</FollowSocial>
    </Follow>
  ),
}

export const SocialLarge: Story = {
  name: 'Réseaux sociaux, grands boutons',
  render: () => (
    <Follow>
      <FollowSocial title="Suivez-nous sur les réseaux sociaux">{socialLinks('lg')}</FollowSocial>
    </Follow>
  ),
}
