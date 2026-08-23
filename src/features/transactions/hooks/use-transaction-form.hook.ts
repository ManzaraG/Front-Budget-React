import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
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
    type: transaction?.type ?? 'Depense',
    repartitions:
        transaction && transaction.repartitions.length > 0
            ? transaction.repartitions.map((repartition) => ({
                  compteId: repartition.compteId,
                  montant: Math.abs(Number(repartition.montant)),
              }))
            : [{ compteId: defaultCompteId ?? '', montant: 0 }],
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

    const repartitionsFieldArray = useFieldArray({ control: transactionForm.control, name: 'repartitions' })

    useEffect(() => {
        if (open) {
            transactionForm.reset(buildDefaultValues(transaction, defaultCompteId))
        }
    }, [open, transaction, defaultCompteId, transactionForm])

    const onSubmitTransactionForm = transactionForm.handleSubmit((data) => {
        const isoDate = new Date(data.date).toISOString()
        const categorieId = data.categorieId || null
        const description = data.description || null
        const repartitions = data.repartitions.map((repartition) => ({
            compteId: repartition.compteId,
            montant: repartition.montant,
        }))

        if (transaction) {
            apiUpdateTransaction.mutate(
                { id: transaction.id, dto: { repartitions, categorieId, description, date: isoDate } },
                { onSuccess }
            )
        } else {
            apiCreateTransaction.mutate({ type: data.type, repartitions, categorieId, description, date: isoDate }, { onSuccess })
        }
    })

    return {
        transactionForm,
        repartitionsFieldArray,
        errorsTransactionForm: transactionForm.formState.errors,
        onSubmitTransactionForm,
        isPending: apiCreateTransaction.isPending || apiUpdateTransaction.isPending,
    }
}
