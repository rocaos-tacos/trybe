import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, RefreshCw, ArrowLeft } from 'lucide-react';
import PhoneMockup from './PhoneMockup';

// Reusable City Map Background Component
const CityMapBackground = () => (
  <div className="absolute inset-0 z-0 bg-[#f2f1ed] overflow-hidden pointer-events-none">
    {/* Map Base color is a warm light grey/beige like Google Maps */}

    {/* Parks/Green Areas */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#e3eed3] rounded-full blur-3xl opacity-60"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-[#e3eed3] rounded-full blur-3xl opacity-60"></div>

    {/* Street Grid Pattern - Vertical */}
    <div className="absolute inset-0"
      style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 39px, #e6e6e6 40px, #e6e6e6 44px)',
      }}>
    </div>
    {/* Street Grid Pattern - Horizontal */}
    <div className="absolute inset-0"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, #e6e6e6 40px, #e6e6e6 44px)',
      }}>
    </div>

    {/* Major Roads */}
    <div className="absolute top-[30%] left-0 right-0 h-3 bg-white border-y border-[#e6e6e6]"></div>
    <div className="absolute top-0 bottom-0 left-[40%] w-3 bg-white border-x border-[#e6e6e6]"></div>

    {/* Blocks */}
    <svg className="absolute inset-0 w-full h-full opacity-30" width="100%" height="100%">
      <rect x="15%" y="10%" width="15%" height="10%" fill="#d9d9d9" />
      <rect x="50%" y="40%" width="20%" height="15%" fill="#d9d9d9" />
      <rect x="10%" y="60%" width="15%" height="20%" fill="#d9d9d9" />
      <rect x="70%" y="15%" width="20%" height="10%" fill="#d9d9d9" />
    </svg>
  </div>
);

const DemoSmartRoutes: React.FC = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  // Interactive State for Step 0
  const [category, setCategory] = useState('Workwear');
  const [timeFrame, setTimeFrame] = useState('30m');
  const [sliderValue, setSliderValue] = useState(50); // 0 to 100

  // Derived budget for logic (1, 2, 3)
  const budget = sliderValue <= 25 ? 1 : sliderValue <= 75 ? 2 : 3;

  const handleStart = () => {
    setLoading(true);
    setStep(1);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  const handleSelectRoute = () => {
    setStep(3);
  };

  const handleReroute = () => {
    setLoading(true);
    setStep(1);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const reset = () => {
    setStep(0);
  }

  return (
    <PhoneMockup>
      <div className="h-full flex flex-col bg-ivory relative overflow-hidden">
        {/* Step 0: Input */}
        {step === 0 && (
          <div className="p-6 flex flex-col h-full animate-fade-in relative z-10">
            <h3 className="font-serif text-2xl text-charcoal mb-4 mt-2">Where to today?</h3>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 block">Shopping For</label>
                <div className="flex flex-wrap gap-2">
                  {['Basics', 'Workwear', 'Event', 'Gifts'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 rounded-full text-xs shadow-sm transition-all duration-200 ${category === cat
                        ? 'bg-charcoal text-white shadow-md transform scale-105'
                        : 'border border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 block">Time</label>
                <div className="flex gap-2">
                  {['15m', '30m', '1h+'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeFrame(t)}
                      className={`flex-1 py-2 rounded-lg text-xs transition-all duration-200 ${timeFrame === t
                        ? 'bg-carmine/5 border border-carmine text-carmine font-bold shadow-sm'
                        : 'border border-stone-200 text-stone-500 bg-white hover:bg-stone-50'
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 block">Budget</label>
                <div className="relative h-8 flex items-center group">
                  {/* Custom Range Slider Look */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  {/* Track Background */}
                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden relative">
                    {/* Fill */}
                    <div
                      className="h-full bg-charcoal transition-none"
                      style={{ width: `${sliderValue}%` }}
                    ></div>
                  </div>
                  {/* Thumb Indicator */}
                  <div
                    className="absolute w-4 h-4 bg-white border-2 border-charcoal rounded-full shadow-md z-10 pointer-events-none transition-transform duration-100 group-active:scale-110"
                    style={{
                      left: `${sliderValue}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-stone-400 mt-1.5 font-medium select-none">
                  <span className={budget >= 1 ? 'text-charcoal transition-colors' : ''}>$</span>
                  <span className={budget >= 2 ? 'text-charcoal transition-colors' : ''}>$$</span>
                  <span className={budget >= 3 ? 'text-charcoal transition-colors' : ''}>$$$</span>
                </div>
              </div>
            </div>

            <button onClick={handleStart} className="mt-auto mb-10 w-full py-3.5 bg-carmine text-white rounded-xl font-bold text-sm tracking-wide shadow-lg shadow-carmine/20 hover:bg-red-800 transition-colors">
              Find My Route
            </button>
          </div>
        )}

        {/* Step 1: Loading */}
        {step === 1 && (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in z-10 relative bg-ivory">
            <div className="w-12 h-12 relative mb-6">
              <div className="absolute inset-0 border-4 border-stone-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-carmine border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="font-serif text-lg text-charcoal">Designing your shopping path...</p>
            <p className="text-xs text-stone-400 mt-2">Checking store inventory & style match</p>
          </div>
        )}

        {/* Step 2: Route Options */}
        {step === 2 && (
          <div className="flex flex-col h-full bg-stone-50 animate-fade-in-up relative z-10">
            <div className="p-5 pb-2">
              <button
                onClick={() => setStep(0)}
                className="mb-2 w-8 h-8 bg-white rounded-full border border-stone-200 flex items-center justify-center text-stone-600 shadow-sm hover:bg-stone-100 hover:text-charcoal transition-all"
              >
                <ArrowLeft size={16} />
              </button>
              <h3 className="font-serif text-xl text-charcoal">Curated for you</h3>
              <p className="text-[10px] text-stone-500">Based on "{category}" • {timeFrame}</p>
            </div>
            <div className="flex-1 px-4 py-2 space-y-2.5 overflow-y-auto pb-4 scrollbar-hide">
              <div onClick={handleSelectRoute} className="bg-white p-3.5 rounded-xl shadow-sm border border-stone-100 cursor-pointer hover:border-carmine/30 transition-all group">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-bold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded">Fastest</span>
                  <span className="text-[10px] text-stone-400">18 min</span>
                </div>
                <div className="font-serif text-base text-charcoal mb-0.5 group-hover:text-carmine transition-colors">The Efficient Loop</div>
                <div className="text-[10px] text-stone-500 flex items-center gap-1">
                  <MapPin size={10} /> 3 stops: Zara, Uniqlo, Theory
                </div>
              </div>

              <div onClick={handleSelectRoute} className="bg-white p-3.5 rounded-xl shadow-md border border-carmine/20 cursor-pointer relative overflow-hidden group">
                <div className="absolute top-0 right-0 bg-carmine text-white text-[9px] px-2 py-0.5 rounded-bl-lg font-bold">BEST MATCH</div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-bold bg-red-50 text-carmine px-1.5 py-0.5 rounded">Style Match</span>
                  <span className="text-[10px] text-stone-400">28 min</span>
                </div>
                <div className="font-serif text-base text-charcoal mb-0.5 group-hover:text-carmine transition-colors">The Editor's Pick</div>
                <div className="text-[10px] text-stone-500 flex items-center gap-1">
                  <MapPin size={10} /> 4 stops: Cos, Arket, & Other Stories...
                </div>
              </div>

              <div onClick={handleSelectRoute} className="bg-white p-3.5 rounded-xl shadow-sm border border-stone-100 cursor-pointer hover:border-carmine/30 transition-all group">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">Discovery</span>
                  <span className="text-[10px] text-stone-400">45 min</span>
                </div>
                <div className="font-serif text-base text-charcoal mb-0.5 group-hover:text-carmine transition-colors">Hidden Gems</div>
                <div className="text-[10px] text-stone-500 flex items-center gap-1">
                  <MapPin size={10} /> 3 boutiques nearby
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 & 4: Navigation */}
        {(step === 3 || step === 4) && (
          <div className="relative h-full flex flex-col animate-fade-in">
            {/* Back Button */}
            <button
              onClick={() => setStep(2)}
              className="absolute top-12 left-4 z-40 w-10 h-10 bg-white rounded-full shadow-md border border-stone-100 flex items-center justify-center text-charcoal hover:bg-stone-50 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Real-ish Map Background */}
            <div className="flex-grow relative w-full overflow-hidden">
              <CityMapBackground />

              {/* Route Line SVG Overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ filter: 'drop-shadow(0px 3px 3px rgba(0,0,0,0.2))' }}>
                {/* Path Logic */}
                <path d={step === 3 ? "M150 480 C 150 400, 100 350, 120 250 S 180 150, 150 100" : "M150 480 C 180 400, 220 350, 200 250 S 120 150, 150 100"}
                  fill="none" stroke={step === 3 ? "#960018" : "#3F00FF"} strokeWidth="5" strokeLinecap="round" strokeDasharray="8 6" className="animate-pulse" />

                {/* Stop Points */}
                <circle cx="150" cy="100" r="6" fill={step === 3 ? "#960018" : "#3F00FF"} stroke="white" strokeWidth="2" />
                <circle cx="120" cy="250" r="6" fill="white" stroke={step === 3 ? "#960018" : "#3F00FF"} strokeWidth="3" />
              </svg>

              {/* 3D Map Markers */}
              {/* Current Location */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-4 h-4 bg-charcoal rounded-full border-2 border-white shadow-xl z-20"></div>

              {/* Stop 1 Label */}
              <div className="absolute top-[215px] left-[130px] bg-white px-2 py-1 rounded shadow-md z-20 text-[10px] font-bold border border-stone-100 flex items-center gap-1 whitespace-nowrap transform -translate-x-1/2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 1. Arket
              </div>

              {/* Stop 2 Label */}
              <div className="absolute top-[65px] left-[160px] bg-charcoal text-white px-2 py-1 rounded shadow-md z-20 text-[10px] font-bold border border-white flex items-center gap-1 whitespace-nowrap">
                2. Everlane
              </div>
            </div>

            {/* Bottom Sheet */}
            <div className="bg-white rounded-t-[1.5rem] shadow-[0_-5px_20px_rgba(0,0,0,0.08)] p-5 pb-10 relative z-30 -mt-4 mb-2">
              <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto mb-4"></div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-serif text-lg text-charcoal leading-tight">
                    {step === 3 ? 'Arket' : 'Everlane'}
                  </h4>
                  <p className="text-[10px] text-stone-500 mt-0.5">Stop 1 of 4 • 0.2 mi away</p>
                </div>
                <div className="bg-stone-100 rounded-full p-2">
                  <Navigation size={16} className="text-charcoal" />
                </div>
              </div>

              {step === 3 ? (
                <button onClick={handleReroute} className="w-full py-3 bg-carmine text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-carmine/20 hover:bg-[#7a0013] transition-colors">
                  <Navigation size={16} />
                  Begin journey
                </button>
              ) : (
                <div className="w-full py-2.5 bg-stone-50 text-stone-500 rounded-xl text-xs font-medium text-center border border-stone-100 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Rerouted to better inventory match.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reset for demo purposes */}
        <button onClick={reset} className="absolute top-2 right-2 p-2 opacity-0 hover:opacity-100 transition-opacity z-50 bg-black/10 rounded-full">
          <RefreshCw size={12} />
        </button>
      </div>
    </PhoneMockup>
  );
};

export default DemoSmartRoutes;