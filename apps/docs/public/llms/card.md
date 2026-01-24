# Composant Card

## Import
```tsx
import { Card } from '@dsfrkit/react'
```

## Documentation et Usages
Variants de la carte DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/carte
Les cartes DSFR n'ont pas de border-radius et utilisent des bordures fines

Composant Card DSFR
@example
```tsx
<Card>
<CardHeader>
<CardTitle>Titre de la carte</CardTitle>
<CardDescription>Description de la carte</CardDescription>
</CardHeader>
<CardContent>
Contenu de la carte
</CardContent>
<CardFooter>
<Button>Action</Button>
</CardFooter>
</Card>
```
