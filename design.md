# Système de Design – DSFR Kit

Ce document définit les règles, principes et recommandations de design pour le projet **DSFR Kit**, basées sur les spécifications officielles du [Système de Design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr/).

Il s'adresse aux équipes de design (UX/UI), produit et développement afin de garantir la cohérence visuelle, l'accessibilité (RGAA 4) et la maintenabilité à long terme des interfaces.

---

## 1. Introduction

### Objectif du design system
Le design system a pour but de fournir un socle technique et visuel unifié pour les applications gouvernementales et parapubliques, en garantissant l'accessibilité native, des performances optimales et un parcours utilisateur cohérent avec les standards de l'État.

### Portée
Cette documentation couvre l'implémentation locale (React / Tailwind / CSS) du DSFR Kit, l'usage des design tokens, l'architecture des composants et les règles d'accessibilité.

### Références DSFR utilisées
* [Fondamentaux du DSFR](https://www.systeme-de-design.gouv.fr/fondamentaux/)
* [DSFR Design MD (betagouv)](https://github.com/betagouv/dsfr-design-md)
* Norme d'accessibilité : **RGAA version 4.1.2**

---

## 2. Principes de design

L'intégration du DSFR repose sur six piliers fondamentaux :

1. **Accessibilité RGAA "By Design"** : Chaque composant doit être pensé, conçu et testé pour valider le niveau AA du RGAA.
2. **Lisibilité et Typographie** : Utilisation stricte des polices officielles (Marianne / Spectral) avec un rythme typographique respectant l'échelle modulaire.
3. **Hiérarchie visuelle** : Guider l'utilisateur par les contrastes, la taille des typographies et les espacements (loi de proximité).
4. **Responsive et Mobile-First** : Expérience fluide adaptée aux écrans tactiles, gestion fine des densités d'informations sur mobile.
5. **Sémantique UI** : Utilisation stricte des balises HTML5 (nav, section, main, article) et gestion rigoureuse des attributs ARIA.
6. **Cohérence des composants** : Pas de surcharge créative hors charte ("Pas d'effets waouh inutiles, la clarté prime").

---

## 3. Couleurs

L'utilisation des couleurs est strictement conditionnée par la notion de **tokens de décision**. On ne référence jamais une couleur absolue (ex: `#000091`) mais son équivalent fonctionnel (`background-action-high-blue-france`).

### Palette principale
* **Couleur Marque** : Bleu France (`#000091`), Rouge Marianne (`#E1000F`).
* **Palette Neutre** : Nuances de gris (Grey 50 à Grey 975) pour le texte, les bordures et les fonds de surface.

### Couleurs d'état
* **Succès (Success)** : `green-emeraude` ou tokens `success` (ex: `#18753C`).
* **Erreur (Destructive/Error)** : `red-marianne` ou tokens `error` (ex: `#CE0500`).
* **Information (Info)** : `blue-cumulus` ou tokens `info`.
* **Avertissement (Warning)** : `yellow-moutarde` ou tokens `warning`.

> [!WARNING]
> **Vérification des contrastes (WCAG)**
> Toute modification de couleur de fond ou de texte doit passer un test de contraste (ratio de 4.5:1 pour le texte normal, 3:1 pour le texte en gras ou les éléments UI interactifs).

---

## 4. Typographie

### Polices DSFR
* **Marianne** : Police principale pour l'interface, les titres et les textes courants.
* **Spectral** : Police secondaire (serif), utilisée principalement pour les citations (`<blockquote>`) ou les textes très longs nécessitant un ton éditorial distinct.

### Hiérarchie et Taille des textes
L'échelle typographique du DSFR est fixe. Les classes utilitaires (ex: `fr-text`, `fr-text--lg`, `text-lg`) ou les variables Tailwind doivent correspondre exactement aux rem/px du DSFR :
* **Texte courant (body)** : 1rem (16px) ou 1.125rem (18px) sur desktop.
* **H1 à H6** : Espacements natifs inclus (margin-bottom), gestion stricte de la balise par rapport à sa classe visuelle.

> [!TIP]
> **Lisibilité Mobile**
> En mobile, la taille minimale des textes cliquables (liens, boutons) doit garantir une cible tactile suffisante sans que le texte lui-même soit inférieur à 14px (`0.875rem`).

---

## 5. Espacements

### Grille 8pt et Rhythm Vertical
Le DSFR repose sur une grille d'espacement de **base 8px** (`0.5rem`).
Les valeurs autorisées suivent l'échelle (ex: 1w = 8px, 2w = 16px, 3w = 24px, 4w = 32px, 6w = 48px).

### Marges et Padding
L'utilisation de Tailwind (`p-4`, `m-2`) est mappée sur ces valeurs (`1rem`, `0.5rem`).
* Évitez les espacements arbitraires (ex: `p-[10px]`).
* Le padding interne des composants interactifs (boutons, inputs) est immuable pour garantir la surface de clic (minimum 44x44 px en tactile).

---

## 6. Composants

Chaque composant suit des directives strictes.

### Boutons (`Button`)
* **Rôle** : Action principale ou secondaire. Ne **doit pas** être utilisé pour la navigation (utiliser un lien `fr-link`).
* **Conformité DSFR** : Boutons primaires pleins (Bleu France), secondaires (border), tertiaires (ghost).
* **Accessibilité** : Gérer correctement les états `:hover`, `:active` (assombrissement) et `:focus-visible` (outline 2px Bleu France avec offset 2px).

### Formulaires & Inputs (`Input`, `Select`, `Checkbox`, `Radio`)
* **Usage** : Regroupés dans un `fieldset` avec `legend` si plusieurs éléments (ex: Radio).
* **Anti-patterns** : Placeholder utilisé comme seul label. Le `<label>` doit toujours être visible.
* **Accessibilité** : Message d'erreur lié via `aria-describedby` avec `aria-invalid="true"`.

### Navigation (`Header`, `Footer`, `Breadcrumb`, `Tabs`)
* **Breadcrumb** : Obligatoire sur les sites profonds (> 2 niveaux), toujours positionné au-dessus du `H1`. Le dernier élément ne doit pas être un lien ou doit pointer sur la page courante (`aria-current="page"`).
* **Tabs** : Gestion stricte au clavier (flèches droite/gauche pour naviguer entre les onglets `[role="tablist"]`). L'onglet actif se prolonge sur le contenu, sans bordure inférieure.

### Autres Composants Core
* **Cards** : Lien englobant l'intégralité de la carte. Utiliser la structure de clic étendu (pseudo-élément `::after` sur le lien principal). L'image doit avoir un `alt=""` si décorative.
* **Alertes (`Notice`, `Alert`)** : Les alertes globales doivent posséder `role="alert"` ou `aria-live="polite"`.
* **Modales (`Modal`, `Sheet`)** : Focus trap obligatoire. L'arrière-plan doit être inerte (`aria-hidden="true"` ou `<dialog>`). Retour du focus sur l'élément déclencheur à la fermeture.

---

## 7. Tokens Design

Le DSFR Kit implémente les tokens natifs du design system via la configuration globale (`@dsfrkit/tokens`).

* **Couleurs** : `theme('colors.blue-france.sun-113-625')`, `theme('colors.grey.50')`
* **Radius** : Le DSFR n'utilise **pas** de border-radius sur ses composants de base. Les bordures sont droites (`radius: 0`). 
* **Shadows** : Utilisation stricte du système d'élévation DSFR (`elevation-raised`, `elevation-overlap`, `elevation-sticky`, `elevation-lifted`).
* **Typography** : `font-marianne`, `font-spectral`.
* **Breakpoints** :
  * `sm`: 576px
  * `md`: 768px
  * `lg`: 992px
  * `xl`: 1200px

---

## 8. Accessibilité

Les 6 règles d'or du projet pour le maintien de l'accessibilité :

1. **Sémantique** : Les balises HTML doivent être respectées. Un `<button>` n'est pas un `<a>`. Un `<div>` interactif est formellement interdit sauf pattern ARIA complexe justifié.
2. **Navigation clavier** : L'ensemble des parcours doit être accessible sans souris.
3. **Focus states** : Le `:focus-visible` (l'outline bleu de 2px) ne doit **jamais** être masqué sans être remplacé par un indicateur de visibilité équivalente ou supérieure.
4. **Attributs ARIA** : "Le meilleur ARIA est de ne pas utiliser d'ARIA". Préférer les balises natives.
5. **Couleurs / Contrastes** : Aucun ratio de contraste sous 4.5:1 n'est toléré pour du texte.
6. **Pièges fréquents** : Oubli d'un `<label>` sur les formulaires, icônes SVG seules sans `aria-label` ou sans titre masqué pour les lecteurs d'écran.

---

## 9. Responsive

* **Mobile-First** : Les propriétés CSS par défaut s'appliquent au mobile. L'utilisation des media-queries Tailwind (ex: `md:flex`) ajoute le comportement desktop.
* **Densité tactile** : Les cibles de clics sur mobile (liens, boutons, icônes) doivent faire au minimum 44x44 px pour éviter les erreurs de manipulation.
* **Comportements adaptatifs** : Les tableaux complexes doivent avoir un scroll horizontal interne, les menus doivent basculer en mode off-canvas ou accordéon.

---

## 10. Instructions pour l'IA (AI Guidelines)

Ce projet suit des règles de design strictes (DSFR + architecture Shadcn). Si vous êtes un assistant IA chargé de créer ou de modifier des composants, vous **devez** valider cette checklist avant toute génération de code :

### ❌ Anti-patterns absolus (À NE JAMAIS FAIRE)
- **Ne jamais** utiliser de classes `rounded-*` (ex: `rounded-md`, `rounded-full`). Le DSFR exige des angles stricts à 90°.
- **Ne jamais** utiliser d'ombres standards Tailwind (ex: `shadow-md`, `shadow-lg`).
- **Ne jamais** utiliser de couleurs hexadécimales en dur (ex: `bg-[#000091]`).
- **Ne jamais** créer une dépendance au package `@dsfrkit/icons` pour les icônes *systèmes* critiques (succès, erreur, info, warning).

### ✅ Règles d'or (À TOUJOURS FAIRE)
- **Élévations** : Utilisez exclusivement les tokens DSFR pour la profondeur (`elevation-overlap`, `elevation-raised`, `elevation-lifted`).
- **Géométrie** : Laissez les bords carrés (pas de classe `rounded-*`).
- **Autonomie (Shadcn-style)** : Intégrez les SVG *systèmes* géométriques (cercle, carré, triangle, octogone) directement en inline dans le composant (via une fonction `SystemIcon`).
- **CVA & cn** : Structurez toujours les variantes via `class-variance-authority` (cva) et fusionnez les classes avec `cn()`.

### 💡 Template de composant parfait
Voici un exemple d'implémentation idéale d'un composant DSFR respectant cette architecture :

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

// 1. Définition des variantes avec des bords à 90° et des tokens natifs
const exampleVariants = cva(
  'inline-flex items-center justify-center border-0 text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      variant: {
        default: 'bg-muted elevation-raised',
        primary: 'bg-primary text-primary-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

// 2. Inclusion d'une icône système géométrique inline (zéro dépendance externe)
function SystemInfoIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path fill="currentColor" d="M19.5,2.5h-15c-1.1,0-2,0.9-2,2v15c0,1.1,0.9,2,2,2h15c1.1,0,2-0.9,2-2v-15C21.5,3.4,20.6,2.5,19.5,2.5z M13,17h-2v-6h2V17z M13,9h-2V7h2V9z" />
    </svg>
  )
}

export interface ExampleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof exampleVariants> {}

const Example = React.forwardRef<HTMLDivElement, ExampleProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(exampleVariants({ variant, className }))} {...props}>
        <SystemInfoIcon className="w-4 h-4 mr-2" aria-hidden="true" />
        {children}
      </div>
    )
  }
)
Example.displayName = 'Example'

export { Example, exampleVariants }
```
