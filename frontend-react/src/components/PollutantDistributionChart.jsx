import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const PollutantDistributionChart = ({ data, darkMode }) => {
    // Transform sensor data into Array for Recharts
    // Expected data: { PM10: 50, NO2: 30, ... }
    const chartData = [
        { name: 'PM10', value: data.PM10 || 0, color: '#3b82f6' }, // Blue
        { name: 'NO2', value: data.NO2 || 0, color: '#8b5cf6' },  // Purple
        { name: 'CO', value: (data.CO || 0) * 10, color: '#ec4899' },   // Pink (Scaled for visibility)
        { name: 'Ozone', value: data.Ozone || 0, color: '#f97316' }, // Orange
        { name: 'NOx', value: data.NOx || 0, color: '#6366f1' },  // Indigo
    ].filter(item => item.value > 0);

    return (
        <div className={`p-6 rounded-2xl border transition-all duration-300 h-full ${darkMode
            ? 'bg-slate-800/40 backdrop-blur-md border border-white/10 shadow-lg text-white'
            : 'bg-white border-gray-200 shadow-sm'
            }`}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span></span> Pollutant Mix
            </h3>
            <div className="h-[300px] w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: darkMode ? '#1e293b' : '#fff',
                                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : '#e5e7eb',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                color: darkMode ? '#fff' : '#000'
                            }}
                        />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            wrapperStyle={{
                                fontSize: '12px',
                                color: darkMode ? '#cbd5e1' : '#475569'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <p className="text-xs text-center mt-2 opacity-60">*CO scaled x10 for visibility</p>
        </div>
    );
};

export default PollutantDistributionChart;
