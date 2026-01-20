const PollutantCard = ({ name, value, unit, icon, darkMode = false, unavailable = false, loading = false }) => {
    // Soft UI Colors for specific pollutants
    const colorMap = {
        'PM10': 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        'NO2': 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
        'NOx': 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
        'CO': 'bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
        'Ozone': 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        'RH': 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400',
    }

    const iconClass = colorMap[name] || 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400';

    return (
        <div className={`p-5 flex flex-col justify-between h-full widget-hover rounded-2xl transition-all duration-300 transform group
            ${darkMode
                ? 'bg-slate-800/40 backdrop-blur-md border border-white/10 shadow-lg text-white hover:bg-slate-800/60 hover:border-indigo-500/30 hover:shadow-indigo-500/20 hover:scale-[1.03]'
                : 'bg-white shadow-sm border border-slate-100 text-slate-800 hover:shadow-md hover:scale-[1.03]'}
            ${unavailable ? 'opacity-60 grayscale' : 'cursor-pointer'}`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${iconClass}`}>
                    {icon || name.charAt(0)}
                </div>
                {/* Micro chart placeholder or status dot */}
                <div className={`w-2 h-2 rounded-full ${unavailable ? 'bg-slate-300' : 'bg-emerald-400 animate-pulse'}`}></div>
            </div>

            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    {name}
                </p>
                <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                        {unavailable ? '--' : (typeof value === 'number' ? value.toFixed(1) : value)}
                    </span>
                    <span className="text-xs font-medium text-slate-400">
                        {unit}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PollutantCard
