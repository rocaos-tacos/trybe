import React from 'react';

const CityMapBackground: React.FC = () => (
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

export default CityMapBackground;
