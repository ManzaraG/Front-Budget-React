import type { TypeTransaction } from '@/shared/types'

export interface CategorieDto {
    id: string
    nom: string
    type: TypeTransaction
}

export interface CreateCategoriePayload {
    nom: string
    type: TypeTransaction
}

export interface UpdateCategoriePayload {
    nom: string
}
