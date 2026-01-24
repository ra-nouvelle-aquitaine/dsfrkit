import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'b' | 'i'
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  weight?: 'light' | 'regular' | 'medium' | 'bold'
  asChild?: boolean
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ className, as = 'p', size = '3', weight = 'regular', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : as
    return (
      <Comp
        ref={ref as React.Ref<never>}
        className={cn(
          'text-foreground m-0',
          {
            'text-xs': String(size) === '1',
            'text-sm': String(size) === '2',
            'text-base': String(size) === '3',
            'text-lg': String(size) === '4',
            'text-xl': String(size) === '5',
            'text-2xl': String(size) === '6',
            'text-3xl': String(size) === '7',
            'text-4xl': String(size) === '8',
            'text-5xl': String(size) === '9',

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
Text.displayName = 'Text'

export { Text }
