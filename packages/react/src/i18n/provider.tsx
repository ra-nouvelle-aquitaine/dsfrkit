'use client'

import * as React from 'react'
import { frStrings } from './strings'
import type { DSFRKitStrings } from './types'

const I18nContext = React.createContext<DSFRKitStrings>(frStrings)

export interface DSFRKitI18nProviderProps {
  children: React.ReactNode
  /**
   * Traductions à utiliser
   * @default frStrings (français)
   */
  strings?: DSFRKitStrings
}

/**
 * Provider pour les traductions de DSFRKit
 *
 * @example
 * ```tsx
 * import { DSFRKitI18nProvider, enStrings } from '@dsfrkit/react/i18n'
 *
 * function App() {
 *   return (
 *     <DSFRKitI18nProvider strings={enStrings}>
 *       <MyApp />
 *     </DSFRKitI18nProvider>
 *   )
 * }
 * ```
 */
export function DSFRKitI18nProvider({ children, strings = frStrings }: DSFRKitI18nProviderProps) {
  return <I18nContext.Provider value={strings}>{children}</I18nContext.Provider>
}

/**
 * Hook pour accéder à toutes les traductions
 */
export function useStrings(): DSFRKitStrings {
  return React.useContext(I18nContext)
}

/**
 * Hooks spécifiques par section pour tree-shaking optimal
 */
export function usePaginationStrings() {
  return useStrings().pagination
}

export function useModalStrings() {
  return useStrings().modal
}

export function useTableStrings() {
  return useStrings().table
}

export function useFileUploadStrings() {
  return useStrings().fileUpload
}

export function useSearchStrings() {
  return useStrings().search
}

export function useNavigationStrings() {
  return useStrings().navigation
}

export function useBreadcrumbStrings() {
  return useStrings().breadcrumb
}

export function useCommonStrings() {
  return useStrings().common
}

export function useThemeStrings() {
  return useStrings().theme
}
