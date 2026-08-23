import type { CompteDto } from '@/features/accounts'
import type { RepartitionDto } from '../types/transaction.type'

export const getComptesNoms = (repartitions: RepartitionDto[], accounts: CompteDto[]): string =>
    repartitions
        .map((repartition) => accounts.find((account) => account.id === repartition.compteId)?.nom ?? '—')
        .join(', ')
