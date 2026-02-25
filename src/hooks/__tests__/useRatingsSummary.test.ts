import { useQuery } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'

import { DEFAULT_STALE_TIME } from '@/constants/tanstack'
import { useRatingsSummary } from '@/hooks/useRatingsSummary'
import { fetchRatingsSummary } from '@/services/api/stockAnalysisMetrics/ratingsSummary/ratingsSummary'

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}))

vi.mock('@/services/api/stockAnalysisMetrics/ratingsSummary/ratingsSummary', () => ({
    fetchRatingsSummary: vi.fn(),
}))

describe('useRatingsSummary', () => {
    it('calls useQuery with expected config and returns its value', () => {
        const queryResult = { isSuccess: true, data: { any: 'value' } }
        vi.mocked(useQuery).mockReturnValue(queryResult as never)

        const result = useRatingsSummary()

        expect(useQuery).toHaveBeenCalledWith({
            queryKey: ['ratings-summary'],
            queryFn: fetchRatingsSummary,
            staleTime: DEFAULT_STALE_TIME,
        })
        expect(result).toBe(queryResult)
    })
})
