
import FactorGradeCart from '@/components/FactorGraceCart/FactorGraceCart'
import QuantRankingCart from '@/components/QuantRankingCart/QuantRankingCart'
import RatingSummaryCart from '@/components/RatingSummaryCart/RatingSummaryCart'
import Loader from '@/components/shared/Loader/Loader'
import { useUser } from '@/hooks/useUser'

export default function MetricsPanel() {
    const { data: user, isLoading, error } = useUser()

    let content
    if (isLoading) {
        content = (
            <div className="flex flex-1 items-center justify-center h-full">
                <Loader />
            </div>
        )
    } else if (error) {
        content = (
            <div className="flex flex-1 items-center justify-center h-full text-red-500 font-semibold">
                Something went wrong
            </div>
        )
    } else if (user?.premium) {
        content = <QuantRankingCart />
    } else {
        content = (
            <>
                <RatingSummaryCart />
                <FactorGradeCart />
                <QuantRankingCart />
            </>
        )
    }

    return (
        <aside
            className="flex flex-col h-167 gap-4 z-30 w-77.5"
            aria-label="MetricsPanel"
        >
            {content}
        </aside>
    )
}
