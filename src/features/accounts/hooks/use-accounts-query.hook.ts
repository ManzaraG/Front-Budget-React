import { useQuery } from '@tanstack/react-query'
import { accountApi } from '../api/account.api'

export const ACCOUNTS_QUERY_KEY = ['accounts']

export const useAccountsQuery = () => {
    return useQuery({
        queryKey: ACCOUNTS_QUERY_KEY,
        queryFn: accountApi.getAll,
    })
}
