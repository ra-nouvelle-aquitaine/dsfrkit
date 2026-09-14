# Exemple Symfony + Webpack Encore

Intégration de DSFRKit dans un projet Symfony avec Webpack Encore : le preset Tailwind et le thème DSFR pour les gabarits Twig, et les composants React de `@dsfrkit/react` via [Symfony UX React](https://symfony.com/bundles/ux-react/current/index.html).

Ce dossier contient les fichiers de configuration à copier dans votre projet (suffixe `.example`) :

| Fichier | Destination |
|---------|-------------|
| `webpack.encore.example.js` | `webpack.config.js` |
| `postcss.config.example.js` | `postcss.config.js` |
| `tailwind.config.example.js` | `tailwind.config.js` |
| `assets/styles/app.example.css` | `assets/styles/app.css` |

## Prérequis

- Symfony 6.4 ou 7.x avec Webpack Encore
- Node.js et pnpm

## Installation

1. **Installer les dépendances frontend**
   ```bash
   pnpm add -D @dsfrkit/config tailwindcss postcss postcss-loader autoprefixer
   pnpm add @dsfrkit/tokens
   ```

   Pour utiliser les composants React :
   ```bash
   composer require symfony/ux-react
   pnpm add @dsfrkit/react @dsfrkit/icons react react-dom
   ```

2. **Configurer Tailwind** — `tailwind.config.js` :
   ```js
   const dsfrPreset = require('@dsfrkit/config').default

   module.exports = {
     presets: [dsfrPreset],
     content: [
       './assets/**/*.{js,jsx,ts,tsx}',
       './templates/**/*.html.twig',
       './node_modules/@dsfrkit/react/dist/**/*.{js,mjs}',
     ],
   }
   ```

3. **Configurer PostCSS** — `postcss.config.js` :
   ```js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

4. **Configurer Webpack Encore** — `webpack.config.js` :
   ```js
   Encore
     // ...
     .addEntry('app', './assets/app.js') // app.js importe styles/app.css
     .enablePostCssLoader()
     .enableTypeScriptLoader()
     .enableReactPreset()
   ```

5. **Importer le thème** — `assets/styles/app.css` :
   ```css
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

   `theme.css` déclare les variables de couleur DSFR et les polices : sans cet import, les classes sémantiques (`bg-background`, `text-primary`…) n'ont pas de valeur.

## Composants React dans Twig (Symfony UX React)

1. **Enregistrer les composants** — `assets/app.js` :
   ```js
   import { registerReactControllerComponents } from '@symfony/ux-react'
   import './styles/app.css'

   registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/))
   ```

2. **Créer un composant** — `assets/react/controllers/DemandeForm.tsx` :
   ```tsx
   import { Alert, Button, Input } from '@dsfrkit/react'

   export default function DemandeForm({ action }: { action: string }) {
     return (
       <form method="post" action={action}>
         <Input label="Adresse électronique" name="email" type="email" required />
         <Alert variant="info" title="Information">
           Votre demande sera traitée sous 48 heures.
         </Alert>
         <Button type="submit">Envoyer</Button>
       </form>
     )
   }
   ```

3. **L'afficher dans un gabarit**
   ```twig
   <div {{ react_component('DemandeForm', { action: path('demande_submit') }) }}></div>
   ```

## Gabarits Twig sans React

Les classes du preset suffisent pour des éléments simples. Reprenez celles des composants DSFRKit pour rester fidèle au DSFR (angles droits, tailles 32 / 40 / 48 px, bouton secondaire bordé de bleu) :

```twig
{# templates/components/button.html.twig #}
{% set variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
  secondary: 'bg-transparent text-primary shadow-[inset_0_0_0_1px_currentColor] hover:bg-background-open-blue-france',
  tertiary: 'bg-transparent text-primary ring-1 ring-inset ring-border hover:bg-background-contrast',
} %}

{% set sizes = {
  sm: 'min-h-8 px-3 py-1 text-sm leading-6',
  md: 'min-h-10 px-4 py-2 text-base leading-6',
  lg: 'min-h-12 px-6 py-2 text-lg leading-7',
} %}

<button
  type="{{ type|default('button') }}"
  class="inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-background-contrast disabled:text-foreground-disabled disabled:shadow-none {{ variants[variant|default('primary')] }} {{ sizes[size|default('md')] }} {{ class|default('') }}"
>
  {{ label }}
</button>
```

```twig
{% include 'components/button.html.twig' with { label: 'Valider', type: 'submit', size: 'lg' } %}
```

Pour les composants interactifs (modales, onglets, menus, formulaires avec messages d'erreur…), préférez les composants React : ils portent la gestion du clavier, du focus et des attributs ARIA.

> La commande `dsfrkit add` du CLI copie les composants dans `src/components/ui`, `components/ui` ou `app/components/ui` : elle ne détecte pas `assets/`. Dans un projet Symfony, le paquet `@dsfrkit/react` est plus simple à maintenir.

## Ressources

- [Symfony UX React](https://symfony.com/bundles/ux-react/current/index.html)
- [Webpack Encore](https://symfony.com/doc/current/frontend.html)
- [DSFRKit — Storybook](https://ra-nouvelle-aquitaine.github.io/dsfrkit/storybook/)
- [DSFR officiel](https://www.systeme-de-design.gouv.fr/)
