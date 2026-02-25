import { beforeEach, describe, it, expect, vi } from 'vitest'

import apiClient from '@/services/axios/apiClient'

import { fetchFactorGradesNow, fetchFactorGrades3m, fetchFactorGrades6m } from '../factorGrades'

vi.mock('@/services/axios/apiClient', () => ({
    default: {
        get: vi.fn(),
    },
}))

describe('factor grades service', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should be defined', () => {
        expect(fetchFactorGradesNow).toBeDefined()
        expect(fetchFactorGrades3m).toBeDefined()
        expect(fetchFactorGrades6m).toBeDefined()
    })

    it('returns now grades data', async () => {
        const mockGradesNow = { Value: { current: 'A' } }
        vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockGradesNow })

        const result = await fetchFactorGradesNow()

        expect(apiClient.get).toHaveBeenCalledWith('/factor-grades/now')
        expect(result).toEqual(mockGradesNow)
    })

    it('returns 3m grades data', async () => {
        const mockGrades3m = { Value: 'B+' }
        vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockGrades3m })

        const result = await fetchFactorGrades3m()

        expect(apiClient.get).toHaveBeenCalledWith('/factor-grades/3m')
        expect(result).toEqual(mockGrades3m)
    })

    it('returns 6m grades data', async () => {
        const mockGrades6m = { data: [[
            'Value',
            'C',
        ]] }
        vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockGrades6m })

        const result = await fetchFactorGrades6m()

        expect(apiClient.get).toHaveBeenCalledWith('/factor-grades/6m')
        expect(result).toEqual(mockGrades6m)
    })

    it('throws error on failed request', async () => {
        vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'))

        await expect(fetchFactorGradesNow()).rejects.toThrow('Network error')
    })
})
