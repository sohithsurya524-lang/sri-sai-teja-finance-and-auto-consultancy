import React, { useState } from 'react';
import { 
  X, 
  Bike, 
  Calculator, 
  FileCheck2, 
  HelpCircle, 
  PhoneCall, 
  MessageSquare, 
  MapPin, 
  Search, 
  Building2, 
  Clock, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ActiveTab, ApplicationRecord } from '../types';
import { BRANCH_LOCATIONS, LENDING_PARTNERS } from '../data';

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCall: () => void;
  onOpenWhatsApp: () => void;
  onOpenTrack: () => void;
  recentApplications: ApplicationRecord[];
}

export const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  onOpenCall,
  onOpenWhatsApp,
  onOpenTrack,
  recentApplications,
}) => {
  const [showBranches, setShowBranches] = useState(false);

  if (!isOpen) return null;

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-in Panel */}
      <div className="absolute inset-y-0 left-0 max-w-xs sm:max-w-sm w-full bg-white shadow-2xl flex flex-col z-10 animate-slideRight">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Sri Sai Teja Finance</h2>
            <p className="text-xs text-slate-500 font-medium">& Auto Consultancy</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
          {/* Main Screens */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">
              Main Menu
            </div>

            <button
              onClick={() => handleNav('rides')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'rides'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bike className="w-4 h-4 text-blue-600" />
                <span>Choose Your Ride</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('calculator')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Interactive EMI Calculator</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('apply')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'apply'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>Apply for Bike Loan</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => handleNav('how-it-works')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'how-it-works'
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>How It Works</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Quick Tracking & Tools */}
          <div className="pt-3 space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">
              Customer Services
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenTrack();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-emerald-600" />
                <span>Track Application Status</span>
              </div>
              {recentApplications.length > 0 && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  {recentApplications.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowBranches(!showBranches)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Branch Locations</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${showBranches ? 'rotate-90' : ''}`} />
            </button>

            {showBranches && (
              <div className="p-3 bg-slate-50 rounded-2xl space-y-3 text-xs">
                {BRANCH_LOCATIONS.map((b, idx) => (
                  <div key={idx} className="space-y-1 pb-2 border-b border-slate-200/60 last:border-none">
                    <div className="font-bold text-slate-800 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                      <span>{b.city}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-tight pl-4">{b.address}</p>
                    <div className="text-blue-700 font-semibold pl-4">{b.phone}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Direct Hotlines */}
          <div className="pt-3 space-y-2">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 pb-1">
              Direct Contact
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenCall();
                }}
                className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 flex flex-col items-center gap-1.5 font-bold text-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>Call Center</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenWhatsApp();
                }}
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex flex-col items-center gap-1.5 font-bold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Help</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center space-y-1">
          <div className="text-xs font-bold text-slate-700">Toll-Free Support: 1800-425-8899</div>
          <div className="text-[11px] text-slate-500">Fast Approvals • Zero Hidden Fees</div>
        </div>
      </div>
    </div>
  );
};
