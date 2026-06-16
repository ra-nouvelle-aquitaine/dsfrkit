/**
 * @dsfrkit/react
 * Composants React pour le Système de Design de l'État français (DSFR)
 */

export type {
  FooterBrandProps,
  FooterLinksProps,
  FooterProps,
  HeaderBrandProps,
  HeaderMenuButtonProps,
  HeaderProps,
  NavigationItemProps,
  NavigationProps,
  NavigationSectionProps,
  NavLinkProps,
  SkipLink,
  SkipLinksProps,
} from './components/navigation'
// Navigation
export {
  Footer,
  FooterBody,
  FooterBottom,
  FooterBrand,
  FooterContent,
  FooterLegalLinks,
  FooterLinks,
  Header,
  HeaderActions,
  HeaderBody,
  HeaderBrand,
  HeaderMenuButton,
  HeaderNav,
  Navigation,
  NavigationItem,
  NavigationSection,
  NavLink,
  navLinkVariants,
  SkipLinks,
} from './components/navigation'
export {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './components/ui/accordion'
export type { AlertProps } from './components/ui/alert'
export { Alert, alertVariants } from './components/ui/alert'
// Artwork / Pictogramme
export {
  Artwork,
  type ArtworkData,
  type ArtworkProps,
  allPictograms,
  artworkByName,
  artworkDark,
  artworkLight,
  artworkSystem,
  artworks,
  pictogramsByCategory,
} from './components/ui/artwork'
export { AspectRatio } from './components/ui/aspect-ratio'
export type {
  AutocompleteMultipleProps,
  AutocompleteOption,
  AutocompleteOptionFilterState,
  AutocompleteOptionGroup,
  AutocompleteOptionRenderState,
  AutocompleteProps,
  AutocompleteSingleProps,
} from './components/ui/autocomplete'
export { Autocomplete } from './components/ui/autocomplete'
export type { AvatarBadgeProps, AvatarFallbackProps, AvatarProps } from './components/ui/avatar'
export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  avatarVariants,
} from './components/ui/avatar'
export type { BadgeProps } from './components/ui/badge'
// Nouveaux composants DSFR
export { Badge, badgeVariants } from './components/ui/badge'
// Layout & Typography
export { Box, type BoxProps } from './components/ui/box'
export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './components/ui/breadcrumb'
export type { ButtonProps } from './components/ui/button'
// Composants
export { Button, buttonVariants } from './components/ui/button'
export type {
  ButtonGroupItemProps,
  ButtonGroupMultipleProps,
  ButtonGroupProps,
  ButtonGroupSingleProps,
} from './components/ui/button-group'
// ButtonGroup
export {
  ButtonGroup,
  ButtonGroupItem,
  buttonGroupItemVariants,
  buttonGroupVariants,
} from './components/ui/button-group'
export { Calendar, type CalendarProps } from './components/ui/calendar'
export type { CalloutProps } from './components/ui/callout'
export { Callout, calloutVariants } from './components/ui/callout'
export type { CardProps } from './components/ui/card'
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
} from './components/ui/card'
export type { CheckboxProps } from './components/ui/checkbox'
export { Checkbox, checkboxVariants } from './components/ui/checkbox'
export { Code, type CodeProps } from './components/ui/code'
export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './components/ui/command'
export {
  ConsentBanner,
  ConsentBannerActions,
  ConsentBannerContent,
  ConsentBannerTitle,
} from './components/ui/consent'
export { Container, type ContainerProps } from './components/ui/container'
// Data Display
export { DataList, type DataListItemProps } from './components/ui/data-list'
export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu'
export { Flex, type FlexProps } from './components/ui/flex'
export {
  Follow,
  FollowDescription,
  FollowNewsletter,
  FollowSocial,
  FollowTitle,
} from './components/ui/follow'
export { Grid, type GridProps } from './components/ui/grid'
export { Heading, type HeadingProps } from './components/ui/heading'
export type { HighlightProps } from './components/ui/highlight'
export { Highlight } from './components/ui/highlight'
export { HoverCard, HoverCardContent, HoverCardTrigger } from './components/ui/hover-card'
export type { IndicatorProps } from './components/ui/indicator'
export { Indicator, indicatorVariants } from './components/ui/indicator'
export type { InputProps, TextareaProps } from './components/ui/input'
export {
  Input,
  inputVariants,
  PasswordInput,
  Textarea,
  textareaVariants,
} from './components/ui/input'
export {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from './components/ui/input-otp'
export { Kbd, type KbdProps } from './components/ui/kbd'
export type { LinkProps } from './components/ui/link'
// Link (polymorphique)
export { Link, linkVariants } from './components/ui/link'
export type { LogoProps, ServiceLogoProps } from './components/ui/logo'
// Logo
export { Logo, logoVariants, ServiceLogo } from './components/ui/logo'
export type { ModalContentProps } from './components/ui/modal'
export {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalTitle,
  ModalTrigger,
} from './components/ui/modal'
export type { NoticeProps } from './components/ui/notice'
// Notice (Bandeau d'information)
export { Notice, noticeVariants } from './components/ui/notice'
export type { PaginationLinkProps, PaginationProps } from './components/ui/pagination'

// Pagination
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './components/ui/pagination'
export * from './components/ui/pictograms'
export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from './components/ui/popover'
export { Progress, type ProgressProps } from './components/ui/progress'
export type { QuoteProps } from './components/ui/quote'
// Quote
export { Quote } from './components/ui/quote'
export type { RadioGroupItemProps } from './components/ui/radio'
export { RadioGroup, RadioGroupItem, radioVariants } from './components/ui/radio'
export type { RangeProps } from './components/ui/range'
// Range (Slider)
export { Range } from './components/ui/range'
export { ScrollArea, ScrollBar } from './components/ui/scroll-area'
export { Section, type SectionProps } from './components/ui/section'
export type { SelectTriggerProps } from './components/ui/select'
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './components/ui/select'
export { Separator } from './components/ui/separator'
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from './components/ui/sheet'
export { Skeleton } from './components/ui/skeleton'
export type { StepperProps, StepperStep } from './components/ui/stepper'
// Stepper
export { Stepper } from './components/ui/stepper'
// Table
export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
export type { TagProps } from './components/ui/tag'
export { Tag } from './components/ui/tag'
export { Text, type TextProps } from './components/ui/text'
// Branding
export { ThemeToggle, type ThemeToggleProps } from './components/ui/theme-toggle'
export type { TileProps } from './components/ui/tile'
// Tile
export { Tile, TileGrid } from './components/ui/tile'
export {
  Toast,
  ToastAction,
  type ToastActionElement,
  ToastClose,
  ToastDescription,
  type ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './components/ui/toast'
export { Toaster } from './components/ui/toaster'
export type { ToggleProps } from './components/ui/toggle'
export { Toggle, toggleVariants } from './components/ui/toggle'
export type { TooltipContentProps } from './components/ui/tooltip'
// Tooltip
export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from './components/ui/tooltip'
export type { TranslateLanguage, TranslateProps } from './components/ui/translate'
export { Translate } from './components/ui/translate'
export type { UploadProps } from './components/ui/upload'
export { Upload } from './components/ui/upload'
export { toast, useToast } from './components/ui/use-toast'
// Hooks
export {
  useIsDesktop,
  useIsMobile,
  useIsTablet,
  useMediaQuery,
  usePrefersHighContrast,
  usePrefersReducedMotion,
} from './hooks'
// Utilities
export { cn } from './lib/utils'
// Primitives
export {
  PolymorphicButton,
  type PolymorphicButtonProps,
  PolymorphicLink,
  type PolymorphicLinkProps,
  type PolymorphicProps,
  Slot,
} from './primitives'
// Providers
export {
  getThemeScriptContent,
  type ResolvedTheme,
  type RouterLinkComponent,
  RouterProvider,
  type RouterProviderProps,
  type Theme,
  ThemeProvider,
  type ThemeProviderProps,
  type ThemeProviderState,
  ThemeScript,
  type ThemeScriptProps,
  useRouter,
  useTheme,
  useThemeOptional,
} from './providers'
