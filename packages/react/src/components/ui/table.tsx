import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Table DSFR — fr-table
 * Conforme : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/tableau
 *
 * @example
 * ```tsx
 * <Table caption="Utilisateurs" striped>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Nom</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>Jean</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */

interface TableContextValue {
  striped?: boolean
  noBorder?: boolean
}

const TableContext = React.createContext<TableContextValue>({ striped: false, noBorder: false })

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Légende du tableau (obligatoire pour l'accessibilité DSFR) */
  caption?: string
  /** Affiche des lignes alternées (fr-table--bordered) */
  striped?: boolean
  /** Tableau sans bordures latérales */
  noBorder?: boolean
}

const Table = React.forwardRef<HTMLDivElement, TableProps>(
  ({ className, caption, striped = false, noBorder = false, children, ...props }, ref) => {
    const contextValue = React.useMemo(() => ({ striped, noBorder }), [striped, noBorder])

    return (
      <TableContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('fr-table relative w-full overflow-auto', className)}
          {...props}
        >
          <table className="w-full text-sm border-collapse text-left">
            {caption && (
              <caption className="caption-top text-left text-xl font-bold text-foreground-title mb-4">
                {caption}
              </caption>
            )}
            {children}
          </table>
        </div>
      </TableContext.Provider>
    )
  }
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('bg-muted border-b-2 border-border', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  // The official DSFR assigns striped rows via CSS. We emulate this by tracking even/odd via context or CSS.
  // Using pure Tailwind even: wrapper approach on TR is better, but context allows explicit control.
  <tbody ref={ref} className={cn('', className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn('bg-muted font-medium', className)} {...props} />
))
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => {
    const { striped } = React.useContext(TableContext)
    return (
      <tr
        ref={ref}
        className={cn(
          'transition-colors hover:bg-background-hover data-[state=selected]:bg-background-contrast',
          // Zebra striping applies to even rows in the body
          striped && 'even:bg-muted',
          className
        )}
        {...props}
      />
    )
  }
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { noBorder } = React.useContext(TableContext)
  return (
    <th
      ref={ref}
      className={cn(
        'px-4 py-3 text-left align-middle text-sm font-bold text-foreground-title',
        !noBorder && 'border-b border-border',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      scope="col"
      {...props}
    />
  )
})
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { noBorder } = React.useContext(TableContext)
  return (
    <td
      ref={ref}
      className={cn(
        'px-4 py-3 align-middle text-sm text-foreground',
        !noBorder && 'border-b border-border',
        '[&:has([role=checkbox])]:pr-0',
        className
      )}
      {...props}
    />
  )
})
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('caption-top text-xl font-bold text-foreground-title text-left mb-4', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'

export type { TableProps }
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
