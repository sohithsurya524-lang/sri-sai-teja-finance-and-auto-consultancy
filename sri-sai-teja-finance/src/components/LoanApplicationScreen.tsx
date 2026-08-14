import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, CheckCircle2, ShieldCheck, Upload, FileText, Sparkles, MessageSquare } from 'lucide-react';
import { ApplicationFormData, ApplicationRecord } from '../types';
import { POPULAR_MODELS_ALL, BRANCH_LOCATIONS } from '../data';
import { calculateEMI, formatINR, formatNumberOnly } from '../utils/calculator';

interface LoanApplicationScreenProps {
  initialFormData?: Partial<ApplicationFormData>;
  onApplicationComplete: (record: ApplicationRecord) => void;
  onExploreRides: () => void;
  onOpenWhatsApp: (message?: string) => void;
}

export const LoanApplicationScreen: React.FC<LoanApplicationScreenProps> = ({
  initialFormData,
  onApplicationComplete,
  onExploreRides,
  onOpenWhatsApp,
}) => {
  const [step, setStep] = useState<number>(1);
  const [submittedRecord, setSubmittedRecord] = useState<ApplicationRecord | null>(null);

  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: initialFormData?.fullName || '',
    mobileNumber: initialFormData?.mobileNumber || '',
    email: initialFormData?.email || '',
    occupation: initialFormData?.occupation || 'Salaried',
    monthlyIncome: initialFormData?.monthlyIncome || '35000',
    city: initialFormData?.city || 'Hyderabad',
    pincode: initialFormData?.pincode || '500034',
    authorizedConsent: initialFormData?.authorizedConsent ?? true,

    category: initialFormData?.category || 'commuter',
    vehicleModel: initialFormData?.vehicleModel || 'Hero Splendor Plus',
    bikeCondition: initialFormData?.bikeCondition || 'New',
    vehiclePrice: initialFormData?.vehiclePrice || 85000,
    downPayment: initialFormData?.downPayment || 10000,
    loanAmount: initialFormData?.loanAmount || 75000,
    tenureMonths: initialFormData?.tenureMonths || 24,

    panNumber: initialFormData?.panNumber || '',
    aadhaarNumber: initialFormData?.aadhaarNumber || '',
    idProofAttached: false,
    bankProofAttached: false,
    preferredBranch: 'Hyderabad Main Hub'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Real-time EMI calculation for Step 2
  const emiCalc = calculateEMI(formData.loanAmount, 10.5, formData.tenureMonths);

  // Model selection sync
  const handleModelChange = (modelName: string) => {
    const found = POPULAR_MODELS_ALL.find((m) => m.name === modelName);
    const price = found ? found.price : 85000;
    const cat = found ? found.category : 'commuter';
    const dp = Math.round(price * 0.15);
    const loan = price - dp;

    setFormData((prev) => ({
      ...prev,
      vehicleModel: modelName,
      category: cat,
      vehiclePrice: price,
      downPayment: dp,
      loanAmount: loan
    }));
  };

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter full name as per PAN';
    }
    if (!formData.mobileNumber.trim() || formData.mobileNumber.replace(/\D/g, '').length < 10) {
      errs.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.authorizedConsent) {
      errs.authorizedConsent = 'Please agree to terms and authorization';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (formData.loanAmount < 10000) {
      errs.loanAmount = 'Minimum loan amount is ₹10,000';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const appId = `SSTF-${Math.floor(100000 + Math.random() * 900000)}`;
    const creditScore = Math.floor(740 + Math.random() * 60);

    const record: ApplicationRecord = {
      id: appId,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      applicantName: formData.fullName || 'Applicant',
      phone: formData.mobileNumber,
      vehicleModel: formData.vehicleModel,
      loanAmount: formData.loanAmount,
      tenure: formData.tenureMonths,
      estimatedEmi: emiCalc.monthlyEmi,
      status: 'Pre-Approved',
      creditScoreEst: creditScore
    };

    setSubmittedRecord(record);
    onApplicationComplete(record);
  };

  if (submittedRecord) {
    const whatsappMsg = `Hello Sri Sai Teja Finance, I submitted loan application ${submittedRecord.id} for ${submittedRecord.vehicleModel} (Loan: ₹${submittedRecord.loanAmount.toLocaleString('en-IN')}). Please assist with fast disbursement.`;

    return (
      <div id="application-success-view" className="space-y-6 pb-6 animate-fadeIn">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md text-center space-y-5">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1.5">
            <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-full">
              INSTANT PRE-APPROVAL ACTIVE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Congratulations, {submittedRecord.applicantName}!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Your two-wheeler loan has been conditionally approved. A loan officer has been assigned to coordinate showroom delivery.
            </p>
          </div>

          {/* Reference Details Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-left space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-xs text-slate-500 font-medium">Application ID</span>
              <span className="text-sm font-extrabold text-blue-700 font-mono tracking-wider">{submittedRecord.id}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Vehicle Selected</span>
              <span className="font-bold text-slate-800">{submittedRecord.vehicleModel}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Sanctioned Amount</span>
              <span className="font-bold text-slate-900">{formatINR(submittedRecord.loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Monthly EMI ({submittedRecord.tenure} mo)</span>
              <span className="font-bold text-emerald-700">{formatINR(submittedRecord.estimatedEmi)}/mo</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Estimated Bureau Score</span>
              <span className="font-bold text-blue-600">{submittedRecord.creditScoreEst} (Excellent)</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => onOpenWhatsApp(whatsappMsg)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp for Instant Sanction Letter</span>
            </button>

            <button
              onClick={() => {
                setSubmittedRecord(null);
                setStep(1);
                onExploreRides();
              }}
              className="w-full py-3 px-6 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-all"
            >
              Explore More Rides
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="loan-application-screen-container" className="space-y-6 pb-6">
      {/* Title & Subtitle matching Screen 2 */}
      <div className="space-y-2.5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Loan Application
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-xl">
          Let's start with your basic details to check eligibility.
        </p>
      </div>

      {/* Stepper with 1, 2, 3 indicators matching Image 3 */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
        <div className="flex items-center justify-between max-w-md mx-auto relative">
          {/* Connecting Line */}
          <div className="absolute left-8 right-8 top-4 h-0.5 bg-slate-200 -z-0" />

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step === 1
                  ? 'bg-blue-600 text-white shadow-xs'
                  : step > 1
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              {step > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <span
              className={`text-xs font-semibold ${
                step === 1 ? 'text-blue-600 font-bold' : step > 1 ? 'text-emerald-700' : 'text-slate-400'
              }`}
            >
              Personal
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step === 2
                  ? 'bg-blue-600 text-white shadow-xs'
                  : step > 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              {step > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span
              className={`text-xs font-semibold ${
                step === 2 ? 'text-blue-600 font-bold' : step > 2 ? 'text-emerald-700' : 'text-slate-400'
              }`}
            >
              Vehicle
            </span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-1.5 z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                step === 3
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border-2 border-slate-300 text-slate-400'
              }`}
            >
              3
            </div>
            <span
              className={`text-xs font-semibold ${
                step === 3 ? 'text-blue-600 font-bold' : 'text-slate-400'
              }`}
            >
              Docs
            </span>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
        {/* STEP 1: PERSONAL DETAILS (Matching Image 3) */}
        {step === 1 && (
          <div id="step-1-personal-card" className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5 animate-fadeIn">
            <h2 className="text-xl font-bold text-slate-900 pb-2 border-b border-slate-100">
              Step 1: Personal Details
            </h2>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label htmlFor="input-full-name" className="block text-sm font-bold text-slate-800">
                Full Name (As per PAN)
              </label>
              <input
                id="input-full-name"
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 placeholder:text-slate-400 text-base"
              />
              {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label htmlFor="input-mobile-number" className="block text-sm font-bold text-slate-800">
                Mobile Number
              </label>
              <input
                id="input-mobile-number"
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => {
                  setFormData({ ...formData, mobileNumber: e.target.value });
                  if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: '' });
                }}
                placeholder="+91 9876543210"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 placeholder:text-slate-400 text-base"
              />
              {errors.mobileNumber && <p className="text-xs text-red-500 font-medium">{errors.mobileNumber}</p>}
            </div>

            {/* Email Address (Optional) */}
            <div className="space-y-1.5">
              <label htmlFor="input-email-address" className="block text-sm font-bold text-slate-800">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="input-email-address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ramesh@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 placeholder:text-slate-400 text-base"
              />
            </div>

            {/* Occupation Type Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Occupation Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  id="btn-occ-salaried"
                  onClick={() => setFormData({ ...formData, occupation: 'Salaried' })}
                  className={`py-3 px-4 rounded-2xl font-bold text-sm transition-all ${
                    formData.occupation === 'Salaried'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Salaried
                </button>
                <button
                  type="button"
                  id="btn-occ-self-employed"
                  onClick={() => setFormData({ ...formData, occupation: 'Self-Employed' })}
                  className={`py-3 px-4 rounded-2xl font-bold text-sm transition-all ${
                    formData.occupation === 'Self-Employed'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Self-Employed
                </button>
              </div>
            </div>

            {/* Consent Checkbox / Radio matching Image 3 */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  id="checkbox-consent-auth"
                  type="checkbox"
                  checked={formData.authorizedConsent}
                  onChange={(e) => {
                    setFormData({ ...formData, authorizedConsent: e.target.checked });
                    if (errors.authorizedConsent) setErrors({ ...errors, authorizedConsent: '' });
                  }}
                  className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-slate-600 leading-snug">
                  I authorize Sri Sai Teja Finance to contact me via Call/SMS/WhatsApp regarding my loan application and consent to fetch my credit bureau report.
                </span>
              </label>
              {errors.authorizedConsent && (
                <p className="text-xs text-red-500 font-medium mt-1 pl-7">{errors.authorizedConsent}</p>
              )}
            </div>

            {/* Next Step Amber Button */}
            <div className="pt-4 border-t border-slate-100">
              <button
                type="submit"
                id="btn-step-1-next"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-base shadow-sm transition-all transform active:scale-[0.99]"
              >
                <span>Next Step</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: VEHICLE & LOAN CONFIGURATION */}
        {step === 2 && (
          <div id="step-2-vehicle-card" className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                Step 2: Vehicle & Loan Details
              </h2>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Step 2 of 3
              </span>
            </div>

            {/* Vehicle Model Selection */}
            <div className="space-y-1.5">
              <label htmlFor="select-vehicle-model" className="block text-sm font-bold text-slate-800">
                Select Two-Wheeler Model
              </label>
              <select
                id="select-vehicle-model"
                value={formData.vehicleModel}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 bg-white text-base"
              >
                {POPULAR_MODELS_ALL.map((bike, idx) => (
                  <option key={idx} value={bike.name}>
                    {bike.name} — Approx {formatINR(bike.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition: New vs Certified Pre-Owned */}
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-slate-800">
                Condition
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, bikeCondition: 'New' })}
                  className={`py-2.5 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    formData.bikeCondition === 'New'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Brand New
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, bikeCondition: 'Pre-Owned' })}
                  className={`py-2.5 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                    formData.bikeCondition === 'Pre-Owned'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Certified Pre-Owned
                </button>
              </div>
            </div>

            {/* Loan Amount & Down Payment Breakdown */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">On-Road Vehicle Price</span>
                <span className="font-bold text-slate-900">{formatINR(formData.vehiclePrice)}</span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Down Payment</span>
                  <span className="text-blue-700 font-bold">{formatINR(formData.downPayment)}</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={formData.vehiclePrice - 10000}
                  step={1000}
                  value={formData.downPayment}
                  onChange={(e) => {
                    const dp = Number(e.target.value);
                    setFormData({
                      ...formData,
                      downPayment: dp,
                      loanAmount: formData.vehiclePrice - dp
                    });
                  }}
                  aria-label="Down Payment Slider"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm sm:text-base">
                <span className="font-bold text-slate-800">Required Loan Amount</span>
                <span className="font-extrabold text-blue-700">{formatINR(formData.loanAmount)}</span>
              </div>
            </div>

            {/* Preferred Tenure Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-800">
                Preferred Loan Tenure
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[12, 24, 36, 48].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFormData({ ...formData, tenureMonths: t })}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all ${
                      formData.tenureMonths === t
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t} Mo
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-500 text-right">
                Estimated Monthly EMI: <strong className="text-emerald-600">{formatINR(emiCalc.monthlyEmi)}/mo</strong>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-1/3 flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-full border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                id="btn-step-2-next"
                className="w-2/3 flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm shadow-sm transition-all"
              >
                <span>Continue to Docs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: KYC & FAST DISBURSEMENT SUBMIT */}
        {step === 3 && (
          <div id="step-3-docs-card" className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 shadow-sm space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                Step 3: Verification & Branch
              </h2>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Step 3 of 3
              </span>
            </div>

            {/* PAN Card Number */}
            <div className="space-y-1.5">
              <label htmlFor="input-pan-number" className="block text-sm font-bold text-slate-800">
                PAN Card Number
              </label>
              <input
                id="input-pan-number"
                type="text"
                maxLength={10}
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                placeholder="ABCDE1234F"
                className="w-full px-4 py-3 uppercase tracking-wider rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 text-base"
              />
            </div>

            {/* Aadhaar Number */}
            <div className="space-y-1.5">
              <label htmlFor="input-aadhaar-number" className="block text-sm font-bold text-slate-800">
                Aadhaar Number (Last 4 digits or Full)
              </label>
              <input
                id="input-aadhaar-number"
                type="text"
                maxLength={12}
                value={formData.aadhaarNumber}
                onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                placeholder="XXXX XXXX 1234"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 text-base"
              />
            </div>

            {/* Preferred Consultation Branch */}
            <div className="space-y-1.5">
              <label htmlFor="select-preferred-branch" className="block text-sm font-bold text-slate-800">
                Preferred Consultation & Delivery Hub
              </label>
              <select
                id="select-preferred-branch"
                value={formData.preferredBranch}
                onChange={(e) => setFormData({ ...formData, preferredBranch: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-900 bg-white text-sm"
              >
                {BRANCH_LOCATIONS.map((b, idx) => (
                  <option key={idx} value={b.city}>
                    {b.city} — {b.address.slice(0, 38)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Fast-track notice */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-blue-900">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                256-bit encrypted verification. No physical paperwork needed for initial pre-sanction letter.
              </span>
            </div>

            {/* Navigation and Submit buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrevious}
                className="w-1/3 flex items-center justify-center gap-1.5 py-3.5 px-4 rounded-full border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                id="btn-submit-loan-application"
                className="w-2/3 flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm shadow-md transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Instant Approval</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
