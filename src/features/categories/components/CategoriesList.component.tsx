import { Pencil, Tags, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import type { CategorieDto } from '../types/categorie.type'

interface CategoriesListProps {
    categories: CategorieDto[]
    isLoading: boolean
    onEdit: (categorie: CategorieDto) => void
    onDelete: (categorie: CategorieDto) => void
}

export const CategoriesListComponent = ({ categories, isLoading, onEdit, onDelete }: CategoriesListProps) => {
    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Chargement des catégories...</p>
    }

    if (categories.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                    <Tags className="size-8" />
                    <p>Aucune catégorie pour le moment</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((categorie) => {
                const isRevenu = categorie.type === 1

                return (
                    <Card key={categorie.id}>
                        <CardContent className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <span
                                    className={cn(
                                        'flex size-10 shrink-0 items-center justify-center rounded-lg',
                                        isRevenu ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                    )}
                                >
                                    <Tags className="size-5" />
                                </span>
                                <div>
                                    <p className="font-semibold">{categorie.nom}</p>
                                    <p className={cn('text-xs', isRevenu ? 'text-emerald-600' : 'text-red-600')}>
                                        {isRevenu ? 'Revenu' : 'Dépense'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" onClick={() => onEdit(categorie)} title="Modifier">
                                    <Pencil className="size-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(categorie)}
                                    title="Supprimer"
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
