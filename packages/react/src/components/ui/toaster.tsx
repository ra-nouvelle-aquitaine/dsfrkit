'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast'
import { useToast } from './use-toast'

export interface ToasterProps {
  /** Nombre maximal de toasts affichés simultanément. @default 3 */
  limit?: number
}

/**
 * Composant Toaster : zone d'affichage des toasts de l'application.
 *
 * À monter **une seule fois**, à la racine de l'application (layout). `toast()`
 * et `useToast()` ne font qu'ajouter une notification à une file partagée :
 * sans `Toaster` monté, aucune notification ne s'affiche.
 *
 * @example
 * ```tsx
 * // Racine de l'application
 * <ThemeProvider>
 *   <App />
 *   <Toaster />
 * </ThemeProvider>
 *
 * // Dans n'importe quel composant
 * const { toast } = useToast()
 * toast({ title: 'Brouillon enregistré', variant: 'success' })
 * ```
 */
export function Toaster({ limit = 3 }: ToasterProps = {}) {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.slice(0, limit).map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}
