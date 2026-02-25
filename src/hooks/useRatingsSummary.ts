import { useQuery } from '@tanstack/react-query'

import { DEFAULT_STALE_TIME } from '@/constants/tanstack'
import { fetchRatingsSummary } from '@/services/api/stockAnalysisMetrics/ratingsSummary/ratingsSummary'

export const useRatingsSummary = () => useQuery({
    queryKey: ['ratings-summary'],
    queryFn: fetchRatingsSummary,
    staleTime: DEFAULT_STALE_TIME,
})
