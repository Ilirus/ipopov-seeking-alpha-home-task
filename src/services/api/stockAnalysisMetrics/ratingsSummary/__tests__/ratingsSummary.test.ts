import { beforeEach, describe, it, expect, vi } from 'vitest'

import apiClient from '@/services/axios/apiClient'

import { fetchRatingsSummary } from '../ratingsSummary'

vi.mock('@/services/axios/apiClient', () => ({
    default: {
        get: vi.fn(),
    },
}))

describe('fetchRatingsSummary service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should be defined', () => {
        expect(fetchRatingsSummary).toBeDefined()
    })

    it('returns summary data', async () => {
        const mockSummary = {
            Alpha: { score: 1.23, rating: 'A' },
        }

        vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockSummary })

        const result = await fetchRatingsSummary()

        expect(apiClient.get).toHaveBeenCalledWith('/ratings-summary')
        expect(result).toEqual(mockSummary)
    })

    it('throws error on failed request', async () => {
        vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'))

        await expect(fetchRatingsSummary()).rejects.toThrow('Network error')
    })
})
