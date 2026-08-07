import { ArrowDownLeft, ArrowUpRight, Pencil, Receipt, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import type { CompteDto } from '@/features/accounts'
import type { CategorieDto } from '../types/categorie.type'
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
            <CardContent className="divide-y p-0">
                {transactions.map((transaction) => {
                    const isRevenu = transaction.type === 1

                    return (
                        <div key={transaction.id} className="flex items-center justify-between gap-4 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <span
                                    className={cn(
                                        'flex size-10 shrink-0 items-center justify-center rounded-lg',
                                        isRevenu ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                    )}
                                >
                                    {isRevenu ? <ArrowUpRight className="size-5" /> : <ArrowDownLeft className="size-5" />}
                                </span>
                                <div>
                                    <p className="font-semibold">
                                        {transaction.description || getCategorieNom(transaction.categorieId)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(transaction.date).toLocaleDateString('fr-FR')} ·{' '}
                                        {getCompteNom(transaction.compteId)} · {getCategorieNom(transaction.categorieId)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={cn('font-semibold', isRevenu ? 'text-emerald-600' : 'text-red-600')}>
                                    {isRevenu ? '+' : '-'}
                                    {Math.abs(Number(transaction.montant)).toLocaleString('fr-FR', {
                                        style: 'currency',
                                        currency: 'EUR',
                                    })}
                                </span>
                                <Button variant="ghost" size="icon" onClick={() => onEdit(transaction)} title="Modifier">
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
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
