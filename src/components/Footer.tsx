import React from 'react';
import { Heart, Mail, Phone, MapPin, ShieldCheck, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-stone-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold text-lg shadow-xs">
                S
              </span>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                StoryKid
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Crafting premium personalized children's storybooks where every child is the hero of their own illustrated world.
            </p>
            <div className="text-xs text-stone-400 flex items-center gap-1.5 pt-1">
              <span>Made with love for happy families</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-3 tracking-wide">
              Adventures
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#customizer" className="hover:text-amber-400 transition-colors">The Little Doctor</a></li>
              <li><a href="#customizer" className="hover:text-amber-400 transition-colors">Cosmic Space Voyager</a></li>
              <li><a href="#customizer" className="hover:text-amber-400 transition-colors">Whispering Forest Guardian</a></li>
              <li><a href="#special-offer" className="hover:text-amber-400 transition-colors">Double Hero Combo (2 Books)</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-3 tracking-wide">
              Customer Support
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How Likeness Matching Works</a></li>
              <li><a href="#special-offer" className="hover:text-amber-400 transition-colors">Paiement à la livraison (COD)</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Verified Parent Reviews</a></li>
              <li><a href="#interactive-preview" className="hover:text-amber-400 transition-colors">Digital Sample Proofing</a></li>
            </ul>
          </div>

          {/* Contact & WhatsApp */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-3 tracking-wide">
              Direct Contact & Delivery
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>WhatsApp: +212 661-884920</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@storykid.ma</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Casablanca & Rabat Studio, Morocco</span>
              </li>
              <li className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Express courier across all 12 regions</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} StoryKid Morocco. All rights reserved.</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Satisfaction Guarantee</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
