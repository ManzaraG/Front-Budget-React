import { Pencil, Tags, Trash2 } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { DataTable } from '@/shared/components/ui/data-table'
import { cn } from '@/shared/lib/utils'
import type { CategorieDto } from '../types/categorie.type'

interface CategoriesListProps {
    categories: CategorieDto[]
    isLoading: boolean
    onEdit: (categorie: CategorieDto) => void
    onDelete: (categorie: CategorieDto) => void
    onDeleteSelected?: (categories: CategorieDto[]) => void
}

export const CategoriesListComponent = ({
    categories,
    isLoading,
    onEdit,
    onDelete,
    onDeleteSelected,
}: CategoriesListProps) => {
    const columns: ColumnDef<CategorieDto>[] = [
        {
            id: 'nom',
            header: 'Nom',
            meta: { className: 'w-auto' },
            cell: ({ row }) => {
                const isRevenu = row.original.type === 'Revenu'

                return (
                    <div className="flex min-w-0 items-center gap-2.5">
                        <span
                            className={cn(
                                'flex size-8 shrink-0 items-center justify-center rounded-lg',
                                isRevenu ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                            )}
                        >
                            <Tags className="size-4" />
                        </span>
                        <span className="truncate font-medium">{row.original.nom}</span>
                    </div>
                )
            },
        },
        {
            id: 'type',
            header: 'Type',
            meta: { className: 'w-40' },
            cell: ({ row }) => {
                const isRevenu = row.original.type === 'Revenu'

                return (
                    <span
                        className={cn(
                            'inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase',
                            isRevenu
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-red-200 bg-red-50 text-red-700'
                        )}
                    >
                        {isRevenu ? 'Revenu' : 'Dépense'}
                    </span>
                )
            },
        },
        {
            id: 'actions',
            header: '',
            meta: { className: 'w-24 text-right' },
            cell: ({ row }) => (
                <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)} title="Modifier">
                        <Pencil className="size-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(row.original)}
                        title="Supprimer"
                        className="text-destructive hover:text-destructive"
                    >
                        <Trash2 className="size-4" />
                    </Button>
                </div>
            ),
        },
    ]

    return (
        <DataTable
            columns={columns}
            data={categories}
            isLoading={isLoading}
            loadingText="Chargement des catégories..."
            getRowId={(categorie) => categorie.id}
            enableRowSelection
            onDeleteSelected={onDeleteSelected}
            pageSize={10}
            emptyState={
                <Card>
                    <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                        <Tags className="size-8" />
                        <p>Aucune catégorie pour le moment</p>
                    </CardContent>
                </Card>
            }
        />
    )
}
