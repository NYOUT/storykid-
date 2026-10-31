import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Truck, Phone, MapPin, CreditCard, Sparkles, Download, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CustomBookOrder, Currency } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CustomBookOrder[];
  currency: Currency;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onOrderSuccess,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>('Casablanca');
  const [address, setAddress] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!isOpen) return null;

  const totalDH = cartItems.reduce((acc, item) => acc + item.priceDH * item.quantity, 0);
  const totalUSD = cartItems.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  const totalEUR = cartItems.reduce((acc, item) => acc + item.priceEUR * item.quantity, 0);

  const hasCombo = cartItems.some((item) => item.packageId === 'combo');
  const isFreeDelivery = hasCombo || totalDH >= 350;
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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `SK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.error('Confetti error', err);
      }
    }, 1200);
  };

  const handleFinishAndReset = () => {
    setOrderConfirmed(false);
    onOrderSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden relative">
        
        {/* Modal Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-stone-400 hover:text-slate-900 hover:bg-stone-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!orderConfirmed ? (
          <div>
            {/* Modal Header */}
            <div className="p-6 border-b border-stone-100 bg-[#FCFAF7]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Express Courier Checkout</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Complete Your Storybook Order
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Enter your delivery address. Our courier will contact you on WhatsApp before dispatch.
              </p>
            </div>

            {/* Order Form */}
            <form onSubmit={handlePlaceOrder} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Parent / Recipient Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Youssef Bennani"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>WhatsApp / Mobile Number</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="06 XX XX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>City</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Tangier">Tangier</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Fes">Fes</option>
                    <option value="Meknes">Meknes</option>
                    <option value="Oujda">Oujda</option>
                    <option value="Other / International">Other / International</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Delivery Address & Apartment / Villa details
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street address, building number, floor"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`cursor-pointer p-3 rounded-xl border transition-all flex flex-col justify-between ${
                      paymentMethod === 'cod'
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/30'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-bold text-slate-900">
                        Cash on Delivery
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">
                      Paiement à la livraison
                    </span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`cursor-pointer p-3 rounded-xl border transition-all flex flex-col justify-between ${
                      paymentMethod === 'card'
                        ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-400/30'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-slate-700" />
                      <span className="text-xs font-bold text-slate-900">
                        Credit / Debit Card
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 mt-1">
                      Visa / Mastercard / CMI
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary & Pricing Total */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span>Custom Books ({cartItems.reduce((a, b) => a + b.quantity, 0)}):</span>
                  <span className="font-semibold tabular-nums">{formatPrice(totalDH, totalUSD, totalEUR)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery to {city}:</span>
                  <span className="font-semibold tabular-nums text-emerald-700 font-bold">
                    {isFreeDelivery ? 'FREE' : formatPrice(deliveryFeeDH, deliveryFeeUSD, deliveryFeeEUR)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-slate-900">
                  <span>Total Due:</span>
                  <span className="font-display text-lg text-amber-700 tabular-nums">
                    {formatPrice(finalTotalDH, finalTotalUSD, finalTotalEUR)}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Your Order...</span>
                ) : (
                  <>
                    <span>Confirm Order · {formatPrice(finalTotalDH, finalTotalUSD, finalTotalEUR)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Satisfaction Guarantee · Digital Proof Sent Before Printing</span>
              </div>

            </form>
          </div>
        ) : (
          /* Order Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Congratulations! Order Confirmed
              </h2>
              <p className="text-xs text-stone-500">
                Order Reference: <strong className="font-mono text-slate-900 text-sm">{orderId}</strong>
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-xl border border-stone-200 text-left text-xs space-y-2">
              <div className="font-bold text-slate-900 text-sm pb-1 border-b border-stone-200 flex items-center justify-between">
                <span>Shipment Summary</span>
                <span className="text-emerald-700 font-semibold">Preparing Proof</span>
              </div>
              <div>
                <strong>Recipient:</strong> {fullName} ({phone})
              </div>
              <div>
                <strong>Delivery Address:</strong> {address}, {city}
              </div>
              <div>
                <strong>Payment:</strong> {paymentMethod === 'cod' ? 'Cash on Delivery upon courier arrival' : 'Card payment authorized'}
              </div>
              <div>
                <strong>Amount:</strong> {formatPrice(finalTotalDH, finalTotalUSD, finalTotalEUR)}
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                What happens next?
              </p>
              <p className="text-stone-600 text-[11px]">
                Our artist team will message your WhatsApp number within 24 hours with your child’s digital storybook proof. Once you approve it, we print and ship via express courier!
              </p>
            </div>

            <button
              onClick={handleFinishAndReset}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-xs"
            >
              Back to StoryKid Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
