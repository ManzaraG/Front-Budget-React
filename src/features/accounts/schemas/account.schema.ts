import { z } from 'zod'

export const accountSchema = z.object({
    nom: z.string().min(1, 'Le nom du compte est requis'),
    typeId: z.string().min(1, 'Le type est requis'),
})

export type AccountFormData = z.infer<typeof accountSchema>
