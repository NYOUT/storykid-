import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Check, Heart, RefreshCw, ShoppingBag, BookOpen } from 'lucide-react';
import { AdventureTheme, BookPackage, Currency, CustomBookOrder } from '../types';
import { THEMES, PACKAGES, DEDICATION_PRESETS, ASSETS } from '../data/mockData';

interface CustomizerSectionProps {
  currency: Currency;
  onAddToCart: (order: CustomBookOrder) => void;
  selectedPackage?: BookPackage;
}

export const CustomizerSection: React.FC<CustomizerSectionProps> = ({
  currency,
  onAddToCart,
  selectedPackage,
}) => {
  const [childName, setChildName] = useState<string>('Nyout');
  const [childAge, setChildAge] = useState<number>(8);
  const [gender, setGender] = useState<'boy' | 'girl' | 'neutral'>('boy');
  const [selectedThemeId, setSelectedThemeId] = useState<string>('little-doctor');
  const [secondThemeId, setSecondThemeId] = useState<string>('cosmic-space');
  const [packageId, setPackageId] = useState<'mini' | 'complete' | 'combo'>(
    selectedPackage?.id || 'complete'
  );
  const [coverType, setCoverType] = useState<'hardcover' | 'softcover'>('hardcover');
  const [dedication, setDedication] = useState<string>(
    'To our brave, curious, and sweet child: may you always know that with kindness and imagination, you can accomplish anything!'
  );
  const [photoUrl, setPhotoUrl] = useState<string>(ASSETS.realChildPhoto);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync package if parent prop updates
  React.useEffect(() => {
    if (selectedPackage) {
      setPackageId(selectedPackage.id);
    }
  }, [selectedPackage]);

  const activeTheme = THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];
  const activePackage = PACKAGES.find((p) => p.id === packageId) || PACKAGES[1];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyPreset = (preset: string) => {
    setDedication(preset.replace('[Child Name]', childName || 'Little Hero'));
  };

  const handleAddToCartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOrder: CustomBookOrder = {
      id: `order-${Date.now()}`,
      childName: childName.trim() || 'Little Hero',
      childAge,
      gender,
      themeId: selectedThemeId,
      secondThemeId: packageId === 'combo' ? secondThemeId : undefined,
      packageId,
      coverType,
      dedication,
      photoUrl,
      priceDH: activePackage.priceDH,
      priceUSD: activePackage.priceUSD,
      priceEUR: activePackage.priceEUR,
      quantity: 1,
    };

    onAddToCart(finalOrder);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 3000);
  };

  const formatPrice = (amountDH: number, amountUSD: number, amountEUR: number) => {
    if (currency === 'EUR') return `${amountEUR} €`;
    if (currency === 'USD') return `$${amountUSD}`;
    return `${amountDH} DH`;
  };

  return (
    <section id="customizer" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Story Studio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Create Your Child's Custom Storybook
          </h2>
          <p className="mt-3 text-base text-stone-600">
            Fill in their details below and watch their personalized book cover come alive instantly.
          </p>
        </div>

        {/* 2-Column Grid: Form Left, Real-time Book Mockup Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Customizer Controls */}
          <form onSubmit={handleAddToCartSubmit} className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Child Identity */}
            <div className="bg-stone-50/80 p-5 sm:p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 text-xs flex items-center justify-center font-bold">1</span>
                  Child Details
                </h3>
                <span className="text-xs text-stone-500">Printed on cover & in story</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Child's First Name
                  </label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="e.g. Nyout, Sofia, Leo"
                    required
                    maxLength={24}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Child's Age (Story vocabulary level)
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 font-medium"
                  >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((age) => (
                      <option key={age} value={age}>
                        {age} Years Old
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Photo Upload Box */}
              <div className="mt-5">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Child's Photo (Any clear front-facing smartphone photo works!)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border-2 border-dashed border-stone-300 bg-white hover:border-amber-400 transition-colors">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-xs relative">
                    <img
                      src={photoUrl}
                      alt="Child uploaded preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs text-stone-600">
                      Our artists recreate your child's sweet smile, hairstyle, and traits with 100% likeness guarantee.
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-slate-800 transition-colors flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5 text-stone-600" />
                        <span>Upload Your Photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPhotoUrl(ASSETS.realChildPhoto)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-500 hover:text-slate-800 transition-colors"
                      >
                        Use Demo Photo (Nyout)
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Choose Story Adventure */}
            <div className="bg-stone-50/80 p-5 sm:p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 text-xs flex items-center justify-center font-bold">2</span>
                  Choose Adventure Theme
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {THEMES.map((theme) => {
                  const isSelected = selectedThemeId === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => setSelectedThemeId(theme.id)}
                      className={`cursor-pointer rounded-xl p-3 border transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-white ring-2 ring-amber-400/40 shadow-sm'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="aspect-4/3 rounded-lg overflow-hidden mb-2 bg-stone-100">
                          <img
                            src={theme.coverImage}
                            alt={theme.title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-display font-bold text-xs text-slate-900">
                          {theme.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                          {theme.subtitle}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-semibold">
                        <span className="text-amber-800">{theme.recommendedAges}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-600" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* If combo is selected, choose second adventure */}
              {packageId === 'combo' && (
                <div className="mt-4 pt-4 border-t border-stone-200">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Select Second Book Theme (Included in your 2-Book Combo!)
                  </label>
                  <select
                    value={secondThemeId}
                    onChange={(e) => setSecondThemeId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 font-medium text-xs"
                  >
                    {THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} - {t.subtitle}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Step 3: Choose Package & Binding */}
            <div className="bg-stone-50/80 p-5 sm:p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 text-xs flex items-center justify-center font-bold">3</span>
                  Format & Pricing Tier
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PACKAGES.map((pkg) => {
                  const isSelected = packageId === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setPackageId(pkg.id)}
                      className={`cursor-pointer rounded-xl p-3 border transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-white ring-2 ring-amber-400/40 shadow-sm'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            {pkg.pages} Pages
                          </span>
                          {pkg.id === 'combo' && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                              FREE SHIP
                            </span>
                          )}
                        </div>
                        <div className="text-lg font-extrabold text-slate-900 mt-1 tabular-nums">
                          {formatPrice(pkg.priceDH, pkg.priceUSD, pkg.priceEUR)}
                        </div>
                        <p className="text-[11px] text-stone-500 mt-1">
                          {pkg.name}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="mt-2 text-right">
                          <Check className="w-4 h-4 text-amber-600 inline" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Personal Dedication */}
            <div className="bg-stone-50/80 p-5 sm:p-6 rounded-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 text-xs flex items-center justify-center font-bold">4</span>
                  Personal Dedication Note
                </h3>
                <span className="text-xs text-stone-500">Printed inside front page</span>
              </div>
              <p className="text-xs text-stone-500 mb-3">
                A personal message that turns this book into an emotional lifelong family keepsake.
              </p>

              <textarea
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                rows={3}
                maxLength={220}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-400 font-sans text-xs leading-relaxed"
              />

              {/* Quick inspiration chips */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-stone-500 font-medium">Quick ideas:</span>
                {DEDICATION_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="text-[11px] bg-white border border-stone-200 text-stone-700 hover:text-slate-900 hover:bg-stone-100 px-2 py-0.5 rounded-md transition-colors"
                  >
                    Preset #{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Submission CTA Button */}
            <div>
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl font-bold text-base sm:text-lg text-slate-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5 text-amber-950" />
                <span>
                  Add {childName ? `${childName}'s` : ''} Book to Bag · {formatPrice(activePackage.priceDH, activePackage.priceUSD, activePackage.priceEUR)}
                </span>
              </button>
              {isAddedSuccess && (
                <div className="mt-3 text-center text-sm font-semibold text-emerald-800 bg-emerald-50 py-2 rounded-lg border border-emerald-200 animate-fadeIn">
                  ✓ Added to your shopping bag! Open cart above to review or proceed to delivery.
                </div>
              )}
            </div>

          </form>

          {/* Right Column: Live Interactive Mockup of the Child's Book */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xl space-y-4">
              
              <div className="flex items-center justify-between text-xs font-semibold text-stone-600 border-b border-stone-200/80 pb-3">
                <span className="flex items-center gap-1.5 text-slate-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Live Cover Preview
                </span>
                <span className="text-amber-800">
                  {activePackage.pages} Pages · {packageId === 'combo' ? '2 Books Set' : 'Hardcover'}
                </span>
              </div>

              {/* Book 3D Mockup Container */}
              <div className="relative mx-auto max-w-[340px] aspect-3/4 rounded-r-2xl rounded-l-md overflow-hidden bg-white shadow-2xl border-l-8 border-stone-800 border-y border-r border-stone-300 transform transition-transform hover:rotate-1">
                
                {/* Book Cover Background Artwork */}
                <img
                  src={activeTheme.coverImage}
                  alt="Custom Book Cover Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                {/* Overlaid Title Banner with the Child's Name */}
                <div className="absolute top-4 inset-x-4 bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-stone-200/70 shadow-md text-center">
                  <div className="font-display text-2xl font-black tracking-tight text-sky-700 uppercase drop-shadow-xs">
                    {childName || 'NYOUT'}
                  </div>
                  <div className="font-display text-xs font-bold text-amber-700 uppercase tracking-wider">
                    {selectedThemeId === 'little-doctor' ? 'The Little Doctor' : activeTheme.title}
                  </div>
                  <div className="text-[10px] text-stone-500 italic mt-0.5">
                    {activeTheme.subtitle}
                  </div>
                </div>

                {/* Child Photo Thumbnail Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs p-1.5 rounded-xl border border-stone-300 shadow-md flex items-center gap-2">
                  <img
                    src={photoUrl}
                    alt="Child profile"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="pr-2 text-left">
                    <div className="text-[10px] font-bold text-slate-900 leading-tight">
                      Protagonist: {childName || 'Nyout'}
                    </div>
                    <div className="text-[9px] text-stone-500">
                      Age {childAge} · Starring Hero
                    </div>
                  </div>
                </div>

                {/* Age & Format Badge */}
                <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-1 rounded-md">
                  AGES {childAge - 1 > 2 ? childAge - 1 : 2}–{childAge + 2}
                </div>
              </div>

              {/* Dedication Preview Box */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  <span>Printed Dedication Page Preview:</span>
                </div>
                <p className="text-stone-600 italic line-clamp-3">
                  "{dedication}"
                </p>
              </div>

              {/* Summary of what you get */}
              <div className="text-xs text-stone-500 space-y-1.5 pt-2">
                <div className="flex items-center justify-between">
                  <span>Storyline:</span>
                  <span className="font-semibold text-slate-900">{activeTheme.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Binding:</span>
                  <span className="font-semibold text-slate-900">
                    {packageId === 'mini' ? 'Premium Softcover (250gsm)' : 'Keepsake Hardcover (Archival)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Price:</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatPrice(activePackage.priceDH, activePackage.priceUSD, activePackage.priceEUR)}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
