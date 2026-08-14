import React from 'react';
import { Phone, MessageSquare, FileCheck2, Calculator, Bike } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavBarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCall,
  onOpenWhatsApp,
}) => {
  return (
    <nav
      id="bottom-app-navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg"
    >
      <div className="max-w-md mx-auto px-6 py-2 flex items-center justify-around">
        {/* Item 1: Call matching screenshots */}
        <button
          id="bottom-nav-call"
          type="button"
          onClick={onOpenCall}
          className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-blue-600 active:scale-95 transition-all py-1 px-3"
        >
          <Phone className="w-5 h-5 text-slate-700" />
          <span className="text-xs font-semibold">Call</span>
        </button>

        {/* Item 2: WhatsApp matching screenshots */}
        <button
          id="bottom-nav-whatsapp"
          type="button"
          onClick={onOpenWhatsApp}
          className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-emerald-600 active:scale-95 transition-all py-1 px-3"
        >
          <MessageSquare className="w-5 h-5 text-slate-700" />
          <span className="text-xs font-semibold">WhatsApp</span>
        </button>

        {/* Item 3: Apply matching screenshots (highlighted pill with peach/orange bg when selected or active) */}
        <button
          id="bottom-nav-apply"
          type="button"
          onClick={() => setActiveTab('apply')}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-6 rounded-full transition-all ${
            activeTab === 'apply'
              ? 'bg-[#ffe4c4]/90 text-amber-950 font-bold shadow-xs'
              : 'hover:bg-slate-100 text-slate-700'
          }`}
        >
          <FileCheck2 className={`w-5 h-5 ${activeTab === 'apply' ? 'text-amber-900' : 'text-slate-700'}`} />
          <span className="text-xs font-bold">Apply</span>
        </button>
      </div>
    </nav>
  );
};
