import { TrendingDown, TrendingUp } from 'lucide-react'
import { useQueries } from '@tanstack/react-query'
import { getUtilisateurConnecte } from '@/shared/storage'
import { useAccountsQuery } from '@/features/accounts'
import { useCategoriesQuery } from '@/features/categories'
import { TRANSACTIONS_QUERY_KEY } from '@/features/transactions'
import { dashboardApi } from '../api/dashboard.api'
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
    { iconBgClassName: 'bg-blue-50 dark:bg-blue-950', iconColorClassName: 'text-blue-600', barClassName: 'bg-blue-600' },
    { iconBgClassName: 'bg-violet-50 dark:bg-violet-950', iconColorClassName: 'text-violet-500', barClassName: 'bg-violet-500' },
    { iconBgClassName: 'bg-amber-50 dark:bg-amber-950', iconColorClassName: 'text-amber-500', barClassName: 'bg-amber-400' },
    { iconBgClassName: 'bg-rose-50 dark:bg-rose-950', iconColorClassName: 'text-rose-500', barClassName: 'bg-rose-500' },
    { iconBgClassName: 'bg-emerald-50 dark:bg-emerald-950', iconColorClassName: 'text-emerald-600', barClassName: 'bg-emerald-500' },
    { iconBgClassName: 'bg-slate-100 dark:bg-slate-800', iconColorClassName: 'text-slate-500', barClassName: 'bg-slate-400' },
]

const formatMonthLabel = (date: Date) => {
    const label = date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    return label.charAt(0).toUpperCase() + label.slice(1)
}

// Les clés sont préfixées par celle des transactions : toute écriture sur une transaction rafraîchit le dashboard.
const DASHBOARD_QUERY_KEY = [...TRANSACTIONS_QUERY_KEY, 'dashboard']

export const useDashboardHook = (selectedMonth: Date) => {
    const utilisateur = getUtilisateurConnecte()
    const period = { annee: selectedMonth.getFullYear(), mois: selectedMonth.getMonth() + 1 }

    const { data: accounts } = useAccountsQuery()
    const { data: categories } = useCategoriesQuery()

    const [monthly, trend, accountsBudget, categoriesBudget, recent] = useQueries({
        queries: [
            { queryKey: [...DASHBOARD_QUERY_KEY, 'monthly', period], queryFn: () => dashboardApi.getMonthly(period) },
            { queryKey: [...DASHBOARD_QUERY_KEY, 'trend', period], queryFn: () => dashboardApi.getTrend(period) },
            { queryKey: [...DASHBOARD_QUERY_KEY, 'accounts', period], queryFn: () => dashboardApi.getAccounts(period) },
            { queryKey: [...DASHBOARD_QUERY_KEY, 'categories', period], queryFn: () => dashboardApi.getCategories(period) },
            { queryKey: [...DASHBOARD_QUERY_KEY, 'recent', period], queryFn: () => dashboardApi.getRecentTransactions(period) },
        ],
    })

    const accountShares: AccountShare[] = (accountsBudget.data ?? []).map((account, index) => ({
        id: account.sourceRevenuId,
        nom: account.nom,
        montant: account.montant,
        percent: account.pourcentage,
        ...ACCOUNT_COLORS[index % ACCOUNT_COLORS.length],
    }))

    const monthlyFlow: MonthlyFlow[] = (trend.data ?? []).map((point) => ({
        label: formatMonthLabel(new Date(point.annee, point.mois - 1, 1)),
        revenus: point.totalRevenus,
        depenses: point.totalDepenses,
    }))

    const categoriesSpend: CategorySpend[] = (categoriesBudget.data ?? []).map((categorie, index) => ({
        id: categorie.categorieId,
        label: categorie.nom,
        value: categorie.montant,
        percent: categorie.pourcentage,
        ...CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }))

    const recentTransactions: RecentTransaction[] = (recent.data ?? []).map((transaction) => {
        const isRevenu = transaction.type === 'Revenu'

        return {
            id: transaction.id,
            date: new Date(transaction.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            description: transaction.description || transaction.categorieNom,
            categorie: transaction.categorieNom,
            compte: transaction.sourcesRevenu.join(', '),
            montant: isRevenu ? transaction.montant : -transaction.montant,
            icon: isRevenu ? TrendingUp : TrendingDown,
            iconBgClassName: isRevenu ? 'bg-emerald-50 dark:bg-emerald-950' : 'bg-red-50 dark:bg-red-950',
            iconColorClassName: isRevenu ? 'text-emerald-600' : 'text-red-600',
            dotClassName: isRevenu ? 'bg-emerald-600' : 'bg-red-600',
        }
    })

    return {
        utilisateur,
        isLoading: [monthly, trend, accountsBudget, categoriesBudget, recent].some((query) => query.isLoading),
        hasAccounts: (accounts ?? []).length > 0,
        accounts: accounts ?? [],
        allCategories: categories ?? [],
        accountShares,
        monthlyFlow,
        categories: categoriesSpend,
        revenusCeMois: monthly.data?.totalRevenus ?? 0,
        depensesCeMois: monthly.data?.totalDepenses ?? 0,
        transactions: recentTransactions,
    }
}
