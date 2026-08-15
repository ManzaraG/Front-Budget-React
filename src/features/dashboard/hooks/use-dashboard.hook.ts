import { TrendingDown, TrendingUp } from 'lucide-react'
import { getUtilisateurConnecte } from '@/shared/storage'
import { useAccountsQuery } from '@/features/accounts'
import { useCategoriesQuery } from '@/features/categories'
import { useAllTransactionsQuery, type TransactionDto } from '@/features/transactions'
import type { AccountShare, CategorySpend, MonthlyFlow, RecentTransaction } from '../types/dashboard.type'

const CATEGORY_COLORS = [
    { colorClassName: 'text-blue-600', dotClassName: 'bg-blue-600' },
    { colorClassName: 'text-emerald-500', dotClassName: 'bg-emerald-500' },
    { colorClassName: 'text-amber-400', dotClassName: 'bg-amber-400' },
    { colorClassName: 'text-violet-500', dotClassName: 'bg-violet-500' },
    { colorClassName: 'text-rose-500', dotClassName: 'bg-rose-500' },
    { colorClassName: 'text-slate-400', dotClassName: 'bg-slate-400' },
]

const ACCOUNT_COLORS = [
    { iconBgClassName: 'bg-blue-50', iconColorClassName: 'text-blue-600', barClassName: 'bg-blue-600' },
    { iconBgClassName: 'bg-violet-50', iconColorClassName: 'text-violet-500', barClassName: 'bg-violet-500' },
    { iconBgClassName: 'bg-amber-50', iconColorClassName: 'text-amber-500', barClassName: 'bg-amber-400' },
    { iconBgClassName: 'bg-rose-50', iconColorClassName: 'text-rose-500', barClassName: 'bg-rose-500' },
    { iconBgClassName: 'bg-emerald-50', iconColorClassName: 'text-emerald-600', barClassName: 'bg-emerald-500' },
    { iconBgClassName: 'bg-slate-100', iconColorClassName: 'text-slate-500', barClassName: 'bg-slate-400' },
]

const formatMonthLabel = (date: Date) => {
    const label = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    return label.charAt(0).toUpperCase() + label.slice(1)
}

const isSameMonth = (date: Date, reference: Date) =>
    date.getFullYear() === reference.getFullYear() && date.getMonth() === reference.getMonth()

// L'API stocke toujours un montant positif ; le signe est dérivé du type (0 = Revenu, 1 = Dépense).
const signedMontant = (transaction: TransactionDto) =>
    transaction.type === 0 ? Math.abs(Number(transaction.montant)) : -Math.abs(Number(transaction.montant))

export const useDashboardHook = (selectedMonth: Date) => {
    const utilisateur = getUtilisateurConnecte()

    const { data: accounts } = useAccountsQuery()
    const { data: categories } = useCategoriesQuery()
    const { data: transactions, isLoading } = useAllTransactionsQuery((accounts ?? []).map((account) => account.id))

    const transactionsDuMois = transactions.filter((transaction) => isSameMonth(new Date(transaction.date), selectedMonth))
    const revenusCeMois = transactionsDuMois
        .filter((transaction) => transaction.type === 0)
        .reduce((sum, transaction) => sum + Math.abs(Number(transaction.montant)), 0)
    const depensesCeMois = transactionsDuMois
        .filter((transaction) => transaction.type === 1)
        .reduce((sum, transaction) => sum + Math.abs(Number(transaction.montant)), 0)

    // Revenu de chacun des comptes sur le mois sélectionné, exprimé en part du total des revenus.
    const revenusParCompte = new Map<string, number>()
    for (const transaction of transactionsDuMois) {
        if (transaction.type !== 0) continue
        revenusParCompte.set(
            transaction.compteId,
            (revenusParCompte.get(transaction.compteId) ?? 0) + Math.abs(Number(transaction.montant))
        )
    }

    const accountShares: AccountShare[] = (accounts ?? []).map((account, index) => {
        const montant = revenusParCompte.get(account.id) ?? 0
        return {
            id: account.id,
            nom: account.nom,
            montant,
            percent: revenusCeMois > 0 ? (montant / revenusCeMois) * 100 : 0,
            ...ACCOUNT_COLORS[index % ACCOUNT_COLORS.length],
        }
    })

    // Revenus / dépenses de chacun des 6 mois se terminant au mois sélectionné (valeurs mensuelles, non cumulées).
    const monthlyFlow: MonthlyFlow[] = Array.from({ length: 6 }, (_, index) => {
        const offset = 5 - index
        const monthDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - offset, 1)
        const monthTransactions = transactions.filter((transaction) => isSameMonth(new Date(transaction.date), monthDate))

        return {
            label: formatMonthLabel(monthDate),
            revenus: monthTransactions
                .filter((transaction) => transaction.type === 0)
                .reduce((sum, transaction) => sum + Math.abs(Number(transaction.montant)), 0),
            depenses: monthTransactions
                .filter((transaction) => transaction.type === 1)
                .reduce((sum, transaction) => sum + Math.abs(Number(transaction.montant)), 0),
        }
    })

    const categorieNom = (categorieId: string | null) => {
        if (!categorieId) return 'Sans catégorie'
        return (categories ?? []).find((categorie) => categorie.id === categorieId)?.nom ?? 'Sans catégorie'
    }

    const depensesParCategorie = new Map<string, number>()
    for (const transaction of transactionsDuMois) {
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

    const recentTransactions: RecentTransaction[] = [...transactionsDuMois]
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
        accountShares,
        monthlyFlow,
        categories: categoriesSpend,
        revenusCeMois,
        depensesCeMois,
        transactions: recentTransactions,
    }
}
