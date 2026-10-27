import { apiClient } from '@/shared/lib/axios'
import type {
    BilanMensuelDto,
    CategorieBudgetDto,
    DashboardTrendPointDto,
    SourceRevenuBudgetDto,
    TransactionRecenteDto,
} from '../types/dashboard.api.type'

interface PeriodParams {
    annee: number
    mois: number
}

export const dashboardApi = {
    getMonthly: async (params: PeriodParams): Promise<BilanMensuelDto> => {
        const { data } = await apiClient.get<BilanMensuelDto>('/api/dashboard/monthly', { params })
        return data
    },
    getTrend: async (params: PeriodParams, nombreMois = 6): Promise<DashboardTrendPointDto[]> => {
        const { data } = await apiClient.get<DashboardTrendPointDto[]>('/api/dashboard/trend', {
            params: { ...params, nombreMois },
        })
        return data
    },
    getAccounts: async (params: PeriodParams): Promise<SourceRevenuBudgetDto[]> => {
        const { data } = await apiClient.get<SourceRevenuBudgetDto[]>('/api/dashboard/accounts', { params })
        return data
    },
    getCategories: async (params: PeriodParams): Promise<CategorieBudgetDto[]> => {
        const { data } = await apiClient.get<CategorieBudgetDto[]>('/api/dashboard/categories', { params })
        return data
    },
    getRecentTransactions: async (params: PeriodParams, limite = 5): Promise<TransactionRecenteDto[]> => {
        const { data } = await apiClient.get<TransactionRecenteDto[]>('/api/dashboard/recent-transactions', {
            params: { ...params, limite },
        })
        return data
    },
}
