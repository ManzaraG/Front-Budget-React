import { z } from 'zod'

export const transactionSchema = z.object({
    montant: z.coerce.number().positive('Le montant doit être supérieur à 0'),
    type: z.union([z.literal(0), z.literal(1)]),
    compteId: z.string().min(1, 'Le compte est requis'),
    categorieId: z.string(),
    description: z.string(),
    date: z.string().min(1, 'La date est requise'),
})

export type TransactionFormData = z.infer<typeof transactionSchema>
