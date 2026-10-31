import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize2, Minimize2, Sparkles, BookOpen } from 'lucide-react';
import { SAMPLE_PAGES, THEMES } from '../data/mockData';

export const InteractiveBookReader: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('little-doctor');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentPage = SAMPLE_PAGES[currentPageIndex];
  const totalPages = SAMPLE_PAGES.length;

  const handleNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  const toggleAudio = () => {
    setIsPlayingAudio((prev) => !prev);
  };

  return (
    <section id="interactive-preview" className="py-16 lg:py-24 bg-[#FCFAF7] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Storybook Reader</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            Flip Through Nyout’s Doctor Adventure
          </h2>
          <p className="mt-4 text-base text-stone-600">
            See how the personalized story unfolds from the dedication page to heartfelt hospital check-ups, friendly dinosaurs, and bravery awards.
          </p>

          {/* Theme switcher tabs */}
          <div className="mt-6 inline-flex p-1 bg-stone-200/80 rounded-xl">
            <button
              onClick={() => {
                setSelectedThemeId('little-doctor');
                setCurrentPageIndex(0);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                selectedThemeId === 'little-doctor'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-stone-600 hover:text-slate-900'
              }`}
            >
              The Little Doctor (Ages 3-9)
            </button>
            <button
              onClick={() => {
                setSelectedThemeId('cosmic-space');
                setCurrentPageIndex(4); // Jump to cosmic space page
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                selectedThemeId === 'cosmic-space'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-stone-600 hover:text-slate-900'
              }`}
            >
              Cosmic Space Voyager
            </button>
          </div>
        </div>

        {/* Reader Book Container */}
        <div className={`relative max-w-5xl mx-auto transition-all ${isFullscreen ? 'fixed inset-0 z-50 bg-stone-900/95 flex flex-col justify-center p-4' : ''}`}>
          
          {/* Reader Top Controls Toolbar */}
          <div className="bg-white/95 backdrop-blur-xs border border-stone-200 rounded-t-2xl px-4 py-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-sm text-slate-900">
                Nyout The Little Doctor
              </span>
              <span className="hidden sm:inline text-xs text-stone-400">|</span>
              <span className="text-xs text-stone-500 hidden sm:inline">
                Hardcover 250gsm Keepsake Edition
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Narration Audio Button */}
              <button
                onClick={toggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isPlayingAudio
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-700" />
                    <span>Story Narration: Playing</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                    <span>Read Aloud</span>
                  </>
                )}
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 text-stone-600 hover:text-slate-900 rounded-lg hover:bg-stone-100 transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Book Canvas Spread */}
          <div className="bg-[#FAF7F2] border-x border-b border-stone-200 rounded-b-2xl shadow-2xl p-4 sm:p-8 min-h-[460px] flex flex-col justify-between relative overflow-hidden">
            
            {/* Audio narrator subtle wave if playing */}
            {isPlayingAudio && (
              <div className="mb-4 bg-amber-50 border border-amber-200/80 text-amber-900 px-4 py-2 rounded-xl text-xs flex items-center justify-between">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  "Dr. Nyout grabbed his magical stethoscope and checked on his best patient..."
                </span>
                <span className="text-[11px] text-amber-700">Narrator: Warm Bedtime Voice</span>
              </div>
            )}

            {/* Two-page book spread representation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center flex-1">
              
              {/* Left Side: Artwork illustration */}
              <div className="md:col-span-7 bg-white p-3 rounded-xl shadow-md border border-stone-200/80 relative overflow-hidden flex items-center justify-center">
                <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-stone-100">
                  <img
                    src={currentPage.image}
                    alt={currentPage.heading}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    Page {currentPage.pageNumber} of {totalPages}
                  </div>
                </div>
              </div>

              {/* Right Side: Editorial Story text & dedication */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-4 py-2">
                <div>
                  <div className="text-xs uppercase tracking-wider font-bold text-amber-700">
                    {currentPage.title}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {currentPage.heading}
                  </h3>
                  <div className="text-xs text-stone-500 font-medium mt-0.5">
                    {currentPage.subheading}
                  </div>

                  <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed font-sans font-normal italic bg-white/70 p-4 rounded-xl border border-stone-200/60 shadow-xs">
                    {currentPage.content}
                  </p>
                </div>

                {/* Footnote / Likeness note */}
                <div className="text-xs text-stone-500 pt-3 border-t border-stone-200 flex items-center justify-between">
                  <span>Protagonist: <strong>Nyout (Age 8)</strong></span>
                  <span className="text-amber-700 font-medium">100% Unique To Your Child</span>
                </div>
              </div>

            </div>

            {/* Bottom Book Navigation Controls */}
            <div className="mt-8 pt-4 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Page</span>
              </button>

              {/* Page indicator dots */}
              <div className="flex items-center gap-1.5">
                {SAMPLE_PAGES.map((p, idx) => (
                  <button
                    key={p.pageNumber}
                    onClick={() => setCurrentPageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentPageIndex === idx
                        ? 'w-7 bg-amber-500'
                        : 'bg-stone-300 hover:bg-stone-400'
                    }`}
                    title={`Go to page ${p.pageNumber}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === totalPages - 1}
                className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
              >
                <span>Next Page</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
