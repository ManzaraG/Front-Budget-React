import { useMemo, useState } from 'react'
import { Plus, Power, PowerOff } from 'lucide-react'
import type { RowSelectionState } from '@tanstack/react-table'
import { AppSidebarComponent, AppTopBarComponent } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui/button'
import { useLogoutHook } from '@/shared/hooks'
import { useAccountsQuery } from '../hooks/use-accounts-query.hook'
import { useAccountTypesQuery } from '../hooks/use-account-types-query.hook'
import { useActivateAccountApi } from '../hooks/use-activate-account-api.hook'
import { useDeactivateAccountApi } from '../hooks/use-deactivate-account-api.hook'
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
    const apiDeactivateAccount = useDeactivateAccountApi()
    const apiActivateAccount = useActivateAccountApi()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingAccount, setEditingAccount] = useState<CompteDto | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

    const filteredAccounts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return accounts ?? []
        return (accounts ?? []).filter((account) => account.nom.toLowerCase().includes(query))
    }, [accounts, searchQuery])

    const selectedAccounts = (accounts ?? []).filter((account) => rowSelection[account.id])
    const selectedActiveAccounts = selectedAccounts.filter((account) => account.estActif)
    // Dès qu'une source active est sélectionnée on propose de désactiver ; sinon, d'activer les inactives.
    const isActivation = selectedAccounts.length > 0 && selectedActiveAccounts.length === 0

    const openCreateDialog = () => {
        setEditingAccount(null)
        setIsDialogOpen(true)
    }

    const openEditDialog = (account: CompteDto) => {
        setEditingAccount(account)
        setIsDialogOpen(true)
    }

    const handleDelete = (account: CompteDto) => {
        if (window.confirm(`Supprimer la source "${account.nom}" ?`)) {
            apiDeleteAccount.mutate(account.id)
        }
    }

    const handleDeleteSelected = (selectedAccounts: CompteDto[]) => {
        if (window.confirm(`Supprimer ${selectedAccounts.length} source(s) ?`)) {
            selectedAccounts.forEach((account) => apiDeleteAccount.mutate(account.id))
        }
    }

    const handleToggleSelected = () => {
        const targets = isActivation ? selectedAccounts : selectedActiveAccounts
        const verb = isActivation ? 'Activer' : 'Désactiver'
        if (window.confirm(`${verb} ${targets.length} source(s) ?`)) {
            const mutation = isActivation ? apiActivateAccount : apiDeactivateAccount
            targets.forEach((account) => mutation.mutate(account.id))
            setRowSelection({})
        }
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AppSidebarComponent onLogout={handleLogout} />

            <div className="flex min-w-0 flex-1 flex-col">
                <AppTopBarComponent
                    title="Sources de revenu"
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    searchPlaceholder="Rechercher une source..."
                />

                <main className="min-w-0 flex-1 space-y-6 p-6">
                    <header className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">Sources de revenu</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Gérez vos sources de revenu</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={handleToggleSelected}
                                disabled={selectedAccounts.length === 0 || apiDeactivateAccount.isPending || apiActivateAccount.isPending}
                                title={selectedAccounts.length === 0 ? 'Sélectionnez une ou plusieurs sources' : undefined}
                                className="rounded-lg"
                            >
                                {isActivation ? <Power className="size-4" /> : <PowerOff className="size-4" />}
                                {isActivation ? 'Activer' : 'Désactiver'}
                            </Button>
                            <Button onClick={openCreateDialog} className="rounded-lg bg-blue-600 hover:bg-blue-700">
                                <Plus className="size-4" />
                                Ajouter une source de revenu
                            </Button>
                        </div>
                    </header>

                    <AccountsListComponent
                        accounts={filteredAccounts}
                        accountTypes={accountTypes ?? []}
                        isLoading={isLoading}
                        onEdit={openEditDialog}
                        onDelete={handleDelete}
                        onDeleteSelected={handleDeleteSelected}
                        rowSelection={rowSelection}
                        onRowSelectionChange={setRowSelection}
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
