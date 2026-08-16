import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AppSidebarComponent } from '@/shared/components/layout'
import { Button } from '@/shared/components/ui/button'
import { useLogoutHook } from '@/shared/hooks'
import { useCategoriesQuery } from '../hooks/use-categories-query.hook'
import { useDeleteCategorieApi } from '../hooks/use-delete-categorie-api.hook'
import { CategorieFormDialogComponent } from './CategorieFormDialog.component'
import { CategoriesListComponent } from './CategoriesList.component'
import type { CategorieDto } from '../types/categorie.type'

export const CategoriesComponent = () => {
    const handleLogout = useLogoutHook()
    const { data: categories, isLoading } = useCategoriesQuery()
    const apiDeleteCategorie = useDeleteCategorieApi()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingCategorie, setEditingCategorie] = useState<CategorieDto | null>(null)

    const openCreateDialog = () => {
        setEditingCategorie(null)
        setIsDialogOpen(true)
    }

    const openEditDialog = (categorie: CategorieDto) => {
        setEditingCategorie(categorie)
        setIsDialogOpen(true)
    }

    const handleDelete = (categorie: CategorieDto) => {
        if (window.confirm(`Supprimer la catégorie "${categorie.nom}" ?`)) {
            apiDeleteCategorie.mutate(categorie.id)
        }
    }

    const handleDeleteSelected = (selectedCategories: CategorieDto[]) => {
        if (window.confirm(`Supprimer ${selectedCategories.length} catégorie(s) ?`)) {
            selectedCategories.forEach((categorie) => apiDeleteCategorie.mutate(categorie.id))
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <AppSidebarComponent onLogout={handleLogout} />

            <main className="min-w-0 flex-1 space-y-6 p-6">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Catégories</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Organisez vos transactions par catégorie
                        </p>
                    </div>
                    <Button onClick={openCreateDialog} className="rounded-lg bg-blue-600 hover:bg-blue-700">
                        <Plus className="size-4" />
                        Ajouter une catégorie
                    </Button>
                </header>

                <CategoriesListComponent
                    categories={categories ?? []}
                    isLoading={isLoading}
                    onEdit={openEditDialog}
                    onDelete={handleDelete}
                    onDeleteSelected={handleDeleteSelected}
                />
            </main>

            <CategorieFormDialogComponent open={isDialogOpen} onOpenChange={setIsDialogOpen} categorie={editingCategorie} />
        </div>
    )
}
