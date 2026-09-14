# @dsfrkit/react

Composants React accessibles et conformes au Système de Design de l'État français (DSFR), construits sur [Radix UI](https://www.radix-ui.com/) et stylés avec [Tailwind CSS](https://tailwindcss.com/) via le preset `@dsfrkit/config`.

Le paquet publie des composants compilés (ESM et CommonJS) et typés. Pour copier le code source d'un composant dans votre projet et le modifier, voir [`@dsfrkit/cli`](../cli).

## Installation

```bash
pnpm add @dsfrkit/react @dsfrkit/icons @dsfrkit/tokens
pnpm add -D @dsfrkit/config tailwindcss
```

Dépendances attendues : `react` et `react-dom` 18, `tailwindcss` 3.4.

### Tailwind

Le preset apporte les couleurs, la typographie et les espacements du DSFR. Ajoutez les fichiers compilés du paquet au `content` pour que Tailwind génère les classes utilisées par les composants :

```js
// tailwind.config.js
import dsfrPreset from '@dsfrkit/config'

export default {
  presets: [dsfrPreset],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@dsfrkit/react/dist/**/*.{js,mjs}',
  ],
}
```

### CSS global

`theme.css` déclare les variables de couleur DSFR (thèmes clair et sombre) et les polices Marianne et Spectral :

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

### Fournisseurs

```tsx
import { RouterProvider, ThemeProvider, Toaster } from '@dsfrkit/react'
import { Link as RouterLink } from 'react-router-dom'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RouterProvider
      Link={RouterLink}
      linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}
    >
      <ThemeProvider defaultTheme="system">
        {children}
        <Toaster />
      </ThemeProvider>
    </RouterProvider>
  )
}
```

- `ThemeProvider` gère le thème clair, sombre ou système (`useTheme` pour le lire ou le changer). `ThemeScript` évite le flash de thème au chargement en rendu serveur.
- `Toaster` doit être monté **une fois** à la racine (à côté du `ThemeProvider`) pour que les notifications de `toast()` et `useToast()` s'affichent : sans lui, elles sont mises en file mais jamais rendues.
- `RouterProvider` est facultatif. Quand il est présent, les adresses internes (`/…`) passées en `href` aux composants (`Link`, `NavigationItem`, `Breadcrumb`, `Pagination`, `Summary`, `Tile`, `Footer`…) passent par le routeur de l'application. Avec Next.js, `<RouterProvider Link={NextLink}>` suffit.

## Utilisation

Une fois les fournisseurs montés, les composants s'utilisent sans configuration supplémentaire :

```tsx
import { Alert, Button, Input, Link, useToast } from '@dsfrkit/react'

export function Contact() {
  const { toast } = useToast()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        toast({ title: 'Message envoyé', variant: 'success' })
      }}
    >
      <Input label="Adresse électronique" type="email" hint="Format attendu : nom@domaine.fr" />
      <Alert variant="info" title="Information">
        Votre demande sera traitée sous 48 heures.
      </Alert>
      <Button type="submit">Envoyer</Button>
      {/* Lien interne : suivi par le routeur grâce au RouterProvider */}
      <Link href="/mes-demandes">Suivre mes demandes</Link>
    </form>
  )
}
```

Les composants suivent l'API de Radix : les composants composés s'assemblent par sous-composants (`Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`), et les variantes passent par des props (`variant`, `size`). Pour fusionner vos classes avec celles d'un composant, utilisez `cn()`.

## Composants

| Catégorie | Composants |
|-----------|-----------|
| **Formulaires** | Autocomplete, Button, ButtonGroup, Calendar, Checkbox, Input (Textarea, PasswordInput), InputOTP, RadioGroup, Range, Select, Toggle, Upload |
| **Feedback** | Alert, Notice, Progress, Toast (Toaster, useToast) |
| **Data Display** | Accordion, Avatar, Badge, Callout, Card, DataList, Indicator, Skeleton, Table, Tag, Tile |
| **Overlay** | Command, DropdownMenu, HoverCard, Modal, Popover, Sheet, Tooltip |
| **Navigation** | Breadcrumb, Footer, Header, Navigation (NavigationMenu, NavigationMegaMenu), NavLink, Pagination, SkipLinks, Stepper, Summary, Tabs |
| **Typographie** | Code, Heading, Highlight, Kbd, Link, Quote, Text |
| **Layout** | AspectRatio, Box, Container, Flex, Grid, ScrollArea, Section, Separator |
| **Branding** | Artwork, ConsentBanner, Follow, Logo, ThemeToggle, Translate |
| **Fournisseurs et utilitaires** | RouterProvider, ThemeProvider, ThemeScript, useTheme, useMediaQuery, useIsMobile, useIsDesktop, cn |

Chaque composant est présenté avec ses variantes et ses props dans le [Storybook](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/). La fiche technique de chaque export (import, usage, props) est aussi disponible dans [`llms.txt`](https://ra-nouvelle-aquitaine.github.io/dsfrkit/llms.txt).

## Icônes et pictogrammes

- **Icônes** : `@dsfrkit/icons` (Remix Icon, standard du DSFR), à passer en prop `icon` : `<Button icon={<MailIcon />}>Contact</Button>`.
- **Pictogrammes** : `<Artwork name="buildings/city-hall" size={80} />` affiche les pictogrammes officiels du DSFR, à passer par exemple à `RadioGroupItem` (`pictogram`) ou à `Tile` (`icon`).

## Accessibilité

Les composants reposent sur des primitives Radix (clavier, focus, attributs ARIA) et appliquent les règles du DSFR : libellés visibles, messages d'erreur liés par `aria-describedby`, focus visible, `aria-current` sur la page courante. Ils facilitent la conformité RGAA 4.1 sans la garantir : elle dépend aussi du contenu et de l'assemblage de vos pages.

## Licence

ETALAB-2.0
