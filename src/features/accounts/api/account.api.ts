import { apiClient } from '@/shared/lib/axios'
import type { PagedResult } from '@/shared/types'
import type { CompteDto, CreateComptePayload, UpdateComptePayload } from '../types/account.type'

export const accountApi = {
    getAll: async (): Promise<CompteDto[]> => {
        const { data } = await apiClient.get<PagedResult<CompteDto>>('/api/accounts', {
            params: { page: 1, pageSize: 100 },
        })
        return data.items
    },
    create: async (dto: CreateComptePayload): Promise<CompteDto> => {
        const { data } = await apiClient.post<CompteDto>('/api/accounts', dto)
        return data
    },
    update: async (id: string, dto: UpdateComptePayload): Promise<CompteDto> => {
        const { data } = await apiClient.put<CompteDto>(`/api/accounts/${id}`, dto)
        return data
    },
    remove: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/accounts/${id}`)
    },
}
