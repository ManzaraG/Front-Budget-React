import { apiClient } from '@/shared/lib/axios'
import type { CreateTransactionPayload, TransactionDto, UpdateTransactionPayload } from '../types/transaction.type'

export const transactionApi = {
    getAll: async (compteId: string): Promise<TransactionDto[]> => {
        const { data } = await apiClient.get<TransactionDto[]>('/api/transactions', { params: { compteId } })
        return data
    },
    create: async (dto: CreateTransactionPayload): Promise<TransactionDto> => {
        const { data } = await apiClient.post<TransactionDto>('/api/transactions', dto)
        return data
    },
    update: async (id: string, dto: UpdateTransactionPayload): Promise<TransactionDto> => {
        const { data } = await apiClient.put<TransactionDto>(`/api/transactions/${id}`, dto)
        return data
    },
    remove: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/transactions/${id}`)
    },
}
