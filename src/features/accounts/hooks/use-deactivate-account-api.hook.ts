import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { accountApi } from '../api/account.api'
import { ACCOUNTS_QUERY_KEY } from './use-accounts-query.hook'

export const useDeactivateAccountApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => accountApi.deactivate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY })
            toast.success('Source de revenu désactivée')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
