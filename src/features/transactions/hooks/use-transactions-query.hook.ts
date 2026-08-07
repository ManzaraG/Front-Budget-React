import { useQuery } from '@tanstack/react-query'
import { transactionApi } from '../api/transaction.api'

export const TRANSACTIONS_QUERY_KEY = ['transactions']

export const useTransactionsQuery = () => {
    return useQuery({
        queryKey: TRANSACTIONS_QUERY_KEY,
        queryFn: transactionApi.getAll,
    })
}
