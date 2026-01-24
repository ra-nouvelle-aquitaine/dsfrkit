import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: `Affichage de données tabulaires (lignes et colonnes) avec des capacités de tri, pagination ou responsive.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    caption: {
      control: 'text',
      description:
        "Le titre générique ou la description lue par les lecteurs d'écran attachée au tableau.",
      defaultValue: 'Liste des agents',
    },
    striped: {
      control: 'boolean',
      description: 'Applique un fond gris alterné sur une ligne sur deux (zebra striping).',
    },
    noBorder: {
      control: 'boolean',
      description: 'Retire les bordures (lignes de séparation) du tableau.',
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    caption: 'Liste des agents',
    striped: false,
    noBorder: false,
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rôle</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Jean Dupont</TableCell>
          <TableCell>jean.dupont@gouv.fr</TableCell>
          <TableCell>Administrateur</TableCell>
          <TableCell>
            <Badge variant="success">Actif</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Marie Martin</TableCell>
          <TableCell>marie.martin@gouv.fr</TableCell>
          <TableCell>Éditeur</TableCell>
          <TableCell>
            <Badge variant="success">Actif</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Pierre Bernard</TableCell>
          <TableCell>pierre.bernard@gouv.fr</TableCell>
          <TableCell>Lecteur</TableCell>
          <TableCell>
            <Badge variant="warning">En attente</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const Striped: Story = {
  args: {
    ...Default.args,
    caption: 'Liste des agents (Zebra)',
    striped: true,
  },
  render: Default.render,
}

export const NoBorder: Story = {
  args: {
    ...Default.args,
    caption: 'Liste des agents (Sans bordure)',
    noBorder: true,
  },
  render: Default.render,
}
