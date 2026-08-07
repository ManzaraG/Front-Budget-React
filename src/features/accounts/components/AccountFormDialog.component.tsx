import { Loader2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useAccountFormHook } from '../hooks/use-account-form.hook'
import type { CompteDto } from '../types/account.type'

interface AccountFormDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    account: CompteDto | null
}

export const AccountFormDialogComponent = ({ open, onOpenChange, account }: AccountFormDialogProps) => {
    const { accountForm, errorsAccountForm, onSubmitAccountForm, isPending } = useAccountFormHook({
        open,
        account,
        onSuccess: () => onOpenChange(false),
    })

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
