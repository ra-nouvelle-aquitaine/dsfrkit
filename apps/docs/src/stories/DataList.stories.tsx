import { Badge, Box, Code, DataList, Flex, Heading, Link } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/DataList',
  component: DataList.Root,
  parameters: {
    docs: {
      description: {
        component: `Liste de définition (paires clé/valeur) idéale pour afficher les détails d'un élément ou le résumé interactif d'un formulaire.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Classes utilitaires Tailwind pour adapter le style',
    },
  },
} satisfies Meta<typeof DataList.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DataList.Root className="w-full max-w-2xl bg-background-alt p-6 border border-border rounded-md">
      <DataList.Item align="center">
        <DataList.Label style={{ minWidth: '88px' }}>Statut</DataList.Label>
        <DataList.Value>
          <Badge>Autorisé</Badge>
        </DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label style={{ minWidth: '88px' }}>Identifiant</DataList.Label>
        <DataList.Value>
          <Flex align="center" className="gap-2">
            <Code variant="ghost">dan_abramov</Code>
          </Flex>
        </DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label style={{ minWidth: '88px' }}>Nom</DataList.Label>
        <DataList.Value>Dan Abramov</DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label style={{ minWidth: '88px' }}>Email</DataList.Label>
        <DataList.Value>
          <Link href="mailto:dan@example.com">dan@example.com</Link>
        </DataList.Value>
      </DataList.Item>

      <DataList.Item>
        <DataList.Label style={{ minWidth: '88px' }}>Société</DataList.Label>
        <DataList.Value>
          <Link target="_blank" href="https://meta.com">
            Meta
          </Link>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  ),
}

export const ProfileCard: Story = {
  render: () => (
    <Box className="w-full max-w-md bg-background border border-border shadow-sm rounded-lg overflow-hidden">
      <Heading as="h3" size="1" className="bg-primary/10 p-4 border-b border-border text-primary">
        Détails du profil
      </Heading>
      <DataList.Root className="p-4 space-y-4">
        <DataList.Item>
          <DataList.Label style={{ minWidth: '120px' }}>Région</DataList.Label>
          <DataList.Value>Nouvelle-Aquitaine</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label style={{ minWidth: '120px' }}>Développement</DataList.Label>
          <DataList.Value>React & Tailwind</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label style={{ minWidth: '120px' }}>Actif depuis</DataList.Label>
          <DataList.Value>Mars 2026</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Box>
  ),
}
