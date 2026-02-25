import apiClient from '@/services/axios/apiClient'
import type { RatingsSummaryResponse } from '@/types/stockAnalysisMetrics/ratingsSummary'
const RATINGS_SUMMARY_PATH = '/ratings-summary'


export const fetchRatingsSummary = async (): Promise<RatingsSummaryResponse> => {
    const { data } = await apiClient.get<RatingsSummaryResponse>(RATINGS_SUMMARY_PATH)
    return data
}
