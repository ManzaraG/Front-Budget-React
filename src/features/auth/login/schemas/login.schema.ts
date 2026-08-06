import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().min(1, "L'email est requis").email('Email invalide'),
    motDePasse: z.string().min(1, 'Le mot de passe est requis'),
    seSouvenirDeMoi: z.boolean(),
})

export type LoginFormData = z.infer<typeof loginSchema>
