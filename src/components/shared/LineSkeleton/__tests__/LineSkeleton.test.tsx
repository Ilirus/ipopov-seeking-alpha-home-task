import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import LineSkeleton from '../LineSkeleton'

describe('LineSkeleton', () => {
    it('renders as a single div element', () => {
        const { container } = render(<LineSkeleton />)
        const divs = container.querySelectorAll('div')

        expect(divs).toHaveLength(1)
        expect(divs[0]).toBeInTheDocument()
    })

    it('preserves placeholder zero-width content', () => {
        const { container } = render(<LineSkeleton />)
        expect(container.textContent).toBe('\u200b')
    })

    it('accepts className prop and still renders', () => {
        const { container } = render(<LineSkeleton className="custom-class" />)
        expect(container.firstElementChild).toBeInTheDocument()
        expect(container.firstElementChild?.className).toContain('custom-class')
    })
})
