import React from 'react';
import { FaDollarSign } from 'react-icons/fa';

interface CostSavingsData {
  monthly: number;
  annual: number;
}

interface CostSavingsCardProps {
  data: CostSavingsData;
  timeframe: string;
}

export const CostSavingsCard: React.FC<CostSavingsCardProps> = ({ data, timeframe }) => {
  const value = timeframe === 'daily' ? data.monthly / 30 : data.monthly;
  const label = timeframe === 'daily' ? 'Daily' : 'Monthly';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#4ECDC4]">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#4ECDC4] bg-opacity-10 rounded-full">
          <FaDollarSign className="text-[#4ECDC4]" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700">Cost Savings</h3>
          <p className="text-xs text-gray-500">{label} Impact</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold text-[#4ECDC4]">${value.toFixed(2)}</div>
        <div className="text-sm text-gray-500">
          {timeframe === 'daily' ? `$${data.monthly}/mo` : `$${data.annual}/yr`}
        </div>
      </div>
    </div>
  );
}; 