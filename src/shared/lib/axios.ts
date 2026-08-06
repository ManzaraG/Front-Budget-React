import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'
import { env } from '@/shared/config'
import { clearAuthStorage, getAccessToken } from '@/shared/storage'

export const apiClient = axios.create({
    baseURL: env.apiBaseUrl,
})

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getAccessToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            clearAuthStorage()
            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
            return Promise.reject(error)
        }

        toast.error(getErrorMessage(error))
        return Promise.reject(error)
    }
)

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const data: unknown = error.response?.data

        if (typeof data === 'string') return data

        if (data && typeof data === 'object' && 'message' in data) {
            const message = (data as { message?: string }).message
            if (typeof message === 'string') return message
        }

        return error.message
    }
    if (error instanceof Error) return error.message
    return 'Une erreur est survenue.'
}
