interface TableBodyProps<T> {
    isSuccess: boolean
    items: T[]
    skeletonCount: number
    noDataColSpan: number
    className?: string
    renderRow: (item: T | undefined, index: number) => React.ReactNode
}

export default function TableBody<T>({
    isSuccess,
    items,
    skeletonCount,
    noDataColSpan,
    className,
    renderRow,
}: TableBodyProps<T>) {
    const rows: Array<T | undefined> = isSuccess
        ? items
        : Array.from<undefined>({ length: skeletonCount })

    return (
        <tbody className={className}>
            {
                isSuccess && items.length === 0 ? (
                    <tr>
                        <td colSpan={noDataColSpan} className="text-center">No Data</td>
                    </tr>
                ) : (
                    rows
                ).map((item, index) => renderRow(item, index))
            }
        </tbody>
    )
}
