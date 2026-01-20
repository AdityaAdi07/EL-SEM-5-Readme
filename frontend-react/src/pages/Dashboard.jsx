import { useState, useEffect } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import PollutantCard from '../components/PollutantCard'
import AQIGauge from '../components/AQIGauge'
import AIAnalysisReport from '../components/AIAnalysisReport'
import StationPeakChart from '../components/StationPeakChart'
import MonthlyPeakTrend from '../components/MonthlyPeakTrend'
import HistoryTrendChart from '../components/HistoryTrendChart'
import PollutantDistributionChart from '../components/PollutantDistributionChart'
import { predictAdvanced, getAIAnalysis, getMockPrediction, getLatestData, getHistory, STATIONS } from '../services/api'

const Dashboard = ({ darkMode }) => {
    const [selectedStation, setSelectedStation] = useState('Peenya')
    const [loading, setLoading] = useState(false)
    const [prediction, setPrediction] = useState(null)
    const [advancedPrediction, setAdvancedPrediction] = useState(null)
    const [aiAnalysis, setAiAnalysis] = useState(null)
    const [analysisLoading, setAnalysisLoading] = useState(false)
    const [error, setError] = useState(null)
    const [historyData, setHistoryData] = useState([])

    const [sensorData, setSensorData] = useState({
        PM10: 0, NO2: 0, NO: 0, NOx: 0, CO: 0, Ozone: 0, RH: 0,
        PM25_lag_1: 0, PM25_lag_24: 0,
        datetime: '--'
    })

    useEffect(() => {
        fetchData(selectedStation)
        const interval = setInterval(() => fetchData(selectedStation), 300000)
        return () => clearInterval(interval)
    }, [selectedStation])

    const fetchData = async (station) => {
        // 1. Latest Data
        const result = await getLatestData(station)
        if (result.success) {
            setSensorData(result.data)
            if (error && error.includes('Failed to fetch')) setError(null)
        } else {
            console.warn('Using fallback data due to:', result.error)
        }

        // 2. History Data
        const historyResult = await getHistory(station, 24)
        if (historyResult.success && Array.isArray(historyResult.data)) {
            setHistoryData(historyResult.data)
        }
    }

    const handlePredict = async () => {
        setLoading(true)
        setError(null)
        setAiAnalysis(null)
        try {
            const payload = {
                datetime: sensorData.datetime !== '--' ? sensorData.datetime : new Date().toISOString(),
                PM10: sensorData.PM10,
                NO2: sensorData.NO2,
                NO: sensorData.NO || 0,
                NOx: sensorData.NOx,
                CO: sensorData.CO,
                Ozone: sensorData.Ozone,
                RH: sensorData.RH,
                PM25_lag_1: sensorData.PM25_lag_1,
                PM25_lag_24: sensorData.PM25_lag_24,
                month: new Date().getMonth() + 1,
                hour: new Date().getHours(),
            }
            const result = await predictAdvanced(payload)
            if (result.success) {
                setPrediction(result.data.current)
                setAdvancedPrediction(result.data.forecast)
                fetchAIAnalysis(result.data, payload)
            } else {
                setPrediction(getMockPrediction())
                setError('Backend unavailable. Showing demo prediction.')
            }
        } catch (err) {
            setPrediction(getMockPrediction())
            setError('Backend unavailable. Showing demo prediction.')
        } finally {
            setLoading(false)
        }
    }

    const fetchAIAnalysis = async (predictionData, features) => {
        setAnalysisLoading(true)
        try {
            const analysisPayload = {
                pm25_current: predictionData.current.pm25,
                pm25_future: predictionData.forecast.pm25_6h,
                is_high_pollution: predictionData.forecast.is_high_pollution,
                humidity: features.RH,
                month: features.month,
                hour: features.hour,
                lag_24: features.PM25_lag_24
            }
            const result = await getAIAnalysis(analysisPayload)
            if (result.success) setAiAnalysis(result.data.reasoning)
        } catch (err) {
            console.error(err)
        } finally {
            setAnalysisLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen bg-fixed bg-cover bg-center relative animate-fade-in"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28 space-y-8">
                {/* Header / Filter Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1 shadow-black drop-shadow-lg tracking-tight">Dashboard</h1>
                        <p className="text-slate-300 text-sm font-medium">Real-time air quality monitoring</p>
                    </div>

                    <div className="bg-black/20 backdrop-blur-xl p-1.5 rounded-2xl flex items-center shadow-2xl border border-white/10">
                        {Object.keys(STATIONS).map((station) => (
                            <button
                                key={station}
                                onClick={() => { setSelectedStation(station); setPrediction(null); }}
                                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${selectedStation === station
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/40 scale-105 ring-1 ring-white/20'
                                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {station.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Left: Sensor Widgets */}
                    <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4 h-min">
                        <PollutantCard name="PM10" value={sensorData.PM10} unit="µg/m³" darkMode={true} />
                        <PollutantCard name="NO2" value={sensorData.NO2} unit="ppb" darkMode={true} />
                        <PollutantCard name="NOx" value={sensorData.NOx} unit="ppb" darkMode={true} />
                        <PollutantCard name="CO" value={sensorData.CO} unit="mg/m³" darkMode={true} />
                        <PollutantCard name="Ozone" value={sensorData.Ozone} unit="ppb" darkMode={true} />
                        <PollutantCard name="RH" value={sensorData.RH} unit="%" icon="💧" darkMode={true} />
                    </div>

                    {/* Center: Hero Prediction Area */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* Prediction Hero Card */}
                        <div className="card p-10 bg-gradient-to-br from-indigo-600/80 to-purple-700/80 backdrop-blur-2xl border border-white/20 text-white shadow-2xl relative overflow-hidden rounded-[2rem] group transition-all hover:border-white/30">
                            {/* Decorative Background Circles */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-400/20 blur-3xl group-hover:bg-indigo-400/30 transition-all duration-700"></div>
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl group-hover:bg-purple-400/30 transition-all duration-700"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl font-extrabold mb-3 tracking-tight">AQI Forecast Model</h2>
                                    <p className="text-indigo-100 mb-8 max-w-sm text-lg leading-relaxed font-light">
                                        Ensemble ML model predicting PM2.5 levels based on real-time atmospheric data.
                                    </p>
                                    <button
                                        onClick={handlePredict}
                                        disabled={loading}
                                        className="px-8 py-3.5 bg-white text-indigo-600 rounded-xl font-bold shadow-xl shadow-indigo-900/20 hover:shadow-indigo-900/40 hover:scale-105 transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group-hover:ring-4 ring-white/20"
                                    >
                                        {loading ? 'Processing...' : 'Run Prediction ⚡'}
                                    </button>
                                </div>

                                {prediction ? (
                                    <div className="flex gap-6">
                                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center min-w-[140px]">
                                            <div className="text-xs uppercase tracking-wider text-indigo-200 mb-1">Predicted PM2.5</div>
                                            <div className="text-4xl font-bold">{prediction.pm25 ? prediction.pm25.toFixed(1) : prediction.pm25_prediction.toFixed(1)}</div>
                                            <div className="text-sm opacity-80">µg/m³</div>
                                        </div>
                                        <div className="bg-white text-indigo-900 p-6 rounded-2xl shadow-lg text-center min-w-[140px]">
                                            <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">AQI Level</div>
                                            <div className="text-4xl font-bold">{prediction.aqi}</div>
                                            <div className="font-semibold text-sm mt-1">{prediction.category || prediction.aqi_category}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-48 h-48 opacity-20 flex items-center justify-center border-2 border-dashed border-white rounded-full">
                                        <span className="text-4xl">🔮</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-orange-500/20 text-orange-200 text-sm border border-orange-500/30 flex items-center gap-2 backdrop-blur-md">
                                <span>⚠️</span> {error}
                            </div>
                        )}

                        {/* Secondary Cards: Forecast & Details */}
                        {prediction && (
                            <div className="grid md:grid-cols-2 gap-6">

                                {/* Forecast Card */}
                                {advancedPrediction && (
                                    <div className="card p-6 bg-slate-800/60 backdrop-blur-md border-white/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-white">6-Hour Forecast</h3>
                                            <span className={`px-2 py-1 rounded-lg text-xs font-bold ${advancedPrediction.is_high_pollution ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                                                {advancedPrediction.status}
                                            </span>
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <span className="text-4xl font-bold text-white">{advancedPrediction.pm25_6h.toFixed(1)}</span>
                                            <span className="text-slate-400 mb-1">µg/m³</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">Predicted trend based on current wind & humidity</p>
                                    </div>
                                )}

                                {/* SHAP Drivers */}
                                <div className="card p-6 bg-slate-800/60 backdrop-blur-md border-white/10">
                                    <h3 className="font-bold text-white mb-4">Key Contributors</h3>
                                    <div className="space-y-3">
                                        {prediction.explanation && prediction.explanation.slice(0, 3).map((exp, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                                {exp}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* AI Analysis */}
                        {(aiAnalysis || analysisLoading) && (
                            <div className="card p-0 overflow-hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
                                <AIAnalysisReport report={aiAnalysis} loading={analysisLoading} darkMode={darkMode} />
                            </div>
                        )}

                        {/* Charts Area */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Row 1: New Graphs */}
                            <HistoryTrendChart data={historyData} darkMode={true} />
                            <PollutantDistributionChart data={sensorData} darkMode={true} />

                            {/* Row 2: Existing Graphs */}
                            <StationPeakChart darkMode={true} />
                            <MonthlyPeakTrend darkMode={true} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
