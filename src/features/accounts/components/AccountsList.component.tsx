import { Pencil, Trash2, Wallet } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { DataTable } from '@/shared/components/ui/data-table'
import { cn } from '@/shared/lib/utils'
import type { AccountTypeDto, CompteDto } from '../types/account.type'

interface AccountsListProps {
    accounts: CompteDto[]
    accountTypes: AccountTypeDto[]
    isLoading: boolean
    onEdit: (account: CompteDto) => void
    onDelete: (account: CompteDto) => void
    onDeleteSelected?: (accounts: CompteDto[]) => void
}

export const AccountsListComponent = ({
    accounts,
    accountTypes,
    isLoading,
    onEdit,
    onDelete,
    onDeleteSelected,
}: AccountsListProps) => {
    const getTypeNom = (typeId: string) => accountTypes.find((accountType) => accountType.id === typeId)?.nom ?? '—'

    const columns: ColumnDef<CompteDto>[] = [
        {
            id: 'nom',
            header: 'Nom',
            meta: { className: 'w-auto' },
            cell: ({ row }) => (
                <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                        <Wallet className="size-4" />
                    </span>
                    <span className="truncate font-medium">{row.original.nom}</span>
                </div>
            ),
        },
        {
            id: 'type',
            header: 'Type',
            meta: { className: 'w-40' },
            cell: ({ row }) => (
                <span className="text-muted-foreground inline-flex items-center rounded-md border border-border bg-muted/40 px-2 py-0.5 text-sm font-medium tracking-wide capitalize">
                    {getTypeNom(row.original.typeId)}
                </span>
            ),
        },
        {
            id: 'statut',
            header: 'Statut',
            meta: { className: 'w-32' },
            cell: ({ row }) => (
                <span
                    className={cn(
                        'inline-flex items-center rounded-md border px-2 py-0.5 text-sm font-medium tracking-wide capitalize',
                        row.original.estActif
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-400'
                            : 'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'
                    )}
                >
                    {row.original.estActif ? 'Actif' : 'Inactif'}
                </span>
            ),
        },
        {
            id: 'dateCreation',
            header: 'Créé le',
            meta: { className: 'w-32' },
            cell: ({ row }) => (
                <span className="text-muted-foreground">
                    {new Date(row.original.dateCreation).toLocaleDateString('fr-FR')}
                </span>
            ),
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
            data={accounts}
            isLoading={isLoading}
            loadingText="Chargement des comptes..."
            getRowId={(account) => account.id}
            enableRowSelection
            onDeleteSelected={onDeleteSelected}
            pageSize={10}
            emptyState={
                <Card>
                    <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                        <Wallet className="size-8" />
                        <p>Aucun compte pour le moment</p>
                    </CardContent>
                </Card>
            }
        />
    )
}
