import { Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { formatCurrency } from '@/shared/lib/currency'
import { cn } from '@/shared/lib/utils'
import { useTransactionFormHook } from '../hooks/use-transaction-form.hook'
import type { CompteDto } from '@/features/accounts'
import type { CategorieDto } from '@/features/categories'
import type { TransactionDto } from '../types/transaction.type'

interface TransactionFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    transaction: TransactionDto | null
    accounts: CompteDto[]
    categories: CategorieDto[]
}

export const TransactionFormDialogComponent = ({
    open,
    onOpenChange,
    transaction,
    accounts,
    categories,
}: TransactionFormDialogProps) => {
    const { transactionForm, repartitionsFieldArray, errorsTransactionForm, onSubmitTransactionForm, isPending } =
        useTransactionFormHook({
            open,
            transaction,
            onSuccess: () => onOpenChange(false),
        })

    const type = transactionForm.watch('type')
    const categorieId = transactionForm.watch('categorieId')
    const repartitions = transactionForm.watch('repartitions')
    const categoriesForType = categories.filter((categorie) => categorie.type === type)
    const totalMontant = repartitions.reduce((sum, repartition) => sum + (Number(repartition.montant) || 0), 0)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{transaction ? 'Modifier la transaction' : 'Ajouter une transaction'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmitTransactionForm} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            disabled={!!transaction}
                            onClick={() => transactionForm.setValue('type', 'Depense')}
                            className={cn(
                                'rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                type === 'Depense'
                                    ? 'border-red-600 bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
                                    : 'text-muted-foreground'
                            )}
                        >
                            Dépense
                        </button>
                        <button
                            type="button"
                            disabled={!!transaction}
                            onClick={() => transactionForm.setValue('type', 'Revenu')}
                            className={cn(
                                'rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                type === 'Revenu'
                                    ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                                    : 'text-muted-foreground'
                            )}
                        >
                            Revenu
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label>Répartition par compte</Label>
                            <span className="text-xs text-muted-foreground">Total : {formatCurrency(totalMontant)}</span>
                        </div>

                        {repartitionsFieldArray.fields.map((field, index) => {
                            const selectedCompteId = repartitions[index]?.compteId
                            const usedElsewhere = new Set(
                                repartitions.filter((_, otherIndex) => otherIndex !== index).map((r) => r.compteId)
                            )
                            const availableAccounts = accounts.filter(
                                (account) => account.id === selectedCompteId || !usedElsewhere.has(account.id)
                            )

                            return (
                                <div key={field.id} className="flex items-start gap-2">
                                    <div className="flex-1 space-y-1">
                                        <Select
                                            value={selectedCompteId}
                                            onValueChange={(value) =>
                                                transactionForm.setValue(`repartitions.${index}.compteId`, value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Sélectionner un compte" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableAccounts.map((account) => (
                                                    <SelectItem key={account.id} value={account.id}>
                                                        {account.nom}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-32 space-y-1">
                                        <Input
                                            type="number"
                                            step="1"
                                            min="0"
                                            placeholder="Montant"
                                            {...transactionForm.register(`repartitions.${index}.montant`)}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        disabled={repartitionsFieldArray.fields.length <= 1}
                                        onClick={() => repartitionsFieldArray.remove(index)}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            )
                        })}

                        {(errorsTransactionForm.repartitions?.message ||
                            errorsTransactionForm.repartitions?.root?.message) && (
                            <p className="text-xs text-destructive">
                                {errorsTransactionForm.repartitions?.message ?? errorsTransactionForm.repartitions?.root?.message}
                            </p>
                        )}

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={repartitionsFieldArray.fields.length >= accounts.length}
                            onClick={() => repartitionsFieldArray.append({ compteId: '', montant: 0 })}
                        >
                            <Plus className="size-4" />
                            Ajouter un compte
                        </Button>
                    </div>

                    <div className="space-y-1">
                        <Label>Catégorie</Label>
                        <Select value={categorieId} onValueChange={(value) => transactionForm.setValue('categorieId', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                                {categoriesForType.map((categorie) => (
                                    <SelectItem key={categorie.id} value={categorie.id}>
                                        {categorie.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" {...transactionForm.register('date')} />
                        {errorsTransactionForm.date && (
                            <p className="text-xs text-destructive">{errorsTransactionForm.date.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="Ex: Supermarché" {...transactionForm.register('description')} />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
                            {isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : transaction ? (
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
