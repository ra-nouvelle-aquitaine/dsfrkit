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
  'group/card flex flex-col relative bg-background transition-colors',
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
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-base',
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
    return (
      <div
        ref={ref}
        data-size={size ?? 'md'}
        className={cn(cardVariants({ variant, size, className }))}
        {...props}
      />
    )
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
      className={cn(
        'relative flex-shrink-0 flex flex-col gap-1 px-8 pt-8 group-data-[size=sm]/card:px-6 group-data-[size=sm]/card:pt-6 group-data-[size=lg]/card:px-10 group-data-[size=lg]/card:pt-10',
        className
      )}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

/**
 * Zone d'image de carte DSFR (`.fr-card__img`).
 *
 * C'est le composant prévu par le DSFR pour porter une photographie : l'image
 * occupe toute la largeur de la carte dans un rapport 16/9 et est recadrée en
 * `cover`. La Tuile, elle, ne prévoit qu'une vignette carrée de 80 px destinée
 * aux pictogrammes.
 */
const CardImage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'order-first w-full overflow-hidden [&>img]:block [&>img]:aspect-video [&>img]:w-full [&>img]:object-cover [&>img]:object-center',
        className
      )}
      {...props}
    />
  )
)
CardImage.displayName = 'CardImage'

/**
 * Corps de carte DSFR
 * Conforme DSFR : padding latéral 16px, vertical 16px haut / 32px bas
 */
const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col flex-1 px-8 pt-2 pb-8 group-data-[size=sm]/card:px-6 group-data-[size=sm]/card:pb-6 group-data-[size=lg]/card:px-10 group-data-[size=lg]/card:pb-10',
        className
      )}
      {...props}
    />
  )
)
CardBody.displayName = 'CardBody'

/**
 * Titre de carte DSFR
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Comp = 'h3', ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn(
        'text-xl font-bold leading-7 text-foreground-title group-data-[size=sm]/card:text-lg group-data-[size=sm]/card:leading-6 group-data-[size=lg]/card:text-h4',
        className
      )}
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
  <p
    ref={ref}
    className={cn(
      'mt-3 text-sm leading-6 text-foreground group-data-[size=sm]/card:mt-2 group-data-[size=lg]/card:mt-4 group-data-[size=lg]/card:text-base',
      className
    )}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

/**
 * Contenu de carte DSFR (alias de CardBody pour compatibilité)
 */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col flex-1 px-8 pt-4 pb-8 group-data-[size=sm]/card:px-6 group-data-[size=sm]/card:pb-6 group-data-[size=lg]/card:px-10 group-data-[size=lg]/card:pb-10',
        className
      )}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

/**
 * Pied de carte DSFR — aligné sur le bas du body avec le bon padding
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-4 px-8 pb-8 group-data-[size=sm]/card:px-6 group-data-[size=sm]/card:pb-6 group-data-[size=lg]/card:px-10 group-data-[size=lg]/card:pb-10',
        className
      )}
      {...props}
    />
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
  CardImage,
  CardTitle,
  cardVariants,
}
