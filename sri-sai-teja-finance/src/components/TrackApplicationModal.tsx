import React, { useState } from 'react';
import { Search, X, CheckCircle2, Clock, FileCheck2, ArrowRight } from 'lucide-react';
import { ApplicationRecord } from '../types';
import { formatINR } from '../utils/calculator';

interface TrackApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: ApplicationRecord[];
  onOpenWhatsApp: (message: string) => void;
}

export const TrackApplicationModal: React.FC<TrackApplicationModalProps> = ({
  isOpen,
  onClose,
  applications,
  onOpenWhatsApp,
}) => {
  const [query, setQuery] = useState('');
  const [foundApp, setFoundApp] = useState<ApplicationRecord | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cleaned = query.trim().toLowerCase();
    if (!cleaned) {
      setFoundApp(null);
      return;
    }
    const match = applications.find(
      (app) =>
        app.id.toLowerCase().includes(cleaned) ||
        app.phone.replace(/\D/g, '').includes(cleaned.replace(/\D/g, '')) ||
        app.applicantName.toLowerCase().includes(cleaned)
    );
    setFoundApp(match || null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5 animate-fadeIn relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Track Loan Status</h3>
            <p className="text-xs text-slate-500">Enter Application ID or Mobile Number</p>
          </div>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. SSTF-102938 or 9876543210"
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-100 outline-none text-slate-900 text-sm"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-xs transition-colors"
          >
            Track
          </button>
        </form>

        {/* Result Area */}
        {searched && (
          <div className="pt-2">
            {foundApp ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-md">
                    {foundApp.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {foundApp.status}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900">
                  {foundApp.applicantName} — {foundApp.vehicleModel}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                  <div>
                    Sanction Amount: <strong className="text-slate-900">{formatINR(foundApp.loanAmount)}</strong>
                  </div>
                  <div>
                    Monthly EMI: <strong className="text-slate-900">{formatINR(foundApp.estimatedEmi)}/mo</strong>
                  </div>
                  <div>
                    Tenure: <strong>{foundApp.tenure} Months</strong>
                  </div>
                  <div>
                    Date: <strong>{foundApp.date}</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenWhatsApp(
                      `Hello Sri Sai Teja Finance, I am checking the status of my loan application ${foundApp.id} for ${foundApp.vehicleModel}.`
                    );
                  }}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                >
                  <span>Connect with Loan Officer on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-center space-y-1">
                <p className="text-sm font-bold text-amber-900">No Application Found</p>
                <p className="text-xs text-amber-700">
                  Please verify your Application ID or registered mobile number, or submit a new loan application.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Existing applications list if any */}
        {!searched && applications.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recent Submissions in this Session
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {applications.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    setQuery(app.id);
                    setFoundApp(app);
                    setSearched(true);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-blue-700">{app.id}</div>
                    <div className="text-sm font-semibold text-slate-800">{app.applicantName} ({app.vehicleModel})</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {app.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
