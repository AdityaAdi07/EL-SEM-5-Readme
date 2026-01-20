import React from 'react';
import ReactMarkdown from 'react-markdown';

const AIAnalysisReport = ({ report, loading, darkMode }) => {
    if (loading) {
        return (
            <div className="card p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-4/6"></div>
                </div>
            </div>
        );
    }

    if (!report) return null;

    return (
        <div className="card p-6 border-l-4 border-l-emerald-500 bg-white dark:bg-slate-900 shadow-lg">
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                    <span className="text-2xl">✨</span>
                    AI Analysis Report
                </h2>
                <span className="text-xs font-bold font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-100 dark:border-emerald-800">
                    Gemini 2.5-Flash
                </span>
            </div>

            <div className="prose prose-sm dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-relaxed
                prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-slate-100
                prose-p:my-3 prose-li:my-1
                prose-strong:text-indigo-600 dark:prose-strong:text-indigo-400">
                <ReactMarkdown>{report}</ReactMarkdown>
            </div>
        </div>
    );
};

export default AIAnalysisReport;
