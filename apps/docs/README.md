# Documentation DSFRKit

Site de documentation de DSFRKit, publié sur [ra-nouvelle-aquitaine.github.io/dsfrkit](https://ra-nouvelle-aquitaine.github.io/dsfrkit/). Il réunit :

- une **page d'accueil** (Vite + React) : présentation, guides d'installation et de routage, aperçu des composants ;
- le **Storybook** (`src/stories`) : une page par composant avec ses variantes, ses props, la commande d'installation et des exemples d'usage ;
- les fichiers **`llms.txt`** et **`llms/*.md`** (`public/`) : la documentation des exports de `@dsfrkit/react` pour les assistants IA.

## Développement

Depuis la racine du monorepo, les paquets doivent être construits (ou en mode `dev`) pour que le site consomme leur version à jour :

```bash
pnpm install
pnpm dev          # paquets en watch + page d'accueil + Storybook
```

Dans ce dossier :

```bash
pnpm dev              # page d'accueil (http://localhost:5173) et Storybook (http://localhost:6006)
pnpm dev:docs         # page d'accueil seule
pnpm storybook        # Storybook seul
```

## Build

```bash
pnpm build             # page d'accueil
pnpm build-storybook   # Storybook statique (storybook-static/)
pnpm preview           # prévisualisation de la page d'accueil
```

Pour GitHub Pages, `VITE_BASE_URL` fixe le chemin de base (voir `.github/workflows/deploy-pages.yml`).

## Tests

```bash
pnpm test-storybook:ci   # rend chaque story dans Chromium (Vitest + Playwright) et exécute ses tests
```

## Documentation pour les IA

`public/llms.txt` et `public/llms/*.md` sont générés par `scripts/generate-llms.cjs` à partir de `packages/react/src/index.ts`, des commentaires JSDoc et des descriptions des stories. Ils ne sont pas régénérés par la CI : après une modification de l'API d'un composant, lancez depuis la racine

```bash
pnpm generate:llms
```

et commitez les fichiers produits.

## Écrire une story

- Titre `Catégorie/Composant` (`Inputs`, `Feedback`, `Data Display`, `Utils`, `Navigation`, `Typography`, `Layout`, `Branding`) ; la catégorie fixe l'ordre dans la barre latérale.
- `parameters.docs.description.component` : description d'usage (« Quand l'utiliser ? »). Elle est reprise dans `llms.txt`.
- `layout: 'fullscreen'` pour les composants pleine largeur (en-tête, pied de page, bandeaux, navigation), `padded` ou `centered` sinon.
- Des exemples réalistes, en français, qui utilisent les composants DSFRKit plutôt que du HTML ou des classes recréant le DSFR.
