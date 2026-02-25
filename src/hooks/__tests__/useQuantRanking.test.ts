import { useQuery } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'

import { DEFAULT_STALE_TIME } from '@/constants/tanstack'
import { useQuantRanking } from '@/hooks/useQuantRanking'
import { fetchQuantRanking } from '@/services/api/stockAnalysisMetrics/quantRanking/quantRanking'

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}))

vi.mock('@/services/api/stockAnalysisMetrics/quantRanking/quantRanking', () => ({
    fetchQuantRanking: vi.fn(),
}))

describe('useQuantRanking', () => {
    it('calls useQuery with expected config and returns its value', () => {
        const queryResult = { isSuccess: true, data: { any: 'value' } }
        vi.mocked(useQuery).mockReturnValue(queryResult as never)

        const result = useQuantRanking()

        expect(useQuery).toHaveBeenCalledWith({
            queryKey: ['quant-ranking'],
            queryFn: fetchQuantRanking,
            staleTime: DEFAULT_STALE_TIME,
        })
        expect(result).toBe(queryResult)
    })
})
