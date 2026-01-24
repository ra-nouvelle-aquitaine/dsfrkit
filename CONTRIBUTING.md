# Contribuer à DSFRKit

Merci de votre intérêt pour DSFRKit ! Ce guide explique comment contribuer au projet.

## Prérequis

- Node.js >= 18
- pnpm >= 9
- Git

## Mise en route

```bash
# 1. Forker et cloner le repo
git clone https://github.com/<votre-username>/dsfrkit.git
cd dsfrkit

# 2. Installer les dépendances
pnpm install

# 3. Lancer le build initial
pnpm build

# 4. Lancer Storybook pour le développement
pnpm storybook
```

Pour les commandes détaillées et la structure du projet, consultez [DEVELOPMENT.md](./DEVELOPMENT.md).

## Workflow de contribution

1. **Forker** le repo sur GitHub.

2. **Cloner** votre fork et créer une branche depuis `main` :
   ```bash
   git clone https://github.com/<votre-username>/dsfrkit.git
   cd dsfrkit
   git checkout -b feat/mon-composant main
   ```

3. **Développer** votre fonctionnalité ou correction.

4. **Vérifier** que tout passe :
   ```bash
   pnpm lint        # Lint (Biome)
   pnpm typecheck   # Vérification TypeScript
   pnpm build       # Build complet
   ```

5. **Commiter** avec un gitmoji :
   ```bash
   git commit -m "✨ ajouter composant Slider"
   ```

6. **Pousser** votre branche sur votre fork et ouvrir une **Pull Request** vers `main`.

## Conventions de commit

Ce projet utilise [semantic-release-gitmoji](https://github.com/momocow/semantic-release-gitmoji) pour le versioning sémantique automatique. Les règles de release sont définies dans `.releaserc.yml`.

### Major (breaking change)

| Emoji | Signification |
|-------|--------------|
| `💥` | Breaking change |

### Minor (nouvelle fonctionnalité)

| Emoji | Signification |
|-------|--------------|
| `✨` | Nouvelle fonctionnalité |
| `🎨` | Amélioration de la structure / format |
| `♿` | Accessibilité |

### Patch (correctif)

| Emoji | Signification |
|-------|--------------|
| `🐛` | Correction de bug |
| `🩹` | Correction simple |
| `🔒` | Correction de sécurité |
| `⚡` | Performance |
| `💄` | UI / style |
| `♻️` | Refactoring |
| `🔧` | Configuration |
| `📝` | Documentation |
| `🏗️` | Architecture |
| `✅` | Tests |
| `🔥` | Suppression de code / fichiers |
| `🚚` | Déplacement / renommage |
| `📦` | Dépendances |
| `🌐` | Internationalisation |
| `🍱` | Assets |
| `🚀` | Déploiement |
| `🔖` | Release / tag de version |

## Ajouter un composant

1. Créer le fichier dans `packages/react/src/components/ui/mon-composant.tsx`
2. Exporter le composant dans `packages/react/src/index.ts`
3. Ajouter l'entrée dans `packages/react/tsup.config.ts`
4. Créer la story dans `apps/docs/src/stories/MonComposant.stories.tsx`
5. Vérifier que le lint, le typecheck et le build passent

### Conventions pour les composants

- Utiliser `React.forwardRef` pour transférer les refs
- Exporter les types de props (ex: `export type MonComposantProps = ...`)
- Utiliser `cn()` pour la fusion des classes Tailwind
- Les icônes importées doivent se terminer par `Icon` (ex: `CloseIcon`, `InfoIcon`)
- Les commentaires `biome-ignore` doivent être rédigés en français
- Suivre les patterns DSFR pour les couleurs, espacements et typographies

## Signaler un bug

Ouvrez une [issue GitHub](https://github.com/ra-nouvelle-aquitaine/dsfrkit/issues) avec :
- La version de `@dsfrkit/react`
- Les étapes pour reproduire le bug
- Le comportement attendu vs observé

## Licence

En contribuant, vous acceptez que vos contributions soient publiées sous la même licence que le projet.
