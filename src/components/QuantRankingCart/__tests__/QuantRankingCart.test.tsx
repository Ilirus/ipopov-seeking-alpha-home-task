import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as useQuantRankingModule from '@/hooks/useQuantRanking'
import type { QuantRankingResponse } from '@/types/stockAnalysisMetrics/quantRanking'

import QuantRankingCart from '../QuantRankingCart'

import type { UseQueryResult } from '@tanstack/react-query'

const mockData: QuantRankingResponse = {
    sector: 'Technology',
    industry: 'Software',
    rankings: {
        overall: { rank: 15, total: 5000 },
        sector: { rank: 3, total: 180 },
        industry_specific: { rank: 2, total: 74 },
    },
}

describe('QuantRankingCart', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it('renders title and skeletons while data is not available', () => {
        vi.spyOn(useQuantRankingModule, 'useQuantRanking').mockReturnValue({
            data: undefined,
            error: null,
            isSuccess: false,
        } as UseQueryResult<QuantRankingResponse, Error>)

        render(<QuantRankingCart />)

        expect(screen.getByText('Quant Ranking')).toBeInTheDocument()
        expect(screen.getAllByRole('listitem')).toHaveLength(5)
        expect(screen.queryByText('out of')).not.toBeInTheDocument()
    })

    it('shows error overlay and custom error message', () => {
        vi.spyOn(useQuantRankingModule, 'useQuantRanking').mockReturnValue({
            data: undefined,
            error: new Error('Request failed'),
            isSuccess: false,
        } as UseQueryResult<QuantRankingResponse, Error>)

        render(<QuantRankingCart />)

        expect(screen.getByText('Error loading quant ranking')).toBeInTheDocument()
    })

    it('renders quant ranking values when data is present', () => {
        vi.spyOn(useQuantRankingModule, 'useQuantRanking').mockReturnValue({
            data: mockData,
            error: null,
            isSuccess: true,
        } as UseQueryResult<QuantRankingResponse, Error>)

        render(<QuantRankingCart />)

        expect(screen.getByText('Sector')).toBeInTheDocument()
        expect(screen.getByText('Technology')).toBeInTheDocument()
        expect(screen.getByText('Industry')).toBeInTheDocument()
        expect(screen.getByText('Software')).toBeInTheDocument()

        expect(screen.getByText('Ranked Overall')).toBeInTheDocument()
        expect(screen.getByText('Ranked in Sector')).toBeInTheDocument()
        expect(screen.getByText('Ranked in Industry')).toBeInTheDocument()

        expect(screen.getAllByText('out of').length).toBe(3)
        expect(screen.getByText('15')).toBeInTheDocument()
        expect(screen.getByText('5000')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
        expect(screen.getByText('180')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('74')).toBeInTheDocument()
    })

    it('calls alert when CTA button is clicked', () => {
        vi.spyOn(useQuantRankingModule, 'useQuantRanking').mockReturnValue({
            data: mockData,
            error: null,
            isSuccess: true,
        } as UseQueryResult<QuantRankingResponse, Error>)

        const alertMock = vi.fn()
        vi.stubGlobal('alert', alertMock)

        render(<QuantRankingCart />)

        fireEvent.click(screen.getByRole('button', { name: /Quant Ratings Beat The Market/i }))

        expect(alertMock).toHaveBeenCalledWith('Page is in progress')
    })
})
