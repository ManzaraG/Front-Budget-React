import { useQueries } from '@tanstack/react-query'
import { transactionApi } from '../api/transaction.api'
import { TRANSACTIONS_QUERY_KEY } from './use-transactions-query.hook'

export const useAllTransactionsQuery = (compteIds: string[]) => {
    const results = useQueries({
        queries: compteIds.map((compteId) => ({
            queryKey: [...TRANSACTIONS_QUERY_KEY, compteId],
            queryFn: () => transactionApi.getAll(compteId),
        })),
    })

    return {
        data: results.flatMap((result) => result.data ?? []),
        isLoading: compteIds.length > 0 && results.some((result) => result.isLoading),
    }
}
