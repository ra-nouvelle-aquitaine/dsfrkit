import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: '1' | '2' | '3' | '4' | '5' | '6'
  weight?: 'light' | 'regular' | 'medium' | 'bold'
  asChild?: boolean
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = 'h1', size = '6', weight = 'bold', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : as
    return (
      <Comp
        ref={ref}
        className={cn(
          'text-foreground-title m-0',
          {
            'text-xs': size === '1',
            'text-sm': size === '2',
            'text-base': size === '3',
            'text-lg': size === '4',
            'text-xl sm:text-2xl': size === '5',
            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl': size === '6',

            'font-light': weight === 'light',
            'font-normal': weight === 'regular',
            'font-medium': weight === 'medium',
            'font-bold': weight === 'bold',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Heading.displayName = 'Heading'

export { Heading }
