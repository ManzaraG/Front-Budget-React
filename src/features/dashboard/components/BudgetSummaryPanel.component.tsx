import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tags, Wallet } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { formatCurrency } from '@/shared/lib/currency'
import { cn } from '@/shared/lib/utils'
import type { AccountShare, CategorySpend } from '../types/dashboard.type'

interface BudgetSummaryPanelProps {
    hasAccounts: boolean
    monthLabel: string
    revenusCeMois: number
    depensesCeMois: number
    accounts: AccountShare[]
    categories: CategorySpend[]
}

const SIZE = 200
const STROKE = 16
const RADIUS = (SIZE - STROKE) / 2
const CX = SIZE / 2
const CY = SIZE / 2

const arcPoint = (ratio: number) => {
    const angle = (Math.PI * (1 - ratio)) % (Math.PI * 2)
    return { x: CX + RADIUS * Math.cos(angle), y: CY - RADIUS * Math.sin(angle) }
}

export const BudgetSummaryPanelComponent = ({
    hasAccounts,
    monthLabel,
    revenusCeMois,
    depensesCeMois,
    accounts,
    categories,
}: BudgetSummaryPanelProps) => {
    const [tab, setTab] = useState<'comptes' | 'categories'>('comptes')

    const ratio = revenusCeMois > 0 ? depensesCeMois / revenusCeMois : depensesCeMois > 0 ? 1 : 0
    const clampedRatio = Math.min(Math.max(ratio, 0), 1)
    const fillColorClass = ratio >= 1 ? 'stroke-red-500' : ratio >= 0.7 ? 'stroke-amber-400' : 'stroke-emerald-500'
    const start = arcPoint(0)
    const end = arcPoint(clampedRatio)
    const trackPath = `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${arcPoint(1).x} ${arcPoint(1).y}`
    const fillPath = `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`

    const solde = revenusCeMois - depensesCeMois
    const insight = !hasAccounts
        ? {
              tone: 'bg-blue-600',
              title: 'Commencez ici',
              text: 'Créez votre premier compte pour suivre votre budget.',
              action: { to: '/accounts', label: 'Créer un compte' },
          }
        : solde < 0
          ? {
                tone: 'bg-red-600',
                title: 'Attention',
                text: `Vous dépensez ${formatCurrency(Math.abs(solde))} de plus que vos revenus sur ${monthLabel}.`,
                action: { to: '/transactions', label: 'Voir les transactions' },
            }
          : {
                tone: 'bg-blue-600',
                title: 'Bien joué',
                text: `Il vous reste ${formatCurrency(solde)} sur ${monthLabel}.`,
                action: { to: '/transactions', label: 'Voir les transactions' },
            }

    return (
        <Card className="py-6">
            <CardContent className="space-y-6 px-6">
                <div>
                    <h2 className="text-lg font-semibold">Mon Budget</h2>
                    <p className="text-xs text-muted-foreground">{monthLabel}</p>
                </div>

                <div className="flex flex-col items-center">
                    <svg
                        width={SIZE}
                        height={SIZE / 2 + STROKE}
                        viewBox={`0 0 ${SIZE} ${SIZE / 2 + STROKE}`}
                        role="img"
                        aria-label={`${formatCurrency(depensesCeMois)} dépensés sur ${formatCurrency(revenusCeMois)} de revenus, ${monthLabel}`}
                    >
                        <path d={trackPath} fill="none" strokeWidth={STROKE} strokeLinecap="round" className="stroke-slate-100" />
                        <path
                            d={fillPath}
                            fill="none"
                            strokeWidth={STROKE}
                            strokeLinecap="round"
                            className={fillColorClass}
                        />
                        <circle cx={end.x} cy={end.y} r={7} className={cn(fillColorClass.replace('stroke-', 'fill-'))} />
                        <circle cx={end.x} cy={end.y} r={7} fill="none" strokeWidth={3} className="stroke-white" />
                    </svg>

                    <div className="-mt-2 grid w-full grid-cols-2 gap-3 text-center">
                        <div>
                            <p className="text-lg font-bold">{formatCurrency(depensesCeMois)}</p>
                            <p className="text-xs text-muted-foreground">Dépensé</p>
                        </div>
                        <div>
                            <p className="text-lg font-bold">{formatCurrency(revenusCeMois)}</p>
                            <p className="text-xs text-muted-foreground">Revenus</p>
                        </div>
                    </div>
                </div>

                <div className={cn('space-y-2 rounded-2xl p-4 text-white', insight.tone)}>
                    <p className="text-sm font-semibold">{insight.title}</p>
                    <p className="text-xs text-white/80">{insight.text}</p>
                    <Link
                        to={insight.action.to}
                        className="inline-block rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium hover:bg-white/25"
                    >
                        {insight.action.label}
                    </Link>
                </div>

                <div className="flex gap-2 rounded-full bg-muted p-1 text-sm" role="tablist">
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'comptes'}
                        onClick={() => setTab('comptes')}
                        className={cn(
                            'flex-1 rounded-full py-1.5 font-medium transition-colors',
                            tab === 'comptes' ? 'bg-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        Comptes
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={tab === 'categories'}
                        onClick={() => setTab('categories')}
                        className={cn(
                            'flex-1 rounded-full py-1.5 font-medium transition-colors',
                            tab === 'categories' ? 'bg-white shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        )}
                    >
                        Catégories
                    </button>
                </div>

                {tab === 'comptes' ? (
                    <ul className="space-y-3">
                        {accounts.length === 0 && <p className="text-sm text-muted-foreground">Aucun compte</p>}
                        {accounts.map((account) => (
                            <li key={account.id} className="flex items-center gap-3">
                                <span
                                    className={cn(
                                        'flex size-9 shrink-0 items-center justify-center rounded-xl',
                                        account.iconBgClassName
                                    )}
                                >
                                    <Wallet className={cn('size-4', account.iconColorClassName)} />
                                </span>
                                <span className="min-w-0 flex-1 truncate text-sm font-medium">{account.nom}</span>
                                <span className="shrink-0 text-sm font-semibold">{formatCurrency(account.montant)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="space-y-3">
                        {categories.length === 0 && (
                            <p className="text-sm text-muted-foreground">Aucune dépense sur {monthLabel}</p>
                        )}
                        {categories.map((category) => (
                            <li key={category.id} className="flex items-center gap-3">
                                <span className={cn('flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted')}>
                                    <Tags className={cn('size-4', category.colorClassName)} />
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{category.label}</p>
                                    <p className="text-xs text-muted-foreground">{category.percent.toFixed(0)} %</p>
                                </div>
                                <span className="shrink-0 text-sm font-semibold">{formatCurrency(category.value)}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}
