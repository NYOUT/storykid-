import React from 'react';
import { Check, Sparkles, Truck, Gift, ArrowRight } from 'lucide-react';
import { BookPackage, Currency } from '../types';
import { PACKAGES, ASSETS } from '../data/mockData';

interface SpecialOfferSectionProps {
  currency: Currency;
  onSelectPackage: (pkg: BookPackage) => void;
}

export const SpecialOfferSection: React.FC<SpecialOfferSectionProps> = ({
  currency,
  onSelectPackage,
}) => {
  const formatPrice = (pkg: BookPackage) => {
    if (currency === 'EUR') return `${pkg.priceEUR} €`;
    if (currency === 'USD') return `$${pkg.priceUSD}`;
    return `${pkg.priceDH} DH`;
  };

  return (
    <section id="special-offer" className="py-16 lg:py-24 bg-stone-100/70 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Limited Time Family Launch Offer</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Simple, Transparent Storybook Packages
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600">
            Every edition features custom illustration matching your child’s face, personal dedication, and premium archival print quality.
          </p>
        </div>

        {/* Highlight Banner matching the user's promo flyer */}
        <div className="mb-12 bg-linear-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 p-4 sm:p-6 rounded-2xl shadow-lg border border-amber-300 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-amber-950">
                Official Special Offer
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight">
                7 Pages 220 DH <span className="text-amber-900 font-normal">|</span> 14 Pages 300 DH <span className="text-amber-900 font-normal">|</span> Combo 2 Books 400 DH + Free Delivery
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 text-xs font-bold bg-white/90 text-slate-900 px-3 py-2 rounded-lg shadow-xs">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Fast Door-to-Door Delivery</span>
            </div>
          </div>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            const isCombo = pkg.id === 'combo';
            const isComplete = pkg.id === 'complete';

            return (
              <div
                key={pkg.id}
                className={`relative bg-white rounded-2xl flex flex-col transition-all duration-200 border ${
                  isCombo
                    ? 'border-amber-400 shadow-xl ring-2 ring-amber-400/40'
                    : isComplete
                    ? 'border-slate-300 shadow-md hover:shadow-lg'
                    : 'border-stone-200 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Visual Ribbon if Best Value or Popular */}
                {pkg.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-xs whitespace-nowrap ${
                      isCombo
                        ? 'bg-amber-400 text-slate-900'
                        : isComplete
                        ? 'bg-slate-900 text-white'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {pkg.badge}
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Package Name */}
                    <h3 className="font-display text-xl font-bold text-slate-900">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {pkg.pages} custom illustrated pages
                    </p>

                    {/* Price with tabular numerals */}
                    <div className="mt-5 mb-6 flex items-baseline gap-2">
                      <span className="font-display text-4xl font-extrabold text-slate-900 tabular-nums">
                        {formatPrice(pkg)}
                      </span>
                      {isCombo && (
                        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                          Save 200 DH + Free Shipping
                        </span>
                      )}
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-3 pt-4 border-t border-stone-100 text-sm text-stone-600">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isCombo ? 'text-amber-600' : 'text-emerald-600'}`} />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => onSelectPackage(pkg)}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        isCombo
                          ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md hover:shadow-lg'
                          : isComplete
                          ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-slate-800'
                      }`}
                    >
                      <span>Choose {pkg.name.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-center text-stone-600 mt-2">
                      Cash on Delivery & Card supported
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promotional Flyer Visual Peek */}
        <div className="mt-14 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-8 shadow-sm">
          <div className="w-full lg:w-1/3 shrink-0 rounded-xl overflow-hidden shadow-md border border-stone-100 bg-stone-50">
            <img
              src={ASSETS.flyerSpecialOffer}
              alt="StoryKid Official Special Offer Poster"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover max-h-[320px]"
            />
          </div>
          <div className="space-y-4">
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
              Why Parents Love Our Double Hero Combo
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              The Perfect Sibling Gift or Two-Part Epic Journey
            </h3>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              With our 400 DH Combo offer, you can choose two completely different adventure storylines for your child (e.g., Doctor by day, Cosmic Explorer by night!), or create two unique books for brothers and sisters. Each child receives their own personalized storybook with their unique portrait and dedication.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-stone-600 pt-2">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Mix & match any 2 themes
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Includes gift wrapping
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                Free courier delivery straight to home
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
