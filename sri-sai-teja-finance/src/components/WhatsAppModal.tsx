import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMessage?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  defaultMessage,
}) => {
  const [message, setMessage] = useState(
    defaultMessage ||
      'Hello Sri Sai Teja Finance team, I am interested in checking my two-wheeler loan eligibility and interest rates. Please assist.'
  );

  if (!isOpen) return null;

  const quickPrompts = [
    'What is the minimum down payment for Honda Activa / Splendor?',
    'I want to apply for a Sport Bike loan with lowest EMI.',
    'Can you check my PAN card eligibility for instant approval?',
    'What are the current interest rate offers?'
  ];

  const handleSend = () => {
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-sm sm:max-w-md w-full shadow-2xl space-y-5 animate-fadeIn relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Sri Sai Teja Finance</h3>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              WhatsApp Helpdesk Online
            </p>
          </div>
        </div>

        {/* Quick prompt suggestions */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Quick Topics
          </div>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setMessage(prompt)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-2.5 py-1 rounded-lg text-left transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Message Box */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Your Message</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question or bike model..."
            className="w-full p-3 text-sm rounded-2xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-100 outline-none text-slate-900 resize-none"
          />
        </div>

        {/* Send WhatsApp action */}
        <button
          onClick={handleSend}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Launch WhatsApp Chat</span>
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          Available 24/7. Instant responses during 9:00 AM - 9:00 PM IST.
        </p>
      </div>
    </div>
  );
};
