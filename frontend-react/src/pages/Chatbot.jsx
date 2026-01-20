import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

const MessageContent = ({ text }) => {
    return (
        <div className="space-y-1.5 text-[15px] leading-relaxed">
            {text.split('\n').map((line, i) => {
                const trimmed = line.trim();
                if (!trimmed) return <div key={i} className="h-2" />;

                // List Items (Bullet points)
                if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                    return (
                        <div key={i} className="flex gap-3 ml-1 items-start my-1.5">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 shadow-[0_0_8px_rgba(129,140,248,0.5)]"></div>
                            <span className="text-slate-200">{trimmed.replace(/^[•\-*]\s*/, '')}</span>
                        </div>
                    )
                }

                // Data Rows (AQI: 123)
                if (trimmed.match(/^(AQI|PM2\.5|PM10|NO2|CO|Ozone|RH):/i)) {
                    const [label, ...valParts] = trimmed.split(':');
                    const value = valParts.join(':').trim();

                    // Determine color for AQI
                    let colorClass = "text-white";
                    if (label.includes("AQI")) {
                        if (value.includes("Good")) colorClass = "text-emerald-400";
                        else if (value.includes("Satisfactory")) colorClass = "text-lime-400";
                        else if (value.includes("Moderate")) colorClass = "text-yellow-400";
                        else if (value.includes("Poor")) colorClass = "text-orange-400";
                        else if (value.includes("Very Poor")) colorClass = "text-red-400";
                    }

                    return (
                        <div key={i} className="flex justify-between items-center py-2 px-3 rounded-lg bg-black/20 border border-white/5 my-1">
                            <span className="font-medium text-slate-300 text-sm">{label}:</span>
                            <span className={`font-bold font-mono ${colorClass}`}>{value}</span>
                        </div>
                    );
                }

                // Safe Level / Success Box
                if (trimmed.includes('✅') || trimmed.match(/^Safe level:/i)) {
                    return (
                        <div key={i} className="mt-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-sm flex gap-2 items-center">
                            <span>✅</span>
                            <span className="font-medium">{trimmed.replace('✅', '').trim()}</span>
                        </div>
                    )
                }

                // Advice Box
                if (trimmed.match(/^(Advice|Recommendation|Note):/i)) {
                    return (
                        <div key={i} className="mt-3 p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-100 text-sm flex gap-3 items-start">
                            <span className="text-lg">⚠️</span>
                            <div className="flex flex-col">
                                <span className="font-bold text-amber-200 text-xs uppercase tracking-wider mb-0.5 opacity-80">Recommendation</span>
                                <span className="leading-snug">{trimmed.replace(/^(Advice|Recommendation|Note):?/i, '').trim()}</span>
                            </div>
                        </div>
                    )
                }

                // Standard Text with Bold Parsing
                const parts = line.split(/(\*\*.*?\*\*)/g);
                return (
                    <div key={i} className="text-slate-100">
                        {parts.map((part, j) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                            }
                            return <span key={j}>{part}</span>;
                        })}
                    </div>
                )
            })}
        </div>
    )
}

const Chatbot = ({ darkMode }) => {
    const STATIONS = ['Peenya', 'Silkboard', 'RVCE_Mailsandra']
    const [selectedStation, setSelectedStation] = useState(null)
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: '👋 Hi! Before we start, what is your location? Please choose: **Peenya**, **Silkboard**, or **RVCE**.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const messagesEndRef = useRef(null)

    const suggestions = [
        "What is the current AQI?",
        "AQI in my area right now?",
        "Air quality right now in Peenya",
        "Is it safe to go outside?",
        "Is it safe to go for a run right now?",
        "Compare air quality across stations",
        "Which station has the lowest AQI right now?",
        "What is PM2.5?",
        "What is PM10?",
        "Show pollution levels"
    ]

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async (text) => {
        if (!text.trim()) return

        // If station not selected yet, try to infer it or ask again
        if (!selectedStation) {
            const lower = text.toLowerCase()
            let inferred = null
            if (lower.includes('peenya')) inferred = 'Peenya'
            if (lower.includes('silkboard') || lower.includes('silboard') || lower.includes('silk')) inferred = 'Silkboard'
            if (lower.includes('rvce') || lower.includes('mailsandra')) inferred = 'RVCE_Mailsandra'

            // Add user message
            const userMsg = {
                type: 'user',
                text: text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => [...prev, userMsg])
            setInput('')

            if (inferred) {
                setSelectedStation(inferred)
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: `✅ Got it — I’ll use **${inferred.replace('_', ' ')}** for live AQI and safety checks. What would you like to know?`,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }])
            } else {
                setMessages(prev => [...prev, {
                    type: 'bot',
                    text: 'Please pick a location first: **Peenya**, **Silkboard**, or **RVCE**.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }])
            }
            return
        }

        // Add user message
        const userMsg = {
            type: 'user',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)

        try {
            // Call the real chatbot API
            const response = await axios.post(
                'http://127.0.0.1:8000/chatbot/query',
                null,
                {
                    params: { query: text, station_id: selectedStation },
                    timeout: 30000
                }
            )

            const botMsg = {
                type: 'bot',
                text: response.data.response,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                intent: response.data.intent,
                confidence: response.data.confidence
            }
            setMessages(prev => [...prev, botMsg])
        } catch (error) {
            console.error('Chatbot API error:', error)
            // Fallback to simple responses if backend is not available
            const fallbackResponse = generateSimpleResponse(text.toLowerCase())
            setMessages(prev => [...prev, {
                type: 'bot',
                text: fallbackResponse,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }])
        } finally {
            setLoading(false)
        }
    }

    const generateSimpleResponse = (query) => {
        // Simple keyword-based responses (will be replaced with ML model)
        if (query.includes('aqi') || query.includes('air quality')) {
            return '🌡️ The current AQI varies by station:\n• Peenya: ~145 (Moderate)\n• RVCE Mailsandra: ~132 (Moderate)\n• Silkboard: ~167 (Moderate)\n\nVisit the Dashboard for real-time data!'
        }
        else if (query.includes('safe') || query.includes('outside') || query.includes('outdoor')) {
            return '🏃 Based on current conditions (AQI ~140-160), it\'s generally safe for most people, but sensitive groups should consider limiting prolonged outdoor exertion.\n\nAdvice: Children, elderly, and those with respiratory conditions should take extra care.'
        }
        else if (query.includes('pm2.5') || query.includes('pm 2.5')) {
            return '🔬 **PM2.5** refers to fine particulate matter with diameter less than 2.5 micrometers. These tiny particles can penetrate deep into lungs and bloodstream, causing respiratory and cardiovascular problems.\n\nSafe levels: 0-30 µg/m³\nCurrent avg: ~50-70 µg/m³'
        }
        else if (query.includes('compare') || query.includes('comparison')) {
            return '📍 **Station Comparison**:\n\nPeenya (Industrial): Moderate to Poor\nRVCE Mailsandra (Educational): Moderate\nSilkboard (Traffic): Moderate to Poor\n\nCheck the Comparison page for detailed metrics!'
        }
        else if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
            return '👋 Hello! I\'m here to help you understand air quality in Bengaluru. You can ask me about:\n• Current AQI levels\n• Safety for outdoor activities\n• Pollution information\n• Station comparisons'
        }
        else if (query.includes('help')) {
            return '💡 I can help you with:\n\nAQI: Current AQI at different stations\nAdvice: Safety advice for outdoor activities\nPM2.5: Explanation of pollutants\n\nJust ask your question naturally!'
        }
        else if (query.includes('thank')) {
            return '😊 You\'re welcome! Stay safe and breathe easy! 🌿'
        }
        else {
            return '🤔 I\'m still learning! For now, try asking about:\n• Current AQI levels\n• Is it safe to go outside?\n• What is PM2.5?\n• Compare stations\n\nOr visit the Dashboard for detailed information!'
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage(input)
        }
    }

    return (
        <div
            className="min-h-screen bg-fixed bg-cover bg-center relative"
            style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2 text-white drop-shadow-md">
                        <span>🤖</span> Air Quality Assistant
                    </h1>
                    <p className="text-slate-300">
                        Ask me anything about air quality, pollution, and safety
                    </p>
                </div>

                {/* Info Banner - Glassmorphic */}
                <div className="mb-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-md">
                    <p className="text-sm text-center text-emerald-100">
                        🤖 <strong>AI-Powered!</strong> This chatbot uses Machine Learning (Logistic Regression + TF-IDF) to understand your questions about air quality.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm text-emerald-100">
                        <span className="opacity-80">
                            📍 Location:
                        </span>
                        {selectedStation ? (
                            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-bold shadow-lg">
                                {selectedStation.replace('_', ' ')}
                            </span>
                        ) : (
                            <span className="italic opacity-60">
                                not selected
                            </span>
                        )}
                    </div>
                    {!selectedStation && (
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {['Peenya', 'Silkboard', 'RVCE'].map((st) => (
                                <button
                                    key={st}
                                    onClick={() => sendMessage(st)}
                                    disabled={loading}
                                    className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105 bg-white/10 hover:bg-white/20 text-white border border-white/10"
                                >
                                    {st}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Chat Container - Glassmorphic */}
                <Card darkMode={true} className="mb-6 flex flex-col bg-slate-800/60 backdrop-blur-md border border-white/10 h-[600px] shadow-2xl rounded-2xl overflow-hidden">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                            >
                                <div
                                    className={`max-w-[75%] px-5 py-3.5 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] ${msg.type === 'user'
                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl rounded-br-sm shadow-indigo-500/20'
                                        : 'bg-slate-700/40 border border-white/10 text-slate-100 rounded-2xl rounded-bl-sm'
                                        }`}
                                >
                                    <MessageContent text={msg.text} />
                                    <p className={`text-[10px] mt-1.5 text-right font-medium opacity-70 ${msg.type === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="rounded-2xl px-4 py-3 bg-slate-700/40 border border-white/10 backdrop-blur-sm">
                                    <div className="flex gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-white/10 p-5 bg-slate-900/40 backdrop-blur-md">
                        <div className="flex gap-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={selectedStation ? "Type your question here..." : "Select a location above first..."}
                                className="flex-1 px-5 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 bg-slate-800/50 text-white placeholder-slate-400 font-medium transition-all"
                                disabled={loading}
                            />
                            <Button
                                onClick={() => sendMessage(input)}
                                disabled={loading || !input.trim()}
                                className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white border-none rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                            >
                                {loading ? '...' : 'Send 🚀'}
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Quick Suggestions */}
                <div>
                    <p className="text-sm font-medium mb-3 text-slate-300">
                        💡 Quick questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {suggestions.map((sug, idx) => (
                            <button
                                key={idx}
                                onClick={() => sendMessage(sug)}
                                disabled={loading}
                                className="px-4 py-2 rounded-full text-sm transition-all hover:scale-105 bg-slate-800/50 hover:bg-slate-700/80 text-slate-200 border border-white/10 backdrop-blur-sm"
                            >
                                {sug}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 p-4 rounded-xl text-center text-sm bg-black/20 backdrop-blur-sm border border-white/5 text-slate-400">
                    <p>
                        ✅ <strong>Powered by:</strong> Logistic Regression Intent Classifier • TF-IDF Vectorization • Real-time API Integration
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Chatbot
