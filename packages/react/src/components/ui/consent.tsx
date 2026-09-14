import * as React from 'react'
import { cn } from '../../lib/utils'

const ConsentBanner = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'fixed bottom-0 left-0 z-50 max-h-[calc(100%_-_8rem)] w-full overflow-auto border border-border bg-background-alt-overlap p-4 elevation-overlap md:bottom-10 md:left-10 md:max-h-[calc(100%_-_5rem)] md:max-w-[40rem] md:p-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
ConsentBanner.displayName = 'ConsentBanner'

const ConsentBannerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn('mb-4 text-lg font-bold leading-6 md:text-xl md:leading-7', className)}
    {...props}
  />
))
ConsentBannerTitle.displayName = 'ConsentBannerTitle'

const ConsentBannerContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-6 text-base leading-6', className)} {...props} />
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
