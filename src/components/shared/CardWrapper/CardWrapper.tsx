interface CardWrapperProps extends React.PropsWithChildren {
    title: string
    error?: Error | null
    errorMessage?: string
}

export default function CardWrapper({
    title,
    error,
    errorMessage,
    children,
}: CardWrapperProps) {

    return (
        <div className="bg-white/90 rounded-lg px-5 py-4 shadow-md text-slate-900 relative">
            <h3 className="m-0 mb-3 text-slate-600 text-xl font-semibold">{title}</h3>
            {children}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                    <p className="text-red-500 text-sm font-semibold bg-white/95 px-3 py-2 rounded">
                        {errorMessage || error.message}
                    </p>
                </div>
            )}
        </div>
    )
}
