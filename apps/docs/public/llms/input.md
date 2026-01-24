# Composant Input

## Import
```tsx
import { Input } from '@dsfrkit/react'
```

## Documentation et Usages
Variants de l'input DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/champ-de-saisie
L'input DSFR a un border-radius en haut seulement et une bordure inférieure épaisse

Composant Input DSFR
@example
```tsx
// Avec icône
<Input
label="Rechercher un utilisateur"
icon={<SearchIcon />}
position="start"
/>
// Avec bouton d'action
<Input
label="Nom de domaine"
addon={<Button variant="ghost">Vérifier</Button>}
position="end"
/>
```

Composant Textarea DSFR
Même style que l'input avec border-radius en haut et bordure inférieure

Composant PasswordInput DSFR
Champ mot de passe avec bouton "Afficher/Masquer" intégré

@example
```tsx
<Input label="Nom" placeholder="Saisissez votre nom" />
<Textarea label="Message" rows={4} />
<PasswordInput label="Mot de passe" />
```
