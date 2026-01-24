# Composant Translate

## Import
```tsx
import { Translate } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Translate (Sélection de langue) DSFR — fr-translate
Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/selecteur-de-langue
@example
```tsx
<Translate
currentLanguage="FR"
languages={[
{ code: 'fr', label: 'Français', nativeLabel: 'FR' },
{ code: 'en', label: 'English', nativeLabel: 'EN' },
{ code: 'de', label: 'Deutsch', nativeLabel: 'DE' },
]}
onLanguageChange={(code) => console.log(code)}
/>
```
