import { useQueries } from '@tanstack/react-query'
import { transactionApi } from '../api/transaction.api'
import { TRANSACTIONS_QUERY_KEY } from './use-transactions-query.hook'
import type { TransactionDto } from '../types/transaction.type'

export const useAllTransactionsQuery = (compteIds: string[]) => {
    const results = useQueries({
        queries: compteIds.map((compteId) => ({
            queryKey: [...TRANSACTIONS_QUERY_KEY, compteId],
            queryFn: () => transactionApi.getAll(compteId),
        })),
    })

    // Une transaction répartie sur plusieurs comptes ressort de la requête de chacun de ces comptes.
    const uniqueTransactions = new Map<string, TransactionDto>()
    for (const result of results) {
        for (const transaction of result.data ?? []) {
            uniqueTransactions.set(transaction.id, transaction)
        }
    }

    return {
        data: Array.from(uniqueTransactions.values()),
        isLoading: compteIds.length > 0 && results.some((result) => result.isLoading),
    }
}
