import Card from '../components/ui/Card'

const Icons = {
    Tree: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 22v-5" /><path d="M5 12L12 3l7 9h-2a10 10 0 1 1-10 0h-2z" />
        </svg>
    ),
    Zap: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    Layers: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
        </svg>
    ),
    Brain: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
    ),
    Rocket: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    ),
    Code: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
    ),
    BarChart: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    ),
    Atom: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="1" /><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z" /><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z" />
        </svg>
    ),
    Palette: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
    ),
    Building: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
        </svg>
    ),
    Globe: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    Activity: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    ),
    Settings: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    Cpu: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
        </svg>
    ),
    Search: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    Check: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    MapPin: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Layout: (props) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />
        </svg>
    )
}

const About = ({ darkMode }) => {
    const technologies = [
        {
            category: 'Machine Learning',
            items: [
                { name: 'Random Forest', desc: 'Ensemble of decision trees for robust predictions', icon: Icons.Tree, color: 'text-emerald-400' },
                { name: 'XGBoost', desc: 'Gradient boosting for high accuracy', icon: Icons.Zap, color: 'text-yellow-400' },
                { name: 'Ensemble Learning', desc: 'Weighted combination for best results', icon: Icons.Layers, color: 'text-purple-400' },
                { name: 'SHAP', desc: 'Explainable AI for feature importance', icon: Icons.Brain, color: 'text-indigo-400' },
            ]
        },
        {
            category: 'Backend',
            items: [
                { name: 'FastAPI', desc: 'High-performance Python API framework', icon: Icons.Rocket, color: 'text-teal-400' },
                { name: 'Python', desc: 'Core language for ML & backend', icon: Icons.Code, color: 'text-blue-400' },
                { name: 'Pandas & NumPy', desc: 'Data processing & analysis', icon: Icons.BarChart, color: 'text-orange-400' },
            ]
        },
        {
            category: 'Frontend',
            items: [
                { name: 'React.js', desc: 'Modern component-based UI framework', icon: Icons.Atom, color: 'text-sky-400' },
                { name: 'Tailwind CSS', desc: 'Utility-first CSS framework', icon: Icons.Palette, color: 'text-cyan-400' },
                { name: 'Recharts', desc: 'Data visualization library', icon: Icons.Layout, color: 'text-pink-400' },
            ]
        },
        {
            category: 'Data Source',
            items: [
                { name: 'CPCB', desc: 'Central Pollution Control Board data', icon: Icons.Building, color: 'text-slate-300' },
                { name: 'AQICN API', desc: 'Real-time air quality data', icon: Icons.Globe, color: 'text-blue-300' },
            ]
        }
    ]

    const flowSteps = [
        { step: 1, title: 'Data Collection', desc: 'Real-time data from CPCB monitoring stations', icon: Icons.Activity, color: 'text-blue-400' },
        { step: 2, title: 'Feature Engineering', desc: 'Temporal features, lag variables, rolling stats', icon: Icons.Settings, color: 'text-orange-400' },
        { step: 3, title: 'ML Prediction', desc: 'Random Forest + XGBoost ensemble', icon: Icons.Cpu, color: 'text-purple-400' },
        { step: 4, title: 'Explainability', desc: 'SHAP values for transparent insights', icon: Icons.Search, color: 'text-emerald-400' },
        { step: 5, title: 'Results', desc: 'PM2.5 prediction, AQI, health advisories', icon: Icons.Check, color: 'text-green-400' },
    ]

    return (
        <div
            className="min-h-screen bg-fixed bg-cover bg-center relative"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-md">About This System</h1>
                    <p className="text-lg max-w-3xl mx-auto text-slate-300">
                        An AI-powered air quality prediction system using machine learning
                        to provide accurate, explainable PM2.5 forecasts for Bengaluru
                    </p>
                </div>

                {/* System Architecture Flow */}
                <Card darkMode={true} className="mb-12 bg-slate-800/60 backdrop-blur-md border border-white/10 text-white">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                        <Icons.Layers className="w-6 h-6 text-indigo-400" />
                        <span>System Architecture</span>
                    </h2>

                    <div className="relative">
                        {/* Flow diagram */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            {flowSteps.map((step, index) => (
                                <div key={step.step} className="flex items-center">
                                    <div className={`
                      flex flex-col items-center text-center p-4 rounded-xl min-w-[140px]
                      bg-white/10 border border-white/5 shadow-lg transition-transform hover:scale-105
                    `}>
                                        <div className={`p-3 rounded-full bg-white/5 mb-3 ${step.color}`}>
                                            <step.icon className="w-8 h-8" />
                                        </div>
                                        <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Step {step.step}</span>
                                        <span className="font-semibold text-sm mt-1 text-white">{step.title}</span>
                                        <span className="text-xs mt-1 text-slate-300">
                                            {step.desc}
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    {index < flowSteps.length - 1 && (
                                        <div className="hidden md:block text-slate-500 mx-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Technology Stack */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 text-center text-white flex items-center justify-center gap-3">
                        <Icons.Cpu className="w-8 h-8 text-indigo-400" />
                        Technology Stack
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {technologies.map((category) => (
                            <Card key={category.category} darkMode={true} className="bg-slate-800/60 backdrop-blur-md border border-white/10 text-white hover:border-indigo-500/30 transition-colors">
                                <h3 className="font-semibold text-lg mb-4 text-indigo-400 border-b border-white/10 pb-2">
                                    {category.category}
                                </h3>
                                <div className="space-y-4">
                                    {category.items.map((item) => (
                                        <div key={item.name} className="flex items-start gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                            <div className={`mt-1 ${item.color}`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-white">{item.name}</p>
                                                <p className="text-sm text-slate-400">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* ML Model Details */}
                <Card darkMode={true} className="mb-12 bg-slate-800/60 backdrop-blur-md border border-white/10 text-white">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                        <Icons.Brain className="w-6 h-6 text-indigo-400" />
                        <span>Ensemble Model Details</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Random Forest */}
                        <div className="p-6 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-white">
                                <Icons.Tree className="w-6 h-6 text-emerald-400" />
                                <span>Random Forest</span>
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <Icons.Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>100+ decision trees</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icons.Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Handles non-linear relationships</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icons.Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Robust to outliers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icons.Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                    <span>Feature importance ranking</span>
                                </li>
                            </ul>
                        </div>

                        {/* XGBoost */}
                        <div className="p-6 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-white">
                                <Icons.Zap className="w-6 h-6 text-yellow-400" />
                                <span>XGBoost</span>
                            </h3>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start gap-2">
                                    <Icons.Check className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                                    <span>Gradient boosting algorithm</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icons.Check className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                                    <span>Sequential error correction</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icons.Check className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                                    <span>Regularization for generalization</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Icons.Check className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                                    <span>State-of-the-art accuracy</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-indigo-900/30 border border-indigo-500/30">
                        <p className="text-center text-slate-200">
                            <span className="font-semibold">Ensemble Formula:</span>{' '}
                            <code className="bg-black/30 px-2 py-1 rounded text-indigo-300 font-mono text-sm">
                                PM2.5 = w₁ × RF_prediction + w₂ × XGB_prediction
                            </code>
                        </p>
                    </div>
                </Card>

                {/* Monitoring Stations */}
                <Card darkMode={true} className="mb-12 bg-slate-800/60 backdrop-blur-md border border-white/10 text-white">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                        <Icons.MapPin className="w-6 h-6 text-red-400" />
                        <span>Monitoring Stations in Bengaluru</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { name: 'Peenya', area: 'Industrial Zone', lat: '13.0205°N', lon: '77.5360°E' },
                            { name: 'RVCE Mailsandra', area: 'Educational', lat: '12.9338°N', lon: '77.5263°E' },
                            { name: 'Silkboard', area: 'Heavy Traffic', lat: '12.9279°N', lon: '77.6240°E' },
                        ].map((station) => (
                            <div
                                key={station.name}
                                className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{station.name}</h4>
                                    <Icons.MapPin className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                                </div>
                                <p className="text-sm text-slate-400">
                                    {station.area}
                                </p>
                                <p className="text-xs font-mono mt-2 text-indigo-400 bg-indigo-500/10 inline-block px-2 py-1 rounded">
                                    {station.lat}, {station.lon}
                                </p>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Project Info */}
                <Card darkMode={true} className="text-center p-8 bg-slate-800/50 backdrop-blur-sm border border-white/5">
                    <h3 className="font-semibold text-lg mb-2 text-white flex items-center justify-center gap-2">
                        <Icons.Building className="w-5 h-5 text-indigo-400" />
                        Academic Project
                    </h3>
                    <p className="text-slate-400">
                        Developed as part of 5th Semester Experiential Learning
                    </p>
                    <p className="text-sm mt-4 text-slate-500">
                        <span className="font-medium text-slate-400">SDG Goal 9:</span> Industry, Innovation and Infrastructure
                    </p>
                </Card>
            </div>
        </div>
    )
}

export default About
