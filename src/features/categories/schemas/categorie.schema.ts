import { z } from 'zod'

export const categorieSchema = z.object({
    nom: z.string().min(1, 'Le nom de la catégorie est requis'),
    type: z.union([z.literal(0), z.literal(1)]),
})

export type CategorieFormData = z.infer<typeof categorieSchema>
