import { MoreVertical } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import type { RecentTransaction } from '../types/dashboard.type'

interface TransactionsTableProps {
    transactions: RecentTransaction[]
}

export const TransactionsTableComponent = ({ transactions }: TransactionsTableProps) => {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between gap-2">
                <CardTitle>Transactions récentes</CardTitle>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
                    Voir toutes les transactions
                </a>
            </CardHeader>
            <CardContent className="overflow-x-auto px-0">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                    <thead>
                        <tr className="border-b text-left text-xs text-muted-foreground">
                            <th className="px-6 py-2 font-medium">Date</th>
                            <th className="px-6 py-2 font-medium">Description</th>
                            <th className="px-6 py-2 font-medium">Catégorie</th>
                            <th className="px-6 py-2 font-medium">Compte</th>
                            <th className="px-6 py-2 text-right font-medium">Montant</th>
                            <th className="w-10 px-6 py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => {
                            const isCredit = transaction.montant >= 0
                            const Icon = transaction.icon

                            return (
                                <tr key={transaction.id} className="border-b last:border-0 hover:bg-blue-50/40">
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
                                        {Math.abs(transaction.montant).toLocaleString('fr-FR', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <button type="button" className="text-muted-foreground hover:text-foreground">
                                            <MoreVertical className="size-4" />
                                        </button>
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
