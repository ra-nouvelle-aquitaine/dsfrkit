# Composant DropdownMenu

> Menu contextuel listant des commandes ou des actions, déclenché par un clic court sur un bouton déclencheur.

## Import
```tsx
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@dsfrkit/react'
```

## Usage recommandé
Menu contextuel listant des commandes ou des actions, déclenché par un clic court sur un bouton déclencheur.

**Quand l'utiliser ?** Idéalement pour regrouper ou masquer des actions secondaires sur une entité métier typique et libérer de la place dans l'interface (ex: icône "..." affichant `Modifier`, `Dupliquer`, `Supprimer`).

**Alternative :** Ce composant *déclenche* des actions. Il ne sert en aucun cas à remplir un champ de formulaire textuel ou sélection multiple (qui sont les rôles exclusifs du `Select` ou du `Command`).

## Storybook
Rubrique : `Utils/DropdownMenu`
