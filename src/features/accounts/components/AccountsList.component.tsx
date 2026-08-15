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
        <Card>
            <CardContent className="overflow-x-auto px-0">
                <table className="w-full min-w-120 border-collapse text-sm">
                    <thead>
                        <tr className="border-b text-left text-xs text-muted-foreground">
                            <th scope="col" className="px-6 py-2 font-medium">Nom</th>
                            <th scope="col" className="px-6 py-2 font-medium">Créé le</th>
                            <th scope="col" className="w-24 px-6 py-2" />
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account) => (
                            <tr key={account.id} className="border-b last:border-0 hover:bg-blue-50/40">
                                <td className="px-6 py-3">
                                    <div className="flex items-center gap-2.5">
                                        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                            <Wallet className="size-4" />
                                        </span>
                                        <span className="font-medium">{account.nom}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3 text-muted-foreground">
                                    {new Date(account.dateCreation).toLocaleDateString('fr-FR')}
                                </td>
                                <td className="px-6 py-3 text-right">
                                    <div className="flex items-center justify-end gap-1">
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}
