<div align="center">
  <img src=".github/assets/logo.svg" width="400" alt="DSFRKit Logo" style="border-radius: 24px;" />
</div>

Composants React accessibles et conformes au [Système de Design de l'État français (DSFR)](https://www.systeme-de-design.gouv.fr/), construits avec [Radix UI](https://www.radix-ui.com/) et [Tailwind CSS](https://tailwindcss.com/).

[![npm @dsfrkit/react](https://img.shields.io/npm/v/@dsfrkit/react.svg?label=%40dsfrkit%2Freact)](https://www.npmjs.com/package/@dsfrkit/react)
[![npm @dsfrkit/tokens](https://img.shields.io/npm/v/@dsfrkit/tokens.svg?label=%40dsfrkit%2Ftokens)](https://www.npmjs.com/package/@dsfrkit/tokens)
[![npm @dsfrkit/config](https://img.shields.io/npm/v/@dsfrkit/config.svg?label=%40dsfrkit%2Fconfig)](https://www.npmjs.com/package/@dsfrkit/config)
[![npm @dsfrkit/icons](https://img.shields.io/npm/v/@dsfrkit/icons.svg?label=%40dsfrkit%2Ficons)](https://www.npmjs.com/package/@dsfrkit/icons)
[![npm @dsfrkit/cli](https://img.shields.io/npm/v/@dsfrkit/cli.svg?label=%40dsfrkit%2Fcli)](https://www.npmjs.com/package/@dsfrkit/cli)

---

## Pourquoi DSFRKit ?

- **Conforme DSFR** — Couleurs, typographies, espacements et composants du Système de Design de l'État.
- **Accessible** — Primitives [Radix UI](https://www.radix-ui.com/) pour une conformité WAI-ARIA native (clavier, lecteurs d'écran, focus).
- **Tailwind CSS** — Styling utilitaire avec des design tokens DSFR mappés sur les variables Tailwind (`bg-primary`, `text-destructive`, etc.).
- **Dark Mode** — Support natif et automatisé du thème sombre.
- **Approche Shadcn** — Copiez les composants dans votre projet via la CLI. Vous êtes propriétaire du code.
- **TypeScript** — Typage complet pour chaque composant et chaque prop.

---

## Démo

| | Lien |
|---|------|
| Documentation | [ra-nouvelle-aquitaine.github.io/dsfrkit](https://ra-nouvelle-aquitaine.github.io/dsfrkit/) |
| Storybook | [ra-nouvelle-aquitaine.github.io/dsfrkit/storybook](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/) |
| Exemple React + Vite | [ra-nouvelle-aquitaine.github.io/dsfrkit/example](https://ra-nouvelle-aquitaine.github.io/dsfrkit/example/) |

---

## Installation

### Méthode 1 : CLI (recommandée)
```bash
# 2. Initialiser le projet (génère tailwind.config, tokens, etc.)
pnpm dlx @dsfrkit/cli init

# 3. Ajouter des composants à la carte
pnpm dlx @dsfrkit/cli add button alert card modal
```

### Méthode 2 :  NPM Classique
```bash
# Installer le preset Tailwind et tous les composants
pnpm add -D @dsfrkit/config tailwindcss
pnpm add @dsfrkit/react @dsfrkit/icons
```

### Configuration Tailwind

```js
// tailwind.config.js
import dsfrPreset from '@dsfrkit/config'

export default {
  presets: [dsfrPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dsfrkit/react/dist/**/*.{js,mjs}'
  ],
}
```

```css
/* src/index.css */
@import '@dsfrkit/tokens/theme.css';
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-marianne antialiased;
  }
}
```

---

## Utilisation

```tsx
import { ThemeProvider, Button, Alert } from '@dsfrkit/react'

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Button variant="primary" size="lg">
        Valider
      </Button>

      <Alert variant="success" title="Succès">
        Votre action a été effectuée avec succès.
      </Alert>
    </ThemeProvider>
  )
}
```

---

## Intégration avec les routeurs

DSFRKit s'intègre avec tous les routeurs React via le `RouterProvider` :

```tsx
import { RouterProvider, ThemeProvider } from '@dsfrkit/react'
import { BrowserRouter, Link as RouterLink } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <RouterProvider
        Link={RouterLink}
        linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}
      >
        <ThemeProvider>
          <MyApp />
        </ThemeProvider>
      </RouterProvider>
    </BrowserRouter>
  )
}
```

Routeurs supportés : **React Router**, **TanStack Router**, **Next.js**. Voir la [documentation Routing](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/?path=/docs/guides-routing--docs) pour les détails.

---

## Packages

| Package | Description |
|---------|-------------|
| [`@dsfrkit/react`](./packages/react) | Composants React (60+) |
| [`@dsfrkit/tokens`](./packages/tokens) | Design tokens DSFR (couleurs, typographie, espacements) |
| [`@dsfrkit/config`](./packages/config) | Preset Tailwind CSS pour le DSFR |
| [`@dsfrkit/icons`](./packages/icons) | Icônes React optimisées |
| [`@dsfrkit/cli`](./packages/cli) | CLI pour copier les composants dans votre projet |

---

## Composants

| Catégorie | Composants |
|-----------|-----------|
| **Formulaires** | Button, ButtonGroup, Checkbox, Input, InputOTP, Radio, Range, Select, Toggle, Upload |
| **Feedback** | Alert, Callout, Notice, Toast, Progress, Indicator |
| **Data Display** | Accordion, Badge, Card, DataList, Quote, Table, Tabs, Tag, Tile |
| **Overlay** | Modal, Sheet, Popover, HoverCard, DropdownMenu, Command, Tooltip |
| **Navigation** | Header, Footer, Navigation, NavLink, Breadcrumb, Pagination, SkipLinks, Link |
| **Typographie** | Heading, Text, Code, Kbd, Highlight |
| **Layout** | Box, Container, Flex, Grid, Section, Separator, Skeleton |
| **Branding** | Logo, Avatar, Artwork, Calendar, ConsentBanner, Follow, Translate, ThemeToggle |

> Consultez le [Storybook](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/) pour voir chaque composant en action avec ses variantes et ses props.

---

## Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](./CONTRIBUTING.md) et [DEVELOPMENT.md](./DEVELOPMENT.md) pour les détails techniques.

1. Forker le repo
2. Créer une branche : `git checkout -b feat/nouveau-composant main`
3. Commiter avec un gitmoji : `git commit -m "✨ ajouter composant Slider"`
4. Pousser et ouvrir une PR vers `main`

Le versioning sémantique est automatisé via [semantic-release-gitmoji](https://github.com/momocow/semantic-release-gitmoji). Consultez `.releaserc.yml` pour les règles complètes.

---

## Liens

- [DSFR Officiel](https://www.systeme-de-design.gouv.fr/)
- [Storybook](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/)
- [GitHub](https://github.com/ra-nouvelle-aquitaine/dsfrkit)
