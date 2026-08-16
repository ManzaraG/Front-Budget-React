import { apiClient } from '@/shared/lib/axios'
import type { PagedResult } from '@/shared/types'
import type { CategorieDto, CreateCategoriePayload, UpdateCategoriePayload } from '../types/categorie.type'

export const categorieApi = {
    getAll: async (): Promise<CategorieDto[]> => {
        const { data } = await apiClient.get<PagedResult<CategorieDto>>('/api/categories', {
            params: { page: 1, pageSize: 100 },
        })
        return data.items
    },
    create: async (dto: CreateCategoriePayload): Promise<CategorieDto> => {
        const { data } = await apiClient.post<CategorieDto>('/api/categories', dto)
        return data
    },
    update: async (id: string, dto: UpdateCategoriePayload): Promise<CategorieDto> => {
        const { data } = await apiClient.put<CategorieDto>(`/api/categories/${id}`, dto)
        return data
    },
    remove: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/categories/${id}`)
    },
}
