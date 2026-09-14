# @dsfrkit/tokens

Design tokens du Système de Design de l'État français (DSFR) : valeurs TypeScript pour la configuration, et feuille de styles `theme.css` avec les variables de couleur et les polices.

## Installation

```bash
pnpm add @dsfrkit/tokens
```

## Import CSS (variables et polices)

`theme.css` contient :

- les variables de couleur du DSFR (palette et tokens de décision comme `--background-default-grey` ou `--text-action-high-blue-france`), pour les thèmes clair et sombre (`.dark`, `[data-theme="dark"]`, `[data-fr-theme="dark"]`) ;
- les déclarations `@font-face` de Marianne et Spectral, avec les fichiers de police inclus dans le paquet.

Importez-le en tête de votre feuille de styles principale :

```css
@import '@dsfrkit/tokens/theme.css';
```

Les classes Tailwind sémantiques du preset [`@dsfrkit/config`](../config) (`bg-background`, `text-foreground`, `bg-primary`…) reposent sur ces variables.

## Usage en TypeScript

```ts
import { colors, screens, spacing, typography } from '@dsfrkit/tokens'

const bleuFrance = colors['blue-france'].sun // '#000091'
const police = typography.fontFamily.marianne
const espacement = spacing[4] // '1rem'
const pointDeRupture = screens.lg // '62em' (992px)
```

Sous-chemins disponibles : `@dsfrkit/tokens/colors`, `@dsfrkit/tokens/typography`, `@dsfrkit/tokens/spacing`.

## Contenu

- **colors** — sous-ensemble typé des couleurs DSFR les plus utilisées (valeurs hexadécimales)
- **cssVariables** — correspondance entre les noms sémantiques Tailwind et les variables de `theme.css`
- **theme.css** — variables de décision et palette CSS complète, synchronisées depuis le paquet officiel, et polices
- **typography** — familles Marianne et Spectral, tailles (texte et titres mobile / desktop), graisses, interlignages
- **spacing** — échelle d'espacements (base 8px)
- **screens** — points de rupture DSFR (`sm` 576px, `md` 768px, `lg` 992px, `xl` 1248px)
- **borderRadius** — rayons de bordure
- **boxShadow** — ombres et élévation

## Développement

Dans le monorepo, `theme.css` et les polices sont copiés dans `dist/` au build (et au lancement du mode `dev`). Si l'import `@dsfrkit/tokens/theme.css` échoue avec `ENOENT`, reconstruisez le paquet :

```bash
pnpm --filter @dsfrkit/tokens build
```

## Synchronisation avec le DSFR

Les variables sont générées depuis le paquet officiel [`@gouvfr/dsfr`](https://www.systeme-de-design.gouv.fr/) :

```bash
pnpm --filter @dsfrkit/tokens sync:dsfr
```
