import { useQuery } from '@tanstack/react-query'
import { deviseApi } from '../api/devise.api'

export const DEVISES_QUERY_KEY = ['devises']

export const useDevisesQuery = () => {
    return useQuery({
        queryKey: DEVISES_QUERY_KEY,
        queryFn: deviseApi.getAll,
    })
}
