import { useQueries } from '@tanstack/react-query'
import { describe, expect, it, vi } from 'vitest'

import { useFactorGrades } from '@/hooks/useFactorGrades'

vi.mock('@tanstack/react-query', () => ({
    useQueries: vi.fn(),
}))

describe('useFactorGrades', () => {
    it('returns loading state when at least one query is loading', () => {
        vi.mocked(useQueries).mockReturnValue([
            { isLoading: true, isSuccess: false, isError: false },
            { isLoading: false, isSuccess: true, isError: false },
            { isLoading: false, isSuccess: true, isError: false },
        ] as never)

        const result = useFactorGrades()

        expect(result.isLoading).toBe(true)
        expect(result.isSuccess).toBe(false)
        expect(result.isError).toBe(false)
        expect(result.data).toBeUndefined()
    })

    it('combines 3 query payloads into normalized factor grades', () => {
        vi.mocked(useQueries).mockReturnValue([
            {
                isLoading: false,
                isSuccess: true,
                isError: false,
                data: {
                    Value: { current: 'A' },
                    Profitability: { current: 'B' },
                },
            },
            {
                isLoading: false,
                isSuccess: true,
                isError: false,
                data: {
                    Value: 'C',
                    Momentum: 'A-',
                },
            },
            {
                isLoading: false,
                isSuccess: true,
                isError: false,
                data: {
                    data: [
                        [
                            'Value',
                            'B+',
                        ],
                        [
                            'Momentum',
                            'C',
                        ],
                    ],
                },
            },
        ] as never)

        const result = useFactorGrades()

        expect(result.isLoading).toBe(false)
        expect(result.isSuccess).toBe(true)
        expect(result.isError).toBe(false)
        expect(result.data).toEqual({
            Value: {
                current: 'A',
                grade3m: 'C',
                grade6m: 'B+',
            },
            Profitability: {
                current: 'B',
                grade3m: 'F',
                grade6m: 'F',
            },
            Momentum: {
                current: 'F',
                grade3m: 'A-',
                grade6m: 'C',
            },
        })
    })

    it('returns first error when at least one query fails', () => {
        const requestError = new Error('factor grades failed')

        vi.mocked(useQueries).mockReturnValue([
            { isLoading: false, isSuccess: false, isError: true, error: requestError },
            { isLoading: false, isSuccess: true, isError: false },
            { isLoading: false, isSuccess: true, isError: false },
        ] as never)

        const result = useFactorGrades()

        expect(result.isError).toBe(true)
        expect(result.error).toBe(requestError)
        expect(result.data).toBeUndefined()
    })
})
