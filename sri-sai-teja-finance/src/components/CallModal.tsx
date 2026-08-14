import React, { useState } from 'react';
import { Phone, PhoneCall, X, Clock, CheckCircle2, User, Sparkles } from 'lucide-react';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [callbackName, setCallbackName] = useState('');
  const [callbackPhone, setCallbackPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleRequestCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      // auto close or reset
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-5 animate-fadeIn relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Contact Finance Desk</h3>
            <p className="text-xs text-slate-500">Sri Sai Teja Finance Advisors</p>
          </div>
        </div>

        {/* Direct Call numbers */}
        <div className="space-y-2.5">
          <a
            href="tel:+919876543210"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4" />
              <span>Call +91 98765 43210</span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-medium">Main</span>
          </a>

          <a
            href="tel:+918008812345"
            className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold text-sm transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call +91 80088 12345</span>
            </div>
            <span className="text-xs text-slate-500 font-medium">Toll-Free</span>
          </a>
        </div>

        {/* Request Instant Call Back */}
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Or Request an Instant Call Back
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-center space-y-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold">Callback Scheduled!</div>
              <div className="text-xs text-emerald-700">
                Our loan advisor will call you within 15 minutes.
              </div>
            </div>
          ) : (
            <form onSubmit={handleRequestCallback} className="space-y-2.5">
              <input
                type="text"
                value={callbackName}
                onChange={(e) => setCallbackName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none text-slate-900"
              />
              <input
                type="tel"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                placeholder="Your 10-digit Phone Number"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none text-slate-900"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Request 15-Min Call Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
