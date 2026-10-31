import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Truck, ArrowRight, Sparkles } from 'lucide-react';
import { CustomBookOrder, Currency } from '../types';
import { THEMES, PACKAGES } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CustomBookOrder[];
  currency: Currency;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const totalDH = cartItems.reduce((acc, item) => acc + item.priceDH * item.quantity, 0);
  const totalUSD = cartItems.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  const totalEUR = cartItems.reduce((acc, item) => acc + item.priceEUR * item.quantity, 0);

  // Free delivery threshold: Combo or totalDH >= 350 DH
  const hasCombo = cartItems.some((item) => item.packageId === 'combo');
  const isFreeDelivery = hasCombo || totalDH >= 350 || cartItems.length === 0;
  
  const deliveryFeeDH = isFreeDelivery ? 0 : 35;
  const deliveryFeeUSD = isFreeDelivery ? 0 : 4;
  const deliveryFeeEUR = isFreeDelivery ? 0 : 3.5;

  const finalTotalDH = totalDH + deliveryFeeDH;
  const finalTotalUSD = totalUSD + deliveryFeeUSD;
  const finalTotalEUR = totalEUR + deliveryFeeEUR;

  const formatPrice = (dh: number, usd: number, eur: number) => {
    if (currency === 'EUR') return `${eur} €`;
    if (currency === 'USD') return `$${usd}`;
    return `${dh} DH`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer content */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <h2 className="font-display text-lg font-bold text-slate-900">
                Your Storybook Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-slate-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery perk notice */}
          <div className="bg-amber-50 px-6 py-2.5 border-b border-amber-200/80 flex items-center gap-2 text-xs text-amber-900 font-medium">
            <Truck className="w-4 h-4 text-amber-700 shrink-0" />
            {isFreeDelivery ? (
              <span>Your order qualifies for <strong>FREE Express Home Delivery!</strong></span>
            ) : (
              <span>Add a Combo or reach 350 DH for <strong>FREE Delivery</strong></span>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-slate-800 text-base">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Start by personalizing a book with your child's photo and name.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-400 text-slate-900 hover:bg-amber-300 transition-colors"
                >
                  Create a Book Now
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const theme = THEMES.find((t) => t.id === item.themeId) || THEMES[0];
                const pkg = PACKAGES.find((p) => p.id === item.packageId) || PACKAGES[0];

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex gap-4 relative"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-stone-100 shadow-xs relative">
                      <img
                        src={item.photoUrl}
                        alt={item.childName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[8px] text-white text-center py-0.5 truncate px-0.5 font-bold">
                        {item.childName}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-display font-bold text-sm text-slate-900">
                            {item.childName}'s {theme.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {pkg.pages} Pages · {item.coverType === 'hardcover' ? 'Keepsake Hardcover' : 'Softcover'}
                        </p>
                        {item.secondThemeId && (
                          <p className="text-[11px] text-amber-800 font-medium">
                            + 2nd Book: Cosmic Space Voyager
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-200/60">
                        {/* Quantity adjuster */}
                        <div className="flex items-center gap-1.5 border border-stone-300 rounded-lg bg-white px-2 py-0.5 text-xs font-semibold">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-stone-500 hover:text-slate-900"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-4 text-center tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-stone-500 hover:text-slate-900"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="font-display font-bold text-sm text-slate-900 tabular-nums">
                          {formatPrice(item.priceDH * item.quantity, item.priceUSD * item.quantity, item.priceEUR * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/80 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {formatPrice(totalDH, totalUSD, totalEUR)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Home Delivery:</span>
                  <span className="font-semibold tabular-nums">
                    {isFreeDelivery ? (
                      <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                    ) : (
                      formatPrice(deliveryFeeDH, deliveryFeeUSD, deliveryFeeEUR)
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-slate-900">
                  <span>Total Due:</span>
                  <span className="font-display text-lg font-black text-amber-700 tabular-nums">
                    {formatPrice(finalTotalDH, finalTotalUSD, finalTotalEUR)}
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenCheckout}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <span>Proceed to Order (COD & Card)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-600 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Paiement à la livraison (Cash on Delivery) available</span>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
