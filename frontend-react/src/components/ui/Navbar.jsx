import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    return (
        <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center">
            <nav className={`
                max-w-4xl w-full rounded-full shadow-2xl shadow-black/5 
                border border-white/60 dark:border-slate-700/60 
                backdrop-blur-2xl transition-all duration-300
                ${darkMode ? 'bg-slate-900/80' : 'bg-white/80'}
            `}>
                <div className="px-6 h-14 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-800 dark:text-white">
                        <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-500 text-white text-sm shadow-md shadow-indigo-500/20">AQ</span>
                        <span>AirQ</span>
                    </Link>

                    {/* Links - Pill Style */}
                    <div className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-xl">
                        {[
                            { path: '/', label: 'Overview' },
                            { path: '/dashboard', label: 'Monitor' },
                            { path: '/comparison', label: 'Analysis' },
                            { path: '/chatbot', label: 'AI Chat' }
                        ].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`
                                    px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200
                                    ${isActive(link.path)
                                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                    }
                                `}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleDarkMode}
                            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-500 transition-colors"
                        >
                            {darkMode ? '🌙' : '☀️'}
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
