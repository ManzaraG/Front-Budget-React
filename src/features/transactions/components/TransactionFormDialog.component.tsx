import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
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
    const { transactionForm, errorsTransactionForm, onSubmitTransactionForm, isPending } = useTransactionFormHook({
        open,
        transaction,
        onSuccess: () => onOpenChange(false),
    })

    const type = transactionForm.watch('type')
    const compteId = transactionForm.watch('compteId')
    const categorieId = transactionForm.watch('categorieId')
    const categoriesForType = categories.filter((categorie) => categorie.type === type)

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
                            onClick={() => transactionForm.setValue('type', 1)}
                            className={cn(
                                'rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                type === 1 ? 'border-red-600 bg-red-50 text-red-600' : 'text-muted-foreground'
                            )}
                        >
                            Dépense
                        </button>
                        <button
                            type="button"
                            disabled={!!transaction}
                            onClick={() => transactionForm.setValue('type', 0)}
                            className={cn(
                                'rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
                                type === 0 ? 'border-emerald-600 bg-emerald-50 text-emerald-600' : 'text-muted-foreground'
                            )}
                        >
                            Revenu
                        </button>
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="montant">Montant</Label>
                        <Input
                            id="montant"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...transactionForm.register('montant')}
                        />
                        {errorsTransactionForm.montant && (
                            <p className="text-xs text-destructive">{errorsTransactionForm.montant.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Compte</Label>
                        <Select
                            value={compteId}
                            onValueChange={(value) => transactionForm.setValue('compteId', value)}
                            disabled={!!transaction}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un compte" />
                            </SelectTrigger>
                            <SelectContent>
                                {accounts.map((account) => (
                                    <SelectItem key={account.id} value={account.id}>
                                        {account.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errorsTransactionForm.compteId && (
                            <p className="text-xs text-destructive">{errorsTransactionForm.compteId.message}</p>
                        )}
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
