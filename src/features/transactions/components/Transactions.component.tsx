import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AppSidebarComponent } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui/button'
import { useLogoutHook } from '@/shared/hooks'
import { useAccountsQuery } from '@/features/accounts'
import { useCategoriesQuery } from '@/features/categories'
import { useAllTransactionsQuery } from '../hooks/use-all-transactions-query.hook'
import { useDeleteTransactionApi } from '../hooks/use-delete-transaction-api.hook'
import { TransactionFormDialogComponent } from './TransactionFormDialog.component'
import { TransactionsListComponent } from './TransactionsList.component'
import type { TransactionDto } from '../types/transaction.type'

export const TransactionsComponent = () => {
    const handleLogout = useLogoutHook()
    const { data: accounts } = useAccountsQuery()
    const { data: transactions, isLoading } = useAllTransactionsQuery((accounts ?? []).map((account) => account.id))
    const { data: categories } = useCategoriesQuery()
    const apiDeleteTransaction = useDeleteTransactionApi()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingTransaction, setEditingTransaction] = useState<TransactionDto | null>(null)

    const openCreateDialog = () => {
        setEditingTransaction(null)
        setIsDialogOpen(true)
    }

    const openEditDialog = (transaction: TransactionDto) => {
        setEditingTransaction(transaction)
        setIsDialogOpen(true)
    }

    const handleDelete = (transaction: TransactionDto) => {
        if (window.confirm('Supprimer cette transaction ?')) {
            apiDeleteTransaction.mutate(transaction.id)
        }
    }

    const handleDeleteSelected = (selectedTransactions: TransactionDto[]) => {
        if (window.confirm(`Supprimer ${selectedTransactions.length} transaction(s) ?`)) {
            selectedTransactions.forEach((transaction) => apiDeleteTransaction.mutate(transaction.id))
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AppSidebarComponent onLogout={handleLogout} />

            <main className="min-w-0 flex-1 space-y-6 p-6">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Transactions</h1>
                        <p className="mt-1 text-sm text-muted-foreground">Suivez vos revenus et dépenses</p>
                    </div>
                    <Button
                        onClick={openCreateDialog}
                        disabled={!accounts || accounts.length === 0}
                        title={!accounts || accounts.length === 0 ? 'Créez un compte avant d’ajouter une transaction' : undefined}
                        className="rounded-lg bg-blue-600 hover:bg-blue-700"
                    >
                        <Plus className="size-4" />
                        Ajouter une transaction
                    </Button>
                </header>

                <TransactionsListComponent
                    transactions={transactions ?? []}
                    accounts={accounts ?? []}
                    categories={categories ?? []}
                    isLoading={isLoading}
                    onEdit={openEditDialog}
                    onDelete={handleDelete}
                    onDeleteSelected={handleDeleteSelected}
                />
            </main>

            <TransactionFormDialogComponent
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                transaction={editingTransaction}
                accounts={accounts ?? []}
                categories={categories ?? []}
            />
        </div>
    )
}
