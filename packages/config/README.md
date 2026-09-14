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

### CSS global

Le preset génère les classes ; les valeurs des couleurs sémantiques (thèmes clair et sombre) et les polices sont déclarées par `@dsfrkit/tokens/theme.css`, à importer en tête de la feuille de styles :

```css
/* src/index.css */
@import '@dsfrkit/tokens/theme.css';
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Utilisation des classes

```tsx
// Couleurs sémantiques : elles suivent le thème clair ou sombre
<button className="bg-primary text-primary-foreground hover:bg-primary-hover">
  Bouton principal
</button>

<div className="bg-error-background text-error">
  Message d'erreur
</div>

<p className="text-foreground-muted">Mention</p>

// Palette DSFR brute (valeurs fixes)
<span className="text-blue-france-sun">Bleu France</span>

// Typographie Marianne
<h1 className="font-marianne text-h1 md:text-h1-desktop font-bold">
  Titre principal
</h1>

// Container DSFR
<div className="fr-container">
  <div className="fr-grid-row fr-grid-row--gutters">
    <div className="fr-col-12 fr-col-md-8">
      Contenu
    </div>
  </div>
</div>

// Ombres et élévation DSFR
<div className="elevation-raised">Carte</div>

// Utilities de décision
<p className="text-decision-default">Texte par défaut</p>
<div className="bg-decision-disabled">Arrière-plan désactivé</div>
```

## Couleurs disponibles

**Sémantiques** (variables CSS, adaptées au thème) :

- `background` (`DEFAULT`, `alt`, `contrast`, `elevated`, `overlap`, `open-blue-france`…), `foreground` (`DEFAULT`, `title`, `muted`, `disabled`, `inverted`), `border`
- `primary` (`DEFAULT`, `foreground`, `hover`, `active`) — bleu France
- `info`, `success`, `warning`, `error` / `destructive` (`DEFAULT`, `foreground`, `background`, `hover`, `active`, `background-hover`, `background-active`)
- `ring` (focus), `overlay`, `card`, `popover`, `input`

**Palette** (valeurs hexadécimales du DSFR) :

- `blue-france-*`, `red-marianne-*`, `grey-*`
- couleurs illustratives : `green-tilleul-verveine-*`, `green-bourgeon-*`, `green-emeraude-*`, `green-menthe-*`, `green-archipel-*`, `blue-ecume-*`, `blue-cumulus-*`, `purple-glycine-*`, `pink-macaron-*`, `pink-tuile-*`, `yellow-tournesol-*`, `yellow-moutarde-*`, `orange-terre-battue-*`, `brown-cafe-creme-*`, `brown-caramel-*`, `brown-opera-*`, `beige-gris-galet-*`

Préférez les couleurs sémantiques : elles basculent automatiquement en thème sombre (`.dark`, `[data-theme="dark"]` ou `[data-fr-theme="dark"]`).

## Typographie

Les polices officielles sont fournies avec `@dsfrkit/tokens` : l'import de `@dsfrkit/tokens/theme.css` déclare leurs `@font-face` (fichiers `woff2` et `woff` inclus dans le paquet, `font-display: swap`).

- **Police principale** : Marianne (`font-marianne`, aussi `font-sans`)
  - Regular (400), Medium (500), Bold (700)
  - Variantes italiques

- **Police serif** : Spectral (`font-spectral`, aussi `font-serif`)
  - Regular (400)
  - ExtraBold (800)

Tailles de titres DSFR : `text-h1` à `text-h6` (mobile) et `text-h1-desktop` à `text-h6-desktop`.
