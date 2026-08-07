import { useQuery } from '@tanstack/react-query'
import { categorieApi } from '../api/categorie.api'

export const CATEGORIES_QUERY_KEY = ['categories']

export const useCategoriesQuery = () => {
    return useQuery({
        queryKey: CATEGORIES_QUERY_KEY,
        queryFn: categorieApi.getAll,
    })
}
