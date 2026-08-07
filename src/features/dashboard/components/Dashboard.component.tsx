import { AppSidebarComponent } from '@/shared/components/layout'
import { useLogoutHook } from '@/shared/hooks'
import { useDashboardHook } from '../hooks/use-dashboard.hook'
import { BalanceChartCardComponent } from './BalanceChartCard.component'
import { CategoryChartCardComponent } from './CategoryChartCard.component'
import { DashboardHeaderComponent } from './DashboardHeader.component'
import { StatCardComponent } from './StatCard.component'
import { TransactionsTableComponent } from './TransactionsTable.component'

export const DashboardComponent = () => {
    const handleLogout = useLogoutHook()
    const { utilisateur, stats, balanceHistory, categories, totalDepenses, transactions, exchangeRate } =
        useDashboardHook()

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AppSidebarComponent onLogout={handleLogout}>
                <div className="hidden rounded-xl bg-white/5 px-4 py-3 lg:block">
                    <p className="text-xs text-white/50">Taux de change</p>
                    <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-sm font-semibold">{exchangeRate.pair}</span>
                        <span className="text-sm font-semibold">{exchangeRate.rate}</span>
                    </div>
                    <p className="text-xs text-emerald-400">{exchangeRate.changePercent}</p>
                </div>
            </AppSidebarComponent>

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
