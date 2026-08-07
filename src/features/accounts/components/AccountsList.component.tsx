import { Pencil, Trash2, Wallet } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import type { CompteDto } from '../types/account.type'

interface AccountsListProps {
    accounts: CompteDto[]
    isLoading: boolean
    onEdit: (account: CompteDto) => void
    onDelete: (account: CompteDto) => void
}

export const AccountsListComponent = ({ accounts, isLoading, onEdit, onDelete }: AccountsListProps) => {
    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Chargement des comptes...</p>
    }

    if (accounts.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center gap-2 py-12 text-center text-muted-foreground">
                    <Wallet className="size-8" />
                    <p>Aucun compte pour le moment</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account) => (
                <Card key={account.id}>
                    <CardContent className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                <Wallet className="size-5" />
                            </span>
                            <div>
                                <p className="font-semibold">{account.nom}</p>
                                <p className="text-xs text-muted-foreground">
                                    Créé le {new Date(account.dateCreation).toLocaleDateString('fr-FR')}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(account)} title="Modifier">
                                <Pencil className="size-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(account)}
                                title="Supprimer"
                                className="text-destructive hover:text-destructive"
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
