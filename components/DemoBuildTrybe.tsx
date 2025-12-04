import React, { useState, useEffect } from 'react';
import { User, Users, X, MessageCircle, MapPin, RefreshCw, Sparkles, Navigation } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import CityMapBackground from './CityMapBackground';

interface Match {
    id: number;
    name: string;
    initial: string;
    score: number;
    distance: string;
    common: string[];
    looking: string;
    color: string; // Avatar color
    matchLabel: string;
    matchColor: string; // Label styling
    pos: { top: string; right?: string; left?: string }; // Map position
}

const matches: Match[] = [
    {
        id: 1,
        name: 'Anna',
        initial: 'A',
        score: 98,
        distance: '50m',
        common: ['Cos', 'Theory'],
        looking: 'Workwear',
        color: 'text-carmine border-carmine',
        matchLabel: 'HIGH MATCH',
        matchColor: 'bg-red-50 text-carmine border-red-100',
        pos: { top: '30%', right: '20%' }
    },
    {
        id: 2,
        name: 'Ben',
        initial: 'B',
        score: 85,
        distance: '120m',
        common: ['Uniqlo', 'Nike'],
        looking: 'Streetwear',
        color: 'text-blue-600 border-blue-600',
        matchLabel: 'GOOD MATCH',
        matchColor: 'bg-blue-50 text-blue-600 border-blue-100',
        pos: { top: '15%', left: '15%' }
    },
    {
        id: 3,
        name: 'Clara',
        initial: 'C',
        score: 72,
        distance: '0.2mi',
        common: ['Zara'],
        looking: 'Casual',
        color: 'text-green-600 border-green-600',
        matchLabel: 'MATCH',
        matchColor: 'bg-green-50 text-green-600 border-green-100',
        pos: { top: '40%', left: '10%' }
    }
];

const DemoBuildTrybe: React.FC = () => {
    const [step, setStep] = useState(-1);
    const [radarAngle, setRadarAngle] = useState(0);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    // Rotate radar
    useEffect(() => {
        if (step === 0) {
            const interval = setInterval(() => {
                setRadarAngle(prev => (prev + 2) % 360);
            }, 20);
            return () => clearInterval(interval);
        }
    }, [step]);

    // Auto-progress
    useEffect(() => {
        if (step === 0) {
            const timer = setTimeout(() => setStep(1), 3000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const handleWalkTogether = (match: Match) => {
        setSelectedMatch(match);
        setStep(2);
    };

    const reset = () => {
        setStep(-1);
        setSelectedMatch(null);
    }

    return (
        <PhoneMockup>
            <div className="h-full bg-ivory flex flex-col relative overflow-hidden font-sans">

                {/* Map Background Layer */}
                <CityMapBackground />

                {/* Initial Start Screen Overlay */}
                {step === -1 && (
                    <div className="absolute inset-0 z-40 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                        <div className="w-16 h-16 bg-carmine rounded-full flex items-center justify-center mb-6 shadow-xl shadow-carmine/20 animate-bounce-slow">
                            <Users size={32} className="text-white" />
                        </div>
                        <h3 className="font-serif text-2xl text-charcoal mb-2">Build Your Trybe</h3>
                        <p className="text-sm text-stone-600 mb-8 max-w-[200px]">Find compatible shoppers nearby to share the journey.</p>
                        <button
                            onClick={() => setStep(0)}
                            className="bg-charcoal text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-black transition-all transform hover:scale-105 active:scale-95"
                        >
                            Find a Partner
                        </button>
                    </div>
                )}

                {/* Central User Node */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-1000 ${step === 2 ? 'top-[60%]' : ''}`}>
                    <div className="relative">
                        {step === 0 && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden opacity-30 pointer-events-none">
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 280deg, #d6001c 360deg)',
                                        transform: `rotate(${radarAngle}deg)`,
                                        borderRadius: '50%'
                                    }}
                                ></div>
                            </div>
                        )}

                        {/* User Avatar */}
                        <div className="w-10 h-10 bg-charcoal rounded-full border-[3px] border-white shadow-xl flex items-center justify-center relative z-20">
                            <span className="font-bold text-white text-[10px]">YOU</span>
                        </div>

                        {/* Pulse Rings */}
                        {step === 0 && (
                            <>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-carmine/30 rounded-full animate-ping duration-[2000ms]"></div>
                            </>
                        )}
                    </div>
                </div>

                {/* Match Nodes (Pins on Map) */}
                {matches.map((match) => (
                    <div
                        key={match.id}
                        className={`absolute transition-all duration-1000 z-20 ${step === 0 ? 'opacity-0 scale-50' :
                            step === 1 ? 'opacity-100 scale-100' :
                                selectedMatch?.id === match.id ? 'top-[55%] left-[55%] opacity-100 scale-100' : 'opacity-0 scale-50'
                            }`}
                        style={step <= 1 ? match.pos : {}}
                    >
                        <div className="relative group cursor-pointer">
                            <div className={`w-8 h-8 bg-white rounded-full border-2 ${match.color} shadow-xl flex items-center justify-center animate-bounce-slow`}>
                                <span className={`font-serif font-bold text-xs ${match.color.split(' ')[0]}`}>{match.initial}</span>
                            </div>
                            {step === 1 && (
                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[9px] px-2 py-1 rounded-lg whitespace-nowrap shadow-md flex items-center gap-1 z-30">
                                    <Sparkles size={8} className="text-carmine" /> {match.score}% Match
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Walking Path Line (Step 2) */}
                {step === 2 && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        <path
                            d="M150 350 Q 180 320, 165 320"
                            fill="none"
                            stroke="#960018"
                            strokeWidth="3"
                            strokeDasharray="4 4"
                            className="animate-pulse"
                        />
                    </svg>
                )}

                {/* UI Overlays */}
                <div className="relative z-30 h-full flex flex-col pointer-events-none">

                    {/* Header Status */}
                    {step >= 0 && (
                        <div className="p-4 pt-6 text-center pointer-events-auto bg-gradient-to-b from-white/90 to-transparent">
                            <h3 className="font-serif text-xl text-charcoal transition-all duration-500">
                                {step === 0 ? 'Scanning nearby...' : step === 1 ? 'Shoppers Found!' : 'Walking Together'}
                            </h3>
                            <p className="text-[10px] text-stone-600 font-medium transition-all duration-500">
                                {step === 0 ? 'Looking for style twins in SoHo' : step === 1 ? 'Swipe to see matches' : `Heading to Arket with ${selectedMatch?.name}`}
                            </p>
                        </div>
                    )}

                    {/* Match Cards Slider (Step 1) */}
                    {step === 1 && (
                        <div className="mt-auto mb-12 w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pointer-events-auto pb-4 px-4 flex gap-4">
                            {matches.map((match) => (
                                <div key={match.id} className="snap-center shrink-0 w-[85%] bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.08)] border border-stone-100 p-5 animate-fade-in-up">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex gap-2">
                                            <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-serif text-lg text-stone-600">{match.initial}</div>
                                            <div>
                                                <h4 className="font-bold text-charcoal text-sm">{match.name}</h4>
                                                <p className="text-[9px] text-stone-500">{match.looking} • {match.distance}</p>
                                            </div>
                                        </div>
                                        <div className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border ${match.matchColor}`}>
                                            {match.matchLabel}
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-5">
                                        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-2 rounded-lg">
                                            <CheckIcon /> Both love <strong>{match.common.join(' & ')}</strong>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-2 rounded-lg">
                                            <CheckIcon /> Looking for <strong>{match.looking}</strong>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={() => handleWalkTogether(match)} className="flex-1 bg-carmine text-white py-2.5 rounded-xl font-bold text-[10px] shadow-lg shadow-carmine/20 hover:bg-[#7a0013] transition-colors flex items-center justify-center gap-2">
                                            <Navigation size={12} /> Walk together
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {/* Spacer for end of list */}
                            <div className="w-2 shrink-0"></div>
                        </div>
                    )}

                    {/* Active Session (Step 2) */}
                    {step === 2 && selectedMatch && (
                        <div className="mt-auto m-4 mb-8 pointer-events-auto animate-fade-in">
                            <div className="bg-white p-4 rounded-2xl shadow-lg border border-stone-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            <div className="w-8 h-8 rounded-full bg-charcoal border-2 border-white"></div>
                                            <div className="w-8 h-8 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center text-xs font-bold">{selectedMatch.initial}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-charcoal">Session Active</div>
                                            <div className="text-[10px] text-stone-500">0.1 mi walked together</div>
                                        </div>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <button className="bg-stone-50 p-3 rounded-xl flex flex-col items-center gap-1 hover:bg-stone-100 transition-colors">
                                        <MessageCircle size={18} className="text-charcoal" />
                                        <span className="text-[10px] font-bold text-stone-600">Chat</span>
                                    </button>
                                    <button className="bg-stone-50 p-3 rounded-xl flex flex-col items-center gap-1 hover:bg-stone-100 transition-colors">
                                        <MapPin size={18} className="text-charcoal" />
                                        <span className="text-[10px] font-bold text-stone-600">Compare</span>
                                    </button>
                                </div>

                                <button onClick={reset} className="w-full mt-3 text-[10px] text-stone-400 py-2 hover:text-carmine transition-colors">
                                    End session
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reset Button (Always visible for demo) */}
                {step === 1 && (
                    <button onClick={reset} className="absolute top-4 right-4 z-50 p-2 bg-white/50 rounded-full hover:bg-white transition-colors">
                        <X size={16} className="text-charcoal" />
                    </button>
                )}
            </div>
        </PhoneMockup>
    );
};

const CheckIcon = () => (
    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    </div>
);

export default DemoBuildTrybe;