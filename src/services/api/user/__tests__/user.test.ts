import { beforeEach, describe, it, expect, vi } from 'vitest'

import apiClient from '@/services/axios/apiClient'

import { fetchUser } from '../user'

vi.mock('@/services/axios/apiClient', () => ({
    default: {
        get: vi.fn(),
    },
}))

describe('fetchUser service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should be defined', () => {
        expect(fetchUser).toBeDefined()
    })

    it('returns user data', async () => {
        const mockUser = { premium: true }

        vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockUser })

        const result = await fetchUser()

        expect(apiClient.get).toHaveBeenCalledWith('/user')
        expect(result).toEqual(mockUser)
    })

    it('throws error on failed request', async () => {
        vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'))

        await expect(fetchUser()).rejects.toThrow('Network error')
    })
})
