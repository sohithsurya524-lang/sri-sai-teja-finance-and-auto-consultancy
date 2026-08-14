import React, { useState, useMemo } from 'react';
import { ArrowRight, Info, Sparkles, CheckCircle2, RotateCcw, PieChart } from 'lucide-react';
import { calculateEMI, formatINR, formatNumberOnly } from '../utils/calculator';

interface EmiCalculatorScreenProps {
  initialLoanAmount?: number;
  initialTenure?: number;
  onApplyWithPlan: (loanAmount: number, tenureMonths: number, interestRate: number) => void;
}

export const EmiCalculatorScreen: React.FC<EmiCalculatorScreenProps> = ({
  initialLoanAmount = 100000,
  initialTenure = 24,
  onApplyWithPlan,
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(initialLoanAmount);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenureMonths, setTenureMonths] = useState<number>(initialTenure);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Compute calculated values
  const { monthlyEmi, totalInterest, totalPayable } = useMemo(() => {
    return calculateEMI(loanAmount, interestRate, tenureMonths);
  }, [loanAmount, interestRate, tenureMonths]);

  // Percentage calculations for visual split bar
  const principalPercent = totalPayable > 0 ? (loanAmount / totalPayable) * 100 : 90;
  const interestPercent = 100 - principalPercent;

  const handleReset = () => {
    setLoanAmount(100000);
    setInterestRate(10.5);
    setTenureMonths(24);
  };

  return (
    <div id="calculator-screen-container" className="space-y-6 pb-6">
      {/* Title & Subtitle matching Screen 3 */}
      <div className="space-y-2.5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Interactive EMI Calculator
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-xl">
          Plan your auto loan with confidence. Adjust the parameters below to instantly see your estimated monthly payments and total costs.
        </p>
      </div>

      {/* Main Sliders Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
        {/* Slider 1: Loan Amount */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="input-loan-amount-range" className="text-base sm:text-lg font-bold text-slate-900">
              Loan Amount
            </label>
            <div className="bg-blue-50 border border-blue-100 text-blue-900 font-bold px-3.5 py-1 rounded-full text-base sm:text-lg">
              ₹ {formatNumberOnly(loanAmount)}
            </div>
          </div>

          <div className="relative py-2">
            <input
              id="input-loan-amount-range"
              type="range"
              min={10000}
              max={500000}
              step={5000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              aria-label="Loan Amount Slider"
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>₹10K</span>
            <span>₹5L</span>
          </div>

          {/* Quick preset amount chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[50000, 100000, 150000, 200000, 300000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setLoanAmount(amt)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  loanAmount === amt
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ₹ {amt / 1000}k
              </button>
            ))}
          </div>
        </div>

        {/* Slider 2: Interest Rate */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label htmlFor="input-interest-rate-range" className="text-base sm:text-lg font-bold text-slate-900">
              Interest Rate (p.a)
            </label>
            <div className="bg-blue-50 border border-blue-100 text-blue-900 font-bold px-3.5 py-1 rounded-full text-base sm:text-lg">
              {interestRate.toFixed(1)} %
            </div>
          </div>

          <div className="relative py-2">
            <input
              id="input-interest-rate-range"
              type="range"
              min={7}
              max={24}
              step={0.25}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              aria-label="Interest Rate Slider"
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>7%</span>
            <span>24%</span>
          </div>

          {/* Quick interest rates */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[8.99, 10.5, 12.5, 14.0].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setInterestRate(rate)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  interestRate === rate
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>

        {/* Slider 3: Tenure (Months) */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label htmlFor="input-tenure-range" className="text-base sm:text-lg font-bold text-slate-900">
              Tenure (Months)
            </label>
            <div className="bg-blue-50 border border-blue-100 text-blue-900 font-bold px-3.5 py-1 rounded-full text-base sm:text-lg">
              {tenureMonths} mo
            </div>
          </div>

          <div className="relative py-2">
            <input
              id="input-tenure-range"
              type="range"
              min={6}
              max={60}
              step={6}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              aria-label="Tenure in Months Slider"
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>6 mo</span>
            <span>60 mo</span>
          </div>

          {/* Quick tenure years */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {[12, 24, 36, 48, 60].map((mo) => (
              <button
                key={mo}
                type="button"
                onClick={() => setTenureMonths(mo)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  tenureMonths === mo
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {mo} mo ({mo / 12} {mo === 12 ? 'yr' : 'yrs'})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Dark Card matching Screen 3 (Image 7) */}
      <div
        id="emi-result-card"
        className="bg-[#0b192e] text-white rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Estimated Monthly EMI Top Section */}
        <div className="space-y-1">
          <div className="text-sm font-medium text-slate-300">
            Estimated Monthly EMI
          </div>
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-baseline">
            <span>₹ {formatNumberOnly(monthlyEmi)}</span>
          </div>
        </div>

        {/* Visual Progress Split (Principal vs Interest) */}
        <div className="space-y-1.5">
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${principalPercent}%` }}
              className="bg-blue-500 h-full transition-all duration-300"
              title="Principal"
            />
            <div
              style={{ width: `${interestPercent}%` }}
              className="bg-amber-400 h-full transition-all duration-300"
              title="Interest"
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> Principal ({principalPercent.toFixed(0)}%)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Interest ({interestPercent.toFixed(0)}%)
            </span>
          </div>
        </div>

        {/* Breakdown details */}
        <div className="space-y-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-sm sm:text-base">
            <span className="text-slate-300">Principal Amount</span>
            <span className="font-bold text-white tracking-wide">
              {formatINR(loanAmount)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm sm:text-base">
            <span className="text-slate-300">Total Interest</span>
            <span className="font-bold text-white tracking-wide">
              {formatINR(totalInterest)}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-base sm:text-lg">
            <span className="font-bold text-slate-100">Total Payable</span>
            <span className="font-extrabold text-white tracking-wide">
              {formatINR(totalPayable)}
            </span>
          </div>
        </div>

        {/* Amber Action Button matching screenshot */}
        <div className="pt-2 space-y-3">
          <button
            id="btn-apply-with-plan"
            onClick={() => onApplyWithPlan(loanAmount, tenureMonths, interestRate)}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-base shadow-md transition-all transform active:scale-[0.99]"
          >
            <span>Apply with this Plan</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Indicative footnote */}
          <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
            <Info className="w-3.5 h-3.5 inline text-slate-400 shrink-0" />
            <span>Results are indicative and may vary based on final approval.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
