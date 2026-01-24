import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg' | 'none'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, asChild = false, size = 'md', ...props }, ref) => {
    const Comp = asChild ? Slot : 'section'
    return (
      <Comp
        ref={ref}
        className={cn(
          {
            'py-8 md:py-12': size === 'sm',
            'py-12 md:py-24': size === 'md',
            'py-24 md:py-32': size === 'lg',
            'py-0': size === 'none',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Section.displayName = 'Section'

export { Section }
