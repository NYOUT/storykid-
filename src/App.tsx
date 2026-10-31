/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialOfferSection } from './components/SpecialOfferSection';
import { InteractiveBookReader } from './components/InteractiveBookReader';
import { CustomizerSection } from './components/CustomizerSection';
import { CharacterConsistencyShowcase } from './components/CharacterConsistencyShowcase';
import { HowItWorks } from './components/HowItWorks';
import { ReviewsSection } from './components/ReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Currency, CustomBookOrder, BookPackage } from './types';
import { PACKAGES, ASSETS } from './data/mockData';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('DH');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedPackage, setSelectedPackage] = useState<BookPackage>(PACKAGES[1]); // 14 Pages default

  // Initial cart with a sample custom book
  const [cartItems, setCartItems] = useState<CustomBookOrder[]>([
    {
      id: 'demo-sample-1',
      childName: 'Nyout',
      childAge: 8,
      gender: 'boy',
      themeId: 'little-doctor',
      packageId: 'complete',
      coverType: 'hardcover',
      dedication: 'To our brave, curious, and sweet child: may you always know that with kindness and imagination, you can accomplish anything!',
      photoUrl: ASSETS.realChildPhoto,
      priceDH: 300,
      priceUSD: 30,
      priceEUR: 28,
      quantity: 1,
    },
  ]);

  const handleAddToCart = (order: CustomBookOrder) => {
    setCartItems((prev) => {
      // Check if item with same childName and theme exists
      const existingIndex = prev.findIndex(
        (item) => item.childName === order.childName && item.themeId === order.themeId && item.packageId === order.packageId
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [order, ...prev];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CustomBookOrder[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackage = (pkg: BookPackage) => {
    setSelectedPackage(pkg);
    scrollToElement('customizer');
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF7] text-slate-900 selection:bg-amber-200">
      {/* 3-Zone Navigation Header */}
      <Navbar
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onCurrencyChange={setCurrency}
        onCustomizeClick={() => scrollToElement('customizer')}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Interactive Before/After Photo-to-Hero Slider */}
        <Hero
          onCustomizeClick={() => scrollToElement('customizer')}
          onPreviewClick={() => scrollToElement('interactive-preview')}
        />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Special Offer & Pricing Section (7 pages 220 DH | 14 pages 300 DH | Combo 2 books 400 DH) */}
        <SpecialOfferSection
          currency={currency}
          onSelectPackage={handleSelectPackage}
        />

        {/* Interactive Book Reader (Look inside Nyout The Little Doctor) */}
        <InteractiveBookReader />

        {/* Interactive Story Studio / Book Customizer with Live Cover Mockup */}
        <CustomizerSection
          currency={currency}
          onAddToCart={handleAddToCart}
          selectedPackage={selectedPackage}
        />

        {/* Likeness & Character Design Sheet Craft Showcase */}
        <CharacterConsistencyShowcase />

        {/* Verified Parent Reviews & Testimonials */}
        <ReviewsSection />
      </main>

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Express Checkout Modal with Cash on Delivery Support */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
