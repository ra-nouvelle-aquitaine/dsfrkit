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
  ({ className, as = 'h1', size, weight = 'bold', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : as
    const resolvedSize =
      size ?? ({ h1: '6', h2: '5', h3: '4', h4: '3', h5: '2', h6: '1' } as const)[as]

    return (
      <Comp
        ref={ref}
        className={cn(
          'text-foreground-title mt-0 mb-6',
          {
            'text-h6 md:text-h6-desktop': resolvedSize === '1',
            'text-h5 md:text-h5-desktop': resolvedSize === '2',
            'text-h4 md:text-h4-desktop': resolvedSize === '3',
            'text-h3 md:text-h3-desktop': resolvedSize === '4',
            'text-h2 md:text-h2-desktop': resolvedSize === '5',
            'text-h1 md:text-h1-desktop': resolvedSize === '6',

            'font-normal': weight === 'light' || weight === 'regular',
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
