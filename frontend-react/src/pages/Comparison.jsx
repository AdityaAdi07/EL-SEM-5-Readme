import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { STATIONS, getAQIColor, getAQICategory, getComparisonData } from '../services/api'
import Card from '../components/ui/Card'
import AQIGauge from '../components/AQIGauge'

const Comparison = ({ darkMode }) => {
    const [stationData, setStationData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchComparison()
        // Auto refresh
        const interval = setInterval(fetchComparison, 300000)
        return () => clearInterval(interval)
    }, [])

    const fetchComparison = async () => {
        const result = await getComparisonData()
        let data = []
        if (result.success) {
            data = result.data
        } else {
            console.warn('Failed to fetch comparison:', result.error)
            setError('Failed to load live data')
        }

        // Add Mock Data for demo purposes
        const mockStations = [
            {
                name: 'Hebbal',
                AQI: 112,
                PM25: 68.4,
                PM10: 125.2,
                NO2: 45.1,
                CO: 2.1
            },
            {
                name: 'Whitefield',
                AQI: 145,
                PM25: 75.8,
                PM10: 142.5,
                NO2: 52.3,
                CO: 3.4
            }
        ]

        // Merge real data with mock data
        setStationData([...data, ...mockStations])
        setLoading(false)
    }

    // Find worst station
    const worstStation = stationData.length > 0
        ? stationData.reduce((prev, curr) => curr.AQI > prev.AQI ? curr : prev)
        : null

    if (loading && stationData.length === 0) {
        return <div className="p-8 text-center text-gray-500">Loading comparison data...</div>
    }

    return (
        <div
            className="min-h-screen bg-fixed bg-cover bg-center relative"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-md"> Station Comparison</h1>
                    <p className="text-slate-300">
                        Compare air quality across all monitoring stations
                    </p>
                </div>

                {/* Worst Air Quality Alert */}
                <Card darkMode={true} className="mb-8 border-l-4 border-l-red-500 bg-slate-800/60 backdrop-blur-md border-white/10 text-white">
                    <div className="flex items-center gap-4">
                        <span className="text-4xl">⚠️</span>
                        <div>
                            <h3 className="font-semibold text-lg text-white">Highest Pollution Alert</h3>
                            <p className="text-slate-200">
                                <span className="font-bold text-red-400">{worstStation.name.replace('_', ' ')}</span> currently has the worst air quality with AQI of{' '}
                                <span className="font-bold" style={{ color: getAQIColor(worstStation.AQI) }}>
                                    {worstStation.AQI} ({getAQICategory(worstStation.AQI)})
                                </span>
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Station Cards with AQI Gauges */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {stationData.map((station) => (
                        <Card
                            key={station.name}
                            darkMode={true}
                            className={`bg-slate-800/60 backdrop-blur-md border border-white/10 text-white transition-transform hover:scale-105 ${station.name === worstStation.name ? 'ring-2 ring-red-500 shadow-red-900/20' : ''}`}
                        >
                            <div className="text-center">
                                <h3 className="font-semibold text-lg mb-4 flex items-center justify-center gap-2 text-white">
                                    📍 {station.name.replace('_', ' ')}
                                    {station.name === worstStation.name && (
                                        <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                                            Worst
                                        </span>
                                    )}
                                </h3>

                                <AQIGauge aqi={station.AQI} size="medium" />

                                <div className="grid grid-cols-2 gap-3 mt-6">
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-xs text-slate-400">PM2.5</p>
                                        <p className="font-bold text-slate-100">{station.PM25} µg/m³</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-xs text-slate-400">PM10</p>
                                        <p className="font-bold text-slate-100">{station.PM10} µg/m³</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-xs text-slate-400">NO2</p>
                                        <p className="font-bold text-slate-100">{station.NO2} ppb</p>
                                    </div>
                                    <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                        <p className="text-xs text-slate-400">CO</p>
                                        <p className="font-bold text-slate-100">{station.CO} mg/m³</p>
                                    </div>

                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Bar Chart Comparison */}
                <Card darkMode={true} className="bg-slate-800/60 backdrop-blur-md border border-white/10 text-white mb-8">
                    <h3 className="font-semibold text-lg mb-6 text-white">📈 Pollutant Comparison Chart</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={stationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke={'#374151'} />
                            <XAxis dataKey="name" stroke={'#9ca3af'} tick={{ fill: '#e2e8f0' }} />
                            <YAxis stroke={'#9ca3af'} tick={{ fill: '#e2e8f0' }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #374151',
                                    borderRadius: '8px',
                                    color: '#fff'
                                }}
                            />
                            <Legend wrapperStyle={{ color: '#fff' }} />
                            <Bar dataKey="PM10" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="PM25" name="PM2.5" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="NO2" fill="#f97316" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="AQI" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* AI Health Impact Predictions (Mock Section) */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                        <span>🩺</span> AI Health Impact Predictions
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Respiratory Risk */}
                        <Card darkMode={true} className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md border border-white/10 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform">
                            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🫁</div>
                            <h3 className="font-bold text-lg mb-2">Respiratory Risk</h3>
                            <div className="text-3xl font-bold text-orange-200 mb-1">Moderate</div>
                            <p className="text-sm text-slate-300">
                                Sensitive groups should carry rescue inhalers. Risk increases after 6 PM due to temperature inversion.
                            </p>
                            <div className="mt-4 w-full bg-black/20 rounded-full h-1.5">
                                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                        </Card>

                        {/* Visibility Forecast */}
                        <Card darkMode={true} className="bg-slate-800/60 backdrop-blur-md border border-white/10 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform">
                            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">👁️</div>
                            <h3 className="font-bold text-lg mb-2">Visibility Forecast</h3>
                            <div className="text-3xl font-bold text-slate-200 mb-1">Low</div>
                            <p className="text-sm text-slate-300">
                                High particulate matter likely to reduce visibility to &lt; 2km in early morning hours. Drive cautiously.
                            </p>
                            <div className="mt-4 flex gap-2">
                                <span className="px-2 py-1 bg-white/10 rounded text-xs">Morning: 1.5km</span>
                                <span className="px-2 py-1 bg-white/10 rounded text-xs">Evening: 3.0km</span>
                            </div>
                        </Card>

                        {/* Activity Suggestion */}
                        <Card darkMode={true} className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-white/10 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform">
                            <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🏃</div>
                            <h3 className="font-bold text-lg mb-2">Activity Suggestion</h3>
                            <div className="text-3xl font-bold text-green-200 mb-1">Indoor</div>
                            <p className="text-sm text-slate-300">
                                Best time for outdoor run: <strong>4:00 PM - 6:00 PM</strong> when pollutant dispersion is highest.
                            </p>
                            <button className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors w-full">
                                View Hourly Plan
                            </button>
                        </Card>
                    </div>
                </div>

                {/* Legend - Moved to bottom */}
                <div className="p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/5">
                    <h4 className="font-medium mb-3 text-white">🎨 AQI Color Legend</h4>
                    <div className="flex flex-wrap gap-4 text-slate-300">
                        {[
                            { label: 'Good (0-50)', color: '#10b981' },
                            { label: 'Satisfactory (51-100)', color: '#84cc16' },
                            { label: 'Moderate (101-200)', color: '#eab308' },
                            { label: 'Poor (201-300)', color: '#f97316' },
                            { label: 'Very Poor (301-400)', color: '#ef4444' },
                            { label: 'Severe (401-500)', color: '#7c2d12' },
                        ].map(({ label, color }) => (
                            <div key={label} className="flex items-center gap-2">
                                <span
                                    className="w-4 h-4 rounded-full shadow-sm"
                                    style={{ backgroundColor: color }}
                                />
                                <span className="text-sm">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comparison
