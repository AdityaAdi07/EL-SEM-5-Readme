import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const HistoryTrendChart = ({ data, darkMode }) => {
    if (!data || data.length === 0) return null;

    return (
        <div className={`p-6 rounded-2xl border transition-all duration-300 ${darkMode
            ? 'bg-slate-800/40 backdrop-blur-md border border-white/10 shadow-lg text-white'
            : 'bg-white border-gray-200 shadow-sm'
            }`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span></span> 24h Pollutant Trend
            </h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPM25" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorPM10" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? 'rgba(255,255,255,0.1)' : '#e5e7eb'} />
                        <XAxis
                            dataKey="time"
                            stroke={darkMode ? '#94a3b8' : '#6b7280'}
                            tick={{ fontSize: 12 }}
                            minTickGap={30}
                        />
                        <YAxis
                            stroke={darkMode ? '#94a3b8' : '#6b7280'}
                            tick={{ fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: darkMode ? '#1e293b' : '#fff',
                                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                color: darkMode ? '#fff' : '#000'
                            }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Area
                            type="monotone"
                            dataKey="PM2.5"
                            stroke="#818cf8"
                            fillOpacity={1}
                            fill="url(#colorPM25)"
                            strokeWidth={2}
                        />
                        <Area
                            type="monotone"
                            dataKey="PM10"
                            stroke="#34d399"
                            fillOpacity={1}
                            fill="url(#colorPM10)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HistoryTrendChart;
