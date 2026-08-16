import { z } from 'zod'

export const transactionSchema = z.object({
    montant: z.coerce.number().positive('Le montant doit être supérieur à 0'),
    type: z.union([z.literal('Revenu'), z.literal('Depense')]),
    compteId: z.string().min(1, 'Le compte est requis'),
    categorieId: z.string(),
    description: z.string(),
    date: z.string().min(1, 'La date est requise'),
})

export type TransactionFormData = z.infer<typeof transactionSchema>
