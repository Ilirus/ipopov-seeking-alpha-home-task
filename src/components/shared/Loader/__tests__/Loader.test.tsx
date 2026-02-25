import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Loader from '../Loader'

describe('Loader', () => {
    it('renders stable loader DOM structure', () => {
        const { container } = render(<Loader />)

        const root = container.firstElementChild
        expect(root).toBeInTheDocument()
        expect(root?.tagName).toBe('DIV')

        const divs = container.querySelectorAll('div')
        expect(divs).toHaveLength(3)
        expect(divs[2]?.children.length).toBe(0)
    })

    it('mounts and unmounts without runtime errors', () => {
        const { unmount } = render(<Loader />)
        expect(() => unmount()).not.toThrow()
    })
})
