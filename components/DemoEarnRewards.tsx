import React, { useState, useEffect } from 'react';
import { Star, Zap, Lock, Unlock, Gem, Trophy, Flame, Check, X, RefreshCw } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const DemoEarnRewards: React.FC = () => {
    const [points, setPoints] = useState(750);
    const [showConfetti, setShowConfetti] = useState(false);
    const [claimed, setClaimed] = useState(false);
    const [activeCard, setActiveCard] = useState(0);

    const rewards = [
        {
            id: 1,
            title: "Priority Routing",
            desc: "Skip waiting for fitting rooms at partner stores.",
            cost: 500,
            icon: <Zap size={20} className="text-yellow-400" />,
            color: "bg-charcoal text-white",
            status: claimed ? 'active' : 'available'
        },
        {
            id: 2,
            title: "Arket Discount",
            desc: "Get 15% off your next purchase over $100.",
            cost: 1000,
            icon: <Gem size={20} className="text-carmine" />,
            color: "bg-white text-charcoal border border-stone-100",
            status: 'locked'
        },
        {
            id: 3,
            title: "Personal Stylist",
            desc: "30-minute video consultation with a pro.",
            cost: 2500,
            icon: <Star size={20} className="text-purple-500" />,
            color: "bg-white text-charcoal border border-stone-100",
            status: 'locked'
        }
    ];

    const handleClaim = () => {
        setShowConfetti(true);
        setTimeout(() => {
            setClaimed(true);
            setPoints(points - 500);
            setShowConfetti(false);
        }, 2500);
    };

    const reset = () => {
        setPoints(750);
        setClaimed(false);
        setShowConfetti(false);
        setActiveCard(0);
    }

    return (
        <PhoneMockup>
            <div className="h-full bg-ivory flex flex-col overflow-hidden relative font-sans">

                {/* Header Dashboard */}
                <div className="bg-charcoal text-ivory p-5 pt-8 pb-10 rounded-b-[2rem] relative z-10 shadow-xl flex-shrink-0 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div>
                            <h3 className="font-serif text-xl leading-tight">Your<br />Rewards</h3>
                            <div className="flex items-center gap-1 mt-2 text-yellow-400 bg-white/10 px-2 py-0.5 rounded-md w-fit backdrop-blur-md">
                                <Flame size={10} fill="currentColor" />
                                <span className="text-[9px] font-bold tracking-wide">3 DAY STREAK</span>
                            </div>
                        </div>

                        {/* Circular Progress */}
                        <div className="relative w-16 h-16 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-carmine transition-all duration-1000 ease-out" strokeDasharray="175" strokeDashoffset={175 - (175 * (points / 1000))} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-sm font-bold">{points}</span>
                                <span className="text-[7px] text-stone-400 uppercase tracking-wider">PTS</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end relative z-10">
                        <div>
                            <p className="text-[9px] text-stone-400 mb-0.5">Current Tier</p>
                            <p className="font-bold text-xs tracking-wide flex items-center gap-1">
                                <Trophy size={12} className="text-yellow-400" /> INSIDER
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] text-stone-400 mb-0.5">Next Reward</p>
                            <p className="font-bold text-xs">250 pts</p>
                        </div>
                    </div>
                </div>

                {/* Rewards Carousel */}
                <div className="flex-1 -mt-4 relative z-20 overflow-hidden flex flex-col">
                    <div className="px-6 pt-6 pb-2">
                        <h4 className="font-serif text-base text-charcoal">Available Perks</h4>
                    </div>

                    <div className="flex-1 w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide px-6 flex gap-3 pb-6 items-center">
                        {rewards.map((reward, idx) => (
                            <div
                                key={reward.id}
                                className={`snap-center shrink-0 w-[85%] h-[280px] rounded-2xl p-5 flex flex-col justify-between shadow-lg transition-all duration-300 relative overflow-hidden ${reward.color} ${reward.status === 'locked' ? 'opacity-60 grayscale-[0.5]' : ''}`}
                            >
                                {reward.status === 'locked' && (
                                    <div className="absolute top-3 right-3 bg-stone-200/50 p-1.5 rounded-full backdrop-blur-sm">
                                        <Lock size={12} className="text-charcoal" />
                                    </div>
                                )}

                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 backdrop-blur-md border border-white/20 shadow-inner">
                                        {reward.icon}
                                    </div>
                                    <h3 className="font-serif text-lg mb-1 leading-tight">{reward.title}</h3>
                                    <p className={`text-[10px] leading-relaxed ${reward.id === 1 ? 'text-stone-300' : 'text-stone-500'}`}>{reward.desc}</p>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[9px] font-bold uppercase tracking-wider opacity-60">Cost</span>
                                        <span className="font-bold text-sm">{reward.cost} pts</span>
                                    </div>

                                    {reward.status === 'active' ? (
                                        <div className="w-full py-2.5 bg-white/20 rounded-lg flex items-center justify-center gap-2 font-bold text-xs backdrop-blur-md border border-white/20">
                                            <Check size={14} /> Active
                                        </div>
                                    ) : reward.status === 'locked' ? (
                                        <div className="w-full py-2.5 bg-stone-100 text-stone-400 rounded-lg flex items-center justify-center gap-2 font-bold text-xs">
                                            Locked
                                        </div>
                                    ) : (
                                        <button
                                            onClick={handleClaim}
                                            className="w-full py-2.5 bg-carmine text-white rounded-lg font-bold text-xs shadow-md shadow-carmine/30 hover:bg-[#960018] active:scale-95 transition-all flex items-center justify-center gap-2"
                                        >
                                            Claim Reward <Unlock size={12} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="w-2 shrink-0"></div>
                    </div>
                </div>

                {/* Celebration Overlay */}
                {showConfetti && (
                    <div className="absolute inset-0 z-50 bg-charcoal/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in text-center p-8">
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-carmine blur-3xl opacity-50 animate-pulse"></div>
                            <div className="relative w-20 h-20 bg-gradient-to-br from-carmine to-red-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-slow border border-white/20">
                                <Zap size={40} className="text-white drop-shadow-md" />
                            </div>
                        </div>
                        <h2 className="font-serif text-2xl text-white mb-2 animate-fade-in-up">UNLOCKED!</h2>
                        <p className="text-stone-300 text-xs mb-6 animate-fade-in-up delay-100">You've claimed Priority Routing.</p>
                        <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden max-w-[120px]">
                            <div className="h-full bg-carmine animate-progress-indeterminate"></div>
                        </div>
                    </div>
                )}

                {/* Reset Button */}
                <button onClick={reset} className="absolute top-2 right-2 p-2 opacity-0 hover:opacity-100 transition-opacity z-50 bg-white/10 rounded-full text-white">
                    <RefreshCw size={12} />
                </button>
            </div>
        </PhoneMockup>
    );
};

export default DemoEarnRewards;