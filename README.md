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
# 1. Initialiser le projet (tailwind.config.js, src/index.css, src/lib/utils.ts, dépendances)
pnpm dlx @dsfrkit/cli init

# 2. Copier des composants dans src/components/ui
pnpm dlx @dsfrkit/cli add button alert card modal
```

> La commande `add` propose pour l'instant `button`, `alert`, `card`, `input`, `modal`, `select` et `themetoggle`. Les autres composants s'utilisent depuis le paquet `@dsfrkit/react` (méthode 2), que les deux approches peuvent combiner.

### Méthode 2 : paquet npm
```bash
# Preset Tailwind et thème (variables CSS et polices)
pnpm add -D @dsfrkit/config tailwindcss
pnpm add @dsfrkit/tokens

# Tous les composants et les icônes
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

Un seul point d'entrée monte les fournisseurs, puis les composants s'utilisent partout :

```tsx
import {
  Alert,
  Button,
  Link,
  RouterProvider,
  ThemeProvider,
  Toaster,
  useToast,
} from '@dsfrkit/react'
import { BrowserRouter, Link as RouterLink } from 'react-router-dom'

function Page() {
  const { toast } = useToast()

  return (
    <>
      <Alert variant="success" title="Demande enregistrée">
        Vous pouvez suivre son avancement depuis votre espace.
      </Alert>

      {/* Adresse interne : navigation confiée au routeur, sans rechargement */}
      <Link href="/mes-demarches">Voir mes démarches</Link>

      <Button onClick={() => toast({ title: 'Brouillon enregistré', variant: 'success' })}>
        Enregistrer le brouillon
      </Button>
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <RouterProvider
        Link={RouterLink}
        linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}
      >
        <ThemeProvider defaultTheme="system">
          <Page />
          {/* Une seule fois, à la racine : sans lui, toast() n'affiche rien */}
          <Toaster />
        </ThemeProvider>
      </RouterProvider>
    </BrowserRouter>
  )
}
```

| Fournisseur | Rôle | Requis |
|-------------|------|--------|
| `ThemeProvider` | Thème clair, sombre ou système | Oui |
| `Toaster` | Affiche les notifications de `toast()` / `useToast()` | Si l'application utilise des toasts |
| `RouterProvider` | Navigation sans rechargement pour les liens internes | Non |

---

## Intégration avec les routeurs

Avec le `RouterProvider`, les adresses internes (`/…`) de tous les composants — `Link`, `NavigationItem`, `Breadcrumb`, `Pagination`, `Summary`, `Tile`, `Footer`… — passent par le routeur, sans `asChild`. Les URL absolues, ancres `#`, protocoles (`mailto:`, `tel:`) et liens `target="_blank"` restent des liens natifs.

| Routeur | Configuration |
|---------|---------------|
| React Router | `<RouterProvider Link={Link} linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}>` avec `Link` de `react-router-dom` |
| TanStack Router | Même adaptateur (`href` → `to`) avec `Link` de `@tanstack/react-router` |
| Next.js | `<RouterProvider Link={NextLink}>` : `next/link` accepte `href`, aucun adaptateur |

Voir le [guide d'installation et de routage](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/?path=/docs/installation--docs) pour les détails.

---

## Packages

| Package | Description |
|---------|-------------|
| [`@dsfrkit/react`](./packages/react) | Composants React (60+), fournisseurs de thème et de routage |
| [`@dsfrkit/tokens`](./packages/tokens) | Design tokens DSFR (couleurs, typographie, espacements) et `theme.css` (variables, polices) |
| [`@dsfrkit/config`](./packages/config) | Preset Tailwind CSS pour le DSFR |
| [`@dsfrkit/icons`](./packages/icons) | Icônes React (Remix Icon, standard du DSFR) |
| [`@dsfrkit/cli`](./packages/cli) | CLI : initialisation du projet, copie de composants, pictogrammes |

---

## Composants

| Catégorie | Composants |
|-----------|-----------|
| **Formulaires** | Autocomplete, Button, ButtonGroup, Calendar, Checkbox, Input (Textarea, PasswordInput), InputOTP, Radio (dont radio riche à pictogramme), Range, Select, Toggle, Upload |
| **Feedback** | Alert, Notice, Progress, Toast |
| **Data Display** | Accordion, Avatar, Badge, Callout, Card, DataList, Indicator, Skeleton, Table, Tag, Tile |
| **Overlay** | Command, DropdownMenu, HoverCard, Modal, Popover, Sheet, Tooltip |
| **Navigation** | Breadcrumb, Footer, Header, Navigation (menus et méga-menus, menu latéral), NavLink, Pagination, SkipLinks, Stepper, Summary, Tabs |
| **Typographie** | Code, Heading, Highlight, Kbd, Link, Quote, Text |
| **Layout** | AspectRatio, Box, Container, Flex, Grid, ScrollArea, Section, Separator |
| **Branding** | Artwork, ConsentBanner, Follow, Logo, ThemeToggle, Translate |
| **Fournisseurs et utilitaires** | RouterProvider, ThemeProvider, ThemeScript, useMediaQuery (et variantes), cn |

> Consultez le [Storybook](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/) pour voir chaque composant en action avec ses variantes et ses props.

---

## Documentation pour les assistants IA

[`llms.txt`](https://ra-nouvelle-aquitaine.github.io/dsfrkit/llms.txt) recense tous les exports publics de `@dsfrkit/react`, avec une fiche par composant : import exact, recommandations d'usage, exemples et interface des props. `dsfrkit init` peut y renvoyer les assistants (Copilot, Claude Code, Cursor, Windsurf, Codex).

Ces fiches sont générées depuis le code et les stories : relancez `pnpm generate:llms` après avoir modifié l'API d'un composant.

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
