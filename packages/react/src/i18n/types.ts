/**
 * Types pour l'internationalisation de DSFRKit
 * Approche opt-in avec defaults français
 */

export interface PaginationStrings {
  previous: string
  next: string
  page: string
  of: string
  goToPage: string
  first: string
  last: string
}

export interface ModalStrings {
  close: string
}

export interface TableStrings {
  noData: string
  loading: string
  sortAsc: string
  sortDesc: string
  rowsPerPage: string
}

export interface FileUploadStrings {
  dropzone: string
  browse: string
  maxSize: string
  invalidType: string
  uploading: string
  remove: string
}

export interface SearchStrings {
  placeholder: string
  clear: string
  submit: string
  noResults: string
}

export interface NavigationStrings {
  menu: string
  close: string
  openMenu: string
  closeMenu: string
  skipToContent: string
  skipToNavigation: string
}

export interface BreadcrumbStrings {
  label: string
  more: string
}

export interface CommonStrings {
  loading: string
  error: string
  required: string
  optional: string
  show: string
  hide: string
  expand: string
  collapse: string
}

export interface ThemeStrings {
  light: string
  dark: string
  system: string
  toggleTheme: string
}

/**
 * Interface complète des chaînes de caractères de DSFRKit
 */
export interface DSFRKitStrings {
  pagination: PaginationStrings
  modal: ModalStrings
  table: TableStrings
  fileUpload: FileUploadStrings
  search: SearchStrings
  navigation: NavigationStrings
  breadcrumb: BreadcrumbStrings
  common: CommonStrings
  theme: ThemeStrings
}

export type SupportedLocale = 'fr' | 'en'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}
