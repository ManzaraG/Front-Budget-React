import { useQuery } from '@tanstack/react-query'
import { categorieApi } from '../api/categorie.api'

export const useCategoriesQuery = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: categorieApi.getAll,
    })
}
