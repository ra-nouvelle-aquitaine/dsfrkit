import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      asChild = false,
      direction = 'row',
      justify = 'start',
      align = 'stretch',
      wrap = 'nowrap',
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        className={cn(
          'flex',
          {
            'flex-row': direction === 'row',
            'flex-row-reverse': direction === 'row-reverse',
            'flex-col': direction === 'col',
            'flex-col-reverse': direction === 'col-reverse',
            'justify-start': justify === 'start',
            'justify-center': justify === 'center',
            'justify-end': justify === 'end',
            'justify-between': justify === 'between',
            'justify-around': justify === 'around',
            'justify-evenly': justify === 'evenly',
            'items-start': align === 'start',
            'items-center': align === 'center',
            'items-end': align === 'end',
            'items-stretch': align === 'stretch',
            'items-baseline': align === 'baseline',
            'flex-nowrap': wrap === 'nowrap',
            'flex-wrap': wrap === 'wrap',
            'flex-wrap-reverse': wrap === 'wrap-reverse',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Flex.displayName = 'Flex'

export { Flex }
