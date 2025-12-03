import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { analytics } from '../services/analytics';

interface EmailSignupProps {
  id: string;
  minimal?: boolean;
}

const EmailSignup: React.FC<EmailSignupProps> = ({
  id,
  placeholder = "Enter your email address",
  buttonText = "Join now!",
  minimal = false
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      analytics.saveEmail(email, id);
      analytics.trackEvent('email_signup', { source: id, email });
      setStatus('success');
      setEmail('');
    }, 800);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-stone-100 rounded-lg border border-stone-200 animate-fade-in">
        <div className="h-10 w-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-2">
          <Check size={20} />
        </div>
        <p className="text-charcoal font-medium">You're on the list.</p>
        <p className="text-stone-500 text-xs mt-1">Thank you for helping our research.</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-xs text-carmine underline hover:text-red-800"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-md ${minimal ? '' : 'mx-auto'}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          id={id}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="flex-grow px-5 py-3 rounded-full border border-stone-300 bg-white/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-carmine focus:border-carmine transition-all placeholder:text-stone-400 text-charcoal"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-3 rounded-full bg-carmine text-white font-medium hover:bg-[#7a0013] transition-colors shadow-lg shadow-red-900/10 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {buttonText}
              {!minimal && <ArrowRight size={16} />}
            </>
          )}
        </button>
      </form>
      <p className="mt-3 text-[10px] text-stone-500 text-center sm:text-left leading-tight opacity-80">
        Your information is collected only for academic research purposes and will not be shared or used for marketing.
      </p>
    </div>
  );
};

export default EmailSignup;