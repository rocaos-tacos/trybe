import React, { useState } from 'react';
import { Star, Zap, Lock, Unlock, Gem } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

const DemoEarnRewards: React.FC = () => {
  const [points, setPoints] = useState(750);
  const [showReward, setShowReward] = useState(false);

  const claimReward = () => {
     setShowReward(true);
  };

  return (
    <PhoneMockup>
       <div className="h-full bg-ivory flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-charcoal text-ivory p-6 pt-8 pb-10 rounded-b-[2rem] relative z-10 shadow-xl flex-shrink-0">
              <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl">Your Style Journey</h3>
                  <div className="bg-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm border border-white/10">
                      <Gem size={10} className="text-carmine" />
                      <span className="text-[10px] font-bold">{points} pts</span>
                  </div>
              </div>
              
              <div className="relative pt-1">
                  <div className="flex justify-between text-[10px] text-stone-400 mb-1.5 font-medium tracking-wider">
                      <span>MEMBER</span>
                      <span>INSIDER</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-carmine to-red-500 w-[75%] rounded-full relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                      </div>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-2">250 points to next tier</p>
              </div>
          </div>

          {/* Timeline - Scrollable */}
          <div className="flex-1 p-6 -mt-2 relative z-0 overflow-y-auto scrollbar-hide pb-10">
             {/* Timeline Line */}
             <div className="absolute left-[34px] top-0 bottom-0 w-0.5 bg-stone-200"></div>
             
             <div className="space-y-6 relative pt-4">
                 {/* Item 1 */}
                 <div className="flex gap-4 items-center opacity-40 grayscale">
                     <div className="w-5 h-5 rounded-full bg-stone-200 border-2 border-white flex items-center justify-center z-10">
                        <Star size={10} className="text-white" />
                     </div>
                     <div className="flex-1 bg-white p-3 rounded-xl border border-stone-100 shadow-sm">
                         <h4 className="font-bold text-xs text-stone-800">First Fit Check</h4>
                         <p className="text-[10px] text-stone-400">+50 pts • Completed</p>
                     </div>
                 </div>

                 {/* Item 2 - Active */}
                 <div className="flex gap-4 items-center">
                     <div className="w-5 h-5 rounded-full bg-carmine border-2 border-white flex items-center justify-center z-10 shadow-lg shadow-carmine/30">
                        <Unlock size={10} className="text-white" />
                     </div>
                     <div className="flex-1 bg-white p-4 rounded-xl border-l-4 border-carmine shadow-md transform scale-[1.02] transition-transform">
                         <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-bold text-sm text-charcoal">Priority Routing</h4>
                                <p className="text-[10px] text-stone-500 mt-1 leading-tight">Skip waiting for fitting rooms at partner stores.</p>
                            </div>
                            <Zap size={14} className="text-carmine" />
                         </div>
                         {!showReward ? (
                             <button onClick={claimReward} className="mt-3 w-full py-2 bg-charcoal text-white text-[10px] font-bold rounded-lg hover:bg-black transition-colors">
                                 Unlock Perk
                             </button>
                         ) : (
                             <div className="mt-3 text-[10px] text-carmine font-bold flex items-center gap-1 animate-fade-in bg-red-50 p-2 rounded-lg justify-center">
                                 <div className="w-3 h-3 rounded-full bg-carmine/20 flex items-center justify-center"><Star size={8} /></div>
                                 Perk Active (24h)
                             </div>
                         )}
                     </div>
                 </div>

                 {/* Item 3 */}
                 <div className="flex gap-4 items-center">
                     <div className="w-5 h-5 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center z-10">
                        <Lock size={10} className="text-stone-400" />
                     </div>
                     <div className="flex-1 bg-white/50 p-3 rounded-xl border border-stone-100 border-dashed">
                         <h4 className="font-bold text-xs text-stone-400">Gift Card Raffle</h4>
                         <p className="text-[10px] text-stone-400">Unlock at 1000 pts</p>
                     </div>
                 </div>
                 
                 {/* Item 4 (Filler for scrolling) */}
                 <div className="flex gap-4 items-center opacity-60">
                     <div className="w-5 h-5 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center z-10">
                        <Lock size={10} className="text-stone-400" />
                     </div>
                     <div className="flex-1 bg-white/30 p-3 rounded-xl border border-stone-100 border-dashed">
                         <h4 className="font-bold text-xs text-stone-400">Seasonal Badge</h4>
                         <p className="text-[10px] text-stone-400">Unlock at 1500 pts</p>
                     </div>
                 </div>
             </div>
          </div>

          <div className="p-4 text-center bg-white border-t border-stone-100 flex-shrink-0">
              <p className="font-serif text-sm text-charcoal italic">"Your style gets sharper with every step."</p>
          </div>
       </div>
    </PhoneMockup>
  );
};

export default DemoEarnRewards;