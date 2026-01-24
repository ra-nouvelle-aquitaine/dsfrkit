import {
  Box,
  Button,
  Checkbox,
  Grid,
  Heading,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component: `Système d'onglets pour alterner l'affichage de plusieurs vues ou catégories de contenu sur le même espace.
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: { description: "Valeur de l'onglet actif par défaut.", control: 'text' },
    value: { description: "Valeur de l'onglet actif (contrôlé).", control: 'text' },
    onValueChange: {
      description: "Callback appelé lors d'un changement d'onglet.",
      action: 'onValueChange',
    },
    orientation: {
      description: 'Orientation des onglets.',
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'horizontal' } },
    },
    dir: {
      description: 'Direction de lecture.',
      control: 'radio',
      options: ['ltr', 'rtl'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'ltr' } },
    },
    activationMode: {
      description:
        "Mode d'activation : `automatic` (au focus clavier) ou `manual` (au clic/entrée).",
      control: 'radio',
      options: ['automatic', 'manual'],
      table: { type: { summary: 'string' }, defaultValue: { summary: 'automatic' } },
    },
  },
  decorators: [
    (Story) => (
      <Box style={{ width: '100%', maxWidth: '500px' }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Tabs>

// ── Default ───────────────────────────────────────────────────────────────────
export const Default: Story = {
  args: {
    defaultValue: 'tab1',
    orientation: 'horizontal',
    dir: 'ltr',
    activationMode: 'automatic',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Onglet 1</TabsTrigger>
        <TabsTrigger value="tab2">Onglet 2</TabsTrigger>
        <TabsTrigger value="tab3">Onglet 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        Contenu du premier onglet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </TabsContent>
      <TabsContent value="tab2">
        Contenu du deuxième onglet. Sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </TabsContent>
      <TabsContent value="tab3">
        Contenu du troisième onglet. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris.
      </TabsContent>
    </Tabs>
  ),
}

// ── Vertical ──────────────────────────────────────────────────────────────────
export const Vertical: Story = {
  args: { defaultValue: 'tab1', orientation: 'vertical' },
  render: (args) => (
    // En mode vertical, le Tabs root doit être en flex row pour placer le contenu à droite de la liste
    <Tabs {...args} className="flex flex-row gap-0">
      <TabsList>
        <TabsTrigger value="tab1">Onglet 1</TabsTrigger>
        <TabsTrigger value="tab2">Onglet 2</TabsTrigger>
        <TabsTrigger value="tab3">Onglet 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-0 flex-1">
        Contenu du premier onglet. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </TabsContent>
      <TabsContent value="tab2" className="mt-0 flex-1">
        Contenu du deuxième onglet. Sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua.
      </TabsContent>
      <TabsContent value="tab3" className="mt-0 flex-1">
        Contenu du troisième onglet. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris.
      </TabsContent>
    </Tabs>
  ),
}

// ── Avec onglet désactivé ─────────────────────────────────────────────────────
export const WithDisabled: Story = {
  args: { defaultValue: 'tab1' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="tab1">Actif</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Désactivé
        </TabsTrigger>
        <TabsTrigger value="tab3">Actif</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Premier onglet actif.</TabsContent>
      <TabsContent value="tab2">
        Ce contenu ne peut pas être affiché car l'onglet est désactivé.
      </TabsContent>
      <TabsContent value="tab3">Troisième onglet actif.</TabsContent>
    </Tabs>
  ),
}

// ── Exemple : profil ──────────────────────────────────────────────────────────
export const ProfileExample: Story = {
  args: { defaultValue: 'info' },
  render: (args) => (
    <Box>
      <Heading as="h2" size="5" weight="bold" className="text-foreground mb-4">
        Mon profil
      </Heading>
      <Tabs {...args} className="w-full">
        <TabsList>
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="preferences">Préférences</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Box className="space-y-4">
            <Heading as="h3" size="4" weight="medium" className="text-foreground">
              Informations personnelles
            </Heading>
            <Grid columns="1" className="gap-4">
              <Input label="Nom" defaultValue="Dupont" />
              <Input label="Prénom" defaultValue="Jean" />
              <Input label="Email" type="email" defaultValue="jean.dupont@email.fr" />
            </Grid>
          </Box>
        </TabsContent>
        <TabsContent value="security">
          <Box className="space-y-4">
            <Heading as="h3" size="4" weight="medium" className="text-foreground">
              Sécurité du compte
            </Heading>
            <Box className="p-4 bg-success-background rounded-lg border border-success">
              <Text as="p" weight="medium" className="text-success">
                Authentification à deux facteurs activée
              </Text>
              <Text as="p" size="2" className="text-foreground mt-1">
                Votre compte est protégé par une double authentification.
              </Text>
            </Box>
            <Button variant="primary">Changer le mot de passe</Button>
          </Box>
        </TabsContent>
        <TabsContent value="preferences">
          <Box className="space-y-4">
            <Heading as="h3" size="4" weight="medium" className="text-foreground">
              Préférences de communication
            </Heading>
            <Box className="space-y-3">
              <Checkbox id="pref-1" label="Recevoir les notifications par email" defaultChecked />
              <Checkbox id="pref-2" label="Recevoir la newsletter mensuelle" />
              <Checkbox id="pref-3" label="Alertes de sécurité" defaultChecked />
            </Box>
          </Box>
        </TabsContent>
      </Tabs>
    </Box>
  ),
}

// ── Exemple : service public ──────────────────────────────────────────────────
export const ServiceTabsExample: Story = {
  args: { defaultValue: 'description' },
  render: (args) => (
    <Box>
      <Tabs {...args}>
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="tarifs">Tarifs</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Box className="space-y-3">
            <Heading as="h3" size="4" weight="medium" className="text-grey-850">
              Présentation du service
            </Heading>
            <Text as="p" className="text-grey-700">
              Ce service vous permet d'effectuer vos démarches administratives en ligne, 24h/24 et
              7j/7.
            </Text>
            <ul className="list-disc list-inside text-grey-700 space-y-1">
              <li>Simple et rapide</li>
              <li>Sécurisé</li>
              <li>Accessible à tous</li>
            </ul>
          </Box>
        </TabsContent>
        <TabsContent value="documents">
          <Box className="space-y-3">
            <Heading as="h3" size="4" weight="medium" className="text-grey-850">
              Documents à fournir
            </Heading>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Box className="w-2 h-2 bg-blue-france-main rounded-full" />
                <Text as="span" className="text-grey-700">
                  Pièce d'identité en cours de validité
                </Text>
              </li>
              <li className="flex items-center gap-2">
                <Box className="w-2 h-2 bg-blue-france-main rounded-full" />
                <Text as="span" className="text-grey-700">
                  Justificatif de domicile (-3 mois)
                </Text>
              </li>
            </ul>
          </Box>
        </TabsContent>
        <TabsContent value="tarifs">
          <Box className="space-y-3">
            <Heading as="h3" size="4" weight="medium" className="text-grey-850">
              Tarification
            </Heading>
            <Box className="border border-grey-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-grey-200">
                    <td className="px-4 py-3 text-grey-700">Première demande</td>
                    <td className="px-4 py-3 text-right font-medium">25 €</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-grey-700">Duplicata</td>
                    <td className="px-4 py-3 text-right font-medium">Gratuit</td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        </TabsContent>
        <TabsContent value="contact">
          <Box className="space-y-2 text-grey-700">
            <Text as="p">📧 contact@service-public.gouv.fr</Text>
            <Text as="p">📞 01 23 45 67 89</Text>
            <Text as="p">🕐 Du lundi au vendredi, 9h-18h</Text>
          </Box>
        </TabsContent>
      </Tabs>
    </Box>
  ),
}

// ── Beaucoup d'onglets ────────────────────────────────────────────────────────
export const ManyTabs: Story = {
  args: { defaultValue: '1' },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="1">Janvier</TabsTrigger>
        <TabsTrigger value="2">Février</TabsTrigger>
        <TabsTrigger value="3">Mars</TabsTrigger>
        <TabsTrigger value="4">Avril</TabsTrigger>
        <TabsTrigger value="5">Mai</TabsTrigger>
        <TabsTrigger value="6">Juin</TabsTrigger>
      </TabsList>
      <TabsContent value="1">Statistiques de janvier</TabsContent>
      <TabsContent value="2">Statistiques de février</TabsContent>
      <TabsContent value="3">Statistiques de mars</TabsContent>
      <TabsContent value="4">Statistiques d'avril</TabsContent>
      <TabsContent value="5">Statistiques de mai</TabsContent>
      <TabsContent value="6">Statistiques de juin</TabsContent>
    </Tabs>
  ),
}
