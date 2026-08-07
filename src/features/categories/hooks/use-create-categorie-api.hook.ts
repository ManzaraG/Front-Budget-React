import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { categorieApi } from '../api/categorie.api'
import { CATEGORIES_QUERY_KEY } from './use-categories-query.hook'
import type { CreateCategoriePayload } from '../types/categorie.type'

export const useCreateCategorieApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dto: CreateCategoriePayload) => categorieApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
            toast.success('Catégorie créée avec succès')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
