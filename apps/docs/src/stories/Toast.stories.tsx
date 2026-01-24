import { Button, Flex, ToastAction, Toaster, useToast } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Feedback/Toast',
  parameters: {
    docs: {
      description: {
        component: `Notification éphémère et non bloquante qui apparaît brièvement (en bas de l'écran) puis disparaît d'elle-même.

**Quand l'utiliser ?** Pour confirmer à l'utilisateur qu'une action de fond a réussi (ex: "Brouillon automatiquement sauvegardé", "Message envoyé"). Ne requiert aucune action immédiate de l'utilisateur.

**Alternatives :** Pour une information contextuelle de page permanente, utilisez \`Alert\`. Pour annoncer un événement planifié ou perturbateur sur tout le site, on préfèrera \`Notice\`.
`,
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      table: { type: { summary: 'string' } },
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: "Détermine la couleur et l'intention du message.",
    },
    title: {
      table: { type: { summary: 'string' } },
      control: 'text',
      description: 'Titre principal du toast.',
    },
    description: {
      table: { type: { summary: 'string' } },
      control: 'text',
      description: 'Corps du message.',
    },
    duration: {
      table: { type: { summary: 'number' } },
      control: 'number',
      description: 'Temps (ms) avant la fermeture automatique.',
    },
    limit: {
      table: { type: { summary: 'number' } },
      control: 'number',
      description: "Nombre maximum de toasts visibles à l'écran",
    },
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  args: {
    title: 'Action réussie',
    description:
      'Votre document a bien été enregistré. Il est maintenant disponible dans votre espace.',
    variant: 'default',
    duration: 5000,
    limit: 3,
  },
  render: (args: any) => {
    const { toast } = useToast()

    return (
      <Flex align="center" justify="center" style={{ minHeight: '300px' }}>
        <Button
          onClick={() => {
            toast({
              title: args.title,
              description: args.description,
              variant: args.variant,
              duration: args.duration,
            })
          }}
        >
          Afficher un Toast interactif
        </Button>
        <Toaster limit={args.limit} />
      </Flex>
    )
  },
}

export const Error: Story = {
  args: {
    title: 'Erreur système',
    description: 'Impossible de joindre le serveur. Veuillez réessayer plus tard.',
    variant: 'error',
    duration: 5000,
    limit: 3,
  },
  render: (args: any) => {
    const { toast } = useToast()

    return (
      <Flex align="center" justify="center" style={{ minHeight: '300px' }}>
        <Button
          variant="danger"
          onClick={() => {
            toast({
              variant: args.variant,
              title: args.title,
              description: args.description,
              action: <ToastAction altText="Réessayer">Réessayer</ToastAction>,
              duration: args.duration,
            })
          }}
        >
          Afficher un Toast d'Erreur
        </Button>
        <Toaster limit={args.limit} />
      </Flex>
    )
  },
}

export const MultiToastQueue: Story = {
  args: {
    limit: 3,
  },
  render: (args: any) => {
    const { toast } = useToast()

    return (
      <Flex align="center" justify="center" style={{ minHeight: '300px' }}>
        <Button
          onClick={() => {
            const variants = ['default', 'success', 'error', 'warning', 'info'] as const
            const randomV = variants[Math.floor(Math.random() * variants.length)]
            toast({
              title: `Toast ${randomV}`,
              description: "Exemple de file d'attente du Toaster limitant l'affichage.",
              variant: randomV as any,
            })
          }}
        >
          Afficher un flot de Toasts
        </Button>
        <Toaster limit={args.limit} />
      </Flex>
    )
  },
}
