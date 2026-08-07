import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setAuthData } from '@/shared/storage'
import { getErrorMessage } from '@/shared/lib/axios'
import { registerApi } from '../api/register.api'
import type { RegisterPayload } from '../types/register.type'

export const useRegisterApi = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (dto: RegisterPayload) => registerApi.register(dto),
        onSuccess: (data) => {
            setAuthData(data.token, data.utilisateur, false)
            toast.success(`Bienvenue ${data.utilisateur.prenom} !`)
            navigate('/', { replace: true })
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
