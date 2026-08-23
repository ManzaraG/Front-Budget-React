import { apiClient } from '@/shared/lib/axios'
import type { PagedResult } from '@/shared/types'
import type { CreateTransactionPayload, RepartitionDto, TransactionDto, UpdateTransactionPayload } from '../types/transaction.type'

interface RepartitionWireDto {
    sourceRevenuId: string
    montant: number
}

interface TransactionWireDto extends Omit<TransactionDto, 'repartitions'> {
    repartitions: RepartitionWireDto[]
}

const toTransactionDto = (wire: TransactionWireDto): TransactionDto => ({
    ...wire,
    repartitions: wire.repartitions.map((repartition) => ({
        compteId: repartition.sourceRevenuId,
        montant: repartition.montant,
    })),
})

const toRepartitionsWire = (repartitions: RepartitionDto[]): RepartitionWireDto[] =>
    repartitions.map((repartition) => ({ sourceRevenuId: repartition.compteId, montant: repartition.montant }))

export const transactionApi = {
    getAll: async (compteId: string): Promise<TransactionDto[]> => {
        const { data } = await apiClient.get<PagedResult<TransactionWireDto>>('/api/transactions', {
            params: { sourceRevenuId: compteId, page: 1, pageSize: 100 },
        })
        return data.items.map(toTransactionDto)
    },
    create: async (dto: CreateTransactionPayload): Promise<TransactionDto> => {
        const { data } = await apiClient.post<TransactionWireDto>('/api/transactions', {
            type: dto.type,
            repartitions: toRepartitionsWire(dto.repartitions),
            categorieId: dto.categorieId,
            description: dto.description,
            date: dto.date,
        })
        return toTransactionDto(data)
    },
    update: async (id: string, dto: UpdateTransactionPayload): Promise<TransactionDto> => {
        const { data } = await apiClient.put<TransactionWireDto>(`/api/transactions/${id}`, {
            repartitions: toRepartitionsWire(dto.repartitions),
            categorieId: dto.categorieId,
            description: dto.description,
            date: dto.date,
        })
        return toTransactionDto(data)
    },
    remove: async (id: string): Promise<void> => {
        await apiClient.delete(`/api/transactions/${id}`)
    },
}
