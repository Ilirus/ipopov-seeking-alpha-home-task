import { beforeEach, describe, it, expect, vi } from 'vitest'

import apiClient from '@/services/axios/apiClient'

import { fetchQuantRanking } from '../quantRanking'

vi.mock('@/services/axios/apiClient', () => ({
    default: {
        get: vi.fn(),
    },
}))

describe('fetchQuantRanking service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should be defined', () => {
        expect(fetchQuantRanking).toBeDefined()
    })

    it('returns ranking data', async () => {
        const mockRanking = {
            sector: 'Tech',
            industry: 'Software',
            rankings: {
                overall: { rank: 1, total: 10 },
                sector: { rank: 1, total: 5 },
                industry_specific: { rank: 1, total: 3 },
            },
        }

        vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockRanking })

        const result = await fetchQuantRanking()

        expect(apiClient.get).toHaveBeenCalledWith('/quant-ranking')
        expect(result).toEqual(mockRanking)
    })

    it('throws error on failed request', async () => {
        vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'))

        await expect(fetchQuantRanking()).rejects.toThrow('Network error')
    })
})
