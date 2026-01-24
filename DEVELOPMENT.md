# Développement

Guide pour les contributeurs et développeurs du monorepo DSFRKit.

## Prérequis

- Node.js >= 18
- pnpm >= 9

## Structure du monorepo

```
dsfrkit/
├── packages/
│   ├── tokens/          # @dsfrkit/tokens — Design tokens DSFR
│   ├── config/          # @dsfrkit/config — Preset Tailwind CSS
│   ├── react/           # @dsfrkit/react — Composants React
│   ├── icons/           # @dsfrkit/icons — Icônes React
│   └── cli/             # @dsfrkit/cli — CLI
├── apps/
│   ├── docs/            # Landing page + Storybook
│   └── examples/
│       └── react-vite/  # Exemple d'intégration React + Vite
```

## Commandes

```bash
pnpm install            # Installer les dépendances
pnpm build              # Build tous les packages
pnpm dev                # Dev (tous les packages en watch)
pnpm storybook          # Lancer Storybook
pnpm dev:example        # Lancer l'exemple React + Vite
pnpm lint               # Lint avec Biome
pnpm format             # Format avec Biome
pnpm typecheck          # Vérification des types TypeScript
```

## CI/CD

| Workflow | Déclencheur | Description |
|----------|-------------|-------------|
| **CI** | Push / PR | Lint, typecheck, build, tests |
| **Release** | Push sur `main` ou `beta` | Semantic release avec gitmoji |
| **Deploy Pages** | Push sur `main` ou `beta` | Déploiement docs + storybook + exemple sur GitHub Pages |

### Conventions de commit (gitmoji)

Ce projet utilise les [gitmoji](https://gitmoji.dev/) pour le versioning sémantique automatique :

| Emoji | Signification | Version |
|-------|--------------|---------|
| `💥` | Breaking change | **major** |
| `✨` | Nouvelle fonctionnalité | **minor** |
| `🎨` | Amélioration structure/format | **minor** |
| `♿` | Accessibilité | **minor** |
| `🐛` | Correction de bug | patch |
| `🩹` | Correctif simple | patch |
| `🔒` | Sécurité | patch |
| `⚡` | Performance | patch |
| `💄` | UI / style | patch |
| `♻️` | Refactoring | patch |
| `🔧` | Configuration | patch |
| `📝` | Documentation | patch |
| `🏗️` | Architecture | patch |
| `✅` | Tests | patch |
| `🔥` | Suppression code/fichiers | patch |
| `🚚` | Déplacement/renommage | patch |
| `📦` | Dépendances | patch |
| `🌐` | Internationalisation | patch |
| `🍱` | Assets | patch |
| `🚀` | Déploiement | patch |
| `🔖` | Release/tag de version | patch |

```bash
# Exemples
git commit -m "✨ ajouter composant Calendar"
git commit -m "🐛 corriger le focus trap dans Modal"
git commit -m "💥 refondre l'API de Select (breaking)"
git commit -m "♿ améliorer la navigation clavier du Stepper"
git commit -m "🔧 mettre à jour la config Tailwind"
```

### Branches

| Branche | Rôle | Publication |
|---------|------|-------------|
| `main` | Production stable | Releases stables (`1.0.0`, `1.1.0`, ...) |
| `beta` | Pré-release | Versions beta (`1.1.0-beta.1`, ...) |
