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
        <Card>
            <CardContent className="overflow-x-auto px-0">
                <table className="w-full min-w-120 border-collapse text-sm">
                    <thead>
                        <tr className="border-b text-left text-xs text-muted-foreground">
                            <th scope="col" className="px-6 py-2 font-medium">Nom</th>
                            <th scope="col" className="px-6 py-2 font-medium">Type</th>
                            <th scope="col" className="w-24 px-6 py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((categorie) => {
                            const isRevenu = categorie.type === 0

                            return (
                                <tr key={categorie.id} className="border-b last:border-0 hover:bg-blue-50/40">
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                className={cn(
                                                    'flex size-8 shrink-0 items-center justify-center rounded-lg',
                                                    isRevenu ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                )}
                                            >
                                                <Tags className="size-4" />
                                            </span>
                                            <span className="font-medium">{categorie.nom}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-muted-foreground">
                                        <span className="inline-flex items-center gap-1.5">
                                            <span
                                                className={cn(
                                                    'size-1.5 rounded-full',
                                                    isRevenu ? 'bg-emerald-600' : 'bg-red-600'
                                                )}
                                            />
                                            {isRevenu ? 'Revenu' : 'Dépense'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit(categorie)}
                                                title="Modifier"
                                            >
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
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}
