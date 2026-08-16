import { ArrowDownLeft, ArrowUpRight, Pencil, Receipt, Trash2 } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { DataTable } from '@/shared/components/ui/data-table'
import { formatCurrency } from '@/shared/lib/currency'
import { cn } from '@/shared/lib/utils'
import type { CompteDto } from '@/features/accounts'
import type { CategorieDto } from '@/features/categories'
import type { TransactionDto } from '../types/transaction.type'

interface TransactionsListProps {
    transactions: TransactionDto[]
    accounts: CompteDto[]
    categories: CategorieDto[]
    isLoading: boolean
    onEdit: (transaction: TransactionDto) => void
    onDelete: (transaction: TransactionDto) => void
    onDeleteSelected?: (transactions: TransactionDto[]) => void
}

export const TransactionsListComponent = ({
    transactions,
    accounts,
    categories,
    isLoading,
    onEdit,
    onDelete,
    onDeleteSelected,
}: TransactionsListProps) => {
    const getCompteNom = (id: string) => accounts.find((account) => account.id === id)?.nom ?? '—'
    const getCategorieNom = (id: string | null) =>
        id ? (categories.find((categorie) => categorie.id === id)?.nom ?? '—') : '—'

    const columns: ColumnDef<TransactionDto>[] = [
        {
            id: 'date',
            header: 'Date',
            meta: { className: 'w-28' },
            cell: ({ row }) => (
                <span className="text-muted-foreground">{new Date(row.original.date).toLocaleDateString('fr-FR')}</span>
            ),
        },
        {
            id: 'description',
            header: 'Description',
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
                            {isRevenu ? <ArrowUpRight className="size-4" /> : <ArrowDownLeft className="size-4" />}
                        </span>
                        <span className="truncate font-medium">
                            {row.original.description || getCategorieNom(row.original.categorieId)}
                        </span>
                    </div>
                )
            },
        },
        {
            id: 'categorie',
            header: 'Catégorie',
            meta: { className: 'w-40' },
            cell: ({ row }) => {
                const isRevenu = row.original.type === 'Revenu'

                return (
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <span className={cn('size-1.5 rounded-full', isRevenu ? 'bg-emerald-600' : 'bg-red-600')} />
                        <span className="truncate">{getCategorieNom(row.original.categorieId)}</span>
                    </span>
                )
            },
        },
        {
            id: 'compte',
            header: 'Compte',
            meta: { className: 'w-36' },
            cell: ({ row }) => (
                <span className="truncate text-muted-foreground">{getCompteNom(row.original.compteId)}</span>
            ),
        },
        {
            id: 'montant',
            header: 'Montant',
            meta: { className: 'w-32 text-right' },
            cell: ({ row }) => {
                const isRevenu = row.original.type === 'Revenu'

                return (
                    <span className={cn('font-semibold', isRevenu ? 'text-emerald-600' : 'text-red-600')}>
                        {isRevenu ? '+ ' : '- '}
                        {formatCurrency(Math.abs(Number(row.original.montant)))}
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
            data={transactions}
            isLoading={isLoading}
            loadingText="Chargement des transactions..."
            className="min-w-180"
            getRowId={(transaction) => transaction.id}
            enableRowSelection
            onDeleteSelected={onDeleteSelected}
            pageSize={10}
            emptyState={
                <Card>
                    <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                        <Receipt className="size-8" />
                        <p>Aucune transaction pour le moment</p>
                    </CardContent>
                </Card>
            }
        />
    )
}
