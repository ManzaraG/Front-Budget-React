import { useDashboardHook } from '../hooks/use-dashboard.hook'
import { BalanceChartCardComponent } from './BalanceChartCard.component'
import { CategoryChartCardComponent } from './CategoryChartCard.component'
import { DashboardHeaderComponent } from './DashboardHeader.component'
import { DashboardSidebarComponent } from './DashboardSidebar.component'
import { StatCardComponent } from './StatCard.component'
import { TransactionsTableComponent } from './TransactionsTable.component'

export const DashboardComponent = () => {
    const { utilisateur, stats, balanceHistory, categories, totalDepenses, transactions, exchangeRate, handleLogout } =
        useDashboardHook()

    return (
        <div className="flex min-h-screen bg-slate-50">
            <DashboardSidebarComponent exchangeRate={exchangeRate} onLogout={handleLogout} />

            <main className="min-w-0 flex-1 space-y-6 p-6">
                <DashboardHeaderComponent utilisateur={utilisateur} />

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
        </div>
    )
}
