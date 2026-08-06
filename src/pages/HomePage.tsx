import { useNavigate } from 'react-router-dom'
import { Wallet } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { clearAuthStorage, getUtilisateurConnecte } from '@/shared/storage'

export const HomePage = () => {
    const navigate = useNavigate()
    const utilisateur = getUtilisateurConnecte()

    const handleLogout = () => {
        clearAuthStorage()
        navigate('/login', { replace: true })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-blue-50/70 p-6 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Wallet className="size-6" />
            </div>
            <h1 className="text-2xl font-bold">Bienvenue{utilisateur ? `, ${utilisateur.prenom}` : ''} !</h1>
            <p className="text-muted-foreground">
                La connexion fonctionne. Les écrans Comptes / Catégories / Transactions arrivent ensuite.
            </p>
            <Button variant="outline" onClick={handleLogout}>
                Se déconnecter
            </Button>
        </div>
    )
}
