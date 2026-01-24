# Composant Link

## Import
```tsx
import { Link } from '@dsfrkit/react'
```

## Documentation et Usages
Variants du lien DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/lien

Si true, rend le composant enfant au lieu d'un <a>
Utile pour l'intégration avec les routeurs (Next.js, React Router, TanStack Router)
@example
```tsx
// Avec Next.js Link
<Link asChild>
<NextLink href="/about">À propos</NextLink>
</Link>
// Avec React Router
<Link asChild>
<RouterLink to="/about">À propos</RouterLink>
</Link>
// Avec TanStack Router
<Link asChild>
<TanStackLink to="/about">À propos</TanStackLink>
</Link>
```

Composant Link DSFR polymorphique
S'intègre avec tous les routeurs React grâce au pattern asChild.
@example
```tsx
// Lien simple
<Link href="/contact">Contact</Link>
// Lien externe
<Link href="https://gouvernement.fr" external showExternalIcon>
Site du gouvernement
</Link>
// Avec Next.js
<Link asChild>
<NextLink href="/dashboard">Tableau de bord</NextLink>
</Link>
```
