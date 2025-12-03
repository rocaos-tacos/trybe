import React, { useState } from 'react';

const Poll: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleVote = (score: number) => {
    setSelected(score);
    // Simulate submission delay for UX
    setTimeout(() => {
      setSubmitted(true);
    }, 600);
  };

  const options = [
    { value: 1, label: "Not useful" },
    { value: 2, label: "Maybe" },
    { value: 3, label: "Helpful" },
    { value: 4, label: "Very Helpful" },
    { value: 5, label: "Game Changer" },
  ];

  return (
    <section className="py-24 px-6 border-t border-stone-200 bg-white/40">
      <div className="max-w-2xl mx-auto text-center">
        {!submitted ? (
          <>
            <h3 className="text-xl md:text-2xl font-serif text-charcoal mb-8">
              Quick Question: How helpful would Trybe be for your shopping experience?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleVote(opt.value)}
                  className={`
                    px-4 py-3 sm:py-4 rounded-lg border transition-all duration-200
                    ${selected === opt.value 
                      ? 'bg-carmine text-white border-carmine transform scale-105' 
                      : 'bg-white border-stone-200 text-stone-600 hover:border-carmine/30 hover:bg-red-50'
                    }
                  `}
                >
                  <span className="block text-lg font-bold mb-1">{opt.value}</span>
                  <span className="text-xs uppercase tracking-wider opacity-80">{opt.label}</span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-stone-400">Anonymous poll. No login required.</p>
          </>
        ) : (
          <div className="animate-fade-in py-8">
            <h3 className="text-2xl font-serif text-carmine mb-2">Thank you!</h3>
            <p className="text-stone-600">Your feedback shapes what we build next.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Poll;