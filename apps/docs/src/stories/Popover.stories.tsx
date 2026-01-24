import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Utils/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Boîte contextuelle riche déclenchée au clic (contrairement au tooltip ou menu). Idéale pour des contenus interactifs complexes. Contenu flottant interactif déclenché au **clic**. Pour un aperçu non interactif au survol, utilisez le composant **HoverCard**.
`,
      },
    },
  },
  argTypes: {
    defaultOpen: {
      description: "État d'ouverture par défaut du popover.",
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    open: {
      description: 'État contrôlé du popover.',
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    onOpenChange: { description: "Événement de changement d'état (ouverture/fermeture)." },
    modal: {
      description:
        "Définit si le popover bloque l'interaction avec le reste de la page (true par défaut).",
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Popover key={String(args.defaultOpen)} {...args}>
      <PopoverTrigger asChild>
        <Button variant="secondary">Ouvrir le Popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Grid columns="1" className="gap-4">
          <Box className="space-y-2">
            <Heading
              as="h4"
              size="5"
              weight="medium"
              className="leading-none text-foreground-title"
            >
              Dimensions
            </Heading>
            <Text as="p" size="2" className="text-foreground-muted">
              Ajustez les dimensions pour cet élément.
            </Text>
          </Box>
          <Grid columns="1" className="gap-2">
            <Grid columns="3" className="items-center gap-4">
              <label htmlFor="width" className="text-sm font-medium">
                Largeur
              </label>
              <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
            </Grid>
            <Grid columns="3" className="items-center gap-4">
              <label htmlFor="height" className="text-sm font-medium">
                Hauteur
              </label>
              <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
            </Grid>
          </Grid>
        </Grid>
      </PopoverContent>
    </Popover>
  ),
}

export const Simple: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">Info</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <Text as="p" size="1">
          Ceci est un popover simple contenant uniquement du texte descriptif. Il est idéal pour des
          détails contextuels.
        </Text>
      </PopoverContent>
    </Popover>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="primary">Modifier la limite</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Grid columns="1" className="gap-4">
          <Heading as="h4" size="5" weight="bold">
            Paramètres de limite
          </Heading>
          <Text as="p" size="2" className="text-foreground-muted mb-2">
            Ajustez la limite maximale pour cet utilisateur.
          </Text>
          <Input id="limit" defaultValue="500" />
          <Button variant="primary" className="w-full mt-2">
            Enregistrer
          </Button>
        </Grid>
      </PopoverContent>
    </Popover>
  ),
}
