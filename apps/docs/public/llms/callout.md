# Composant Callout

> Mise en exergue (mise en avant) d'un contenu important au sein du texte pour attirer l'œil du lecteur.

## Import
```tsx
import { Callout, calloutVariants } from '@dsfrkit/react'
import type { CalloutProps } from '@dsfrkit/react'
```

## Usage recommandé
Mise en exergue (mise en avant) d'un contenu important au sein du texte pour attirer l'œil du lecteur.

**Quand l'utiliser ?** Dans le corps d'un article ou d'une documentation pour surligner une astuce technique (`tip`), une note importante (`important`) ou un fait annexe, sans pour autant qu'il s'agisse d'un message en rapport avec l'état de l'application utilisateur (où l'on préfère l' `Alert`).

## Documentation et exemples
Composant Callout DSFR ("Mise en avant")
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/mise-en-avant

Bloc de mise en avant avec bordure gauche épaisse colorée et fond adaptatif.
Utilisé pour mettre en valeur une information clé.

## Props et types
```ts
export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof calloutVariants> {
  /** Titre optionnel affiché en gras au-dessus du contenu */
  title?: React.ReactNode
  /**
   * Niveau sémantique du titre.
   * Modifie la balise générée (h2-h6, p, div, span) tout en gardant l'apparence visuelle.
   * @default "h3"
   */
  titleMarkup?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div' | 'span'
  /** Icône optionnelle à afficher avant le titre */
  icon?: React.ReactNode
  /** Composant optionnel de bouton d'action affiché en bas de la mise en avant */
  action?: React.ReactNode
}
```

## Storybook
Rubrique : `Data Display/Callout`
