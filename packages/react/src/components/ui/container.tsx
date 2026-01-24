import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild = false, size = 'lg', ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        ref={ref}
        className={cn(
          'mx-auto px-4 sm:px-6 lg:px-8 w-full',
          {
            'max-w-screen-sm': size === 'sm',
            'max-w-screen-md': size === 'md',
            'max-w-screen-lg': size === 'lg',
            'max-w-screen-xl': size === 'xl',
            'max-w-screen-2xl': size === '2xl',
            'max-w-full': size === 'full',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Container.displayName = 'Container'

export { Container }
