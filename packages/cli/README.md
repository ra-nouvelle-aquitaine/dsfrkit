# @dsfrkit/cli

CLI pour installer et copier les composants DSFR dans votre projet.

## Installation

```bash
# Via pnpm (recommandé)
pnpm dlx @dsfrkit/cli init

# Via npx
npx @dsfrkit/cli init

# Installation globale
pnpm add -g @dsfrkit/cli
```

## Commandes

### `init`

Initialise le projet avec la configuration DSFR.

```bash
dsfrkit init
```

Cette commande :
- ✅ Crée le dossier `src/components/ui`
- ✅ Crée le fichier `src/lib/utils.ts` avec la fonction `cn()`
- ✅ Configure `tailwind.config.js` avec le preset DSFR
- ✅ Installe les dépendances nécessaires

### `add`

Ajoute des composants au projet.

```bash
# Ajouter des composants spécifiques
dsfrkit add button alert

# Mode interactif
dsfrkit add
```

Cette commande copie les composants dans `src/components/ui/` avec toutes leurs dépendances.

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
   import { Button } from '@/components/ui/button'
   import { Alert } from '@/components/ui/alert'

   function App() {
     return (
       <div>
         <Button variant="primary">Valider</Button>
         <Alert variant="success">Succès !</Alert>
       </div>
     )
   }
   ```

4. **Personnaliser selon vos besoins**

   Les composants sont copiés dans votre projet, vous pouvez les modifier librement !

## Composants disponibles

- ✅ `button` - Bouton DSFR avec variants
- ✅ `alert` - Alerte DSFR
- 🚧 `card` - Carte (à venir)
- 🚧 `input` - Champ de formulaire (à venir)
- 🚧 `modal` - Modale (à venir)
- 🚧 Plus de composants bientôt...

## License

ETALAB-2.0
