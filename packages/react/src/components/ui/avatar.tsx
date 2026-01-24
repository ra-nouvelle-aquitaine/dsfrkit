import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { Indicator } from './indicator'

const avatarVariants = cva('relative flex shrink-0 overflow-hidden', {
  variants: {
    size: {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-14 w-14 text-base',
      xl: 'h-20 w-20 text-lg',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-none',
      rounded: 'rounded-md',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
  },
})

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const AvatarContext = React.createContext<VariantProps<typeof avatarVariants>>({
  size: 'md',
  shape: 'circle',
})

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, size, shape, ...props }, ref) => {
    const contextValue = React.useMemo(() => ({ size, shape }), [size, shape])

    return (
      <AvatarContext.Provider value={contextValue}>
        <AvatarPrimitive.Root
          ref={ref}
          className={cn(avatarVariants({ size, shape, className }))}
          {...props}
        />
      </AvatarContext.Provider>
    )
  }
)
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full object-cover', className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const ACCENT_COLORS = [
  'green-tilleul-verveine',
  'green-bourgeon',
  'green-emeraude',
  'green-menthe',
  'green-archipel',
  'blue-ecume',
  'blue-cumulus',
  'purple-glycine',
  'pink-macaron',
  'pink-tuile',
  'yellow-tournesol',
  'yellow-moutarde',
  'orange-terre-battue',
  'brown-cafe-creme',
  'brown-caramel',
  'brown-opera',
  'beige-gris-galet',
] as const

/**
 * Génère une couleur d'accentuation DSFR à partir d'une chaîne de caractères (généralement des initiales)
 */
export function getAvatarColorVariant(name: string): (typeof ACCENT_COLORS)[number] {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % ACCENT_COLORS.length
  return ACCENT_COLORS[index]
}

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  /** Si true, applique une couleur d'accentuation aléatoire basée sur le text children */
  autoColor?: boolean
}

/**
 * Map statique des classes CSS d'accentuation DSFR pour l'avatar.
 * Nécessaire car LightningCSS (Vite 8) ne supporte pas les template literals dans les noms de propriétés CSS,
 * et Tailwind JIT ne peut pas purger les classes dynamiques.
 */
const AVATAR_COLOR_CLASSES: Record<string, string> = {
  'green-tilleul-verveine':
    'bg-[var(--background-contrast-green-tilleul-verveine)] text-[var(--text-label-green-tilleul-verveine)]',
  'green-bourgeon':
    'bg-[var(--background-contrast-green-bourgeon)] text-[var(--text-label-green-bourgeon)]',
  'green-emeraude':
    'bg-[var(--background-contrast-green-emeraude)] text-[var(--text-label-green-emeraude)]',
  'green-menthe':
    'bg-[var(--background-contrast-green-menthe)] text-[var(--text-label-green-menthe)]',
  'green-archipel':
    'bg-[var(--background-contrast-green-archipel)] text-[var(--text-label-green-archipel)]',
  'blue-ecume': 'bg-[var(--background-contrast-blue-ecume)] text-[var(--text-label-blue-ecume)]',
  'blue-cumulus':
    'bg-[var(--background-contrast-blue-cumulus)] text-[var(--text-label-blue-cumulus)]',
  'purple-glycine':
    'bg-[var(--background-contrast-purple-glycine)] text-[var(--text-label-purple-glycine)]',
  'pink-macaron':
    'bg-[var(--background-contrast-pink-macaron)] text-[var(--text-label-pink-macaron)]',
  'pink-tuile': 'bg-[var(--background-contrast-pink-tuile)] text-[var(--text-label-pink-tuile)]',
  'yellow-tournesol':
    'bg-[var(--background-contrast-yellow-tournesol)] text-[var(--text-label-yellow-tournesol)]',
  'yellow-moutarde':
    'bg-[var(--background-contrast-yellow-moutarde)] text-[var(--text-label-yellow-moutarde)]',
  'orange-terre-battue':
    'bg-[var(--background-contrast-orange-terre-battue)] text-[var(--text-label-orange-terre-battue)]',
  'brown-cafe-creme':
    'bg-[var(--background-contrast-brown-cafe-creme)] text-[var(--text-label-brown-cafe-creme)]',
  'brown-caramel':
    'bg-[var(--background-contrast-brown-caramel)] text-[var(--text-label-brown-caramel)]',
  'brown-opera': 'bg-[var(--background-contrast-brown-opera)] text-[var(--text-label-brown-opera)]',
  'beige-gris-galet':
    'bg-[var(--background-contrast-beige-gris-galet)] text-[var(--text-label-beige-gris-galet)]',
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, autoColor, children, ...props }, ref) => {
  const { shape } = React.useContext(AvatarContext)

  // Déterminer la classe de fond
  let bgClass = 'bg-muted text-muted-foreground'
  if (autoColor && typeof children === 'string') {
    const variant = getAvatarColorVariant(children)
    bgClass = AVATAR_COLOR_CLASSES[variant] ?? bgClass
  }

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center font-bold tracking-wide',
        shape === 'circle' ? 'rounded-full' : shape === 'rounded' ? 'rounded-md' : 'rounded-none',
        bgClass,
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  )
})
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export interface AvatarBadgeProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Indicator>, 'children'> {}

/**
 * Utilisé pour ajouter un statut (en ligne, notifications) sur l'avatar.
 * C'est un simple wrapper autour du composant Indicator.
 */
const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ className, variant, size = 'dot', ...props }, ref) => {
    return (
      <Indicator
        ref={ref}
        variant={variant}
        size={size}
        className={className}
        show={true}
        {...props}
      >
        <span className="sr-only">Statut</span>
      </Indicator>
    )
  }
)
AvatarBadge.displayName = 'AvatarBadge'

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { max?: number }
>(({ className, children, max, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children).filter(React.isValidElement)
  const validChildren = max ? childrenArray.slice(0, max) : childrenArray
  const surplus = max ? childrenArray.length - max : 0

  return (
    <div ref={ref} className={cn('flex items-center -space-x-3', className)} {...props}>
      {validChildren.map((child, index) => {
        const element = child as React.ReactElement<{
          className?: string
          style?: React.CSSProperties
        }>
        return React.cloneElement(element, {
          className: cn('ring-2 ring-background', element.props.className),
          style: { zIndex: validChildren.length - index },
        })
      })}
      {surplus > 0 && (
        <div
          style={{ zIndex: 0 }}
          className="ring-2 ring-background z-0 relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-foreground"
        >
          +{surplus}
        </div>
      )}
    </div>
  )
})
AvatarGroup.displayName = 'AvatarGroup'

export { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarImage, avatarVariants }

/**
 * @example
 * ```tsx
 * <Avatar size="md">
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
