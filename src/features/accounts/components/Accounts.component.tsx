import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { AppSidebarComponent, AppTopBarComponent } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui/button'
import { useLogoutHook } from '@/shared/hooks'
import { useAccountsQuery } from '../hooks/use-accounts-query.hook'
import { useAccountTypesQuery } from '../hooks/use-account-types-query.hook'
import { useDeleteAccountApi } from '../hooks/use-delete-account-api.hook'
import { useDevisesQuery } from '../hooks/use-devises-query.hook'
import { AccountFormDialogComponent } from './AccountFormDialog.component'
import { AccountsListComponent } from './AccountsList.component'
import type { CompteDto } from '../types/account.type'

export const AccountsComponent = () => {
    const handleLogout = useLogoutHook()
    const { data: accounts, isLoading } = useAccountsQuery()
    const { data: accountTypes } = useAccountTypesQuery()
    const { data: devises } = useDevisesQuery()
    const apiDeleteAccount = useDeleteAccountApi()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingAccount, setEditingAccount] = useState<CompteDto | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredAccounts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return accounts ?? []
        return (accounts ?? []).filter((account) => account.nom.toLowerCase().includes(query))
    }, [accounts, searchQuery])

    const openCreateDialog = () => {
        setEditingAccount(null)
        setIsDialogOpen(true)
    }

    const openEditDialog = (account: CompteDto) => {
        setEditingAccount(account)
        setIsDialogOpen(true)
    }

    const handleDelete = (account: CompteDto) => {
        if (window.confirm(`Supprimer le compte "${account.nom}" ?`)) {
            apiDeleteAccount.mutate(account.id)
        }
    }

    const handleDeleteSelected = (selectedAccounts: CompteDto[]) => {
        if (window.confirm(`Supprimer ${selectedAccounts.length} compte(s) ?`)) {
            selectedAccounts.forEach((account) => apiDeleteAccount.mutate(account.id))
        }
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AppSidebarComponent onLogout={handleLogout} />

            <div className="flex min-w-0 flex-1 flex-col">
                <AppTopBarComponent
                    title="Comptes"
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchPlaceholder="Rechercher un compte..."
                />

                <main className="min-w-0 flex-1 space-y-6 p-6">
                    <header className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">Comptes</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Gérez vos comptes bancaires</p>
                        </div>
                        <Button onClick={openCreateDialog} className="rounded-lg bg-blue-600 hover:bg-blue-700">
                            <Plus className="size-4" />
                            Ajouter un compte
                        </Button>
                    </header>

                    <AccountsListComponent
                        accounts={filteredAccounts}
                        accountTypes={accountTypes ?? []}
                        isLoading={isLoading}
                        onEdit={openEditDialog}
                        onDelete={handleDelete}
                        onDeleteSelected={handleDeleteSelected}
                    />
                </main>
            </div>

            <AccountFormDialogComponent
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                account={editingAccount}
                accountTypes={accountTypes ?? []}
                devises={devises ?? []}
            />
        </div>
    )
}
