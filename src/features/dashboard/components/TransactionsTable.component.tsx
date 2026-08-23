import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { formatCurrency } from '@/shared/lib/currency'
import { cn } from '@/shared/lib/utils'
import type { RecentTransaction } from '../types/dashboard.type'

interface TransactionsTableProps {
    transactions: RecentTransaction[]
}

export const TransactionsTableComponent = ({ transactions }: TransactionsTableProps) => {
    if (transactions.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Transactions récentes</CardTitle>
                </CardHeader>
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                    Aucune transaction pour le moment
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-2">
                <CardTitle>Transactions récentes</CardTitle>
                <Link to="/transactions" className="text-sm font-medium text-blue-600 hover:underline">
                    Voir toutes les transactions
                </Link>
            </CardHeader>
            <CardContent className="overflow-x-auto px-0">
                <table className="w-full min-w-160 border-collapse text-sm">
                    <thead>
                        <tr className="border-b text-left text-xs text-muted-foreground">
                            <th scope="col" className="px-6 py-2 font-medium">Date</th>
                            <th scope="col" className="px-6 py-2 font-medium">Description</th>
                            <th scope="col" className="px-6 py-2 font-medium">Catégorie</th>
                            <th scope="col" className="px-6 py-2 font-medium">Compte</th>
                            <th scope="col" className="px-6 py-2 text-right font-medium">Montant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => {
                            const isCredit = transaction.montant >= 0
                            const Icon = transaction.icon

                            return (
                                <tr key={transaction.id} className="border-b last:border-0 hover:bg-blue-50/40 dark:hover:bg-blue-950/40">
                                    <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">{transaction.date}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                className={cn(
                                                    'flex size-8 shrink-0 items-center justify-center rounded-lg',
                                                    transaction.iconBgClassName
                                                )}
                                            >
                                                <Icon className={cn('size-4', transaction.iconColorClassName)} />
                                            </span>
                                            <span className="font-medium">{transaction.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className={cn('size-1.5 rounded-full', transaction.dotClassName)} />
                                            {transaction.categorie}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">{transaction.compte}</td>
                                    <td
                                        className={cn(
                                            'px-6 py-3 text-right font-semibold whitespace-nowrap',
                                            isCredit ? 'text-emerald-600' : 'text-red-600'
                                        )}
                                    >
                                        {isCredit ? '+ ' : '- '}
                                        {formatCurrency(Math.abs(transaction.montant))}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}
