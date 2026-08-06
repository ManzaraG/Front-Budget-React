import type { UtilisateurDto } from '@/shared/types'

export interface LoginPayload {
    email: string
    motDePasse: string
    seSouvenirDeMoi: boolean
}

export interface AuthResultDto {
    token: string
    expiration: string
    utilisateur: UtilisateurDto
}
