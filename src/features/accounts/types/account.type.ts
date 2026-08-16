export interface AccountTypeDto {
    id: string
    nom: string
}

export interface CompteDto {
    id: string
    nom: string
    typeId: string
    estActif: boolean
    utilisateurId: string
    dateCreation: string
}

export interface CreateComptePayload {
    nom: string
    typeId: string
}

export interface UpdateComptePayload {
    nom: string
    typeId: string
}
