export type ActiveTab = 'rides' | 'apply' | 'calculator' | 'how-it-works';

export interface VehicleCategory {
  id: string;
  tag: string;
  tagIcon: string;
  name: string;
  description: string;
  image: string;
  startingPrice: string;
  popularModels: string[];
  minDownPayment: string;
  estEmi: string;
}

export interface ApplicationFormData {
  // Step 1: Personal
  fullName: string;
  mobileNumber: string;
  email: string;
  occupation: 'Salaried' | 'Self-Employed';
  monthlyIncome: string;
  city: string;
  pincode: string;
  authorizedConsent: boolean;

  // Step 2: Vehicle
  category: string;
  vehicleModel: string;
  bikeCondition: 'New' | 'Pre-Owned';
  vehiclePrice: number;
  downPayment: number;
  loanAmount: number;
  tenureMonths: number;

  // Step 3: Documents
  panNumber: string;
  aadhaarNumber: string;
  idProofAttached: boolean;
  bankProofAttached: boolean;
  preferredBranch: string;
}

export interface ApplicationRecord {
  id: string;
  date: string;
  applicantName: string;
  phone: string;
  vehicleModel: string;
  loanAmount: number;
  tenure: number;
  estimatedEmi: number;
  status: 'Pre-Approved' | 'Under Review' | 'Document Verification' | 'Disbursed';
  creditScoreEst: number;
}
