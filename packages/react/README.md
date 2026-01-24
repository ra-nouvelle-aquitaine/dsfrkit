# @dsfrkit/react

Composants React source pour le Système de Design de l'État français (DSFR).

> **Note importante** : Ce package contient les **sources** des composants. Il est conçu pour être utilisé via le CLI `@dsfrkit/cli` qui copie les composants dans votre projet, à la manière de shadcn/ui. Vous pouvez ensuite les modifier selon vos besoins.

## Installation via CLI (recommandé)

```bash
# Initialiser le projet
pnpm dlx @dsfrkit/cli init

# Ajouter des composants
pnpm dlx @dsfrkit/cli add button alert
```

## Installation directe (alternative)

Si vous préférez installer le package directement :

```bash
pnpm add @dsfrkit/react
```

## Usage

### Button

```tsx
import { Button } from '@dsfrkit/react'

function App() {
  return (
    <>
      <Button variant="primary" size="lg">
        Valider
      </Button>

      <Button variant="secondary">
        Action secondaire
      </Button>

      <Button variant="tertiary" size="sm">
        Annuler
      </Button>

      <Button variant="danger" disabled>
        Supprimer
      </Button>
    </>
  )
}
```

**Variants disponibles** :
- `primary` - Bleu France (défaut)
- `secondary` - Rouge Marianne
- `tertiary` - Bouton outline
- `ghost` - Bouton fantôme
- `danger` - Rouge danger
- `success` - Vert succès
- `warning` - Orange avertissement

**Tailles** :
- `sm` - Petit
- `md` - Moyen (défaut)
- `lg` - Large

### Alert

```tsx
import { Alert } from '@dsfrkit/react'

function App() {
  return (
    <>
      <Alert variant="success" title="Succès">
        Votre action a été effectuée avec succès.
      </Alert>

      <Alert variant="error" title="Erreur">
        Une erreur est survenue lors du traitement.
      </Alert>

      <Alert variant="info">
        Informations importantes.
      </Alert>
    </>
  )
}
```

**Variants disponibles** :
- `info` - Information (défaut)
- `success` - Succès
- `warning` - Avertissement
- `error` - Erreur

## Composants disponibles

- ✅ Button
- ✅ Alert
- 🚧 Card (à venir)
- 🚧 Input (à venir)
- 🚧 Modal (à venir)
- 🚧 Accordion (à venir)
- 🚧 Tabs (à venir)

## Personnalisation

Les composants utilisent [class-variance-authority](https://cva.style/) pour les variants et [tailwind-merge](https://github.com/dcastil/tailwind-merge) pour la fusion des classes. Vous pouvez facilement étendre ou modifier les variants selon vos besoins.

## License

ETALAB-2.0
