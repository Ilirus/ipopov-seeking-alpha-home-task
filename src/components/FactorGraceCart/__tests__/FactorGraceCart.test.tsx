import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import * as useFactorGradesModule from '@/hooks/useFactorGrades'

import FactorGraceCart from '../FactorGraceCart'

const queryClient = new QueryClient()

describe('FactorGraceCart', () => {
    it('renders loading skeletons when loading', () => {
        vi.spyOn(useFactorGradesModule, 'useFactorGrades').mockReturnValue({
            data: undefined,
            isLoading: true,
            isSuccess: false,
            isError: false,
            error: undefined,
        })
        render(
            <QueryClientProvider client={queryClient}>
                <FactorGraceCart />
            </QueryClientProvider>
        )
        expect(screen.getByText('Factor Grade')).toBeInTheDocument()
        expect(screen.getAllByRole('row')).toHaveLength(6)
        expect(screen.queryByText(/Error loading factor grades/i)).toBeNull()
        expect(screen.queryByText(/No Data/i)).toBeNull()
    })

    it('renders error message when error', () => {
        vi.spyOn(useFactorGradesModule, 'useFactorGrades').mockReturnValue({
            data: undefined,
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: { message: 'Test error' } as Error,
        })
        render(
            <QueryClientProvider client={queryClient}>
                <FactorGraceCart />
            </QueryClientProvider>
        )
        expect(screen.getByText(/Error loading factor grades/i)).toBeInTheDocument()
    })

    it('renders No Data when isSuccess and empty', () => {
        vi.spyOn(useFactorGradesModule, 'useFactorGrades').mockReturnValue({
            data: {},
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: undefined,
        })
        render(
            <QueryClientProvider client={queryClient}>
                <FactorGraceCart />
            </QueryClientProvider>
        )
        expect(screen.getByText(/No Data/i)).toBeInTheDocument()
    })

    it('renders factor grades table when data present', () => {
        vi.spyOn(useFactorGradesModule, 'useFactorGrades').mockReturnValue({
            data: {
                Value: { current: 'A', grade3m: 'B', grade6m: 'C' },
                Growth: { current: 'B+', grade3m: 'C-', grade6m: 'D' },
            },
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: undefined,
        })
        render(
            <QueryClientProvider client={queryClient}>
                <FactorGraceCart />
            </QueryClientProvider>
        )
        expect(screen.getByText('Value')).toBeInTheDocument()
        expect(screen.getByText('Growth')).toBeInTheDocument()
        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('B+')).toBeInTheDocument()
        expect(screen.getByText('C')).toBeInTheDocument()
        expect(screen.getByText('D')).toBeInTheDocument()
    })
})
