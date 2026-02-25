import apiClient from '@/services/axios/apiClient'
import type { FactorGrades6mResponse, FactorGrades3mResponse, FactorGradesNowResponse } from '@/types/stockAnalysisMetrics/factorGrades'
const FACTOR_GRADES_PATH = '/factor-grades'

export const fetchFactorGradesNow = async (): Promise<FactorGradesNowResponse> => {
    const { data } = await apiClient.get<FactorGradesNowResponse>(`${FACTOR_GRADES_PATH}/now`)
    return data
}

export const fetchFactorGrades3m = async (): Promise<FactorGrades3mResponse> => {
    const { data } = await apiClient.get<FactorGrades3mResponse>(`${FACTOR_GRADES_PATH}/3m`)
    return data
}

export const fetchFactorGrades6m = async (): Promise<FactorGrades6mResponse> => {
    const { data } = await apiClient.get<FactorGrades6mResponse>(`${FACTOR_GRADES_PATH}/6m`)
    return data
}
