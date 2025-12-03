import React, { useState, useEffect } from 'react';
import { User, X, MessageCircle, MapPin, RefreshCw } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

// Reusable City Map Background Component (Sharpened for BuildTrybe)
const CityMapBackground = () => (
    <div className="absolute inset-0 z-0 bg-[#f2f1ed] overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#dcebd2] rounded-full blur-3xl opacity-50"></div>
      
      {/* Street Grid Pattern - Darkened for sharpness */}
      <div className="absolute inset-0" 
           style={{
               backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 39px, #d1d1d1 40px, #d1d1d1 44px), repeating-linear-gradient(0deg, transparent, transparent 39px, #d1d1d1 40px, #d1d1d1 44px)',
               backgroundSize: '100% 100%'
           }}>
      </div>
  
      {/* Diagonals/Random Roads - Increased opacity */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
          <line x1="0" y1="20%" x2="100%" y2="80%" stroke="white" strokeWidth="8" />
          <line x1="80%" y1="0" x2="20%" y2="100%" stroke="white" strokeWidth="8" />
      </svg>
      
      {/* Blocks - Increased opacity */}
      <svg className="absolute inset-0 w-full h-full opacity-40" width="100%" height="100%">
          <rect x="25%" y="25%" width="10%" height="15%" fill="#c0c0c0" />
          <rect x="60%" y="10%" width="15%" height="10%" fill="#c0c0c0" />
          <rect x="10%" y="60%" width="20%" height="15%" fill="#c0c0c0" />
      </svg>
    </div>
  );

const DemoBuildTrybe: React.FC = () => {
  const [step, setStep] = useState(0);

  // Auto-progress purely for visual interest initially
  useEffect(() => {
    if (step === 0) {
        const timer = setTimeout(() => setStep(1), 2500); // Auto find someone after scanning
        return () => clearTimeout(timer);
    }
  }, [step]);

  const reset = () => {
      setStep(0);
  }

  return (
    <PhoneMockup>
       <div className="h-full bg-ivory flex flex-col relative overflow-hidden">
          
          {/* Map Background Layer */}
          <CityMapBackground />

          {/* Central User Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <div className="relative">
                  {/* Radar Pulses */}
                  {step === 0 && (
                    <>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-ultramarine/30 rounded-full animate-ping duration-[3000ms]"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-ultramarine/10 rounded-full animate-ping duration-[3000ms] delay-700"></div>
                    </>
                  )}
                  
                  {/* User Avatar */}
                  <div className="w-12 h-12 bg-charcoal rounded-full border-[3px] border-white shadow-xl flex items-center justify-center relative z-20">
                      <User size={20} className="text-white" />
                  </div>
              </div>
          </div>

          {/* Nearby User Node (Clickable) */}
          <div 
             className={`absolute top-[35%] right-[20%] transition-all duration-700 cursor-pointer z-20 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
             onClick={() => step === 1 && setStep(2)} // Click to view profile if visible
          >
             <div className="relative group">
                 <div className="w-10 h-10 bg-white rounded-full border-2 border-ultramarine shadow-xl flex items-center justify-center animate-bounce-slow">
                     <span className="font-serif font-bold text-ultramarine">A</span>
                 </div>
                 {step === 1 && (
                     <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-charcoal text-white text-[9px] px-1.5 py-0.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                         98% Match
                     </div>
                 )}
             </div>
          </div>

          {/* UI Overlays */}
          <div className="relative z-30 h-full flex flex-col pointer-events-none">
             {/* Header */}
             <div className="p-4 pt-6 text-center pointer-events-auto bg-gradient-to-b from-white/80 to-transparent">
                 <h3 className="font-serif text-2xl text-charcoal">
                    {step === 0 ? 'Scanning nearby...' : step === 1 ? 'Shopper found' : 'Connected'}
                 </h3>
                 <p className="text-xs text-stone-600 font-medium">
                    {step === 0 ? 'Looking for style twins in SoHo' : step === 1 ? 'Someone compatible is close by' : 'You are shopping together'}
                 </p>
             </div>

             {/* Profile Card (Step 2 - Modal) */}
             {step === 2 && (
                 <div className="mt-auto mx-4 mb-12 p-4 bg-white rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-stone-100 animate-fade-in-up pointer-events-auto">
                     <div className="flex justify-between items-start mb-3">
                         <div className="flex gap-3">
                             <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-serif text-lg text-stone-600">A</div>
                             <div>
                                 <h4 className="font-bold text-charcoal text-sm">Anna</h4>
                                 <p className="text-[10px] text-stone-500">Modern Minimalist • 50m away</p>
                             </div>
                         </div>
                         <div className="bg-ultramarine/10 text-ultramarine text-[9px] font-bold px-1.5 py-0.5 rounded">
                             HIGH MATCH
                         </div>
                     </div>
                     
                     <div className="text-xs text-stone-600 mb-4 bg-stone-50 p-2.5 rounded-lg italic border border-stone-100">
                         "You two both frequent Cos and Theory."
                     </div>

                     <div className="flex gap-2">
                         <button onClick={() => setStep(3)} className="flex-1 bg-ultramarine text-white py-2.5 rounded-xl font-medium text-xs shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-colors">
                            Walk together
                         </button>
                         <button onClick={() => setStep(1)} className="p-2.5 border border-stone-200 rounded-xl text-stone-400 hover:text-charcoal hover:bg-stone-50 transition-colors">
                            <X size={18} />
                         </button>
                     </div>
                 </div>
             )}

             {/* Connected State (Step 3) */}
             {step === 3 && (
                 <div className="mt-auto m-4 mb-10 text-center animate-fade-in pointer-events-auto">
                     <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-lg border border-stone-100 mb-6">
                         <div className="flex -space-x-1.5">
                            <div className="w-5 h-5 rounded-full bg-charcoal border border-white"></div>
                            <div className="w-5 h-5 rounded-full bg-stone-200 border border-white flex items-center justify-center text-[8px] font-bold text-charcoal">A</div>
                         </div>
                         <span className="text-[10px] font-medium text-charcoal">Walking together</span>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-3 mb-2">
                         <button className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center gap-1.5 hover:border-ultramarine/30 transition-colors">
                             <MessageCircle size={18} className="text-ultramarine" />
                             <span className="text-[10px] font-bold text-stone-600">Chat</span>
                         </button>
                         <button className="bg-white p-3 rounded-xl shadow-sm border border-stone-100 flex flex-col items-center gap-1.5 hover:border-ultramarine/30 transition-colors">
                             <MapPin size={18} className="text-ultramarine" />
                             <span className="text-[10px] font-bold text-stone-600">Compare</span>
                         </button>
                     </div>
                     <button onClick={reset} className="mt-4 text-[10px] text-stone-400 underline pb-2">End session</button>
                 </div>
             )}
          </div>
       </div>
    </PhoneMockup>
  );
};

export default DemoBuildTrybe;