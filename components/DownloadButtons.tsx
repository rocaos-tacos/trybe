import React from 'react';

const DownloadButtons: React.FC<{ className?: string }> = ({ className = '' }) => {
    return (
        <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
            {/* App Store Button */}
            <button className="flex items-center gap-3 bg-charcoal text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                <img src="/Apple_logo_white.png" alt="Apple Logo" className="w-6 h-6 object-contain" />
                <div className="text-left">
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 leading-none mb-0.5">Download on the</div>
                    <div className="text-lg font-bold leading-none font-serif">App Store</div>
                </div>
            </button>

            {/* Google Play Button */}
            <button className="flex items-center gap-3 bg-charcoal text-white px-5 py-2.5 rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current">
                    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
                </svg>
                <div className="text-left">
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-80 leading-none mb-0.5">Get it on</div>
                    <div className="text-lg font-bold leading-none font-serif">Google Play</div>
                </div>
            </button>
        </div>
    );
};

export default DownloadButtons;
