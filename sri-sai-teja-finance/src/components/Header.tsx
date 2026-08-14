import React from 'react';
import { Menu, PhoneCall, Calculator, Sparkles, Bike, HelpCircle, FileCheck2 } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenMenu: () => void;
  onOpenCall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenMenu,
  onOpenCall,
}) => {
  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-2xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Left hamburger + Logo */}
        <div className="flex items-center gap-3">
          <button
            id="btn-open-sidebar-menu"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="p-1.5 -ml-1.5 text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-slate-800" />
          </button>
          <button
            id="btn-logo-home"
            onClick={() => setActiveTab('rides')}
            className="text-left flex flex-col"
          >
            <span className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
              Sri Sai Teja Finance
            </span>
          </button>
        </div>

        {/* Right Action: Call Now pill */}
        <button
          id="btn-call-now-header"
          onClick={onOpenCall}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 active:bg-blue-100 transition-colors shadow-xs"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Call Now</span>
        </button>
      </div>

      {/* Quick Navigation Pills for easy screen switching across all 4 screens */}
      <div className="max-w-2xl mx-auto px-4 pb-2.5 pt-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          id="tab-btn-rides"
          onClick={() => setActiveTab('rides')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
            activeTab === 'rides'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Bike className="w-3.5 h-3.5" />
          <span>Choose Ride</span>
        </button>

        <button
          id="tab-btn-calculator"
          onClick={() => setActiveTab('calculator')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
            activeTab === 'calculator'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>EMI Calculator</span>
        </button>

        <button
          id="tab-btn-apply"
          onClick={() => setActiveTab('apply')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
            activeTab === 'apply'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Loan Application</span>
        </button>

        <button
          id="tab-btn-how-it-works"
          onClick={() => setActiveTab('how-it-works')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all ${
            activeTab === 'how-it-works'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>How It Works</span>
        </button>
      </div>
    </header>
  );
};
