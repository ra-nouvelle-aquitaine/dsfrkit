# Composant useToast

> Accès aux toasts depuis un composant : toast() pour en afficher un, dismiss(id?) pour les fermer, toasts pour lire la file.

## Import
```tsx
import { toast, useToast } from '@dsfrkit/react'
```

## Documentation et exemples
Affiche un toast. Utilisable hors composant (après une requête, dans un
gestionnaire d'événement…).

Nécessite un `<Toaster />` monté une fois à la racine de l'application : sans
lui, la notification est ajoutée à la file mais jamais affichée.

@example
```tsx
const { dismiss } = toast({
  title: 'Message envoyé',
  description: 'Nous vous répondrons sous 48 heures.',
  variant: 'success',
})
```

Accès aux toasts depuis un composant : `toast()` pour en afficher un,
`dismiss(id?)` pour les fermer, `toasts` pour lire la file.

Nécessite un `<Toaster />` monté une fois à la racine de l'application.

@example
```tsx
const { toast } = useToast()
<Button onClick={() => toast({ title: 'Brouillon enregistré' })}>Enregistrer</Button>
```
