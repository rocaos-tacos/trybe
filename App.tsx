import React, { useState, useEffect } from 'react';
import { MapPin, Users, Heart, Navigation, Camera, Smile, ShoppingBag, Star, Sparkles, CheckCircle, Share2, Gem, ArrowRight, MessageCircle } from 'lucide-react';
import EmailSignup from './components/EmailSignup';
import Poll from './components/Poll';
import DemoSmartRoutes from './components/DemoSmartRoutes';
import DemoFitCheck from './components/DemoFitCheck';
import DemoBuildTrybe from './components/DemoBuildTrybe';
import DemoEarnRewards from './components/DemoEarnRewards';
import AdminDashboard from './components/AdminDashboard';
import FeatureCard from './components/FeatureCard';
import LoginModal from './components/LoginModal';
import EmailModal from './components/EmailModal';
import ReviewsCarousel from './components/ReviewsCarousel';
import DownloadButtons from './components/DownloadButtons';
import { analytics } from './services/analytics';

const App: React.FC = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [activeFeature, setActiveFeature] = useState('');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Secret key combo: Ctrl + Shift + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdmin(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const trackExplore = (feature: string) => {
    analytics.trackEvent('explore_click', { feature });
  };

  // Animation thresholds
  const isScrolled = scrollY > 50;

  const handleCtaClick = (feature: string) => {
    setActiveFeature(feature);
    setShowEmailModal(true);
    analytics.trackEvent('cta_click', { feature });
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal overflow-x-hidden selection:bg-carmine/20">
      {showAdmin && <AdminDashboard onClose={() => setShowAdmin(false)} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showEmailModal && <EmailModal onClose={() => setShowEmailModal(false)} featureId={activeFeature} />}

      {/* HEADER */}
      <header className={`absolute top-0 left-0 w-full z-50 px-6 py-6 md:py-8 transition-all duration-500 ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-charcoal">Trybe</div>
          <button
            onClick={() => {
              setShowLogin(true);
              analytics.trackEvent('login_modal_open', { source: 'header' });
            }}
            className="px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm text-xs font-bold uppercase tracking-wider text-charcoal hover:bg-white hover:shadow-md transition-all"
          >
            Members Login
          </button>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col lg:justify-center px-0 lg:px-6 pt-0 pb-12 lg:pt-0 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center">

          {/* IMAGE CONTAINER */}
          {/* Mobile: Absolute top, Desktop: Grid col 2 */}
          <div className="absolute top-0 inset-x-0 h-[65vh] lg:static lg:h-[700px] lg:order-2 lg:w-full z-0 lg:flex lg:justify-end lg:items-center">
            <div className="absolute inset-0 lg:inset-y-0 lg:-right-40 lg:w-[120%] h-full">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                alt="Elegant woman shopping with bags"
                className="w-full h-full object-cover object-top lg:object-center opacity-90"
              />
              {/* Mobile Gradient: Fade to Ivory at bottom for text readability */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ivory via-ivory/80 to-transparent lg:hidden"></div>
              {/* Desktop Gradient: Fade to Ivory at left */}
              <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-ivory via-ivory/70 to-transparent"></div>
            </div>

            {/* Floating Relevant Cards */}
            <div className="absolute inset-0 flex items-center justify-center lg:static lg:block lg:translate-x-12 z-10 pointer-events-none">
              <div className="relative w-full max-w-[280px] aspect-square lg:max-w-md">

                {/* Card 1: Route Notification */}
                <div
                  className={`absolute top-1/4 left-4 lg:-left-10 bg-white shadow-xl shadow-stone-200/50 rounded-xl border border-stone-100 transform -rotate-6 z-20 transition-all duration-700 ease-out origin-top-left
                    ${isScrolled
                      ? 'p-4 max-w-[160px] lg:max-w-[180px] opacity-100 scale-100'
                      : 'p-3 max-w-[120px] lg:max-w-[140px] opacity-90 scale-95'
                    }`}
                >
                  <div className={`flex items-center gap-3 ${isScrolled ? 'mb-3 border-b border-stone-100 pb-2' : 'mb-0 border-none pb-0'}`}>
                    <div className="w-8 h-8 rounded-full bg-carmine/10 flex items-center justify-center shrink-0">
                      <Navigation size={14} className="text-carmine" />
                    </div>
                    <div className={`transition-all duration-500 ${isScrolled ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide whitespace-nowrap">Route Found</p>
                      <p className="text-xs font-bold text-charcoal whitespace-nowrap">Hidden Gem</p>
                    </div>
                  </div>
                  <div className={`space-y-1.5 overflow-hidden transition-all duration-500 ${isScrolled ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex items-center gap-2 text-[10px] text-stone-600">
                      <MapPin size={12} className="text-stone-400" />
                      <span>SoHo • 5 min away</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-carmine font-bold bg-red-50 px-1.5 py-0.5 rounded-full w-fit">
                      <Sparkles size={10} />
                      <span>98% Style Match</span>
                    </div>
                  </div>
                </div>

                {/* Card 2: Fit Check Result */}
                <div
                  className={`absolute bottom-1/4 right-4 lg:right-0 bg-white shadow-xl shadow-stone-200/50 rounded-xl border border-stone-100 transform rotate-3 z-20 transition-all duration-700 ease-out delay-100 origin-bottom-right
                    ${isScrolled
                      ? 'p-3 max-w-[150px] lg:max-w-[170px] opacity-100 scale-100'
                      : 'p-2 max-w-[100px] lg:max-w-[120px] opacity-90 scale-95'
                    }`}
                >
                  <div className={`relative rounded-lg overflow-hidden bg-stone-100 transition-all duration-500 ${isScrolled ? 'h-24 mb-3' : 'h-16 mb-0'}`}>
                    <img
                      src="/TrybeSelfieHero.png"
                      alt="Outfit"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-1 shadow-sm">
                      <Heart size={10} className="fill-carmine text-carmine" />
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-500 ${isScrolled ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-xs font-serif italic text-charcoal mb-1 leading-tight">"This silhouette is perfect on you!"</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex -space-x-1.5">
                        <div className="w-4 h-4 rounded-full bg-stone-200 border border-white"></div>
                        <div className="w-4 h-4 rounded-full bg-stone-300 border border-white"></div>
                        <div className="w-4 h-4 rounded-full bg-carmine text-white text-[8px] flex items-center justify-center border border-white">+3</div>
                      </div>
                      <span className="text-[9px] font-bold text-stone-500 uppercase tracking-wide">Trybe Approved</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* TEXT CONTENT */}
          {/* Mobile: Pushed down to overlap image, Desktop: Grid col 1 */}
          <div className="relative z-10 pt-[50vh] px-6 lg:pt-0 lg:px-0 lg:order-1 space-y-6 lg:space-y-8 animate-fade-in-up text-center lg:text-left">
            <h1 className="text-4xl md:text-7xl font-serif leading-[1.0] tracking-tight text-charcoal">
              Find clothes that <span className="italic text-carmine">fit</span>, faster.
            </h1>
            <p className="text-lg md:text-xl text-stone-600 font-light max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Your personal shopping enhancer that leads you to the right fit, and the community that shares your style.
              <span className="block mt-2 italic">Find your fit. Find your Trybe.</span>
            </p>

            <div className="pt-4 flex justify-center lg:justify-start">
              <DownloadButtons />
            </div>
          </div>

        </div>
      </section>

      {/* 2. PROBLEM SECTION */}
      <section className="py-12 md:py-24 px-6 bg-white border-y border-stone-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal">
              Shopping shouldn’t feel stressful.
            </h2>
            <p className="text-carmine font-bold text-lg md:text-xl tracking-widest uppercase">Explore how Trybe helps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Fit Check Card */}
            <FeatureCard
              id="fit-check"
              icon={Smile}
              title="Find Your Fit"
              description="Instant, anonymous feedback on your look."
              onClick={() => {
                document.getElementById('fit-check')?.scrollIntoView({ behavior: 'smooth' });
                trackExplore('fit_check');
              }}
            />

            {/* Smart Routes Card */}
            <FeatureCard
              id="smart-routes"
              icon={MapPin}
              title="Plan Your Route"
              description="Curated shopping paths for your style."
              onClick={() => {
                document.getElementById('smart-routes')?.scrollIntoView({ behavior: 'smooth' });
                trackExplore('smart_routes');
              }}
            />

            {/* Trybe Card */}
            <FeatureCard
              id="build-trybe"
              icon={Users}
              title="Build Your Trybe"
              description="Honest advice from real, compatible peers."
              onClick={() => {
                document.getElementById('build-trybe')?.scrollIntoView({ behavior: 'smooth' });
                trackExplore('build_trybe');
              }}
            />

            {/* Rewards Card */}
            <FeatureCard
              id="earn-rewards"
              icon={Gem}
              title="Treat Yourself"
              description="Unlock exclusive perks as you shop."
              onClick={() => {
                document.getElementById('earn-rewards')?.scrollIntoView({ behavior: 'smooth' });
                trackExplore('earn_rewards');
              }}
            />

          </div>
        </div>
      </section>

      {/* 3. REVIEWS CAROUSEL */}
      <ReviewsCarousel />

      {/* NEW PREMIUM SECTION 1: Fit Check */}
      <section id="fit-check" className="py-12 md:py-24 px-6 bg-ivory scroll-mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <DemoFitCheck />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">Fit Check</h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              Snap a quick fitting-room photo — no face needed — and get honest feedback from people who dress like you.
              <br /><br />
              Fit Check gives you clarity in the moment you need it most: discreet, fast, and free from pressure. Just real guidance from your style community, when the mirror isn’t enough.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleCtaClick('fit_check')}
                className="px-8 py-3 rounded-full bg-carmine text-white font-medium hover:bg-[#7a0013] transition-colors shadow-lg shadow-red-900/10 flex items-center gap-2"
              >
                Join Waitlist <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW PREMIUM SECTION 2: Curated Shopping Paths */}
      <section id="smart-routes" className="py-12 md:py-24 px-6 border-t border-stone-100 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">Curated Shopping Paths</h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              Trybe builds a curated shopping path the moment you arrive. No wandering. No guessing. Just a route designed around your style, your budget, and your time.
              <br /><br />
              And if a piece doesn’t feel right, Trybe instantly guides you to the next best stop — the stores most likely to get you the fit you’re looking for.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleCtaClick('smart_routes')}
                className="px-8 py-3 rounded-full bg-carmine text-white font-medium hover:bg-[#7a0013] transition-colors shadow-lg shadow-red-900/10 flex items-center gap-2"
              >
                Join Waitlist <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <DemoSmartRoutes />
          </div>
        </div>
      </section>

      {/* NEW PREMIUM SECTION 3: Build Your Trybe */}
      <section id="build-trybe" className="py-12 md:py-24 px-6 bg-white border-t border-stone-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <DemoBuildTrybe />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">Build Your Trybe</h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              Shopping doesn’t have to be solitary. With Trybe, you can choose to connect with compatible shoppers nearby — only if you want to.
              <br /><br />
              Share a moment, compare options, walk a few steps together. It’s subtle company, effortless chemistry, and a sense of belonging built around taste, not obligation.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleCtaClick('build_trybe')}
                className="px-8 py-3 rounded-full bg-carmine text-white font-medium hover:bg-[#7a0013] transition-colors shadow-lg shadow-red-900/10 flex items-center gap-2"
              >
                Join Waitlist <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW PREMIUM SECTION 4: Earn as You Shop */}
      <section id="earn-rewards" className="py-12 md:py-24 px-6 bg-ivory scroll-mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-charcoal leading-tight">Earn as You Shop</h2>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              Every meaningful action earns you points — giving feedback, completing routes, discovering new stores, exploring new neighborhoods, or shopping alongside your Trybe.
              <br /><br />
              As you grow, unlock tasteful perks like priority routing, seasonal badges, small retailer discounts, or occasional gift-card raffles. A light, elegant reward system that makes shopping feel even better.
            </p>
            <div className="pt-2">
              <button
                onClick={() => handleCtaClick('earn_rewards')}
                className="px-8 py-3 rounded-full bg-carmine text-white font-medium hover:bg-[#7a0013] transition-colors shadow-lg shadow-red-900/10 flex items-center gap-2"
              >
                Join Waitlist <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <DemoEarnRewards />
          </div>
        </div>
      </section>

      {/* 8. MICRO POLL */}
      <Poll />

      {/* 9. FOOTER CTA */}
      <footer className="bg-charcoal text-ivory pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">

          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-serif">Ready to shop with clarity?</h2>
            <div className="max-w-md mx-auto pt-6 flex justify-center">
              <DownloadButtons className="justify-center" />
            </div>
          </div>

          <div className="pt-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-stone-400 gap-6">
            <div className="font-serif text-2xl text-white">Trybe</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div>
              © {new Date().getFullYear()} Trybe Research.
              <button
                onClick={() => setShowAdmin(true)}
                className="ml-2 text-stone-600 hover:text-carmine text-xs opacity-50 hover:opacity-100 transition-all"
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
