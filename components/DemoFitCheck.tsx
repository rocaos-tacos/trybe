import React, { useState, useEffect } from 'react';
import { Camera, Sparkles, Share2, Check, RefreshCw, Heart, MessageCircle, Zap, TrendingUp, ArrowLeft, Loader2 } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const DemoFitCheck: React.FC = () => {
    const [state, setState] = useState<'camera' | 'analyzing' | 'waiting' | 'result'>('camera');
    const [selectedVibe, setSelectedVibe] = useState('Date Night');
    const [scanProgress, setScanProgress] = useState(0);
    const [scanText, setScanText] = useState('Identifying silhouette...');
    const [showScore, setShowScore] = useState(false);

    // Simulated live comments
    const [comments, setComments] = useState<{ id: number; text: string; user: string; delay: number }[]>([]);

    const vibes = ['Date Night', 'Office', 'Casual', 'Gym', 'Party'];

    const takePhoto = () => {
        setState('analyzing');
        setScanProgress(0);

        // Scanning animation sequence
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            setScanProgress(progress);

            if (progress > 30 && progress < 60) setScanText('Analyzing color palette...');
            if (progress > 60 && progress < 90) setScanText('Checking current trends...');
            if (progress > 90) setScanText('Calculating Trybe Score...');

            if (progress >= 100) {
                clearInterval(interval);
                setState('waiting');
                setTimeout(() => {
                    setState('result');
                    triggerResultAnimations();
                }, 2000);
            }
        }, 30);
    };

    const triggerResultAnimations = () => {
        setTimeout(() => setShowScore(true), 500);

        // Simulate incoming comments
        const newComments = [
            { id: 1, user: "Sarah J.", text: "Omg that color on you! 😍", delay: 800 },
            { id: 2, user: "Mike R.", text: "10/10 fit 🔥", delay: 1400 },
            { id: 3, user: "FashionBot", text: "Trending in NYC right now.", delay: 2000 },
            { id: 4, user: "Chloe", text: "Where is that jacket from??", delay: 2600 },
            { id: 5, user: "Alex M.", text: "Definite yes for date night.", delay: 3200 },
            { id: 6, user: "StyleGuru", text: "Silhouette is perfect.", delay: 3800 },
            { id: 7, user: "Jess", text: "Need this link asap!", delay: 4400 },
        ];
        setComments(newComments);
    };

    const reset = () => {
        setState('camera');
        setScanProgress(0);
        setShowScore(false);
        setComments([]);
    }

    return (
        <PhoneMockup>
            <div className="h-full flex flex-col bg-black relative text-white overflow-hidden font-sans">

                {/* State 1: Camera View */}
                {state === 'camera' && (
                    <>
                        {/* Fake Camera Viewfinder */}
                        <div className="absolute inset-0 bg-stone-900">
                            <img
                                src="/TrybeSelfieHero.png"
                                alt="Fit Check Selfie"
                                className="w-full h-full object-cover opacity-80"
                            />

                            {/* Grid Overlay */}
                            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
                                <div className="border-r border-white"></div>
                                <div className="border-r border-white"></div>
                                <div></div>
                                <div className="border-t border-r border-white"></div>
                                <div className="border-t border-r border-white"></div>
                                <div className="border-t border-white"></div>
                                <div className="border-t border-r border-white"></div>
                                <div className="border-t border-r border-white"></div>
                                <div className="border-t border-white"></div>
                            </div>

                            {/* Vibe Selector Overlay */}
                            <div className="absolute top-4 left-0 right-0 px-4 z-20">
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-linear-fade">
                                    {vibes.map(vibe => (
                                        <button
                                            key={vibe}
                                            onClick={() => setSelectedVibe(vibe)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all backdrop-blur-md border ${selectedVibe === vibe
                                                    ? 'bg-white text-black border-white'
                                                    : 'bg-black/30 text-white border-white/30 hover:bg-black/50'
                                                }`}
                                        >
                                            {vibe}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Camera Controls */}
                        <div className="absolute bottom-0 left-0 right-0 pb-12 pt-24 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col items-center justify-end z-20 gap-6">
                            <div className="text-center">
                                <p className="text-white/70 text-xs font-medium mb-1">Checking vibe for</p>
                                <p className="text-white font-serif text-xl italic">{selectedVibe}</p>
                            </div>

                            <button
                                onClick={takePhoto}
                                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center relative group shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            >
                                <div className="w-16 h-16 bg-white rounded-full transform group-hover:scale-90 transition-transform duration-200"></div>
                            </button>
                        </div>
                    </>
                )}

                {/* State 2: Analyzing */}
                {state === 'analyzing' && (
                    <div className="absolute inset-0 bg-black z-30 flex flex-col items-center justify-center">
                        {/* Background Image with Scanning Effect */}
                        <div className="absolute inset-0 opacity-40">
                            <img
                                src="/TrybeSelfieHero.png"
                                alt="Analyzing"
                                className="w-full h-full object-cover grayscale"
                            />
                        </div>

                        {/* Scanning Line */}
                        <div
                            className="absolute left-0 right-0 h-1 bg-carmine shadow-[0_0_20px_rgba(220,20,60,0.8)] z-40"
                            style={{ top: `${scanProgress}%`, transition: 'top 0.1s linear' }}
                        ></div>

                        {/* Center Loader */}
                        <div className="relative z-50 flex flex-col items-center gap-4">
                            <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-carmine animate-spin"></div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold font-serif text-white mb-1">{Math.round(scanProgress)}%</h3>
                                <p className="text-carmine text-xs font-bold uppercase tracking-widest animate-pulse">{scanText}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* State 3: Waiting */}
                {state === 'waiting' && (
                    <div className="absolute inset-0 bg-ivory z-30 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
                        <div className="relative mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-stone-200 border-t-carmine animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <MessageCircle size={20} className="text-carmine animate-pulse" />
                            </div>
                        </div>
                        <h3 className="font-serif text-2xl text-charcoal mb-2">Waiting for Trybe feedback...</h3>
                        <p className="text-stone-500 text-sm">Gathering opinions from your style twins.</p>
                    </div>
                )}

                {/* State 4: Result */}
                {state === 'result' && (
                    <div className="absolute inset-0 bg-ivory text-charcoal z-40 flex flex-col overflow-hidden animate-fade-in">

                        {/* Back Button */}
                        <button
                            onClick={reset}
                            className="absolute top-4 left-4 z-50 w-10 h-10 bg-white/80 backdrop-blur rounded-full shadow-sm flex items-center justify-center text-charcoal hover:bg-white transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </button>

                        {/* Top Image Section */}
                        <div className="h-[45%] relative shrink-0">
                            <img
                                src="/TrybeSelfieHero.png"
                                alt="Result"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ivory"></div>

                            {/* Floating Score Badge */}
                            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 transform transition-all duration-700 ${showScore ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-10'}`}>
                                <div className="bg-white/90 backdrop-blur-xl p-4 px-8 rounded-3xl shadow-2xl border border-white/50 text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-carmine/10 to-transparent"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-center gap-2 text-carmine mb-1">
                                            <Zap size={14} fill="currentColor" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider">Trybe Score</span>
                                        </div>
                                        <div className="text-5xl font-serif font-bold text-charcoal leading-none mb-1">98</div>
                                        <div className="text-xs font-medium text-stone-500">"Fire Fit! 🔥"</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Content Section */}
                        <div className="flex-1 px-6 pb-6 relative flex flex-col min-h-0">
                            <div className="flex justify-between items-center mb-4 shrink-0">
                                <h4 className="font-bold text-lg flex items-center gap-2">
                                    <MessageCircle size={18} className="text-carmine" />
                                    Live Feedback
                                </h4>
                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                                    ONLINE
                                </span>
                            </div>

                            {/* Live Comments Feed - Scrollable */}
                            <div className="space-y-3 overflow-y-auto scrollbar-hide pb-20">
                                {comments.map((comment, index) => (
                                    <div
                                        key={comment.id}
                                        className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 flex items-start gap-3 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-500 shrink-0">
                                            {comment.user.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-stone-400">{comment.user}</p>
                                            <p className="text-xs font-medium text-charcoal">{comment.text}</p>
                                        </div>
                                        <div className="ml-auto">
                                            <Heart size={12} className="text-stone-300 hover:text-carmine transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                                <div className="h-4"></div> {/* Spacer */}
                            </div>

                            {/* Gradient Fade for Scroll */}
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-ivory to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                )}
            </div>
        </PhoneMockup>
    );
};

export default DemoFitCheck;