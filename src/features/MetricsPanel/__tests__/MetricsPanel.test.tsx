import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useUser } from '@/hooks/useUser'

import MetricsPanel from '../MetricsPanel'

vi.mock('@/hooks/useUser', () => ({
    useUser: vi.fn(),
}))

vi.mock('@/components/shared/Loader/Loader', () => ({
    default: () => <div>LoaderMock</div>,
}))

vi.mock('@/components/FactorGraceCart/FactorGraceCart', () => ({
    default: () => <div>FactorGraceMock</div>,
}))

vi.mock('@/components/RatingSummaryCart/RatingSummaryCart', () => ({
    default: () => <div>RatingSummaryMock</div>,
}))

vi.mock('@/components/QuantRankingCart/QuantRankingCart', () => ({
    default: () => <div>QuantRankingMock</div>,
}))

describe('MetricsPanel', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('renders loader while user query is loading', () => {
        vi.mocked(useUser).mockReturnValue({
            data: undefined,
            isLoading: true,
            error: null,
        } as never)

        render(<MetricsPanel />)

        expect(screen.getByLabelText('MetricsPanel')).toBeInTheDocument()
        expect(screen.getByText('LoaderMock')).toBeInTheDocument()
        expect(screen.queryByText('RatingSummaryMock')).not.toBeInTheDocument()
    })

    it('renders error message when user query fails', () => {
        vi.mocked(useUser).mockReturnValue({
            data: undefined,
            isLoading: false,
            error: new Error('user request failed'),
        } as never)

        render(<MetricsPanel />)

        expect(screen.getByText('Something went wrong')).toBeInTheDocument()
        expect(screen.queryByText('LoaderMock')).not.toBeInTheDocument()
    })

    it('renders only quant ranking card for premium users', () => {
        vi.mocked(useUser).mockReturnValue({
            data: { premium: true },
            isLoading: false,
            error: null,
        } as never)

        render(<MetricsPanel />)

        expect(screen.getByText('QuantRankingMock')).toBeInTheDocument()
        expect(screen.queryByText('RatingSummaryMock')).not.toBeInTheDocument()
        expect(screen.queryByText('FactorGraceMock')).not.toBeInTheDocument()
    })

    it('renders all cards for non-premium users', () => {
        vi.mocked(useUser).mockReturnValue({
            data: { premium: false },
            isLoading: false,
            error: null,
        } as never)

        render(<MetricsPanel />)

        expect(screen.getByText('RatingSummaryMock')).toBeInTheDocument()
        expect(screen.getByText('FactorGraceMock')).toBeInTheDocument()
        expect(screen.getByText('QuantRankingMock')).toBeInTheDocument()
    })
})
