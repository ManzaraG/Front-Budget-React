import { Bell, Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { UtilisateurDto } from '@/shared/types'

interface DashboardHeaderProps {
    utilisateur: UtilisateurDto | null
    onAddTransaction: () => void
    canAddTransaction: boolean
}

const currentMonthLabel = () => {
    const label = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    return label.charAt(0).toUpperCase() + label.slice(1)
}

export const DashboardHeaderComponent = ({ utilisateur, onAddTransaction, canAddTransaction }: DashboardHeaderProps) => {
    return (
        <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold">Bonjour{utilisateur ? `, ${utilisateur.prenom}` : ''}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{currentMonthLabel()}</p>
            </div>

            <div className="flex items-center gap-3">
                <Button
                    onClick={onAddTransaction}
                    disabled={!canAddTransaction}
                    title={!canAddTransaction ? 'Créez un compte avant d’ajouter une transaction' : undefined}
                    className="rounded-lg bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="size-4" />
                    <span className="hidden sm:inline">Ajouter une transaction</span>
                    <span className="sm:hidden">Ajouter</span>
                </Button>
                <button
                    type="button"
                    className="relative flex size-10 shrink-0 items-center justify-center rounded-full border text-muted-foreground hover:bg-blue-50 hover:text-blue-600"
                >
                    <Bell className="size-5" />
                    <span className="absolute top-2 right-2 size-1.5 rounded-full bg-red-500" />
                </button>
            </div>
        </header>
    )
}
