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
│   ├── docs/            # Landing page, Storybook et llms.txt
│   └── examples/
│       ├── react-vite/  # Exemple d'intégration React + Vite
│       └── symfony/     # Configuration d'exemple Symfony + Webpack Encore
```

## Commandes

```bash
pnpm install            # Installer les dépendances
pnpm build              # Build tous les packages
pnpm dev                # Dev (tous les packages en watch)
pnpm storybook          # Lancer Storybook
pnpm dev:docs           # Lancer la landing page et Storybook
pnpm dev:example        # Lancer l'exemple React + Vite
pnpm lint               # Lint avec Biome
pnpm format             # Format avec Biome
pnpm typecheck          # Vérification des types TypeScript
pnpm test               # Tests unitaires (Vitest)
pnpm generate:llms      # Régénérer llms.txt après un changement d'API
```

## CI/CD

| Workflow | Déclencheur | Description |
|----------|-------------|-------------|
| **CI** | Push / PR | Lint, typecheck, build, tests |
| **Release** | Push sur `main` ou `beta` | Semantic release avec gitmoji |
| **Deploy Pages** | Push sur `main` ou `beta` | Déploiement docs + storybook + exemple sur GitHub Pages |

### Conventions de commit

Les messages de commit commencent par un gitmoji, qui détermine le type de version publiée par semantic-release. La table des émojis et leurs effets sont décrits dans [CONTRIBUTING.md](./CONTRIBUTING.md#conventions-de-commit) ; les règles appliquées font foi dans `.releaserc.yml`.

### Branches

| Branche | Rôle | Publication |
|---------|------|-------------|
| `main` | Production stable | Releases stables (`1.0.0`, `1.1.0`, ...) |
| `beta` | Pré-release | Versions beta (`1.1.0-beta.1`, ...) |
