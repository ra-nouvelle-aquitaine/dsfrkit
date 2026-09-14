# Composant Toast

> Primitives Toast (Radix UI), pour écrire un Toaster personnalisé.

## Import
```tsx
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@dsfrkit/react'
import type { ToastActionElement, ToastProps } from '@dsfrkit/react'
```

## Documentation et exemples
Primitives Toast (Radix UI), pour écrire un `Toaster` personnalisé.

Dans la plupart des cas, montez `<Toaster />` et appelez `toast()` : ces
primitives ne sont utiles que pour changer le rendu. Elles doivent alors être
rendues dans un `ToastProvider` contenant un `ToastViewport`.

## Props et types
```ts
type ToastActionElement = React.ReactElement<typeof ToastAction>

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
```
