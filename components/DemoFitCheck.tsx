import React, { useState } from 'react';
import { Camera, Sparkles, Share2, Check, RefreshCw } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const DemoFitCheck: React.FC = () => {
  const [state, setState] = useState<'camera' | 'analyzing' | 'result'>('camera');

  const takePhoto = () => {
    setState('analyzing');
    setTimeout(() => {
      setState('result');
    }, 2500);
  };

  const reset = () => {
    setState('camera');
  }

  return (
    <PhoneMockup>
      <div className="h-full flex flex-col bg-charcoal relative text-white">
        
        {/* State 1: Camera View */}
        {state === 'camera' && (
          <>
            {/* Fake Camera Viewfinder with Realistic Image */}
            <div className="absolute inset-0 bg-stone-800 flex items-center justify-center">
                <div className="w-56 h-80 border border-white/20 rounded-2xl relative overflow-hidden bg-stone-900">
                     <img 
                        src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=600&auto=format&fit=crop" 
                        alt="Fit Check Selfie" 
                        className="w-full h-full object-cover opacity-90"
                     />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 text-[10px] tracking-widest font-bold uppercase drop-shadow-md z-30 pointer-events-none">
                    Align Outfit
                </div>
                {/* Guide corners for "Align" */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-72 border-2 border-white/30 rounded-xl z-20 pointer-events-none"></div>
            </div>

            {/* Camera UI */}
            <div className="absolute bottom-0 left-0 right-0 pb-10 pt-20 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center z-20">
                <button 
                    onClick={takePhoto}
                    className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center relative group shadow-lg"
                >
                    <div className="w-14 h-14 bg-white rounded-full transform group-hover:scale-90 transition-transform duration-200"></div>
                </button>
            </div>
          </>
        )}

        {/* State 2: Analyzing */}
        {state === 'analyzing' && (
           <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-ivory text-charcoal animate-fade-in">
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                 <div className="absolute inset-0 bg-carmine/5 rounded-full animate-ping duration-[3000ms]"></div>
                 <div className="absolute inset-4 bg-carmine/10 rounded-full animate-pulse duration-[2000ms]"></div>
                 <Sparkles size={28} className="text-carmine relative z-10 animate-spin-slow" />
              </div>
              <h3 className="font-serif text-2xl mb-2">Asking the Trybe...</h3>
              <p className="text-stone-500 text-sm">Validating style, fit, and vibe.</p>
           </div>
        )}

        {/* State 3: Result */}
        {state === 'result' && (
            <div className="h-full bg-ivory text-charcoal flex flex-col animate-fade-in relative">
                {/* Image Section - Fixed Height */}
                <div className="h-[45%] bg-stone-200 relative overflow-hidden flex-shrink-0">
                     <img 
                        src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=600&auto=format&fit=crop" 
                        alt="Analyzed Outfit" 
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute bottom-6 right-4 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm flex items-center gap-1 z-20">
                        <Check size={10} className="text-carmine" /> ANONYMOUS
                     </div>
                </div>

                {/* Results Card - Scrollable content */}
                <div className="flex-1 -mt-4 relative bg-ivory rounded-t-[1.5rem] shadow-[0_-5px_20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto px-6 pt-6 pb-20 scrollbar-hide">
                        <div className="flex flex-col items-center mb-6">
                            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Trybe Consensus</div>
                            <h2 className="font-serif text-3xl text-carmine mb-2">Confident Choice</h2>
                            <div className="flex gap-1">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className={`h-1 w-6 rounded-full ${i <= 4 ? 'bg-carmine' : 'bg-stone-200'}`}></div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-white p-3.5 rounded-xl border border-stone-100 shadow-sm flex gap-3 items-start">
                                <div className="bg-stone-100 p-1.5 rounded-full mt-0.5">
                                    <Share2 size={12} className="text-stone-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-charcoal">Most of your Trybe leans yes.</p>
                                    <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">Especially strong match for 'Creative Casual' profiles.</p>
                                </div>
                            </div>

                            <div className="bg-white p-3.5 rounded-xl border border-stone-100 shadow-sm flex gap-3 items-start">
                                <div className="bg-stone-100 p-1.5 rounded-full mt-0.5">
                                    <Sparkles size={12} className="text-stone-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-charcoal">Style Synergy</p>
                                    <p className="text-[10px] text-stone-500 mt-0.5 leading-tight">People who bought this also love the items in your wishlist.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Fixed Bottom Button */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ivory to-ivory/90 backdrop-blur-sm">
                        <button onClick={reset} className="w-full py-3 border border-stone-200 rounded-xl text-stone-500 text-xs font-medium hover:bg-stone-50 transition-colors">
                            Scan another item
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Reset */}
        {state !== 'camera' && (
            <button onClick={reset} className="absolute top-2 right-2 p-2 opacity-0 hover:opacity-100 transition-opacity z-50 bg-black/10 rounded-full text-charcoal">
                <RefreshCw size={12} />
            </button>
        )}
      </div>
    </PhoneMockup>
  );
};

export default DemoFitCheck;