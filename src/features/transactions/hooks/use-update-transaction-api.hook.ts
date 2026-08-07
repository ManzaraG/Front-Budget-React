import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { transactionApi } from '../api/transaction.api'
import { TRANSACTIONS_QUERY_KEY } from './use-transactions-query.hook'
import type { UpdateTransactionPayload } from '../types/transaction.type'

export const useUpdateTransactionApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, dto }: { id: string; dto: UpdateTransactionPayload }) => transactionApi.update(id, dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TRANSACTIONS_QUERY_KEY })
            toast.success('Transaction mise à jour avec succès')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
