# Composant Toggle

> Interrupteur à bascule pour changer un état binaire avec un effet de bord visuel ou système immédiat.

## Import
```tsx
import { Toggle, toggleVariants } from '@dsfrkit/react'
import type { ToggleProps } from '@dsfrkit/react'
```

## Usage recommandé
Interrupteur à bascule pour changer un état binaire avec un effet de bord visuel ou système immédiat.

**Quand l'utiliser ?** Pour activer/désactiver directement une fonctionnalité (ex: "Mode sombre", "Activer les notifications", "Wi-Fi") SANS nécessiter de bouton "Sauvegarder" / "Soumettre". Mémorise implicitement la préférence utilisateur.

**Alternative :** S'il faut cliquer sur "Soumettre" pour valider le changement d'état à la fin d'un formulaire, utilisez plutôt des boutons `Radio` ou une case à cocher `Checkbox`.

## Documentation et exemples
Composant Toggle (Interrupteur) DSFR
Utilise Radix UI Switch pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/interrupteur

Toggle (Interrupteur) accessible avec label et gestion d'erreurs

@example
```tsx
<Toggle label="Notifications" />
<Toggle label="Mode sombre" hint="Activer le thème sombre" />
<Toggle label="Bluetooth" error="Impossible d'activer le Bluetooth" />
```

## Props et types
```ts
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  /** Label du toggle */
  label?: string
  /** Texte d'aide */
  hint?: string
  /** Message d'erreur DSFR */
  error?: string
  /** Message de succès DSFR */
  success?: string
  /** Afficher le label à gauche ou à droite du toggle (défaut: right) */
  labelPosition?: 'left' | 'right'
}
```

## Storybook
Rubrique : `Inputs/Toggle`
