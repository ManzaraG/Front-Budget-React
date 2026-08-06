import { Bell, ChevronDown, Plus } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import type { UtilisateurDto } from '@/shared/types'

interface DashboardHeaderProps {
    utilisateur: UtilisateurDto | null
}

export const DashboardHeaderComponent = ({ utilisateur }: DashboardHeaderProps) => {
    return (
        <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
                <h1 className="text-2xl font-bold">Bonjour{utilisateur ? `, ${utilisateur.prenom}` : ''}</h1>
                <button
                    type="button"
                    className="mt-1 flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-600"
                >
                    Août 2026
                    <ChevronDown className="size-3.5" />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <Button className="rounded-lg bg-blue-600 hover:bg-blue-700">
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
