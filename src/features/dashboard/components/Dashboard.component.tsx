import { useMemo, useState } from 'react'
import { AppSidebarComponent } from '@/shared/components/layout'
import { useLogoutHook } from '@/shared/hooks'
import { TransactionFormDialogComponent } from '@/features/transactions'
import { useDashboardHook } from '../hooks/use-dashboard.hook'
import { AccountSummaryCardsComponent } from './AccountSummaryCards.component'
import { AnalyticsChartCardComponent } from './AnalyticsChartCard.component'
import { BudgetSummaryPanelComponent } from './BudgetSummaryPanel.component'
import { DashboardHeaderComponent } from './DashboardHeader.component'
import { DashboardTopBarComponent } from './DashboardTopBar.component'
import { TransactionsTableComponent } from './TransactionsTable.component'

const formatMonthLabel = (date: Date) => {
    const label = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    return label.charAt(0).toUpperCase() + label.slice(1)
}

export const DashboardComponent = () => {
    const handleLogout = useLogoutHook()
    const [selectedMonth, setSelectedMonth] = useState(() => new Date())
    const {
        utilisateur,
        hasAccounts,
        accounts,
        allCategories,
        accountShares,
        monthlyFlow,
        categories,
        revenusCeMois,
        depensesCeMois,
        transactions,
    } = useDashboardHook(selectedMonth)

    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredTransactions = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return transactions
        return transactions.filter(
            (transaction) =>
                transaction.description.toLowerCase().includes(query) ||
                transaction.categorie.toLowerCase().includes(query) ||
                transaction.compte.toLowerCase().includes(query)
        )
    }, [transactions, searchQuery])

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AppSidebarComponent onLogout={handleLogout} />

            <div className="min-w-0 flex-1 space-y-6 p-6">
                <DashboardTopBarComponent
                    utilisateur={utilisateur}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                <DashboardHeaderComponent
                    selectedMonth={selectedMonth}
                    onSelectedMonthChange={setSelectedMonth}
                    onAddTransaction={() => setIsAddTransactionOpen(true)}
                    canAddTransaction={hasAccounts}
                />

                <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_320px]">
                    <main className="min-w-0 space-y-6">
                        <AccountSummaryCardsComponent accounts={accountShares} />

                        <AnalyticsChartCardComponent data={monthlyFlow} />

                        <TransactionsTableComponent transactions={filteredTransactions} />
                    </main>

                    <aside className="min-w-0">
                        <BudgetSummaryPanelComponent
                            hasAccounts={hasAccounts}
                            monthLabel={formatMonthLabel(selectedMonth)}
                            revenusCeMois={revenusCeMois}
                            depensesCeMois={depensesCeMois}
                            accounts={accountShares}
                            categories={categories}
                        />
                    </aside>
                </div>
            </div>

            <TransactionFormDialogComponent
                open={isAddTransactionOpen}
                onOpenChange={setIsAddTransactionOpen}
                transaction={null}
                accounts={accounts}
                categories={allCategories}
            />
        </div>
    )
}
