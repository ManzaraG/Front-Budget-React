import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { transactionApi } from '../api/transaction.api'
import { TRANSACTIONS_QUERY_KEY } from './use-transactions-query.hook'

export const useDeleteTransactionApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => transactionApi.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY })
            toast.success('Transaction supprimée')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
