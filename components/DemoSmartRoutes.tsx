import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, RefreshCw, ArrowLeft, CloudRain, Zap, Clock } from 'lucide-react';
import PhoneMockup from './PhoneMockup';
import CityMapBackground from './CityMapBackground';

interface Route {
  id: string;
  name: string;
  duration: string;
  stops: string[];
  stopCoordinates: { x: number; y: number }[]; // Coordinates for store dots
  tag: string;
  tagColor: string;
  path: string; // SVG path d
  color: string;
}

const routes: Route[] = [
  {
    id: 'efficient',
    name: 'The Efficient Loop',
    duration: '18 min',
    stops: ['Zara', 'Uniqlo', 'Theory'],
    stopCoordinates: [{ x: 100, y: 350 }, { x: 100, y: 200 }, { x: 150, y: 100 }],
    tag: 'FASTEST',
    tagColor: 'bg-stone-100 text-stone-600',
    // Grid aligned: Start -> Left -> Up -> Right -> Up -> Finish
    path: 'M120 450 L 100 450 L 100 200 L 150 200 L 150 100',
    color: '#4b5563' // charcoal
  },
  {
    id: 'match',
    name: "The Editor's Pick",
    duration: '28 min',
    stops: ['Cos', 'Arket', '& Other Stories'],
    stopCoordinates: [{ x: 180, y: 350 }, { x: 180, y: 200 }, { x: 150, y: 100 }],
    tag: 'BEST MATCH',
    tagColor: 'bg-carmine text-white',
    // Grid aligned: Start -> Right -> Up -> Left -> Up -> Finish
    path: 'M120 450 L 180 450 L 180 200 L 150 200 L 150 100',
    color: '#960018' // carmine
  },
  {
    id: 'discovery',
    name: 'Hidden Gems',
    duration: '45 min',
    stops: ['Boutique A', 'Vintage B', 'Cafe C'],
    stopCoordinates: [{ x: 220, y: 400 }, { x: 220, y: 150 }, { x: 150, y: 100 }],
    tag: 'DISCOVERY',
    tagColor: 'bg-blue-50 text-blue-600',
    // Grid aligned: Start -> Right -> Up -> Left -> Up -> Finish (Wider)
    path: 'M120 450 L 220 450 L 220 150 L 150 150 L 150 100',
    color: '#2563eb' // blue
  }
];

const DemoSmartRoutes: React.FC = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState('match');
  const [navigationState, setNavigationState] = useState<'idle' | 'moving' | 'rerouting' | 'arrived'>('idle');
  const [alert, setAlert] = useState<string | null>(null);

  // Interactive State for Step 0
  const [category, setCategory] = useState('Workwear');
  const [timeFrame, setTimeFrame] = useState('30m');
  const [sliderValue, setSliderValue] = useState(50);

  const budget = sliderValue <= 25 ? 1 : sliderValue <= 75 ? 2 : 3;

  const handleStart = () => {
    setLoading(true);
    setStep(1);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  const handleBeginJourney = () => {
    setStep(3);
    setNavigationState('moving');

    // Simulate Reroute Event
    setTimeout(() => {
      setNavigationState('rerouting');
      setAlert('Rain detected! Rerouting to indoor path...');

      setTimeout(() => {
        setAlert(null);
        setNavigationState('moving'); // Resume moving on new path (visualized by color change or just continuing)
      }, 3000);
    }, 2500);
  };

  const reset = () => {
    setStep(0);
    setNavigationState('idle');
    setAlert(null);
    setSelectedRouteId('match');
  }

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[1];

  return (
    <PhoneMockup>
      <div className="h-full flex flex-col bg-ivory relative overflow-hidden font-sans">

        {/* Step 0: Input */}
        {step === 0 && (
          <div className="p-5 flex flex-col h-full animate-fade-in relative z-10">
            <h3 className="font-serif text-xl text-charcoal mb-3 mt-1">Where to today?</h3>

            <div className="space-y-5">
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 block">Shopping For</label>
                <div className="flex flex-wrap gap-2">
                  {['Basics', 'Workwear', 'Event', 'Gifts'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-2.5 py-1.5 rounded-full text-[10px] shadow-sm transition-all duration-200 ${category === cat
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
                      className={`flex-1 py-1.5 rounded-lg text-[10px] transition-all duration-200 ${timeFrame === t
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
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-charcoal transition-none"
                      style={{ width: `${sliderValue}%` }}
                    ></div>
                  </div>
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

            <button onClick={handleStart} className="mt-auto mb-8 w-full py-3 bg-carmine text-white rounded-xl font-bold text-xs tracking-wide shadow-lg shadow-carmine/20 hover:bg-red-800 transition-colors">
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

        {/* Step 2 & 3: Map & Selection/Navigation */}
        {(step === 2 || step === 3) && (
          <div className="relative h-full flex flex-col animate-fade-in">
            {/* Back Button */}
            <button
              onClick={() => step === 3 ? setStep(2) : setStep(0)}
              className="absolute top-12 left-4 z-40 w-10 h-10 bg-white rounded-full shadow-md border border-stone-100 flex items-center justify-center text-charcoal hover:bg-stone-50 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Map Layer */}
            <div className="flex-grow relative w-full overflow-hidden">
              {/* Zoomed out effect via transform */}
              <div className="absolute inset-0 transform scale-75 origin-center">
                <CityMapBackground />
              </div>

              {/* Routes Visualization */}
              {/* Adjusted viewBox to match the zoomed out scale/coordinate system */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 transform scale-75 origin-center" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))' }}>
                {routes.map((route) => {
                  const isSelected = selectedRouteId === route.id;
                  const isHidden = step === 3 && !isSelected; // Hide others during navigation

                  if (isHidden) return null;

                  return (
                    <g key={route.id} className="transition-all duration-500">
                      {/* Path Line */}
                      <path
                        d={route.path}
                        fill="none"
                        stroke={isSelected ? route.color : '#d6d3d1'}
                        strokeWidth={isSelected ? "6" : "4"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={step === 3 ? "8 4" : "none"} // Dashed when walking
                        className="transition-all duration-300"
                        style={{ opacity: isSelected ? 1 : 0.6 }}
                      />

                      {/* Store Points (Stops) */}
                      {route.stopCoordinates.map((coord, idx) => (
                        <circle
                          key={idx}
                          cx={coord.x}
                          cy={coord.y}
                          r={isSelected ? "5" : "3"}
                          fill="white"
                          stroke={isSelected ? route.color : '#d6d3d1'}
                          strokeWidth="2"
                        />
                      ))}

                      {/* End Point */}
                      <circle cx="150" cy="100" r="6" fill={isSelected ? route.color : '#d6d3d1'} stroke="white" strokeWidth="2" />
                    </g>
                  );
                })}

                {/* Navigation Animation (Step 3) */}
                {step === 3 && (
                  <circle
                    r="8"
                    fill="white"
                    stroke={selectedRoute.color}
                    strokeWidth="3"
                    className="z-50 shadow-lg"
                  >
                    <animateMotion
                      dur="8s"
                      repeatCount="indefinite"
                      path={selectedRoute.path}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    />
                  </circle>
                )}
              </svg>

              {/* Alert Toast */}
              {alert && (
                <div className="absolute top-24 left-4 right-4 bg-charcoal/90 backdrop-blur text-white p-3 rounded-xl shadow-xl z-50 flex items-center gap-3 animate-fade-in-down">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <CloudRain size={16} className="text-blue-300" />
                  </div>
                  <div className="text-xs font-medium">{alert}</div>
                </div>
              )}
            </div>

            {/* Bottom Sheet UI */}
            <div className="relative z-30 -mt-4 mb-6">

              {/* Step 2: Carousel Selection */}
              {step === 2 && (
                <div className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 flex gap-3 pb-4">
                  {routes.map((route) => (
                    <div
                      key={route.id}
                      onClick={() => setSelectedRouteId(route.id)}
                      className={`snap-center shrink-0 w-[80%] bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.08)] border p-4 transition-all duration-300 cursor-pointer ${selectedRouteId === route.id ? 'border-carmine/50 ring-1 ring-carmine/20 transform scale-[1.02]' : 'border-stone-100 opacity-80 scale-95'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${route.tagColor}`}>
                          {route.tag}
                        </span>
                        <span className="text-[10px] text-stone-400 font-bold flex items-center gap-1">
                          <Clock size={10} /> {route.duration}
                        </span>
                      </div>
                      <h4 className="font-serif text-base text-charcoal mb-1">{route.name}</h4>
                      <div className="text-[10px] text-stone-500 flex items-center gap-1 mb-3">
                        <MapPin size={10} /> {route.stops.length} stops: {route.stops[0]}, {route.stops[1]}...
                      </div>

                      {selectedRouteId === route.id && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleBeginJourney(); }}
                          className="w-full py-2 bg-carmine text-white rounded-lg text-[10px] font-bold shadow-md shadow-carmine/20 hover:bg-[#7a0013] transition-colors flex items-center justify-center gap-2"
                        >
                          <Navigation size={10} /> Start Route
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="w-2 shrink-0"></div>
                </div>
              )}

              {/* Step 3: Navigation Status */}
              {step === 3 && (
                <div className="mx-4 bg-white rounded-2xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-5 border border-stone-100 animate-fade-in-up">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-serif text-lg text-charcoal leading-tight">
                        {navigationState === 'rerouting' ? 'Rerouting...' : 'Navigating'}
                      </h4>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        {navigationState === 'rerouting' ? 'Calculating dry path...' : `Next stop: ${selectedRoute.stops[0]} • 2 min`}
                      </p>
                    </div>
                    <div className={`rounded-full p-2 ${navigationState === 'rerouting' ? 'bg-yellow-100 animate-pulse' : 'bg-green-100'}`}>
                      {navigationState === 'rerouting' ? <Zap size={16} className="text-yellow-600" /> : <Navigation size={16} className="text-green-600" />}
                    </div>
                  </div>

                  <div className="w-full bg-stone-100 rounded-full h-1.5 mb-2 overflow-hidden">
                    <div className="bg-carmine h-full rounded-full animate-progress-indeterminate"></div>
                  </div>
                  <div className="flex justify-between text-[9px] text-stone-400 font-medium">
                    <span>0.1 mi</span>
                    <span>{selectedRoute.duration} remaining</span>
                  </div>
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