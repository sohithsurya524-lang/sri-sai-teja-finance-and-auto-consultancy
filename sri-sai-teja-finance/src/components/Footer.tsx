import React, { useState } from 'react';
import { ShieldCheck, Phone, MapPin, Mail, X } from 'lucide-react';

interface FooterProps {
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCall, onOpenWhatsApp }) => {
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

  const openInfo = (title: string, body: string) => {
    setModalContent({ title, body });
  };

  return (
    <footer id="app-footer" className="mt-12 pt-8 pb-20 sm:pb-12 border-t border-slate-200/80 text-slate-600">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Sri Sai Teja Finance
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed max-w-md">
            © 2024 Sri Sai Teja Finance & Auto Consultancy. All Rights Reserved.
          </p>
        </div>

        {/* Links matching screenshots */}
        <div className="flex flex-col space-y-2.5 text-sm font-semibold text-slate-700">
          <button
            id="link-privacy-policy"
            onClick={() =>
              openInfo(
                'Privacy Policy',
                'Sri Sai Teja Finance is committed to protecting your personal information. We utilize high-grade encryption and partner only with RBI-regulated banks and NBFCs. Your contact and financial details are never shared with unauthorized third parties.'
              )
            }
            className="text-left hover:text-blue-600 transition-colors w-fit"
          >
            Privacy Policy
          </button>

          <button
            id="link-terms-of-service"
            onClick={() =>
              openInfo(
                'Terms of Service',
                'Loan approval and interest rates are determined based on individual borrower credit profile, income verification, and chosen lender criteria. Pre-approvals are indicative subject to final documentation.'
              )
            }
            className="text-left hover:text-blue-600 transition-colors w-fit"
          >
            Terms of Service
          </button>

          <button
            id="link-loan-eligibility"
            onClick={() =>
              openInfo(
                'Loan Eligibility Criteria',
                '1. Age: 18 - 65 years\n2. Employment: Salaried or Self-Employed\n3. Minimum Monthly Income: ₹12,000\n4. KYC: PAN Card, Aadhaar Card, and Bank Account with active UPI/Netbanking for e-mandate.'
              )
            }
            className="text-left hover:text-blue-600 transition-colors w-fit"
          >
            Loan Eligibility
          </button>

          <button
            id="link-contact-us"
            onClick={() =>
              openInfo(
                'Contact Information',
                'Sri Sai Teja Finance & Auto Consultancy\nMain Office: Road No. 12, Banjara Hills, Hyderabad, Telangana - 500034\nCustomer Support: +91 98765 43210 / +91 80088 12345\nEmail: support@srisaitejafinance.com\nTimings: 9:30 AM - 8:30 PM (All days)'
              )
            }
            className="text-left hover:text-blue-600 transition-colors w-fit"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Quick Modal for Legal / Info links */}
      {modalContent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">{modalContent.title}</h3>
              <button
                onClick={() => setModalContent(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
              {modalContent.body}
            </div>
            <div className="pt-2">
              <button
                onClick={() => setModalContent(null)}
                className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
