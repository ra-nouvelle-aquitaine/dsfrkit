'use client'

import * as React from 'react'

/**
 * Type du composant Link fourni par le routeur (React Router, TanStack, Next.js, etc.)
 *
 * Le composant doit accepter au minimum `href` ou `to` et `children`.
 */
export type RouterLinkComponent = React.ComponentType<
  { children?: React.ReactNode } & Record<string, any>
>

export interface RouterProviderProps {
  /**
   * Le composant Link de votre routeur.
   *
   * @example
   * ```tsx
   * // React Router
   * import { Link } from 'react-router-dom'
   * <RouterProvider Link={Link} linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}>
   *
   * // TanStack Router
   * import { Link } from '@tanstack/react-router'
   * <RouterProvider Link={Link} linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}>
   *
   * // Next.js (pas besoin d'adapter, href est natif)
   * import NextLink from 'next/link'
   * <RouterProvider Link={NextLink}>
   * ```
   */
  Link: RouterLinkComponent
  /**
   * Fonction d'adaptation des props.
   * Convertit les props standards (`href`, etc.) vers celles du routeur (`to`, etc.).
   *
   * Par défaut, les props sont passées telles quelles (compatible Next.js qui utilise `href`).
   */
  linkPropsAdapter?: (props: Record<string, any>) => Record<string, any>
  children: React.ReactNode
}

interface RouterContextValue {
  Link: RouterLinkComponent
  linkPropsAdapter: (props: Record<string, any>) => Record<string, any>
}

const RouterContext = React.createContext<RouterContextValue | null>(null)

/**
 * Hook pour récupérer le composant Link du routeur configuré.
 *
 * Retourne `null` si aucun `RouterProvider` n'est présent —
 * dans ce cas les composants DSFRKit utilisent un `<a>` natif.
 */
export function useRouter(): RouterContextValue | null {
  return React.useContext(RouterContext)
}

/**
 * Provider de routage pour DSFRKit.
 *
 * Enregistre globalement le composant `Link` de votre routeur afin que tous les
 * composants DSFRKit (`Link`, `NavLink`, `BreadcrumbLink`, `Pagination`, etc.)
 * l'utilisent automatiquement **sans avoir besoin de `asChild`**.
 *
 * @example
 * ```tsx
 * // React Router
 * import { Link as RouterLink } from 'react-router-dom'
 *
 * function App() {
 *   return (
 *     <RouterProvider
 *       Link={RouterLink}
 *       linkPropsAdapter={({ href, ...rest }) => ({ to: href, ...rest })}
 *     >
 *       <ThemeProvider>
 *         <MyApp />
 *       </ThemeProvider>
 *     </RouterProvider>
 *   )
 * }
 *
 * // Ensuite, tous les <Link href="/about"> utilisent automatiquement React Router
 * ```
 */
export function RouterProvider({ Link, linkPropsAdapter, children }: RouterProviderProps) {
  const value = React.useMemo<RouterContextValue>(
    () => ({
      Link,
      linkPropsAdapter: linkPropsAdapter ?? ((props) => props),
    }),
    [Link, linkPropsAdapter]
  )

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}
