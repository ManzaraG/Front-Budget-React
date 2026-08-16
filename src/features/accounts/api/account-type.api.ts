import { apiClient } from '@/shared/lib/axios'
import type { PagedResult } from '@/shared/types'
import type { AccountTypeDto } from '../types/account.type'

export const accountTypeApi = {
    getAll: async (): Promise<AccountTypeDto[]> => {
        const { data } = await apiClient.get<PagedResult<AccountTypeDto>>('/api/account-types', {
            params: { page: 1, pageSize: 100 },
        })
        return data.items
    },
}
