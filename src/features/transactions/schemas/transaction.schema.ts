import { z } from 'zod'

export const repartitionSchema = z.object({
    compteId: z.string().min(1, 'Le compte est requis'),
    montant: z.coerce.number().positive('Le montant doit être supérieur à 0'),
})

export const transactionSchema = z
    .object({
        type: z.union([z.literal('Revenu'), z.literal('Depense')]),
        repartitions: z.array(repartitionSchema).min(1, 'Ajoutez au moins un compte'),
        categorieId: z.string(),
        description: z.string(),
        date: z.string().min(1, 'La date est requise'),
    })
    .refine(
        (data) => new Set(data.repartitions.map((repartition) => repartition.compteId)).size === data.repartitions.length,
        { message: 'Chaque compte ne peut être utilisé qu’une seule fois', path: ['repartitions'] }
    )

export type RepartitionFormData = z.infer<typeof repartitionSchema>
export type TransactionFormData = z.infer<typeof transactionSchema>
