# @dsfrkit/tokens

Design tokens du Système de Design de l'État français (DSFR).

## Installation

```bash
pnpm add @dsfrkit/tokens
```

## Usage

```ts
import { colors, typography, spacing } from '@dsfrkit/tokens'

// Utiliser les tokens
const primaryColor = colors['blue-france'].main
const baseFont = typography.fontFamily.marianne
const baseSpacing = spacing[4]
```

## Import CSS (polices & variables)

`@dsfrkit/tokens` fournit aussi un fichier CSS prêt à l'emploi (`theme.css`) qui contient les variables et les déclarations `@font-face`.

- En développement local (monorepo), assurez-vous d'avoir généré `dist/theme.css` en exécutant :

```bash
pnpm -w --filter @dsfrkit/tokens run sync:dsfr
pnpm -w --filter @dsfrkit/tokens run build
```

Puis importez-le depuis vos fichiers CSS :

```css
@import "@dsfrkit/tokens/dist/theme.css";
```

- Une fois publié, `@dsfrkit/tokens/theme.css` est exposé via `exports` et peut être importé directement :

```css
@import "@dsfrkit/tokens/theme.css";
```

(Si vous rencontrez une erreur `ENOENT` lors du développement, utilisez le chemin `dist/theme.css` ou rebuild `@dsfrkit/tokens`.)

## Contenu

- **colors** - Palette de couleurs complète du DSFR
- **typography** - Police Marianne, tailles, poids
- **spacing** - Échelle d'espacements
- **borderRadius** - Rayons de bordure
- **boxShadow** - Ombres

## Synchronisation

Les tokens sont synchronisés avec le [DSFR officiel](https://www.systeme-de-design.gouv.fr/).

```bash
pnpm sync:dsfr
```
