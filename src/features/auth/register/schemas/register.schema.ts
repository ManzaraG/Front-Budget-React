import { z } from 'zod'

export const registerSchema = z
    .object({
        prenom: z.string().min(1, 'Le prénom est requis'),
        nom: z.string().min(1, 'Le nom est requis'),
        email: z.string().min(1, "L'email est requis").email('Email invalide'),
        motDePasse: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
        confirmationMotDePasse: z.string().min(1, 'La confirmation du mot de passe est requise'),
        accepteConditions: z.boolean(),
    })
    .refine((data) => data.motDePasse === data.confirmationMotDePasse, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmationMotDePasse'],
    })
    .refine((data) => data.accepteConditions === true, {
        message: 'Vous devez accepter les conditions d’utilisation',
        path: ['accepteConditions'],
    })

export type RegisterFormData = z.infer<typeof registerSchema>
