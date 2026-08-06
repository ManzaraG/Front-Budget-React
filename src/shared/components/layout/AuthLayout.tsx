import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '@/shared/storage'

export function AuthLayout() {
    if (isAuthenticated()) {
        return <Navigate to="/" replace />
    }

    return (
        <div className="min-h-screen w-full">
            <Outlet />
        </div>
    )
}
