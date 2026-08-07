import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormData } from '../schemas/register.schema'
import { useRegisterApi } from './use-register-api.hook'

export const useRegisterFormHook = () => {
    const apiRegister = useRegisterApi()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            prenom: '',
            nom: '',
            email: '',
            motDePasse: '',
            confirmationMotDePasse: '',
            accepteConditions: false,
        },
    })

    const onSubmitRegisterForm = registerForm.handleSubmit((data) => {
        apiRegister.mutate(data)
    })

    return {
        registerForm,
        errorsRegisterForm: registerForm.formState.errors,
        onSubmitRegisterForm,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        apiRegister,
    }
}
