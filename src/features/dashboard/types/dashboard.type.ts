import type { LucideIcon } from 'lucide-react'

export interface MonthlyFlow {
    label: string
    revenus: number
    depenses: number
}

export interface AccountShare {
    id: string
    nom: string
    montant: number
    percent: number
    iconBgClassName: string
    iconColorClassName: string
    barClassName: string
}

export interface CategorySpend {
    id: string
    label: string
    value: number
    percent: number
    colorClassName: string
    dotClassName: string
}

export interface RecentTransaction {
    id: string
    date: string
    description: string
    categorie: string
    compte: string
    montant: number
    icon: LucideIcon
    iconBgClassName: string
    iconColorClassName: string
    dotClassName: string
}
