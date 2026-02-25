import { useMemo } from 'react'

import CardWrapper from '@/components/shared/CardWrapper/CardWrapper'
import LineSkeleton from '@/components/shared/LineSkeleton/LineSkeleton'
import TableBody from '@/components/shared/TableBody/TableBody'
import { useRatingsSummary } from '@/hooks/useRatingsSummary'


interface RatingItem {
    name: string
    rating: string
    score: number
}

export default function RatingSummaryCart() {
    const { data: ratingData, error, isSuccess } = useRatingsSummary()
    const ratingDataList: RatingItem[] = useMemo(() => (
        ratingData ? Object.entries(ratingData).map<RatingItem>(([
            name,
            { score, rating },
        ]) => ({
            name,
            score: +score.toFixed(2),
            rating,
        })) : []
    ), [ratingData])

    return (
        <CardWrapper
            title="Rating Summary"
            error={error}
            errorMessage="Error loading ratings"
        >

            <div className="text-sm h-21 overflow-auto">
                <table className="w-full h-full text-sm border-collapse">
                    <TableBody
                        isSuccess={isSuccess}
                        items={ratingDataList}
                        skeletonCount={3}
                        noDataColSpan={4}
                        renderRow={(item, index) => (
                            <tr key={item?.name || index} className="hover:bg-gray-50">
                                <td className="truncate px-2 py-1 text-blue-700">{item?.name || <LineSkeleton />}</td>
                                <td className="px-2 py-1 text-center">{item?.rating || <LineSkeleton />}</td>
                                <td className="px-2 py-1 text-center">{item?.score ?? <LineSkeleton />}</td>
                            </tr>
                        )}
                    />
                </table>
            </div>
        </CardWrapper>
    )
}
