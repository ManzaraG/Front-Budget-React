import { apiClient } from '@/shared/lib/axios'
import type { PagedResult } from '@/shared/types'
import type { DeviseDto } from '../types/account.type'

export const deviseApi = {
    getAll: async (): Promise<DeviseDto[]> => {
        const { data } = await apiClient.get<PagedResult<DeviseDto>>('/api/devises', {
            params: { page: 1, pageSize: 100 },
        })
        return data.items
    },
}
