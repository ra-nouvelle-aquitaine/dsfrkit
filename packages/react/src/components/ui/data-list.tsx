import * as React from 'react'
import { cn } from '../../lib/utils'

const DataListRoot = React.forwardRef<HTMLDListElement, React.HTMLAttributes<HTMLDListElement>>(
  ({ className, ...props }, ref) => (
    <dl ref={ref} className={cn('flex flex-col gap-4', className)} {...props} />
  )
)
DataListRoot.displayName = 'DataList.Root'

export interface DataListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
}

const DataListItem = React.forwardRef<HTMLDivElement, DataListItemProps>(
  ({ className, align = 'start', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col sm:flex-row gap-1 sm:gap-4',
        {
          'sm:items-start': align === 'start',
          'sm:items-center': align === 'center',
          'sm:items-end': align === 'end',
          'sm:items-baseline': align === 'baseline',
          'sm:items-stretch': align === 'stretch',
        },
        className
      )}
      {...props}
    />
  )
)
DataListItem.displayName = 'DataList.Item'

const DataListLabel = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <dt
      ref={ref}
      className={cn('text-sm font-medium text-foreground-muted min-w-[200px]', className)}
      {...props}
    />
  )
)
DataListLabel.displayName = 'DataList.Label'

const DataListValue = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <dd ref={ref} className={cn('text-sm text-foreground flex-1 m-0', className)} {...props} />
  )
)
DataListValue.displayName = 'DataList.Value'

export const DataList = {
  Root: DataListRoot,
  Item: DataListItem,
  Label: DataListLabel,
  Value: DataListValue,
}
