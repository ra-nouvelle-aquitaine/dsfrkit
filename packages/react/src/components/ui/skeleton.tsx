import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '../../lib/utils'

const skeletonVariants = cva('bg-muted overflow-hidden relative', {
  variants: {
    animation: {
      pulse: 'animate-pulse',
      wave: 'after:content-[""] after:absolute after:inset-0 after:translate-x-[-100%] after:animate-skeleton-wave after:bg-gradient-to-r after:from-transparent after:via-muted-foreground/10 after:to-transparent',
      none: '',
    },
  },
  defaultVariants: {
    animation: 'pulse',
  },
})

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, animation, ...props }: SkeletonProps) {
  return <div className={cn(skeletonVariants({ animation }), className)} {...props} />
}

export { Skeleton }
