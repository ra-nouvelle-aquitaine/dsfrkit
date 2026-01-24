import * as React from 'react'
import { cn } from '../../lib/utils'

const ConsentBanner = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed bottom-0 left-0 w-full z-50 bg-background elevation-raised py-6 shadow-[0_-4px_8px_rgba(0,0,0,0.1)]',
        className
      )}
      {...props}
    >
      <div className="fr-container">{children}</div>
    </div>
  )
)
ConsentBanner.displayName = 'ConsentBanner'

const ConsentBannerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-bold mb-4', className)} {...props} />
))
ConsentBannerTitle.displayName = 'ConsentBannerTitle'

const ConsentBannerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-sm mb-6', className)} {...props} />
  )
)
ConsentBannerContent.displayName = 'ConsentBannerContent'

const ConsentBannerActions = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-wrap gap-4 items-center md:justify-end', className)}
      {...props}
    />
  )
)
ConsentBannerActions.displayName = 'ConsentBannerActions'

export { ConsentBanner, ConsentBannerActions, ConsentBannerContent, ConsentBannerTitle }
