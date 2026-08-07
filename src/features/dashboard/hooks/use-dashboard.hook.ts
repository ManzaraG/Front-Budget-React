import { Bus, Film, Home, ShoppingCart, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { getUtilisateurConnecte } from '@/shared/storage'
import type { BalancePoint, CategorySpend, ExchangeRate, RecentTransaction, StatCardData } from '../types/dashboard.type'

// TODO: brancher sur l'API budget une fois les endpoints Comptes/Transactions disponibles
const MOCK_STATS: StatCardData[] = [
    {
        id: 'solde',
        label: 'Solde total',
        value: '12 450 €',
        description: 'Tous comptes confondus',
        icon: Wallet,
        iconBgClassName: 'bg-blue-50',
        iconColorClassName: 'text-blue-600',
    },
    {
        id: 'revenus',
        label: 'Revenus',
        value: '3 200 €',
        description: 'Ce mois-ci',
        icon: TrendingUp,
        iconBgClassName: 'bg-emerald-50',
        iconColorClassName: 'text-emerald-600',
        valueClassName: 'text-emerald-600',
    },
    {
        id: 'depenses',
        label: 'Dépenses',
        value: '1 845 €',
        description: 'Ce mois-ci',
        icon: TrendingDown,
        iconBgClassName: 'bg-red-50',
        iconColorClassName: 'text-red-600',
        valueClassName: 'text-red-600',
    },
]

const MOCK_BALANCE_HISTORY: BalancePoint[] = [
    { label: 'Mars 2026', value: 8000 },
    { label: 'Avril 2026', value: 9200 },
    { label: 'Mai 2026', value: 9800 },
    { label: 'Juin 2026', value: 10500 },
    { label: 'Juillet 2026', value: 11200 },
    { label: 'Août 2026', value: 12450 },
]

const MOCK_CATEGORIES: CategorySpend[] = [
    { id: 'logement', label: 'Logement', value: 680, percent: 36.8, colorClassName: 'text-blue-600', dotClassName: 'bg-blue-600' },
    { id: 'alimentation', label: 'Alimentation', value: 420, percent: 22.8, colorClassName: 'text-emerald-500', dotClassName: 'bg-emerald-500' },
    { id: 'transports', label: 'Transports', value: 210, percent: 11.4, colorClassName: 'text-amber-400', dotClassName: 'bg-amber-400' },
    { id: 'loisirs', label: 'Loisirs', value: 200, percent: 10.8, colorClassName: 'text-violet-500', dotClassName: 'bg-violet-500' },
    { id: 'sante', label: 'Santé', value: 150, percent: 8.1, colorClassName: 'text-rose-500', dotClassName: 'bg-rose-500' },
    { id: 'autres', label: 'Autres', value: 185, percent: 10.0, colorClassName: 'text-slate-400', dotClassName: 'bg-slate-400' },
]

const MOCK_TRANSACTIONS: RecentTransaction[] = [
    {
        id: '1',
        date: '31 août 2026',
        description: 'Salaire',
        categorie: 'Revenus',
        compte: 'Compte courant',
        montant: 3200,
        icon: TrendingUp,
        iconBgClassName: 'bg-emerald-50',
        iconColorClassName: 'text-emerald-600',
        dotClassName: 'bg-emerald-600',
    },
    {
        id: '2',
        date: '30 août 2026',
        description: 'Supermarché',
        categorie: 'Alimentation',
        compte: 'Compte courant',
        montant: -78.64,
        icon: ShoppingCart,
        iconBgClassName: 'bg-emerald-50',
        iconColorClassName: 'text-emerald-500',
        dotClassName: 'bg-emerald-500',
    },
    {
        id: '3',
        date: '28 août 2026',
        description: 'Loyer',
        categorie: 'Logement',
        compte: 'Compte courant',
        montant: -680,
        icon: Home,
        iconBgClassName: 'bg-blue-50',
        iconColorClassName: 'text-blue-600',
        dotClassName: 'bg-blue-600',
    },
    {
        id: '4',
        date: '27 août 2026',
        description: 'Abonnement transports',
        categorie: 'Transports',
        compte: 'Compte courant',
        montant: -49,
        icon: Bus,
        iconBgClassName: 'bg-amber-50',
        iconColorClassName: 'text-amber-500',
        dotClassName: 'bg-amber-400',
    },
    {
        id: '5',
        date: '25 août 2026',
        description: 'Cinéma',
        categorie: 'Loisirs',
        compte: 'Carte bancaire',
        montant: -12.5,
        icon: Film,
        iconBgClassName: 'bg-violet-50',
        iconColorClassName: 'text-violet-500',
        dotClassName: 'bg-violet-500',
    },
]

const MOCK_EXCHANGE_RATE: ExchangeRate = {
    pair: 'EUR / USD',
    rate: '1,09',
    changePercent: '+0,32 %',
}

export const useDashboardHook = () => {
    const utilisateur = getUtilisateurConnecte()

    return {
        utilisateur,
        stats: MOCK_STATS,
        balanceHistory: MOCK_BALANCE_HISTORY,
        categories: MOCK_CATEGORIES,
        totalDepenses: MOCK_CATEGORIES.reduce((sum, category) => sum + category.value, 0),
        transactions: MOCK_TRANSACTIONS,
        exchangeRate: MOCK_EXCHANGE_RATE,
    }
}
