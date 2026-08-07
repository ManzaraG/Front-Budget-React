import { apiClient } from '@/shared/lib/axios'
import type { CompteDto, CreateComptePayload, UpdateComptePayload } from '../types/account.type'

export const accountApi = {
    getAll: async (): Promise<CompteDto[]> => {
        const { data } = await apiClient.get<CompteDto[]>('/api/accounts')
        return data
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
