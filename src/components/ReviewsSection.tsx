import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 lg:py-24 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Real Family Experiences</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Loved by Over 1,800 Parents & Children
          </h2>
          <p className="mt-3 text-base text-stone-600">
            Read heartwarming stories from parents who turned bedtime into an unforgettable adventure.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Purchase</span>
                  </div>
                </div>

                {/* Review body */}
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic">
                  "{review.review}"
                </p>
              </div>

              {/* Author footer */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">
                    {review.author}
                  </div>
                  <div className="text-stone-500">
                    {review.location} · Star: <strong>{review.childName}</strong>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-amber-800 font-medium">
                    {review.bookTitle}
                  </div>
                  <div className="text-stone-400 text-[11px]">
                    {review.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust banner */}
        <div className="mt-12 text-center text-xs text-stone-500 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            100% Satisfaction or Free Artwork Redraw
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Archival Heavyweight Paper (250gsm)</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Cash on Delivery Supported across Morocco</span>
        </div>

      </div>
    </section>
  );
};
