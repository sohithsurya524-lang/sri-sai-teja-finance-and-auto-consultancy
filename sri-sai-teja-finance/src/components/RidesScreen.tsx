import React from 'react';
import { ArrowRight, Bike, Zap, Navigation, Star, CheckCircle, IndianRupee } from 'lucide-react';
import { VEHICLE_CATEGORIES } from '../data';
import { VehicleCategory } from '../types';

interface RidesScreenProps {
  onSelectCategoryForLoan: (category: VehicleCategory) => void;
  onSelectCategoryForEmi: (category: VehicleCategory) => void;
}

export const RidesScreen: React.FC<RidesScreenProps> = ({
  onSelectCategoryForLoan,
  onSelectCategoryForEmi,
}) => {
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'commuter':
        return <Bike className="w-4 h-4 text-blue-600 inline mr-1.5" />;
      case 'sport':
        return <Zap className="w-4 h-4 text-blue-600 inline mr-1.5" />;
      case 'scooters':
        return <Navigation className="w-4 h-4 text-blue-600 inline mr-1.5" />;
      case 'premium':
        return <Star className="w-4 h-4 text-blue-600 inline mr-1.5" />;
      default:
        return <Bike className="w-4 h-4 text-blue-600 inline mr-1.5" />;
    }
  };

  return (
    <div id="rides-screen-container" className="space-y-6 pb-6">
      {/* Hero Header matching screenshot */}
      <div className="space-y-2.5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Choose Your Ride
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-xl">
          Select a category below to explore our flexible finance options tailored to your needs. Get approved fast and ride away today.
        </p>
      </div>

      {/* Categories Cards list matching Image 1 */}
      <div className="space-y-5">
        {VEHICLE_CATEGORIES.map((category) => (
          <div
            key={category.id}
            id={`category-card-${category.id}`}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
          >
            {/* Vehicle Image Container with smooth neutral gradient background */}
            <div className="relative w-full h-56 sm:h-64 bg-slate-100/70 overflow-hidden flex items-center justify-center p-2">
              <img
                src={category.image}
                alt={category.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 shadow-xs border border-slate-200/60">
                Starting {category.startingPrice}
              </div>
            </div>

            {/* Card Content Area */}
            <div className="p-5 sm:p-6 space-y-4">
              {/* Category Tag Header */}
              <div className="flex items-center text-xs font-bold text-blue-600 tracking-wider uppercase">
                {getCategoryIcon(category.id)}
                <span>{category.tag}</span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {category.name}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {category.description}
                </p>
              </div>

              {/* Quick specs pill row */}
              <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                  <div className="text-[11px] text-slate-500 font-medium">Min Down Payment</div>
                  <div className="text-sm font-bold text-slate-800">{category.minDownPayment}</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                  <div className="text-[11px] text-slate-500 font-medium">Estimated EMI</div>
                  <div className="text-sm font-bold text-blue-700">{category.estEmi}</div>
                </div>
              </div>

              {/* Popular Models Chips */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Popular Models
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.popularModels.map((model, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Action Button matching the amber button in screenshot */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  id={`btn-enquiry-${category.id}`}
                  onClick={() => onSelectCategoryForLoan(category)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-base shadow-sm transition-all transform active:scale-[0.99]"
                >
                  <span>Finance Enquiry</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  id={`btn-calc-quick-${category.id}`}
                  onClick={() => onSelectCategoryForEmi(category)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-full transition-colors border border-slate-200"
                >
                  Calculate EMI
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
