export default function LineSkeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`bg-gray-200 text-transparent rounded animate-pulse ${className}`}>&#8203;</div>
    )
}
