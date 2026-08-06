import { ArrowRightLeft, BarChart3, Home, LogOut, Settings, Tags, Wallet } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import type { ExchangeRate } from '../types/dashboard.type'

interface DashboardSidebarProps {
    exchangeRate: ExchangeRate
    onLogout: () => void
}

const NAV_ITEMS = [
    { icon: Home, label: 'Tableau de bord', active: true },
    { icon: Wallet, label: 'Comptes' },
    { icon: ArrowRightLeft, label: 'Transactions' },
    { icon: Tags, label: 'Catégories' },
    { icon: Settings, label: 'Paramètres' },
]

export const DashboardSidebarComponent = ({ exchangeRate, onLogout }: DashboardSidebarProps) => {
    return (
        <aside className="flex w-16 shrink-0 flex-col justify-between bg-[#0e1a3a] px-2 py-6 text-white lg:w-64 lg:px-4">
            <div className="space-y-8">
                <div className="flex items-center justify-center gap-2 px-0 lg:justify-start lg:px-2">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-600">
                        <BarChart3 className="size-5" />
                    </span>
                    <span className="hidden text-lg font-bold lg:inline">Mon Budget</span>
                </div>

                <nav className="space-y-1">
                    {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
                        <button
                            key={label}
                            type="button"
                            title={label}
                            className={cn(
                                'flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:justify-start',
                                active ? 'bg-blue-600 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                            )}
                        >
                            <Icon className="size-4.5 shrink-0" />
                            <span className="hidden lg:inline">{label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="space-y-1">
                <div className="hidden rounded-xl bg-white/5 px-4 py-3 lg:block">
                    <p className="text-xs text-white/50">Taux de change</p>
                    <div className="mt-1 flex items-baseline justify-between">
                        <span className="text-sm font-semibold">{exchangeRate.pair}</span>
                        <span className="text-sm font-semibold">{exchangeRate.rate}</span>
                    </div>
                    <p className="text-xs text-emerald-400">{exchangeRate.changePercent}</p>
                </div>

                <button
                    type="button"
                    title="Se déconnecter"
                    onClick={onLogout}
                    className="flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white lg:justify-start"
                >
                    <LogOut className="size-4.5 shrink-0" />
                    <span className="hidden lg:inline">Se déconnecter</span>
                </button>
            </div>
        </aside>
    )
}
