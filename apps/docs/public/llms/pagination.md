# Composant Pagination

## Import
```tsx
import { Pagination } from '@dsfrkit/react'
```

## Documentation et Usages
Si true, rend le composant enfant au lieu d'un <a>

Composant Pagination DSFR
Navigation entre les pages d'un contenu paginé.
@example
```tsx
<Pagination>
<PaginationContent>
<PaginationItem>
<PaginationPrevious href="#" />
</PaginationItem>
<PaginationItem>
<PaginationLink href="#">1</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationLink href="#" isActive>2</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationLink href="#">3</PaginationLink>
</PaginationItem>
<PaginationItem>
<PaginationEllipsis />
</PaginationItem>
<PaginationItem>
<PaginationNext href="#" />
</PaginationItem>
</PaginationContent>
</Pagination>
```
