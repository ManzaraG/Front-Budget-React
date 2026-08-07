import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { categorieSchema, type CategorieFormData } from '../schemas/categorie.schema'
import { useCreateCategorieApi } from './use-create-categorie-api.hook'
import { useUpdateCategorieApi } from './use-update-categorie-api.hook'
import type { CategorieDto } from '../types/categorie.type'

interface UseCategorieFormHookParams {
    open: boolean
    categorie: CategorieDto | null
    onSuccess: () => void
}

export const useCategorieFormHook = ({ open, categorie, onSuccess }: UseCategorieFormHookParams) => {
    const apiCreateCategorie = useCreateCategorieApi()
    const apiUpdateCategorie = useUpdateCategorieApi()

    const categorieForm = useForm<CategorieFormData>({
        resolver: zodResolver(categorieSchema),
        defaultValues: { nom: categorie?.nom ?? '', type: categorie?.type ?? 0 },
    })

    useEffect(() => {
        if (open) {
            categorieForm.reset({ nom: categorie?.nom ?? '', type: categorie?.type ?? 0 })
        }
    }, [open, categorie, categorieForm])

    const onSubmitCategorieForm = categorieForm.handleSubmit((data) => {
        if (categorie) {
            apiUpdateCategorie.mutate({ id: categorie.id, dto: { nom: data.nom } }, { onSuccess })
        } else {
            apiCreateCategorie.mutate(data, { onSuccess })
        }
    })

    return {
        categorieForm,
        errorsCategorieForm: categorieForm.formState.errors,
        onSubmitCategorieForm,
        isPending: apiCreateCategorie.isPending || apiUpdateCategorie.isPending,
    }
}
