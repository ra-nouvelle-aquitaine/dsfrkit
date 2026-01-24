import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Box,
  Flex,
  Heading,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/HoverCard',
  component: HoverCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Affiche une carte de prévisualisation au survol d'un élément (utile pour un aperçu rapide sans quitter la page). Aperçu non interactif déclenché au **survol** de la souris. Pour du contenu interactif déclenché au clic, utilisez le composant **Popover**.
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    openDelay: {
      control: 'number',
      description: "Temps (ms) avant l'ouverture",
      table: { type: { summary: 'number' }, defaultValue: { summary: '700' } },
    },
    closeDelay: {
      control: 'number',
      description: 'Temps (ms) avant la fermeture',
      table: { type: { summary: 'number' }, defaultValue: { summary: '300' } },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Ouverture par défaut',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Flex align="center" justify="center" className="h-64 w-full">
      <HoverCard key={String(args.defaultOpen)} {...args}>
        <HoverCardTrigger asChild>
          <button className="underline font-medium hover:text-primary transition-colors">
            @marianne
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <Flex justify="between" className="space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/marianne.png" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <Box className="space-y-1">
              <Heading as="h4" size="1" className="font-semibold">
                République Française
              </Heading>
              <Text size="2" className="text-foreground-muted">
                Le système de design de l'État pour vos interfaces interactives.
              </Text>
              <Flex align="center" className="pt-2">
                <Text as="span" size="1" className="text-foreground-muted">
                  Dernière activité il y a 2h
                </Text>
              </Flex>
            </Box>
          </Flex>
        </HoverCardContent>
      </HoverCard>
    </Flex>
  ),
}

export const UserProfile: Story = {
  render: (args) => (
    <Flex align="center" justify="center" className="h-64 w-full">
      <HoverCard key={String(args.defaultOpen)} {...args}>
        <HoverCardTrigger asChild>
          <button className="flex items-center gap-2 underline font-medium hover:text-primary transition-colors">
            <Avatar className="w-6 h-6">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            Jean Dupont
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <Flex direction="col" className="gap-3">
            <Flex align="center" className="gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Box>
                <Heading as="h4" size="1" className="font-bold">
                  Jean Dupont
                </Heading>
                <Text size="1" className="text-muted-foreground">
                  Administrateur
                </Text>
              </Box>
            </Flex>
            <Text size="2">Responsable de la transformation numérique au sein du ministère.</Text>
            <Flex className="gap-2">
              <Badge variant="success" size="sm">
                Actif
              </Badge>
              <Badge variant="info" size="sm">
                12 projets
              </Badge>
            </Flex>
          </Flex>
        </HoverCardContent>
      </HoverCard>
    </Flex>
  ),
}

export const LinkPreview: Story = {
  render: (args) => (
    <Flex align="center" justify="center" className="h-64 w-full">
      <Text size="2">
        Consultez la documentation sur{' '}
        <HoverCard key={String(args.defaultOpen)} {...args}>
          <HoverCardTrigger asChild>
            <a href="#" className="text-primary underline font-medium hover:text-primary-hover">
              service-public.fr
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-80" side="top">
            <Box className="space-y-2">
              <Flex align="center" className="gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <Text as="span" size="2" className="font-bold">
                  service-public.fr
                </Text>
              </Flex>
              <Text size="2">
                Le site officiel de l'administration française. Vos droits, vos démarches, vos
                services.
              </Text>
              <Text size="1" className="text-muted-foreground">
                Direction de l'information légale et administrative
              </Text>
            </Box>
          </HoverCardContent>
        </HoverCard>{' '}
        pour plus d'information.
      </Text>
    </Flex>
  ),
}
