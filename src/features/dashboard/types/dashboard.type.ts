import type { LucideIcon } from 'lucide-react'

export interface StatCardData {
    id: string
    label: string
    value: string
    description: string
    icon: LucideIcon
    iconBgClassName: string
    iconColorClassName: string
    valueClassName?: string
}

export interface BalancePoint {
    label: string
    value: number
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
