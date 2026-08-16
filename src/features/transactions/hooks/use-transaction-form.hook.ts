import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { transactionSchema, type TransactionFormData } from '../schemas/transaction.schema'
import { useCreateTransactionApi } from './use-create-transaction-api.hook'
import { useUpdateTransactionApi } from './use-update-transaction-api.hook'
import type { TransactionDto } from '../types/transaction.type'

interface UseTransactionFormHookParams {
    open: boolean
    transaction: TransactionDto | null
    defaultCompteId?: string
    onSuccess: () => void
}

const toDateInputValue = (isoDate: string) => isoDate.slice(0, 10)

const buildDefaultValues = (transaction: TransactionDto | null, defaultCompteId?: string): TransactionFormData => ({
    montant: transaction ? Math.abs(Number(transaction.montant)) : 0,
    type: transaction?.type ?? 'Depense',
    compteId: transaction?.compteId ?? defaultCompteId ?? '',
    categorieId: transaction?.categorieId ?? '',
    description: transaction?.description ?? '',
    date: transaction ? toDateInputValue(transaction.date) : toDateInputValue(new Date().toISOString()),
})

export const useTransactionFormHook = ({ open, transaction, defaultCompteId, onSuccess }: UseTransactionFormHookParams) => {
    const apiCreateTransaction = useCreateTransactionApi()
    const apiUpdateTransaction = useUpdateTransactionApi()

    const transactionForm = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
        defaultValues: buildDefaultValues(transaction, defaultCompteId),
    })

    useEffect(() => {
        if (open) {
            transactionForm.reset(buildDefaultValues(transaction, defaultCompteId))
        }
    }, [open, transaction, defaultCompteId, transactionForm])

    const onSubmitTransactionForm = transactionForm.handleSubmit((data) => {
        const isoDate = new Date(data.date).toISOString()
        const categorieId = data.categorieId || null
        const description = data.description || null

        if (transaction) {
            apiUpdateTransaction.mutate(
                { id: transaction.id, dto: { montant: data.montant, description, categorieId, date: isoDate } },
                { onSuccess }
            )
        } else {
            apiCreateTransaction.mutate(
                { montant: data.montant, type: data.type, compteId: data.compteId, categorieId, description, date: isoDate },
                { onSuccess }
            )
        }
    })

    return {
        transactionForm,
        errorsTransactionForm: transactionForm.formState.errors,
        onSubmitTransactionForm,
        isPending: apiCreateTransaction.isPending || apiUpdateTransaction.isPending,
    }
}
