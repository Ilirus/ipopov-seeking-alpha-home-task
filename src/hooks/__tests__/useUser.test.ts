import { useQuery } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'

import { DEFAULT_STALE_TIME } from '@/constants/tanstack'
import { useUser } from '@/hooks/useUser'
import { fetchUser } from '@/services/api/user/user'

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}))

vi.mock('@/services/api/user/user', () => ({
    fetchUser: vi.fn(),
}))

describe('useUser', () => {
    it('calls useQuery with expected config and returns its value', () => {
        const queryResult = { isSuccess: true, data: { username: 'demo' } }
        vi.mocked(useQuery).mockReturnValue(queryResult as never)

        const result = useUser()

        expect(useQuery).toHaveBeenCalledWith({
            queryKey: ['user'],
            queryFn: fetchUser,
            staleTime: DEFAULT_STALE_TIME,
        })
        expect(result).toBe(queryResult)
    })
})
