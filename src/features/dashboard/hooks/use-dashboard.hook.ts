import { TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { getUtilisateurConnecte } from '@/shared/storage'
import { useAccountsQuery } from '@/features/accounts'
import { useCategoriesQuery } from '@/features/categories'
import { useAllTransactionsQuery, type TransactionDto } from '@/features/transactions'
import type { BalancePoint, CategorySpend, RecentTransaction, StatCardData } from '../types/dashboard.type'

const CATEGORY_COLORS = [
    { colorClassName: 'text-blue-600', dotClassName: 'bg-blue-600' },
    { colorClassName: 'text-emerald-500', dotClassName: 'bg-emerald-500' },
    { colorClassName: 'text-amber-400', dotClassName: 'bg-amber-400' },
    { colorClassName: 'text-violet-500', dotClassName: 'bg-violet-500' },
    { colorClassName: 'text-rose-500', dotClassName: 'bg-rose-500' },
    { colorClassName: 'text-slate-400', dotClassName: 'bg-slate-400' },
]

const formatCurrency = (value: number) => value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })

const formatMonthLabel = (date: Date) => {
    const label = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    return label.charAt(0).toUpperCase() + label.slice(1)
}

const isSameMonth = (date: Date, reference: Date) =>
    date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth()

// L'API stocke toujours un montant positif ; le signe est dérivé du type (0 = Revenu, 1 = Dépense).
const signedMontant = (transaction: TransactionDto) =>
    transaction.type === 0 ? Math.abs(Number(transaction.montant)) : -Math.abs(Number(transaction.montant))

export const useDashboardHook = () => {
    const utilisateur = getUtilisateurConnecte()

    const { data: accounts } = useAccountsQuery()
    const { data: categories } = useCategoriesQuery()
    const { data: transactions, isLoading } = useAllTransactionsQuery((accounts ?? []).map((account) => account.id))

    const now = new Date()

    const soldeTotal = transactions.reduce((sum, transaction) => sum + signedMontant(transaction), 0)

    const transactionsCeMois = transactions.filter((transaction) => isSameMonth(new Date(transaction.date), now))
    const revenusCeMois = transactionsCeMois
        .filter((transaction) => transaction.type === 0)
        .reduce((sum, transaction) => sum + Math.abs(Number(transaction.montant)), 0)
    const depensesCeMois = transactionsCeMois
        .filter((transaction) => transaction.type === 1)
        .reduce((sum, transaction) => sum + Math.abs(Number(transaction.montant)), 0)

    const stats: StatCardData[] = [
        {
            id: 'solde',
            label: 'Solde total',
            value: formatCurrency(soldeTotal),
            description: 'Tous comptes confondus',
            icon: Wallet,
            iconBgClassName: 'bg-blue-50',
            iconColorClassName: 'text-blue-600',
        },
        {
            id: 'revenus',
            label: 'Revenus',
            value: formatCurrency(revenusCeMois),
            description: 'Ce mois-ci',
            icon: TrendingUp,
            iconBgClassName: 'bg-emerald-50',
            iconColorClassName: 'text-emerald-600',
            valueClassName: 'text-emerald-600',
        },
        {
            id: 'depenses',
            label: 'Dépenses',
            value: formatCurrency(depensesCeMois),
            description: 'Ce mois-ci',
            icon: TrendingDown,
            iconBgClassName: 'bg-red-50',
            iconColorClassName: 'text-red-600',
            valueClassName: 'text-red-600',
        },
    ]

    // Solde cumulé (toutes transactions confondues) à la fin de chacun des 6 derniers mois.
    const balanceHistory: BalancePoint[] = Array.from({ length: 6 }, (_, index) => {
        const offset = 5 - index
        const monthDate = new Date(now.getFullYear(), now.getMonth() - offset, 1)
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() - offset + 1, 1)
        const balance = transactions
            .filter((transaction) => new Date(transaction.date) < endOfMonth)
            .reduce((sum, transaction) => sum + signedMontant(transaction), 0)

        return { label: formatMonthLabel(monthDate), value: balance }
    })

    const categorieNom = (categorieId: string | null) => {
        if (!categorieId) return 'Sans catégorie'
        return (categories ?? []).find((categorie) => categorie.id === categorieId)?.nom ?? 'Sans catégorie'
    }

    const depensesParCategorie = new Map<string, number>()
    for (const transaction of transactionsCeMois) {
        if (transaction.type !== 1) continue
        const key = transaction.categorieId ?? 'sans-categorie'
        depensesParCategorie.set(key, (depensesParCategorie.get(key) ?? 0) + Math.abs(Number(transaction.montant)))
    }

    const categoriesSpend: CategorySpend[] = Array.from(depensesParCategorie.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([categorieId, value], index) => ({
            id: categorieId,
            label: categorieId === 'sans-categorie' ? 'Sans catégorie' : categorieNom(categorieId),
            value,
            percent: depensesCeMois > 0 ? (value / depensesCeMois) * 100 : 0,
            ...CATEGORY_COLORS[index % CATEGORY_COLORS.length],
        }))

    const compteNom = (compteId: string) => (accounts ?? []).find((account) => account.id === compteId)?.nom ?? 'Compte'

    const recentTransactions: RecentTransaction[] = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
        .map((transaction) => {
            const isRevenu = transaction.type === 0

            return {
                id: transaction.id,
                date: new Date(transaction.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                }),
                description: transaction.description || categorieNom(transaction.categorieId),
                categorie: categorieNom(transaction.categorieId),
                compte: compteNom(transaction.compteId),
                montant: signedMontant(transaction),
                icon: isRevenu ? TrendingUp : TrendingDown,
                iconBgClassName: isRevenu ? 'bg-emerald-50' : 'bg-red-50',
                iconColorClassName: isRevenu ? 'text-emerald-600' : 'text-red-600',
                dotClassName: isRevenu ? 'bg-emerald-600' : 'bg-red-600',
            }
        })

    return {
        utilisateur,
        isLoading,
        hasAccounts: (accounts ?? []).length > 0,
        accounts: accounts ?? [],
        allCategories: categories ?? [],
        categories: categoriesSpend,
        totalDepenses: depensesCeMois,
        stats,
        balanceHistory,
        transactions: recentTransactions,
    }
}
