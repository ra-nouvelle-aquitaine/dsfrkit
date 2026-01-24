# Composant Footer

## Import
```tsx
import { Footer } from '@dsfrkit/react'
```

## Documentation et Usages
Conteneur principal du Footer DSFR
@example
```tsx
<Footer>
<FooterBody>
<FooterBrand
logo={<img src="/logo.svg" alt="Logo" />}
description="Description du service"
/>
<FooterContent>
<FooterLinks title="Liens utiles">
<NavLink href="/mentions-legales" variant="footer">Mentions légales</NavLink>
<NavLink href="/accessibilite" variant="footer">Accessibilité</NavLink>
</FooterLinks>
</FooterContent>
</FooterBody>
<FooterBottom>
<p>© 2024 - Tous droits réservés</p>
</FooterBottom>
</Footer>
```
