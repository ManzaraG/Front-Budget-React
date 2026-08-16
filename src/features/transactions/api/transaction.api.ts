import { apiClient } from '@/shared/lib/axios'
import type { PagedResult } from '@/shared/types'
import type { CreateTransactionPayload, TransactionDto, UpdateTransactionPayload } from '../types/transaction.type'

interface TransactionWireDto extends Omit<TransactionDto, 'compteId'> {
    sourceRevenuId: string
}

const toTransactionDto = ({ sourceRevenuId, ...wire }: TransactionWireDto): TransactionDto => ({
    ...wire,
    compteId: sourceRevenuId,
})

export const transactionApi = {
    getAll: async (compteId: string): Promise<TransactionDto[]> => {
        const { data } = await apiClient.get<PagedResult<TransactionWireDto>>('/api/transactions', {
            params: { sourceRevenuId: compteId, page: 1, pageSize: 100 },
        })
        return data.items.map(toTransactionDto)
    },
    create: async (dto: CreateTransactionPayload): Promise<TransactionDto> => {
        const { compteId, ...rest } = dto
        const { data } = await apiClient.post<TransactionWireDto>('/api/transactions', {
            ...rest,
            sourceRevenuId: compteId,
        })
        return toTransactionDto(data)
    },
    update: async (id: string, dto: UpdateTransactionPayload): Promise<TransactionDto> => {
        const { data } = await apiClient.put<TransactionWireDto>(`/api/transactions/${id}`, dto)
        return toTransactionDto(data)
    },
    remove: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/transactions/${id}`)
    },
}
