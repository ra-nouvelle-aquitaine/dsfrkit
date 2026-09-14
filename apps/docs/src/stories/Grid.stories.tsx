import {
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Grid,
  Heading,
  Input,
  Navigation,
  NavigationItem,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type * as React from 'react'

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    docs: {
      description: {
        component: `Conteneur basé sur CSS Grid. Utilisé pour construire des grilles complexes et des mises en page réactives en colonnes.

**Quand l'utiliser ?** Privilégiez \`Grid\` (plutôt que \`Flex\`) pour des mises en page à deux dimensions, structurer des listes de cartes (ex: 3 colonnes), ou aligner parfaitement des éléments sur une grille globale, indépendamment du volume de leur contenu individuel.
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      description: 'Nombre de colonnes uniformes dans la grille',
      table: { type: { summary: '1-12' }, defaultValue: { summary: '1' } },
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10'],
      description: 'Espacement général (gouttière)',
      table: { type: { summary: '0-10' }, defaultValue: { summary: '0' } },
    },
    gapX: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10'],
      description: 'Espacement horizontal spécifique',
      table: { type: { summary: '0-10' } },
    },
    gapY: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10'],
      description: 'Espacement vertical spécifique',
      table: { type: { summary: '0-10' } },
    },
    asChild: {
      control: 'boolean',
      description:
        'Délègue le rendu du composant et ses classes Tailwind à son unique enfant (modèle Radix Slot). Idéal pour styliser un composant externe comme un NextLink.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

const Cell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <Box
    className={cn(
      'flex min-h-12 items-center justify-center bg-background-open-blue-france px-2 py-3 text-center text-sm font-medium text-primary',
      className
    )}
  >
    {children}
  </Box>
)

export const Default: Story = {
  args: {
    columns: '4',
    gap: '4',
    asChild: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Douze cellules, soit la grille complète du DSFR : faites varier `columns` de 1 à 12 pour voir la répartition, puis `gapX` / `gapY` pour dissocier les gouttières horizontales et verticales.',
      },
    },
  },
  render: (args) => (
    <Grid {...args} className="w-full border border-border bg-background-alt p-4">
      {Array.from({ length: 12 }, (_, index) => (
        <Cell key={index}>{index + 1}</Cell>
      ))}
    </Grid>
  ),
}

/**
 * Sur une grille de 12 colonnes, chaque enfant choisit sa largeur avec
 * `col-span-N` : la somme des spans d'une ligne vaut 12. C'est la même
 * logique que `fr-col-N` dans le DSFR.
 */
export const ColumnSpans: Story = {
  name: 'Grille de 12 colonnes',
  args: { columns: '12', gap: '4' },
  render: (args) => (
    <Grid {...args} className="w-full">
      <Cell className="col-span-12">col-span-12</Cell>

      <Cell className="col-span-6">col-span-6</Cell>
      <Cell className="col-span-6">col-span-6</Cell>

      <Cell className="col-span-4">col-span-4</Cell>
      <Cell className="col-span-4">col-span-4</Cell>
      <Cell className="col-span-4">col-span-4</Cell>

      <Cell className="col-span-3">3</Cell>
      <Cell className="col-span-3">3</Cell>
      <Cell className="col-span-3">3</Cell>
      <Cell className="col-span-3">3</Cell>

      <Cell className="col-span-8">col-span-8</Cell>
      <Cell className="col-span-4">col-span-4</Cell>

      <Cell className="col-span-9">col-span-9</Cell>
      <Cell className="col-span-3">3</Cell>

      <Cell className="col-start-4 col-span-6">col-start-4 col-span-6 (centré)</Cell>

      {Array.from({ length: 12 }, (_, index) => (
        // `col-start-1` sur la première cellule force une nouvelle ligne après le bloc centré.
        <Cell key={index} className={index === 0 ? 'col-span-1 col-start-1' : 'col-span-1'}>
          1
        </Cell>
      ))}
    </Grid>
  ),
}

const services = [
  {
    title: 'Carte d’identité',
    description: 'Demande, renouvellement et perte.',
    status: 'En ligne',
  },
  {
    title: 'Passeport',
    description: 'Prise de rendez-vous et suivi de la fabrication.',
    status: 'En ligne',
  },
  {
    title: 'Permis de conduire',
    description: 'Inscription à l’examen et échange de permis.',
    status: 'En ligne',
  },
  {
    title: 'Carte grise',
    description: 'Changement de titulaire ou d’adresse.',
    status: 'En ligne',
  },
  {
    title: 'Acte de naissance',
    description: 'Copie intégrale ou extrait avec filiation.',
    status: 'Sur place',
  },
  { title: 'Casier judiciaire', description: 'Demande du bulletin n° 3.', status: 'En ligne' },
]

/**
 * Liste de cartes réactive : une colonne sur mobile, deux à partir de `sm`,
 * trois à partir de `lg`. `columns` fixe la valeur mobile et les classes
 * `sm:` / `lg:` prennent le relais aux points de rupture DSFR.
 */
export const ResponsiveCards: Story = {
  name: 'Liste de cartes réactive',
  args: { columns: '1', gap: '6' },
  render: (args) => (
    <Grid {...args} className="w-full sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.title} className="flex h-full flex-col">
          <CardHeader>
            <CardTitle as="h3">{service.title}</CardTitle>
            <CardDescription>{service.description}</CardDescription>
          </CardHeader>
          <CardContent className="mt-auto">
            <Badge variant={service.status === 'En ligne' ? 'success' : 'info'} size="sm">
              {service.status}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </Grid>
  ),
}

/**
 * Formulaire en colonnes : les champs courts partagent une ligne et les champs
 * longs occupent toute la largeur (`md:col-span-12`). Sur mobile, tout est
 * empilé.
 */
export const FormLayout: Story = {
  name: 'Formulaire en colonnes',
  args: { columns: '1', gapX: '6', gapY: '6' },
  render: (args) => (
    <form className="w-full max-w-3xl" onSubmit={(event) => event.preventDefault()}>
      <Grid {...args} className="md:grid-cols-12">
        <Box className="md:col-span-6">
          <Input label="Prénom" autoComplete="given-name" />
        </Box>
        <Box className="md:col-span-6">
          <Input label="Nom" autoComplete="family-name" />
        </Box>
        <Box className="md:col-span-12">
          <Input
            label="Adresse électronique"
            hint="Format attendu : nom@domaine.fr"
            type="email"
            autoComplete="email"
          />
        </Box>
        <Box className="md:col-span-4">
          <Input label="Code postal" inputMode="numeric" autoComplete="postal-code" />
        </Box>
        <Box className="md:col-span-8">
          <Input label="Ville" autoComplete="address-level2" />
        </Box>
        <Box className="flex justify-end md:col-span-12">
          <Button type="submit">Continuer</Button>
        </Box>
      </Grid>
    </form>
  ),
}

/**
 * Gabarit de page : menu latéral sur 3 colonnes et contenu sur 9 à partir de
 * `md`, empilés sur mobile.
 */
export const PageLayout: Story = {
  name: 'Gabarit avec menu latéral',
  args: { columns: '1', gap: '8' },
  render: (args) => (
    <Grid {...args} className="w-full md:grid-cols-12">
      <Box className="md:col-span-4 lg:col-span-3">
        <Navigation orientation="vertical" title="Mon compte">
          <NavigationItem href="#" isActive>
            Tableau de bord
          </NavigationItem>
          <NavigationItem href="#">Mes démarches</NavigationItem>
          <NavigationItem href="#">Mes documents</NavigationItem>
          <NavigationItem href="#">Paramètres</NavigationItem>
        </Navigation>
      </Box>
      <Box className="md:col-span-8 lg:col-span-9">
        <Heading as="h2" size="4" className="mb-4">
          Tableau de bord
        </Heading>
        <Grid columns="1" gap="4" className="sm:grid-cols-3">
          {[
            { label: 'Démarches en cours', value: '3' },
            { label: 'Documents à fournir', value: '1' },
            { label: 'Messages non lus', value: '5' },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent>
                <Text size="7" weight="bold" className="m-0 text-primary">
                  {stat.value}
                </Text>
                <Text size="2" className="m-0 text-muted-foreground">
                  {stat.label}
                </Text>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Button variant="secondary" type="button" className="mt-6">
          Démarrer une nouvelle démarche
        </Button>
      </Box>
    </Grid>
  ),
}
