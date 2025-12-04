import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface FeatureCardProps {
    id: string;
    icon: LucideIcon;
    title: string;
    description: string;
    onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ id, icon: Icon, title, description, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="group relative p-6 md:p-8 rounded-[2rem] bg-ivory hover:bg-white border border-transparent hover:border-stone-200 shadow-[0_2px_10px_-4px_rgba(28,28,28,0.05)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full"
        >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white group-hover:bg-carmine text-stone-400 group-hover:text-white rounded-2xl shadow-sm border border-stone-100 group-hover:border-carmine flex items-center justify-center mb-4 md:mb-6 transition-all duration-300">
                <Icon size={28} strokeWidth={1.5} />
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-3 group-hover:text-carmine transition-colors">{title}</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-8 flex-grow">
                {description}
            </p>
            <div className="mt-auto px-6 py-2 rounded-full border border-stone-200 bg-white text-xs font-bold text-charcoal uppercase tracking-widest group-hover:bg-carmine group-hover:text-white group-hover:border-carmine transition-all flex items-center gap-2">
                Explore <ArrowRight size={14} />
            </div>
        </button>
    );
};

export default FeatureCard;
