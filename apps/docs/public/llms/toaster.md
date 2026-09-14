# Composant Toaster

> Notification éphémère et non bloquante qui apparaît brièvement (en bas de l'écran) puis disparaît d'elle-même.

## Import
```tsx
import { Toaster } from '@dsfrkit/react'
```

## Usage recommandé
Notification éphémère et non bloquante qui apparaît brièvement (en bas de l'écran) puis disparaît d'elle-même.

**Quand l'utiliser ?** Pour confirmer à l'utilisateur qu'une action de fond a réussi (ex: "Brouillon automatiquement sauvegardé", "Message envoyé"). Ne requiert aucune action immédiate de l'utilisateur.

**Alternatives :** Pour une information contextuelle de page permanente, utilisez `Alert`. Pour annoncer un événement planifié ou perturbateur sur tout le site, on préfèrera `Notice`.

**Mise en place (obligatoire) :** montez **un seul** `<Toaster />` à la racine de l'application, par exemple dans le layout à côté du `ThemeProvider`. `toast()` et `useToast()` ne font qu'ajouter la notification à une file partagée : sans `Toaster` monté, rien ne s'affiche. Ils s'appellent ensuite depuis n'importe quel composant, sans prop ni contexte à transmettre.

```tsx
// Racine de l'application
<ThemeProvider>
  <App />
  <Toaster />
</ThemeProvider>

// N'importe où dans l'application
const { toast } = useToast()
toast({ title: 'Brouillon enregistré', variant: 'success' })
```

Les primitives `Toast`, `ToastTitle`, `ToastDescription`, `ToastAction` et `ToastClose` ne servent qu'à écrire un `Toaster` personnalisé : elles doivent alors être rendues dans un `ToastProvider` contenant un `ToastViewport`.

## Documentation et exemples
Composant Toaster : zone d'affichage des toasts de l'application.

À monter **une seule fois**, à la racine de l'application (layout). `toast()`
et `useToast()` ne font qu'ajouter une notification à une file partagée :
sans `Toaster` monté, aucune notification ne s'affiche.

@example
```tsx
// Racine de l'application
<ThemeProvider>
  <App />
  <Toaster />
</ThemeProvider>

// Dans n'importe quel composant
const { toast } = useToast()
toast({ title: 'Brouillon enregistré', variant: 'success' })
```

## Storybook
Rubrique : `Feedback/Toast`
