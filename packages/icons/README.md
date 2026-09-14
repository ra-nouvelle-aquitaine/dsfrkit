# @dsfrkit/icons

Icônes React pour le Système de Design de l'État français (DSFR). Le paquet expose la bibliothèque [Remix Icon](https://remixicon.com/), celle qu'utilise le DSFR, sous forme de composants React typés.

## Installation

```bash
pnpm add @dsfrkit/icons
```

Nécessite `react`, requis par `@remixicon/react`.

## Utilisation

```tsx
import { RiMailLineIcon, SearchIcon } from '@dsfrkit/icons'
import { Button, Input } from '@dsfrkit/react'

export function Exemple() {
  return (
    <>
      <Input label="Rechercher" icon={<SearchIcon />} position="start" />
      <Button icon={<RiMailLineIcon />}>Nous écrire</Button>
      <RiMailLineIcon size={16} className="text-primary" aria-hidden="true" />
    </>
  )
}
```

### Noms

- Chaque icône Remix est exportée avec le suffixe `Icon` : `RiMailLine` → `RiMailLineIcon`, `RiCheckboxCircleFill` → `RiCheckboxCircleFillIcon`. Les variantes `Line` (contour) et `Fill` (plein) sont toutes deux disponibles.
- Des alias sémantiques couvrent les usages courants : `InfoIcon`, `SuccessIcon`, `WarningIcon`, `ErrorIcon`, `CloseIcon`, `CheckIcon`, `ChevronDownIcon`, `ChevronUpIcon`, `ArrowLeftIcon`, `ArrowRightIcon`, `SearchIcon`, `MenuIcon`, `HomeIcon`, `UserIcon`, `MailIcon`, `BellIcon`, `SettingsIcon`, `DownloadIcon`, `UploadIcon`, `ExternalLinkIcon`, `EyeIcon`, `EyeOffIcon`.

Le [Storybook](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/?path=/docs/branding-icons--docs) propose un explorateur pour rechercher une icône et copier son import.

### Props

Les icônes acceptent les attributs SVG standards, plus :

- `size` — largeur et hauteur (nombre en pixels ou valeur CSS) ;
- `color` — couleur de remplissage, `currentColor` par défaut : l'icône hérite de la couleur du texte.

## Accessibilité

- Une icône décorative, accompagnée d'un texte, doit être masquée : `aria-hidden="true"`. Les composants DSFRKit qui reçoivent une prop `icon` s'en chargent.
- Un bouton ou un lien réduit à une icône doit porter un nom accessible : `<Button icon={<CloseIcon />} aria-label="Fermer" />`.

## Licence

ETALAB-2.0. Les icônes proviennent de Remix Icon, distribuée sous sa propre licence (« Remix Icon License 1.0 »).
