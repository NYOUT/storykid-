import React from 'react';
import { ShoppingBag, Sparkles, BookOpen } from 'lucide-react';
import { Currency } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onCustomizeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  currency,
  onCurrencyChange,
  onCustomizeClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF7]/90 backdrop-blur-md border-b border-stone-200">
      {/* Top micro-notification bar with free delivery notice */}
      <div className="bg-[#1e293b] text-stone-200 text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
        <span>Special Offer: Order 2-Book Combo (400 DH) & Enjoy FREE Express Home Delivery!</span>
        <div className="hidden sm:inline-flex items-center gap-1.5 ml-3 border-l border-stone-600 pl-3">
          <span className="text-stone-400">Currency:</span>
          <button
            onClick={() => onCurrencyChange('DH')}
            className={`px-1 rounded text-xs transition-colors ${currency === 'DH' ? 'bg-amber-400 text-slate-900 font-semibold' : 'text-stone-300 hover:text-white'}`}
          >
            DH
          </button>
          <button
            onClick={() => onCurrencyChange('EUR')}
            className={`px-1 rounded text-xs transition-colors ${currency === 'EUR' ? 'bg-amber-400 text-slate-900 font-semibold' : 'text-stone-300 hover:text-white'}`}
          >
            €
          </button>
          <button
            onClick={() => onCurrencyChange('USD')}
            className={`px-1 rounded text-xs transition-colors ${currency === 'USD' ? 'bg-amber-400 text-slate-900 font-semibold' : 'text-stone-300 hover:text-white'}`}
          >
            $
          </button>
        </div>
      </div>

      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark in display face */}
        <a href="#" className="font-display text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-900 flex items-center justify-center font-extrabold text-lg shadow-sm">
            S
          </span>
          <span>StoryKid</span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#how-it-works" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
            How It Works
          </a>
          <a href="#interactive-preview" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
            Flip Through Book
          </a>
          <a href="#special-offer" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
            Special Offer
          </a>
          <a href="#character-craft" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
            Likeness Craft
          </a>
          <a href="#reviews" className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0">
            Parent Stories
          </a>
        </nav>

        {/* Zone 3: 1 primary action + Cart affordance */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-lg text-stone-700 hover:text-slate-900 hover:bg-stone-100 transition-colors"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onCustomizeClick}
            className="px-4 py-2 text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-900" />
            <span>Create Your Book</span>
          </button>
        </div>
      </div>
    </header>
  );
};
