import React, { useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, Heart, ShieldCheck, Truck, Star } from 'lucide-react';
import { ASSETS } from '../data/mockData';

interface HeroProps {
  onCustomizeClick: () => void;
  onPreviewClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCustomizeClick, onPreviewClick }) => {
  // Slider position (0 to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-20">
      {/* Background subtle warm glow circles */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-100/60 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Clean unboxed kicker (no pill badge) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
              <span>Keepsake Storybooks</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span>100% Authentic Likeness</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span>Printed in Morocco</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-slate-900 tracking-tight leading-[1.12] text-balance">
              Turn Your Child into the <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">Hero</span> of Their Own Storybook
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
              Upload one photo. Our dedicated artists and smart illustration engine craft a heartwarming, full-color hardcover adventure where your child stars as the brave little hero—looking genuinely like themselves on every page.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onCustomizeClick}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 group"
              >
                <span>Personalize in 2 Minutes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onPreviewClick}
                className="px-5 py-3.5 text-sm sm:text-base font-semibold text-stone-700 hover:text-slate-900 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Read Sample Story</span>
              </button>
            </div>

            {/* Adjacent Proof & Trust markers */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-sm mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                  <span className="font-bold text-slate-900 text-xs ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">1,800+ Happy Kids</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs text-slate-900 font-bold">100% Likeness</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">Free Digital Proof Approval</p>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-blue-700 text-sm font-semibold mb-1">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-slate-900 font-bold">Fast Delivery</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">Free on 2-Book Combos</p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Before & After Photo-to-Hero Comparison */}
          <div className="lg:col-span-6">
            <div className="bg-white p-3 sm:p-4 rounded-2xl border border-stone-200 shadow-xl relative">
              
              {/* Slider instruction banner */}
              <div className="flex items-center justify-between pb-3 px-1 text-xs text-stone-500 border-b border-stone-100 mb-3">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Drag the slider to reveal the likeness magic:
                </span>
                <span className="text-amber-700 font-medium hidden sm:inline">
                  Real Child Photo ↔ Illustrated Hero
                </span>
              </div>

              {/* Before/After Viewport */}
              <div
                className="relative h-[340px] sm:h-[440px] rounded-xl overflow-hidden cursor-ew-resize select-none bg-stone-100 border border-stone-200"
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* Background Image: Illustrated Hero (Nyout in doctor coat & smile) */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={ASSETS.bookCoverDoctor}
                    alt="Illustrated Storybook Hero Nyout The Little Doctor"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-right"
                  />
                  {/* Subtle label */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md shadow-xs">
                    Storybook Hero
                  </div>
                </div>

                {/* Foreground Clipped Image: Real Child Photo */}
                <div
                  className="absolute inset-0 h-full overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={ASSETS.realChildPhoto}
                    alt="Real child photo uploaded by parent"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-center max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  {/* Subtle label */}
                  <div className="absolute bottom-3 left-3 bg-amber-500 text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                    Original Photo
                  </div>
                </div>

                {/* Vertical Divider Line with handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none"
                  style={{ left: `calc(${sliderPos}% - 2px)` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-amber-500 shadow-md flex items-center justify-center text-slate-700">
                    <span className="text-[10px] font-bold select-none">↔</span>
                  </div>
                </div>
              </div>

              {/* Slider quick preset buttons */}
              <div className="flex items-center justify-center gap-3 pt-3 text-xs">
                <button
                  type="button"
                  onClick={() => setSliderPos(20)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${sliderPos < 35 ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                >
                  See Real Photo (80%)
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPos(50)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${sliderPos >= 35 && sliderPos <= 65 ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                >
                  Split View (50/50)
                </button>
                <button
                  type="button"
                  onClick={() => setSliderPos(80)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${sliderPos > 65 ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-500 hover:text-stone-900'}`}
                >
                  See Illustrated Book (80%)
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
