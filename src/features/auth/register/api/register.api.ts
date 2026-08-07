import { apiClient } from '@/shared/lib/axios'
import type { AuthResultDto, RegisterPayload } from '../types/register.type'

export const registerApi = {
    register: async (dto: RegisterPayload): Promise<AuthResultDto> => {
        const { data } = await apiClient.post<AuthResultDto>('/api/auth/register', dto)
        return data
    },
}
