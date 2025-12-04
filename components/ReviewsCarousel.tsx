import React from 'react';
import { Star, MapPin } from 'lucide-react';

const reviews = [
    {
        id: 1,
        name: "Sofia Martinez",
        location: "Mexico City",
        role: "Beta User",
        image: "/reviews/ReviewMirror1.png",
        quote: "The routing is weirdly accurate. It took me to three stores I hadn't thought of, and I bought something at every single one."
    },
    {
        id: 2,
        name: "Astrid Nielsen",
        location: "Copenhagen",
        role: "Early Access",
        image: "/reviews/ReviewMirror2.png",
        quote: "Finally, an app that gets that I don't always want to talk to people, but I hate second-guessing myself in the mirror."
    },
    {
        id: 3,
        name: "Isabella Garcia",
        location: "Madrid",
        role: "Stylist",
        image: "/reviews/ReviewMirror3.png",
        quote: "I use Trybe to plan routes for my clients. It saves me hours of pre-shopping research. The inventory matching is a game changer."
    },
    {
        id: 4,
        name: "Yuki Tanaka",
        location: "Tokyo",
        role: "Member",
        image: "/reviews/ReviewMirror4.png",
        quote: "The rewards actually feel valuable. Priority routing at Arket? Yes please. It feels like a VIP pass for normal shopping."
    }
];

const ReviewsCarousel: React.FC = () => {
    return (
        <section className="py-12 md:py-24 bg-ivory border-t border-stone-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left">
                <h2 className="text-3xl md:text-5xl font-serif text-charcoal mb-4">Community Stories</h2>
                <p className="text-lg text-stone-600 font-light">See how Trybe is changing the way people shop.</p>
            </div>

            {/* Carousel Container */}
            <div className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-12 px-6 md:px-[max(24px,calc((100vw-80rem)/2))]">
                <div className="flex gap-6 w-max">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="snap-center shrink-0 w-[260px] md:w-[400px] h-[380px] md:h-[500px] rounded-3xl relative overflow-hidden group shadow-lg transition-transform hover:-translate-y-2 duration-500"
                        >
                            {/* Background Image */}
                            <img
                                src={review.image}
                                alt={review.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="flex gap-1 mb-4 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill="currentColor" />
                                    ))}
                                </div>

                                <blockquote className="font-serif text-lg md:text-2xl italic leading-relaxed mb-6 opacity-90">
                                    "{review.quote}"
                                </blockquote>

                                <div className="flex items-center gap-4 border-t border-white/20 pt-4">
                                    <div className="flex-1">
                                        <div className="font-bold text-lg">{review.name}</div>
                                        <div className="flex items-center gap-2 text-sm text-stone-300">
                                            <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium text-white">{review.role}</span>
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {review.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {/* Spacer for end of scroll */}
                    <div className="w-6 shrink-0"></div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsCarousel;
