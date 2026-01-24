# Composant Breadcrumb

## Import
```tsx
import { Breadcrumb } from '@dsfrkit/react'
```

## Documentation et Usages
Composant Breadcrumb (Fil d'Ariane) DSFR
Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/fil-d-ariane

Si true, rend le composant enfant au lieu d'un <a>
Utile pour l'intégration avec les routeurs (Next.js, React Router, etc.)
@example
```tsx
// Avec Next.js Link
<BreadcrumbLink asChild>
<Link href="/services">Services</Link>
</BreadcrumbLink>
```

Exemple d'utilisation :
```tsx
<Breadcrumb>
<BreadcrumbList>
<BreadcrumbItem>
<BreadcrumbLink href="/">Accueil</BreadcrumbLink>
</BreadcrumbItem>
<BreadcrumbSeparator />
<BreadcrumbItem>
<BreadcrumbLink href="/services">Services</BreadcrumbLink>
</BreadcrumbItem>
<BreadcrumbSeparator />
<BreadcrumbItem>
<BreadcrumbPage>Page actuelle</BreadcrumbPage>
</BreadcrumbItem>
</BreadcrumbList>
</Breadcrumb>
```
