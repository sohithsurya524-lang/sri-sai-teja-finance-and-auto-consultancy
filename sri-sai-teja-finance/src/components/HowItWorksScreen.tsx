import React from 'react';
import { ArrowRight, ShieldCheck, Clock, FileCheck, Award, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { HOW_IT_WORKS_STEPS, LENDING_PARTNERS } from '../data';

interface HowItWorksScreenProps {
  onStartApplication: () => void;
  onExploreRides: () => void;
}

export const HowItWorksScreen: React.FC<HowItWorksScreenProps> = ({
  onStartApplication,
  onExploreRides,
}) => {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const faqs = [
    {
      q: 'What are the minimum documents required for a bike loan?',
      a: 'Basic KYC (Aadhaar Card and PAN Card), 3 months bank statements, and current address proof. For pre-approved customers, instant paperless approvals are available with just PAN and Aadhaar OTP.'
    },
    {
      q: 'How fast will my two-wheeler loan get approved?',
      a: 'In-principle digital pre-approval takes under 15 minutes. Final disbursement and showroom delivery authorization are completed within 2 to 4 hours on the same business day.'
    },
    {
      q: 'Can I get 100% on-road funding for my bike?',
      a: 'Yes! We offer up to 100% on-road financing for eligible salaried and self-employed customers through our tier-1 banking partners with zero or minimal initial down payment.'
    },
    {
      q: 'What is the maximum loan repayment tenure?',
      a: 'You can choose flexible repayment tenures from 6 months up to 60 months (5 years) depending on your comfort and monthly EMI preference.'
    }
  ];

  return (
    <div id="how-it-works-container" className="space-y-8 pb-6">
      {/* Title & Subtitle matching Screen 4 */}
      <div className="space-y-2.5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How It Works
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-xl">
          Getting your dream bike is simpler than you think. Follow these 4 easy steps to drive away with confidence.
        </p>
      </div>

      {/* 4 Connected Process Cards with Step circles matching Image 9 */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        {/* Vertical line connecting the step indicators */}
        <div className="absolute left-[19px] sm:left-[27px] top-6 bottom-6 w-0.5 bg-slate-200" />

        {HOW_IT_WORKS_STEPS.map((item) => (
          <div key={item.step} className="relative flex items-start group">
            {/* Step Circle Badge on the line */}
            <div className="absolute -left-6 sm:-left-8 top-5 w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center border-4 border-slate-50 shadow-xs z-10">
              {item.step}
            </div>

            {/* Step Card */}
            <div className="w-full ml-6 bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {item.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action CTA Banner */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-md">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold">
            Ready to get on the road?
          </h3>
          <p className="text-blue-100 text-sm sm:text-base">
            Check your pre-approved loan amount in less than 2 minutes with no impact on your credit score.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onStartApplication}
            className="px-6 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Start Loan Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreRides}
            className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all flex items-center justify-center"
          >
            Explore Bikes Catalog
          </button>
        </div>
      </div>

      {/* Lending Partners */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Our Trusted Banking & NBFC Partners</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          We work with India’s leading financial institutions to guarantee the lowest interest rates and highest loan amounts.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {LENDING_PARTNERS.map((partner, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/70 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-3.5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-2 font-semibold text-sm sm:text-base text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
