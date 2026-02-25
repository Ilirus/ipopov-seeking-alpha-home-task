import { useMemo } from 'react'

import { useQuantRanking } from '@/hooks/useQuantRanking'

import CardWrapper from '../shared/CardWrapper/CardWrapper'
import LineSkeleton from '../shared/LineSkeleton/LineSkeleton'

type QuantRankingKey = 'sector' | 'industry' | 'overall' | 'sector_ranking' | 'industry_ranking'

const QUANT_RANKING_ITEMS: { key: QuantRankingKey; label: string }[] = [
    { key: 'sector', label: 'Sector' },
    { key: 'industry', label: 'Industry' },
    { key: 'overall', label: 'Ranked Overall' },
    { key: 'sector_ranking', label: 'Ranked in Sector' },
    { key: 'industry_ranking', label: 'Ranked in Industry' },
]

export default function QuantRankingCart() {
    const { data: quantData, error } = useQuantRanking()

    const rankingValues = useMemo<Partial<Record<QuantRankingKey, React.ReactNode>>>(() => {
        if (!quantData) {
            return {}
        }

        const { sector, industry, rankings } = quantData

        return {
            sector,
            industry,
            overall: (
                <>
                    <b>{rankings.overall.rank}</b> out of <b>{rankings.overall.total}</b>
                </>
            ),
            sector_ranking: (
                <>
                    <b>{rankings.sector.rank}</b> out of <b>{rankings.sector.total}</b>
                </>
            ),
            industry_ranking: (
                <>
                    <b>{rankings.industry_specific.rank}</b> out of <b>{rankings.industry_specific.total}</b>
                </>
            ),
        }
    }, [quantData])

    return (
        <CardWrapper
            title="Quant Ranking"
            error={error}
            errorMessage="Error loading quant ranking"
        >
            <ul className="space-y-2 mb-3 text-sm h-38 overflow-auto">
                {QUANT_RANKING_ITEMS.map(item => (
                    <li key={item.key} className="flex justify-between">
                        <span className="text-nowrap mr-2">{item.label}</span>
                        <span className="text-right text-blue-700 w-full max-w-[66%]">
                            {rankingValues[item.key] || <LineSkeleton />}
                        </span>
                    </li>
                ))}
            </ul>
            <button
                type="button"
                className="text-blue-700 hover:underline text-xs cursor-pointer"
                onClick={() => alert('Page is in progress')}
            >
                Quant Ratings Beat The Market &raquo;
            </button>
        </CardWrapper>
    )
}
