# Composant Modal

## Import
```tsx
import { Modal } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Modal (Dialog) DSFR
Utilise Radix UI Dialog pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/modale

Exemple d'utilisation :
```tsx
<Modal>
<ModalTrigger asChild>
<Button>Ouvrir la modale</Button>
</ModalTrigger>
<ModalContent>
<ModalHeader>
<ModalTitle>Titre de la modale</ModalTitle>
<ModalDescription>
Description de la modale
</ModalDescription>
</ModalHeader>
<div className="py-4">
Contenu de la modale
</div>
<ModalFooter>
<ModalClose asChild>
<Button variant="tertiary">Annuler</Button>
</ModalClose>
<Button>Confirmer</Button>
</ModalFooter>
</ModalContent>
</Modal>
```
