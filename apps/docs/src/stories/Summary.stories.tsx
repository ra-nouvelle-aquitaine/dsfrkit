import { Heading, Summary, Text } from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Navigation/Summary',
  component: Summary,
  parameters: {
    docs: {
      description: {
        component: `Sommaire (\`fr-summary\`) : liste numérotée des sections d'une page longue, placée en haut du contenu pour y accéder directement.

**Quand l'utiliser ?** Sur une page de contenu dense (fiche pratique, article, mentions légales) comportant plusieurs sections titrées. Les liens pointent vers les ancres des titres (\`id\`) ; une adresse interne (\`/…\`) passe par le routeur configuré avec \`RouterProvider\`.

**Structure :** \`items\` décrit les entrées ; chaque entrée peut porter des \`items\` numérotés à sa suite (1.1, 1.2…). Le titre est un \`h2\` par défaut (\`titleAs\` pour l'adapter à la hiérarchie de la page).
`,
      },
    },
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Entrées du sommaire : `{ label, href, items? }[]`.',
      table: { type: { summary: 'SummaryItem[]' } },
    },
    title: {
      control: 'text',
      description: 'Titre du sommaire.',
      table: { type: { summary: 'ReactNode' }, defaultValue: { summary: 'Sommaire' } },
    },
    titleAs: {
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      description: 'Niveau du titre.',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'h2' } },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Summary>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Qui peut faire la demande ?',
        href: '#qui',
        items: [
          { label: 'Personne majeure', href: '#majeur' },
          { label: 'Personne mineure', href: '#mineur' },
          { label: 'Personne sous tutelle ou curatelle', href: '#tutelle' },
        ],
      },
      { label: 'Où faire la demande ?', href: '#ou' },
      {
        label: 'Comment faire la demande ?',
        href: '#comment',
        items: [
          { label: 'Pré-demande en ligne', href: '#pre-demande' },
          { label: 'Rendez-vous en mairie', href: '#rendez-vous' },
        ],
      },
      { label: 'Documents à fournir', href: '#documents' },
      { label: 'Coût', href: '#cout' },
      { label: 'Délai de fabrication et retrait', href: '#delai' },
    ],
  },
}

export const SingleLevel: Story = {
  name: 'Un seul niveau',
  args: {
    items: [
      { label: 'Éditeur du site', href: '#editeur' },
      { label: 'Hébergement', href: '#hebergement' },
      { label: 'Accessibilité', href: '#accessibilite' },
      { label: 'Données personnelles', href: '#donnees' },
      { label: 'Cookies', href: '#cookies' },
    ],
  },
}

const sections = [
  {
    id: 'summary-conditions',
    title: 'Conditions',
    text: 'Vous devez résider en France et être âgé de 16 ans au moins à la date de la demande.',
  },
  {
    id: 'summary-demarche',
    title: 'Démarche',
    text: 'La demande se fait en ligne puis se finalise lors d’un rendez-vous au guichet.',
    children: [
      {
        id: 'summary-documents',
        title: 'Documents à fournir',
        text: 'Une photo d’identité récente et un justificatif de domicile de moins de 6 mois.',
      },
      {
        id: 'summary-delais',
        title: 'Délais',
        text: 'Comptez environ 3 semaines entre le rendez-vous et la mise à disposition du titre.',
      },
    ],
  },
  {
    id: 'summary-recours',
    title: 'Recours',
    text: 'En cas de refus, vous pouvez former un recours gracieux dans un délai de 2 mois.',
  },
]

/**
 * Sommaire en tête de page : chaque lien mène à l'ancre (`id`) du titre de
 * section correspondant.
 */
export const WithPageContent: Story = {
  name: 'Dans une page de contenu',
  args: {
    items: sections.map((section) => ({
      label: section.title,
      href: `#${section.id}`,
      items: section.children?.map((child) => ({ label: child.title, href: `#${child.id}` })),
    })),
  },
  render: (args) => (
    <div className="grid w-full gap-8 md:grid-cols-12">
      <div className="md:col-span-4">
        <Summary {...args} />
      </div>
      <article className="md:col-span-8">
        {sections.map((section) => (
          <section key={section.id} className="mb-8">
            <Heading as="h2" size="4" id={section.id} className="mb-3 scroll-mt-4">
              {section.title}
            </Heading>
            <Text>{section.text}</Text>
            {section.children?.map((child) => (
              <div key={child.id} className="mt-6">
                <Heading as="h3" size="3" id={child.id} className="mb-2 scroll-mt-4">
                  {child.title}
                </Heading>
                <Text>{child.text}</Text>
              </div>
            ))}
          </section>
        ))}
      </article>
    </div>
  ),
}
