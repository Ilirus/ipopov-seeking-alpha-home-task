import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TableBody from '../TableBody'

describe('MetricTableBody', () => {
    it('renders skeleton rows when not successful', () => {
        render(
            <table>
                <TableBody
                    isSuccess={false}
                    items={[]}
                    skeletonCount={3}
                    noDataColSpan={2}
                    renderRow={(_item, index) => (
                        <tr key={index}>
                            <td>Skeleton</td>
                        </tr>
                    )}
                />
            </table>
        )

        expect(screen.getAllByText('Skeleton')).toHaveLength(3)
    })

    it('renders no data row when successful and empty', () => {
        render(
            <table>
                <TableBody
                    isSuccess={true}
                    items={[]}
                    skeletonCount={3}
                    noDataColSpan={2}
                    renderRow={(_item, index) => (
                        <tr key={index}>
                            <td>Row</td>
                        </tr>
                    )}
                />
            </table>
        )

        expect(screen.getByText('No Data')).toBeInTheDocument()
        expect(screen.queryByText('Row')).not.toBeInTheDocument()
    })

    it('renders provided items when successful', () => {
        const items = [
            { id: 'a', value: 'Alpha' },
            { id: 'b', value: 'Beta' },
        ]

        render(
            <table>
                <TableBody
                    isSuccess={true}
                    items={items}
                    skeletonCount={3}
                    noDataColSpan={2}
                    renderRow={(item) => (
                        <tr key={item?.id}>
                            <td>{item?.value}</td>
                        </tr>
                    )}
                />
            </table>
        )

        expect(screen.getByText('Alpha')).toBeInTheDocument()
        expect(screen.getByText('Beta')).toBeInTheDocument()
    })
})
