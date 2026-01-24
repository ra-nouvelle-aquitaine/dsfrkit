# Composant Header

## Import
```tsx
import { Header } from '@dsfrkit/react'
```

## Documentation et Usages
Conteneur principal du Header DSFR
@example
```tsx
<Header>
<HeaderBody>
<HeaderBrand
logo={<img src="/logo.svg" alt="Logo" />}
serviceTitle="Mon Service"
serviceTagline="Description du service"
/>
<HeaderNav>
<NavLink href="/" variant="header" isActive>Accueil</NavLink>
<NavLink href="/services" variant="header">Services</NavLink>
</HeaderNav>
<HeaderActions>
<Button variant="ghost" size="sm">Connexion</Button>
</HeaderActions>
</HeaderBody>
</Header>
```
