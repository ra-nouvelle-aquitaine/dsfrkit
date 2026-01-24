# Composant Tooltip

## Import
```tsx
import { Tooltip } from '@dsfrkit/react'
```

## Documentation et Usages
Contenu du Tooltip DSFR — fr-tooltip
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/infobulle
Fond: background-elevated avec ombre (shadow-lg), texte standard

@example
```tsx
<TooltipProvider>
<Tooltip>
<TooltipTrigger asChild>
<Button variant="ghost">?</Button>
</TooltipTrigger>
<TooltipContent>
<p>Information utile</p>
<TooltipArrow />
</TooltipContent>
</Tooltip>
</TooltipProvider>
```
