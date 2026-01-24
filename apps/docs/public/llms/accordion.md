# Composant Accordion

## Import
```tsx
import { Accordion } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Accordion DSFR
Utilise Radix UI Accordion pour l'accessibilité
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/accordeon
Styles DSFR :
- Bordure séparatrice entre chaque item (border-bottom)
- Premier item avec bordure en haut
- Titre : texte --text-action-high-blue-france, fond --background-open-blue-france au survol/ouvert
- Contenu : texte --text-default-grey, fond --background-default-grey, padding 0 2rem 2rem
- Chevron bleu france, rotation 180° à l'ouverture

Exemple d'utilisation :
```tsx
<Accordion type="single" collapsible>
<AccordionItem value="item-1">
<AccordionTrigger>Section 1</AccordionTrigger>
<AccordionContent>
Contenu de la section 1
</AccordionContent>
</AccordionItem>
<AccordionItem value="item-2">
<AccordionTrigger>Section 2</AccordionTrigger>
<AccordionContent>
Contenu de la section 2
</AccordionContent>
</AccordionItem>
</Accordion>
```
