import type { UtilisateurDto } from '@/shared/types'

export interface RegisterPayload {
    prenom: string
    nom: string
    email: string
    motDePasse: string
    confirmationMotDePasse: string
    accepteConditions: boolean
}

export interface AuthResultDto {
    token: string
    expiration: string
    utilisateur: UtilisateurDto
}
