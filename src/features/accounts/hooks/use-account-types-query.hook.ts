import { useQuery } from '@tanstack/react-query'
import { accountTypeApi } from '../api/account-type.api'

export const ACCOUNT_TYPES_QUERY_KEY = ['account-types']

export const useAccountTypesQuery = () => {
    return useQuery({
        queryKey: ACCOUNT_TYPES_QUERY_KEY,
        queryFn: accountTypeApi.getAll,
    })
}
