import type { ReactNode } from 'react'
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
    { icon: Tags, label: 'Catégories' },
    { icon: Settings, label: 'Paramètres' },
]

interface AppSidebarProps {
    onLogout: () => void
    children?: ReactNode
}

export const AppSidebarComponent = ({ onLogout, children }: AppSidebarProps) => {
    const { pathname } = useLocation()

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
                    {NAV_ITEMS.map(({ icon: Icon, label, to }) => {
                        const active = !!to && (to === '/' ? pathname === '/' : pathname.startsWith(to))
                        const itemClassName = cn(
                            'flex w-full items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors lg:justify-start',
                            active ? 'bg-blue-600 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                        )

                        if (!to) {
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    title={label}
                                    disabled
                                    className={cn(itemClassName, 'cursor-not-allowed opacity-50')}
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
                {children}

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
