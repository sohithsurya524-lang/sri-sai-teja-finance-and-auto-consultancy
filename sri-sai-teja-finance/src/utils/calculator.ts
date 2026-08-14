export function calculateEMI(principal: number, annualInterestRate: number, tenureMonths: number): {
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
} {
  if (principal <= 0 || tenureMonths <= 0) {
    return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0 };
  }

  const monthlyRate = annualInterestRate / (12 * 100);

  if (monthlyRate === 0) {
    const emi = Math.round(principal / tenureMonths);
    return {
      monthlyEmi: emi,
      totalInterest: 0,
      totalPayable: principal
    };
  }

  const emiExact =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const monthlyEmi = Math.round(emiExact);
  const totalPayable = Math.round(monthlyEmi * tenureMonths);
  const totalInterest = Math.round(totalPayable - principal);

  return {
    monthlyEmi,
    totalInterest: Math.max(0, totalInterest),
    totalPayable
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount).replace('₹', '₹ ');
}

export function formatNumberOnly(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(amount);
}
