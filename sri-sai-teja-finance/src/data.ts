import { VehicleCategory } from './types';

export const VEHICLE_CATEGORIES: VehicleCategory[] = [
  {
    id: 'commuter',
    tag: 'EVERYDAY EFFICIENCY',
    tagIcon: 'bike',
    name: 'Commuter Bikes',
    description: 'Reliable, fuel-efficient motorcycles perfect for daily city travel and work commutes. Low maintenance, high value.',
    // Studio blue commuter/naked bike
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=900&q=80',
    startingPrice: '₹ 72,000',
    popularModels: ['Hero Splendor Plus', 'Honda Shine 125', 'Bajaj Pulsar 125', 'TVS Raider 125', 'Honda SP 125'],
    minDownPayment: '₹ 4,999',
    estEmi: '₹ 2,150/mo'
  },
  {
    id: 'sport',
    tag: 'HIGH PERFORMANCE',
    tagIcon: 'zap',
    name: 'Sport Bikes',
    description: 'Experience the thrill with advanced aerodynamics and powerful engines. Designed for speed, agility, and the pure joy of performance.',
    // Red sport racing bike
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=900&q=80',
    startingPrice: '₹ 1,80,000',
    popularModels: ['Yamaha R15 V4', 'KTM RC 390', 'Bajaj Pulsar RS200', 'Suzuki Gixxer SF 250', 'TVS Apache RR 310'],
    minDownPayment: '₹ 14,999',
    estEmi: '₹ 4,490/mo'
  },
  {
    id: 'scooters',
    tag: 'URBAN MOBILITY',
    tagIcon: 'navigation',
    name: 'Scooters',
    description: 'Convenient, easy-to-ride scooters ideal for navigating busy city streets. Great storage space and effortless automatic transmission.',
    // Mint green/pastel scooter
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80',
    startingPrice: '₹ 78,000',
    popularModels: ['Honda Activa 6G', 'TVS Jupiter 110', 'Suzuki Access 125', 'Vespa SXL 125', 'Ather 450X'],
    minDownPayment: '₹ 3,999',
    estEmi: '₹ 2,280/mo'
  },
  {
    id: 'premium',
    tag: 'LUXURY & CRUISERS',
    tagIcon: 'star',
    name: 'Premium Bikes',
    description: 'Make a statement with top-tier cruisers and luxury touring motorcycles. Exceptional comfort, power, and commanding presence on highway rides.',
    // Black cruiser / touring motorcycle
    image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&w=900&q=80',
    startingPrice: '₹ 2,25,000',
    popularModels: ['Royal Enfield Classic 350', 'Harley Davidson X440', 'Jawa 42 Bobber', 'Triumph Speed 400', 'Honda Hness CB350'],
    minDownPayment: '₹ 19,999',
    estEmi: '₹ 5,820/mo'
  }
];

export const POPULAR_MODELS_ALL = [
  { name: 'Honda Activa 6G', category: 'scooters', price: 82000 },
  { name: 'TVS Jupiter 125', category: 'scooters', price: 88000 },
  { name: 'Suzuki Access 125', category: 'scooters', price: 92000 },
  { name: 'Hero Splendor Plus', category: 'commuter', price: 76000 },
  { name: 'Honda Shine 125', category: 'commuter', price: 85000 },
  { name: 'Bajaj Pulsar 150', category: 'commuter', price: 115000 },
  { name: 'TVS Raider 125', category: 'commuter', price: 98000 },
  { name: 'Yamaha R15 V4', category: 'sport', price: 185000 },
  { name: 'KTM Duke 250', category: 'sport', price: 240000 },
  { name: 'TVS Apache RTR 160 4V', category: 'sport', price: 130000 },
  { name: 'Royal Enfield Classic 350', category: 'premium', price: 215000 },
  { name: 'Royal Enfield Hunter 350', category: 'premium', price: 175000 },
  { name: 'Harley-Davidson X440', category: 'premium', price: 260000 },
  { name: 'Triumph Speed 400', category: 'premium', price: 250000 }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: '1. Choose Your Ride',
    description: 'Browse our extensive collection of new and pre-owned bikes. Find the perfect ride that suits your style and budget.',
    icon: 'Bike'
  },
  {
    step: 2,
    title: '2. Submit Details',
    description: 'Provide a few basic details through our secure online form or visit our office. We keep it quick and confidential.',
    icon: 'FileText'
  },
  {
    step: 3,
    title: '3. Finance Assistance',
    description: 'Our experts will find the best loan options with minimal paperwork and quick approval times tailored for you.',
    icon: 'BadgePercent'
  },
  {
    step: 4,
    title: '4. Complete Purchase',
    description: 'Once approved, sign the agreement and ride away. We ensure a seamless handover process.',
    icon: 'CheckCircle2'
  }
];

export const LENDING_PARTNERS = [
  'HDFC Bank Auto Loans',
  'TVS Credit Services',
  'IDFC First Bank',
  'Bajaj Finserv',
  'Muthoot Capital',
  'Hero FinCorp',
  'L&T Financial Services'
];

export const BRANCH_LOCATIONS = [
  {
    city: 'Hyderabad Main Hub',
    address: 'Plot 42, Road No. 12, Banjara Hills, Near Metro Station, Hyderabad - 500034',
    phone: '+91 98765 43210',
    timings: '9:30 AM - 8:30 PM (Mon - Sun)'
  },
  {
    city: 'Secunderabad Branch',
    address: 'Shop 15, Prime Auto Plaza, Paradise Circle, Secunderabad - 500003',
    phone: '+91 98765 43211',
    timings: '10:00 AM - 8:00 PM'
  },
  {
    city: 'Vijayawada Regional Office',
    address: 'Opp. Old Bus Stand, MG Road, Governorpet, Vijayawada - 520002',
    phone: '+91 98765 43212',
    timings: '10:00 AM - 8:00 PM'
  },
  {
    city: 'Visakhapatnam Hub',
    address: '4th Lane, Dwaraka Nagar, Main Junction, Vizag - 530016',
    phone: '+91 98765 43213',
    timings: '10:00 AM - 8:00 PM'
  }
];
