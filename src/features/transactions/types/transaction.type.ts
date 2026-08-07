import type { TypeTransaction } from '@/shared/types'

export type { TypeTransaction }

export interface TransactionDto {
    id: string
    montant: number
    type: TypeTransaction
    date: string
    description: string | null
    compteId: string
    categorieId: string | null
}

export interface CreateTransactionPayload {
    montant: number
    type: TypeTransaction
    compteId: string
    categorieId: string | null
    description: string | null
    date: string
}

export interface UpdateTransactionPayload {
    montant: number
    description: string | null
    categorieId: string | null
    date: string
}
