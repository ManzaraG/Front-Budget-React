import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { categorieApi } from '../api/categorie.api'
import { CATEGORIES_QUERY_KEY } from './use-categories-query.hook'
import type { UpdateCategoriePayload } from '../types/categorie.type'

export const useUpdateCategorieApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, dto }: { id: string; dto: UpdateCategoriePayload }) => categorieApi.update(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY })
            toast.success('Catégorie mise à jour avec succès')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
