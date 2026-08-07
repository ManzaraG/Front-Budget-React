import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { categorieApi } from '../api/categorie.api'
import { CATEGORIES_QUERY_KEY } from './use-categories-query.hook'

export const useDeleteCategorieApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => categorieApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
            toast.success('Catégorie supprimée')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
