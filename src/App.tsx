import './App.css'

import MetricsPanel from '@/features/MetricsPanel/MetricsPanel'

function App() {
    return (
        <>
            <main className="px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="w-full mx-auto">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 text-slate-900">Stock Analysis Dashboard</h1>

                    <section className="mb-12">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-800">About This Dashboard</h2>
                        <p className="text-slate-700 mb-4">
                            This dashboard provides comprehensive stock analysis metrics and insights. The left sidebar remains fixed while you scroll through the content, allowing you to always have access to key metrics.
                        </p>
                        <p className="text-slate-700 mb-4">
                            Monitor real-time ratings, factor grades, and quantitative rankings for informed investment decisions.
                        </p>
                    </section>
                    <div className="flex md:flex-row flex-col md:items-start items-center gap-8">
                        <MetricsPanel />
                        <div className="flex-1">
                            <section className="mb-12">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-800">Key Features</h2>
                                <ul className="space-y-2 text-slate-700">
                                    <li className="flex items-start">
                                        <span className="text-green-500 font-bold mr-3">✓</span>
                                        <span>Real-time Rating Summary with analyst ratings</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 font-bold mr-3">✓</span>
                                        <span>Factor Grade analysis tracking 3-month and 6-month trends</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 font-bold mr-3">✓</span>
                                        <span>Quantitative Ranking across sector and industry metrics</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 font-bold mr-3">✓</span>
                                        <span>Responsive design optimized for all screen sizes</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 font-bold mr-3">✓</span>
                                        <span>Loading states with skeleton screens</span>
                                    </li>
                                </ul>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-800">Sidebar Overview</h2>
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                                    <p className="text-slate-700 mb-3">
                                        The left sidebar displays three main components:
                                    </p>
                                    <ol className="space-y-2 text-slate-700 list-decimal list-inside">
                                        <li><strong>Rating Summary:</strong> Current analyst ratings and consensus scores</li>
                                        <li><strong>Factor Grade:</strong> Performance grades across different factors</li>
                                        <li><strong>Quant Ranking:</strong> Quantitative rankings by sector and industry</li>
                                    </ol>
                                </div>
                            </section>

                            <section className="mb-12">
                                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-800">How to Use</h2>
                                <div className="space-y-4">
                                    <div className="border-l-4 border-slate-300 pl-4 py-2">
                                        <h3 className="font-semibold text-slate-800 mb-1">View Metrics</h3>
                                        <p className="text-slate-700">Check the cards on the left sidebar to view current stock metrics and ratings.</p>
                                    </div>
                                    <div className="border-l-4 border-slate-300 pl-4 py-2">
                                        <h3 className="font-semibold text-slate-800 mb-1">Monitor Changes</h3>
                                        <p className="text-slate-700">Track factor grades across different time periods to identify trends.</p>
                                    </div>
                                    <div className="border-l-4 border-slate-300 pl-4 py-2">
                                        <h3 className="font-semibold text-slate-800 mb-1">Compare Rankings</h3>
                                        <p className="text-slate-700">Compare your stock's ranking against sector and industry benchmarks.</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <section className="mb-12">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-slate-800">Performance Insights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                            <div className="bg-slate-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-slate-800 mb-2">Ratings</h3>
                                <p className="text-slate-700 text-sm">
                                    Displays aggregated analyst ratings with buy, hold, and sell scores.
                                </p>
                            </div>
                            <div className="bg-slate-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-slate-800 mb-2">Factors</h3>
                                <p className="text-slate-700 text-sm">
                                    Shows technical and fundamental grades with historical comparison.
                                </p>
                            </div>
                            <div className="bg-slate-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-slate-800 mb-2">Rankings</h3>
                                <p className="text-slate-700 text-sm">
                                    Provides relative ranking position within sector and industry groups.
                                </p>
                            </div>
                            <div className="bg-slate-100 p-4 rounded-lg">
                                <h3 className="font-semibold text-slate-800 mb-2">Real-time Updates</h3>
                                <p className="text-slate-700 text-sm">
                                    Data refreshes automatically to show the latest market information.
                                </p>
                            </div>
                        </div>
                    </section>

                    <footer className="mt-12 pt-8 border-t border-slate-200">
                        <p className="text-slate-600 text-sm">
                            Stock Analysis Dashboard • Powered by Seeking Alpha • Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </footer>
                </div>
            </main>
        </>
    )
}

export default App
