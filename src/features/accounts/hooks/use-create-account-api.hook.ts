import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { getErrorMessage } from '@/shared/lib/axios'
import { accountApi } from '../api/account.api'
import { ACCOUNTS_QUERY_KEY } from './use-accounts-query.hook'
import type { CreateComptePayload } from '../types/account.type'

export const useCreateAccountApi = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (dto: CreateComptePayload) => accountApi.create(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ACCOUNTS_QUERY_KEY })
            toast.success('Compte créé avec succès')
        },
        onError: (error) => {
            toast.error(getErrorMessage(error))
        },
    })
}
