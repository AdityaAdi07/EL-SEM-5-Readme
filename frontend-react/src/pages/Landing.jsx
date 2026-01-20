import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const Landing = () => {
    const features = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
                </svg>
            ),
            title: 'Ensemble Learning',
            description: 'Hybrid Random Forest & XGBoost architecture for high-precision PM2.5 forecasting.'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
            ),
            title: 'Real-time Telemetry',
            description: 'Live ingestion of pollutant data from CPCB-authorized monitoring stations.'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-4.5 4.5 4.5 0 0 0-9 0 6.01 6.01 0 0 0 1.5 4.5m10.5 0a6.01 6.01 0 0 0-1.5-4.5 4.5 4.5 0 0 0-9 0 6.01 6.01 0 0 0-1.5 4.5m0 0a6.01 6.01 0 0 0 4.5 1.5h9c1.657 0 3-1.343 3-3v-1.5c0-1.657-1.343-3-3-3h-9" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5 12 14.25 8.25 10.5" />
                </svg>
            ),
            title: 'Explainable AI',
            description: 'SHAP-based attribution analysis to understand key pollution drivers.'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>

            ),
            title: 'Low Latency',
            description: 'Optimized inference engine delivering sub-second prediction results.'
        }
    ]

    return (
        <div
            className="min-h-screen bg-fixed bg-cover bg-center relative"
            style={{
                backgroundImage: "url('/hero-bg.jpg')",
            }}
        >
            {/* Dark Overlay for entire page */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] z-0"></div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10 px-4">
                <div className="max-w-7xl mx-auto relative z-10 text-center pt-20">
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-10 shadow-2xl ring-1 ring-emerald-500/10 hover:bg-emerald-500/20 transition-all duration-300 cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        System Operational
                    </div>

                    <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white mb-8 drop-shadow-2xl">
                        Intelligent Air Quality
                        <br className="hidden md:block my-2" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 filter drop-shadow-lg">
                            Forecasting & Analysis
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-md">
                        Deploying advanced machine learning ensembles to predict PM2.5 concentrations with granular explainability and real-time CPCB data integration.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/dashboard">
                            <Button size="lg" className="group relative w-full sm:w-auto min-w-[200px] h-14 bg-white text-emerald-950 hover:bg-emerald-50 border-none shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] text-lg font-bold rounded-full transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                <span className="relative z-10">Launch Monitor</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Button>
                        </Link>
                        <Link to="/about">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] h-14 bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40 backdrop-blur-md text-lg font-medium rounded-full transition-all duration-300 hover:shadow-lg">
                                Documentation
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="p-6 bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-slate-800/60 transition-all duration-300 group hover:-translate-y-1"
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 
                                    ${index === 0 ? 'bg-blue-500/20 text-blue-400' :
                                        index === 1 ? 'bg-purple-500/20 text-purple-400' :
                                            index === 2 ? 'bg-pink-500/20 text-pink-400' :
                                                'bg-amber-500/20 text-amber-400'}`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Metrics/Stats (Refined Professional Look) */}
            <section className="py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '3', label: 'Active Stations', color: 'text-emerald-400' },
                            { value: '94%', label: 'Model Accuracy', color: 'text-indigo-400' },
                            { value: '<1s', label: 'Inference Time', color: 'text-blue-400' },
                            { value: '24/7', label: 'Telemetry Stream', color: 'text-purple-400' }
                        ].map((stat, index) => (
                            <div key={index} className="p-8 flex flex-col items-center justify-center text-center bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-slate-800/60 transition-colors">
                                <div className={`text-5xl font-bold mb-2 tracking-tight ${stat.color} drop-shadow-lg`}>
                                    {stat.value}
                                </div>
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10 relative z-10 bg-black/20 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all duration-300">
                        <span className="text-xl">🌍</span>
                        <span className="font-bold text-white">AirQ Predict</span>
                    </div>
                    <p className="text-sm text-slate-400">
                        © 2024 Air Quality Prediction Project. Built with React & FastAPI.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default Landing
