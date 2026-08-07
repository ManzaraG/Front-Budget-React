export interface CompteDto {
    id: string
    nom: string
    utilisateurId: string
    dateCreation: string
}

export interface CreateComptePayload {
    nom: string
}

export interface UpdateComptePayload {
    nom: string
}
