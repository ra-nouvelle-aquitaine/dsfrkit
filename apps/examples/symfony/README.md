# Exemple Symfony + Webpack Encore

Exemple d'intégration de DSFRKit dans un projet Symfony avec Webpack Encore.

## Prérequis

- Symfony 6.x ou 7.x
- Webpack Encore configuré
- Node.js et pnpm

## Installation

1. **Installer les dépendances frontend**
   ```bash
   pnpm add -D @dsfrkit/config tailwindcss postcss postcss-loader autoprefixer
   pnpm add class-variance-authority clsx tailwind-merge
   ```

2. **Configurer Tailwind**

   Créer `tailwind.config.js` à la racine :
   ```js
   import dsfrPreset from '@dsfrkit/config'

   export default {
     presets: [dsfrPreset],
     content: [
       './assets/**/*.{js,jsx,ts,tsx}',
       './templates/**/*.html.twig',
     ],
   }
   ```

3. **Configurer PostCSS**

   Créer `postcss.config.js` :
   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

4. **Mettre à jour webpack.encore.js**
   ```js
   Encore
     // ...
     .enablePostCssLoader()
     .addStyleEntry('app', './assets/styles/app.css')
   ```

5. **Ajouter les directives Tailwind**

   Dans `assets/styles/app.css` :
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     body {
       @apply font-marianne;
     }
   }
   ```

6. **Ajouter des composants**
   ```bash
   pnpm dlx @dsfrkit/cli add button alert
   ```

   Les composants seront copiés dans `assets/components/ui/`

7. **Utiliser dans Twig**

   Créer un composant Twig qui wrap le composant React, ou utiliser directement les classes Tailwind :

   ```twig
   <button class="inline-flex items-center justify-center gap-2 rounded-md font-medium h-11 px-5 text-base bg-blue-france-main text-white hover:bg-blue-france-625">
     Valider
   </button>
   ```

   Ou utiliser UX Components pour intégrer React dans Twig :
   ```bash
   composer require symfony/ux-react
   ```

## Structure recommandée

```
assets/
├── components/
│   └── ui/           # Composants copiés via CLI
│       ├── button.tsx
│       └── alert.tsx
├── controllers/      # Controllers Stimulus/React
├── lib/
│   └── utils.ts      # Utilities (cn function)
└── styles/
    └── app.css       # Styles + directives Tailwind

templates/
└── base.html.twig    # Template de base incluant app.css
```

## Utilisation avec UX React

Pour utiliser les composants React directement dans Twig :

1. **Installer UX React**
   ```bash
   composer require symfony/ux-react
   ```

2. **Créer un controller React**
   ```tsx
   // assets/controllers/MyButton_controller.tsx
   import { Button } from '@/components/ui/button'

   export default function MyButton({ label }: { label: string }) {
     return <Button variant="primary">{label}</Button>
   }
   ```

3. **Utiliser dans Twig**
   ```twig
   {{ react_component('MyButton', { label: 'Valider' }) }}
   ```

## Utilisation avec classes Tailwind directement

Pour les projets sans React, utilisez directement les classes Tailwind générées par le preset :

```twig
{# Bouton primary #}
<button class="inline-flex items-center justify-center gap-2 rounded-md font-medium h-11 px-5 text-base bg-blue-france-main text-white hover:bg-blue-france-625 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-france-main disabled:pointer-events-none disabled:opacity-50">
  Valider
</button>

{# Alerte success #}
<div class="relative w-full rounded-lg border border-success-main bg-success-50 text-success-main p-4" role="alert">
  <h5 class="mb-1 font-bold leading-none tracking-tight">Succès</h5>
  <div class="text-sm">Votre action a été effectuée avec succès.</div>
</div>
```

Pour faciliter la maintenance, créez des composants Twig réutilisables :

```twig
{# templates/components/button.html.twig #}
{% set variants = {
  'primary': 'bg-blue-france-main text-white hover:bg-blue-france-625 focus-visible:ring-blue-france-main',
  'secondary': 'bg-red-marianne-main text-white hover:bg-red-marianne-625 focus-visible:ring-red-marianne-main',
  'tertiary': 'border-2 border-blue-france-main text-blue-france-main hover:bg-blue-france-50 focus-visible:ring-blue-france-main'
} %}

{% set sizes = {
  'sm': 'h-9 px-3 text-sm',
  'md': 'h-11 px-5 text-base',
  'lg': 'h-14 px-8 text-lg'
} %}

<button
  class="inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 {{ variants[variant|default('primary')] }} {{ sizes[size|default('md')] }} {{ class|default('') }}"
  {{ attr|default({})|raw }}
>
  {{ label|raw }}
</button>
```

Utilisation :
```twig
{% include 'components/button.html.twig' with {
  label: 'Valider',
  variant: 'primary',
  size: 'lg'
} %}
```

## Ressources

- [Documentation Symfony UX](https://symfony.com/doc/current/ux.html)
- [Webpack Encore](https://symfony.com/doc/current/frontend.html)
- [DSFR Official](https://www.systeme-de-design.gouv.fr/)
