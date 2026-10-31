import React from 'react';
import { Camera, Sparkles, PackageCheck, Heart } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload Photo & Name',
      desc: 'Snap a quick photo with your phone and choose an adventure theme your child will fall in love with.',
      icon: Camera,
      tag: 'Takes 2 Minutes',
    },
    {
      number: '02',
      title: 'We Create Their Custom Art',
      desc: 'Our illustration artists and AI create a consistent character model sheet and full-color storybook pages.',
      icon: Sparkles,
      tag: 'Free Digital Proof',
    },
    {
      number: '03',
      title: 'Delivered in Luxury Box',
      desc: 'Printed on 250gsm archival paper with smudge-resistant satin coating. Wrapped like a gift with love.',
      icon: PackageCheck,
      tag: 'Door-to-Door Delivery',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>Simple 3-Step Journey</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
            How StoryKid Works
          </h2>
          <p className="mt-3 text-base text-stone-600">
            From your phone’s camera roll to a treasured bedtime storybook your child will keep for life.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-[#FCFAF7] rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-2xl font-black text-amber-500">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200/60 text-xs text-amber-800 font-semibold flex items-center gap-1.5">
                  <span>Step {step.number} of 03</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
