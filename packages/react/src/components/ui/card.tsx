import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Variants de la carte DSFR
 * Conforme au design system : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/carte
 *
 * Les cartes DSFR n'ont pas de border-radius et utilisent des bordures fines
 */
const cardVariants = cva(
  // Base DSFR : pas de border-radius, fond adaptatif au thème, flex column
  'flex flex-col relative bg-background transition-colors',
  {
    variants: {
      variant: {
        // Default : bordure grise fine sur tous les côtés
        default: 'border border-border',
        // Bordered : bordure bleue
        bordered: 'border-2 border-primary',
        // Shadow : avec ombre portée
        shadow: 'elevation-raised hover:elevation-lifted border border-border',
        // Ghost : sans bordure
        ghost: 'border-transparent',
        // Outlined : bordure simple sans hover
        outlined: 'border border-border',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Composant Card DSFR
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Titre de la carte</CardTitle>
 *     <CardDescription>Description de la carte</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Contenu de la carte
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <div ref={ref} className={cn(cardVariants({ variant, size, className }))} {...props} />
  }
)

Card.displayName = 'Card'

/**
 * En-tête de carte DSFR (pour l'image ou les badges, et très souvent les titres/descriptions)
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative flex-shrink-0 flex flex-col gap-1 px-6 pt-6', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

/**
 * Corps de carte DSFR
 * Conforme DSFR : padding latéral 16px, vertical 16px haut / 32px bas
 */
const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col flex-1 px-6 pt-2 pb-8', className)} {...props} />
  )
)
CardBody.displayName = 'CardBody'

/**
 * Titre de carte DSFR
 */
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-bold leading-6 text-foreground-title', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

/**
 * Description de carte DSFR
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm leading-6 text-foreground', className)} {...props} />
))
CardDescription.displayName = 'CardDescription'

/**
 * Contenu de carte DSFR (alias de CardBody pour compatibilité)
 */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col flex-1 px-4 pt-4 pb-8', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

/**
 * Pied de carte DSFR — aligné sur le bas du body avec le bon padding
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-4 px-4 pb-4', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardBody,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cardVariants,
}
