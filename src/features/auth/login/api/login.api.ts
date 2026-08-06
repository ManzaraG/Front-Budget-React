import { apiClient } from '@/shared/lib/axios'
import type { AuthResultDto, LoginPayload } from '../types/login.type'

export const loginApi = {
    login: async (dto: LoginPayload): Promise<AuthResultDto> => {
        const { data } = await apiClient.post<AuthResultDto>('/api/auth/login', dto)
        return data
    },
}
