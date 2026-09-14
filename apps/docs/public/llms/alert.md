# Composant Alert

> Affiche un message important ou une notification à l'utilisateur (succès, erreur, info).

## Import
```tsx
import { Alert, alertVariants } from '@dsfrkit/react'
import type { AlertProps } from '@dsfrkit/react'
```

## Usage recommandé
Affiche un message important ou une notification à l'utilisateur (succès, erreur, info). À utiliser pour capter l'attention sans bloquer la navigation.

## Documentation et exemples
Variants de l'alerte DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/alerte

L'alerte DSFR a une bordure gauche épaisse colorée et des bordures fines sur les autres côtés

Composant Alert DSFR

@example
```tsx
<Alert variant="success" title="Succès" closable>
  Votre action a été effectuée avec succès.
</Alert>

<Alert variant="error">
  Une erreur est survenue.
</Alert>
```

## Props et types
```ts
export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertVariants> {
  /**
   * Titre de l'alerte (accepte du texte ou un noeud React)
   */
  title?: React.ReactNode
  /**
   * Rend l'alerte refermable (ajoute un bouton croix)
   */
  closable?: boolean
  /**
   * Action déclenchée lors de la fermeture
   */
  onClose?: () => void
  /**
   * Libellé du bouton de fermeture pour l'accessibilité
   */
  closeLabel?: string
}
```

## Storybook
Rubrique : `Feedback/Alert`
