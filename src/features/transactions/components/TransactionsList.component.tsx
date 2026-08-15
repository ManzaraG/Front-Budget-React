import { ArrowDownLeft, ArrowUpRight, Pencil, Receipt, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { formatCurrency } from '@/shared/lib/currency'
import { cn } from '@/shared/lib/utils'
import type { CompteDto } from '@/features/accounts'
import type { CategorieDto } from '@/features/categories'
import type { TransactionDto } from '../types/transaction.type'

interface TransactionsListProps {
    transactions: TransactionDto[]
    accounts: CompteDto[]
    categories: CategorieDto[]
    isLoading: boolean
    onEdit: (transaction: TransactionDto) => void
    onDelete: (transaction: TransactionDto) => void
}

export const TransactionsListComponent = ({
    transactions,
    accounts,
    categories,
    isLoading,
    onEdit,
    onDelete,
}: TransactionsListProps) => {
    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Chargement des transactions...</p>
    }

    if (transactions.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                    <Receipt className="size-8" />
                    <p>Aucune transaction pour le moment</p>
                </CardContent>
            </Card>
        )
    }

    const getCompteNom = (id: string) => accounts.find((account) => account.id === id)?.nom ?? '—'
    const getCategorieNom = (id: string | null) =>
        id ? (categories.find((categorie) => categorie.id === id)?.nom ?? '—') : '—'

    return (
        <Card>
            <CardContent className="overflow-x-auto px-0">
                <table className="w-full min-w-180 border-collapse text-sm">
                    <thead>
                        <tr className="border-b text-left text-xs text-muted-foreground">
                            <th scope="col" className="px-6 py-2 font-medium">Date</th>
                            <th scope="col" className="px-6 py-2 font-medium">Description</th>
                            <th scope="col" className="px-6 py-2 font-medium">Catégorie</th>
                            <th scope="col" className="px-6 py-2 font-medium">Compte</th>
                            <th scope="col" className="px-6 py-2 text-right font-medium">Montant</th>
                            <th scope="col" className="w-24 px-6 py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => {
                            const isRevenu = transaction.type === 0

                            return (
                                <tr key={transaction.id} className="border-b last:border-0 hover:bg-blue-50/40">
                                    <td className="px-6 py-3 whitespace-nowrap text-muted-foreground">
                                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                                    </td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                className={cn(
                                                    'flex size-8 shrink-0 items-center justify-center rounded-lg',
                                                    isRevenu ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                )}
                                            >
                                                {isRevenu ? (
                                                    <ArrowUpRight className="size-4" />
                                                ) : (
                                                    <ArrowDownLeft className="size-4" />
                                                )}
                                            </span>
                                            <span className="font-medium">
                                                {transaction.description || getCategorieNom(transaction.categorieId)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">
                                        <span className="inline-flex items-center gap-1.5">
                                            <span
                                                className={cn(
                                                    'size-1.5 rounded-full',
                                                    isRevenu ? 'bg-emerald-600' : 'bg-red-600'
                                                )}
                                            />
                                            {getCategorieNom(transaction.categorieId)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">{getCompteNom(transaction.compteId)}</td>
                                    <td
                                        className={cn(
                                            'px-6 py-3 text-right font-semibold whitespace-nowrap',
                                            isRevenu ? 'text-emerald-600' : 'text-red-600'
                                        )}
                                    >
                                        {isRevenu ? '+ ' : '- '}
                                        {formatCurrency(Math.abs(Number(transaction.montant)))}
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(transaction)}
                                                title="Modifier"
                                            >
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onDelete(transaction)}
                                                title="Supprimer"
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="size-4" />
                                            </Button>
                                        </div>
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
