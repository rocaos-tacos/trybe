import React from 'react';
import { X } from 'lucide-react';
import EmailSignup from './EmailSignup';

interface EmailModalProps {
    onClose: () => void;
    featureId: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ onClose, featureId }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-charcoal/20 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-stone-400 hover:text-charcoal hover:bg-stone-100 rounded-full transition-all"
                >
                    <X size={18} />
                </button>

                <div className="text-center mb-6">
                    <h2 className="font-serif text-2xl text-charcoal mb-2">Join the Trybe</h2>
                    <p className="text-stone-600 text-sm">
                        Be the first to know when this feature is ready.
                    </p>
                </div>

                <div className="flex justify-center">
                    <EmailSignup id={`modal-${featureId}`} />
                </div>
            </div>
        </div>
    );
};

export default EmailModal;
