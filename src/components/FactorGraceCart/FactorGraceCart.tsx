import { useMemo } from 'react'


import CardWrapper from '@/components/shared/CardWrapper/CardWrapper'
import LineSkeleton from '@/components/shared/LineSkeleton/LineSkeleton'
import TableBody from '@/components/shared/TableBody/TableBody'
import { useFactorGrades } from '@/hooks/useFactorGrades'

interface FactorGradeItem {
    name: string
    current: string
    grade3m: string
    grade6m: string
}

export default function FactorGradeCart() {
    const { data: factorGrades, error, isSuccess } = useFactorGrades()
    const factorGradesList: FactorGradeItem[] = useMemo(() => (
        factorGrades ? Object.entries(factorGrades).map(([
            name,
            grades,
        ]) => ({
            name,
            current: grades.current,
            grade3m: grades.grade3m,
            grade6m: grades.grade6m,
        })) : []
    ), [factorGrades])

    const renderTBodyList = (item: FactorGradeItem | undefined, index?: number) => {
        return (
            <tr key={item?.name || index} className="hover:bg-gray-50">
                <td className="truncate px-2 py-1 text-blue-700">{item?.name || <LineSkeleton />}</td>
                <td className="px-2 py-1 text-center">{item?.current || <LineSkeleton />}</td>
                <td className="px-2 py-1 text-center">{item?.grade3m || <LineSkeleton />}</td>
                <td className="px-2 py-1 text-center">{item?.grade6m || <LineSkeleton />}</td>
            </tr>
        )
    }

    return (
        <CardWrapper
            title="Factor Grade"
            error={error}
            errorMessage="Error loading factor grades"
        >
            <div className="text-sm h-42 overflow-auto">
                <table className="w-full h-full">
                    <thead className='sticky top-0 bg-white'>
                        <tr className="text-left text-xs text-slate-700 font-semibold">
                            <th className="px-2 py-1 w-[34%]"></th>
                            <th className="px-2 py-1 w-[22%] text-center">Now</th>
                            <th className="px-2 py-1 w-[22%] text-center">3M ago</th>
                            <th className="px-2 py-1 w-[22%] text-center">6M ago</th>
                        </tr>
                    </thead>
                    <TableBody
                        isSuccess={isSuccess}
                        items={factorGradesList}
                        skeletonCount={5}
                        noDataColSpan={4}
                        className="divide-y divide-gray-100"
                        renderRow={(item, index) => renderTBodyList(item, index)}
                    />
                </table>
            </div>
        </CardWrapper>
    )
}
