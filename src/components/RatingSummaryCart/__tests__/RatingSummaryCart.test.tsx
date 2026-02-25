import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import * as useRatingsSummaryModule from '@/hooks/useRatingsSummary'
import type { RatingsSummaryResponse } from '@/types/stockAnalysisMetrics/ratingsSummary'

import RatingSummaryCart from '../RatingSummaryCart'

import type { UseQueryResult } from '@tanstack/react-query'

const mockData: RatingsSummaryResponse = {
    Alpha: { score: 1.23, rating: 'A' },
    Beta: { score: 2.34, rating: 'B' },
}

describe('RatingSummaryCart', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    it('shows skeletons while loading', () => {
        vi.spyOn(useRatingsSummaryModule, 'useRatingsSummary').mockReturnValue({
            data: undefined,
            error: null,
            isSuccess: false,
        } as UseQueryResult<RatingsSummaryResponse, Error>)
        render(<RatingSummaryCart />)
        expect(screen.getByText('Rating Summary')).toBeInTheDocument()
        // Skeletons are rendered as LineSkeleton components, but may not have text, so check for table rows
        expect(screen.getAllByRole('row').length).toBeGreaterThan(0)
    })

    it('shows error overlay and message', () => {
        vi.spyOn(useRatingsSummaryModule, 'useRatingsSummary').mockReturnValue({
            data: undefined,
            error: new Error('Test error'),
            isSuccess: false,
        } as UseQueryResult<RatingsSummaryResponse, Error>)
        render(<RatingSummaryCart />)
        expect(screen.getByText('Error loading ratings')).toBeInTheDocument()
    })

    it('shows "No Data" when isSuccess and empty', () => {
        vi.spyOn(useRatingsSummaryModule, 'useRatingsSummary').mockReturnValue({
            data: {},
            error: null,
            isSuccess: true,
        } as UseQueryResult<RatingsSummaryResponse, Error>)
        render(<RatingSummaryCart />)
        expect(screen.getByText('No Data')).toBeInTheDocument()
    })

    it('renders table rows for each item', () => {
        vi.spyOn(useRatingsSummaryModule, 'useRatingsSummary').mockReturnValue({
            data: mockData,
            error: null,
            isSuccess: true,
        } as UseQueryResult<RatingsSummaryResponse, Error>)
        render(<RatingSummaryCart />)
        expect(screen.getByText('Alpha')).toBeInTheDocument()
        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('1.23')).toBeInTheDocument()
        expect(screen.getByText('Beta')).toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()
        expect(screen.getByText('2.34')).toBeInTheDocument()
    })

    it('renders title correctly', () => {
        vi.spyOn(useRatingsSummaryModule, 'useRatingsSummary').mockReturnValue({
            data: mockData,
            error: null,
            isSuccess: true,
        } as UseQueryResult<RatingsSummaryResponse, Error>)
        render(<RatingSummaryCart />)
        expect(screen.getByText('Rating Summary')).toBeInTheDocument()
    })
})
