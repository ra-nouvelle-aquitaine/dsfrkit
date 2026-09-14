# Composant ConsentBanner

> Gestionnaire de consentement aux cookies conforme au RGPD et aux recommandations de la CNIL.

## Import
```tsx
import { ConsentBanner, ConsentBannerActions, ConsentBannerContent, ConsentBannerTitle } from '@dsfrkit/react'
```

## Usage recommandé
Gestionnaire de consentement aux cookies conforme au RGPD et aux recommandations de la CNIL.

Comprend 3 composants complémentaires :

- **Bandeau de consentement** — affiché en bas de page au premier accès
- **Modale de personnalisation** — permet le choix par finalité/service
- **Placeholder** — remplace le contenu bloqué (vidéo, carte, etc.)

```tsx
<ConsentBanner>
  <ConsentBannerTitle>À propos des cookies</ConsentBannerTitle>
  <ConsentBannerContent>Nous utilisons des cookies...</ConsentBannerContent>
  <ConsentBannerActions>
    <Button>Tout accepter</Button>
    <Button variant="secondary">Tout refuser</Button>
    <Button variant="secondary">Personnaliser</Button>
  </ConsentBannerActions>
</ConsentBanner>
```

## Storybook
Rubrique : `Branding/ConsentBanner`
