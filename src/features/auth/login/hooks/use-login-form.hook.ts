import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '../schemas/login.schema'
import { useLoginApi } from './use-login-api.hook'

export const useLoginFormHook = () => {
    const apiLogin = useLoginApi()
    const [showPassword, setShowPassword] = useState(false)

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            motDePasse: '',
            seSouvenirDeMoi: false,
        },
    })

    const onSubmitLoginForm = loginForm.handleSubmit((data) => {
        apiLogin.mutate(data)
    })

    return {
        loginForm,
        errorsLoginForm: loginForm.formState.errors,
        onSubmitLoginForm,
        showPassword,
        setShowPassword,
        apiLogin,
    }
}
