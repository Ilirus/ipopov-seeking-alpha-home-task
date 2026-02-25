import { useQuery } from '@tanstack/react-query'

import { DEFAULT_STALE_TIME } from '@/constants/tanstack'
import { fetchUser } from '@/services/api/user/user'

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        staleTime: DEFAULT_STALE_TIME,
    })
}
