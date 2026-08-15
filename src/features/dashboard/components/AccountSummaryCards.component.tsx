import { Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/shared/components/ui/card'
import { formatCurrency } from '@/shared/lib/currency'
import { cn } from '@/shared/lib/utils'
import type { AccountShare } from '../types/dashboard.type'

interface AccountSummaryCardsProps {
    accounts: AccountShare[]
}

export const AccountSummaryCardsComponent = ({ accounts }: AccountSummaryCardsProps) => {
    if (accounts.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
                    <p className="text-sm text-muted-foreground">Aucun compte pour le moment</p>
                    <Link to="/accounts" className="text-sm font-medium text-blue-600 hover:underline">
                        Créer votre premier compte
                    </Link>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {accounts.map((account) => (
                <Card key={account.id} className="py-5">
                    <CardContent className="space-y-4 px-5">
                        <div className="flex items-center gap-2.5">
                            <span
                                className={cn(
                                    'flex size-9 shrink-0 items-center justify-center rounded-xl',
                                    account.iconBgClassName
                                )}
                            >
                                <Wallet className={cn('size-4.5', account.iconColorClassName)} />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm font-semibold">{account.nom}</span>
                        </div>

                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                            <div
                                className={cn('h-full rounded-full', account.barClassName)}
                                style={{ width: `${Math.min(Math.max(account.percent, 2), 100)}%` }}
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold">{formatCurrency(account.montant)}</span>
                            <span className="text-muted-foreground">{account.percent.toFixed(0)} %</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
