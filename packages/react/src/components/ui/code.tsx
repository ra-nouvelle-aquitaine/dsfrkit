import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'
import { cn } from '../../lib/utils'

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean
  variant?: 'solid' | 'soft' | 'outline' | 'ghost'
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, asChild = false, variant = 'soft', ...props }, ref) => {
    const Comp = asChild ? Slot : 'code'
    return (
      <Comp
        ref={ref}
        className={cn(
          'relative rounded font-mono text-[0.875em] font-medium leading-none whitespace-nowrap px-[0.3em] py-[0.2em]',
          {
            'bg-muted text-muted-foreground': variant === 'soft',
            'bg-foreground text-background': variant === 'solid',
            'border text-foreground': variant === 'outline',
            'bg-transparent text-foreground': variant === 'ghost',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Code.displayName = 'Code'

export { Code }
