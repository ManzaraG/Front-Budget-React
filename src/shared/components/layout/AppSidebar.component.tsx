import { Link, useLocation } from 'react-router-dom'
import { ArrowRightLeft, BarChart3, Home, LogOut, Settings, Tags, Wallet, type LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface NavItem {
    icon: LucideIcon
    label: string
    to?: string
}

const NAV_ITEMS: NavItem[] = [
    { icon: Home, label: 'Tableau de bord', to: '/' },
    { icon: Wallet, label: 'Comptes', to: '/accounts' },
    { icon: ArrowRightLeft, label: 'Transactions', to: '/transactions' },
    { icon: Tags, label: 'Catégories', to: '/categories' },
    { icon: Settings, label: 'Paramètres' },
]

interface AppSidebarProps {
    onLogout: () => void
}

export const AppSidebarComponent = ({ onLogout }: AppSidebarProps) => {
    const { pathname } = useLocation()

    return (
        <aside className="flex w-16 shrink-0 flex-col justify-between border-r bg-white px-2 py-6 lg:w-64 lg:px-4">
            <div className="space-y-8">
                <div className="flex items-center justify-center gap-2 px-0 lg:justify-start lg:px-2">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                        <BarChart3 className="size-5" />
                    </span>
                    <span className="hidden text-lg font-bold text-slate-900 lg:inline">Mon Budget</span>
                </div>

                <nav className="space-y-1">
                    {NAV_ITEMS.map(({ icon: Icon, label, to }) => {
                        const active = !!to && (to === '/' ? pathname === '/' : pathname.startsWith(to))
                        const itemClassName = cn(
                            'flex w-full items-center justify-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium transition-colors lg:justify-start',
                            active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        )

                        if (!to) {
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    title={label}
                                    disabled
                                    className={cn(itemClassName, 'cursor-not-allowed opacity-40')}
                                >
                                    <Icon className="size-4.5 shrink-0" />
                                    <span className="hidden lg:inline">{label}</span>
                                </button>
                            )
                        }

                        return (
                            <Link key={label} to={to} title={label} className={itemClassName}>
                                <Icon className="size-4.5 shrink-0" />
                                <span className="hidden lg:inline">{label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="space-y-1">
                <button
                    type="button"
                    title="Se déconnecter"
                    onClick={onLogout}
                    className="flex w-full items-center justify-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600 lg:justify-start"
                >
                    <LogOut className="size-4.5 shrink-0" />
                    <span className="hidden lg:inline">Se déconnecter</span>
                </button>
            </div>
        </aside>
    )
}
