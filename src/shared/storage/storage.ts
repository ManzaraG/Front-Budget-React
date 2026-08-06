import { STORAGE_KEY } from '@/shared/constants'
import type { UtilisateurDto } from '@/shared/types'

/**
 * "Se souvenir de moi" coché -> localStorage (persiste après fermeture du navigateur)
 * Sinon -> sessionStorage (effacé à la fermeture de l'onglet)
 */
const getActiveStorage = (): Storage => {
    return localStorage.getItem(STORAGE_KEY.REMEMBER_ME) ? localStorage : sessionStorage
}

export const setAuthData = (token: string, utilisateur: UtilisateurDto, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage
    const other = rememberMe ? sessionStorage : localStorage

    other.removeItem(STORAGE_KEY.ACCESS_TOKEN)
    other.removeItem(STORAGE_KEY.USER_CONNECT)
    other.removeItem(STORAGE_KEY.REMEMBER_ME)

    storage.setItem(STORAGE_KEY.ACCESS_TOKEN, token)
    storage.setItem(STORAGE_KEY.USER_CONNECT, JSON.stringify(utilisateur))
    if (rememberMe) {
        storage.setItem(STORAGE_KEY.REMEMBER_ME, '1')
    }
}

export const getAccessToken = (): string | null => {
    return getActiveStorage().getItem(STORAGE_KEY.ACCESS_TOKEN)
}

export const getUtilisateurConnecte = (): UtilisateurDto | null => {
    const raw = getActiveStorage().getItem(STORAGE_KEY.USER_CONNECT)
    if (!raw) return null
    try {
        return JSON.parse(raw) as UtilisateurDto
    } catch {
        return null
    }
}

export const isAuthenticated = (): boolean => {
    return !!getAccessToken()
}

export const clearAuthStorage = () => {
    for (const storage of [localStorage, sessionStorage]) {
        storage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
        storage.removeItem(STORAGE_KEY.USER_CONNECT)
        storage.removeItem(STORAGE_KEY.REMEMBER_ME)
    }
}
