# Exemple React + Vite

Application de démonstration de DSFRKit, publiée sur [ra-nouvelle-aquitaine.github.io/dsfrkit/example](https://ra-nouvelle-aquitaine.github.io/dsfrkit/example/). Elle assemble les composants de `@dsfrkit/react` dans deux gabarits, accessibles par un sélecteur en haut de page :

- **Standard** — site vitrine ou portail public : liens d'évitement, en-tête DSFR avec menus déroulants et méga-menu, bandeau d'information, fil d'Ariane, tuiles à pictogrammes, sommaire, formulaire complet (dont radios riches) avec notifications toast, lettre d'information et pied de page ;
- **Dashboard** — application métier : menu latéral, tableau de dossiers, indicateurs de progression, notifications.

## Lancer l'exemple

Depuis la racine du monorepo :

```bash
pnpm install
pnpm dev:example
```

## Intégrer DSFRKit dans votre projet React + Vite

L'exemple utilise le paquet npm, sans copie de composants.

1. **Installer les paquets**
   ```bash
   pnpm add @dsfrkit/react @dsfrkit/icons @dsfrkit/tokens
   pnpm add -D @dsfrkit/config tailwindcss postcss autoprefixer
   ```

2. **Configurer PostCSS** — `postcss.config.js` :
   ```js
   export default {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }
   ```

3. **Configurer Tailwind** — `tailwind.config.js` :
   ```js
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

4. **Importer le thème** — `src/index.css` :
   ```css
   @import '@dsfrkit/tokens/theme.css';

   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     body {
       @apply font-marianne bg-background text-foreground;
     }
   }
   ```

5. **Ajouter le fournisseur de thème** — `src/main.tsx` :
   ```tsx
   import { ThemeProvider } from '@dsfrkit/react'

   ReactDOM.createRoot(root).render(
     <ThemeProvider>
       <App />
     </ThemeProvider>
   )
   ```

6. **Utiliser les composants**
   ```tsx
   import { Button, Notice } from '@dsfrkit/react'

   export function App() {
     return (
       <>
         <Notice title="Service en maintenance dimanche de 2h à 6h." />
         <Button>Valider</Button>
       </>
     )
   }
   ```

Pour une navigation sans rechargement, ajoutez un `RouterProvider` avec le `Link` de votre routeur (voir le [README de `@dsfrkit/react`](../../../packages/react/README.md#fournisseurs)).
