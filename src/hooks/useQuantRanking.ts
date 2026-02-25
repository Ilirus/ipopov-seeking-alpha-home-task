import { useQuery } from '@tanstack/react-query'

import { DEFAULT_STALE_TIME } from '@/constants/tanstack'
import { fetchQuantRanking } from '@/services/api/stockAnalysisMetrics/quantRanking/quantRanking'

export const useQuantRanking = () =>
    useQuery({
        queryKey: ['quant-ranking'],
        queryFn: fetchQuantRanking,
        staleTime: DEFAULT_STALE_TIME,
    })
