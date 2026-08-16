import { z } from 'zod'

export const categorieSchema = z.object({
    nom: z.string().min(1, 'Le nom de la catégorie est requis'),
    type: z.union([z.literal('Revenu'), z.literal('Depense')]),
})

export type CategorieFormData = z.infer<typeof categorieSchema>
