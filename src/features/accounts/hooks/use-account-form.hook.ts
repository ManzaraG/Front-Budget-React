import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { accountSchema, type AccountFormData } from '../schemas/account.schema'
import { useCreateAccountApi } from './use-create-account-api.hook'
import { useUpdateAccountApi } from './use-update-account-api.hook'
import type { CompteDto } from '../types/account.type'

interface UseAccountFormHookParams {
    open: boolean
    account: CompteDto | null
    onSuccess: () => void
}

export const useAccountFormHook = ({ open, account, onSuccess }: UseAccountFormHookParams) => {
    const apiCreateAccount = useCreateAccountApi()
    const apiUpdateAccount = useUpdateAccountApi()

    const accountForm = useForm<AccountFormData>({
        resolver: zodResolver(accountSchema),
        defaultValues: { nom: account?.nom ?? '' },
    })

    useEffect(() => {
        if (open) {
            accountForm.reset({ nom: account?.nom ?? '' })
        }
    }, [open, account, accountForm])

    const onSubmitAccountForm = accountForm.handleSubmit((data) => {
        if (account) {
            apiUpdateAccount.mutate({ id: account.id, dto: data }, { onSuccess })
        } else {
            apiCreateAccount.mutate(data, { onSuccess })
        }
    })

    return {
        accountForm,
        errorsAccountForm: accountForm.formState.errors,
        onSubmitAccountForm,
        isPending: apiCreateAccount.isPending || apiUpdateAccount.isPending,
    }
}
