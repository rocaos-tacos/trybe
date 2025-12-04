import React from 'react';

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

const PhoneMockup: React.FC<PhoneMockupProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative mx-auto border-stone-800 bg-stone-800 border-[8px] rounded-[2.5rem] h-[500px] w-[260px] md:h-[580px] md:w-[300px] shadow-2xl flex flex-col overflow-hidden ${className}`}>
      <div className="h-[32px] w-[3px] bg-stone-800 absolute -start-[11px] top-[72px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-stone-800 absolute -start-[11px] top-[124px] rounded-s-lg"></div>
      <div className="h-[46px] w-[3px] bg-stone-800 absolute -start-[11px] top-[178px] rounded-s-lg"></div>
      <div className="h-[64px] w-[3px] bg-stone-800 absolute -end-[11px] top-[142px] rounded-e-lg"></div>

      {/* Screen Content */}
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-ivory relative flex flex-col font-sans">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 z-20 flex justify-between items-end px-6 pb-2 text-[10px] font-medium text-charcoal">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-3 h-3 rounded-full border border-charcoal/30"></div>
            <div className="w-3 h-3 rounded-full border border-charcoal/30"></div>
            <div className="w-4 h-2.5 rounded-[2px] border border-charcoal bg-charcoal/80"></div>
          </div>
        </div>

        {/* Dynamic Island Area */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[24px] bg-stone-800 rounded-b-[16px] z-30"></div>

        {/* Main Content Area */}
        <div className="flex-grow relative overflow-hidden pt-10">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-charcoal/20 rounded-full z-20"></div>
      </div>
    </div>
  );
};

export default PhoneMockup;