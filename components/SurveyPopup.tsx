import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { analytics } from '../services/analytics';

interface SurveyPopupProps {
    onClose: () => void;
}

const questions = [
    {
        id: 'social_validation',
        text: 'I often send photos to friends for approval before buying clothes.',
    },
    {
        id: 'inefficient_routes',
        text: 'I skip certain stores because they are too far or hard to get to.',
    },
    {
        id: 'social_shopping',
        text: 'I would be open to shopping with like-minded strangers for connection.',
    },
];

const scale = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' },
];

const SurveyPopup: React.FC<SurveyPopupProps> = ({ onClose }) => {
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleOptionSelect = (questionId: string, value: number) => {
        setAnswers((prev) => ({
            ...prev,
            [questionId]: value,
        }));
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        // Simulate network request / log to analytics
        analytics.trackEvent('survey_submitted', answers);

        setTimeout(() => {
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
            }, 2000);
        }, 800);
    };

    const isComplete = questions.every((q) => answers[q.id]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-ivory">
                    <div>
                        <h2 className="font-serif text-2xl text-charcoal">Quick Question</h2>
                        <p className="text-stone-500 text-sm mt-1">Help us tailor the Trybe experience for you.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-stone-400 hover:text-charcoal hover:bg-stone-100 rounded-full transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto">
                    {isSubmitted ? (
                        <div className="py-12 flex flex-col items-center text-center animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-serif text-charcoal mb-2">Thank You!</h3>
                            <p className="text-stone-600">Your feedback helps us build a better Trybe.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {questions.map((q) => (
                                <div key={q.id} className="space-y-3">
                                    <p className="font-medium text-charcoal text-base md:text-lg leading-snug">
                                        {q.text}
                                    </p>
                                    <div className="grid grid-cols-5 gap-2">
                                        {scale.map((s) => (
                                            <button
                                                key={s.value}
                                                onClick={() => handleOptionSelect(q.id, s.value)}
                                                className={`
                          flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 border
                          ${answers[q.id] === s.value
                                                        ? 'bg-carmine text-white border-carmine shadow-md transform scale-105'
                                                        : 'bg-white text-stone-500 border-stone-200 hover:border-carmine/50 hover:bg-red-50'
                                                    }
                        `}
                                            >
                                                <span className={`text-lg font-bold mb-1 ${answers[q.id] === s.value ? 'text-white' : 'text-stone-400'}`}>
                                                    {s.value}
                                                </span>
                                                <span className="text-[10px] uppercase tracking-wider font-medium hidden md:block text-center leading-tight">
                                                    {s.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex justify-between px-1 md:hidden">
                                        <span className="text-[10px] text-stone-400">Strongly Disagree</span>
                                        <span className="text-[10px] text-stone-400">Strongly Agree</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!isSubmitted && (
                    <div className="p-6 border-t border-stone-100 bg-stone-50 flex justify-end">
                        <button
                            onClick={handleSubmit}
                            disabled={!isComplete || isSubmitting}
                            className={`
                px-8 py-3 rounded-full font-medium transition-all shadow-lg
                ${isComplete
                                    ? 'bg-carmine text-white hover:bg-[#7a0013] shadow-red-900/10'
                                    : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
                                }
              `}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SurveyPopup;
