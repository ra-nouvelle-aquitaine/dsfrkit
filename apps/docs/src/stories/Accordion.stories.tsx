import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Box,
  Heading,
  Text,
} from '@dsfrkit/react'
import type { Meta } from '@storybook/react-vite'

const meta: Meta<typeof Accordion> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component: `Permet de condenser le contenu en masquant des sections qui peuvent être affichées au clic. Idéal pour les FAQ ou les formulaires longs.
`,
      },
    },
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description:
        "Définit si un seul ou plusieurs accordéons peuvent être ouverts à la fois ('single' ou 'multiple').",
      table: { type: { summary: 'string' }, defaultValue: { summary: 'single' } },
    },
    collapsible: {
      control: 'boolean',
      description:
        "Permet de refermer un accordéon ouvert lorsqu'on clique dessus (Par défaut true si type='single').",
    },
    defaultValue: {
      control: 'text',
      description:
        "La valeur (value) de l'élément (ou tableau d'éléments si 'multiple') ouvert par défaut.",
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box style={{ width: '100%', maxWidth: '500px' }}>
        <Story />
      </Box>
    ),
  ],
}

export default meta

export const Default = (args: any) => {
  const props =
    args.type === 'multiple'
      ? {
          type: 'multiple' as const,
          defaultValue: args.defaultValue ? [args.defaultValue] : undefined,
        }
      : { type: 'single' as const, collapsible: args.collapsible, defaultValue: args.defaultValue }

  return (
    <Accordion {...props}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          Contenu de la première section. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Contenu de la deuxième section. Sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Contenu de la troisième section. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
Default.args = {
  type: 'single',
  collapsible: true,
}

export const DefaultOpen = (args: any) => (
  <Accordion defaultValue="item-1" {...args}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Section ouverte par défaut</AccordionTrigger>
      <AccordionContent>
        Cette section est ouverte par défaut grâce à la propriété defaultValue.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Autre section</AccordionTrigger>
      <AccordionContent>Cliquez pour ouvrir cette section.</AccordionContent>
    </AccordionItem>
  </Accordion>
)

export const Multiple = (args: any) => (
  <Accordion type="multiple" defaultValue={['item-1', 'item-2']} {...args}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Première section (ouverte)</AccordionTrigger>
      <AccordionContent>Plusieurs sections peuvent être ouvertes simultanément.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Deuxième section (ouverte)</AccordionTrigger>
      <AccordionContent>Cette section est également ouverte par défaut.</AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>Troisième section</AccordionTrigger>
      <AccordionContent>Cliquez pour ouvrir cette section sans fermer les autres.</AccordionContent>
    </AccordionItem>
  </Accordion>
)

export const FAQExample = (args: any) => (
  <Box className="space-y-4">
    <Heading as="h2" size="5" weight="bold" className="text-blue-france-main">
      Questions fréquentes
    </Heading>
    <Accordion {...args}>
      <AccordionItem value="q1">
        <AccordionTrigger>Comment créer un compte ?</AccordionTrigger>
        <AccordionContent>
          Pour créer un compte, cliquez sur le bouton "S'inscrire" en haut à droite de la page.
          Remplissez le formulaire avec vos informations personnelles et validez votre inscription
          via le lien envoyé par email.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="q2">
        <AccordionTrigger>Comment réinitialiser mon mot de passe ?</AccordionTrigger>
        <AccordionContent>
          Cliquez sur "Mot de passe oublié" sur la page de connexion. Entrez votre adresse email et
          vous recevrez un lien pour créer un nouveau mot de passe.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="q3">
        <AccordionTrigger>Quels sont les délais de traitement ?</AccordionTrigger>
        <AccordionContent>
          Les délais de traitement varient selon le type de demande :
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Demande standard : 5 jours ouvrés</li>
            <li>Demande urgente : 2 jours ouvrés</li>
            <li>Demande complexe : jusqu'à 15 jours ouvrés</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="q4">
        <AccordionTrigger>Comment contacter le support ?</AccordionTrigger>
        <AccordionContent>
          Vous pouvez contacter notre équipe support :
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Par email : support@service-public.gouv.fr</li>
            <li>Par téléphone : 01 23 45 67 89 (du lundi au vendredi, 9h-18h)</li>
            <li>Via le formulaire de contact en ligne</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Box>
)

export const ServiceDetailsExample = (args: any) => (
  <Box className="space-y-4">
    <Heading as="h2" size="5" weight="bold" className="text-grey-850">
      Détails du service
    </Heading>
    <Accordion type="multiple" {...args}>
      <AccordionItem value="description">
        <AccordionTrigger>Description du service</AccordionTrigger>
        <AccordionContent>
          <Text as="p">
            Ce service vous permet d'effectuer vos démarches administratives en ligne, de manière
            simple et sécurisée.
          </Text>
          <Text as="p" className="mt-2">
            Disponible 24h/24 et 7j/7, il vous évite les déplacements et les files d'attente.
          </Text>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="documents">
        <AccordionTrigger>Documents nécessaires</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Pièce d'identité en cours de validité</li>
            <li>Justificatif de domicile de moins de 3 mois</li>
            <li>Photo d'identité aux normes</li>
            <li>Ancien document (si renouvellement)</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="tarifs">
        <AccordionTrigger>Tarifs et délais</AccordionTrigger>
        <AccordionContent>
          <Box className="space-y-4">
            <Box>
              <Heading as="h4" size="5" weight="medium">
                Tarifs
              </Heading>
              <Text as="p" className="text-grey-700">
                Le coût de la démarche est de 25€ (timbre fiscal).
              </Text>
            </Box>
            <Box>
              <Heading as="h4" size="5" weight="medium">
                Délais
              </Heading>
              <Text as="p" className="text-grey-700">
                Comptez environ 2 à 4 semaines pour recevoir votre document.
              </Text>
            </Box>
          </Box>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="contact">
        <AccordionTrigger>Contact et assistance</AccordionTrigger>
        <AccordionContent>
          <Text as="p">Pour toute question, notre équipe est à votre disposition :</Text>
          <ul className="mt-2 space-y-1">
            <li>📧 contact@service-public.gouv.fr</li>
            <li>📞 01 23 45 67 89</li>
            <li>🏢 Service des démarches, 1 rue de l'Administration, 75001 Paris</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Box>
)

export const NestedContentExample = (args: any) => (
  <Accordion {...args}>
    <AccordionItem value="item-1">
      <AccordionTrigger>Section avec contenu riche</AccordionTrigger>
      <AccordionContent>
        <Box className="space-y-4">
          <Text as="p">
            Cette section contient différents types de contenu pour démontrer la flexibilité du
            composant Accordion.
          </Text>

          <Box className="p-4 bg-info-50 rounded-lg">
            <Heading as="h4" size="5" weight="medium" className="text-info-main mb-2">
              Information
            </Heading>
            <Text as="p" size="2" className="text-grey-700">
              Ceci est un encadré informatif à l'intérieur de l'accordéon.
            </Text>
          </Box>

          <Box className="overflow-x-auto">
            <table className="min-w-full border border-grey-200">
              <thead>
                <tr className="bg-grey-50">
                  <th className="px-4 py-2 text-left text-sm font-medium">Élément</th>
                  <th className="px-4 py-2 text-left text-sm font-medium">Statut</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-grey-200">
                  <td className="px-4 py-2 text-sm">Document A</td>
                  <td className="px-4 py-2 text-sm text-success-main">Validé</td>
                </tr>
                <tr className="border-t border-grey-200">
                  <td className="px-4 py-2 text-sm">Document B</td>
                  <td className="px-4 py-2 text-sm text-warning-main">En attente</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)
