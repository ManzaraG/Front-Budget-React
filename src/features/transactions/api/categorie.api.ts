import { apiClient } from '@/shared/lib/axios'
import type { CategorieDto } from '../types/categorie.type'

export const categorieApi = {
    getAll: async (): Promise<CategorieDto[]> => {
        const { data } = await apiClient.get<CategorieDto[]>('/api/categories')
        return data
    },
}
