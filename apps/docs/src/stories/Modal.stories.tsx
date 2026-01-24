import {
  Box,
  Button,
  Input,
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
  Text,
} from '@dsfrkit/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta = {
  title: 'Utils/Modal',
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: `Fenêtre de dialogue qui se superpose au contenu principal. Utile pour interrompre l'utilisateur en centrant son attention sur une vue restreinte.

**Quand l'utiliser ?** Pour afficher des formulaires supplémentaires ou des détails d'éléments sans avoir à quitter la page courante au sein du contexte de l'application.

**Alternatives :** Utilisez \`AlertDialog\` pour obliger explicitement l'utilisateur à confimer des actions destuctives (ex: Suppression), et \`Sheet\` (Tiroir) pour afficher de très longs menus ou de lourds panneaux de filtres complexes (qui défileraient mal sur une modale centrale).
`,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { description: "État d'ouverture par défaut de la modale.", control: 'boolean' },
    open: { description: "État d'ouverture contrôlé de la modale.", control: 'boolean' },
    onOpenChange: {
      description:
        "Fonction appelée lors du changement d'état d'ouverture (croix, clic extérieur).",
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Ouvrir la modale</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Titre de la modale</ModalTitle>
          <ModalDescription>
            Description de la modale avec des informations supplémentaires.
          </ModalDescription>
        </ModalHeader>
        <Box className="py-4">
          <Text as="p">Contenu de la modale. Vous pouvez ajouter n'importe quel contenu ici.</Text>
        </Box>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Annuler</Button>
          </ModalClose>
          <Button>Confirmer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const Small: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Modale petite</Button>
      </ModalTrigger>
      <ModalContent size="sm">
        <ModalHeader>
          <ModalTitle>Confirmation</ModalTitle>
        </ModalHeader>
        <Box className="py-4">
          <Text as="p">Êtes-vous sûr de vouloir continuer ?</Text>
        </Box>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Non</Button>
          </ModalClose>
          <Button>Oui</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const Large: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Modale grande</Button>
      </ModalTrigger>
      <ModalContent size="lg">
        <ModalHeader>
          <ModalTitle>Conditions d'utilisation</ModalTitle>
          <ModalDescription>Veuillez lire attentivement les conditions suivantes.</ModalDescription>
        </ModalHeader>
        <Box className="py-4 max-h-[400px] overflow-y-auto">
          <Text as="p" className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text as="p" className="mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </Text>
          <Text as="p">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </Text>
        </Box>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Refuser</Button>
          </ModalClose>
          <Button>Accepter</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const ExtraLarge: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Modale très grande</Button>
      </ModalTrigger>
      <ModalContent size="xl">
        <ModalHeader>
          <ModalTitle>Aperçu du document</ModalTitle>
          <ModalDescription>Visualisez le document avant de le télécharger.</ModalDescription>
        </ModalHeader>
        <Box className="py-4 bg-grey-50 rounded-lg min-h-[300px] flex items-center justify-center">
          <Text as="p" className="text-grey-500">
            Zone d'aperçu du document
          </Text>
        </Box>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Fermer</Button>
          </ModalClose>
          <Button>Télécharger</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const AlertDialog: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="danger">Supprimer</Button>
      </ModalTrigger>
      <ModalContent size="sm" onInteractOutside={(e) => e.preventDefault()}>
        <ModalHeader>
          <ModalTitle>Confirmer la suppression</ModalTitle>
          <ModalDescription>Cette action est irréversible.</ModalDescription>
        </ModalHeader>
        <Box className="py-4">
          <Text as="p">
            Êtes-vous sûr de vouloir supprimer cet élément ? Cette action ne peut pas être annulée.
          </Text>
        </Box>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Annuler</Button>
          </ModalClose>
          <Button variant="danger">Supprimer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button>Nouveau contact</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Ajouter un contact</ModalTitle>
          <ModalDescription>Remplissez les informations du nouveau contact.</ModalDescription>
        </ModalHeader>
        <Box className="py-4 space-y-4">
          <Box>
            <Text as="label" size="2" weight="medium" className="block text-grey-850 mb-1">
              Nom
            </Text>
            <Input type="text" placeholder="Dupont" />
          </Box>
          <Box>
            <Text as="label" size="2" weight="medium" className="block text-grey-850 mb-1">
              Prénom
            </Text>
            <Input type="text" placeholder="Jean" />
          </Box>
          <Box>
            <Text as="label" size="2" weight="medium" className="block text-grey-850 mb-1">
              Email
            </Text>
            <Input type="email" placeholder="jean.dupont@gouv.fr" />
          </Box>
        </Box>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="tertiary">Annuler</Button>
          </ModalClose>
          <Button>Enregistrer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}
