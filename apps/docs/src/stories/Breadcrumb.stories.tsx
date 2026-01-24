import {
  Box,
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Heading,
  Text,
} from '@dsfrkit/react'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: `Fil d'ariane permettant à l'utilisateur de se repérer et de naviguer dans la hiérarchie du site.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/ministere">Ministère</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Direction du numérique</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const CollapsedOnMobile: Story = {
  name: "Fil d'Ariane étendu (mobile-first)",
  render: () => (
    <Box className="max-w-md border border-border p-4 rounded bg-background">
      <Text className="text-sm text-muted mb-4 italic">
        Sur les petits écrans, il est recommandé d'utiliser l'ellipse pour éviter que le fil
        d'Ariane ne prenne trop de place.
      </Text>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/ministere/direction/bureau">
              Bureau des applications
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>DSFRReactKit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </Box>
  ),
}

export const ServicePublicExample: Story = {
  name: "Cas d'usage : service-public.gouv.fr",
  render: () => (
    <Box className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">service-public.gouv.fr</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/particuliers">Particuliers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/particuliers/papiers">Papiers - Citoyenneté</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Carte nationale d'identité</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Box>
        <Heading as="h1" size="4" className="text-[var(--text-title-grey)] mb-2">
          Carte nationale d'identité
        </Heading>
        <Text size="3" className="text-[var(--text-default-grey)]">
          Retrouvez toutes les informations pour faire votre demande de carte nationale d'identité.
        </Text>
      </Box>
    </Box>
  ),
}
