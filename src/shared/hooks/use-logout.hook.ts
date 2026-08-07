import { useNavigate } from 'react-router-dom'
import { clearAuthStorage } from '@/shared/storage'

export const useLogoutHook = () => {
    const navigate = useNavigate()

    return () => {
        clearAuthStorage()
        navigate('/login', { replace: true })
    }
}
