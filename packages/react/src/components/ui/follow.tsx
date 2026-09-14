import * as React from 'react'
import { cn } from '../../lib/utils'

const Follow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('w-full bg-background-alt-blue-france py-6 md:py-8', className)}
      {...props}
    >
      <div className="fr-container">
        <div className="fr-grid-row gap-y-8">{children}</div>
      </div>
    </div>
  )
)
Follow.displayName = 'Follow'

const FollowNewsletter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('fr-col-12 fr-col-md-8 pr-0 md:pr-12', className)} {...props}>
      <div className="flex flex-col w-full max-w-2xl gap-4">{children}</div>
    </div>
  )
)
FollowNewsletter.displayName = 'FollowNewsletter'

const FollowSocial = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('fr-col-12 fr-col-md-4 flex flex-col gap-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)
FollowSocial.displayName = 'FollowSocial'

export interface FollowTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const FollowTitle = React.forwardRef<HTMLHeadingElement, FollowTitleProps>(
  ({ as: Comp = 'h2', className, ...props }, ref) => (
    <Comp ref={ref} className={cn('m-0 text-xl font-bold leading-7', className)} {...props} />
  )
)
FollowTitle.displayName = 'FollowTitle'

const FollowDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('mb-2 text-base leading-6 text-foreground', className)} {...props} />
))
FollowDescription.displayName = 'FollowDescription'

export { Follow, FollowDescription, FollowNewsletter, FollowSocial, FollowTitle }
