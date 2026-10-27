import type { TypeTransaction } from '@/shared/types'

export interface BilanMensuelDto {
    annee: number
    mois: number
    totalRevenus: number
    totalDepenses: number
    solde: number
}

export interface DashboardTrendPointDto {
    annee: number
    mois: number
    totalRevenus: number
    totalDepenses: number
}

export interface SourceRevenuBudgetDto {
    sourceRevenuId: string
    nom: string
    montant: number
    pourcentage: number
}

export interface CategorieBudgetDto {
    categorieId: string
    nom: string
    montant: number
    pourcentage: number
}

export interface TransactionRecenteDto {
    id: string
    montant: number
    type: TypeTransaction
    date: string
    description: string | null
    categorieId: string | null
    categorieNom: string
    sourcesRevenu: string[]
}
