import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { accountApi } from '../api/account.api'
import { ACCOUNTS_QUERY_KEY } from './use-accounts-query.hook'
import type { UpdateComptePayload } from '../types/account.type'

export const useUpdateAccountApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, dto }: { id: string; dto: UpdateComptePayload }) => accountApi.update(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY })
            toast.success('Compte mis à jour avec succès')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
