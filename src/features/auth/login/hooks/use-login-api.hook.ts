import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { setAuthData } from '@/shared/storage'
import { getErrorMessage } from '@/shared/lib/axios'
import { loginApi } from '../api/login.api'
import type { LoginPayload } from '../types/login.type'

export const useLoginApi = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (dto: LoginPayload) => loginApi.login(dto),
        onSuccess: (data, variables) => {
            setAuthData(data.token, data.utilisateur, variables.seSouvenirDeMoi)
            toast.success(`Bienvenue ${data.utilisateur.prenom} !`)
            navigate('/', { replace: true })
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
