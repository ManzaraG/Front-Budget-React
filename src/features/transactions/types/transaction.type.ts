import type { TypeTransaction } from '@/shared/types'

export type { TypeTransaction }

export interface RepartitionDto {
    compteId: string
    montant: number
}

export interface TransactionDto {
    id: string
    montant: number
    type: TypeTransaction
    date: string
    description: string | null
    repartitions: RepartitionDto[]
    categorieId: string | null
}

export interface CreateTransactionPayload {
    type: TypeTransaction
    repartitions: RepartitionDto[]
    categorieId: string | null
    description: string | null
    date: string
}

export interface UpdateTransactionPayload {
    repartitions: RepartitionDto[]
    categorieId: string | null
    description: string | null
    date: string
}
