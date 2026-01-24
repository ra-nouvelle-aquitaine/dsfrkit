# @dsfrkit/config

Preset Tailwind CSS pour le Système de Design de l'État français (DSFR).

## Installation

```bash
pnpm add -D @dsfrkit/config tailwindcss
pnpm add @dsfrkit/tokens
```

> Note: `@dsfrkit/config` déclare `@dsfrkit/tokens` en tant que peerDependency — installez `@dsfrkit/tokens` dans votre projet pour pouvoir importer `@dsfrkit/tokens/theme.css`.

## Usage

### Configuration Tailwind

Ajoutez le preset dans votre `tailwind.config.js` :

```js
import dsfrPreset from '@dsfrkit/config'

export default {
  presets: [dsfrPreset],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  // Vos personnalisations ici
}
```

### Utilisation des classes

```tsx
// Couleurs DSFR
<button className="bg-blue-france-main text-white">
  Bouton principal
</button>

<div className="bg-error-main text-white">
  Message d'erreur
</div>

// Typographie Marianne
<h1 className="font-marianne text-4xl font-bold">
  Titre principal
</h1>

// Container DSFR
<div className="fr-container">
  <div className="fr-grid-row">
    <div className="fr-col">
      Contenu
    </div>
  </div>
</div>

// Utilities de décision
<p className="text-decision-default">Texte par défaut</p>
<div className="bg-decision-disabled">Arrière-plan désactivé</div>
```

## Couleurs disponibles

- `blue-france-*` - Bleu France (couleur principale)
- `red-marianne-*` - Rouge Marianne
- `grey-*` - Échelle de gris complète
- `info-*` - Couleurs d'information
- `success-*` - Couleurs de succès
- `warning-*` - Couleurs d'avertissement
- `error-*` - Couleurs d'erreur

## Typographie

### Polices Marianne et Spectral

Importez les polices officielles DSFR dans votre CSS principal :

```css
/* src/index.css */
@import '@dsfrkit/config/fonts.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

```

Les polices sont chargées depuis le CDN officiel DSFR avec `font-display: swap` pour de meilleures performances.

- **Police principale** : Marianne (`font-marianne`)
  - Regular (400)
  - Medium (500)
  - Bold (700)
  - Italic variants

- **Police serif** : Spectral (`font-spectral`)
  - Regular (400)
  - ExtraBold (800)
