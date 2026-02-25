import { useQueries } from '@tanstack/react-query'

import { DEFAULT_STALE_TIME } from '@/constants/tanstack'
import { fetchFactorGradesNow, fetchFactorGrades3m, fetchFactorGrades6m } from '@/services/api/stockAnalysisMetrics/factorGrades/factorGrades'
import type { FactorGrade, FactorGrades } from '@/types/stockAnalysisMetrics/factorGrades'

export function useFactorGrades() {
    const results = useQueries({
        queries: [
            {
                queryKey: ['factorGradesNow'],
                queryFn: fetchFactorGradesNow,
                refetchInterval: 5000,
                staleTime: DEFAULT_STALE_TIME,
            },
            {
                queryKey: ['factorGrades3m'],
                queryFn: fetchFactorGrades3m,
                staleTime: DEFAULT_STALE_TIME,
            },
            {
                queryKey: ['factorGrades6m'],
                queryFn: fetchFactorGrades6m,
                staleTime: DEFAULT_STALE_TIME,
            },
        ],
    })
    const isLoading = results.some(r => r.isLoading)
    const isSuccess = results.every(r => r.isSuccess)
    const isError = results.some(r => r.isError)
    const error = results.find(r => r.isError)?.error

    let data: FactorGrades | undefined
    if (
        isSuccess
        && results[0].data
        && results[1].data
        && results[2].data
    ) {
        const gradesNow = results[0].data
        const grades3m = results[1].data
        const grades6m = results[2].data
        const grades6mByName = new Map<string, FactorGrade>(grades6m.data)

        const result: FactorGrades = {}
        const names = new Set<string>([
            ...Object.keys(gradesNow),
            ...Object.keys(grades3m),
            ...grades6mByName.keys(),
        ])
        names.forEach((name) => {
            result[name] = {
                current: gradesNow[name]?.current ?? 'F',
                grade3m: grades3m[name] ?? 'F',
                grade6m: grades6mByName.get(name) ?? 'F',
            }
        })
        data = result
    }
    return {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
    }
}
