/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { RidesScreen } from './components/RidesScreen';
import { EmiCalculatorScreen } from './components/EmiCalculatorScreen';
import { LoanApplicationScreen } from './components/LoanApplicationScreen';
import { HowItWorksScreen } from './components/HowItWorksScreen';
import { Footer } from './components/Footer';
import { BottomNavBar } from './components/BottomNavBar';
import { SidebarDrawer } from './components/SidebarDrawer';
import { CallModal } from './components/CallModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { TrackApplicationModal } from './components/TrackApplicationModal';
import { ActiveTab, ApplicationFormData, ApplicationRecord, VehicleCategory } from './types';
import { MessageSquare } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('rides');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [whatsAppCustomMsg, setWhatsAppCustomMsg] = useState<string | undefined>(undefined);

  // Pre-filled state for loan application when navigated from Ride or Calculator
  const [loanFormData, setLoanFormData] = useState<Partial<ApplicationFormData>>({
    fullName: '',
    mobileNumber: '',
    email: '',
    occupation: 'Salaried',
    category: 'commuter',
    vehicleModel: 'Hero Splendor Plus',
    bikeCondition: 'New',
    vehiclePrice: 85000,
    downPayment: 10000,
    loanAmount: 75000,
    tenureMonths: 24,
    authorizedConsent: true,
  });

  // Calculator custom initial values
  const [calcInitialValues, setCalcInitialValues] = useState<{
    loanAmount: number;
    tenure: number;
  }>({
    loanAmount: 100000,
    tenure: 24,
  });

  // Recorded applications for tracking
  const [recentApplications, setRecentApplications] = useState<ApplicationRecord[]>([
    {
      id: 'SSTF-839201',
      date: '14 Aug 2026, 11:30 AM',
      applicantName: 'Ramesh Kumar',
      phone: '+91 98765 43210',
      vehicleModel: 'Hero Splendor Plus',
      loanAmount: 75000,
      tenure: 24,
      estimatedEmi: 3478,
      status: 'Pre-Approved',
      creditScoreEst: 768,
    },
  ]);

  // Navigate to Loan Application with selected ride category
  const handleSelectCategoryForLoan = (category: VehicleCategory) => {
    const defaultModel = category.popularModels[0] || 'Hero Splendor Plus';
    const estimatedPrice = category.id === 'commuter' ? 85000 : category.id === 'sport' ? 185000 : category.id === 'scooters' ? 88000 : 225000;
    const defaultDp = Math.round(estimatedPrice * 0.15);

    setLoanFormData((prev) => ({
      ...prev,
      category: category.id,
      vehicleModel: defaultModel,
      vehiclePrice: estimatedPrice,
      downPayment: defaultDp,
      loanAmount: estimatedPrice - defaultDp,
    }));

    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to EMI calculator with category price
  const handleSelectCategoryForEmi = (category: VehicleCategory) => {
    const estimatedPrice = category.id === 'commuter' ? 85000 : category.id === 'sport' ? 185000 : category.id === 'scooters' ? 88000 : 225000;
    setCalcInitialValues({
      loanAmount: Math.round(estimatedPrice * 0.85),
      tenure: 24,
    });
    setActiveTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // From EMI Calculator -> Apply with plan
  const handleApplyWithPlan = (loanAmount: number, tenureMonths: number, interestRate: number) => {
    setLoanFormData((prev) => ({
      ...prev,
      loanAmount,
      tenureMonths,
      vehiclePrice: Math.round(loanAmount * 1.15),
      downPayment: Math.round(loanAmount * 0.15),
    }));
    setActiveTab('apply');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // On successful application submit
  const handleApplicationComplete = (record: ApplicationRecord) => {
    setRecentApplications((prev) => [record, ...prev]);
  };

  const handleOpenWhatsAppWithMessage = (msg?: string) => {
    setWhatsAppCustomMsg(msg);
    setIsWhatsAppModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top App Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenCall={() => setIsCallModalOpen(true)}
      />

      {/* Main Content Area framed within standard mobile / responsive max width */}
      <main className="flex-1 w-full max-w-xl mx-auto px-4 py-5 sm:px-6">
        {activeTab === 'rides' && (
          <RidesScreen
            onSelectCategoryForLoan={handleSelectCategoryForLoan}
            onSelectCategoryForEmi={handleSelectCategoryForEmi}
          />
        )}

        {activeTab === 'calculator' && (
          <EmiCalculatorScreen
            initialLoanAmount={calcInitialValues.loanAmount}
            initialTenure={calcInitialValues.tenure}
            onApplyWithPlan={handleApplyWithPlan}
          />
        )}

        {activeTab === 'apply' && (
          <LoanApplicationScreen
            initialFormData={loanFormData}
            onApplicationComplete={handleApplicationComplete}
            onExploreRides={() => setActiveTab('rides')}
            onOpenWhatsApp={handleOpenWhatsAppWithMessage}
          />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksScreen
            onStartApplication={() => {
              setActiveTab('apply');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreRides={() => {
              setActiveTab('rides');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Global Footer matching screenshots */}
        <Footer
          onOpenCall={() => setIsCallModalOpen(true)}
          onOpenWhatsApp={() => handleOpenWhatsAppWithMessage()}
        />
      </main>

      {/* Floating WhatsApp Action Button in Bottom-Right matching screenshot Image 3 */}
      <button
        id="btn-floating-whatsapp"
        onClick={() => handleOpenWhatsAppWithMessage()}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-20 right-4 sm:right-6 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white shadow-xl flex items-center justify-center transition-all duration-300 group hover:shadow-emerald-500/30"
      >
        <MessageSquare className="w-6 h-6 fill-current text-white" />
        <span className="sr-only">WhatsApp Chat</span>
      </button>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCall={() => setIsCallModalOpen(true)}
        onOpenWhatsApp={() => handleOpenWhatsAppWithMessage()}
      />

      {/* Slide-out Navigation Drawer */}
      <SidebarDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCall={() => setIsCallModalOpen(true)}
        onOpenWhatsApp={() => handleOpenWhatsAppWithMessage()}
        onOpenTrack={() => setIsTrackModalOpen(true)}
        recentApplications={recentApplications}
      />

      {/* Interactive Modals */}
      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
      />

      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        defaultMessage={whatsAppCustomMsg}
      />

      <TrackApplicationModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        applications={recentApplications}
        onOpenWhatsApp={handleOpenWhatsAppWithMessage}
      />
    </div>
  );
}
