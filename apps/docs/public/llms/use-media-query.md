# Utilitaire useMediaQuery

> Hook pour détecter les media queries

## Import
```tsx
import { useIsDesktop, useIsMobile, useIsTablet, useMediaQuery, usePrefersHighContrast, usePrefersReducedMotion } from '@dsfrkit/react'
```

## Documentation et exemples
Hook pour détecter les media queries

@example
```tsx
function Component() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>
}
```

Hook pour détecter si on est sur mobile

Hook pour détecter si on est sur tablette

Hook pour détecter si on est sur desktop

Hook pour détecter la préférence de réduction de mouvement

Hook pour détecter la préférence de contraste élevé
