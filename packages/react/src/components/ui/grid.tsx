import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean
  columns?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  gap?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10'
  gapX?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10'
  gapY?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10'
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, asChild = false, columns, gap, gapX, gapY, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'

    return (
      <Comp
        ref={ref}
        className={cn(
          'grid',
          {
            'grid-cols-1': columns === '1',
            'grid-cols-2': columns === '2',
            'grid-cols-3': columns === '3',
            'grid-cols-4': columns === '4',
            'grid-cols-5': columns === '5',
            'grid-cols-6': columns === '6',
            'grid-cols-7': columns === '7',
            'grid-cols-8': columns === '8',
            'grid-cols-9': columns === '9',
            'grid-cols-10': columns === '10',
            'grid-cols-11': columns === '11',
            'grid-cols-12': columns === '12',

            'gap-0': gap === '0',
            'gap-1': gap === '1',
            'gap-2': gap === '2',
            'gap-3': gap === '3',
            'gap-4': gap === '4',
            'gap-5': gap === '5',
            'gap-6': gap === '6',
            'gap-8': gap === '8',
            'gap-10': gap === '10',

            'gap-x-0': gapX === '0',
            'gap-x-1': gapX === '1',
            'gap-x-2': gapX === '2',
            'gap-x-3': gapX === '3',
            'gap-x-4': gapX === '4',
            'gap-x-5': gapX === '5',
            'gap-x-6': gapX === '6',
            'gap-x-8': gapX === '8',
            'gap-x-10': gapX === '10',

            'gap-y-0': gapY === '0',
            'gap-y-1': gapY === '1',
            'gap-y-2': gapY === '2',
            'gap-y-3': gapY === '3',
            'gap-y-4': gapY === '4',
            'gap-y-5': gapY === '5',
            'gap-y-6': gapY === '6',
            'gap-y-8': gapY === '8',
            'gap-y-10': gapY === '10',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Grid.displayName = 'Grid'

export { Grid }
