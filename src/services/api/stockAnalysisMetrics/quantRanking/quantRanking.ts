import apiClient from '@/services/axios/apiClient'
import type { QuantRankingResponse } from '@/types/stockAnalysisMetrics/quantRanking'
const QUANT_RANKING_PATH = '/quant-ranking'

export const fetchQuantRanking = async (): Promise<QuantRankingResponse> => {
    const { data } = await apiClient.get<QuantRankingResponse>(QUANT_RANKING_PATH)
    return data
}
