# @dsfrkit/cli

CLI pour configurer un projet React avec DSFRKit et copier des composants DSFR dans votre code, à la manière de shadcn/ui.

## Utilisation

```bash
# Sans installation
pnpm dlx @dsfrkit/cli init
npx @dsfrkit/cli init

# Installation globale
pnpm add -g @dsfrkit/cli
dsfrkit init
```

## Commandes

### `init`

Configure le projet courant pour DSFRKit.

```bash
dsfrkit init
```

Sans `package.json` dans le dossier, la commande propose d'abord de créer un projet React + TypeScript avec Vite (npm, pnpm, yarn ou bun).

Elle pose ensuite quatre questions — dossier des composants (`src/components/ui` par défaut), installation des dépendances, téléchargement des pictogrammes, fichiers d'instructions pour les assistants IA — puis :

- crée le dossier des composants ;
- crée `src/lib/utils.ts` avec la fonction `cn()` ;
- crée `tailwind.config.js` avec le preset `@dsfrkit/config` (un fichier existant n'est pas écrasé : la commande indique le preset et le `content` à ajouter) ;
- crée `src/index.css` avec l'import de `@dsfrkit/tokens/theme.css` et les directives Tailwind, ou signale l'import manquant si le fichier existe déjà ;
- si demandé, installe `@dsfrkit/config`, `tailwindcss`, `class-variance-authority`, `clsx`, `tailwind-merge` (développement) et `@dsfrkit/tokens` ;
- si demandé, télécharge les pictogrammes officiels (voir `fetch-artworks`) ;
- si demandé, écrit les instructions IA qui renvoient vers [`llms.txt`](https://ra-nouvelle-aquitaine.github.io/dsfrkit/llms.txt) : `.github/copilot-instructions.md` (GitHub Copilot), `clauderc.md` (Claude Code), `.cursorrules` (Cursor), `.windsurfrules` (Windsurf), `AGENTS.md` (OpenAI Codex et autres).

### `add`

Copie le code source de composants dans le projet.

```bash
# Composants nommés
dsfrkit add button alert

# Sélection interactive
dsfrkit add
```

Les fichiers sont écrits dans le premier dossier existant parmi `src/components/ui`, `components/ui` et `app/components/ui`, ou dans `src/components/ui` créé pour l'occasion.

| Nom | Composant | Fichiers |
|-----|-----------|----------|
| `button` | Button | `button.tsx` |
| `alert` | Alert | `alert.tsx` |
| `card` | Card | `card.tsx` |
| `input` | Input | `input.tsx` |
| `modal` | Modal | `modal.tsx` |
| `select` | Select | `select.tsx` |
| `themetoggle` | ThemeToggle | `theme-toggle.tsx`, `theme-artwork.tsx` (télécharge aussi les pictogrammes) |

Les autres composants de la bibliothèque (Navigation, Footer, Notice, Summary, Stepper…) s'utilisent depuis le paquet [`@dsfrkit/react`](../react), qui peut cohabiter avec les composants copiés.

Les composants copiés importent `cn` depuis `@/lib/utils` : l'alias `@` doit pointer vers `src` dans la configuration TypeScript et du bundler.

### `fetch-artworks`

Télécharge les pictogrammes SVG officiels depuis le [dépôt du DSFR](https://github.com/GouvernementFR/dsfr) (clone partiel, `git` requis) et les copie dans `public/dist/artwork`.

```bash
dsfrkit fetch-artworks
```

## Workflow recommandé

1. **Initialiser le projet**
   ```bash
   pnpm dlx @dsfrkit/cli init
   ```

2. **Ajouter des composants**
   ```bash
   pnpm dlx @dsfrkit/cli add button alert card
   ```

3. **Utiliser les composants**
   ```tsx
   import { Alert } from '@/components/ui/alert'
   import { Button } from '@/components/ui/button'

   export function App() {
     return (
       <>
         <Alert variant="success" title="Succès">
           Votre demande a été enregistrée.
         </Alert>
         <Button variant="primary">Valider</Button>
       </>
     )
   }
   ```

4. **Personnaliser** : les composants copiés vous appartiennent, modifiez-les librement.

## Licence

ETALAB-2.0
