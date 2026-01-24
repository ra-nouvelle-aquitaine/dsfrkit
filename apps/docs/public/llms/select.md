# Composant Select

## Import
```tsx
import { Select } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Select DSFR
Utilise Radix UI Select pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/liste-deroulante

@example
```tsx
<Select>
<SelectTrigger>
<SelectValue placeholder="Sélectionnez une option" />
</SelectTrigger>
<SelectContent>
<SelectGroup>
<SelectLabel>Fruits</SelectLabel>
<SelectItem value="apple">Pomme</SelectItem>
<SelectItem value="banana">Banane</SelectItem>
<SelectItem value="orange">Orange</SelectItem>
</SelectGroup>
<SelectSeparator />
<SelectGroup>
<SelectLabel>Légumes</SelectLabel>
<SelectItem value="carrot">Carotte</SelectItem>
<SelectItem value="potato">Pomme de terre</SelectItem>
</SelectGroup>
</SelectContent>
</Select>
```
