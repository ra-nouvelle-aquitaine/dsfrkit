# Exemple React + Vite

Exemple d'intégration de DSFRKit dans un projet React + Vite.

## Installation

```bash
pnpm install
```

## Développement

```bash
pnpm dev
```

## Étapes d'intégration

1. **Installer les dépendances**
   ```bash
   pnpm add -D @dsfrkit/config tailwindcss postcss autoprefixer
   pnpm add class-variance-authority clsx tailwind-merge
   ```

2. **Configurer Tailwind**

   Créer `tailwind.config.js` :
   ```js
   import dsfrPreset from '@dsfrkit/config'

   export default {
     presets: [dsfrPreset],
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   }
   ```

3. **Ajouter les directives Tailwind**

   Dans `src/index.css` :
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Ajouter des composants**
   ```bash
   pnpm dlx @dsfrkit/cli add button alert
   ```

5. **Utiliser les composants**
   ```tsx
   import { Button } from '@/components/ui/button'

   function App() {
     return <Button variant="primary">Valider</Button>
   }
   ```
