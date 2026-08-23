import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { useAccountFormHook } from '../hooks/use-account-form.hook'
import type { AccountTypeDto, CompteDto, DeviseDto } from '../types/account.type'

interface AccountFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    account: CompteDto | null
    accountTypes: AccountTypeDto[]
    devises: DeviseDto[]
}

export const AccountFormDialogComponent = ({
    open,
    onOpenChange,
    account,
    accountTypes,
    devises,
}: AccountFormDialogProps) => {
    const { accountForm, errorsAccountForm, onSubmitAccountForm, isPending } = useAccountFormHook({
        open,
        account,
        onSuccess: () => onOpenChange(false),
    })

    const typeId = accountForm.watch('typeId')
    const deviseId = accountForm.watch('deviseId')

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{account ? 'Modifier le compte' : 'Ajouter un compte'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={onSubmitAccountForm} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="nom">Nom du compte</Label>
                        <Input id="nom" placeholder="Compte courant" autoComplete="off" {...accountForm.register('nom')} />
                        {errorsAccountForm.nom && <p className="text-xs text-destructive">{errorsAccountForm.nom.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Label>Type</Label>
                        <Select value={typeId} onValueChange={(value) => accountForm.setValue('typeId', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                            <SelectContent>
                                {accountTypes.map((accountType) => (
                                    <SelectItem key={accountType.id} value={accountType.id}>
                                        {accountType.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errorsAccountForm.typeId && (
                            <p className="text-xs text-destructive">{errorsAccountForm.typeId.message}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Label>Devise</Label>
                        <Select value={deviseId} onValueChange={(value) => accountForm.setValue('deviseId', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Sélectionner une devise" />
                            </SelectTrigger>
                            <SelectContent>
                                {devises.map((devise) => (
                                    <SelectItem key={devise.id} value={devise.id}>
                                        {devise.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errorsAccountForm.deviseId && (
                            <p className="text-xs text-destructive">{errorsAccountForm.deviseId.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
                            {isPending ? (
                                <Loader2 className="size-4 animate-spin" />
                            ) : account ? (
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
