import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { transactionApi } from '../api/transaction.api'
import { TRANSACTIONS_QUERY_KEY } from './use-transactions-query.hook'
import type { CreateTransactionPayload } from '../types/transaction.type'

export const useCreateTransactionApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dto: CreateTransactionPayload) => transactionApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY })
            toast.success('Transaction créée avec succès')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
