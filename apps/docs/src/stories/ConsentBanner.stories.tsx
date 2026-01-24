import {
  Box,
  Button,
  Checkbox,
  ConsentBanner,
  ConsentBannerActions,
  ConsentBannerContent,
  ConsentBannerTitle,
  Flex,
  Heading,
  Modal,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  Separator,
  Text,
  Toggle,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

const meta = {
  title: 'Branding/ConsentBanner',
  component: ConsentBanner,
  parameters: {
    docs: {
      description: {
        component: `Gestionnaire de consentement aux cookies conforme au RGPD et aux recommandations de la CNIL.

Comprend 3 composants complémentaires :

- **Bandeau de consentement** — affiché en bas de page au premier accès
- **Modale de personnalisation** — permet le choix par finalité/service
- **Placeholder** — remplace le contenu bloqué (vidéo, carte, etc.)

\`\`\`tsx
<ConsentBanner>
  <ConsentBannerTitle>À propos des cookies</ConsentBannerTitle>
  <ConsentBannerContent>Nous utilisons des cookies...</ConsentBannerContent>
  <ConsentBannerActions>
    <Button>Tout accepter</Button>
    <Button variant="secondary">Tout refuser</Button>
    <Button variant="secondary">Personnaliser</Button>
  </ConsentBannerActions>
</ConsentBanner>
\`\`\`
`,
      },
    },
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConsentBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Bandeau: Story = {
  name: 'Bandeau de consentement',
  parameters: {
    docs: {
      description: {
        story:
          "Bandeau d'information affiché en bas de page, avec les actions « Tout accepter », « Tout refuser » et « Personnaliser ».",
      },
    },
  },
  render: () => (
    <Flex align="center" justify="center" className="min-h-[400px]">
      <Text className="text-foreground-mention">Contenu de la page</Text>
      <ConsentBanner>
        <ConsentBannerTitle>À propos des cookies sur ce site</ConsentBannerTitle>
        <ConsentBannerContent>
          Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services
          disponibles sur ce site. Pour en savoir plus, visitez la page{' '}
          <a href="#" className="underline">
            Données personnelles et cookies
          </a>
          . Vous pouvez, à tout moment, avoir le contrôle sur les cookies que vous souhaitez
          activer.
        </ConsentBannerContent>
        <ConsentBannerActions>
          <Button>Tout accepter</Button>
          <Button variant="secondary">Tout refuser</Button>
          <Button variant="secondary">Personnaliser</Button>
        </ConsentBannerActions>
      </ConsentBanner>
    </Flex>
  ),
}

// ─── Modale de personnalisation ─────────────────────────────────────────────

interface Finalite {
  id: string
  label: string
  description: string
  mandatory?: boolean
  services: { id: string; label: string }[]
}

const finalites: Finalite[] = [
  {
    id: 'essential',
    label: 'Cookies essentiels',
    description:
      'Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être désactivés.',
    mandatory: true,
    services: [
      { id: 'session', label: 'Session utilisateur' },
      { id: 'security', label: 'Sécurité (CSRF)' },
    ],
  },
  {
    id: 'analytics',
    label: "Mesure d'audience",
    description:
      "Ces cookies permettent de mesurer la fréquentation et les performances du site afin d'en améliorer le fonctionnement.",
    services: [
      { id: 'eulerian', label: 'Eulerian Analytics' },
      { id: 'matomo', label: 'Matomo' },
    ],
  },
  {
    id: 'social',
    label: 'Réseaux sociaux',
    description:
      "Ces cookies permettent d'interagir avec les modules sociaux présents sur le site et de partager les contenus du site.",
    services: [
      { id: 'facebook', label: 'Facebook' },
      { id: 'twitter', label: 'X (Twitter)' },
      { id: 'linkedin', label: 'LinkedIn' },
    ],
  },
  {
    id: 'video',
    label: 'Vidéos',
    description:
      "Ces cookies permettent d'afficher des contenus vidéo hébergés sur des plateformes tierces.",
    services: [
      { id: 'youtube', label: 'YouTube' },
      { id: 'dailymotion', label: 'Dailymotion' },
    ],
  },
]

function ConsentModal() {
  const [consent, setConsent] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const f of finalites) {
      for (const s of f.services) {
        initial[s.id] = !!f.mandatory
      }
    }
    return initial
  })

  const toggleFinalite = (finalite: Finalite, value: boolean) => {
    if (finalite.mandatory) return
    setConsent((prev) => {
      const next = { ...prev }
      for (const s of finalite.services) {
        next[s.id] = value
      }
      return next
    })
  }

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">Personnaliser</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Panneau de gestion des cookies</ModalTitle>
        </ModalHeader>

        <Box className="px-6 pb-4">
          <Text size="2" className="mb-6 text-foreground-mention">
            Certains de ces services déposent des cookies permettant de suivre votre navigation, de
            mesurer l'audience ou de vous proposer des contenus personnalisés. Vous pouvez les
            accepter ou les refuser finalité par finalité.
          </Text>

          <Box className="space-y-1">
            {finalites.map((f, index) => (
              <Box key={f.id}>
                {index > 0 && <Separator className="my-4" />}
                <Flex justify="between" align="start" className="gap-4 mb-2">
                  <Box className="flex-1">
                    <Heading as="h3" size="1" className="mb-1">
                      {f.label}
                    </Heading>
                    <Text size="1" className="text-foreground-mention">
                      {f.description}
                    </Text>
                  </Box>
                  {f.mandatory ? (
                    <Text size="1" className="text-foreground-mention italic shrink-0">
                      Toujours actif
                    </Text>
                  ) : (
                    <Flex className="gap-2 shrink-0">
                      <Button size="sm" variant="primary" onClick={() => toggleFinalite(f, true)}>
                        Accepter
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => toggleFinalite(f, false)}
                      >
                        Refuser
                      </Button>
                    </Flex>
                  )}
                </Flex>

                <Box className="ml-4 mt-2 space-y-2">
                  {f.services.map((s) => (
                    <Toggle
                      key={s.id}
                      size="sm"
                      label={s.label}
                      checked={consent[s.id]}
                      onCheckedChange={(checked) =>
                        !f.mandatory && setConsent((prev) => ({ ...prev, [s.id]: !!checked }))
                      }
                      disabled={f.mandatory}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <ModalFooter>
          <Flex justify="between" align="center" className="w-full gap-4" wrap="wrap">
            <Flex className="gap-2">
              <Button
                onClick={() => {
                  const all: Record<string, boolean> = {}
                  for (const f of finalites) {
                    for (const s of f.services) {
                      all[s.id] = true
                    }
                  }
                  setConsent(all)
                }}
              >
                Tout accepter
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  const none: Record<string, boolean> = {}
                  for (const f of finalites) {
                    for (const s of f.services) {
                      none[s.id] = !!f.mandatory
                    }
                  }
                  setConsent(none)
                }}
              >
                Tout refuser
              </Button>
            </Flex>
            <ModalClose asChild>
              <Button>Confirmer mes choix</Button>
            </ModalClose>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const ModalePersonnalisation: Story = {
  name: 'Modale de personnalisation',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: `Panneau de gestion des cookies avec contrôle par finalité et par service.

Chaque finalité regroupe des services qu'on peut accepter ou refuser individuellement.
Les cookies essentiels sont toujours actifs et ne peuvent pas être désactivés.`,
      },
    },
  },
  render: () => <ConsentModal />,
}

// ─── Placeholder ────────────────────────────────────────────────────────────

function ConsentPlaceholder({
  service,
  description,
  ratio = '16/9',
}: {
  service: string
  description?: string
  ratio?: string
}) {
  const [accepted, setAccepted] = useState(false)

  if (accepted) {
    return (
      <Flex
        align="center"
        justify="center"
        className="w-full bg-background-contrast rounded-lg border border-border"
        style={{ aspectRatio: ratio }}
      >
        <Text className="text-foreground-mention">Contenu {service} chargé</Text>
      </Flex>
    )
  }

  return (
    <Flex
      direction="col"
      align="center"
      justify="center"
      className="w-full bg-background-alt gap-4 p-8 rounded-lg border-2 border-dashed border-border"
      style={{ aspectRatio: ratio }}
    >
      <Heading as="h3" size="2">
        {service}
      </Heading>
      <Text size="2" className="text-foreground-mention text-center max-w-md">
        {description ??
          `Ce contenu est bloqué car vous n'avez pas accepté les cookies du service ${service}.`}
      </Text>
      <Flex className="gap-3">
        <Button onClick={() => setAccepted(true)}>Autoriser</Button>
        <Button variant="secondary" onClick={() => setAccepted(true)}>
          Autoriser et mémoriser
        </Button>
      </Flex>
      <Text size="1" className="text-foreground-mention">
        <a href="#" className="underline">
          Gérer mes préférences cookies
        </a>
      </Text>
    </Flex>
  )
}

export const Placeholder: Story = {
  name: 'Placeholder de contenu bloqué',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: `Zone de remplacement affichée à la place d'un contenu tiers bloqué (vidéo YouTube, carte, widget social…).

Permet à l'utilisateur d'accepter le service unitairement sans retourner au bandeau de consentement.`,
      },
    },
  },
  render: () => (
    <Box className="max-w-2xl mx-auto space-y-8">
      <ConsentPlaceholder
        service="YouTube"
        description="En autorisant ce service tiers, vous acceptez le dépôt et la lecture de cookies par YouTube pour vous proposer des vidéos."
      />
      <ConsentPlaceholder service="Google Maps" ratio="4/3" />
    </Box>
  ),
}

// ─── Complet : Bandeau + Modale ────────────────────────────────────────────

function ConsentComplet() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <Flex direction="col" align="center" justify="center" className="min-h-[400px] gap-4">
        <Text className="text-foreground-mention">Consentement enregistré.</Text>
        <Button variant="tertiary" onClick={() => setVisible(true)}>
          Réafficher le bandeau
        </Button>
      </Flex>
    )
  }

  return (
    <Flex align="center" justify="center" className="min-h-[400px]">
      <Text className="text-foreground-mention">Contenu de la page</Text>
      <ConsentBanner>
        <ConsentBannerTitle>À propos des cookies sur ce site</ConsentBannerTitle>
        <ConsentBannerContent>
          Bienvenue ! Nous utilisons des cookies pour améliorer votre expérience et les services
          disponibles sur ce site. Pour en savoir plus, visitez la page{' '}
          <a href="#" className="underline">
            Données personnelles et cookies
          </a>
          .
        </ConsentBannerContent>
        <ConsentBannerActions>
          <Button onClick={() => setVisible(false)}>Tout accepter</Button>
          <Button variant="secondary" onClick={() => setVisible(false)}>
            Tout refuser
          </Button>
          <Modal>
            <ModalTrigger asChild>
              <Button variant="secondary">Personnaliser</Button>
            </ModalTrigger>
            <ModalContent size="lg">
              <ModalHeader>
                <ModalTitle>Panneau de gestion des cookies</ModalTitle>
              </ModalHeader>
              <Box className="px-6 pb-4">
                <Text size="2" className="mb-4 text-foreground-mention">
                  Gérez vos préférences de cookies par finalité.
                </Text>
                {finalites.map((f, index) => (
                  <Box key={f.id}>
                    {index > 0 && <Separator className="my-3" />}
                    <Flex justify="between" align="center" className="gap-4">
                      <Box>
                        <Text weight="bold">{f.label}</Text>
                        <Text size="1" className="text-foreground-mention">
                          {f.description}
                        </Text>
                      </Box>
                      {f.mandatory ? (
                        <Text size="1" className="text-foreground-mention italic shrink-0">
                          Toujours actif
                        </Text>
                      ) : (
                        <Checkbox label="" />
                      )}
                    </Flex>
                  </Box>
                ))}
              </Box>
              <ModalFooter>
                <Flex className="gap-2 justify-end w-full">
                  <ModalClose asChild>
                    <Button variant="secondary" onClick={() => setVisible(false)}>
                      Tout refuser
                    </Button>
                  </ModalClose>
                  <ModalClose asChild>
                    <Button onClick={() => setVisible(false)}>Confirmer mes choix</Button>
                  </ModalClose>
                </Flex>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ConsentBannerActions>
      </ConsentBanner>
    </Flex>
  )
}

export const Complet: Story = {
  name: 'Bandeau + Modale (complet)',
  parameters: {
    docs: {
      description: {
        story:
          'Exemple complet combinant le bandeau de consentement et la modale de personnalisation. Le bouton « Personnaliser » ouvre la modale. Les boutons « Tout accepter » et « Tout refuser » ferment le bandeau.',
      },
    },
  },
  render: () => <ConsentComplet />,
}
