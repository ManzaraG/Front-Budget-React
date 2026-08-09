import { useState } from 'react'
import { AppSidebarComponent } from '@/shared/components/layout'
import { useLogoutHook } from '@/shared/hooks'
import { TransactionFormDialogComponent } from '@/features/transactions'
import { useDashboardHook } from '../hooks/use-dashboard.hook'
import { BalanceChartCardComponent } from './BalanceChartCard.component'
import { CategoryChartCardComponent } from './CategoryChartCard.component'
import { DashboardHeaderComponent } from './DashboardHeader.component'
import { StatCardComponent } from './StatCard.component'
import { TransactionsTableComponent } from './TransactionsTable.component'

export const DashboardComponent = () => {
    const handleLogout = useLogoutHook()
    const {
        utilisateur,
        hasAccounts,
        accounts,
        allCategories,
        stats,
        balanceHistory,
        categories,
        totalDepenses,
        transactions,
    } = useDashboardHook()

    const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AppSidebarComponent onLogout={handleLogout} />

            <main className="min-w-0 flex-1 space-y-6 p-6">
                <DashboardHeaderComponent
                    utilisateur={utilisateur}
                    onAddTransaction={() => setIsAddTransactionOpen(true)}
                    canAddTransaction={hasAccounts}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {stats.map((stat) => (
                        <StatCardComponent key={stat.id} stat={stat} />
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
                    <div className="xl:col-span-3">
                        <BalanceChartCardComponent data={balanceHistory} />
                    </div>
                    <div className="xl:col-span-2">
                        <CategoryChartCardComponent categories={categories} total={totalDepenses} />
                    </div>
                </div>

                <TransactionsTableComponent transactions={transactions} />
            </main>

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
