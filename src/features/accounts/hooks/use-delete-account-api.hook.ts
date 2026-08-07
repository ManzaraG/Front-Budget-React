import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { accountApi } from '../api/account.api'
import { ACCOUNTS_QUERY_KEY } from './use-accounts-query.hook'

export const useDeleteAccountApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => accountApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY })
            toast.success('Compte supprimé')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
