import React from 'react';
import { Sparkles, Palette, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';
import { ASSETS } from '../data/mockData';

export const CharacterConsistencyShowcase: React.FC = () => {
  return (
    <section id="character-craft" className="py-16 lg:py-24 bg-[#FCFAF7] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Artisanal Precision</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            The Magic of Consistent Character Design
          </h2>
          <p className="mt-3 text-base text-stone-600">
            We don't simply drop a cutout head on a template. Our illustration system generates a full character model sheet for your child, preserving their genuine expressions and hairstyle across every page.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: High-resolution Character Sheet Asset */}
          <div className="lg:col-span-7 bg-white p-3 sm:p-5 rounded-2xl border border-stone-200 shadow-md">
            <div className="rounded-xl overflow-hidden bg-stone-50 border border-stone-100 relative">
              <img
                src={ASSETS.characterSheetDoctor}
                alt="StoryKid Character Design Sheet - Consistent Character Features"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-3 right-3 bg-slate-900/85 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg shadow-xs font-medium">
                Actual Character Sheet for "Nyout"
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-stone-500 px-1">
              <span>Face recognition & trait extraction</span>
              <span className="text-amber-700 font-semibold">100% Guaranteed Resemblance</span>
            </div>
          </div>

          {/* Right: Craft Explanations */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">
                    Natural Expressions & Eye Sparkle
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Whether smiling, examining a patient, or peering into outer space, your child's distinct cheekbones, eye color, and smile are lovingly maintained.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">
                    Custom Outfits & Favorite Clothes
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Notice how Nyout's real-life favorite patterned pajamas and shoes were incorporated into his bedside check-up scenes alongside his official doctor scrubs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-base">
                    Digital Proof Approval Guarantee
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Before we print a single page, we send you a digital preview via WhatsApp or email. If you want any touch-ups, our artists revise it for free.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
