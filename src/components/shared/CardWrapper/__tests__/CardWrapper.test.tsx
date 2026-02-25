import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import CardWrapper from '../CardWrapper'

describe('CardWrapper', () => {
    it('renders title and children', () => {
        render(
            <CardWrapper title="Test Title">
                <div>Child Content</div>
            </CardWrapper>
        )
        expect(screen.getByText('Test Title')).toBeInTheDocument()
        expect(screen.getByText('Child Content')).toBeInTheDocument()
    })

    it('shows error message when error is provided', () => {
        const error = new Error('Something went wrong')
        render(
            <CardWrapper title="Error Title" error={error}>
                <div>Child Content</div>
            </CardWrapper>
        )
        const errorMsg = screen.getByText('Something went wrong')
        expect(errorMsg).toBeInTheDocument()
    })

    it('shows custom errorMessage if provided', () => {
        const error = new Error('Default error')
        render(
            <CardWrapper title="Custom Error" error={error} errorMessage="Custom error message">
                <div>Child Content</div>
            </CardWrapper>
        )
        expect(screen.getByText('Custom error message')).toBeInTheDocument()
        expect(screen.queryByText('Default error')).not.toBeInTheDocument()
    })

    it('renders without error', () => {
        render(
            <CardWrapper title="No Error">
                <span>Some content</span>
            </CardWrapper>
        )
        expect(screen.getByText('No Error')).toBeInTheDocument()
        expect(screen.getByText('Some content')).toBeInTheDocument()
        expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
    })

    it('renders empty children', () => {
        render(<CardWrapper title="Empty Children" />)
        expect(screen.getByText('Empty Children')).toBeInTheDocument()
    })

    it('does not show error overlay if error is not provided', () => {
        render(
            <CardWrapper title="No Error">
                <div>Child Content</div>
            </CardWrapper>
        )
        expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument()
        expect(screen.queryByText('Custom error message')).not.toBeInTheDocument()

    })
})


