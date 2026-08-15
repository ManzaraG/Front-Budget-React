import { Search } from 'lucide-react'
import { Input } from '@/shared/components/ui/input'
import type { UtilisateurDto } from '@/shared/types'

interface DashboardTopBarProps {
    utilisateur: UtilisateurDto | null
    searchQuery: string
    onSearchChange: (value: string) => void
}

export const DashboardTopBarComponent = ({ utilisateur, searchQuery, onSearchChange }: DashboardTopBarProps) => {
    const initials = utilisateur ? `${utilisateur.prenom[0] ?? ''}${utilisateur.nom[0] ?? ''}`.toUpperCase() : '?'

    return (
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full max-w-xs">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Rechercher une transaction..."
                    aria-label="Rechercher une transaction"
                    className="h-10 rounded-full border-none bg-slate-50 pl-10 shadow-none focus-visible:ring-blue-500/40"
                />
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border bg-white py-1.5 pr-4 pl-1.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                    {initials}
                </span>
                <span className="text-sm font-medium">
                    {utilisateur ? `${utilisateur.prenom} ${utilisateur.nom}` : 'Utilisateur'}
                </span>
            </div>
        </div>
    )
}
