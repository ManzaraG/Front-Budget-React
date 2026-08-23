import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    type ColumnDef,
    type RowSelectionState,
} from '@tanstack/react-table'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Checkbox } from '@/shared/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table'
import { cn } from '@/shared/lib/utils'

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData, TValue> {
        className?: string
    }
}

const SELECT_COLUMN_ID = 'select'
const NO_PAGINATION_PAGE_SIZE = 1_000_000

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    isLoading?: boolean
    loadingText?: string
    emptyState?: React.ReactNode
    className?: string
    getRowId?: (row: TData) => string
    enableRowSelection?: boolean
    onDeleteSelected?: (rows: TData[]) => void
    pageSize?: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    loadingText = 'Chargement...',
    emptyState,
    className,
    getRowId,
    enableRowSelection = false,
    onDeleteSelected,
    pageSize,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: pageSize ?? NO_PAGINATION_PAGE_SIZE })

    const tableColumns: ColumnDef<TData, TValue>[] = enableRowSelection
        ? [
              {
                  id: SELECT_COLUMN_ID,
                  header: ({ table }) => (
                      <Checkbox
                          checked={
                              table.getIsAllPageRowsSelected() ||
                              (table.getIsSomePageRowsSelected() && 'indeterminate')
                          }
                          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                          aria-label="Tout sélectionner"
                      />
                  ),
                  cell: ({ row }) => (
                      <Checkbox
                          checked={row.getIsSelected()}
                          onCheckedChange={(value) => row.toggleSelected(!!value)}
                          aria-label="Sélectionner la ligne"
                      />
                  ),
                  meta: { className: 'w-10' },
              },
              ...columns,
          ]
        : columns

    const table = useReactTable({
        data,
        columns: tableColumns,
        state: { rowSelection, pagination },
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getRowId,
        enableRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">{loadingText}</p>
    }

    if (data.length === 0 && emptyState) {
        return <>{emptyState}</>
    }

    const selectedRows = table.getFilteredSelectedRowModel().rows
    const pageCount = table.getPageCount()

    return (
        <Card className="py-0">
            <CardContent className="px-0">
                {enableRowSelection && selectedRows.length > 0 && (
                    <div className="bg-muted/40 flex items-center justify-between border-b px-6 py-2 text-[11px] tracking-wider capitalize">
                        <span className="text-muted-foreground">{selectedRows.length} sélectionné(s)</span>
                        {onDeleteSelected && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[11px] tracking-wider capitalize text-destructive hover:text-destructive"
                                onClick={() => {
                                    onDeleteSelected(selectedRows.map((row) => row.original))
                                    setRowSelection({})
                                }}
                            >
                                <Trash2 className="size-4" />
                                Supprimer la sélection
                            </Button>
                        )}
                    </div>
                )}

                <div className="overflow-x-auto">
                    <Table className={cn('min-w-120 table-fixed border-collapse', className)}>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} className={header.column.columnDef.meta?.className}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className={cell.column.columnDef.meta?.className}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {pageSize && (
                    <div className="flex items-center justify-between border-t px-6 py-3 text-[11px] tracking-wider capitalize">
                        <span className="text-muted-foreground">{data.length} ligne(s)</span>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-[11px] tracking-wider capitalize"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Précédent
                            </Button>
                            <span className="text-muted-foreground">
                                Page {table.getState().pagination.pageIndex + 1} / {pageCount || 1}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-[11px] tracking-wider capitalize"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
