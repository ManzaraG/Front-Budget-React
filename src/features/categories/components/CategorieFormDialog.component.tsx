import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/lib/utils'
import { useCategorieFormHook } from '../hooks/use-categorie-form.hook'
import type { CategorieDto } from '../types/categorie.type'

interface CategorieFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    categorie: CategorieDto | null
}

export const CategorieFormDialogComponent = ({ open, onOpenChange, categorie }: CategorieFormDialogProps) => {
    const { categorieForm, errorsCategorieForm, onSubmitCategorieForm, isPending } = useCategorieFormHook({
        open,
        categorie,
        onSuccess: () => onOpenChange(false),
    })

    const type = categorieForm.watch('type')

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{categorie ? 'Modifier la catégorie' : 'Ajouter une catégorie'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmitCategorieForm} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            disabled={!!categorie}
                            onClick={() => categorieForm.setValue('type', 'Depense')}
                            className={cn(
                                'rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                type === 'Depense' ? 'border-red-600 bg-red-50 text-red-600' : 'text-muted-foreground'
                            )}
                        >
                            Dépense
                        </button>
                        <button
                            type="button"
                            disabled={!!categorie}
                            onClick={() => categorieForm.setValue('type', 'Revenu')}
                            className={cn(
                                'rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                type === 'Revenu' ? 'border-emerald-600 bg-emerald-50 text-emerald-600' : 'text-muted-foreground'
                            )}
                        >
                            Revenu
                        </button>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="nom">Nom de la catégorie</Label>
                        <Input id="nom" placeholder="Alimentation" autoComplete="off" {...categorieForm.register('nom')} />
                        {errorsCategorieForm.nom && (
                            <p className="text-xs text-destructive">{errorsCategorieForm.nom.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
                            {isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : categorie ? (
                                'Enregistrer'
                            ) : (
                                'Créer'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
